import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter {
    constructor() {
        super()

        this.MAX_WIDTH = 1920
        this.MAX_HEIGHT = 1080

        this.updateSize()

        window.addEventListener('resize', () => {
            this.updateSize()
            this.trigger('resize')
        })
    }

    updateSize() {
        const rawWidth = window.innerWidth
        const rawHeight = window.innerHeight

        let scaledWidth = rawWidth
        let scaledHeight = rawHeight

        if (rawWidth > this.MAX_WIDTH) {
            const scale = this.MAX_WIDTH / rawWidth
            scaledWidth = this.MAX_WIDTH
            scaledHeight = rawHeight * scale
        }

        if (scaledHeight > this.MAX_HEIGHT) {
            const scale = this.MAX_HEIGHT / scaledHeight
            scaledHeight = this.MAX_HEIGHT
            scaledWidth = scaledWidth * scale
        }

        this.width = Math.floor(scaledWidth)
        this.height = Math.floor(scaledHeight)
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    }
}
