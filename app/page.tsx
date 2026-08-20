"use client";

import { useState } from "react";
import { InfoTip } from "@/components/InfoTip";

type Result = any;

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("code");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function run() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const r = await fetch("/api/commercialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, type }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Request failed");
      setResult(j);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand">IP CODE EXCHANGE</div>
        <div className="tag">4.2.0 • commercialization engine</div>
      </nav>

      <section className="hero">
        <h1>Find the commercial potential in your work.</h1>
        <p>
          Give us your IP. We analyze it and return a commercialization brief covering
          value, risk, licensing paths, buyer categories, and first-contact outreach.
        </p>
      </section>

      <section className="grid">
        <div className="card">
          <h2>Submit your work</h2>
          <p className="muted intro">
            You do not need to be a business analyst. Give the engine the material you already have.
          </p>

          <label className="label" htmlFor="asset-name">Asset name</label>
          <input
            id="asset-name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Autonomous Agent Framework"
          />

          <label className="label" htmlFor="asset-type">Asset type</label>
          <select id="asset-type" className="input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="code">Code / software</option>
            <option value="prototype">Prototype</option>
            <option value="dataset">Dataset</option>
            <option value="document">Documentation / concept</option>
          </select>

          <label className="label" htmlFor="asset-description">
            Your work
          </label>
          <textarea
            id="asset-description"
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your IP, paste relevant code or documentation, explain what you built, or give us the material you have."
          />
          <p className="helper">You can describe it, paste your work directly, or combine both.</p>

          <div className="actions">
            <button
              className="button"
              disabled={loading || !name.trim() || !description.trim()}
              onClick={run}
            >
              {loading ? "Analyzing your work…" : "Analyze my IP"}
            </button>
          </div>
          {error && <p className="error small">{error}</p>}
        </div>

        <div className="card">
          <h2>Your commercialization brief</h2>
          <p className="muted">One submission in. Commercial intelligence out.</p>

          <div className="pipeline" aria-label="Commercialization pipeline">
            <span className="pill">Analysis</span>
            <span className="pill">Value</span>
            <span className="pill">Risk</span>
            <span className="pill">Licensing</span>
            <span className="pill">Buyers</span>
            <span className="pill">Outreach</span>
          </div>

          {!result && !loading && (
            <div className="empty-state">
              <strong>Your results will appear here.</strong>
              <span>Submit your work to receive the first commercialization assessment.</span>
            </div>
          )}

          {loading && (
            <div className="empty-state loading-state">
              <strong>The engine is working.</strong>
              <span>Analyzing the technical and commercial signals in your submission.</span>
            </div>
          )}

          {result && (
            <div className="result">
              <div className="top-metrics">
                <div className="metric-card">
                  <div className="metric">${Number(result.valuation || 0).toLocaleString()}</div>
                  <div className="muted">
                    Screening valuation <InfoTip title="Screening valuation">
                      An early commercial estimate based on the signals available in the submission. It is not a formal appraisal or guaranteed market price.
                    </InfoTip>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric">{Math.round(Number(result.riskScore || 0) * 100)}%</div>
                  <div className="muted">
                    Estimated risk <InfoTip title="Risk score">
                      An estimate of commercialization difficulty. Higher values indicate more uncertainty or potential barriers to turning the IP into a commercial opportunity.
                    </InfoTip>
                  </div>
                </div>
              </div>

              <p>{result.summary}</p>

              <h3>Commercial components <InfoTip title="Commercial components">
                The parts of your work that may have independent commercial value, such as core technology, reusable components, know-how, or specialized capabilities.
              </InfoTip></h3>
              <ul>{(result.monetizableComponents || []).map((x: string) => <li key={x}>{x}</li>)}</ul>

              <h3>Licensing paths <InfoTip title="Licensing paths">
                Ways the IP could potentially generate revenue without necessarily selling the underlying asset outright.
              </InfoTip></h3>
              <ul>{(result.licensingPaths || []).map((x: string) => <li key={x}>{x}</li>)}</ul>

              <h3>Comparable markets <InfoTip title="Comparable markets">
                Market categories that provide context for where similar technology or commercial demand may exist. These are directional, not a list of confirmed buyers.
              </InfoTip></h3>
              <ul>{(result.comparableMarkets || []).map((x: string) => <li key={x}>{x}</li>)}</ul>

              <h3>Buyer targets <InfoTip title="Buyer fit score">
                A directional estimate of how well a buyer category may fit the capabilities or commercial use cases identified in your work. Human verification is required before outreach.
              </InfoTip></h3>
              {(result.buyers || []).map((b: any) => (
                <div className="buyer" key={b.name}>
                  <span className="score">{Math.round((b.fitScore || 0) * 100)}%</span>
                  <strong>{b.name}</strong>
                  <div className="muted">{b.segment}</div>
                  <div className="small">{b.reason}</div>
                </div>
              ))}

              <h3>First-contact outreach <InfoTip title="Outreach">
                Draft messaging intended to start a commercial conversation. Review and personalize it before sending.
              </InfoTip></h3>
              {(result.outreach || []).map((m: any, i: number) => (
                <div className="buyer" key={i}>
                  <strong>{m.subject}</strong>
                  <div className="small">{m.body}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="footer">
        AI-assisted commercial screening, not legal, accounting, patent, or investment advice.
        Buyer discovery is a starting point for human verification.
      </div>
    </main>
  );
}
