export const cvDataEN = {
  info: {
    welcome: "Welcome to my 3D portfolio!",
    description:
      "Explore this interactive island to learn about my journey as a developer: projects, technical skills, and work experience. Approach the wooden stations to get started!",
    controlsTitle: "Controls",
    stationsTitle: "Island Stations",
    tipDesktop: "Explore the island and approach the wooden stations. Press",
    tipDesktopKey: "Space",
    tipDesktopAction: "to interact!",
    tipMobile: "Explore the island and approach the wooden stations. Tap the",
    tipMobileKey: "action button",
    tipMobileAction: "to interact!",
    controls: {
      desktop: [
        { key: "W / ↑", action: "Move forward" },
        { key: "A / ←", action: "Move left" },
        { key: "S / ↓", action: "Move backward" },
        { key: "D / →", action: "Move right" },
        { key: "Space", action: "Interact with stations" },
        { key: "ESC", action: "Close panels" },
      ],
      mobile: [
        { key: "Touch & drag (left side)", action: "Move character" },
        { key: "Touch a station", action: "Interact automatically" },
        { key: "Action button (bottom-right)", action: "Interact with stations" },
        { key: "Tap ×", action: "Close panels" },
      ],
    },
    stations: [
      "💼 Work Experience - Discover my professional journey",
      "⚡ Technical Skills - My technical competencies",
      "🚀 Projects & OSS - My projects and open source contributions",
      "👋 About Me - Personal information and contacts",
    ],
  },

  work: {
    experiences: [
      {
        role: "Software Developer",
        company: "EsoSphera",
        period: "Apr 2021 - Present",
        location: "Piombino Dese, Veneto, Italy",
        description:
          "Development of web applications and APIs, design and maintenance of chatbots and voicebots for customer care. Utilizing LLMs to create intelligent solutions and automate conversational flows.",
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
          "Developed web applications and RESTful APIs using Yii2 framework",
          "Designed and maintained chatbots and voicebots for customer care via Node-RED",
          "Integrated LLMs for dynamic responses, automatic summarization, and request classification",
          "Managed and designed PostgreSQL databases with complex queries and optimization",
          "Developed intelligent solutions with third-party service integration",
        ],
      },
      {
        role: "Full Stack Developer",
        company: "Salchain SRL",
        period: "Sep 2020 - Apr 2021",
        location: "Remote",
        description:
          "Complete development of a social media platform from scratch using the MERN stack. Managed web projects from design to production deployment.",
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
          "Built complete social media platform using MERN stack",
          "Deployed on AWS with CI/CD pipeline integration via GitLab",
          "Designed and developed websites, managing all development phases",
          "Provided technical support and bug fixes for Laravel and MySQL client projects",
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
          { name: "Git", level: 95, years: 6 },
          { name: "Docker", level: 75, years: 2 },
        ],
      },
    },
    softSkills: [
      { icon: "lightbulb", text: "Problem Solving" },
      { icon: "messageCircle", text: "Effective Communication" },
      { icon: "trendingUp", text: "Continuous Learning" },
      { icon: "users", text: "Team Collaboration" },
      { icon: "fileText", text: "Technical Documentation" },
      { icon: "headphones", text: "Customer Care Solutions" },
    ],
  },

  projects: {
    featured: [
      {
        name: "Notes RAG",
        type: "Personal Project",
        description:
          "Full-stack RAG application with semantic search, AI chat, and interactive knowledge base visualization.",
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
          "Semantic search using OpenAI embeddings and vector database",
          "AI-powered chat with context-aware responses",
          "Interactive RAG visualization with node graphs",
          "Automatic text chunking and embedding generation",
          "Comprehensive testing with Vitest",
        ],
        github: "https://github.com/matteo-brandolino/notes-rag",
      },
      {
        name: "BidWars",
        type: "Personal Project",
        description:
          "Enterprise-grade real-time auction platform with microservices architecture, instant bidding, and achievement system.",
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
          "Real-time bidding via WebSocket with JWT authentication",
          "Live leaderboards with Redis caching for high performance",
          "Achievement system with badges and instant notifications",
          "Event-driven architecture using Apache Kafka",
          "Idempotent operations for distributed consistency",
        ],
        github: "https://github.com/matteo-brandolino/auction-ai",
      },
      {
        name: "AG2 Email Management",
        type: "Personal Project",
        description:
          "Intelligent email triage system using AG2 swarm agents for automated Gmail management.",
        technologies: [
          "Python",
          "AG2 Framework",
          "OpenAI API",
          "Gmail API",
          "Streamlit",
        ],
        features: [
          "Swarm agent architecture for collaborative email processing",
          "Batch filtering and classification of non-critical emails",
          "Email summarization and response drafting",
          "Secure OAuth 2.0 authentication",
          "Tool integration for automated actions",
        ],
        github: "https://github.com/matteo-brandolino/ag2-email-management",
      },
      {
        name: "Cheshire Cat React Widget",
        type: "Open Source",
        description:
          "TypeScript React chat widget for Cheshire Cat AI platform with comprehensive customization.",
        technologies: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "WebSocket",
          "Vitest",
          "tsup",
        ],
        features: [
          "Dark/light theming with customizable styling",
          "File upload and voice recording support",
          "WebSocket communication with error handling",
          "Full TypeScript type definitions",
          "Message callbacks and event handlers",
        ],
        github: "https://github.com/matteo-brandolino/widget-ccat-react-ts",
        docs: "https://cheshire-cat-ai.github.io/docs/production/network/clients/?h=clien",
      },
      {
        name: "Interactive 3D Portfolio",
        type: "Personal Project",
        description:
          "The source code of this website! Interactive 3D portfolio with explorable island, built with Three.js and WebGL.",
        technologies: ["Three.js", "Vite", "GSAP", "WebGL", "JavaScript"],
        features: [
          "Free WASD movement on 3D island",
          "Mobile support with virtual joystick",
          "Bilingual support (IT/EN)",
          "Interactive stations with CV content",
          "Optimized 3D models and animations",
        ],
        github: "https://github.com/matteo-brandolino/interactive-portfolio-3d",
      },
    ],
    openSource: [
      {
        name: "ElizaOS Plugin Registry",
        description:
          "Added @pyboom/plugin-moralis-v2 plugin to ElizaOS registry",
        role: "Contributor",
        contributions:
          "Registered Moralis DeFi plugin for Solana blockchain data",
        github: "https://github.com/elizaos-plugins/registry/pull/235",
        status: "Merged",
      },
      {
        name: "Cheshire Cat AI - React Client",
        description:
          "TypeScript React client implementation for Cheshire Cat AI",
        role: "Contributor",
        contributions:
          "Complete React widget development with feature parity to Vue client",
        github: "https://github.com/cheshire-cat-ai/docs/pull/221",
        status: "Merged",
      },
      {
        name: "Cheshire Cat AI - Vision PDF Parser",
        description:
          "Plugin for PDF content extraction and translation with vision capabilities",
        role: "Creator",
        contributions:
          "Developed plugin for PDF parsing with vision AI support",
        github: "https://github.com/cheshire-cat-ai/plugins/pull/130",
        status: "Merged",
      },
      {
        name: "ElizaOS Moralis Plugin",
        description: "Refactored plugin actions for Eliza v2 compatibility",
        role: "Contributor",
        contributions: "Updated plugin architecture for Eliza v2",
        github: "https://github.com/elizaos-plugins/plugin-moralis/pull/1",
        status: "Open",
      },
      {
        name: "Various Contributions",
        description: "Documentation fixes, HTML corrections, ElizaOS tutorials",
        role: "Contributor",
        contributions: "5+ PRs for documentation improvements and bug fixes",
        github: "https://github.com/matteo-brandolino",
        status: "Mixed",
      },
    ],
  },

  about: {
    bio: {
      intro:
        "Hi! I'm Matteo, a software developer with over 4 years of experience specialized in web applications, generative AI, and intelligent conversational systems. I primarily work with Node.js, TypeScript, Python, and PostgreSQL.",
      passion:
        "I'm passionate about Large Language Models, RAG systems, and AI agents. I actively contribute to open source projects and believe in continuous learning.",
      interests: [
        { icon: "ai", text: "Artificial intelligence and LLMs" },
        { icon: "messageSquare", text: "Chatbots and conversational systems" },
        { icon: "globe", text: "Full-stack web development" },
        { icon: "bookOpen", text: "Continuous learning" },
        { icon: "gitBranch", text: "Open source contributions" },
      ],
    },
    contact: {
      email: "matteo.brandolino@gmail.com",
      location: "Piombino Dese, Veneto, Italy",
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
