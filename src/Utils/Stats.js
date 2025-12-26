export default class Stats {
    constructor() {
        this.fps = 0
        this.frames = 0
        this.prevTime = performance.now()
        this.fpsUpdateInterval = 500

        this.createStatsPanel()
    }

    createStatsPanel() {
        this.panel = document.createElement('div')
        this.panel.id = 'stats-panel'
        this.panel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #0f0;
            font-family: monospace;
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 4px;
            z-index: 9999;
            pointer-events: none;
            min-width: 80px;
        `
        this.panel.innerHTML = 'FPS: --'
        document.body.appendChild(this.panel)
    }

    update() {
        this.frames++
        const currentTime = performance.now()
        const elapsed = currentTime - this.prevTime

        if (elapsed >= this.fpsUpdateInterval) {
            this.fps = Math.round((this.frames * 1000) / elapsed)
            this.frames = 0
            this.prevTime = currentTime

            const color = this.fps >= 50 ? '#0f0' : this.fps >= 30 ? '#ff0' : '#f00'
            this.panel.style.color = color
            this.panel.innerHTML = `FPS: ${this.fps}`
        }
    }

    destroy() {
        if (this.panel && this.panel.parentNode) {
            this.panel.parentNode.removeChild(this.panel)
        }
    }
}
