/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  Check, 
  Sparkles, 
  Mail, 
  Users, 
  Target, 
  Copy, 
  ShieldAlert,
  HelpCircle,
  FileCheck2,
  Cpu,
  Layers
} from 'lucide-react';
import { BuyerArchetype } from '../types';

interface BuyerDiscoveryAndOutreachViewProps {
  buyerArchetypes?: BuyerArchetype[];
  buyerMatches?: BuyerArchetype[];
  assetName: string;
  onOpenAiAudit: () => void;
}

export const BuyerDiscoveryAndOutreachView: React.FC<BuyerDiscoveryAndOutreachViewProps> = ({
  buyerArchetypes,
  buyerMatches,
  assetName,
  onOpenAiAudit
}) => {
  const archetypes = buyerArchetypes || buyerMatches || [];
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>(archetypes[0]?.id || '');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [sentMap, setSentMap] = useState<Record<string, boolean>>({});

  const selectedArchetype = archetypes.find(b => b.id === selectedArchetypeId) || archetypes[0];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSendOutreach = (archetypeId: string) => {
    setSentMap(prev => ({ ...prev, [archetypeId]: true }));
  };

  const totalPipelineUsd = archetypes.reduce((acc, b) => acc + (b.suggestedDealSizeUsd || 0), 0);

  return (
    <div className="space-y-4">
      {/* 1. Top Header with Clear Archetype Disclaimer */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-5 md:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1a1a1a]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Layer 4 // Buyer Archetype Fit
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Hypothetical Archetypes Only
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                Asset: <strong className="text-neutral-200">{assetName}</strong>
              </span>
            </div>
            <h2 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
              Hypothetical Buyer Archetypes (Evidence‑Linked, Non‑Lead)
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Inferred from your asset’s capabilities and metrics. Not real companies or discovered leads.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="ai-audit-btn-from-buyers"
              onClick={onOpenAiAudit}
              className="flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 px-3.5 py-2 rounded-xl text-xs font-semibold font-mono transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Archetype Audit</span>
            </button>
          </div>
        </div>

        {/* Mandatory Persistent Banner */}
        <div className="p-3.5 bg-[#050505] rounded-xl border border-[#2a2a2a] text-xs text-neutral-300 leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 block font-mono uppercase text-[11px] mb-0.5">
              Evidence-Inferred Hypothetical Archetypes
            </strong>
            <span>
              This is a hypothetical buyer archetype inferred from your asset’s capabilities. It is not a real company, not a discovered lead, and not marketing advice. Human verification and targeting required.
            </span>
          </div>
        </div>

        {/* Aggregate Archetype Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 font-mono text-xs">
          <div className="bg-[#050505] p-3.5 rounded-xl border border-[#1a1a1a]">
            <span className="text-[10px] text-neutral-500 uppercase block">Modeled Archetypes</span>
            <span className="text-xl font-bold text-white mt-1 block">{archetypes.length} Inferred Profiles</span>
            <span className="text-[10px] text-blue-400 block mt-0.5">Ranked by Heuristic Fit</span>
          </div>

          <div className="bg-[#050505] p-3.5 rounded-xl border border-[#1a1a1a]">
            <span className="text-[10px] text-neutral-500 uppercase block">Modeled Pipeline Yield</span>
            <span className="text-xl font-bold text-blue-400 mt-1 block">
              ${totalPipelineUsd.toLocaleString()}
            </span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">Hypothetical Annual Benchmark</span>
          </div>

          <div className="bg-[#050505] p-3.5 rounded-xl border border-[#1a1a1a]">
            <span className="text-[10px] text-neutral-500 uppercase block">Target Persona Coverage</span>
            <span className="text-xl font-bold text-cyan-400 mt-1 block">
              VP & CTO Roles
            </span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">Infrastructure decision makers</span>
          </div>

          <div className="bg-[#050505] p-3.5 rounded-xl border border-[#1a1a1a]">
            <span className="text-[10px] text-neutral-500 uppercase block">Outreach Template Readiness</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">
              {archetypes.length} Generated
            </span>
            <span className="text-[10px] text-neutral-400 block mt-0.5">Editable starting drafts</span>
          </div>
        </div>
      </div>

      {/* 2. Main Archetype Explorer & Draft Outreach Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Inferred Archetype List (5 cols) */}
        <div className="lg:col-span-5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1a1a1a]">
              <span className="text-xs font-bold text-neutral-400 uppercase font-mono tracking-wider">
                Hypothetical Archetypes ({archetypes.length})
              </span>
              <span className="text-[10px] font-mono text-neutral-500">Evidence Inferred</span>
            </div>

            <div className="space-y-2.5">
              {archetypes.map((archetype) => {
                const isSelected = selectedArchetype?.id === archetype.id;
                const isSent = sentMap[archetype.id];
                return (
                  <div
                    key={archetype.id}
                    id={`archetype-card-${archetype.id}`}
                    onClick={() => setSelectedArchetypeId(archetype.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#111111] border-blue-500/60 shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                        : 'bg-[#050505] border-[#1a1a1a] hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Building2 className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-blue-400' : 'text-neutral-500'}`} />
                          <h4 className="text-xs font-bold text-white font-mono truncate">
                            Archetype: {archetype.label}
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-blue-400 font-mono flex-shrink-0">
                          Fit score (heuristic): {(archetype.fitScore > 1 ? archetype.fitScore / 100 : archetype.fitScore).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-400 mb-2 truncate">
                        Sector: {archetype.sector}
                      </p>

                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-2 border-t border-[#1a1a1a]">
                        <span>Persona: <strong className="text-neutral-300">{archetype.contactPersona}</strong></span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#111111] text-purple-400 border border-purple-500/20 font-bold">
                          HYPOTHETICAL
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1a1a1a] text-[10px] font-mono text-neutral-500 flex items-center justify-between">
            <span>Archetype Generator</span>
            <span className="text-blue-400 font-semibold">Evidence-Linked Personas</span>
          </div>
        </div>

        {/* Right: Selected Archetype Details, Evidence Linkage & Draft Template (7 cols) */}
        <div className="lg:col-span-7 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
          {selectedArchetype && (
            <div className="space-y-4">
              {/* Archetype Overview Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1a1a1a]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                      Fit score (heuristic): {(selectedArchetype.fitScore > 1 ? selectedArchetype.fitScore / 100 : selectedArchetype.fitScore).toFixed(2)}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase font-bold">
                      Hypothetical Target
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Sector: {selectedArchetype.sector}</span>
                  </div>
                  <h3 className="text-base font-bold text-white font-mono">
                    Archetype: {selectedArchetype.label}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-neutral-500 block">Target Contact Persona</span>
                  <span className="text-xs font-bold text-blue-400 font-mono block mt-0.5">
                    {selectedArchetype.contactPersona}
                  </span>
                </div>
              </div>

              {/* 3. Evidence Linkage Surfaced */}
              <div className="p-3.5 bg-[#050505] rounded-xl border border-[#1a1a1a]">
                <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-2 font-bold tracking-wider flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Generated because we detected:</span>
                </span>
                <div className="space-y-1.5">
                  {(selectedArchetype.evidenceTriggers || selectedArchetype.matchedCapabilities || []).map((trigger, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                      <span>{trigger}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer on Card */}
              <div className="p-3 bg-[#050505] rounded-xl border border-[#1e1e1e] text-[11px] text-neutral-400 font-mono leading-relaxed">
                This is a hypothetical buyer archetype inferred from your asset’s capabilities. It is not a real company, not a discovered lead, and not marketing advice. Human verification and targeting required.
              </div>

              {/* 4. Draft Outreach Templates */}
              <div>
                <div className="mb-2">
                  <h4 className="text-xs font-bold text-white font-mono uppercase">
                    Draft Outreach Templates (Persona‑Level, Compliance‑Friendly)
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Starting points for human‑crafted outreach. Not campaigns, not advice.
                  </p>
                </div>

                <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                  <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Template for: {selectedArchetype.contactPersona} ({selectedArchetype.label})</span>
                  </span>
                  <button
                    id="copy-outreach-email-btn"
                    onClick={() => handleCopy(`${selectedArchetype.outreachTemplate?.subjectLine || selectedArchetype.outreachSequence.emailSubject}\n\n${selectedArchetype.outreachTemplate?.emailBody || selectedArchetype.outreachSequence.emailBody}`, 'email')}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copiedField === 'email' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'email' ? 'Copied' : 'Copy Template'}</span>
                  </button>
                </div>

                <div className="bg-[#050505] p-3.5 rounded-xl border border-[#1a1a1a] text-xs font-mono text-neutral-300 space-y-2">
                  <div className="p-2.5 bg-[#111111] rounded-lg border border-[#1e1e1e] text-[11px] text-neutral-400 leading-relaxed">
                    This is a draft outreach template for a hypothetical buyer archetype. You must replace archetype details with real company and contact information, verify fit, and obtain legal/compliance review before use.
                  </div>
                  <div className="text-blue-400 pb-1.5 border-b border-[#1a1a1a] font-semibold">
                    Subject: {selectedArchetype.outreachTemplate?.subjectLine || selectedArchetype.outreachSequence.emailSubject}
                  </div>
                  <div className="whitespace-pre-wrap text-neutral-300 text-[11px] leading-relaxed max-h-48 overflow-y-auto scrollbar-thin">
                    {selectedArchetype.outreachTemplate?.emailBody || selectedArchetype.outreachSequence.emailBody}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Persistent Footer Disclaimer */}
          <div className="pt-3 border-t border-[#1a1a1a] text-[11px] text-neutral-400 leading-relaxed font-mono">
            AI‑generated outreach templates are not real leads, not marketing advice, and not legal guidance. You are responsible for targeting, consent, and compliance with all applicable laws.
          </div>
        </div>
      </div>
    </div>
  );
};
