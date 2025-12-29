
export const cvDataEN = {

    info: {
        welcome: 'Welcome to my interactive 3D portfolio!',
        description: 'This is a portfolio inspired by Bruno Simon\'s work. Explore the island to discover my experiences, skills and projects.',
        controlsTitle: 'Controls',
        stationsTitle: 'Island Stations',
        tip: 'Explore the island and approach the wooden stations to discover the contents. Press',
        tipKey: 'Space',
        tipAction: 'to interact!',
        controls: {
            desktop: [
                { key: 'W', action: 'Move forward' },
                { key: 'A', action: 'Move left' },
                { key: 'S', action: 'Move backward' },
                { key: 'D', action: 'Move right' },
                { key: 'Space', action: 'Interact with stations' },
                { key: 'ESC', action: 'Close panels' }
            ]
        },
        stations: [
            '💼 Work Experience - Discover my professional journey',
            '⚡ Technical Skills - My technical competencies',
            '🚀 Projects & OSS - My projects and open source contributions',
            '👋 About Me - Personal information and contacts'
        ]
    },

    work: {
        experiences: [
            {
                role: 'Senior Full Stack Developer',
                company: 'Tech Company S.r.l.',
                period: '2022 - Present',
                location: 'Milan, Italy',
                description: 'Development of modern web applications with focus on performance and user experience. Working with international teams on enterprise projects.',
                technologies: ['React', 'Node.js', 'Three.js', 'MongoDB', 'AWS'],
                achievements: [
                    'Implemented 3D interactive dashboard that increased engagement by 40%',
                    'Performance optimization that reduced loading times by 60%',
                    'Mentoring of 3 junior developers'
                ]
            },
            {
                role: 'Full Stack Developer',
                company: 'Digital Agency',
                period: '2020 - 2022',
                location: 'Rome, Italy',
                description: 'Development of websites and applications for national and international clients.',
                technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Docker'],
                achievements: [
                    'Development of 15+ successful web projects',
                    'CI/CD pipeline implementation',
                    'Team training on modern best practices'
                ]
            },
            {
                role: 'Junior Developer',
                company: 'Innovative Startup',
                period: '2019 - 2020',
                location: 'Milan, Italy',
                description: 'First professional role, focus on frontend development and fast learning.',
                technologies: ['JavaScript', 'HTML5', 'CSS3', 'Git'],
                achievements: [
                    'Contributed to MVP launch in 6 months',
                    'Development of reusable UI components'
                ]
            }
        ]
    },

    skills: {
        categories: {
            frontend: {
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
            'Effective Communication',
            'Project Management',
            'Mentoring',
            'Continuous Learning'
        ]
    },

    projects: {
        featured: [
            {
                name: '3D Interactive Portfolio',
                type: 'Personal Project',
                description: 'Personal portfolio inspired by Bruno Simon with 3D island, animated character and interactive stations.',
                technologies: ['Three.js', 'Vite', 'GSAP', 'WebGL'],
                features: [
                    'Free WASD movement on 3D island',
                    'Mobile support with virtual joystick',
                    'Smooth animations with GSAP',
                    'Performance-optimized 3D models'
                ],
                github: 'https://github.com/matteo/portfolio-3d',
                demo: 'https://matteo-portfolio.dev',
                status: 'In Development'
            },
            {
                name: 'Real-time 3D Dashboard',
                type: 'Work Project',
                description: 'Interactive dashboard for 3D data visualization with animated charts and real-time metrics.',
                technologies: ['React', 'Three.js', 'WebSocket', 'D3.js'],
                features: [
                    'Real-time 3D data visualization',
                    'Interactive charts with zoom/pan',
                    'Push notifications for alerts',
                    'Data export in multiple formats'
                ],
                impact: '40% increase in user engagement',
                status: 'Production'
            },
            {
                name: 'E-commerce Platform',
                type: 'Freelance',
                description: 'Complete e-commerce platform with product management, cart, payments and admin dashboard.',
                technologies: ['Vue.js', 'Node.js', 'Stripe', 'MongoDB'],
                features: [
                    'Integrated payment system',
                    'Automated inventory management',
                    'Advanced analytics dashboard',
                    'SEO optimized'
                ],
                impact: '€500k+ revenue first year',
                status: 'Production'
            }
        ],
        openSource: [
            {
                name: 'three-utils',
                description: 'Utility library for Three.js with helpers for performance and debugging.',
                role: 'Creator & Maintainer',
                stars: 234,
                contributions: 'Complete creation and maintenance',
                github: 'https://github.com/matteo/three-utils',
                language: 'JavaScript'
            },
            {
                name: 'Three.js',
                description: 'Contributions to Three.js: bug fixes, documentation and examples.',
                role: 'Contributor',
                contributions: '8 merged PRs, documentation improvements',
                github: 'https://github.com/mrdoob/three.js',
                language: 'JavaScript'
            },
            {
                name: 'Vite Plugins',
                description: 'Development of Vite plugins for 3D asset optimization.',
                role: 'Contributor',
                contributions: '3 merged PRs',
                github: 'https://github.com/vitejs/vite',
                language: 'TypeScript'
            }
        ]
    },

    about: {
        bio: {
            intro: 'Hi! I\'m Matteo, a creative developer passionate about 3D graphics and immersive web experiences.',
            background: 'With over 5 years of experience in web development, I\'ve specialized in creating interactive experiences that combine appealing design and optimal performance. My passion for 3D web was born exploring Bruno Simon\'s portfolio, which inspired me to create this project.',
            passion: 'I love exploring the frontiers of modern web, experimenting with WebGL, Three.js and emerging technologies. I believe the web of the future will be increasingly immersive and three-dimensional.',
            approach: 'My approach combines solid technical skills with attention to detail and user experience. Each project is an opportunity to learn something new and push beyond limits.',
            interests: [
                '🎮 Gaming and game design',
                '🎨 3D graphics and animation',
                '📚 Continuous learning',
                '🏃 Running and sports',
                '🎵 Electronic music',
                '✈️ Travel and different cultures'
            ]
        },
        contact: {
            email: 'matteo.developer@example.com',
            phone: '+39 123 456 7890',
            location: 'Milan, Italy',
            availability: 'Available for freelance projects and collaborations',
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
