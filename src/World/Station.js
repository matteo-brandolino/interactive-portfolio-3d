import * as THREE from "three";
import gsap from "gsap";
import Experience from "../Experience/Experience.js";

export default class Station {
  constructor(data) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    this.data = data;
    this.isActive = false;
    this.proximityThreshold = 2.5;

    this.createMarker();
    this.createLabel();
  }

  createMarker() {
    this.group = new THREE.Group();

    if (this.data.type === 'info') {
      this.group.position.set(this.data.position.x, 0.7, this.data.position.z);
      this.initialY = this.group.position.y;
      this.scene.add(this.group);
      return;
    }

    const woodenSignModel = this.experience.resources.items.wooden_sign;

    if (woodenSignModel) {
      this.marker = woodenSignModel.scene.clone();
      this.marker.scale.set(0.8, 0.8, 0.8);
      this.marker.position.y = 0;

      this.marker.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (!this.markerMaterial && child.material) {
            this.markerMaterial = child.material;
          }
        }
      });

      this.group.add(this.marker);
    } else {
      const pedestalGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.3, 8);
      const pedestalMaterial = new THREE.MeshStandardMaterial({
        color: "#64748b",
        metalness: 0.5,
        roughness: 0.3,
        flatShading: true,
      });
      const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
      pedestal.position.y = 0.15;
      pedestal.castShadow = true;
      pedestal.receiveShadow = true;
      this.group.add(pedestal);

      const markerGeometry = new THREE.SphereGeometry(0.4, 16, 16);
      this.markerMaterial = new THREE.MeshStandardMaterial({
        color: this.getColorByType(),
        emissive: this.getColorByType(),
        emissiveIntensity: 0.5,
        metalness: 0.3,
        roughness: 0.2,
      });
      this.marker = new THREE.Mesh(markerGeometry, this.markerMaterial);
      this.marker.position.y = 0.8;
      this.marker.castShadow = true;
      this.group.add(this.marker);

      const ringGeometry = new THREE.TorusGeometry(0.5, 0.05, 8, 16);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: this.getColorByType(),
        emissive: this.getColorByType(),
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 0.2,
        flatShading: true,
      });
      this.ring = new THREE.Mesh(ringGeometry, ringMaterial);
      this.ring.position.y = 0.8;
      this.ring.rotation.x = Math.PI / 2;
      this.group.add(this.ring);
    }

    this.group.position.set(this.data.position.x, 0.7, this.data.position.z);
    this.initialY = this.group.position.y;

    this.scene.add(this.group);
  }

  createLabel() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 128;

    // Wooden background with gradient and rounded corners
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#d4a574");
    gradient.addColorStop(1, "#c89666");
    context.fillStyle = gradient;
    this.roundRect(context, 0, 0, canvas.width, canvas.height, 20);
    context.fill();

    // Add wood grain texture effect
    context.fillStyle = "rgba(139, 90, 43, 0.15)";
    for (let i = 0; i < 8; i++) {
      const y = Math.random() * canvas.height;
      const height = 3 + Math.random() * 4;
      this.roundRect(context, 0, y, canvas.width, height, 2);
      context.fill();
    }

    // Add darker border for depth
    context.strokeStyle = "#8b5a2b";
    context.lineWidth = 8;
    this.roundRect(context, 4, 4, canvas.width - 8, canvas.height - 8, 16);
    context.stroke();

    // Engraved text effect
    context.font = "Bold 52px Georgia, serif";
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Light shadow for engraved effect
    context.shadowColor = "rgba(255, 255, 255, 0.4)";
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowBlur = 2;

    // Dark carved text
    context.fillStyle = "#3d2817";
    context.fillText(
      this.data.title,
      canvas.width / 2,
      canvas.height / 2
    );

    // Reset shadow
    context.shadowColor = "transparent";

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
    });
    this.label = new THREE.Sprite(spriteMaterial);
    this.label.scale.set(1.8, 0.45, 1);

    if (this.data.type === 'info') {
      this.label.position.set(0, 2.5, 0);
    } else {
      this.label.position.set(0.3, 2.2, 0);
    }

    this.group.add(this.label);
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  getColorByType() {
    const colors = {
      work: "#3b82f6",
      skills: "#8b5cf6",
      projects: "#10b981",
      about: "#f59e0b",
    };
    return colors[this.data.type] || "#6b7280";
  }

  setActive(active) {
    if (this.isActive === active) return;

    this.isActive = active;

    if (active) {
      if (this.label && this.label.material) {
        gsap.to(this.label.material, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    } else {
      if (this.label && this.label.material) {
        gsap.to(this.label.material, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }

  isNear(characterPosition) {
    const stationPos = this.group.position;
    const dx = characterPosition.x - stationPos.x;
    const dz = characterPosition.z - stationPos.z;
    const distanceSquared = dx * dx + dz * dz;
    const thresholdSquared = this.proximityThreshold * this.proximityThreshold;
    return distanceSquared < thresholdSquared;
  }

  getPosition() {
    return this.group.position;
  }

  update() {}
}
