export default class VirtualJoystick {
    constructor() {
        this.active = false
        this.baseX = 0
        this.baseY = 0
        this.stickX = 0
        this.stickY = 0
        this.touchId = null

        this.deltaX = 0
        this.deltaY = 0
        this.maxDistance = 50

        if (this.isTouchDevice()) {
            this.createJoystick()
            this.setupEvents()
        }
    }

    isTouchDevice() {
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        const isIPad = navigator.userAgent.includes('iPad') ||
                       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        return hasTouch || isIPad || isMobileUA
    }

    createJoystick() {
        this.container = document.createElement('div')
        this.container.id = 'virtual-joystick'
        this.container.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 80px;
            width: 120px;
            height: 120px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.2s;
        `

        this.base = document.createElement('div')
        this.base.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            border: 3px solid rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(10px);
        `

        this.stick = document.createElement('div')
        this.stick.style.cssText = `
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.8);
            border: 3px solid rgba(255, 255, 255, 0.6);
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.1s;
        `

        this.container.appendChild(this.base)
        this.container.appendChild(this.stick)
        document.body.appendChild(this.container)
    }

    setupEvents() {
        window.addEventListener('touchstart', (e) => {
            const touch = e.touches[0]
            if (touch.clientX < window.innerWidth / 2) {
                this.handleTouchStart(touch)
            }
        }, { passive: false })

        window.addEventListener('touchmove', (e) => {
            if (this.active) {
                e.preventDefault()
                const touch = Array.from(e.touches).find(t => t.identifier === this.touchId)
                if (touch) {
                    this.handleTouchMove(touch)
                }
            }
        }, { passive: false })

        window.addEventListener('touchend', (e) => {
            const touches = Array.from(e.changedTouches)
            if (touches.find(t => t.identifier === this.touchId)) {
                this.handleTouchEnd()
            }
        })

        window.addEventListener('touchcancel', () => {
            if (this.active) {
                this.handleTouchEnd()
            }
        })
    }

    handleTouchStart(touch) {
        this.active = true
        this.touchId = touch.identifier
        this.baseX = touch.clientX
        this.baseY = touch.clientY

        this.container.style.left = `${this.baseX - 60}px`
        this.container.style.bottom = `${window.innerHeight - this.baseY - 60}px`
        this.container.style.opacity = '1'
        this.container.style.pointerEvents = 'auto'
    }

    handleTouchMove(touch) {
        const dx = touch.clientX - this.baseX
        const dy = touch.clientY - this.baseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > this.maxDistance) {
            const angle = Math.atan2(dy, dx)
            this.stickX = Math.cos(angle) * this.maxDistance
            this.stickY = Math.sin(angle) * this.maxDistance
        } else {
            this.stickX = dx
            this.stickY = dy
        }

        this.stick.style.transform = `translate(calc(-50% + ${this.stickX}px), calc(-50% + ${this.stickY}px))`

        this.deltaX = this.stickX / this.maxDistance
        this.deltaY = this.stickY / this.maxDistance
    }

    handleTouchEnd() {
        this.active = false
        this.touchId = null
        this.deltaX = 0
        this.deltaY = 0
        this.stickX = 0
        this.stickY = 0

        this.stick.style.transform = 'translate(-50%, -50%)'

        this.container.style.opacity = '0'
        setTimeout(() => {
            this.container.style.pointerEvents = 'none'
        }, 200)
    }

    getValues() {
        return {
            x: this.deltaX,
            y: this.deltaY,
            active: this.active
        }
    }
}
