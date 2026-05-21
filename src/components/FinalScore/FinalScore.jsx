import React from "react";
import { LEVELS } from "../../data/gameData";

export default function FinalScore({ totalXp, badges, onRestart }) {
  const level = LEVELS.reduce((found, l) => totalXp >= l.min ? l : found, LEVELS[0]);
  const pct = Math.round((totalXp / 2800) * 100);

  const tips = [
    "Verifica SIEMPRE el dominio completo del remitente, letra por letra.",
    "Nunca compartas códigos SMS con nadie — ni con tu banco.",
    "La urgencia extrema es la señal #1 de una estafa. Más calma = más seguridad.",
    "Antes de hacer clic en un enlace, pasa el cursor por encima para ver la URL real.",
    "Llama directamente a la empresa usando el número que TÚ tienes, no el que te dan.",
    "Ninguna inversión garantiza el 200% mensual. Si parece mágico, es una pirámide.",
    "Instala un gestor de contraseñas y activa el doble factor de autenticación (2FA).",
  ];

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "3rem 1.5rem" }}>

      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🛡️</div>
        <h1 className="display" style={{
          fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
          background: "linear-gradient(135deg, #fff 30%, var(--accent))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          marginBottom: "0.5rem", lineHeight: 1
        }}>
          ENTRENAMIENTO<br />COMPLETADO
        </h1>
        <p style={{ color: "var(--text2)", marginTop: "1rem", fontSize: "1rem" }}>
          Has completado los 3 módulos del Taller de Prevención de Phishing
        </p>
      </div>

      {/* XP + Level card */}
      <div className="card" style={{
        textAlign: "center", marginBottom: "1.5rem",
        borderColor: `${level.color}40`,
        background: `linear-gradient(135deg, var(--card), ${level.color}08)`
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.3rem" }}>{level.icon}</div>
        <div className="display" style={{ fontSize: "2rem", color: level.color }}>{level.name}</div>
        <div style={{ fontSize: "3.5rem", fontWeight: 800, color: "var(--text)", margin: "0.5rem 0" }}>
          {totalXp.toLocaleString()} XP
        </div>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text2)" }}>Progreso total</span>
            <span style={{ fontSize: "0.8rem", color: level.color, fontWeight: 600 }}>{Math.min(pct, 100)}%</span>
          </div>
          <div className="progress-bar" style={{ height: "10px" }}>
            <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%`, background: `linear-gradient(90deg, ${level.color}, ${level.color}aa)` }} />
          </div>
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ color: "var(--text2)", fontSize: "0.82rem", letterSpacing: "0.06em", marginBottom: "1rem" }}>
            🏅 LOGROS DESBLOQUEADOS
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {badges.map((b, i) => (
              <div key={i} style={{
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                background: "rgba(0,245,160,0.08)",
                border: "1px solid rgba(0,245,160,0.25)",
                fontSize: "0.85rem", color: "var(--accent)", fontWeight: 500
              }}>
                {b}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate */}
      <div style={{
        border: "2px solid var(--accent)",
        borderRadius: "var(--radius)",
        padding: "2rem",
        marginBottom: "1.5rem",
        background: "rgba(0,245,160,0.03)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "repeating-linear-gradient(45deg, rgba(0,245,160,0.02), rgba(0,245,160,0.02) 10px, transparent 10px, transparent 20px)",
          pointerEvents: "none"
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--accent)", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
            ✦ CERTIFICADO DIGITAL ✦
          </div>
          <div className="display" style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
            PhishingDefender
          </div>
          <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: "1rem" }}>
            Este taller certifica que el participante ha completado el entrenamiento interactivo de <strong style={{ color: "var(--text)" }}>Prevención de Phishing y Estafas Digitales</strong>, demostrando capacidad para identificar correos maliciosos, mensajes fraudulentos y tácticas de engaño en línea.
          </p>
          <div style={{ fontSize: "0.8rem", color: "var(--text2)" }}>
            🛡️ Módulo 1: Simulador de Email · 🎮 Módulo 2: Quiz Anti-Phishing · 🔍 Módulo 3: ¿Real o Falso?
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem", color: "var(--text2)", fontSize: "0.85rem", letterSpacing: "0.06em" }}>
          💡 7 REGLAS DE ORO PARA SIEMPRE
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {tips.map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "rgba(0,245,160,0.15)", border: "1px solid rgba(0,245,160,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)",
                flexShrink: 0, marginTop: "1px"
              }}>{i + 1}</div>
              <p style={{ color: "var(--text2)", fontSize: "0.88rem", lineHeight: 1.5 }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={onRestart} style={{ flex: 1, justifyContent: "center" }}>
          🔄 Repetir el Taller
        </button>
        <button
          className="btn btn-outline"
          style={{ flex: 1, justifyContent: "center" }}
          onClick={() => {
            const text = `🛡️ Completé el Taller de Prevención de Phishing con ${totalXp} XP y nivel ${level.name}. ¿Tú también sabrías detectar estafas digitales?`;
            if (navigator.share) {
              navigator.share({ title: "PhishingDefender", text });
            } else {
              navigator.clipboard.writeText(text).then(() => alert("¡Copiado al portapapeles! Comparte con tus amigos."));
            }
          }}
        >
          📤 Compartir Resultado
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem", color: "var(--text2)", fontSize: "0.8rem" }}>
        Comparte este taller con amigos y familia · La educación es la mejor defensa
      </div>
    </div>
  );
}
