import React from "react";
import { SCREENS } from "../../hooks/useGameState";

export default function Navbar({ screen, totalXp, level, onHome }) {
  const steps = [
    { id: SCREENS.EMAIL, label: "Email", icon: "📧" },
    { id: SCREENS.QUIZ, label: "Quiz", icon: "🎮" },
    { id: SCREENS.SPOTFAKE, label: "¿Real?", icon: "🔍" },
  ];

  const activeIdx = steps.findIndex(s => s.id === screen);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(4,7,15,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      padding: "0.7rem 1.5rem",
      display: "flex", alignItems: "center", gap: "1rem"
    }}>
      {/* Logo */}
      <button
        onClick={onHome}
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "0.5rem",
          color: "var(--text)", fontFamily: "var(--font-display)",
          fontSize: "1.1rem", letterSpacing: "0.05em"
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>🛡️</span>
        <span style={{ color: "var(--accent)" }}>PHISHING</span>DEFENDER
      </button>

      {/* Steps */}
      {screen !== SCREENS.HOME && screen !== SCREENS.FINAL && (
        <div style={{ display: "flex", gap: "0.4rem", marginLeft: "1rem" }}>
          {steps.map((s, i) => {
            const active = s.id === screen;
            const done = i < activeIdx;
            return (
              <div key={s.id} style={{
                display: "flex", alignItems: "center", gap: "0.3rem",
                padding: "0.25rem 0.7rem", borderRadius: "50px",
                background: active ? "rgba(0,245,160,0.15)" : done ? "rgba(0,245,160,0.05)" : "transparent",
                border: `1px solid ${active ? "rgba(0,245,160,0.5)" : done ? "rgba(0,245,160,0.2)" : "var(--border)"}`,
                fontSize: "0.75rem", fontWeight: active ? 700 : 400,
                color: active ? "var(--accent)" : done ? "var(--accent)" : "var(--text2)",
                transition: "all 0.3s"
              }}>
                <span>{done ? "✓" : s.icon}</span>
                <span style={{ display: "none", [window.innerWidth > 600 ? "display" : ""]: "inline" }}>{s.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* XP display */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {totalXp > 0 && (
          <>
            <span style={{ fontSize: "1rem" }}>{level.icon}</span>
            <div>
              <div style={{ fontSize: "0.7rem", color: "var(--text2)", lineHeight: 1 }}>{level.name}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1.2 }}>
                {totalXp} XP
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
