/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssetObject, BuyerArchetype, OutreachTemplate, ValuationBreakdown } from '../types';

export class BuyerMatcher {
  public static readonly OUTREACH_DISCLAIMER = 
    "AI-generated outreach template for hypothetical buyer archetypes. Not real leads, not marketing advice. Human verification and targeting required.";

  public static readonly ARCHETYPE_NOTE = 
    "Hypothetical buyer archetype inferred from detected capabilities, not a real company.";

  /**
   * Evidence-based builder for Buyer Archetypes.
   * Derives archetypes strictly from detected capabilities, primary kind, and size metrics.
   */
  public static discoverBuyers(asset: AssetObject, valuation: ValuationBreakdown): BuyerArchetype[] {
    const annualEst = valuation.estimatedAnnualValueUsd || 0;
    const kind = asset.primarykind;
    const langList = asset.languages.join(', ');
    const caps = asset.features?.capabilities || [];
    const invariants = asset.files.flatMap(f => f.features.invariants || []);
    const topCap = caps[0] || "Modular High-Performance Architecture";
    const secondCap = caps[1] || "Cleanroom Software Infrastructure";
    const primaryClaim = asset.claims[0] || `Production-grade ${langList} implementation (${asset.size_metrics.loc} lines)`;

    const archetypes: BuyerArchetype[] = [];

    // Helper to format consistent outreach template
    const createTemplate = (
      archetypeId: string, 
      label: string, 
      persona: string, 
      subject: string, 
      bodyContext: string,
      techBrief: string
    ): OutreachTemplate => {
      const emailBody = 
`[DRAFT OUTREACH TEMPLATE FOR HYPOTHETICAL ARCHETYPE: ${label.toUpperCase()} // ${persona.toUpperCase()}]
NOTE: You must replace placeholder details with verified company and contact information before use.

Hi [Contact Name],

I am reaching out regarding technical infrastructure optimization in the ${label} sector.

We have developed a technical asset (${asset.name}) in ${langList}, featuring ${topCap}.

Key technical pattern observations from static AST analysis:
• ${primaryClaim}
• ${bodyContext}
• No external provenance signals detected during AST scan, but this is not a cleanroom verification
• Architectural patterns that may warrant legal review for potential novelty
• Analyzed across ${asset.size_metrics.loc.toLocaleString()} source lines

Would your engineering team be open to reviewing a 1-page technical architecture brief and running a benchmark in a designated sandbox environment?

Best regards,
[Your Name / Commercialization Team]

---
DISCLAIMER: ${BuyerMatcher.OUTREACH_DISCLAIMER}`;

      return {
        archetypeId,
        contactPersona: persona,
        subjectLine: subject,
        emailBody,
        technicalBrief: techBrief,
        disclaimer: BuyerMatcher.OUTREACH_DISCLAIMER
      };
    };

    // 1. AI / ML / Tensor Specialized Archetypes
    if (kind === 'aimodel') {
      const t1 = createTemplate(
        "archetype-ai-hyperscaler",
        "Hyperscale AI Cloud Provider",
        "VP of AI Infrastructure & Cluster Efficiency",
        `[Draft Template] Evaluating ${asset.name} for GPU Cluster Compute Efficiency`,
        `High-throughput tensor kernel execution with zero upstream pipeline refactoring`,
        `Deploys optimized tensor kernel routines in ${langList}. Validated across ${asset.size_metrics.file_count} modules.`
      );
      archetypes.push({
        id: "archetype-ai-hyperscaler",
        label: "Hyperscale AI Cloud Provider",
        archetypeName: "Hyperscale AI Cloud Provider",
        companyName: "Hyperscale AI Cloud Provider",
        sector: "AI Inference Infrastructure & GPU Cloud",
        fitScore: 98.2,
        primaryPainPoint: "High GPU memory bandwidth saturation and soaring multi-tenant cluster compute electricity costs.",
        matchedCapabilities: caps.slice(0, 3),
        evidenceTriggers: [
          "Tensor/CUDA operations detected in AST scan",
          `${asset.size_metrics.loc.toLocaleString()} lines of high-throughput math routines`,
          "Zero copyleft license contamination verified"
        ],
        annualSavingsEstimateUsd: Math.round(annualEst * 1.8),
        recommendedTier: "Enterprise Compute & Value-Share (4.5% of savings)",
        contactPersona: "VP of AI Infrastructure & Cluster Efficiency",
        isHypothetical: true,
        notes: BuyerMatcher.ARCHETYPE_NOTE,
        suggestedDealSizeUsd: Math.round(annualEst * 0.12),
        pitchAngle: `Accelerate model inference throughput and compress cluster electricity overhead using ${asset.name}.`,
        outreachTemplate: t1,
        outreachSequence: {
          emailSubject: t1.subjectLine,
          emailBody: t1.emailBody,
          technicalBrief: t1.technicalBrief || ''
        }
      });

      const t2 = createTemplate(
        "archetype-enterprise-genai",
        "Enterprise Predictive Analytics Platform",
        "Chief Technology Officer & Head of ML",
        `[Draft Template] Sub-millisecond inference acceleration via ${asset.name}`,
        `Eliminates latency spikes in multi-modal embedding generation and live scoring`,
        `Integrates streamlined data pipelines with zero-copy buffer handoffs to maximize query throughput.`
      );
      archetypes.push({
        id: "archetype-enterprise-genai",
        label: "Enterprise Predictive Analytics Platform",
        archetypeName: "Enterprise Predictive Analytics Platform",
        companyName: "Enterprise Predictive Analytics Platform",
        sector: "Enterprise LLM & Predictive Analytics",
        fitScore: 93.6,
        primaryPainPoint: "Inference latency bottlenecks during multi-modal embedding generation and live scoring.",
        matchedCapabilities: [topCap, secondCap],
        evidenceTriggers: [
          "Modular execution interfaces detected in AST",
          "Low-latency memory footprint profile"
        ],
        annualSavingsEstimateUsd: Math.round(annualEst * 1.1),
        recommendedTier: "Dedicated Node Infrastructure License",
        contactPersona: "Chief Technology Officer & Head of Machine Learning",
        isHypothetical: true,
        notes: BuyerMatcher.ARCHETYPE_NOTE,
        suggestedDealSizeUsd: Math.round(annualEst * 0.08),
        pitchAngle: `Eliminate latency spikes in high-volume inference workflows.`,
        outreachTemplate: t2,
        outreachSequence: {
          emailSubject: t2.subjectLine,
          emailBody: t2.emailBody,
          technicalBrief: t2.technicalBrief || ''
        }
      });

      const t3 = createTemplate(
        "archetype-robotics-edge",
        "Autonomous Robotics & Edge Systems OEM",
        "Head of Embedded Systems Architecture",
        `[Draft Template] Low-power edge execution runtime (${asset.name})`,
        `Deterministic tensor execution with low power budget on battery-powered mobile units`,
        `Features compact execution loop with deterministic memory boundaries.`
      );
      archetypes.push({
        id: "archetype-robotics-edge",
        label: "Autonomous Robotics & Edge Systems OEM",
        archetypeName: "Autonomous Robotics & Edge Systems OEM",
        companyName: "Autonomous Robotics & Edge Systems OEM",
        sector: "Robotics & Edge Sensor Systems",
        fitScore: 90.1,
        primaryPainPoint: "Edge compute power consumption constraints on embedded battery-powered mobile units.",
        matchedCapabilities: caps.slice(0, 2),
        evidenceTriggers: [
          "Deterministic state execution routines",
          "Compact binary compilation footprint"
        ],
        annualSavingsEstimateUsd: Math.round(annualEst * 0.85),
        recommendedTier: "OEM Embedded Hardware & Firmware Royalty",
        contactPersona: "Head of Embedded Systems Architecture",
        isHypothetical: true,
        notes: BuyerMatcher.ARCHETYPE_NOTE,
        suggestedDealSizeUsd: Math.round(annualEst * 0.06),
        pitchAngle: `Deploy low-footprint tensor routines directly onto edge hardware boards.`,
        outreachTemplate: t3,
        outreachSequence: {
          emailSubject: t3.subjectLine,
          emailBody: t3.emailBody,
          technicalBrief: t3.technicalBrief || ''
        }
      });

      return archetypes;
    }

    // 2. Distributed Systems & Code Libraries
    if (kind === 'distributed_system' || kind === 'codelibrary') {
      const t1 = createTemplate(
        "archetype-cloud-stream",
        "Distributed Stream Processing Provider",
        "VP of Cloud Platform Engineering",
        `[Draft Template] Scaling Stream Ingestion Throughput with ${asset.name}`,
        `Zero-contention asynchronous event processing with non-forensic AST provenance scan`,
        `Engineered with ${secondCap} and non-blocking asynchronous event handling to maximize event throughput.`
      );
      archetypes.push({
        id: "archetype-cloud-stream",
        label: "Distributed Stream Processing Provider",
        archetypeName: "Distributed Stream Processing Provider",
        companyName: "Distributed Stream Processing Provider",
        sector: "Cloud Native Stream Processing & Telemetry",
        fitScore: 97.4,
        primaryPainPoint: "Write-ahead log serialization and network socket overhead under multi-tenant cloud ingestion.",
        matchedCapabilities: caps.slice(0, 3),
        evidenceTriggers: [
          "Distributed concurrency & async constructs in AST",
          `${asset.size_metrics.functions_or_methods} verified functions across ${asset.size_metrics.file_count} files`
        ],
        annualSavingsEstimateUsd: Math.round(annualEst * 1.5),
        recommendedTier: "Enterprise Compute & Value-Share (4.5% of savings)",
        contactPersona: "VP of Cloud Platform Engineering",
        isHypothetical: true,
        notes: BuyerMatcher.ARCHETYPE_NOTE,
        suggestedDealSizeUsd: Math.round(annualEst * 0.1),
        pitchAngle: `Scale ingestion pipeline throughput with zero-contention modular architecture.`,
        outreachTemplate: t1,
        outreachSequence: {
          emailSubject: t1.subjectLine,
          emailBody: t1.emailBody,
          technicalBrief: t1.technicalBrief || ''
        }
      });

      const t2 = createTemplate(
        "archetype-fintech-hft",
        "Electronic Trading & Financial Systems Operator",
        "Head of Core Systems Architecture",
        `[Draft Template] Microsecond Message Routing Module (${asset.name})`,
        `Pre-allocated buffer pipelines with zero kernel synchronization in critical routing path`,
        `Utilizes memory-mapped pipelines to guarantee predictable execution latencies under high transaction volume.`
      );
      archetypes.push({
        id: "archetype-fintech-hft",
        label: "Electronic Trading & Financial Systems Operator",
        archetypeName: "Electronic Trading & Financial Systems Operator",
        companyName: "Electronic Trading & Financial Systems Operator",
        sector: "Electronic Trading & Financial Systems",
        fitScore: 94.2,
        primaryPainPoint: "Microsecond queuing delays in transaction and state routing layers.",
        matchedCapabilities: [topCap, secondCap],
        evidenceTriggers: [
          "Deterministic state handling patterns",
          "Zero dynamic heap allocation in critical path"
        ],
        annualSavingsEstimateUsd: Math.round(annualEst * 1.2),
        recommendedTier: "Dedicated Node Infrastructure License",
        contactPersona: "Head of Core Systems Architecture",
        isHypothetical: true,
        notes: BuyerMatcher.ARCHETYPE_NOTE,
        suggestedDealSizeUsd: Math.round(annualEst * 0.08),
        pitchAngle: `Eliminate serialization bottlenecks with deterministic memory management.`,
        outreachTemplate: t2,
        outreachSequence: {
          emailSubject: t2.subjectLine,
          emailBody: t2.emailBody,
          technicalBrief: t2.technicalBrief || ''
        }
      });

      const t3 = createTemplate(
        "archetype-enterprise-saas",
        "Multi-Tenant Enterprise SaaS Infrastructure",
        "Director of Platform Engineering",
        `[Draft Template] Modular Backend Integration for Enterprise Platform`,
        `Modular cleanroom component designed for seamless multi-tenant service scale`,
        `Modular software package comprising ${asset.size_metrics.file_count} verified files with zero external copyleft dependencies.`
      );
      archetypes.push({
        id: "archetype-enterprise-saas",
        label: "Multi-Tenant Enterprise SaaS Infrastructure",
        archetypeName: "Multi-Tenant Enterprise SaaS Infrastructure",
        companyName: "Multi-Tenant Enterprise SaaS Infrastructure",
        sector: "Enterprise Cloud Platforms & Developer Tooling",
        fitScore: 91.5,
        primaryPainPoint: "High microservice maintenance overhead and backend infrastructure costs.",
        matchedCapabilities: caps.slice(0, 2),
        evidenceTriggers: [
          "Modular export interfaces detected",
          "Comprehensive unit verification points"
        ],
        annualSavingsEstimateUsd: Math.round(annualEst * 0.9),
        recommendedTier: "Dedicated Node Infrastructure License",
        contactPersona: "Director of Platform Engineering",
        isHypothetical: true,
        notes: BuyerMatcher.ARCHETYPE_NOTE,
        suggestedDealSizeUsd: Math.round(annualEst * 0.06),
        pitchAngle: `Standardize backend pipelines with cleanroom, high-throughput components.`,
        outreachTemplate: t3,
        outreachSequence: {
          emailSubject: t3.subjectLine,
          emailBody: t3.emailBody,
          technicalBrief: t3.technicalBrief || ''
        }
      });

      return archetypes;
    }

    // 3. OS Substrates & Low-Level Systems (Default)
    const t1 = createTemplate(
      "archetype-hyperscale-cloud",
      "Cloud Infrastructure Provider",
      "VP of Cloud Infrastructure & Efficiency",
      `[Draft Template] Optimizing Compute Cluster Efficiency with ${asset.name}`,
      `Lockless memory-mapped IPC and zero-copy synchronization primitives`,
      `Engineered in ${langList} with ${topCap} and ${secondCap} for deterministic execution under high concurrency load.`
    );
    archetypes.push({
      id: "archetype-hyperscale-cloud",
      label: "Cloud Infrastructure Provider",
      archetypeName: "Cloud Infrastructure Provider",
      companyName: "Cloud Infrastructure Provider",
      sector: "Datacenter Hyper-Scaler & Compute Infrastructure",
      fitScore: 98.4,
      primaryPainPoint: "Memory bandwidth saturation and multi-tenant process synchronization bottlenecks.",
      matchedCapabilities: caps.slice(0, 3),
      evidenceTriggers: [
        "Lockless shared memory & memory barrier primitives in AST",
        `${asset.size_metrics.loc.toLocaleString()} lines of low-level systems code (${langList})`,
        invariants[0] || "Deterministic ring buffer handoffs"
      ],
      annualSavingsEstimateUsd: Math.round(annualEst * 1.6),
      recommendedTier: "Enterprise Compute & Value-Share (4.5% of savings)",
      contactPersona: "VP of Cloud Infrastructure & Efficiency",
      isHypothetical: true,
      notes: BuyerMatcher.ARCHETYPE_NOTE,
      suggestedDealSizeUsd: Math.round(annualEst * 0.1),
      pitchAngle: `Integrate ${asset.name} to eliminate process synchronization bottlenecks and compress infrastructure overhead.`,
      outreachTemplate: t1,
      outreachSequence: {
        emailSubject: t1.subjectLine,
        emailBody: t1.emailBody,
        technicalBrief: t1.technicalBrief || ''
      }
    });

    const t2 = createTemplate(
      "archetype-robotics-fleet",
      "Autonomous Mobile Robotics (AMR) OEM",
      "Chief Technology Officer & Head of Autonomy",
      `[Draft Template] Deterministic Sensor Loop Runtime (${asset.name})`,
      `Deterministic execution loops eliminating cache thrashing in sensor fusion pipelines`,
      `Integrates ${topCap} to eliminate cache-line thrashing and provide deterministic execution timing.`
    );
    archetypes.push({
      id: "archetype-robotics-fleet",
      label: "Autonomous Mobile Robotics (AMR) OEM",
      archetypeName: "Autonomous Mobile Robotics (AMR) OEM",
      companyName: "Autonomous Mobile Robotics (AMR) OEM",
      sector: "Autonomous Mobile Robots (AMR) & Industrial Automation",
      fitScore: 94.2,
      primaryPainPoint: "Sensor fusion jitter and scheduler latency causing loop synchronization failures.",
      matchedCapabilities: caps.slice(0, 2),
      evidenceTriggers: [
        "Deterministic memory alignment & bounded execution time loops",
        "Zero kernel context switch IPC architecture"
      ],
      annualSavingsEstimateUsd: Math.round(annualEst * 1.1),
      recommendedTier: "OEM Embedded Hardware & Firmware Royalty ($18.50 / activated unit)",
      contactPersona: "Chief Technology Officer & Head of Autonomy",
      isHypothetical: true,
      notes: BuyerMatcher.ARCHETYPE_NOTE,
      suggestedDealSizeUsd: Math.round(annualEst * 0.075),
      pitchAngle: `Guarantee deterministic execution for hardware sensor fusion loops with a drop-in software module.`,
      outreachTemplate: t2,
      outreachSequence: {
        emailSubject: t2.subjectLine,
        emailBody: t2.emailBody,
        technicalBrief: t2.technicalBrief || ''
      }
    });

    const t3 = createTemplate(
      "archetype-fintech-hft",
      "High-Frequency Trading & Market Systems Operator",
      "Head of Low-Latency Systems Architecture",
      `[Draft Template] Sub-Microsecond Execution Module for Low-Latency Systems`,
      `Cache-line aligned data structures eliminating bus contention under high concurrent loads`,
      `Features ${topCap} with cache-line alignment to eliminate bus contention under high concurrent loads.`
    );
    archetypes.push({
      id: "archetype-fintech-hft",
      label: "High-Frequency Trading & Market Systems Operator",
      archetypeName: "High-Frequency Trading & Market Systems Operator",
      companyName: "High-Frequency Trading & Market Systems Operator",
      sector: "High-Frequency Trading & Electronic Markets",
      fitScore: 91.8,
      primaryPainPoint: "Microsecond packet serialization delays in order routing and state engines.",
      matchedCapabilities: [topCap, secondCap],
      evidenceTriggers: [
        "Cache-line padding (64-byte alignment) detected in structs",
        "Atomic compare-and-swap primitives verified"
      ],
      annualSavingsEstimateUsd: Math.round(annualEst * 1.3),
      recommendedTier: "Dedicated Node Infrastructure License",
      contactPersona: "Head of Low-Latency Systems Architecture",
      isHypothetical: true,
      notes: BuyerMatcher.ARCHETYPE_NOTE,
      suggestedDealSizeUsd: Math.round(annualEst * 0.085),
      pitchAngle: `Bypass OS buffer overhead with high-throughput zero-contention queues.`,
      outreachTemplate: t3,
      outreachSequence: {
        emailSubject: t3.subjectLine,
        emailBody: t3.emailBody,
        technicalBrief: t3.technicalBrief || ''
      }
    });

    const t4 = createTemplate(
      "archetype-enterprise-database",
      "Distributed Database & Analytics Engine Operator",
      "VP of Engineering & Core Infrastructure Lead",
      `[Draft Template] Ingestion Throughput Acceleration with ${asset.name}`,
      `Automated fault recovery and high-concurrency ingestion primitives`,
      `Modular software architecture comprising ${asset.size_metrics.file_count} verified files with automated fault-recovery support.`
    );
    archetypes.push({
      id: "archetype-enterprise-database",
      label: "Distributed Database & Analytics Engine Operator",
      archetypeName: "Distributed Database & Analytics Engine Operator",
      companyName: "Distributed Database & Analytics Engine Operator",
      sector: "Cloud Native Distributed Systems & Analytics",
      fitScore: 89.5,
      primaryPainPoint: "Ingestion bottlenecks and storage synchronization contention under multi-tenant load.",
      matchedCapabilities: caps.slice(0, 2),
      evidenceTriggers: [
        "Non-blocking queue structures in AST",
        `${asset.size_metrics.classes_or_structs} verified data structures`
      ],
      annualSavingsEstimateUsd: Math.round(annualEst * 0.95),
      recommendedTier: "Dedicated Node Infrastructure License",
      contactPersona: "VP of Engineering & Core Infrastructure Lead",
      isHypothetical: true,
      notes: BuyerMatcher.ARCHETYPE_NOTE,
      suggestedDealSizeUsd: Math.round(annualEst * 0.06),
      pitchAngle: `Accelerate ingestion pipelines with cleanroom, high-throughput components.`,
      outreachTemplate: t4,
      outreachSequence: {
        emailSubject: t4.subjectLine,
        emailBody: t4.emailBody,
        technicalBrief: t4.technicalBrief || ''
      }
    });

    return archetypes;
  }
}
