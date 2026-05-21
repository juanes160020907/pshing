import React, { useState } from "react";
import { SPOT_FAKE_MESSAGES } from "../../data/gameData";

export default function GameSpotFake({ onComplete, onXP }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState(null); // null | true | false
  const [showClues, setShowClues] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState([]);

  const msg = SPOT_FAKE_MESSAGES[index];

  const handleAnswer = (isReal) => {
    if (answer !== null) return;
    setAnswer(isReal);
    const correct = isReal === msg.isReal;
    if (correct) {
      onXP(150);
      setScore(s => s + 1);
    }
    setResults(prev => [...prev, { id: msg.id, correct, isReal: msg.isReal, type: msg.type }]);
    setShowClues(true);
  };

  const next = () => {
    if (index + 1 >= SPOT_FAKE_MESSAGES.length) {
      setDone(true);
      onXP(200);
      onComplete(score + (answer === msg.isReal ? 1 : 0));
    } else {
      setIndex(i => i + 1);
      setAnswer(null);
      setShowClues(false);
    }
  };

  if (done) return <SpotFakeFinal results={results} total={SPOT_FAKE_MESSAGES.length} />;

  const isCorrect = answer !== null && answer === msg.isReal;
  const isWrong = answer !== null && answer !== msg.isReal;

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <h2 className="display" style={{ fontSize: "1.8rem" }}>🔍 ¿REAL O FALSO?</h2>
          <span className="badge badge-green">Módulo 3 de 3</span>
        </div>
        <p style={{ color: "var(--text2)", fontSize: "0.9rem" }}>
          Mensaje {index + 1} de {SPOT_FAKE_MESSAGES.length} · Decide si el mensaje es legítimo o una estafa.
        </p>
        <div style={{ display: "flex", gap: "0.4rem", marginTop: "0.8rem" }}>
          {SPOT_FAKE_MESSAGES.map((_, i) => (
            <div key={i} style={{
              width: 28, height: 6, borderRadius: 3,
              background: i < index
                ? (results[i]?.correct ? "var(--accent)" : "var(--danger)")
                : i === index ? "var(--warn)" : "var(--border)",
              transition: "background 0.3s"
            }} />
          ))}
        </div>
      </div>

      {/* Message Card */}
      <div className="card" style={{ marginBottom: "1.2rem", padding: 0, overflow: "hidden" }}>
        {/* Message header */}
        <div style={{
          padding: "0.8rem 1.2rem",
          background: msg.type === "WhatsApp" ? "#0a2a1a" : "#0a1525",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", gap: "0.75rem"
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: msg.type === "WhatsApp" ? "#25D366" : "#1a3d6e",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.2rem", flexShrink: 0
          }}>
            {msg.type === "WhatsApp" ? "💬" : "📱"}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{msg.sender}</div>
            <div style={{ color: "var(--text2)", fontSize: "0.75rem" }}>
              {msg.type} · {msg.time}
            </div>
          </div>
          <span className="badge" style={{
            marginLeft: "auto",
            background: msg.type === "WhatsApp" ? "rgba(37,211,102,0.1)" : "rgba(0,180,216,0.1)",
            color: msg.type === "WhatsApp" ? "#25D366" : "var(--accent2)",
            border: `1px solid ${msg.type === "WhatsApp" ? "rgba(37,211,102,0.3)" : "rgba(0,180,216,0.3)"}`,
          }}>
            {msg.type}
          </span>
        </div>

        {/* Message bubble */}
        <div style={{ padding: "1.5rem" }}>
          <div style={{
            background: msg.type === "WhatsApp" ? "#1a3a28" : "#111c2e",
            border: `1px solid ${msg.type === "WhatsApp" ? "rgba(37,211,102,0.15)" : "rgba(0,180,216,0.15)"}`,
            borderRadius: "0 12px 12px 12px",
            padding: "1rem 1.2rem",
            fontSize: "0.92rem",
            lineHeight: 1.65,
            color: "var(--text)",
            maxWidth: "90%",
            position: "relative"
          }}>
            {msg.message}
            <div style={{
              marginTop: "0.4rem", fontSize: "0.72rem", color: "var(--text2)",
              textAlign: "right"
            }}>
              {msg.time} {msg.type === "WhatsApp" && "✓✓"}
            </div>
          </div>
        </div>
      </div>

      {/* Answer buttons */}
      {answer === null && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.2rem" }}>
          <button
            onClick={() => handleAnswer(true)}
            style={{
              padding: "1.2rem",
              borderRadius: "12px",
              border: "2px solid rgba(0,245,160,0.4)",
              background: "rgba(0,245,160,0.08)",
              color: "var(--accent)",
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,245,160,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,245,160,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            ✅ REAL / LEGÍTIMO
          </button>
          <button
            onClick={() => handleAnswer(false)}
            style={{
              padding: "1.2rem",
              borderRadius: "12px",
              border: "2px solid rgba(248,113,113,0.4)",
              background: "rgba(248,113,113,0.08)",
              color: "var(--danger)",
              fontFamily: "var(--font-body)",
              fontSize: "1.1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(248,113,113,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(248,113,113,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            🚨 ESTAFA / FALSO
          </button>
        </div>
      )}

      {/* Result + Clues */}
      {showClues && (
        <div className="animate-scaleIn">
          {/* Result banner */}
          <div style={{
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            background: isCorrect ? "rgba(0,245,160,0.08)" : "rgba(248,113,113,0.08)",
            border: `2px solid ${isCorrect ? "rgba(0,245,160,0.4)" : "rgba(248,113,113,0.4)"}`,
            marginBottom: "1rem",
            display: "flex", alignItems: "flex-start", gap: "1rem"
          }}>
            <span style={{ fontSize: "2rem" }}>{isCorrect ? "🎉" : "💡"}</span>
            <div>
              <div style={{
                fontWeight: 700, marginBottom: "0.4rem",
                color: isCorrect ? "var(--accent)" : "var(--danger)",
                fontSize: "1rem"
              }}>
                {isCorrect ? "¡Correcto! +150 XP" : `Incorrecto — era ${msg.isReal ? "✅ REAL" : "🚨 FALSO"}`}
              </div>
              <p style={{ color: "var(--text2)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                {msg.explanation}
              </p>
            </div>
          </div>

          {/* Clues grid */}
          <div className="card" style={{ marginBottom: "1rem" }}>
            <h4 style={{ color: "var(--text2)", fontSize: "0.82rem", letterSpacing: "0.05em", marginBottom: "0.8rem" }}>
              🔑 SEÑALES CLAVE DE ESTE MENSAJE
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.6rem" }}>
              {msg.clues.map((clue, i) => (
                <div key={i} style={{
                  padding: "0.6rem 0.8rem",
                  borderRadius: "8px",
                  background: msg.isReal ? "rgba(0,245,160,0.05)" : "rgba(248,113,113,0.05)",
                  border: `1px solid ${msg.isReal ? "rgba(0,245,160,0.2)" : "rgba(248,113,113,0.2)"}`,
                  fontSize: "0.82rem", color: "var(--text2)", lineHeight: 1.4,
                  display: "flex", alignItems: "flex-start", gap: "0.5rem"
                }}>
                  <span>{msg.isReal ? "✅" : "⚠️"}</span>
                  <span>{clue}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={next} style={{ width: "100%", justifyContent: "center" }}>
            {index + 1 >= SPOT_FAKE_MESSAGES.length ? "🏆 Ver Resultado Final" : "Siguiente mensaje →"}
          </button>
        </div>
      )}

      <style>{`
        @keyframes scaleIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
        .animate-scaleIn { animation: scaleIn 0.35s ease both; }
      `}</style>
    </div>
  );
}

function SpotFakeFinal({ results, total }) {
  const correct = results.filter(r => r.correct).length;
  const pct = Math.round((correct / total) * 100);
  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "3rem 1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
      <h2 className="display" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>MÓDULO COMPLETADO</h2>
      <p style={{ color: "var(--text2)", marginBottom: "2rem" }}>
        Identificaste {correct} de {total} mensajes correctamente ({pct}%)
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {[
          { label: "Correctos", val: correct, color: "var(--accent)" },
          { label: "Incorrectos", val: total - correct, color: "var(--danger)" },
          { label: "Precisión", val: `${pct}%`, color: "var(--warn)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginTop: "0.2rem" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
