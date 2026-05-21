// ============================================================
// PHISHING DEFENDER – Datos del juego
// ============================================================

// ---------- MÓDULO 1: Simulador de Email (detecta pistas) ----------
export const EMAIL_SCENARIOS = [
  {
    id: 1,
    label: "Correo bancario",
    difficulty: "Fácil",
    diffColor: "#00f5a0",
    email: {
      from: "soporte@bancol0mbia-seguro.net",
      replyTo: "noreply@bancol0mbia-seguro.net",
      subject: "⚠️ URGENTE: Suspensión de cuenta en 24 horas",
      date: "Hoy, 10:32 AM",
      body: [
        "Estimado cliente,",
        "Hemos detectado acceso no autorizado a su cuenta. Para evitar la suspensión INMEDIATA debe verificar su identidad ahora haciendo clic en el enlace a continuación:",
        "👉 http://bancolombia-verificar.tk/login-seguro",
        "Ingrese su número de cédula, contraseña y el código de su tarjeta de coordenadas completa.",
        "Si no actúa en las próximas 24 HORAS su cuenta será BLOQUEADA PERMANENTEMENTE.",
        "Atentamente,\nEquipo de Seguridad\nBancolombia™ Colombia"
      ]
    },
    clues: [
      { id: "c1", x: 12, y: 18, label: "Dominio falso", detail: "El dominio dice 'bancol0mbia' con un CERO en vez de la letra O. Los bancos reales tienen dominios exactos y verificados.", hotspot: "from" },
      { id: "c2", x: 12, y: 38, label: "URL trampa", detail: "El enlace usa .tk (dominio gratuito y sospechoso). Los bancos siempre usan su dominio oficial como bancolombia.com.co", hotspot: "link" },
      { id: "c3", x: 12, y: 55, label: "Urgencia artificial", detail: "'24 HORAS', 'BLOQUEADA PERMANENTEMENTE' — crean pánico para que no pienses y actúes rápido. Es una táctica clásica de estafa.", hotspot: "urgency" },
      { id: "c4", x: 12, y: 72, label: "Pide tarjeta de coordenadas", detail: "NINGÚN banco legítimo te pide la tarjeta de coordenadas COMPLETA por email. Esto es para robar tu acceso.", hotspot: "credentials" }
    ],
    totalClues: 4,
    explanation: "Este correo tiene 4 señales de phishing. Los criminales imitan el diseño de bancos reales pero cometen errores en dominios, crean urgencia falsa y piden datos que los bancos NUNCA solicitan por email."
  },
  {
    id: 2,
    label: "Premio falso",
    difficulty: "Medio",
    diffColor: "#fbbf24",
    email: {
      from: "premios@claro-colombia-oficial2024.com",
      replyTo: "reclamos.premio@gmail.com",
      subject: "🎉 ¡Felicitaciones! Ganaste un iPhone 15 Pro — Reclama HOY",
      date: "Hoy, 8:15 AM",
      body: [
        "¡FELICITACIONES USUARIO SELECCIONADO!",
        "Su número celular fue elegido aleatoriamente entre 2.3 millones de participantes como GANADOR de:",
        "📱 iPhone 15 Pro 256GB + $3.000.000 en efectivo",
        "Para reclamar su premio debe responder este correo con:",
        "• Nombre completo y cédula\n• Foto de cédula por ambos lados\n• Número de cuenta bancaria\n• Selfie con la cédula en mano",
        "⏰ SOLO tiene 48 horas. Después el premio pasa al siguiente participante.",
        "Premio patrocinado por: Claro® Colombia / Samsung® / Ministerio TIC"
      ]
    },
    clues: [
      { id: "c1", x: 12, y: 18, label: "Dominio inventado", detail: "El dominio 'claro-colombia-oficial2024.com' no es de Claro. Empresas reales usan claro.com.co. Agregaron 'oficial' para parecer legítimos.", hotspot: "from" },
      { id: "c2", x: 12, y: 30, label: "Reply-to en Gmail", detail: "El reply-to es un Gmail personal. Ninguna empresa grande usa Gmail para premios oficiales — esto indica que es un fraude individual.", hotspot: "reply" },
      { id: "c3", x: 12, y: 52, label: "Pide documentos sensibles", detail: "Pedir foto de cédula por ambos lados + selfie + cuenta bancaria es robo de identidad. Con eso pueden hacer préstamos a tu nombre.", hotspot: "docs" },
      { id: "c4", x: 12, y: 68, label: "No participaste en nada", detail: "¿Cómo ganaste un concurso en el que no participaste? Si no te inscribiste, no puedes ganar. Siempre es estafa.", hotspot: "logic" }
    ],
    totalClues: 4,
    explanation: "Este es el clásico 'premio falso'. El objetivo es robar tu identidad con la foto de cédula y tu dinero con la cuenta bancaria. Nadie regala iPhones a desconocidos."
  },
  {
    id: 3,
    label: "Soporte técnico",
    difficulty: "Difícil",
    diffColor: "#f87171",
    email: {
      from: "security-alert@microsoft-support-team.org",
      replyTo: "microsoft.support@outlook.com",
      subject: "Action Required: Your Microsoft account will be deleted",
      date: "Hoy, 2:47 AM",
      body: [
        "Dear Microsoft User,",
        "We detected unusual sign-in activity on your Microsoft account from:",
        "📍 Location: Rusia, Moscow\n🖥️ Device: Unknown Windows 11\n🕐 Time: 2:31 AM",
        "Your account will be PERMANENTLY DELETED in 12 hours unless you verify your identity.",
        "Click here to secure your account: http://mícrosoft-verify.ru/account/secure",
        "If you don't recognize this activity, call our security team immediately:",
        "📞 +1-800-642-7676 (disponible 24/7)",
        "Microsoft Security Team"
      ]
    },
    clues: [
      { id: "c1", x: 12, y: 18, label: "Dominio NO es de Microsoft", detail: "Microsoft usa @microsoft.com SIEMPRE. 'microsoft-support-team.org' es un dominio falso registrado por estafadores.", hotspot: "from" },
      { id: "c2", x: 12, y: 38, label: "URL con caracteres especiales", detail: "El enlace usa 'mícrosoft' con acento en la í — un truco para que el dominio parezca legítimo. Es un sitio ruso (.ru).", hotspot: "link" },
      { id: "c3", x: 12, y: 55, label: "Número de teléfono trampa", detail: "Si llamas a ese número, te atiende un estafador que te pedirá acceso remoto a tu PC o datos de pago para 'solucionar el problema'.", hotspot: "phone" },
      { id: "c4", x: 12, y: 68, label: "Enviado a las 2:47 AM", detail: "Los sistemas de seguridad legítimos no envían alertas a las 3 AM. Los estafadores envían a horas raras porque usan bots masivos.", hotspot: "time" }
    ],
    totalClues: 4,
    explanation: "Este es el fraude de 'soporte técnico'. Si llamas al número, te cobrarán cientos de miles por un 'servicio' falso. Microsoft NUNCA te contacta proactivamente por problemas de seguridad."
  }
];

