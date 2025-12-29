import * as THREE from 'three';
import Experience from '../Experience/Experience.js';

export default class Camp {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.group = new THREE.Group();
    this.obstacles = [];

    this.createTent();
    this.createBonfire();

    this.scene.add(this.group);
  }

  createTent() {
    const tentModel = this.resources.items.tent;

    if (tentModel) {
      this.tent = tentModel.scene.clone();
      this.tent.scale.set(0.15, 0.15, 0.15);
      this.tent.position.set(-1.5, 0.5, 0);
      this.tent.rotation.y = Math.PI * 0.25;

      this.tent.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.group.add(this.tent);

      this.obstacles.push({
        x: -1.5,
        z: 0,
        radius: 0.8
      });
    }
  }

  createBonfire() {
    const bonfireModel = this.resources.items.bonfire;

    if (bonfireModel) {
      this.bonfire = bonfireModel.scene.clone();
      this.bonfire.scale.set(4, 4, 4);
      this.bonfire.position.set(1.5, 0.65, -0.5);

      this.bonfire.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.group.add(this.bonfire);

      this.obstacles.push({
        x: 1.5,
        z: -0.5,
        radius: 0.7
      });

      this.createFireEffect();
    }
  }

  createFireEffect() {
    const fireGroup = new THREE.Group();
    fireGroup.position.copy(this.bonfire.position);
    fireGroup.position.y += 0.8;

    this.fireParticles = [];
    for (let i = 0; i < 8; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.08, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? '#ff6600' : '#ffaa00',
        transparent: true,
        opacity: 0.7,
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.userData.offset = Math.random() * Math.PI * 2;
      particle.userData.speed = 0.5 + Math.random() * 0.5;
      this.fireParticles.push(particle);
      fireGroup.add(particle);
    }

    this.fireLight = new THREE.PointLight('#ff6600', 1.5, 6);
    this.fireLight.position.copy(fireGroup.position);
    this.scene.add(this.fireLight);

    this.group.add(fireGroup);
    this.fireGroup = fireGroup;
    this.time = this.experience.time;
  }

  update() {
    if (this.fireParticles && this.fireLight) {
      const elapsed = this.time.elapsed * 0.001;

      this.fireParticles.forEach((particle, i) => {
        const offset = particle.userData.offset;
        const speed = particle.userData.speed;
        const t = elapsed * speed + offset;

        particle.position.x = Math.cos(t * 3) * 0.15;
        particle.position.z = Math.sin(t * 3) * 0.15;
        particle.position.y = Math.sin(t * 5) * 0.3 + 0.3;

        particle.material.opacity = 0.5 + Math.sin(t * 8) * 0.3;
      });

      const flicker = Math.sin(elapsed * 6) * 0.3;
      this.fireLight.intensity = 1.5 + flicker;
    }
  }
}
