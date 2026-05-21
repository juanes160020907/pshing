import React from "react";

export default function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: "0.5rem" }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text2)" }}>{label}</span>
          <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>{pct}%</span>
        </div>
      )}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
