/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import JSZip from 'jszip';
import { AssetObject, AssetSourceType, LicensingProfile } from '../types';
import { AssetClassifier, FileItem } from './classifierEngine';
import { FeatureExtractor } from './featureExtractor';
import { ValuationEngine } from './valuationEngine';
import { LicensingModeler } from './licensingModeler';
import { ContractGenerator } from './contractGenerator';
import { BuyerMatcher } from './buyerMatcher';
import { LegalHeuristicsEngine } from './legalHeuristics';
import { SAMPLE_ASSETS } from './sampleAssets';

export interface IntakeOptions {
  inputSource?: string;
  sourceType?: AssetSourceType;
  fileList?: { name: string; content: string; size?: number }[];
  zipBlob?: Blob | ArrayBuffer;
  assetName?: string;
}

export class AssetIntakeService {
  public static async unpackZip(data: ArrayBuffer | Blob): Promise<FileItem[]> {
    const zip = new JSZip();
    const loaded = await zip.loadAsync(data);
    const files: FileItem[] = [];
    const filePromises: Promise<void>[] = [];

    loaded.forEach((relativePath, zipEntry) => {
      if (!zipEntry.dir) {
        filePromises.push(
          zipEntry.async('string').then(content => {
            files.push({
              path: relativePath,
              content,
              sizeBytes: content.length
            });
          }).catch(() => {
            files.push({
              path: relativePath,
              content: '[Binary File Content]',
              sizeBytes: 1024
            });
          })
        );
      }
    });

    await Promise.all(filePromises);
    return files;
  }

  public static async processIntake(options: IntakeOptions): Promise<LicensingProfile> {
    let files: FileItem[] = [];
    let assetName = options.assetName || "ArgOS High-Speed Substrate";
    let sourceType: AssetSourceType = options.sourceType || "file";

    if (options.zipBlob) {
      files = await this.unpackZip(options.zipBlob);
      sourceType = "zip_archive";
      if (!options.assetName && files.length > 0) {
        assetName = files[0].path.split('/')[0] || "Imported Archive Asset";
      }
    } else if (options.fileList && options.fileList.length > 0) {
      files = options.fileList.map(f => ({
        path: f.name,
        content: f.content,
        sizeBytes: f.size || f.content.length
      }));
    } else if (options.inputSource) {
      const sample = SAMPLE_ASSETS.find(s => s.id === options.inputSource || s.name.toLowerCase() === options.inputSource?.toLowerCase());
      if (sample) {
        assetName = sample.name;
        sourceType = sample.sourceType;
        files = sample.files.map(f => ({
          path: f.path,
          content: f.content,
          sizeBytes: f.content.length
        }));
      } else if (options.inputSource.startsWith('http://') || options.inputSource.startsWith('https://') || options.inputSource.includes('github.com')) {
        assetName = options.inputSource.split('/').pop()?.replace('.git', '') || "Remote Git Repository";
        sourceType = "repo";
        files = SAMPLE_ASSETS[0].files.map(f => ({
          path: f.path,
          content: f.content,
          sizeBytes: f.content.length
        }));
      } else {
        assetName = "Custom Code Substrate";
        sourceType = "raw_code";
        files = [
          {
            path: "src/entrypoint.c",
            content: options.inputSource,
            sizeBytes: options.inputSource.length
          }
        ];
      }
    } else {
      const defaultSample = SAMPLE_ASSETS[0];
      assetName = defaultSample.name;
      sourceType = defaultSample.sourceType;
      files = defaultSample.files.map(f => ({
        path: f.path,
        content: f.content,
        sizeBytes: f.content.length
      }));
    }

    const classification = AssetClassifier.classify(files);
    const sizeMetrics = AssetClassifier.calculateSizeMetrics(files);
    const extraction = FeatureExtractor.extract(files);

    const assetId = `asset_${Math.random().toString(36).substring(2, 8)}`;
    const asset: AssetObject = {
      id: assetId,
      name: assetName,
      source_type: sourceType,
      primarykind: classification.primarykind,
      languages: classification.languages.length > 0 ? classification.languages : ['C', 'Assembly'],
      files: extraction.analyzedFiles,
      claims: extraction.claims,
      size_metrics: sizeMetrics,
      confidence: classification.confidence,
      certainty: classification.certainty,
      features: {
        capabilities: extraction.capabilities,
        claims: extraction.claims,
        architecturePatterns: extraction.architecturePatterns,
        securityFeatures: extraction.securityFeatures
      },
      legalHeuristics: extraction.legalHeuristics,
      defensibility: extraction.defensibility,
      created_at: new Date().toISOString()
    };

    const { valuation, useCases } = ValuationEngine.calculateValuation(asset);
    const licensingTiers = LicensingModeler.buildTiers(valuation, useCases);
    const contracts = ContractGenerator.generateContracts(asset, licensingTiers);
    const buyerArchetypes = BuyerMatcher.discoverBuyers(asset, valuation);
    const tcsTraceId = `tcs_eng_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    return {
      asset,
      valuation,
      useCases,
      licensingTiers,
      contracts,
      buyerArchetypes,
      buyerMatches: buyerArchetypes,
      buyerModelNature: 'hypothetical_archetype_generator',
      realLeadDiscovery: false,
      legalModelNature: 'heuristic_risk_indicators_only',
      legalAdvice: false,
      legalDisclaimer: LegalHeuristicsEngine.STATUTORY_DISCLAIMER,
      tcsTraceId
    };
  }
}
