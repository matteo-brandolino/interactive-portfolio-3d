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

    context.fillStyle = "rgba(0, 0, 0, 0.7)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = "Bold 48px Arial";
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(
      `${this.data.icon} ${this.data.title}`,
      canvas.width / 2,
      canvas.height / 2
    );

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
    });
    this.label = new THREE.Sprite(spriteMaterial);
    this.label.scale.set(2.5, 0.6, 1);
    this.label.position.y = 1.8;

    this.group.add(this.label);
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
