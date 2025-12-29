import { i18n } from "../data/i18n.js";
import gsap from "gsap";

export default class LanguageSwitcher {
  constructor() {
    this.container = null;
    this.currentLang = i18n.getCurrentLanguage();

    this.createSwitcher();
    this.setupEventListeners();
  }

  createSwitcher() {
    this.container = document.createElement("div");
    this.container.id = "language-switcher";
    this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            font-family: Georgia, serif;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;

    const toggleWrapper = document.createElement("div");
    toggleWrapper.style.cssText = `
            background: #E7DDCF;
            padding: 10px 14px;
            border-radius: 20px;
            box-shadow: 0 4px 16px rgba(61, 40, 23, 0.4),
                        inset 0 2px 4px rgba(255, 255, 255, 0.3),
                        inset 0 -2px 4px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
            position: relative;
        `;

    const woodTexture = document.createElement("div");
    woodTexture.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image:
                repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 40px,
                    rgba(139, 90, 43, 0.04) 40px,
                    rgba(139, 90, 43, 0.04) 42px
                ),
                repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 6px,
                    rgba(139, 90, 43, 0.02) 6px,
                    rgba(139, 90, 43, 0.02) 8px
                );
            pointer-events: none;
            border-radius: 16px;
        `;
    toggleWrapper.appendChild(woodTexture);

    const langToggle = document.createElement("div");
    langToggle.style.cssText = `
            display: flex;
            background: rgba(139, 90, 43, 0.15);
            border-radius: 14px;
            padding: 3px;
            position: relative;
            z-index: 1;
            border: 2px solid rgba(139, 90, 43, 0.3);
        `;

    const slider = document.createElement("div");
    slider.id = "lang-slider";
    slider.style.cssText = `
            position: absolute;
            top: 3px;
            left: 3px;
            width: 42px;
            height: 30px;
            background: linear-gradient(135deg, #d4a574 0%, #c89666 100%);
            border-radius: 11px;
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 3px 8px rgba(61, 40, 23, 0.3),
                        inset 0 1px 3px rgba(255, 255, 255, 0.3),
                        inset 0 -1px 2px rgba(0, 0, 0, 0.1);
            border: 2px solid #8b5a2b;
        `;

    if (this.currentLang === "en") {
      slider.style.transform = "translateX(44px)";
    }

    const itOption = this.createLangOption("IT", this.currentLang === "it");
    const enOption = this.createLangOption("EN", this.currentLang === "en");

    langToggle.appendChild(slider);
    langToggle.appendChild(itOption);
    langToggle.appendChild(enOption);

    toggleWrapper.appendChild(langToggle);

    toggleWrapper.addEventListener("mouseenter", () => {
      gsap.to(toggleWrapper, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    toggleWrapper.addEventListener("mouseleave", () => {
      gsap.to(toggleWrapper, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    });

    this.container.appendChild(toggleWrapper);
    this.slider = slider;
    this.toggleWrapper = toggleWrapper;

    document.body.appendChild(this.container);

    gsap.from(this.container, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 0.5,
    });
  }

  createLangOption(lang, isActive) {
    const option = document.createElement("div");
    option.className = `lang-option lang-${lang.toLowerCase()}`;
    option.textContent = lang;
    option.style.cssText = `
            width: 42px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-weight: bold;
            font-family: Georgia, serif;
            color: ${isActive ? "#f5e6d3" : "#5d4037"};
            transition: color 0.3s ease;
            z-index: 2;
            cursor: pointer;
            text-shadow: ${
              isActive
                ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                : "0.5px 0.5px 1px rgba(139, 90, 43, 0.2)"
            };
            letter-spacing: 0.5px;
        `;

    option.setAttribute("data-lang", lang.toLowerCase());

    return option;
  }

  setupEventListeners() {
    this.toggleWrapper.addEventListener("click", (e) => {
      const langOption = e.target.closest(".lang-option");
      if (!langOption) return;

      const newLang = langOption.getAttribute("data-lang");
      if (newLang === this.currentLang) return;

      this.switchLanguage(newLang);
    });
  }

  switchLanguage(newLang) {
    const translateX = newLang === "en" ? 44 : 0;
    gsap.to(this.slider, {
      x: translateX,
      duration: 0.4,
      ease: "back.out(1.7)",
    });

    const allOptions = this.container.querySelectorAll(".lang-option");
    allOptions.forEach((option) => {
      const lang = option.getAttribute("data-lang");
      const isActive = lang === newLang;

      gsap.to(option, {
        color: isActive ? "#f5e6d3" : "#5d4037",
        textShadow: isActive
          ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
          : "0.5px 0.5px 1px rgba(139, 90, 43, 0.2)",
        duration: 0.3,
      });
    });

    this.currentLang = newLang;
    i18n.setLanguage(newLang);

    gsap.to(this.toggleWrapper, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  }

  show() {
    if (this.container) {
      this.container.style.opacity = "1";
      this.container.style.pointerEvents = "auto";
    }
  }

  hide() {
    if (this.container) {
      this.container.style.opacity = "0";
      this.container.style.pointerEvents = "none";
    }
  }

  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
