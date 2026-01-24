import { TouchPointer } from 'lucide';

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

        // Create joystick zone indicator
        this.zoneIndicator = document.createElement('div')
        this.zoneIndicator.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            width: 40%;
            height: 100%;
            background: linear-gradient(90deg, rgba(212, 165, 116, 0.15) 0%, transparent 100%);
            border-right: 2px dashed rgba(139, 90, 43, 0.25);
            pointer-events: none;
            z-index: 50;
            opacity: 1;
            transition: opacity 0.3s;
        `
        document.body.appendChild(this.zoneIndicator)

        // Add touch hint text (fades after first use)
        const hasSeenHint = localStorage.getItem('joystick-hint-seen')
        if (!hasSeenHint) {
            this.touchHint = document.createElement('div')
            this.touchHint.textContent = 'Tocca qui per muoverti'
            this.touchHint.style.cssText = `
                position: fixed;
                left: 20%;
                bottom: 140px;
                transform: translateX(-50%);
                background: rgba(212, 165, 116, 0.95);
                color: #3d2817;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                border: 2px solid #8b5a2b;
                font-size: 0.9rem;
                font-weight: 600;
                pointer-events: none;
                z-index: 100;
                opacity: 1;
                transition: opacity 0.5s;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            `
            document.body.appendChild(this.touchHint)

            // Fade out hint after first touch
            const hideHint = () => {
                if (this.touchHint) {
                    this.touchHint.style.opacity = '0'
                    setTimeout(() => {
                        this.touchHint?.remove()
                        this.touchHint = null
                    }, 500)
                    localStorage.setItem('joystick-hint-seen', 'true')
                    window.removeEventListener('touchstart', hideHint)
                }
            }
            window.addEventListener('touchstart', hideHint)
        }

        // Create interaction button
        this.interactButton = document.createElement('button')
        this.interactButton.id = 'interact-button'
        const icon = TouchPointer.toSvg({ size: 32, color: '#3d2817', strokeWidth: 2.5 })
        this.interactButton.innerHTML = icon
        this.interactButton.setAttribute('aria-label', 'Interagisci con la stazione')
        this.interactButton.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 80px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #d4a574 0%, #c89666 100%);
            border: 3px solid #8b5a2b;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow:
                0 4px 12px rgba(139, 90, 43, 0.4),
                inset 0 2px 4px rgba(255, 255, 255, 0.3),
                inset 0 -2px 4px rgba(0, 0, 0, 0.2);
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            transition: transform 0.2s, box-shadow 0.2s;
        `
        document.body.appendChild(this.interactButton)

        // Handle interaction button with active state feedback
        this.interactButton.addEventListener('touchstart', (e) => {
            e.preventDefault()
            this.interactButton.style.transform = 'scale(0.95)'
            this.triggerInteraction()
        })

        this.interactButton.addEventListener('touchend', (e) => {
            e.preventDefault()
            this.interactButton.style.transform = 'scale(1)'
        })
    }

    triggerInteraction() {
        // Dispatch a custom event that Character will listen to
        window.dispatchEvent(new CustomEvent('mobileInteract'))
    }

    isTouchNearButton(touch) {
        // Check if touch is near the interact button (80px radius + margin)
        const buttonX = window.innerWidth - 80 - 80 // right: 80px, half width: 80px
        const buttonY = window.innerHeight - 80 - 80 // bottom: 80px, half height: 80px
        const distance = Math.sqrt(
            Math.pow(touch.clientX - buttonX, 2) +
            Math.pow(touch.clientY - buttonY, 2)
        )
        return distance < 120 // 80px button + 40px margin
    }

    setupEvents() {
        window.addEventListener('touchstart', (e) => {
            const touch = e.touches[0]
            // Larger activation zone (60% instead of 50%)
            if (touch.clientX < window.innerWidth * 0.6 &&
                !this.isTouchNearButton(touch)) {
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
