import React, { useState, useEffect, useRef } from "react";
import { QUIZ_QUESTIONS } from "../../data/gameData";

const OPTION_COLORS = [
  { bg: "#e74c3c", hover: "#c0392b", icon: "△", label: "A" },
  { bg: "#2980b9", hover: "#1a6fa8", icon: "◆", label: "B" },
  { bg: "#27ae60", hover: "#1e8449", icon: "●", label: "C" },
  { bg: "#f39c12", hover: "#d68910", icon: "■", label: "D" },
];

export default function QuizKahoot({ onComplete, onXP }) {
  const [phase, setPhase] = useState("intro"); // intro | countdown | question | result | final
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selected, setSelected] = useState(null);
  const [scores, setScores] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef(null);

  const question = QUIZ_QUESTIONS[qIndex];
  const maxTime = question?.timeLimit || 20;

  // Countdown before question
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) { setPhase("question"); setTimeLeft(maxTime); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown, maxTime]);

  // Question timer
  useEffect(() => {
    if (phase !== "question") return;
    if (timeLeft <= 0) { handleAnswer(null); return; }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [phase, timeLeft]);

  const startQuiz = () => {
    setCountdown(3);
    setPhase("countdown");
  };

  const handleAnswer = (optionId) => {
    if (selected !== null || phase !== "question") return;
    clearTimeout(timerRef.current);
    setSelected(optionId);

    const correct = question.options.find(o => o.correct);
    const isCorrect = optionId === correct?.id;
    const timeBonus = isCorrect ? Math.round((timeLeft / maxTime) * 500) : 0;
    const streakBonus = isCorrect && streak > 0 ? streak * 50 : 0;
    const pts = isCorrect ? 500 + timeBonus + streakBonus : 0;

    setStreak(isCorrect ? s => s + 1 : 0);
    setTotalScore(s => s + pts);
    setScores(prev => [...prev, { q: qIndex, correct: isCorrect, points: pts, timeLeft }]);
    if (isCorrect) onXP(pts > 800 ? 200 : pts > 600 ? 150 : 100);

    setPhase("result");
  };

  const nextQuestion = () => {
    if (qIndex + 1 >= QUIZ_QUESTIONS.length) {
      onComplete(totalScore, scores);
      setPhase("final");
    } else {
      setQIndex(i => i + 1);
      setSelected(null);
      setCountdown(3);
      setPhase("countdown");
    }
  };

  const pct = (timeLeft / maxTime) * 100;
  const timerColor = pct > 60 ? "#00f5a0" : pct > 30 ? "#fbbf24" : "#f87171";

  if (phase === "intro") return <QuizIntro onStart={startQuiz} total={QUIZ_QUESTIONS.length} />;
  if (phase === "final") return <QuizFinal totalScore={totalScore} scores={scores} onXP={onXP} />;

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.5rem" }}>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text2)" }}>Pregunta {qIndex + 1} / {QUIZ_QUESTIONS.length}</span>
            <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600 }}>⭐ {totalScore} pts</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((qIndex) / QUIZ_QUESTIONS.length) * 100}%` }} />
          </div>
        </div>
        {streak > 1 && (
          <div style={{
            padding: "0.3rem 0.8rem", borderRadius: "50px",
            background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.4)",
            color: "var(--warn)", fontSize: "0.8rem", fontWeight: 700
          }}>
            🔥 x{streak} racha
          </div>
        )}
      </div>

      {/* Countdown phase */}
      {phase === "countdown" && (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <div className="display" style={{
            fontSize: "8rem", color: "var(--accent)",
            animation: "scaleIn 0.3s ease",
            textShadow: "0 0 40px rgba(0,245,160,0.6)"
          }}>{countdown}</div>
          <p style={{ color: "var(--text2)" }}>Prepárate...</p>
        </div>
      )}

      {/* Question phase */}
      {(phase === "question" || phase === "result") && (
        <>
          {/* Timer */}
          {phase === "question" && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{
                fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-display)",
                color: timerColor, minWidth: "50px", transition: "color 0.5s",
                textShadow: `0 0 20px ${timerColor}80`
              }}>
                {timeLeft}
              </div>
              <div style={{ flex: 1, height: "8px", background: "var(--border)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${pct}%`,
                  background: `linear-gradient(90deg, ${timerColor}, ${timerColor}aa)`,
                  borderRadius: "4px",
                  transition: "width 1s linear, background 0.5s"
                }} />
              </div>
            </div>
          )}

          {/* Question card */}
          <div className="card" style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            padding: "2rem",
            borderColor: phase === "result" ? (scores[scores.length - 1]?.correct ? "rgba(0,245,160,0.4)" : "rgba(248,113,113,0.4)") : "var(--border)"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{question.image}</div>
            <h2 style={{ fontSize: "clamp(1rem, 3vw, 1.3rem)", lineHeight: 1.4, fontWeight: 600 }}>
              {question.question}
            </h2>
          </div>

          {/* Options grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "1.5rem" }}>
            {question.options.map((opt, i) => {
              const col = OPTION_COLORS[i];
              const isSelected = selected === opt.id;
              const isCorrect = opt.correct;
              const showResult = phase === "result";

              let bg = col.bg;
              let opacity = 1;
              if (showResult) {
                if (isCorrect) bg = "#27ae60";
                else if (isSelected && !isCorrect) bg = "#e74c3c";
                else opacity = 0.35;
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.id)}
                  disabled={phase === "result"}
                  style={{
                    background: bg,
                    border: isSelected ? "3px solid white" : "3px solid transparent",
                    borderRadius: "10px",
                    padding: "1rem 1.2rem",
                    color: "white",
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    fontWeight: 600,
                    cursor: phase === "result" ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    textAlign: "left",
                    opacity,
                    transition: "all 0.3s",
                    transform: isSelected ? "scale(1.02)" : "scale(1)",
                    boxShadow: isSelected ? `0 8px 24px ${bg}60` : "none"
                  }}
                  onMouseEnter={e => { if (phase === "question") e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.transform = "scale(1)"; }}
                >
                  <span style={{
                    width: 32, height: 32, borderRadius: "6px",
                    background: "rgba(255,255,255,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1rem", flexShrink: 0
                  }}>
                    {showResult && isCorrect ? "✓" : showResult && isSelected && !isCorrect ? "✗" : col.icon}
                  </span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* Result explanation */}
          {phase === "result" && (
            <div className="animate-slideDown card" style={{
              borderColor: scores[scores.length - 1]?.correct ? "rgba(0,245,160,0.4)" : "rgba(248,113,113,0.4)",
              background: scores[scores.length - 1]?.correct ? "rgba(0,245,160,0.05)" : "rgba(248,113,113,0.05)",
              marginBottom: "1rem"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <span style={{ fontSize: "2rem" }}>
                  {scores[scores.length - 1]?.correct ? "🎉" : "💡"}
                </span>
                <div>
                  <div style={{
                    fontWeight: 700, marginBottom: "0.4rem",
                    color: scores[scores.length - 1]?.correct ? "var(--accent)" : "var(--danger)"
                  }}>
                    {scores[scores.length - 1]?.correct
                      ? `¡Correcto! +${scores[scores.length - 1].points} pts`
                      : selected === null ? "⏰ ¡Se acabó el tiempo!" : "Incorrecto – pero aprendiste algo importante"}
                  </div>
                  <p style={{ color: "var(--text2)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.5rem" }}>
                    {question.explanation}
                  </p>
                  <div style={{
                    display: "inline-block",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "6px",
                    background: "rgba(0,180,216,0.1)",
                    border: "1px solid rgba(0,180,216,0.3)",
                    color: "#60c8e8",
                    fontSize: "0.82rem"
                  }}>
                    {question.fact}
                  </div>
                </div>
              </div>
            </div>
          )}

          {phase === "result" && (
            <button className="btn btn-primary" onClick={nextQuestion} style={{ width: "100%", justifyContent: "center", fontSize: "1rem" }}>
              {qIndex + 1 >= QUIZ_QUESTIONS.length ? "🏆 Ver Resultados Finales" : "Siguiente Pregunta →"}
            </button>
          )}
        </>
      )}

      <style>{`
        @keyframes scaleIn { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        .animate-slideDown { animation: slideDown 0.4s ease both; }
      `}</style>
    </div>
  );
}

