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
        <h2 style="margin-bottom:1rem;color:#E7DDCF;font-family:Georgia,serif;">Errore di Caricamento</h2>
        <p style="margin-bottom:1.5rem;color:#E7DDCF;">Si è verificato un problema durante il caricamento del portfolio.</p>
        <button onclick="location.reload()" style="
          background:linear-gradient(135deg,#d4a574 0%,#c89666 100%);
          color:#3d2817;
          border:3px solid #8b5a2b;
          padding:0.75rem 1.5rem;
          border-radius:8px;
          cursor:pointer;
          font-size:1rem;
          font-weight:600;
          font-family:Georgia,serif;
          box-shadow:0 4px 12px rgba(139,90,43,0.4),inset 0 2px 4px rgba(255,255,255,0.3),inset 0 -2px 4px rgba(0,0,0,0.2);
          transition:transform 0.2s,box-shadow 0.2s;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
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
          <h2 style="margin-bottom:1rem;color:#E7DDCF;font-family:Georgia,serif;">Browser Non Supportato</h2>
          <p style="margin-bottom:1rem;color:#E7DDCF;">Questo portfolio richiede WebGL per funzionare correttamente.</p>
          <p style="color:#c89666;font-size:0.9rem;">Per favore usa un browser moderno come Chrome, Firefox, Safari o Edge.</p>
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
    if (!controlsHint) return
    const isMobile = isTouchDevice()

    if (isMobile) {
        controlsHint.innerHTML = `
            <strong>Mobile Controls:</strong> Touch and drag on <strong>bottom area</strong> to move | Tap <strong>corner button</strong> to interact
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
