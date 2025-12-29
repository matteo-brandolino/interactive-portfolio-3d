class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || this.detectLanguage()
        this.listeners = []
    }

    detectLanguage() {
        const browserLang = navigator.language.split('-')[0]
        return browserLang === 'it' ? 'it' : 'en'
    }

    getStoredLanguage() {
        return localStorage.getItem('portfolio-language')
    }

    setLanguage(lang) {
        if (lang !== 'it' && lang !== 'en') return

        this.currentLanguage = lang
        localStorage.setItem('portfolio-language', lang)

        this.listeners.forEach(callback => callback(lang))
    }

    getCurrentLanguage() {
        return this.currentLanguage
    }

    onLanguageChange(callback) {
        this.listeners.push(callback)
    }

    t(key) {
        const keys = key.split('.')
        let value = translations[this.currentLanguage]

        for (const k of keys) {
            value = value?.[k]
        }

        return value || key
    }
}

export const i18n = new I18n()

export const translations = {
    it: {
        info: {
            title: 'Benvenuto',
            icon: '🏕️'
        },

        work: {
            title: 'Esperienze Lavorative',
            icon: '💼',
            technologies: 'Tecnologie:',
            achievements: 'Risultati:'
        },

        skills: {
            title: 'Skills Tecniche',
            icon: '⚡',
            year: 'anno',
            years: 'anni',
            softSkillsTitle: 'Soft Skills',
            categories: {
                frontend: {
                    name: 'Frontend Development',
                    icon: '🎨'
                },
                backend: {
                    name: 'Backend Development',
                    icon: '⚙️'
                },
                tools: {
                    name: 'Tools & DevOps',
                    icon: '🛠️'
                },
                design: {
                    name: '3D & Design',
                    icon: '🎭'
                }
            }
        },

        projects: {
            title: 'Progetti & OSS',
            icon: '🚀',
            featuredTitle: 'Progetti in Evidenza',
            ossTitle: 'Contributi Open Source',
            impact: 'Impact:',
            contributions: 'Contributi:',
            status: {
                production: 'Produzione',
                development: 'In Sviluppo'
            }
        },

        about: {
            title: 'Chi Sono',
            icon: '👋',
            bioTitle: 'Chi Sono',
            contactTitle: 'Contattami',
            socialsTitle: 'Social & Links',
            interests: 'Interessi',
            stats: {
                yearsExperience: 'Anni Esperienza',
                projectsCompleted: 'Progetti Completati',
                coffeeConsumed: 'Caffè Bevuti ☕',
                linesOfCode: 'Righe di Codice',
                happyClients: 'Clienti Felici'
            }
        }
    },
    en: {

        info: {
            title: 'Welcome',
            icon: '🏕️'
        },

        work: {
            title: 'Work Experience',
            icon: '💼',
            technologies: 'Technologies:',
            achievements: 'Achievements:'
        },

        skills: {
            title: 'Technical Skills',
            icon: '⚡',
            year: 'year',
            years: 'years',
            softSkillsTitle: 'Soft Skills',
            categories: {
                frontend: {
                    name: 'Frontend Development',
                    icon: '🎨'
                },
                backend: {
                    name: 'Backend Development',
                    icon: '⚙️'
                },
                tools: {
                    name: 'Tools & DevOps',
                    icon: '🛠️'
                },
                design: {
                    name: '3D & Design',
                    icon: '🎭'
                }
            }
        },

        projects: {
            title: 'Projects & OSS',
            icon: '🚀',
            featuredTitle: 'Featured Projects',
            ossTitle: 'Open Source Contributions',
            impact: 'Impact:',
            contributions: 'Contributions:',
            status: {
                production: 'Production',
                development: 'In Development'
            }
        },

        about: {
            title: 'About Me',
            icon: '👋',
            bioTitle: 'About Me',
            contactTitle: 'Contact Me',
            socialsTitle: 'Social & Links',
            interests: 'Interests',
            stats: {
                yearsExperience: 'Years Experience',
                projectsCompleted: 'Projects Completed',
                coffeeConsumed: 'Coffee Consumed ☕',
                linesOfCode: 'Lines of Code',
                happyClients: 'Happy Clients'
            }
        }
    }
}
