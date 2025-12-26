export default class Controls {
    constructor() {
        this.keys = {
            left: false,
            right: false,
            forward: false,
            backward: false,
            interact: false
        }

        this.setupKeyboard()
    }

    setupKeyboard() {
        window.addEventListener('keydown', (event) => {
            switch (event.key.toLowerCase()) {
                case 'arrowleft':
                case 'a':
                    this.keys.left = true
                    break
                case 'arrowright':
                case 'd':
                    this.keys.right = true
                    break
                case 'arrowup':
                case 'w':
                    this.keys.forward = true
                    break
                case 'arrowdown':
                case 's':
                    this.keys.backward = true
                    break
                case ' ':
                case 'enter':
                    this.keys.interact = true
                    event.preventDefault()
                    break
            }
        })

        window.addEventListener('keyup', (event) => {
            switch (event.key.toLowerCase()) {
                case 'arrowleft':
                case 'a':
                    this.keys.left = false
                    break
                case 'arrowright':
                case 'd':
                    this.keys.right = false
                    break
                case 'arrowup':
                case 'w':
                    this.keys.forward = false
                    break
                case 'arrowdown':
                case 's':
                    this.keys.backward = false
                    break
                case ' ':
                case 'enter':
                    this.keys.interact = false
                    break
            }
        })

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                window.dispatchEvent(new CustomEvent('closePanel'))
            }
        })
    }

    isMoving() {
        return this.keys.left || this.keys.right || this.keys.forward || this.keys.backward
    }
}
