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
            icon: 'info'
        },

        work: {
            title: 'Esperienze Lavorative',
            icon: 'work',
            technologies: 'Tecnologie:',
            achievements: 'Risultati:'
        },

        skills: {
            title: 'Skills Tecniche',
            icon: 'skills',
            year: 'anno',
            years: 'anni',
            softSkillsTitle: 'Soft Skills',
            categories: {
                frontend: {
                    name: 'Frontend Development',
                    icon: 'frontend'
                },
                backend: {
                    name: 'Backend Development',
                    icon: 'backend'
                },
                ai: {
                    name: 'AI & Automazione',
                    icon: 'ai'
                },
                tools: {
                    name: 'Tools & DevOps',
                    icon: 'tools'
                },
                design: {
                    name: '3D & Design',
                    icon: 'design'
                }
            }
        },

        projects: {
            title: 'Progetti & OSS',
            icon: 'projects',
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
            icon: 'about',
            bioTitle: 'Chi Sono',
            contactTitle: 'Contattami',
            socialsTitle: 'Social & Links',
            interests: 'Interessi',
            achievements: 'Obiettivi Raggiunti',
            stats: {
                yearsExperience: 'Anni di Esperienza',
                githubStars: 'Stelle su GitHub',
                repositories: 'Repository Pubblici',
                openSourcePRs: 'Pull Request Merged'
            }
        }
    },
    en: {

        info: {
            title: 'Welcome',
            icon: 'info'
        },

        work: {
            title: 'Work Experience',
            icon: 'work',
            technologies: 'Technologies:',
            achievements: 'Achievements:'
        },

        skills: {
            title: 'Technical Skills',
            icon: 'skills',
            year: 'year',
            years: 'years',
            softSkillsTitle: 'Soft Skills',
            categories: {
                frontend: {
                    name: 'Frontend Development',
                    icon: 'frontend'
                },
                backend: {
                    name: 'Backend Development',
                    icon: 'backend'
                },
                ai: {
                    name: 'AI & Automation',
                    icon: 'ai'
                },
                tools: {
                    name: 'Tools & DevOps',
                    icon: 'tools'
                },
                design: {
                    name: '3D & Design',
                    icon: 'design'
                }
            }
        },

        projects: {
            title: 'Projects & OSS',
            icon: 'projects',
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
            icon: 'about',
            bioTitle: 'About Me',
            contactTitle: 'Contact Me',
            socialsTitle: 'Social & Links',
            interests: 'Interests',
            achievements: 'Achievements',
            stats: {
                yearsExperience: 'Years of Experience',
                githubStars: 'GitHub Stars',
                repositories: 'Public Repositories',
                openSourcePRs: 'Merged Pull Requests'
            }
        }
    }
}
