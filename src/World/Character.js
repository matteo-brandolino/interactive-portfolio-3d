import * as THREE from "three";
import Experience from "../Experience/Experience.js";
import Controls from "../Utils/Controls.js";
import VirtualJoystick from "../UI/VirtualJoystick.js";

export default class Character {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.moveSpeed = 5;
    this.rotationSpeed = 3;
    this.rotation = 0;
    this.islandRadius = 13;

    this.currentStation = null;
    this.nearStation = null;

    this.controls = new Controls();
    this.joystick = new VirtualJoystick();

    this.mixer = null;
    this.animations = {};
    this.currentAction = null;
    this.walkCycle = 0;

    this.setModel();
  }

  setModel() {
    const characterModel = this.resources.items.character;

    if (characterModel) {
      this.model = characterModel.scene;
      this.model.scale.set(1, 1, 1);

      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
        }
      });

      if (characterModel.animations && characterModel.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(this.model);

        characterModel.animations.forEach((clip) => {
          const action = this.mixer.clipAction(clip);
          this.animations[clip.name] = action;
        });

        const walkAnim = this.findAnimation([
          "walk",
          "walking",
          "run",
          "running",
        ]);
        if (walkAnim) {
          this.currentAction = walkAnim;
        }
      }
    } else {
      this.createPlaceholder();
    }

    this.model.position.y = 0.7;
    this.updatePosition();
    this.scene.add(this.model);
  }

  findAnimation(keywords) {
    for (const name in this.animations) {
      const lowerName = name.toLowerCase();
      for (const keyword of keywords) {
        if (lowerName.includes(keyword)) {
          return this.animations[name];
        }
      }
    }
    return null;
  }

  createPlaceholder() {
    this.model = new THREE.Group();

    const legGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.6, 6);
    const legMaterial = new THREE.MeshStandardMaterial({
      color: "#2563eb",
      flatShading: true,
    });

    this.leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    this.leftLeg.position.set(-0.15, 0.3, 0);
    this.leftLeg.castShadow = true;
    this.model.add(this.leftLeg);

    this.rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    this.rightLeg.position.set(0.15, 0.3, 0);
    this.rightLeg.castShadow = true;
    this.model.add(this.rightLeg);

    const bodyGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.35);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: "#3b82f6",
      flatShading: true,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1;
    body.castShadow = true;
    this.model.add(body);

    const armGeometry = new THREE.CylinderGeometry(0.07, 0.09, 0.6, 6);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: "#60a5fa",
      flatShading: true,
    });

    this.leftArm = new THREE.Mesh(armGeometry, armMaterial);
    this.leftArm.position.set(-0.35, 0.9, 0);
    this.leftArm.rotation.z = 0.3;
    this.leftArm.castShadow = true;
    this.model.add(this.leftArm);

    this.rightArm = new THREE.Mesh(armGeometry, armMaterial);
    this.rightArm.position.set(0.35, 0.9, 0);
    this.rightArm.rotation.z = -0.3;
    this.rightArm.castShadow = true;
    this.model.add(this.rightArm);

    const headGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: "#fbbf24",
      flatShading: true,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.55;
    head.castShadow = true;
    this.model.add(head);

    const eyeGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.05);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: "#1f2937",
      flatShading: true,
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 1.6, 0.2);
    this.model.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, 1.6, 0.2);
    this.model.add(rightEye);

    const hatGeometry = new THREE.ConeGeometry(0.25, 0.3, 6);
    const hatMaterial = new THREE.MeshStandardMaterial({
      color: "#dc2626",
      flatShading: true,
    });
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.y = 1.85;
    hat.castShadow = true;
    this.model.add(hat);
  }

  updatePosition() {
    this.model.rotation.y = this.rotation;
  }

  update() {
    const deltaTime = this.time.delta * 0.001;

    let moveX = 0;
    let moveZ = 0;

    if (this.controls.keys.forward) moveZ -= 1;
    if (this.controls.keys.backward) moveZ += 1;
    if (this.controls.keys.left) moveX -= 1;
    if (this.controls.keys.right) moveX += 1;

    const joystickValues = this.joystick.getValues();
    if (joystickValues.active) {
      moveX += joystickValues.x;
      moveZ += joystickValues.y;
    }

    const isMoving = moveX !== 0 || moveZ !== 0;

    if (moveX !== 0 && moveZ !== 0) {
      const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
      moveX /= length;
      moveZ /= length;
    }

    const newPosition = this.model.position.clone();
    newPosition.x += moveX * this.moveSpeed * deltaTime;
    newPosition.z += moveZ * this.moveSpeed * deltaTime;

    const distanceFromCenter = Math.sqrt(
      newPosition.x * newPosition.x + newPosition.z * newPosition.z
    );

    if (
      distanceFromCenter <= this.islandRadius &&
      !this.checkObstacleCollision(newPosition)
    ) {
      this.model.position.copy(newPosition);
    } else if (distanceFromCenter > this.islandRadius) {
      const angle = Math.atan2(newPosition.x, newPosition.z);
      this.model.position.x = Math.sin(angle) * this.islandRadius;
      this.model.position.z = Math.cos(angle) * this.islandRadius;
    }

    if (isMoving) {
      const targetRotation = Math.atan2(moveX, moveZ);
      this.rotation = this.lerpAngle(this.rotation, targetRotation, 0.2);
    }

    this.updatePosition();
    this.updateAnimation(deltaTime, isMoving);
    this.checkStationProximity();
  }

  lerpAngle(a, b, t) {
    let diff = b - a;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return a + diff * t;
  }

  updateAnimation(deltaTime, isMoving) {
    if (this.mixer) {
      this.mixer.update(deltaTime);

      if (this.currentAction) {
        if (isMoving && !this.currentAction.isRunning()) {
          this.currentAction.play();
        } else if (!isMoving && this.currentAction.isRunning()) {
          this.currentAction.stop();
        }
      }
    } else if (this.leftLeg && this.rightLeg) {
      if (isMoving) {
        this.walkCycle += deltaTime * 8;

        const legSwing = Math.sin(this.walkCycle) * 0.4;
        this.leftLeg.rotation.x = legSwing;
        this.rightLeg.rotation.x = -legSwing;

        if (this.leftArm && this.rightArm) {
          this.leftArm.rotation.x = -legSwing * 0.5;
          this.rightArm.rotation.x = legSwing * 0.5;
        }

        this.model.position.y = Math.abs(Math.sin(this.walkCycle * 2)) * 0.05;
      } else {
        if (this.leftLeg) this.leftLeg.rotation.x = 0;
        if (this.rightLeg) this.rightLeg.rotation.x = 0;
        if (this.leftArm) this.leftArm.rotation.x = 0;
        if (this.rightArm) this.rightArm.rotation.x = 0;
        this.model.position.y = 0;
      }
    }
  }

  checkStationProximity() {
    const world = this.experience.world;
    if (!world || !world.stations) return;

    const nearStation = world.stations.checkProximity(this.model.position);

    const controlsHint = document.getElementById('controls-hint');
    if (controlsHint) {
      if (nearStation && nearStation.data.type === 'info') {
        controlsHint.classList.add('visible');
      } else {
        controlsHint.classList.remove('visible');
      }
    }

    if (nearStation && this.controls.keys.interact) {
      this.interactWithStation(nearStation);
      this.controls.keys.interact = false;
    }
  }

  interactWithStation(station) {
    if (this.experience.ui) {
      this.experience.ui.showPanel(station.data.type);
    }
  }

  getPosition() {
    return this.model.position;
  }

  getRotation() {
    return this.rotation;
  }

  checkObstacleCollision(position) {
    const world = this.experience.world;
    if (!world || !world.island || !world.island.obstacles) return false;

    const characterRadius = 0.3;

    for (const obstacle of world.island.obstacles) {
      const dx = position.x - obstacle.x;
      const dz = position.z - obstacle.z;
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance < obstacle.radius + characterRadius) {
        return true;
      }
    }

    return false;
  }
}
