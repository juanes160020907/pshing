import { useState, useCallback } from "react";
import { LEVELS } from "../data/gameData";

export const SCREENS = {
  HOME: "HOME",
  EMAIL: "EMAIL",
  QUIZ: "QUIZ",
  SPOTFAKE: "SPOTFAKE",
  FINAL: "FINAL",
};

export function useGameState() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [totalXp, setTotalXp] = useState(0);
  const [badges, setBadges] = useState([]);
  const [xpToast, setXpToast] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const currentLevel = LEVELS.reduce((found, l) => totalXp >= l.min ? l : found, LEVELS[0]);

  const addXP = useCallback((amount) => {
    setTotalXp(prev => prev + amount);
    setXpToast(amount);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 100);
  }, []);

  const addBadge = useCallback((badge) => {
    setBadges(prev => prev.includes(badge) ? prev : [...prev, badge]);
  }, []);

  const startGame = useCallback(() => setScreen(SCREENS.EMAIL), []);

  const completeEmail = useCallback(() => {
    addBadge("📧 Detector de Email");
    setScreen(SCREENS.QUIZ);
  }, [addBadge]);

  const completeQuiz = useCallback((score) => {
    if (score >= 3500) addBadge("🏆 Quiz Master");
    else addBadge("⭐ Quiz Completado");
    setScreen(SCREENS.SPOTFAKE);
  }, [addBadge]);

  const completeSpotFake = useCallback((correct) => {
    if (correct >= 5) addBadge("🔍 Ojo de Águila");
    addBadge("🛡️ PhishingDefender");
    setScreen(SCREENS.FINAL);
  }, [addBadge]);

  const restart = useCallback(() => {
    setScreen(SCREENS.HOME);
    setTotalXp(0);
    setBadges([]);
  }, []);

  return {
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
  };
}
