import Experience from './Experience/Experience.js'

// WebGL Detection
function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch (e) {
    return false
  }
}

// Global Error Handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)

  const loadingScreen = document.getElementById('loading-screen')
  if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
    loadingScreen.innerHTML = `
      <div style="text-align:center;color:#fff;max-width:500px;padding:2rem;">
        <h2 style="margin-bottom:1rem;">Errore di Caricamento</h2>
        <p style="margin-bottom:1.5rem;">Si è verificato un problema durante il caricamento del portfolio.</p>
        <button onclick="location.reload()" style="background:#4f46e5;color:#fff;border:none;padding:0.75rem 1.5rem;border-radius:8px;cursor:pointer;font-size:1rem;">
          Ricarica Pagina
        </button>
      </div>
    `
  }
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

window.addEventListener('DOMContentLoaded', () => {
    // Check WebGL support
    if (!detectWebGL()) {
      const loadingScreen = document.getElementById('loading-screen')
      loadingScreen.innerHTML = `
        <div style="text-align:center;color:#fff;max-width:500px;padding:2rem;">
          <h2 style="margin-bottom:1rem;">Browser Non Supportato</h2>
          <p style="margin-bottom:1rem;">Questo portfolio richiede WebGL per funzionare correttamente.</p>
          <p style="color:#888;font-size:0.9rem;">Per favore usa un browser moderno come Chrome, Firefox, Safari o Edge.</p>
        </div>
      `
      return
    }

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s')
      window.reducedMotion = true
    }

    const canvas = document.getElementById('canvas')
    const experience = new Experience(canvas)
    window.experience = experience
    updateControlsHint()
})

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('Service Worker registration failed:', err))
  })
}

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