function QuizIntro({ onStart, total }) {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "5rem", marginBottom: "1rem", animation: "float 3s ease-in-out infinite" }}>🎮</div>
      <h2 className="display" style={{ fontSize: "3rem", marginBottom: "1rem" }}>QUIZ ANTI-PHISHING</h2>
      <p style={{ color: "var(--text2)", marginBottom: "2rem", lineHeight: 1.6 }}>
        {total} preguntas · Tiempo límite por pregunta · Más rápido = más puntos<br />
        <strong style={{ color: "var(--text)" }}>Responde correctamente y construye tu racha 🔥</strong>
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "2rem" }}>
        {[
          { icon: "⏰", text: "Tiempo limitado" },
          { icon: "🔥", text: "Bonus por racha" },
          { icon: "⚡", text: "+500 pts por acierto" },
          { icon: "🧠", text: "Aprende con cada respuesta" },
        ].map((f, i) => (
          <div key={i} className="card" style={{ textAlign: "center", padding: "1rem" }}>
            <div style={{ fontSize: "1.5rem" }}>{f.icon}</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text2)", marginTop: "0.3rem" }}>{f.text}</div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary animate-glow" onClick={onStart} style={{ fontSize: "1.2rem", padding: "1rem 3rem" }}>
        ¡Empezar Quiz!
      </button>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
    </div>
  );
}

function QuizFinal({ totalScore, scores, onXP }) {
  const correct = scores.filter(s => s.correct).length;
  const pct = Math.round((correct / scores.length) * 100);
  const grade = pct >= 90 ? { label: "¡Experto!", color: "#00f5a0", emoji: "🏆" }
    : pct >= 70 ? { label: "¡Muy bien!", color: "#fbbf24", emoji: "⭐" }
    : pct >= 50 ? { label: "Buen inicio", color: "#00b4d8", emoji: "📚" }
    : { label: "Necesitas repasar", color: "#f87171", emoji: "💪" };

  React.useEffect(() => { if (pct >= 90) onXP(500); else if (pct >= 70) onXP(300); else onXP(150); }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "3rem 1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>{grade.emoji}</div>
      <div className="display" style={{ fontSize: "3rem", color: grade.color, marginBottom: "0.5rem" }}>{grade.label}</div>
      <div style={{ fontSize: "4rem", fontWeight: 800, color: "var(--text)", marginBottom: "0.5rem" }}>{totalScore}</div>
      <div style={{ color: "var(--text2)", marginBottom: "2rem" }}>puntos · {correct}/{scores.length} respuestas correctas ({pct}%)</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { label: "Correctas", val: correct, color: "var(--accent)" },
          { label: "Incorrectas", val: scores.length - correct, color: "var(--danger)" },
          { label: "Precisión", val: `${pct}%`, color: grade.color },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: "0.78rem", color: "var(--text2)", marginTop: "0.2rem" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <p style={{ color: "var(--text2)", fontSize: "0.9rem" }}>
        ¡Continúa al último módulo para completar tu entrenamiento! 🛡️
      </p>
    </div>
  );
}
