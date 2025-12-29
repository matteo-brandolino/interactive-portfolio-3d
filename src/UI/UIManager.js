import gsap from 'gsap'
import { cvData } from '../data/cv-data.js'

/**
 * UIManager class
 * Gestisce i panel UI per visualizzare i contenuti del CV
 */
export default class UIManager {
    constructor() {
        this.panels = {}
        this.currentPanel = null
        this.panelsContainer = document.getElementById('panels-container')

        this.createPanels()
        this.setupEventListeners()
    }

    createPanels() {
        const types = ['info', 'work', 'skills', 'projects', 'about']

        types.forEach(type => {
            const panel = this.createPanel(type)
            this.panels[type] = panel
            this.panelsContainer.appendChild(panel)
        })
    }

    createPanel(type) {
        const panel = document.createElement('div')
        panel.className = 'station-panel'
        panel.id = `panel-${type}`
        panel.innerHTML = this.getPanelContent(type)

        return panel
    }

    getPanelContent(type) {
        const data = cvData[type]

        switch (type) {
            case 'info':
                return this.getInfoContent(data)
            case 'work':
                return this.getWorkContent(data)
            case 'skills':
                return this.getSkillsContent(data)
            case 'projects':
                return this.getProjectsContent(data)
            case 'about':
                return this.getAboutContent(data)
            default:
                return ''
        }
    }

