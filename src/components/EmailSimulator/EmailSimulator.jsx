import React, { useState } from "react";
import { EMAIL_SCENARIOS } from "../../data/gameData";

const HOTSPOT_POSITIONS = {
  from: { top: "12%", left: "0", width: "100%", height: "30px" },
  reply: { top: "18%", left: "0", width: "100%", height: "26px" },
  link: { top: "52%", left: "0", width: "100%", height: "28px" },
  urgency: { top: "66%", left: "0", width: "100%", height: "30px" },
  credentials: { top: "58%", left: "0", width: "100%", height: "28px" },
  docs: { top: "55%", left: "0", width: "100%", height: "55px" },
  phone: { top: "73%", left: "0", width: "100%", height: "26px" },
  time: { top: "8%", left: "0", width: "60%", height: "24px" },
  logic: { top: "38%", left: "0", width: "100%", height: "26px" },
};

export default function EmailSimulator({ onComplete, onXP }) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [foundClues, setFoundClues] = useState([]);
  const [activeClue, setActiveClue] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [done, setDone] = useState(false);

  const scenario = EMAIL_SCENARIOS[scenarioIdx];

  const clickClue = (clue) => {
    setActiveClue(clue);
    if (!foundClues.includes(clue.id)) {
      const updated = [...foundClues, clue.id];
      setFoundClues(updated);
      onXP(80);
      if (updated.length === scenario.clues.length) {
        setTimeout(() => setShowExplanation(true), 600);
      }
    }
  };

  const nextScenario = () => {
    if (scenarioIdx < EMAIL_SCENARIOS.length - 1) {
      setScenarioIdx(scenarioIdx + 1);
      setFoundClues([]);
      setActiveClue(null);
      setShowExplanation(false);
    } else {
      setDone(true);
      onXP(200);
      onComplete();
    }
  };

  if (done) return null;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <h2 className="display" style={{ fontSize: "1.8rem" }}>📧 SIMULADOR DE EMAIL</h2>
          <span className="badge badge-green">Módulo 1 de 3</span>
          <span className={`badge ${scenario.difficulty === "Fácil" ? "badge-green" : scenario.difficulty === "Medio" ? "badge-yellow" : "badge-red"}`}>
            {scenario.difficulty}
          </span>
        </div>
        <p style={{ color: "var(--text2)", fontSize: "0.9rem" }}>
          Correo {scenarioIdx + 1} de {EMAIL_SCENARIOS.length}: <strong style={{ color: "var(--text)" }}>{scenario.label}</strong>
          {" · "}Haz clic en las partes sospechosas del correo para descubrirlas.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem" }}>
          {scenario.clues.map(c => (
            <div key={c.id} style={{
              width: 12, height: 12, borderRadius: "50%",
              background: foundClues.includes(c.id) ? "var(--accent)" : "var(--border)",
              transition: "background 0.3s",
              boxShadow: foundClues.includes(c.id) ? "0 0 8px var(--accent)" : "none"
            }} title={c.label} />
          ))}
          <span style={{ marginLeft: "0.5rem", color: "var(--text2)", fontSize: "0.8rem" }}>
            {foundClues.length}/{scenario.clues.length} pistas
          </span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

        {/* EMAIL PREVIEW */}
        <div>
          <div style={{
            background: "#0f1722",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            position: "relative"
          }}>
            {/* Email toolbar */}
            <div style={{ background: "#081015", padding: "0.6rem 1rem", borderBottom: "1px solid var(--border)", display: "flex", gap: "6px" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f87171" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fbbf24" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--text2)" }}>📥 Bandeja de entrada</span>
            </div>

            {/* Email headers */}
            <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", position: "relative" }}>
              {/* FROM row with hotspot */}
              <EmailRow
                label="De:"
                value={scenario.email.from}
                hotspot="from"
                clues={scenario.clues}
                foundClues={foundClues}
                activeClue={activeClue}
                onClick={clickClue}
                highlight
              />
              {scenario.email.replyTo && (
                <EmailRow
                  label="Responder a:"
                  value={scenario.email.replyTo}
                  hotspot="reply"
                  clues={scenario.clues}
                  foundClues={foundClues}
                  activeClue={activeClue}
                  onClick={clickClue}
                />
              )}
              <EmailRow label="Fecha:" value={scenario.email.date} />
              <EmailRow
                label="Asunto:"
                value={scenario.email.subject}
                hotspot="urgency"
                clues={scenario.clues}
                foundClues={foundClues}
                activeClue={activeClue}
                onClick={clickClue}
                bold
              />
            </div>

            {/* Email body */}
            <div style={{ padding: "1.2rem", lineHeight: 1.7, fontSize: "0.88rem", color: "#c8d0e0" }}>
              {scenario.email.body.map((para, i) => {
                const isLink = para.includes("http");
                const isUrgency = para.toLowerCase().includes("bloqueada") || para.toLowerCase().includes("permanente") || para.toLowerCase().includes("horas") || para.toLowerCase().includes("deleted");
                const isCredentials = para.toLowerCase().includes("contraseña") || para.toLowerCase().includes("coordenadas") || para.toLowerCase().includes("cédula") || para.toLowerCase().includes("cuenta bancaria");
                const isDocs = para.toLowerCase().includes("foto") || para.toLowerCase().includes("selfie");

                let hotspot = null;
                let clue = null;
                if (isLink) { hotspot = "link"; }
                if (isUrgency && !isLink) { hotspot = "urgency"; }
                if (isCredentials) { hotspot = "credentials"; }
                if (isDocs) { hotspot = "docs"; }
                if (para.toLowerCase().includes("llame") || para.toLowerCase().includes("call")) hotspot = "phone";
                if (para.toLowerCase().includes("lógica") || para.toLowerCase().includes("no participaste") || para.toLowerCase().includes("selected")) hotspot = "logic";

                if (hotspot) {
                  clue = scenario.clues.find(c => c.hotspot === hotspot);
                }

                const isFound = clue && foundClues.includes(clue.id);
                const isActive = clue && activeClue?.id === clue.id;

                return (
                  <p key={i}
                    onClick={() => clue && clickClue(clue)}
                    style={{
                      marginBottom: "0.8rem",
                      padding: "0.3rem 0.5rem",
                      borderRadius: "6px",
                      cursor: clue ? "pointer" : "default",
                      background: isActive ? "rgba(0,245,160,0.12)" : isFound ? "rgba(0,245,160,0.06)" : "transparent",
                      border: isActive ? "1px solid rgba(0,245,160,0.4)" : isFound ? "1px solid rgba(0,245,160,0.2)" : "1px solid transparent",
                      transition: "all 0.2s",
                      whiteSpace: "pre-line",
                      color: isLink ? "#60a5fa" : isFound ? "var(--accent)" : "#c8d0e0",
                      textDecoration: isLink ? "underline" : "none",
                      position: "relative"
                    }}
                    onMouseEnter={e => { if (clue && !isFound) e.currentTarget.style.background = "rgba(0,245,160,0.05)"; }}
                    onMouseLeave={e => { if (!isActive && !isFound) e.currentTarget.style.background = "transparent"; }}
                  >
                    {para}
                    {clue && !isFound && (
                      <span style={{
                        position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
                        fontSize: "0.7rem", color: "var(--warn)", animation: "pulse 1.5s ease infinite"
                      }}>👆 clic</span>
                    )}
                    {isFound && <span style={{ marginLeft: "6px", fontSize: "0.75rem" }}>✅</span>}
                  </p>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: "0.8rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button className="btn btn-danger" style={{ flex: 1, justifyContent: "center" }}>
              🗑️ Eliminar
            </button>
            <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem" }}>
              ⚠️ Reportar spam
            </button>
          </div>
        </div>

        {/* RIGHT PANEL - Clue info + found list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Active clue panel */}
          <div className="card" style={{
            borderColor: activeClue ? "rgba(0,245,160,0.4)" : "var(--border)",
            minHeight: "160px",
            transition: "border-color 0.3s"
          }}>
            {activeClue ? (
              <div className="animate-scaleIn">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.8rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>🔍</span>
                  <span style={{ fontWeight: 700, color: "var(--accent)" }}>{activeClue.label}</span>
                </div>
                <p style={{ color: "var(--text2)", lineHeight: 1.6, fontSize: "0.9rem" }}>{activeClue.detail}</p>
              </div>
            ) : (
              <div style={{ textAlign: "center", color: "var(--text2)", paddingTop: "1.5rem" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem", opacity: 0.4 }}>🎯</div>
                <p style={{ fontSize: "0.9rem" }}>Haz clic en las partes<br />sospechosas del correo</p>
              </div>
            )}
          </div>

          {/* Clues list */}
          <div className="card">
            <h4 style={{ marginBottom: "1rem", color: "var(--text2)", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
              PISTAS A ENCONTRAR
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {scenario.clues.map(c => {
                const found = foundClues.includes(c.id);
                const active = activeClue?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => clickClue(c)}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      padding: "0.6rem 0.8rem",
                      borderRadius: "8px",
                      background: active ? "rgba(0,245,160,0.1)" : found ? "rgba(0,245,160,0.05)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${active ? "rgba(0,245,160,0.4)" : found ? "rgba(0,245,160,0.2)" : "var(--border)"}`,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                      background: found ? "var(--accent)" : "var(--border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem", color: found ? "var(--bg)" : "var(--text2)",
                      transition: "all 0.3s",
                      boxShadow: found ? "0 0 8px var(--accent)" : "none"
                    }}>
                      {found ? "✓" : "?"}
                    </div>
                    <span style={{
                      fontSize: "0.85rem",
                      color: found ? "var(--text)" : "var(--text2)",
                      fontWeight: found ? 600 : 400
                    }}>
                      {found ? c.label : "Pista oculta..."}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation / Next button */}
          {showExplanation && (
            <div className="card animate-scaleIn" style={{ borderColor: "rgba(0,245,160,0.4)", background: "rgba(0,245,160,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.8rem" }}>
                <span style={{ fontSize: "1.3rem" }}>🎉</span>
                <span style={{ fontWeight: 700, color: "var(--accent)" }}>¡Encontraste todas las pistas!</span>
              </div>
              <p style={{ color: "var(--text2)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                {scenario.explanation}
              </p>
              <button className="btn btn-primary" onClick={nextScenario} style={{ width: "100%", justifyContent: "center" }}>
                {scenarioIdx < EMAIL_SCENARIOS.length - 1 ? "Siguiente correo →" : "¡Completado! Ir al Quiz →"}
              </button>
            </div>
          )}

          {!showExplanation && foundClues.length > 0 && foundClues.length < scenario.totalClues && (
            <div className="card" style={{ background: "rgba(251,191,36,0.05)", borderColor: "rgba(251,191,36,0.3)" }}>
              <p style={{ color: "var(--warn)", fontSize: "0.85rem", textAlign: "center" }}>
                Faltan {scenario.totalClues - foundClues.length} pistas más. ¡Sigue explorando!
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}

function EmailRow({ label, value, hotspot, clues, foundClues, activeClue, onClick, highlight, bold }) {
  const clue = clues && hotspot ? clues.find(c => c.hotspot === hotspot) : null;
  const found = clue && foundClues && foundClues.includes(clue.id);
  const active = clue && activeClue?.id === clue.id;

  return (
    <div
      onClick={() => clue && onClick(clue)}
      style={{
        display: "flex", gap: "0.5rem", alignItems: "flex-start",
        padding: "0.3rem 0.4rem",
        borderRadius: "6px",
        cursor: clue ? "pointer" : "default",
        background: active ? "rgba(0,245,160,0.12)" : found ? "rgba(0,245,160,0.06)" : "transparent",
        border: active ? "1px solid rgba(0,245,160,0.3)" : found ? "1px solid rgba(0,245,160,0.15)" : "1px solid transparent",
        marginBottom: "0.3rem",
        transition: "all 0.2s"
      }}
    >
      <span style={{ color: "var(--text2)", fontSize: "0.78rem", minWidth: 80, paddingTop: "1px" }}>{label}</span>
      <span style={{
        fontSize: "0.82rem",
        color: found ? "var(--accent)" : highlight ? "#60a5fa" : "var(--text)",
        fontWeight: bold ? 600 : 400,
        wordBreak: "break-all"
      }}>
        {value}
        {found && <span style={{ marginLeft: "6px" }}>✅</span>}
      </span>
    </div>
  );
}