// ---------- MÓDULO 2: QUIZ TIPO KAHOOT ----------
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Recibes un email de 'paypa1.com' diciéndote que tu cuenta fue hackeada. ¿Qué notas raro?",
    image: "🎣",
    timeLimit: 20,
    options: [
      { id: "a", text: "Nada raro, parece legítimo", correct: false },
      { id: "b", text: "El dominio tiene un '1' en vez de 'l'", correct: true },
      { id: "c", text: "El asunto es sobre hackeo", correct: false },
      { id: "d", text: "Viene de PayPal", correct: false }
    ],
    explanation: "¡Exacto! 'paypa1.com' usa el número 1 en lugar de la letra l. Esta técnica se llama 'typosquatting'. Siempre revisa el dominio con cuidado, letra por letra.",
    fact: "🧠 DATO: Los estafadores registran dominios casi idénticos a los reales cambiando 1 o 2 caracteres."
  },
  {
    id: 2,
    question: "Un correo dice: '¡ACTÚA AHORA! Tu cuenta expira en 2 horas o perderás todos tus datos.' ¿Esto es señal de...?",
    image: "⏰",
    timeLimit: 15,
    options: [
      { id: "a", text: "Una alerta de seguridad real", correct: false },
      { id: "b", text: "Urgencia artificial — táctica de phishing", correct: true },
      { id: "c", text: "Un recordatorio normal del servicio", correct: false },
      { id: "d", text: "Un error del sistema", correct: false }
    ],
    explanation: "La urgencia extrema es la táctica #1 del phishing. Te presionan para que no pienses con calma y cometas errores. Las empresas reales dan días o semanas de aviso.",
    fact: "🧠 DATO: El 83% de los correos de phishing usan urgencia o amenazas para manipular a las víctimas."
  },
  {
    id: 3,
    question: "Tu banco te llama y pide el código de 6 dígitos que acaba de llegarte por SMS. ¿Qué haces?",
    image: "📱",
    timeLimit: 20,
    options: [
      { id: "a", text: "Lo doy si la voz suena profesional", correct: false },
      { id: "b", text: "Lo doy solo si mencionan mi nombre", correct: false },
      { id: "c", text: "Cuelgo y llamo yo al banco con el número oficial", correct: true },
      { id: "d", text: "Doy los primeros 3 dígitos para confirmar", correct: false }
    ],
    explanation: "Tu banco NUNCA te pedirá códigos SMS por teléfono. Ese código es para autenticar TUS acciones, no para verificar tu identidad. Si te lo piden, es un estafador suplantando al banco.",
    fact: "🧠 DATO: Este ataque se llama 'Vishing' (Voice Phishing) y usualmente va combinado con spoofing del número real del banco."
  },
  {
    id: 4,
    question: "¿Cuál de estos URLs es el sitio REAL de Bancolombia?",
    image: "🔗",
    timeLimit: 25,
    options: [
      { id: "a", text: "bancolombia.com.co.login-seguro.net", correct: false },
      { id: "b", text: "secure-bancolombia.com", correct: false },
      { id: "c", text: "bancolombia.com.co", correct: true },
      { id: "d", text: "bancolombia-usuarios.co", correct: false }
    ],
    explanation: "El dominio real de Bancolombia es exactamente 'bancolombia.com.co'. Todo lo que tenga palabras adicionales (login-seguro, secure, usuarios) es falso. El dominio real siempre viene PRIMERO antes del .com o .co.",
    fact: "🧠 DATO: Antes de ingresar datos, haz clic en el candado 🔒 del navegador y verifica el nombre exacto del sitio."
  },
  {
    id: 5,
    question: "Recibes un email con adjunto: 'Comprobante_pago_factura.exe'. ¿Qué haces?",
    image: "📎",
    timeLimit: 20,
    options: [
      { id: "a", text: "Lo abro si el remitente parece conocido", correct: false },
      { id: "b", text: "Lo abro si el antivirus no da alarma", correct: false },
      { id: "c", text: "NUNCA lo abro — un comprobante no es .exe", correct: true },
      { id: "d", text: "Lo abro en modo incógnito para mayor seguridad", correct: false }
    ],
    explanation: "Un comprobante o factura SIEMPRE es PDF o imagen, NUNCA .exe. Los archivos .exe son programas ejecutables. Abrir uno desconocido instala malware o ransomware en tu computador.",
    fact: "🧠 DATO: El ransomware Clop y LockBit han robado millones a empresas colombianas con archivos .exe disfrazados de facturas."
  },
  {
    id: 6,
    question: "Un amigo te reenvía: 'Comparte esto con 10 personas y Tigo te regala 10GB gratis'. ¿Es esto...?",
    image: "📲",
    timeLimit: 15,
    options: [
      { id: "a", text: "Una promoción real de la operadora", correct: false },
      { id: "b", text: "Una cadena falsa de desinformación", correct: true },
      { id: "c", text: "Una beta exclusiva para algunos usuarios", correct: false },
      { id: "d", text: "Real solo si lo comparte mucha gente", correct: false }
    ],
    explanation: "Las empresas de telefonía NUNCA regalan datos por cadenas de WhatsApp. Estas cadenas sirven para recopilar números de teléfono, viralizar desinformación o redirigirte a sitios maliciosos.",
    fact: "🧠 DATO: Antes de reenviar cualquier cadena, busca en Google el texto exacto + 'verdad o mentira' o visita colombiacheck.com."
  },
  {
    id: 7,
    question: "El asunto del email dice: 'RE: Documento que me enviaste'. Nunca enviaste ese documento. ¿Qué es?",
    image: "📧",
    timeLimit: 20,
    options: [
      { id: "a", text: "Un error del servidor de correo", correct: false },
      { id: "b", text: "Una respuesta a un correo olvidado", correct: false },
      { id: "c", text: "Phishing que simula una conversación previa", correct: true },
      { id: "d", text: "Spam publicitario inofensivo", correct: false }
    ],
    explanation: "El 'RE:' falso hace que bajes la guardia pensando que es una conversación tuya. Es una técnica llamada 'Thread Hijacking'. El adjunto o enlace contiene malware.",
    fact: "🧠 DATO: Esta técnica fue usada en la campaña Emotet, uno de los malwares más devastadores de la historia."
  },
  {
    id: 8,
    question: "Ves un candado 🔒 verde en el navegador. ¿Significa que el sitio es seguro y legítimo?",
    image: "🔒",
    timeLimit: 20,
    options: [
      { id: "a", text: "Sí, el candado garantiza que es un sitio real", correct: false },
      { id: "b", text: "Solo garantiza que la conexión está cifrada, NO que es legítimo", correct: true },
      { id: "c", text: "Sí, Google verifica que el dominio sea real", correct: false },
      { id: "d", text: "Solo si el candado es verde oscuro", correct: false }
    ],
    explanation: "¡MITO COMÚN! El candado solo significa que la conexión es encriptada (HTTPS), pero los estafadores TAMBIÉN pueden tener HTTPS en sus sitios falsos. Verifica siempre el dominio completo, no solo el candado.",
    fact: "🧠 DATO: En 2023, el 83% de los sitios de phishing ya usaban HTTPS con candado verde."
  }
];

