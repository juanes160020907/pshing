import React from "react";

export default function Home({ onStart, totalXp, level }) {
  const modules = [
    {
      id: "email",
      icon: "📧",
      title: "Simulador de Email",
      desc: "Analiza correos reales e identifica las pistas de phishing haciendo clic en las zonas sospechosas.",
      color: "#00f5a0",
      tag: "Interactivo"
    },
    {
      id: "quiz",
      icon: "🎮",
      title: "Quiz Tipo Kahoot",
      desc: "8 preguntas con tiempo límite. Responde rápido para ganar más puntos. ¡Aprende jugando!",
      color: "#00b4d8",
      tag: "Competitivo"
    },
    {
      id: "spotfake",
      icon: "🔍",
      title: "¿Real o Falso?",
      desc: "Te mostramos mensajes de WhatsApp y SMS. Decide si son legítimos o estafas y descubre por qué.",
      color: "#a78bfa",
      tag: "Desafío"
    }
  ];

  const stats = [
    { num: "3.4B", label: "Phishing emails al día mundialmente" },
    { num: "97%", label: "De personas no detectan phishing sofisticado" },
    { num: "$17B", label: "Pérdidas globales anuales por phishing" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* HERO */}
      <div style={{
        textAlign: "center",
        padding: "5rem 1.5rem 3rem",
        position: "relative"
      }}>
        <div style={{
          display: "inline-block",
          padding: "0.4rem 1rem",
          borderRadius: "50px",
          background: "rgba(0,245,160,0.1)",
          border: "1px solid rgba(0,245,160,0.3)",
          color: "var(--accent)",
          fontSize: "0.85rem",
          fontWeight: 600,
          marginBottom: "1.5rem",
          letterSpacing: "0.1em"
        }}>
          🛡️ TALLER INTERACTIVO DE CIBERSEGURIDAD
        </div>

        <h1 className="display" style={{
          fontSize: "clamp(3rem, 10vw, 6rem)",
          lineHeight: 0.95,
          marginBottom: "1rem",
          background: "linear-gradient(135deg, #fff 30%, var(--accent))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          PHISHING<br />DEFENDER
        </h1>

        <p style={{
          color: "var(--text2)",
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          maxWidth: "560px",
          margin: "0 auto 2.5rem",
          lineHeight: 1.6
        }}>
          Aprende a identificar estafas digitales con juegos interactivos, ejemplos reales y un quiz estilo Kahoot.
          <strong style={{ color: "var(--text)" }}> Gratis. Sin registro. Empieza ahora.</strong>
        </p>

        <button className="btn btn-primary animate-glow" onClick={onStart} style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}>
          🚀 Comenzar Entrenamiento
        </button>

        {totalXp > 0 && (
          <div style={{ marginTop: "1rem", color: "var(--text2)", fontSize: "0.9rem" }}>
            Tu nivel actual: <span style={{ color: level.color, fontWeight: 700 }}>{level.icon} {level.name}</span>
            {" · "}<span style={{ color: "var(--accent)" }}>{totalXp} XP</span>
          </div>
        )}
      </div>

      {/* STATS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        maxWidth: "900px",
        margin: "0 auto 4rem",
        padding: "0 1.5rem"
      }}>
        {stats.map((s, i) => (
          <div key={i} className="card" style={{ textAlign: "center", animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
            <div className="display" style={{ fontSize: "2.5rem", color: "var(--accent)", marginBottom: "0.3rem" }}>{s.num}</div>
            <div style={{ color: "var(--text2)", fontSize: "0.85rem", lineHeight: 1.4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* MODULES */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <h2 className="display" style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "var(--text2)" }}>
          LOS 3 MÓDULOS DEL TALLER
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem" }}>
          {modules.map((m, i) => (
            <div
              key={m.id}
              className="card"
              style={{
                borderColor: `${m.color}30`,
                animation: `fadeInUp 0.5s ease ${i * 0.15}s both`,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 16px 40px ${m.color}25`;
                e.currentTarget.style.borderColor = `${m.color}60`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow)";
                e.currentTarget.style.borderColor = `${m.color}30`;
              }}
              onClick={onStart}
            >
              <div style={{
                position: "absolute", top: 0, right: 0,
                background: `${m.color}10`,
                padding: "0.3rem 0.8rem",
                borderRadius: "0 14px 0 8px",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: m.color,
                letterSpacing: "0.08em"
              }}>{m.tag}</div>

              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{m.icon}</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.6rem", color: m.color }}>{m.title}</h3>
              <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: 1.5 }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <div className="card" style={{ marginTop: "2rem", background: "rgba(0,245,160,0.03)", borderColor: "rgba(0,245,160,0.15)" }}>
          <h3 style={{ color: "var(--accent)", marginBottom: "1rem" }}>💡 ¿Cómo funciona este taller?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { step: "01", title: "Simula", desc: "Enfrenta correos, mensajes y situaciones reales de phishing en un entorno seguro." },
              { step: "02", title: "Descubre", desc: "Haz clic en las pistas ocultas. Aprende qué hace sospechoso a cada mensaje." },
              { step: "03", title: "Responde", desc: "Pon a prueba tu conocimiento con el quiz competitivo tipo Kahoot con tiempo límite." },
              { step: "04", title: "Comparte", desc: "Gana tu certificado digital y comparte el taller con amigos y familia." },
            ].map(s => (
              <div key={s.step}>
                <div className="display" style={{ fontSize: "1.5rem", color: "var(--accent)", opacity: 0.4 }}>{s.step}</div>
                <div style={{ fontWeight: 600, marginBottom: "0.3rem" }}>{s.title}</div>
                <div style={{ color: "var(--text2)", fontSize: "0.85rem", lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
