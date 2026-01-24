import gsap from "gsap";
import { getCVData } from "../data/cv-data.js";
import { i18n } from "../data/i18n.js";
import { createIcon } from "../Utils/Icons.js";

export default class UIManager {
  constructor() {
    this.experience = window.experience;
    this.panels = {};
    this.currentPanel = null;
    this.panelsContainer = document.getElementById("panels-container");

    this.createPanels();
    this.setupEventListeners();

    i18n.onLanguageChange(() => {
      this.reloadPanels();
    });
  }

  isTouchDevice() {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isIPad =
      navigator.userAgent.includes("iPad") ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isMobileUA =
      /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    return hasTouch || isIPad || isMobileUA;
  }

  createPanels() {
    const types = ["info", "work", "skills", "projects", "about"];

    types.forEach((type) => {
      const panel = this.createPanel(type);
      this.panels[type] = panel;
      this.panelsContainer.appendChild(panel);
    });
  }

  createPanel(type) {
    const panel = document.createElement("div");
    panel.className = "station-panel";
    panel.id = `panel-${type}`;
    panel.innerHTML = this.getPanelContent(type);

    return panel;
  }

  getPanelContent(type) {
    const data = getCVData(type);

    switch (type) {
      case "info":
        return this.getInfoContent(data);
      case "work":
        return this.getWorkContent(data);
      case "skills":
        return this.getSkillsContent(data);
      case "projects":
        return this.getProjectsContent(data);
      case "about":
        return this.getAboutContent(data);
      default:
        return "";
    }
  }

