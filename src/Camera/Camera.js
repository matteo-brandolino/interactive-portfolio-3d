import * as THREE from "three";
import Experience from "../Experience/Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.targetHeight = 10;
    this.targetDistance = 14;
    this.lerpFactor = 0.05;

    this.targetPosition = new THREE.Vector3();
    this.lookAtTarget = new THREE.Vector3();

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 12, 10);
    this.instance.lookAt(0, 0, 0);
    this.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    const world = this.experience.world;
    if (!world || !world.character) return;

    const character = world.character;
    const characterPos = character.getPosition();

    this.targetPosition.set(
      characterPos.x,
      this.targetHeight,
      characterPos.z + this.targetDistance
    );

    this.instance.position.x +=
      (this.targetPosition.x - this.instance.position.x) * this.lerpFactor;
    this.instance.position.y +=
      (this.targetPosition.y - this.instance.position.y) * this.lerpFactor;
    this.instance.position.z +=
      (this.targetPosition.z - this.instance.position.z) * this.lerpFactor;

    this.lookAtTarget.set(characterPos.x, characterPos.y + 0.5, characterPos.z);
    this.instance.lookAt(this.lookAtTarget);
  }
}
