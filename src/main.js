import Experience from './Experience/Experience.js'

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas')
    const experience = new Experience(canvas)
    window.experience = experience
    updateControlsHint()
})

function updateControlsHint() {
    const controlsHint = document.getElementById('controls-hint')
    const isMobile = isTouchDevice()

    if (isMobile) {
        controlsHint.innerHTML = `
            <strong>Mobile Controls:</strong> Touch and drag on <strong>left</strong> to move | Touch a <strong>station</strong> to interact
        `
    } else {
        controlsHint.innerHTML = `
            <strong>Controls:</strong> <kbd>W</kbd> Up | <kbd>A</kbd> Left | <kbd>S</kbd> Down | <kbd>D</kbd> Right | <kbd>Space</kbd> Interact | <kbd>ESC</kbd> Close
        `
    }
}

function isTouchDevice() {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isIPad = navigator.userAgent.includes('iPad') ||
                   (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    return hasTouch || isIPad || isMobileUA
}