  getInfoContent(data) {
    const t = i18n.t.bind(i18n);
    const isMobile = this.isTouchDevice();

    // Select appropriate controls based on device
    const controlsArray = isMobile
      ? data.controls.mobile || data.controls.desktop
      : data.controls.desktop;

    const controlsHTML = controlsArray
      .map(
        (control) => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <kbd style="background: #8b5a2b; color: #f5e6d3; padding: 0.25rem 0.75rem; border-radius: 4px; font-family: monospace; min-width: 80px; text-align: center;">
                    ${control.key}
                </kbd>
                <span style="color: #4a3728; flex: 1; margin-left: 1rem;">
                    ${control.action}
                </span>
            </div>
        `,
      )
      .join("");

    const emojiToIcon = {
      "💼": createIcon("work", { size: "20", color: "#4a3728" }),
      "⚡": createIcon("skills", { size: "20", color: "#4a3728" }),
      "🚀": createIcon("projects", { size: "20", color: "#4a3728" }),
      "👋": createIcon("about", { size: "20", color: "#4a3728" }),
    };

    const stationsList = data.stations
      .map((station) => {
        let stationText = station;
        Object.keys(emojiToIcon).forEach((emoji) => {
          stationText = stationText.replace(emoji, emojiToIcon[emoji]);
        });
        return `
            <li style="margin-bottom: 0.5rem; color: #4a3728;">${stationText}</li>
        `;
      })
      .join("");

    // Select appropriate tip message based on device
    const tipText = isMobile ? data.tipMobile : data.tipDesktop;
    const tipKey = isMobile ? data.tipMobileKey : data.tipDesktopKey;
    const tipAction = isMobile ? data.tipMobileAction : data.tipDesktopAction;

    const headerIcon = createIcon(t("info.icon"), {
      size: 24,
      color: "#8b5a2b",
    });

    return `
            <div class="panel-header">
                <div class="panel-title">${headerIcon} ${t("info.title")}</div>
                <button class="close-btn" data-panel="info">×</button>
            </div>
            <div class="panel-content">
                <h2 style="font-size: 1.5rem; font-weight: bold; color: #3e2723; margin-bottom: 1rem; font-family: Georgia, serif;">
                    ${data.welcome}
                </h2>
                <p style="color: #4a3728; margin-bottom: 1.5rem; line-height: 1.6;">
                    ${data.description}
                </p>

                <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem; font-family: Georgia, serif;">
                    ${createIcon("gamepad", { size: "24", color: "#3e2723" })} ${data.controlsTitle}
                </h3>
                <div style="background: rgba(139, 90, 43, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; border: 2px solid #8b5a2b;">
                    ${controlsHTML}
                </div>

                <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem; font-family: Georgia, serif;">
                    ${createIcon("mapPin", { size: "24", color: "#3e2723" })} ${data.stationsTitle}
                </h3>
                <ul style="padding-left: 1.5rem; margin-bottom: 1rem;">
                    ${stationsList}
                </ul>

                <div style="background: rgba(212, 165, 116, 0.3); padding: 1rem; border-radius: 8px; border: 2px solid #8b5a2b; margin-top: 1.5rem;">
                    <p style="color: #3e2723; font-style: italic; margin: 0;">
                        ${createIcon("lightbulb", { size: "20", color: "#3e2723" })} ${tipText}
                        <kbd style="background: #8b5a2b; color: #f5e6d3; padding: 0.15rem 0.5rem; border-radius: 4px; font-family: monospace;">
                            ${tipKey}
                        </kbd>
                        ${tipAction}
                    </p>
                </div>
            </div>
        `;
  }

  getWorkContent(data) {
    const t = i18n.t.bind(i18n);
    let experiencesHTML = data.experiences
      .map(
        (exp) => `
            <div style="margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 2px solid #8b5a2b;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin: 0;">
                        ${exp.role}
                    </h3>
                </div>
                <div style="color: #2d5f3f; font-weight: 600; margin-bottom: 0.25rem;">
                    ${exp.company}
                </div>
                <div style="color: #6d5438; font-size: 0.875rem; margin-bottom: 0.75rem;">
                    ${exp.period} • ${exp.location}
                </div>
                <p style="color: #4a3728; margin-bottom: 1rem;">
                    ${exp.description}
                </p>
                <div style="margin-bottom: 1rem;">
                    <strong style="color: #3e2723;">${t(
                      "work.technologies",
                    )}</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                        ${exp.technologies
                          .map(
                            (tech) => `
                            <span style="background: #c8e6c9; color: #1b5e20; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; border: 1px solid #81c784;">
                                ${tech}
                            </span>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
                ${
                  exp.achievements
                    ? `
                    <div>
                        <strong style="color: #3e2723;">${t(
                          "work.achievements",
                        )}</strong>
                        <ul style="margin-top: 0.5rem; padding-left: 1.5rem; color: #4a3728;">
                            ${exp.achievements
                              .map(
                                (achievement) => `
                                <li style="margin-bottom: 0.25rem;">${achievement}</li>
                            `,
                              )
                              .join("")}
                        </ul>
                    </div>
                `
                    : ""
                }
            </div>
        `,
      )
      .join("");

    const headerIcon = createIcon(t("work.icon"), {
      size: 24,
      color: "#8b5a2b",
    });

    return `
            <div class="panel-header">
                <div class="panel-title">${headerIcon} ${t("work.title")}</div>
                <button class="close-btn" data-panel="work">×</button>
            </div>
            <div class="panel-content">
                ${experiencesHTML}
            </div>
        `;
  }

  getSkillsContent(data) {
    const t = i18n.t.bind(i18n);
    let categoriesHTML = Object.keys(data.categories)
      .map((catKey) => {
        const category = data.categories[catKey];
        const catTranslation = t(`skills.categories.${catKey}`);
        const categoryIcon = createIcon(catTranslation.icon, {
          size: 22,
          color: "#3e2723",
        });
        return `
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.125rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem;">
                    ${categoryIcon} ${catTranslation.name}
                </h3>
                ${category.skills
                  .map(
                    (skill) => `
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="color: #4a3728; font-weight: 500;">${
                              skill.name
                            }</span>
                            <span style="color: #6d5438; font-size: 0.875rem;">${
                              skill.years
                            } ${
                              skill.years === 1
                                ? t("skills.year")
                                : t("skills.years")
                            }</span>
                        </div>
                        <div style="background: #d7c4ad; height: 10px; border-radius: 6px; overflow: hidden; border: 1px solid #8b5a2b;">
                            <div style="background: linear-gradient(90deg, #4a7c59, #2d5f3f); height: 100%; width: ${
                              skill.level
                            }%; transition: width 0.5s; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);"></div>
                        </div>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `;
      })
      .join("");

    let softSkillsHTML = `
            <div style="margin-top: 2rem; padding-top: 2rem; border-top: 2px solid #8b5a2b;">
                <h3 style="font-size: 1.125rem; font-weight: 600; color: #3e2723; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    ${createIcon("star", { size: 22, color: "#3e2723" })}
                    <span>${t("skills.softSkillsTitle")}</span>
                </h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${data.softSkills
                      .map(
                        (skill) => `
                        <span style="background: #f4e4c1; color: #5d4037; padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem; font-weight: 600; border: 2px solid #d4a574; display: flex; align-items: center; gap: 0.5rem;">
                            ${createIcon(skill.icon, { size: 16, color: "#8b5a2b" })}
                            ${skill.text}
                        </span>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `;

    const headerIcon = createIcon(t("skills.icon"), {
      size: 24,
      color: "#8b5a2b",
    });

    return `
            <div class="panel-header">
                <div class="panel-title">${headerIcon} ${t(
                  "skills.title",
                )}</div>
                <button class="close-btn" data-panel="skills">×</button>
            </div>
            <div class="panel-content">
                ${categoriesHTML}
                ${softSkillsHTML}
            </div>
        `;
  }

  getProjectsContent(data) {
    const t = i18n.t.bind(i18n);
    let featuredHTML = `
            <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin-bottom: 1.5rem;">
                    ${t("projects.featuredTitle")}
                </h3>
                ${data.featured
                  .map(
                    (project) => `
                    <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.3); border-radius: 12px; border: 2px solid #8b5a2b;">
                        <h4 style="font-size: 1.125rem; font-weight: 600; color: #3e2723; margin: 0 0 0.75rem 0;">
                            ${project.name}
                        </h4>
                        <div style="color: #6d5438; font-size: 0.875rem; margin-bottom: 0.75rem; font-weight: 500;">
                            ${project.type}
                        </div>
                        <p style="color: #4a3728; margin-bottom: 1rem;">
                            ${project.description}
                        </p>
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                ${project.technologies
                                  .map(
                                    (tech) => `
                                    <span style="background: #c8e6c9; color: #1b5e20; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500; border: 1px solid #81c784;">
                                        ${tech}
                                    </span>
                                `,
                                  )
                                  .join("")}
                            </div>
                        </div>
                        <ul style="color: #4a3728; font-size: 0.875rem; padding-left: 1.25rem; margin-bottom: 1rem;">
                            ${project.features
                              .map(
                                (feature) => `
                                <li style="margin-bottom: 0.25rem;">${feature}</li>
                            `,
                              )
                              .join("")}
                        </ul>
                        ${
                          project.github || project.demo || project.docs
                            ? `
                            <div style="display: flex; gap: 0.75rem;">
                                ${
                                  project.github
                                    ? `
                                    <a href="${project.github}" target="_blank" style="color: #2d5f3f; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
                                        ${createIcon("code", { size: "16", color: "#2d5f3f" })} GitHub →
                                    </a>
                                `
                                    : ""
                                }
                                ${
                                  project.demo
                                    ? `
                                    <a href="${project.demo}" target="_blank" style="color: #1b5e20; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
                                        ${createIcon("projects", { size: "16", color: "#1b5e20" })} Demo →
                                    </a>
                                `
                                    : ""
                                }
                                ${
                                  project.docs
                                    ? `
                                    <a href="${project.docs}" target="_blank" style="color: #8b5a2b; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
                                        ${createIcon("bookOpen", { size: "16", color: "#8b5a2b" })} Docs →
                                    </a>
                                `
                                    : ""
                                }
                            </div>
                        `
                            : ""
                        }
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `;

    let ossHTML = `
            <div style="padding-top: 2rem; border-top: 2px solid #8b5a2b;">
                <h3 style="font-size: 1.25rem; font-weight: 600; color: #3e2723; margin-bottom: 1.5rem;">
                    ${t("projects.ossTitle")}
                </h3>
                ${data.openSource
                  .map(
                    (contrib) => `
                    <div style="margin-bottom: 1.5rem; padding: 1rem; background: rgba(255, 255, 255, 0.3); border-radius: 8px; border-left: 4px solid #4a7c59;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                            <h4 style="font-size: 1rem; font-weight: 600; color: #3e2723; margin: 0;">
                                ${contrib.name}
                            </h4>
                            ${
                              contrib.stars
                                ? `
                                <span style="color: #f57f17; font-size: 0.875rem; font-weight: 600;">
                                    ⭐ ${contrib.stars}
                                </span>
                            `
                                : ""
                            }
                        </div>
                        <div style="color: #2d5f3f; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem;">
                            ${contrib.role}
                        </div>
                        <p style="color: #4a3728; font-size: 0.875rem; margin-bottom: 0.75rem;">
                            ${contrib.description}
                        </p>
                        <div style="color: #6d5438; font-size: 0.875rem; margin-bottom: 0.5rem;">
                            <strong>${t("projects.contributions")}</strong> ${
                              contrib.contributions
                            }
                        </div>
                        ${
                          contrib.github
                            ? `
                            <a href="${contrib.github}" target="_blank" style="color: #2d5f3f; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
                                ${createIcon("code", { size: "16", color: "#2d5f3f" })} View on GitHub →
                            </a>
                        `
                            : ""
                        }
                    </div>
                `,
                  )
                  .join("")}
            </div>
        `;

    const headerIcon = createIcon(t("projects.icon"), {
      size: 24,
      color: "#8b5a2b",
    });

    return `
            <div class="panel-header">
                <div class="panel-title">${headerIcon} ${t(
                  "projects.title",
                )}</div>
                <button class="close-btn" data-panel="projects">×</button>
            </div>
            <div class="panel-content">
                ${featuredHTML}
                ${ossHTML}
            </div>
        `;
  }

  getAboutContent(data) {
    const t = i18n.t.bind(i18n);

    const bioHTML = `
      <div style="margin-bottom: 2rem;">
        <p style="color: #4a3728; line-height: 1.6; margin-bottom: 1rem;">
          ${data.bio.intro}
        </p>
        <p style="color: #4a3728; line-height: 1.6;">
          ${data.bio.passion}
        </p>
      </div>
    `;

    const interestsHTML = `
      <div style="margin-bottom: 2rem;">
        <h4 style="color: #3e2723; margin-bottom: 0.75rem; font-size: 1.1rem;">
          ${t("about.interests")}
        </h4>
        <div style="display: grid; grid-template-columns: 1fr; gap: 0.5rem;">
          ${data.bio.interests
            .map(
              (interest) => `
            <div style="color: #4a3728; font-size: 0.95rem; padding: 0.4rem 0; display: flex; align-items: center; gap: 0.5rem;">
              ${createIcon(interest.icon, { size: 18, color: "#8b5a2b" })}
              <span>${interest.text}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `;

    const contactHTML = `
      <div style="margin-bottom: 2rem; padding: 1.5rem; background: #f4e4c1; border: 2px solid #d4a574; border-radius: 8px;">
        <h3 style="color: #3e2723; margin-bottom: 1.25rem; font-size: 1.3rem;">
          ${t("about.contactTitle")}
        </h3>

        <div style="margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
            ${createIcon("mail", { size: 18, color: "#8b5a2b" })}
            <span style="color: #6d5438; font-size: 0.9rem;">Email:</span>
          </div>
          <a href="mailto:${
            data.contact.email
          }" style="color: #2d5f3f; text-decoration: underline; font-weight: 600; margin-left: 1.75rem;">
            ${data.contact.email}
          </a>
        </div>

        <div style="margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            ${createIcon("mapPin", { size: 18, color: "#8b5a2b" })}
            <span style="color: #6d5438; font-size: 0.9rem;">Location:</span>
          </div>
          <span style="color: #4a3728; margin-left: 1.75rem;">${
            data.contact.location
          }</span>
        </div>
      </div>
    `;

    const socialsHTML = `
      <div>
        <h4 style="color: #3e2723; margin-bottom: 1rem; font-size: 1.1rem;">
          ${t("about.socialsTitle")}
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a href="${data.contact.socials.github.url}"
             target="_blank"
             style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: white; border: 2px solid #d4a574; border-radius: 6px; text-decoration: none; transition: all 0.2s;">
            ${createIcon("github", { size: 20, color: "#8b5a2b" })}
            <span style="color: #3e2723; font-weight: 600;">${
              data.contact.socials.github.username
            }</span>
          </a>
          <a href="${data.contact.socials.linkedin.url}"
             target="_blank"
             style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: white; border: 2px solid #d4a574; border-radius: 6px; text-decoration: none; transition: all 0.2s;">
            ${createIcon("linkedin", { size: 20, color: "#8b5a2b" })}
            <span style="color: #3e2723; font-weight: 600;">${
              data.contact.socials.linkedin.username
            }</span>
          </a>
        </div>
      </div>
    `;

    const headerIcon = createIcon(t("about.icon"), {
      size: 24,
      color: "#8b5a2b",
    });

    return `
      <div class="panel-header">
        <div class="panel-title">${headerIcon} ${t("about.title")}</div>
        <button class="close-btn" data-panel="about">×</button>
      </div>
      <div class="panel-content">
        ${bioHTML}
        ${interestsHTML}
        ${contactHTML}
        ${socialsHTML}
      </div>
    `;
  }

  async reloadPanels() {
    const wasOpen = this.currentPanel;

    if (this.currentPanel) {
      await this.hideCurrentPanel();
    }

    const types = ["info", "work", "skills", "projects", "about"];
    types.forEach((type) => {
      const panel = this.panels[type];
      if (panel) {
        panel.innerHTML = this.getPanelContent(type);
      }
    });

    document.querySelectorAll(".close-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.hideCurrentPanel();
      });
    });

    if (wasOpen) {
      await this.showPanel(wasOpen);
    }
  }

  setupEventListeners() {
    document.querySelectorAll(".close-btn").forEach((btn) => {
      // Add ARIA label
      btn.setAttribute("aria-label", "Chiudi pannello");
      btn.setAttribute("tabindex", "0");

      // Click handler
      btn.addEventListener("click", () => {
        this.hideCurrentPanel();
      });

      // Keyboard navigation
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.hideCurrentPanel();
        }
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.currentPanel) {
        this.hideCurrentPanel();
      }
    });
  }

