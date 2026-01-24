export default class VirtualJoystick {
  constructor() {
    this.active = false;
    this.baseX = 0;
    this.baseY = 0;
    this.stickX = 0;
    this.stickY = 0;
    this.touchId = null;

    this.deltaX = 0;
    this.deltaY = 0;
    this.maxDistance = 50;
    this.boundHandlers = null;

    if (this.isTouchDevice()) {
      this.createJoystick();
      this.setupEvents();
    }
  }

  isTouchDevice() {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobileUA =
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    return hasTouch || isIPad || isMobileUA;
  }

  createJoystick() {
    this.container = document.createElement("div");
    this.container.id = "virtual-joystick";
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
        `;

    this.base = document.createElement("div");
    this.base.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(212, 165, 116, 0.3);
            border: 3px solid rgba(139, 90, 43, 0.6);
            backdrop-filter: blur(10px);
        `;

    this.stick = document.createElement("div");
    this.stick.style.cssText = `
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #d4a574 0%, #c89666 100%);
            border: 3px solid #8b5a2b;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.1s;
            box-shadow:
                0 2px 8px rgba(139, 90, 43, 0.3),
                inset 0 1px 2px rgba(255, 255, 255, 0.3),
                inset 0 -1px 2px rgba(0, 0, 0, 0.2);
        `;

    this.container.appendChild(this.base);
    this.container.appendChild(this.stick);
    document.body.appendChild(this.container);

    // Add touch hint text (fades after first use)
    const hasSeenHint = localStorage.getItem("joystick-hint-seen");
    if (!hasSeenHint) {
      this.touchHint = document.createElement("div");
      this.touchHint.textContent = "Tocca qui per muoverti";
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
            `;
      document.body.appendChild(this.touchHint);

      // Fade out hint after first touch
      const hideHint = () => {
        if (this.touchHint) {
          this.touchHint.style.opacity = "0";
          setTimeout(() => {
            this.touchHint?.remove();
            this.touchHint = null;
          }, 500);
          localStorage.setItem("joystick-hint-seen", "true");
          window.removeEventListener("touchstart", hideHint);
        }
      };
      window.addEventListener("touchstart", hideHint);
    }

    this.interactButton = document.createElement("button");
    this.interactButton.id = "interact-button";

    this.interactButton.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" /><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg>
`;
    this.interactButton.setAttribute(
      "aria-label",
      "Interagisci con la stazione",
    );
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
            transition: transform 0.2s, box-shadow 0.2s, opacity 0.3s;
            opacity: 0;
            pointer-events: none;
            color: #4a3728;
        `;
    document.body.appendChild(this.interactButton);

    // Handle interaction button with active state feedback
    this.interactButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.interactButton.style.transform = "scale(0.95)";
      this.triggerInteraction();
    });

    this.interactButton.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.interactButton.style.transform = "scale(1)";
    });
  }

  triggerInteraction() {
    // Dispatch a custom event that Character will listen to
    window.dispatchEvent(new CustomEvent("mobileInteract"));
  }

  show() {
    if (this.interactButton) {
      this.interactButton.style.opacity = "1";
      this.interactButton.style.pointerEvents = "auto";
    }
  }

  hide() {
    if (this.interactButton) {
      this.interactButton.style.opacity = "0";
      this.interactButton.style.pointerEvents = "none";
    }
  }

  isTouchNearButton(touch) {
    // Check if touch is near the interact button (80px radius + margin)
    const buttonX = window.innerWidth - 80 - 80; // right: 80px, half width: 80px
    const buttonY = window.innerHeight - 80 - 80; // bottom: 80px, half height: 80px
    const distance = Math.sqrt(
      Math.pow(touch.clientX - buttonX, 2) +
        Math.pow(touch.clientY - buttonY, 2),
    );
    return distance < 120; // 80px button + 40px margin
  }

  setupEvents() {
    this.boundHandlers = {
      touchstart: (e) => {
        if (!e.touches || e.touches.length === 0) return;
        const touch = e.touches[0];
        // Larger activation zone (60% instead of 50%)
        if (
          touch.clientX < window.innerWidth * 0.6 &&
          !this.isTouchNearButton(touch)
        ) {
          this.handleTouchStart(touch);
        }
      },
      touchmove: (e) => {
        if (!this.active || !e.touches || e.touches.length === 0) return;
        e.preventDefault();
        const touch = Array.from(e.touches).find(
          (t) => t.identifier === this.touchId,
        );
        if (!touch) return;
        this.handleTouchMove(touch);
      },
      touchend: (e) => {
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const touches = Array.from(e.changedTouches);
        if (touches.find((t) => t.identifier === this.touchId)) {
          this.handleTouchEnd();
        }
      },
      touchcancel: () => {
        if (this.active) {
          this.handleTouchEnd();
        }
      },
    };

    window.addEventListener("touchstart", this.boundHandlers.touchstart, {
      passive: false,
    });
    window.addEventListener("touchmove", this.boundHandlers.touchmove, {
      passive: false,
    });
    window.addEventListener("touchend", this.boundHandlers.touchend);
    window.addEventListener("touchcancel", this.boundHandlers.touchcancel);
  }

  handleTouchStart(touch) {
    this.active = true;
    this.touchId = touch.identifier;
    this.baseX = touch.clientX;
    this.baseY = touch.clientY;

    this.container.style.left = `${this.baseX - 60}px`;
    this.container.style.bottom = `${window.innerHeight - this.baseY - 60}px`;
    this.container.style.opacity = "1";
    this.container.style.pointerEvents = "auto";
  }

  handleTouchMove(touch) {
    const dx = touch.clientX - this.baseX;
    const dy = touch.clientY - this.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.maxDistance) {
      const angle = Math.atan2(dy, dx);
      this.stickX = Math.cos(angle) * this.maxDistance;
      this.stickY = Math.sin(angle) * this.maxDistance;
    } else {
      this.stickX = dx;
      this.stickY = dy;
    }

    this.stick.style.transform = `translate(calc(-50% + ${this.stickX}px), calc(-50% + ${this.stickY}px))`;

    this.deltaX = this.stickX / this.maxDistance;
    this.deltaY = this.stickY / this.maxDistance;
  }

  handleTouchEnd() {
    this.active = false;
    this.touchId = null;
    this.deltaX = 0;
    this.deltaY = 0;
    this.stickX = 0;
    this.stickY = 0;

    this.stick.style.transform = "translate(-50%, -50%)";

    this.container.style.opacity = "0";
    setTimeout(() => {
      this.container.style.pointerEvents = "none";
    }, 200);
  }

  getValues() {
    return {
      x: this.deltaX,
      y: this.deltaY,
      active: this.active,
    };
  }

  destroy() {
    if (this.boundHandlers) {
      window.removeEventListener("touchstart", this.boundHandlers.touchstart);
      window.removeEventListener("touchmove", this.boundHandlers.touchmove);
      window.removeEventListener("touchend", this.boundHandlers.touchend);
      window.removeEventListener("touchcancel", this.boundHandlers.touchcancel);
      this.boundHandlers = null;
    }

    if (this.container && this.container.parentElement) {
      this.container.remove();
    }

    if (this.interactButton && this.interactButton.parentElement) {
      this.interactButton.remove();
    }

    if (this.zoneIndicator && this.zoneIndicator.parentElement) {
      this.zoneIndicator.remove();
    }

    if (this.touchHint && this.touchHint.parentElement) {
      this.touchHint.remove();
    }
  }
}