    getInfoContent(data) {
        const desktopControls = data.controls.desktop.map(control => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <kbd style="background: #8b5a2b; color: #f5e6d3; padding: 0.25rem 0.75rem; border-radius: 4px; font-family: monospace; min-width: 80px; text-align: center;">
                    ${control.key}
                </kbd>
                <span style="color: #4a3728; flex: 1; margin-left: 1rem;">
                    ${control.action}
                </span>
            </div>
        `).join('')

        const stationsList = data.stations.map(station => `
            <li style="margin-bottom: 0.5rem; color: #4a3728;">${station}</li>
        `).join('')

        return `
            <div class="panel-header">
                <div class="panel-title">${data.icon} ${data.title}</div>
                <button class="close-btn" data-panel="info">×</button>
            </div>
            <div class="panel-content">
                <h2 style="font-size: 1.5rem; font-weight: bold; color: #3e2723; margin-bottom: 1rem; font-family: Georgia, serif;">
                    ${data.welcome}
                </h2>
                <p style="color: #4a3728; margin-bottom: 1.5rem; line-height: 1.6;">
                    ${data.description}
                </p>

                <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem; font-family: Georgia, serif;">
                    🎮 Comandi
                </h3>
                <div style="background: rgba(139, 90, 43, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border: 2px solid #8b5a2b;">
                    ${desktopControls}
                </div>

                <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem; font-family: Georgia, serif;">
                    📍 Stazioni dell'Isola
                </h3>
                <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                    ${stationsList}
                </ul>

                <div style="background: rgba(212, 165, 116, 0.3); padding: 1rem; border-radius: 8px; border: 2px solid #8b5a2b; margin-top: 1.5rem;">
                    <p style="color: #3e2723; font-style: italic; margin: 0;">
                        💡 Esplora l'isola e avvicinati alle stazioni di legno per scoprire i contenuti. Premi <kbd style="background: #8b5a2b; color: #f5e6d3; padding: 0.15rem 0.5rem; border-radius: 4px; font-family: monospace;">Space</kbd> per interagire!
                    </p>
                </div>
            </div>
        `
    }

    getWorkContent(data) {
        let experiencesHTML = data.experiences.map(exp => `
            <div style="margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 2px solid #8b5a2b;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin: 0;">
                        ${exp.role}
                    </h3>
                </div>
                <div style="color: #2d5f3f; font-weight: 600; margin-bottom: 0.25rem;">
                    ${exp.company}
                </div>
                <div style="color: #6d5438; font-size: 0.875rem; margin-bottom: 0.75rem;">
                    ${exp.period} • ${exp.location}
                </div>
                <p style="color: #4a3728; margin-bottom: 1rem;">
                    ${exp.description}
                </p>
                <div style="margin-bottom: 1rem;">
                    <strong style="color: #3e2723;">Tecnologie:</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                        ${exp.technologies.map(tech => `
                            <span style="background: #c8e6c9; color: #1b5e20; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; border: 1px solid #81c784;">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                </div>
                ${exp.achievements ? `
                    <div>
                        <strong style="color: #3e2723;">Risultati:</strong>
                        <ul style="margin-top: 0.5rem; padding-left: 1.5rem; color: #4a3728;">
                            ${exp.achievements.map(achievement => `
                                <li style="margin-bottom: 0.25rem;">${achievement}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `).join('')

        return `
            <div class="panel-header">
                <div class="panel-title">${data.icon} ${data.title}</div>
                <button class="close-btn" data-panel="work">×</button>
            </div>
            <div class="panel-content">
                ${experiencesHTML}
            </div>
        `
    }

    getSkillsContent(data) {
        let categoriesHTML = Object.values(data.categories).map(category => `
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.125rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem;">
                    ${category.icon} ${category.name}
                </h3>
                ${category.skills.map(skill => `
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="color: #4a3728; font-weight: 500;">${skill.name}</span>
                            <span style="color: #6d5438; font-size: 0.875rem;">${skill.years} ${skill.years === 1 ? 'anno' : 'anni'}</span>
                        </div>
                        <div style="background: #d7c4ad; height: 10px; border-radius: 6px; overflow: hidden; border: 1px solid #8b5a2b;">
                            <div style="background: linear-gradient(90deg, #4a7c59, #2d5f3f); height: 100%; width: ${skill.level}%; transition: width 0.5s; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('')

        let softSkillsHTML = `
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 2px solid #8b5a2b;">
                <h3 style="font-size: 1.125rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem;">
                    🌟 Soft Skills
                </h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${data.softSkills.map(skill => `
                        <span style="background: #f4e4c1; color: #5d4037; padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem; font-weight: 600; border: 2px solid #d4a574;">
                            ${skill}
                        </span>
                    `).join('')}
                </div>
            </div>
        `

        return `
            <div class="panel-header">
                <div class="panel-title">${data.icon} ${data.title}</div>
                <button class="close-btn" data-panel="skills">×</button>
            </div>
            <div class="panel-content">
                ${categoriesHTML}
                ${softSkillsHTML}
            </div>
        `
    }

    getProjectsContent(data) {
        let featuredHTML = `
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin-bottom: 1.5rem;">
                    Featured Projects
                </h3>
                ${data.featured.map(project => `
                    <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.3); border-radius: 12px; border: 2px solid #8b5a2b;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.75rem;">
                            <h4 style="font-size: 1.125rem; font-weight: 600; color: #3e2723; margin: 0;">
                                ${project.name}
                            </h4>
                            <span style="background: ${project.status === 'Production' ? '#c8e6c9' : '#ffe0b2'}; color: ${project.status === 'Production' ? '#1b5e20' : '#e65100'}; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; border: 2px solid ${project.status === 'Production' ? '#81c784' : '#ffb74d'};">
                                ${project.status}
                            </span>
                        </div>
                        <div style="color: #6d5438; font-size: 0.875rem; margin-bottom: 0.75rem; font-weight: 500;">
                            ${project.type}
                        </div>
                        <p style="color: #4a3728; margin-bottom: 1rem;">
                            ${project.description}
                        </p>
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                ${project.technologies.map(tech => `
                                    <span style="background: #c8e6c9; color: #1b5e20; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500; border: 1px solid #81c784;">
                                        ${tech}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                        <ul style="color: #4a3728; font-size: 0.875rem; padding-left: 1.25rem; margin-bottom: 1rem;">
                            ${project.features.map(feature => `
                                <li style="margin-bottom: 0.25rem;">${feature}</li>
                            `).join('')}
                        </ul>
                        ${project.impact ? `
                            <div style="background: #ffe0b2; border-left: 4px solid #e65100; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem;">
                                <strong style="color: #e65100;">Impact:</strong> <span style="color: #bf360c;">${project.impact}</span>
                            </div>
                        ` : ''}
                        ${project.github || project.demo ? `
                            <div style="display: flex; gap: 0.75rem;">
                                ${project.github ? `
                                    <a href="${project.github}" target="_blank" style="color: #2d5f3f; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
                                        💻 GitHub →
                                    </a>
                                ` : ''}
                                ${project.demo ? `
                                    <a href="${project.demo}" target="_blank" style="color: #1b5e20; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
                                        🚀 Demo →
                                    </a>
                                ` : ''}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `

        let ossHTML = `
            <div style="padding-top: 2rem; border-top: 2px solid #8b5a2b;">
                <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin-bottom: 1.5rem;">
                    Open Source Contributions
                </h3>
                ${data.openSource.map(contrib => `
                    <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255, 255, 255, 0.3); border-radius: 8px; border-left: 4px solid #4a7c59;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                            <h4 style="font-size: 1rem; font-weight: 600; color: #3e2723; margin: 0;">
                                ${contrib.name}
                            </h4>
                            ${contrib.stars ? `
                                <span style="color: #f57f17; font-size: 0.875rem; font-weight: 600;">
                                    ⭐ ${contrib.stars}
                                </span>
                            ` : ''}
                        </div>
                        <div style="color: #2d5f3f; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">
                            ${contrib.role}
                        </div>
                        <p style="color: #4a3728; font-size: 0.875rem; margin-bottom: 0.75rem;">
                            ${contrib.description}
                        </p>
                        <div style="color: #6d5438; font-size: 0.875rem; margin-bottom: 0.5rem;">
                            <strong>Contributi:</strong> ${contrib.contributions}
                        </div>
                        ${contrib.github ? `
                            <a href="${contrib.github}" target="_blank" style="color: #2d5f3f; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
                                💻 View on GitHub →
                            </a>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `

        return `
            <div class="panel-header">
                <div class="panel-title">${data.icon} ${data.title}</div>
                <button class="close-btn" data-panel="projects">×</button>
            </div>
            <div class="panel-content">
                ${featuredHTML}
                ${ossHTML}
            </div>
        `
    }

    getAboutContent(data) {
        let statsHTML = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;">
                ${Object.entries(data.stats).map(([key, value]) => {
                    const labels = {
                        yearsExperience: 'Anni Esperienza',
                        projectsCompleted: 'Progetti Completati',
                        coffeeConsumed: 'Caffè Bevuti ☕',
                        linesOfCode: 'Righe di Codice',
                        happyClients: 'Clienti Felici'
                    }
                    return `
                        <div style="background: linear-gradient(135deg, #4a7c59 0%, #2d5f3f 100%); padding: 1.5rem; border-radius: 12px; text-align: center; color: white; border: 2px solid #81c784; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                            <div style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                                ${value.toLocaleString()}${key === 'coffeeConsumed' ? '+' : ''}
                            </div>
                            <div style="font-size: 0.875rem; opacity: 0.95;">
                                ${labels[key]}
                            </div>
                        </div>
                    `
                }).join('')}
            </div>
        `

        let bioHTML = `
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem;">
                    Chi Sono
                </h3>
                <p style="color: #4a3728; margin-bottom: 1rem; line-height: 1.7;">
                    ${data.bio.intro}
                </p>
                <p style="color: #4a3728; margin-bottom: 1rem; line-height: 1.7;">
                    ${data.bio.background}
                </p>
                <p style="color: #4a3728; margin-bottom: 1rem; line-height: 1.7;">
                    ${data.bio.passion}
                </p>
                <p style="color: #4a3728; margin-bottom: 1.5rem; line-height: 1.7;">
                    ${data.bio.approach}
                </p>
                <div style="background: rgba(255, 255, 255, 0.4); padding: 1.5rem; border-radius: 8px; border: 2px solid #8b5a2b;">
                    <h4 style="font-size: 1rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem;">
                        Interessi
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
                        ${data.bio.interests.map(interest => `
                            <div style="color: #4a3728; font-size: 0.875rem;">
                                ${interest}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `

        let contactHTML = `
            <div style="background: linear-gradient(135deg, #4a7c59 0%, #2d5f3f 100%); padding: 2rem; border-radius: 12px; color: white; border: 2px solid #81c784; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                    Contattami
                </h3>
                <div style="margin-bottom: 1.5rem;">
                    <div style="margin-bottom: 0.75rem;">
                        <strong>📧 Email:</strong> ${data.contact.email}
                    </div>
                    <div style="margin-bottom: 0.75rem;">
                        <strong>📱 Telefono:</strong> ${data.contact.phone}
                    </div>
                    <div style="margin-bottom: 0.75rem;">
                        <strong>📍 Location:</strong> ${data.contact.location}
                    </div>
                    <div style="background: rgba(255,255,255,0.2); padding: 0.75rem; border-radius: 6px; margin-top: 1rem; border: 1px solid rgba(255,255,255,0.3);">
                        <strong>✅</strong> ${data.contact.availability}
                    </div>
                </div>
                <div>
                    <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 1rem;">
                        Social & Links
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                        ${Object.values(data.contact.socials).map(social => `
                            <a href="${social.url}" target="_blank" style="background: rgba(255,255,255,0.2); padding: 0.75rem; border-radius: 6px; text-decoration: none; color: white; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; border: 1px solid rgba(255,255,255,0.3);">
                                <span style="font-size: 1.25rem;">${social.icon}</span>
                                <span style="font-size: 0.875rem;">${social.username}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `

        return `
            <div class="panel-header">
                <div class="panel-title">${data.icon} ${data.title}</div>
                <button class="close-btn" data-panel="about">×</button>
            </div>
            <div class="panel-content">
                ${statsHTML}
                ${bioHTML}
                ${contactHTML}
            </div>
        `
    }

    setupEventListeners() {
        // Close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.hideCurrentPanel()
            })
        })

        // ESC key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentPanel) {
                this.hideCurrentPanel()
            }
        })
    }

    showPanel(type) {
        // Nascondi panel corrente se esiste
        if (this.currentPanel) {
            this.hidePanel(this.currentPanel)
        }

        const panel = this.panels[type]
        if (!panel) return

        this.currentPanel = type

        // Anima entrata panel
        panel.classList.add('active')

        // Anima con GSAP per smooth entrance
        gsap.fromTo(panel,
            {
                x: '100%',
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power3.out'
            }
        )
    }

    hidePanel(type) {
        const panel = this.panels[type]
        if (!panel) return
        gsap.to(panel, {
            x: '100%',
            opacity: 0,
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
                panel.classList.remove('active')
            }
        })
    }

    hideCurrentPanel() {
        if (this.currentPanel) {
            this.hidePanel(this.currentPanel)
            this.currentPanel = null
        }
    }

    hideAll() {
        Object.keys(this.panels).forEach(type => {
            this.hidePanel(type)
        })
        this.currentPanel = null
    }
}