// ---------- MÓDULO 3: Juego "¿Real o Falso?" (mensajes de WhatsApp/SMS) ----------
export const SPOT_FAKE_MESSAGES = [
  {
    id: 1,
    type: "SMS",
    sender: "Bancolombia",
    time: "10:32 AM",
    message: "Bancolombia: Cargo de $1.234.000 en su tarjeta *5678. Si no reconoce, ingrese a https://www.bancolombia.com.co/seguridad o llame 604-5101010.",
    isReal: true,
    explanation: "✅ REAL: Usa el dominio oficial bancolombia.com.co, proporciona número oficial y NO pide contraseñas ni códigos. El formato es exactamente como envía Bancolombia.",
    clues: ["Dominio oficial .com.co", "Número de contacto oficial", "No pide datos sensibles", "Formato estándar de notificación"]
  },
  {
    id: 2,
    type: "SMS",
    sender: "+57 312 445 8901",
    time: "3:17 AM",
    message: "DAVIVIENDA ALERTA: Su cuenta fue comprometida. Verifique AHORA: http://davivienda-alerta.xyz/verificar?id=847291 Código de verificación: 847291",
    isReal: false,
    explanation: "🚨 FALSO: Viene de número celular desconocido (no del ID 'Davivienda'), el dominio .xyz es falso, enviado a las 3 AM, y el 'código de verificación' en el SMS es para que lo copies en el sitio falso.",
    clues: ["Viene de celular, no del ID oficial", "Dominio .xyz sospechoso", "Enviado a las 3 AM", "El 'código' en el SMS es trampa"]
  },
  {
    id: 3,
    type: "WhatsApp",
    sender: "Mamá ❤️",
    time: "2:45 PM",
    message: "Hola hijx, soy yo. Perdí el celular y este es mi número nuevo. Estoy en una emergencia, necesito que me transfieras $300.000 por Nequi al 314-822-9045. Te explico después, no le digas a nadie todavía 🙏",
    isReal: false,
    explanation: "🚨 FALSO: Es la estafa del 'familiar en apuros'. Las señales: número desconocido, urgencia de dinero, pide secreto. SIEMPRE llama al número original de tu familiar para verificar.",
    clues: ["Número desconocido reclamando ser familiar", "Urgencia de transferencia inmediata", "'No le digas a nadie' — bandera roja", "No verificaste que sea tu mamá"]
  },
  {
    id: 4,
    type: "WhatsApp",
    sender: "DIAN Colombia",
    time: "11:20 AM",
    message: "La DIAN le informa que tiene una devolución de impuestos por $2.450.000 pendiente. Para recibir su dinero haga clic aquí: wa.me/+573214567890 y envíe sus datos bancarios al agente.",
    isReal: false,
    explanation: "🚨 FALSO: La DIAN NO usa WhatsApp para notificar devoluciones. Las devoluciones reales se gestionan en muisca.dian.gov.co con tu RUT. Nunca envíes datos bancarios por WhatsApp.",
    clues: ["La DIAN no notifica por WhatsApp", "Enlace a WhatsApp personal, no a DIAN.gov.co", "Pide datos bancarios por chat", "Si fuera real, ya lo verías en tu portal DIAN"]
  },
  {
    id: 5,
    type: "SMS",
    sender: "Rappi",
    time: "7:30 PM",
    message: "Tu pedido #RP-4892 está en camino 🛵 Rastrea aquí: https://rappi.com/tracking/RP4892. ¿Tienes dudas? Escríbenos en la app.",
    isReal: true,
    explanation: "✅ REAL: Usa el dominio oficial rappi.com, hace referencia a un pedido específico, NO pide datos personales y redirige a la app oficial para soporte. Formato estándar de notificación de entrega.",
    clues: ["Dominio oficial rappi.com", "Número de pedido específico", "No pide datos personales", "Soporte a través de la app oficial"]
  },
  {
    id: 6,
    type: "WhatsApp",
    sender: "Claro Colombia Oficial",
    time: "9:00 AM",
    message: "⚡ CLARO PREMIO: Su número 310-XXX-XXXX ganó $5.000.000! Para reclamar envíe su nombre, cédula y número de cuenta a este WhatsApp antes de las 5 PM de HOY. ¡No pierda su premio!",
    isReal: false,
    explanation: "🚨 FALSO: Claro NO da premios por WhatsApp. Piden cédula y cuenta bancaria = robo de identidad. La urgencia ('HOY antes de las 5 PM') es presión artificial. Esta información se usa para fraudes bancarios.",
    clues: ["Claro no da premios por WhatsApp", "Pide cédula + cuenta bancaria", "Urgencia extrema ('HOY')", "No participaste en ningún concurso de Claro"]
  }
];