  async showPanel(type) {
    if (this.currentPanel) {
      await this.hidePanel(this.currentPanel);
    }

    const panel = this.panels[type];
    if (!panel) return;

    this.currentPanel = type;

    // Hide language switcher when opening any panel
    if (this.experience?.languageSwitcher) {
      this.experience.languageSwitcher.hide();
    }

    gsap.killTweensOf(panel);

    panel.classList.add("active");

    // Respect reduced motion preference
    const duration = window.reducedMotion ? 0 : 0.5;

    gsap.fromTo(
      panel,
      {
        x: "100%",
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: duration,
        ease: "power3.out",
        onComplete: () => {
          // Focus management - focus on close button when panel opens
          const closeBtn = panel.querySelector(".close-btn");
          if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
          }
        },
      },
    );
  }

  hidePanel(type) {
    return new Promise((resolve) => {
      const panel = this.panels[type];
      if (!panel) {
        resolve();
        return;
      }

      gsap.killTweensOf(panel);

      // Respect reduced motion preference
      const duration = window.reducedMotion ? 0 : 0.4;

      gsap.to(panel, {
        x: "100%",
        opacity: 0,
        duration: duration,
        ease: "power3.in",
        onComplete: () => {
          panel.classList.remove("active");
          resolve();
        },
      });
    });
  }

  async hideCurrentPanel() {
    if (this.currentPanel) {
      await this.hidePanel(this.currentPanel);
      this.currentPanel = null;
    }
  }

  hideAll() {
    Object.keys(this.panels).forEach((type) => {
      this.hidePanel(type);
    });
    this.currentPanel = null;
  }
}
