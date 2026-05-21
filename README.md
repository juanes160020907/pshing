# 🛡️ PhishingDefender
### Taller Interactivo de Prevención de Phishing

Un sitio web educativo y gamificado que enseña a identificar estafas digitales mediante juegos interactivos, ejemplos reales y un quiz estilo Kahoot.

---

## 🎮 Módulos del Taller

### Módulo 1 – Simulador de Email
- 3 correos reales de phishing para analizar
- Haz clic en las partes sospechosas para descubrir pistas
- Niveles: Fácil, Medio, Difícil
- +80 XP por pista · +200 XP al completar

### Módulo 2 – Quiz Tipo Kahoot
- 8 preguntas con tiempo límite
- Sistema de puntos: respuesta correcta + velocidad + racha
- Explicación detallada y dato real tras cada respuesta
- Hasta +1000 pts por pregunta

### Módulo 3 – ¿Real o Falso?
- 6 mensajes de WhatsApp y SMS
- Decide si son legítimos o estafas
- Aprende las señales específicas de cada caso
- +150 XP por acierto

---

## 🚀 Instalación y Uso

### Requisitos
- Node.js 16+
- npm o yarn

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en modo desarrollo
npm start

# 3. Abrir en el navegador
# http://localhost:3000
```

### Build para producción
```bash
npm run build
```
El build queda en la carpeta `/build` listo para subir a cualquier hosting.

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Home/           → Pantalla de inicio
│   ├── EmailSimulator/ → Módulo 1: Simulador de correos
│   ├── QuizKahoot/     → Módulo 2: Quiz interactivo
│   ├── GameSpotFake/   → Módulo 3: Real o Falso
│   ├── FinalScore/     → Pantalla final con certificado
│   └── shared/         → Navbar, XPToast, ProgressBar
├── data/
│   └── gameData.js     → Todos los escenarios, preguntas y mensajes
├── hooks/
│   └── useGameState.js → Estado global del juego
└── styles/
    └── global.css      → Estilos y variables globales
```

---

## 🎨 Personalización

Para agregar más escenarios de email, edita `src/data/gameData.js`:
- `EMAIL_SCENARIOS` → nuevos correos de phishing
- `QUIZ_QUESTIONS` → nuevas preguntas del quiz
- `SPOT_FAKE_MESSAGES` → nuevos mensajes WhatsApp/SMS

---

## 🛡️ Tecnologías

- React 18
- CSS Variables + animaciones puras
- Google Fonts (Bebas Neue + Outfit)
- Sin dependencias externas adicionales

---

*Desarrollado como herramienta educativa para la prevención de estafas digitales en Colombia.*