// ---------- LOGROS Y NIVELES ----------
export const BADGES = {
  email_master: { icon: "📧", name: "Detector de Email", desc: "Encontraste todas las pistas del simulador de correo" },
  quiz_perfect: { icon: "🏆", name: "Kahoot Master", desc: "Respondiste el quiz con puntaje perfecto" },
  quiz_good: { icon: "⭐", name: "Buen Defensor", desc: "Respondiste más del 75% del quiz correctamente" },
  spot_master: { icon: "🔍", name: "Ojo de Águila", desc: "Identificaste todos los mensajes correctamente" },
  speed_demon: { icon: "⚡", name: "Velocista", desc: "Respondiste 3 preguntas del quiz antes de los 5 segundos" },
  completed: { icon: "🛡️", name: "PhishingDefender", desc: "Completaste todos los módulos de entrenamiento" }
};

export const LEVELS = [
  { name: "Principiante", min: 0, icon: "🐣", color: "#94a3b8" },
  { name: "Aprendiz", min: 300, icon: "🌱", color: "#4ade80" },
  { name: "Detective", min: 700, icon: "🔍", color: "#38bdf8" },
  { name: "Agente", min: 1200, icon: "🕵️", color: "#a78bfa" },
  { name: "Maestro", min: 1800, icon: "🏆", color: "#fbbf24" },
];
