/**
 * CV Data Structure
 * Dati del portfolio organizzati per sezione
 */

export const cvData = {
    // Stazione Camp: Informazioni e Comandi
    info: {
        title: 'Benvenuto',
        icon: '🏕️',
        welcome: 'Benvenuto nel mio portfolio 3D interattivo!',
        description: 'Questo è un portfolio ispirato al lavoro di Bruno Simon. Esplora l\'isola per scoprire le mie esperienze, competenze e progetti.',
        controls: {
            desktop: [
                { key: 'W', action: 'Muovi avanti' },
                { key: 'A', action: 'Muovi a sinistra' },
                { key: 'S', action: 'Muovi indietro' },
                { key: 'D', action: 'Muovi a destra' },
                { key: 'Space', action: 'Interagisci con le stazioni' },
                { key: 'ESC', action: 'Chiudi pannelli' }
            ],
            mobile: [
                { key: 'Joystick Virtuale', action: 'Muovi il personaggio' },
                { key: 'Tap su Stazione', action: 'Interagisci' }
            ]
        },
        stations: [
            '💼 Esperienze Lavorative - Scopri il mio percorso professionale',
            '⚡ Skills Tecniche - Le mie competenze tecniche',
            '🚀 Progetti & OSS - I miei progetti e contributi open source',
            '👋 Chi Sono - Informazioni personali e contatti'
        ]
    },
    // Stazione 1: Esperienze Lavorative
    work: {
        title: 'Esperienze Lavorative',
        icon: '💼',
        experiences: [
            {
                role: 'Senior Full Stack Developer',
                company: 'Tech Company S.r.l.',
                period: '2022 - Presente',
                location: 'Milano, Italia',
                description: 'Sviluppo di applicazioni web moderne con focus su performance e user experience. Lavoro con team internazionali su progetti enterprise.',
                technologies: ['React', 'Node.js', 'Three.js', 'MongoDB', 'AWS'],
                achievements: [
                    'Implementazione di dashboard 3D interattiva che ha aumentato l\'engagement del 40%',
                    'Ottimizzazione performance che ha ridotto i tempi di caricamento del 60%',
                    'Mentoring di 3 junior developer'
                ]
            },
            {
                role: 'Full Stack Developer',
                company: 'Digital Agency',
                period: '2020 - 2022',
                location: 'Roma, Italia',
                description: 'Sviluppo di siti web e applicazioni per clienti nazionali e internazionali.',
                technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Docker'],
                achievements: [
                    'Sviluppo di 15+ progetti web di successo',
                    'Implementazione CI/CD pipeline',
                    'Formazione team su best practices moderne'
                ]
            },
            {
                role: 'Junior Developer',
                company: 'Startup Innovativa',
                period: '2019 - 2020',
                location: 'Milano, Italia',
                description: 'Primo ruolo professionale, focus su sviluppo frontend e apprendimento veloce.',
                technologies: ['JavaScript', 'HTML5', 'CSS3', 'Git'],
                achievements: [
                    'Contributo al lancio di MVP in 6 mesi',
                    'Sviluppo di componenti UI riutilizzabili'
                ]
            }
        ]
    },

    // Stazione 2: Skills Tecniche
    skills: {
        title: 'Skills Tecniche',
        icon: '⚡',
        categories: {
            frontend: {
                name: 'Frontend Development',
                icon: '🎨',
                skills: [
                    { name: 'JavaScript/TypeScript', level: 95, years: 5 },
                    { name: 'React', level: 90, years: 4 },
                    { name: 'Vue.js', level: 85, years: 3 },
                    { name: 'Three.js', level: 80, years: 2 },
                    { name: 'HTML5/CSS3', level: 95, years: 6 },
                    { name: 'TailwindCSS', level: 90, years: 3 },
                    { name: 'GSAP', level: 85, years: 2 }
                ]
            },
            backend: {
                name: 'Backend Development',
                icon: '⚙️',
                skills: [
                    { name: 'Node.js', level: 90, years: 4 },
                    { name: 'Express', level: 85, years: 4 },
                    { name: 'Python', level: 75, years: 3 },
                    { name: 'PostgreSQL', level: 80, years: 3 },
                    { name: 'MongoDB', level: 85, years: 3 },
                    { name: 'Redis', level: 70, years: 2 }
                ]
            },
            tools: {
                name: 'Tools & DevOps',
                icon: '🛠️',
                skills: [
                    { name: 'Git', level: 95, years: 6 },
                    { name: 'Docker', level: 85, years: 3 },
                    { name: 'AWS', level: 75, years: 2 },
                    { name: 'Vite', level: 90, years: 2 },
                    { name: 'Webpack', level: 80, years: 3 },
                    { name: 'CI/CD', level: 80, years: 3 }
                ]
            },
            design: {
                name: '3D & Design',
                icon: '🎭',
                skills: [
                    { name: 'Three.js', level: 85, years: 2 },
                    { name: 'Blender (Basic)', level: 60, years: 1 },
                    { name: 'Figma', level: 75, years: 3 },
                    { name: 'WebGL', level: 70, years: 2 }
                ]
            }
        },
        softSkills: [
            'Problem Solving',
            'Team Leadership',
            'Comunicazione Efficace',
            'Gestione Progetti',
            'Mentoring',
            'Apprendimento Continuo'
        ]
    },

    // Stazione 3: Progetti e OSS
    projects: {
        title: 'Progetti & OSS',
        icon: '🚀',
        featured: [
            {
                name: 'Portfolio 3D Interattivo',
                type: 'Personal Project',
                description: 'Portfolio personale ispirato a Bruno Simon con isola 3D, personaggio animato e stazioni interattive.',
                image: '/images/portfolio-preview.jpg', // placeholder
                technologies: ['Three.js', 'Vite', 'GSAP', 'WebGL'],
                features: [
                    'Movimento libero WASD su isola 3D',
                    'Supporto mobile con virtual joystick',
                    'Animazioni fluide con GSAP',
                    'Modelli 3D ottimizzati per performance'
                ],
                github: 'https://github.com/matteo/portfolio-3d',
                demo: 'https://matteo-portfolio.dev',
                status: 'In Development'
            },
            {
                name: 'Real-time Dashboard 3D',
                type: 'Work Project',
                description: 'Dashboard interattiva per visualizzazione dati in 3D con grafici animati e metriche real-time.',
                technologies: ['React', 'Three.js', 'WebSocket', 'D3.js'],
                features: [
                    'Visualizzazione dati 3D in tempo reale',
                    'Grafici interattivi con zoom/pan',
                    'Notifiche push per alert',
                    'Export dati in multiple formati'
                ],
                impact: '40% aumento engagement utenti',
                status: 'Production'
            },
            {
                name: 'E-commerce Platform',
                type: 'Freelance',
                description: 'Piattaforma e-commerce completa con gestione prodotti, carrello, pagamenti e dashboard admin.',
                technologies: ['Vue.js', 'Node.js', 'Stripe', 'MongoDB'],
                features: [
                    'Sistema di pagamento integrato',
                    'Gestione inventario automatizzata',
                    'Dashboard analytics avanzata',
                    'SEO ottimizzato'
                ],
                impact: '€500k+ revenue primo anno',
                status: 'Production'
            }
        ],
        openSource: [
            {
                name: 'three-utils',
                description: 'Libreria di utility per Three.js con helpers per performance e debugging.',
                role: 'Creator & Maintainer',
                stars: 234,
                contributions: 'Creazione e manutenzione completa',
                github: 'https://github.com/matteo/three-utils',
                language: 'JavaScript'
            },
            {
                name: 'Three.js',
                description: 'Contributi a Three.js: bug fixes, documentazione e esempi.',
                role: 'Contributor',
                contributions: '8 PR merged, miglioramenti documentazione',
                github: 'https://github.com/mrdoob/three.js',
                language: 'JavaScript'
            },
            {
                name: 'Vite Plugins',
                description: 'Sviluppo di plugin per Vite per ottimizzazione asset 3D.',
                role: 'Contributor',
                contributions: '3 PR merged',
                github: 'https://github.com/vitejs/vite',
                language: 'TypeScript'
            }
        ]
    },

    // Stazione 4: Chi Sono & Contatti
    about: {
        title: 'Chi Sono',
        icon: '👋',
        bio: {
            intro: 'Ciao! Sono Matteo, un creative developer appassionato di grafica 3D e esperienze web immersive.',
            background: 'Con oltre 5 anni di esperienza nello sviluppo web, mi sono specializzato nella creazione di esperienze interattive che combinano design accattivante e performance ottimali. La mia passione per il 3D web è nata esplorando il portfolio di Bruno Simon, che mi ha ispirato a creare questo progetto.',
            passion: 'Amo esplorare le frontiere del web moderno, sperimentando con WebGL, Three.js e tecnologie emergenti. Credo che il web del futuro sarà sempre più immersivo e tridimensionale.',
            approach: 'Il mio approccio combina solide competenze tecniche con attenzione al dettaglio e user experience. Ogni progetto è un\'opportunità per imparare qualcosa di nuovo e spingersi oltre i limiti.',
            interests: [
                '🎮 Gaming e game design',
                '🎨 Grafica 3D e animazione',
                '📚 Apprendimento continuo',
                '🏃 Running e sport',
                '🎵 Musica elettronica',
                '✈️ Viaggi e culture diverse'
            ]
        },
        contact: {
            email: 'matteo.developer@example.com',
            phone: '+39 123 456 7890',
            location: 'Milano, Italia',
            availability: 'Disponibile per progetti freelance e collaborazioni',
            socials: {
                github: {
                    url: 'https://github.com/matteo',
                    username: '@matteo',
                    icon: '💻'
                },
                linkedin: {
                    url: 'https://linkedin.com/in/matteo-dev',
                    username: 'Matteo Developer',
                    icon: '💼'
                },
                twitter: {
                    url: 'https://twitter.com/matteo_dev',
                    username: '@matteo_dev',
                    icon: '🐦'
                },
                codepen: {
                    url: 'https://codepen.io/matteo',
                    username: '@matteo',
                    icon: '🖊️'
                }
            }
        },
        stats: {
            yearsExperience: 5,
            projectsCompleted: 50,
            coffeeConsumed: 9999,
            linesOfCode: 500000,
            happyClients: 30
        }
    }
}
