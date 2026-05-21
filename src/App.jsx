import React from "react";
import "./styles/global.css";

import { useGameState, SCREENS } from "./hooks/useGameState";
import Navbar from "./components/shared/Navbar";
import XPToast from "./components/shared/XPToast";
import Home from "./components/Home/Home";
import EmailSimulator from "./components/EmailSimulator/EmailSimulator";
import QuizKahoot from "./components/QuizKahoot/QuizKahoot";
import GameSpotFake from "./components/GameSpotFake/GameSpotFake";
import FinalScore from "./components/FinalScore/FinalScore";

export default function App() {
  const {
    screen,
    totalXp,
    badges,
    currentLevel,
    xpToast,
    showToast,
    addXP,
    startGame,
    completeEmail,
    completeQuiz,
    completeSpotFake,
    restart,
  } = useGameState();

  return (
    <div className="app-shell">
      {/* Decorative backgrounds */}
      <div className="noise-bg" />
      <div className="grid-lines" />

      {/* XP Toast */}
      <XPToast amount={xpToast} show={showToast} />

      {/* Nav */}
      <Navbar
        screen={screen}
        totalXp={totalXp}
        level={currentLevel}
        onHome={() => restart()}
      />

      {/* Screens */}
      {screen === SCREENS.HOME && (
        <Home onStart={startGame} totalXp={totalXp} level={currentLevel} />
      )}

      {screen === SCREENS.EMAIL && (
        <EmailSimulator
          onComplete={completeEmail}
          onXP={addXP}
        />
      )}

      {screen === SCREENS.QUIZ && (
        <QuizKahoot
          onComplete={completeQuiz}
          onXP={addXP}
        />
      )}

      {screen === SCREENS.SPOTFAKE && (
        <GameSpotFake
          onComplete={completeSpotFake}
          onXP={addXP}
        />
      )}

      {screen === SCREENS.FINAL && (
        <FinalScore
          totalXp={totalXp}
          badges={badges}
          onRestart={restart}
        />
      )}
    </div>
  );
}
