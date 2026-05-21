import React, { useEffect, useState } from "react";

export default function XPToast({ amount, show }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      top: "80px",
      right: "20px",
      background: "linear-gradient(135deg, var(--accent), var(--accent2))",
      color: "var(--bg)",
      padding: "0.6rem 1.2rem",
      borderRadius: "50px",
      fontWeight: 700,
      fontSize: "1rem",
      zIndex: 9999,
      animation: "fadeInUp 0.3s ease, fadeIn 0.3s ease",
      boxShadow: "0 8px 24px rgba(0,245,160,0.4)"
    }}>
      +{amount} XP ⚡
    </div>
  );
}
