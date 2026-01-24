export const cvDataIT = {
  info: {
    welcome: "Benvenuto nel mio portfolio 3D!",
    description:
      "Esplora quest'isola interattiva per conoscere il mio percorso come sviluppatore: progetti, competenze tecniche ed esperienze lavorative. Avvicinati alle stazioni di legno per iniziare!",
    controlsTitle: "Comandi",
    stationsTitle: "Stazioni dell'Isola",
    tipDesktop: "Esplora l'isola e avvicinati alle stazioni di legno. Premi",
    tipDesktopKey: "Space",
    tipDesktopAction: "per interagire!",
    tipMobile: "Esplora l'isola e avvicinati alle stazioni di legno. Tocca il",
    tipMobileKey: "pulsante azione",
    tipMobileAction: "per interagire!",
    controls: {
      desktop: [
        { key: "W / ↑", action: "Muovi avanti" },
        { key: "A / ←", action: "Muovi a sinistra" },
        { key: "S / ↓", action: "Muovi indietro" },
        { key: "D / →", action: "Muovi a destra" },
        { key: "Space", action: "Interagisci con le stazioni" },
        { key: "ESC", action: "Chiudi pannelli" },
      ],
      mobile: [
        { key: "Tocca e trascina (sinistra)", action: "Muovi il personaggio" },
        { key: "Tocca una stazione", action: "Interagisci automaticamente" },
        { key: "Pulsante azione (basso-destra)", action: "Interagisci con le stazioni" },
        { key: "Tocca ×", action: "Chiudi pannelli" },
      ],
    },
    stations: [
      "💼 Esperienze Lavorative - Scopri il mio percorso professionale",
      "⚡ Skills Tecniche - Le mie competenze tecniche",
      "🚀 Progetti & OSS - I miei progetti e contributi open source",
      "👋 Chi Sono - Informazioni personali e contatti",
    ],
  },

  work: {
    experiences: [
      {
        role: "Software Developer",
        company: "EsoSphera",
        period: "Apr 2021 - Presente",
        location: "Resana, Veneto, Italia",
        description:
          "Sviluppo di applicazioni web e API, progettazione e manutenzione di chatbot e voicebot per il customer care. Utilizzo di LLM per la creazione di soluzioni intelligenti e automazione dei flussi conversazionali.",
        technologies: [
          "PHP (Yii2)",
          "JavaScript",
          "Node.js",
          "TypeScript",
          "Python",
          "PostgreSQL",
          "Node-RED",
          "LLM",
        ],
        achievements: [
          "Sviluppo di applicazioni web e API RESTful con framework Yii2",
          "Progettazione e manutenzione di chatbot e voicebot per il customer care tramite Node-RED",
          "Integrazione di LLM per risposte dinamiche, riassunti automatici e classificazione delle richieste",
          "Gestione e progettazione di database PostgreSQL con query complesse e ottimizzazione",
          "Sviluppo di soluzioni intelligenti con integrazione a servizi di terze parti",
        ],
      },
      {
        role: "Full Stack Developer",
        company: "Salchain SRL",
        period: "Set 2020 - Apr 2021",
        location: "Remote",
        description:
          "Sviluppo completo di una piattaforma social media da zero utilizzando lo stack MERN. Gestione di progetti web dalla progettazione al deploy in produzione.",
        technologies: [
          "MongoDB",
          "Express.js",
          "React",
          "Node.js",
          "AWS",
          "GitLab CI/CD",
          "Laravel",
          "PHP",
          "MySQL",
        ],
        achievements: [
          "Sviluppo completo di piattaforma social media con stack MERN",
          "Deploy su AWS con integrazione di pipeline CI/CD tramite GitLab",
          "Progettazione e realizzazione di siti web, curando tutte le fasi dello sviluppo",
          "Supporto tecnico e bug fixing per clienti su progetti Laravel e MySQL",
        ],
      },
    ],
  },

  skills: {
    categories: {
      frontend: {
        skills: [
          { name: "JavaScript/TypeScript", level: 90, years: 5 },
          { name: "React", level: 85, years: 4 },
          { name: "Vue.js", level: 80, years: 3 },
          { name: "Next.js", level: 85, years: 2 },
          { name: "HTML5/CSS3", level: 90, years: 5 },
          { name: "TailwindCSS", level: 85, years: 3 },
        ],
      },
      backend: {
        skills: [
          { name: "Node.js", level: 90, years: 5 },
          { name: "PHP (Yii2)", level: 85, years: 4 },
          { name: "Python", level: 80, years: 3 },
          { name: "PostgreSQL", level: 85, years: 4 },
          { name: "MongoDB", level: 80, years: 2 },
          { name: "Express", level: 85, years: 4 },
        ],
      },
      ai: {
        skills: [
          { name: "LLM Integration", level: 85, years: 2 },
          { name: "RAG Systems", level: 80, years: 1 },
          { name: "Node-RED", level: 85, years: 4 },
          { name: "n8n", level: 75, years: 1 },
          { name: "OpenAI API", level: 85, years: 2 },
          { name: "AI Agents", level: 75, years: 1 },
        ],
      },
      tools: {
        skills: [
          { name: "Git", level: 95, years: 5 },
          { name: "Docker", level: 75, years: 2 },
        ],
      },
    },
    softSkills: [
      { icon: "lightbulb", text: "Problem Solving" },
      { icon: "messageCircle", text: "Comunicazione Efficace" },
      { icon: "trendingUp", text: "Apprendimento Continuo" },
      { icon: "users", text: "Collaborazione di Team" },
      { icon: "fileText", text: "Documentazione Tecnica" },
      { icon: "headphones", text: "Soluzioni Customer Care" },
    ],
  },

  projects: {
    featured: [
      {
        name: "Notes RAG",
        type: "Personal Project",
        description:
          "Applicazione full-stack RAG con ricerca semantica, chat AI e visualizzazione interattiva della knowledge base.",
        technologies: [
          "Next.js 16",
          "TypeScript",
          "PostgreSQL",
          "pgvector",
          "OpenAI GPT-4o",
          "Vercel AI SDK",
          "Drizzle ORM",
          "shadcn-ui",
          "React Flow",
        ],
        features: [
          "Ricerca semantica con embeddings OpenAI e database vettoriale",
          "Chat AI con risposte context-aware",
          "Visualizzazione interattiva RAG con grafi a nodi",
          "Generazione automatica di chunking ed embeddings",
          "Testing completo con Vitest",
        ],
        github: "https://github.com/matteo-brandolino/notes-rag",
      },
      {
        name: "BidWars",
        type: "Personal Project",
        description:
          "Piattaforma d'asta real-time enterprise-grade con architettura microservizi, bidding istantaneo e sistema di achievement.",
        technologies: [
          "Next.js 16",
          "React 19",
          "Node.js",
          "TypeScript",
          "Socket.IO",
          "Apache Kafka",
          "MongoDB",
          "Redis",
          "Docker",
        ],
        features: [
          "Bidding real-time via WebSocket con autenticazione JWT",
          "Leaderboard live con caching Redis ad alte prestazioni",
          "Sistema achievement con badge e notifiche istantanee",
          "Architettura event-driven con Apache Kafka",
          "Operazioni idempotenti per consistenza distribuita",
        ],
        github: "https://github.com/matteo-brandolino/auction-ai",
      },
      {
        name: "AG2 Email Management",
        type: "Personal Project",
        description:
          "Sistema intelligente di gestione email che utilizza AG2 swarm agents per automatizzare il triage e la gestione di Gmail.",
        technologies: [
          "Python",
          "AG2 Framework",
          "OpenAI API",
          "Gmail API",
          "Streamlit",
        ],
        features: [
          "Architettura swarm agent per processamento collaborativo",
          "Filtraggio batch e classificazione email non critiche",
          "Riassunti email e bozze di risposta automatiche",
          "Autenticazione sicura OAuth 2.0",
          "Integrazione tool per azioni automatizzate",
        ],
        github: "https://github.com/matteo-brandolino/ag2-email-management",
      },
      {
        name: "Cheshire Cat React Widget",
        type: "Open Source",
        description:
          "Widget chat React TypeScript per la piattaforma Cheshire Cat AI con personalizzazione completa.",
        technologies: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "WebSocket",
          "Vitest",
          "tsup",
        ],
        features: [
          "Tema dark/light con styling personalizzabile",
          "Supporto upload file e registrazione vocale",
          "Comunicazione WebSocket con gestione errori",
          "Definizioni TypeScript complete",
          "Callback messaggi e gestori eventi",
        ],
        github: "https://github.com/matteo-brandolino/widget-ccat-react-ts",
        docs: "https://cheshire-cat-ai.github.io/docs/production/network/clients/?h=clien",
      },
      {
        name: "Portfolio 3D Interattivo",
        type: "Personal Project",
        description:
          "Il codice sorgente di questo sito! Portfolio 3D interattivo con isola esplorabile, costruito con Three.js e WebGL.",
        technologies: ["Three.js", "Vite", "GSAP", "WebGL", "JavaScript"],
        features: [
          "Movimento libero WASD su isola 3D",
          "Supporto mobile con joystick virtuale",
          "Supporto bilingue (IT/EN)",
          "Stazioni interattive con contenuti CV",
          "Modelli 3D e animazioni ottimizzati",
        ],
        github: "https://github.com/matteo-brandolino/interactive-portfolio-3d",
      },
    ],
    openSource: [
      {
        name: "ElizaOS Plugin Registry",
        description:
          "Aggiunto plugin @pyboom/plugin-moralis-v2 al registro ElizaOS",
        role: "Contributor",
        contributions:
          "Registrazione plugin Moralis DeFi per dati blockchain Solana",
        github: "https://github.com/elizaos-plugins/registry/pull/235",
        status: "Merged",
      },
      {
        name: "Cheshire Cat AI - React Client",
        description:
          "Implementazione client React TypeScript per Cheshire Cat AI",
        role: "Contributor",
        contributions:
          "Sviluppo completo widget React con feature parity al client Vue",
        github: "https://github.com/cheshire-cat-ai/docs/pull/221",
        status: "Merged",
      },
      {
        name: "Cheshire Cat AI - Vision PDF Parser",
        description:
          "Plugin per estrazione e traduzione contenuti PDF con capacità vision",
        role: "Creator",
        contributions: "Sviluppo plugin per parsing PDF con supporto vision AI",
        github: "https://github.com/cheshire-cat-ai/plugins/pull/130",
        status: "Merged",
      },
      {
        name: "ElizaOS Moralis Plugin",
        description: "Refactoring azioni plugin per compatibilità Eliza v2",
        role: "Contributor",
        contributions: "Aggiornamento architettura plugin per Eliza v2",
        github: "https://github.com/elizaos-plugins/plugin-moralis/pull/1",
        status: "Open",
      },
      {
        name: "Contributi Vari",
        description: "Fix documentazione, correzioni HTML, tutorial ElizaOS",
        role: "Contributor",
        contributions: "5+ PR per miglioramenti documentazione e bug fixes",
        github: "https://github.com/matteo-brandolino",
        status: "Mixed",
      },
    ],
  },

  about: {
    bio: {
      intro:
        "Ciao! Sono Matteo, uno sviluppatore software con oltre 4 anni di esperienza specializzato in applicazioni web, AI generativa e sistemi conversazionali intelligenti. Lavoro principalmente con Node.js, TypeScript, Python e PostgreSQL.",
      passion:
        "Sono appassionato di Large Language Models, sistemi RAG e agenti AI. Contribuisco attivamente a progetti open source e credo nell'apprendimento continuo.",
      interests: [
        { icon: "ai", text: "Intelligenza artificiale e LLM" },
        { icon: "messageSquare", text: "Chatbot e sistemi conversazionali" },
        { icon: "globe", text: "Sviluppo web full-stack" },
        { icon: "bookOpen", text: "Apprendimento continuo" },
        { icon: "gitBranch", text: "Open source contributions" },
      ],
    },
    contact: {
      email: "matteo.brandolino@gmail.com",
      location: "Piombino Dese, Veneto, Italia",
      socials: {
        github: {
          url: "https://github.com/matteo-brandolino",
          username: "@matteo-brandolino",
          icon: "💻",
        },
        linkedin: {
          url: "https://www.linkedin.com/in/matteo-brandolino",
          username: "Matteo Brandolino",
          icon: "💼",
        },
      },
    },
    stats: {
      yearsExperience: 4,
      projectsCompleted: 30,
      githubStars: 93,
      openSourcePRs: 10,
      repositories: 57,
    },
  },
};
