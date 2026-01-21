import * as THREE from "three";
import Experience from "../Experience/Experience.js";
import { Water } from "three/addons/objects/Water.js";

export default class Island {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    this.group = new THREE.Group();
    this.islandRadius = 15;
    this.obstacles = [];

    this.createIsland();
    this.createBeach();
    this.createTrees();
    this.createRocks();
    this.createBoat();
    this.createWater();

    this.scene.add(this.group);
  }

  createIsland() {
    const baseGeometry = new THREE.CylinderGeometry(
      this.islandRadius,
      this.islandRadius - 1,
      1.5,
      16
    );
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: "#a67c52",
      flatShading: true,
      roughness: 0.9,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.receiveShadow = true;
    base.position.y = -0.25;
    this.group.add(base);

    const terrainGeometry = new THREE.CylinderGeometry(
      this.islandRadius,
      this.islandRadius,
      0.2,
      16,
      4
    );

    this.addHeightVariation(terrainGeometry);

    const terrainMaterial = new THREE.MeshStandardMaterial({
      color: "#d4a574",
      flatShading: true,
      roughness: 0.9,
      metalness: 0.0,
    });

    this.mesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = false;
    this.mesh.position.y = 0.6;
    this.group.add(this.mesh);

    this.addTerrainDetails();
  }

  addHeightVariation(geometry) {
    const positionAttribute = geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);

      const distanceFromCenter = Math.sqrt(x * x + z * z);
      const normalizedDistance = distanceFromCenter / this.islandRadius;

      if (normalizedDistance < 0.85) {
        const noise =
          Math.sin(x * 0.6) * Math.cos(z * 0.6) * 0.06 +
          Math.sin(x * 1.8) * Math.cos(z * 1.6) * 0.03;

        const fadeOut = 1 - Math.pow(normalizedDistance / 0.85, 2);
        const heightOffset = noise * fadeOut;

        positionAttribute.setY(i, y + heightOffset);
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  addTerrainDetails() {
    const detailCount = 15;
    const rockGeometry = new THREE.DodecahedronGeometry(0.12, 0);

    const sharedRockMaterial = new THREE.MeshStandardMaterial({
      color: "#a08878",
      roughness: 0.95,
      flatShading: true,
    });

    const instancedRocks = new THREE.InstancedMesh(
      rockGeometry,
      sharedRockMaterial,
      detailCount
    );

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    for (let i = 0; i < detailCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * (this.islandRadius - 4);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      position.set(x, 0.72, z);
      rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      quaternion.setFromEuler(rotation);
      const scaleValue = 0.7 + Math.random() * 0.6;
      scale.set(scaleValue, scaleValue, scaleValue);

      matrix.compose(position, quaternion, scale);
      instancedRocks.setMatrixAt(i, matrix);
    }

    instancedRocks.castShadow = true;
    instancedRocks.receiveShadow = true;
    this.group.add(instancedRocks);
  }

  createBeach() {
    const beachGeometry = new THREE.RingGeometry(
      this.islandRadius - 0.8,
      this.islandRadius + 0.5,
      16
    );

    const beachMaterial = new THREE.MeshStandardMaterial({
      color: "#e8d4b8",
      flatShading: true,
      roughness: 0.95,
      metalness: 0.0,
    });

    const beach = new THREE.Mesh(beachGeometry, beachMaterial);
    beach.rotation.x = -Math.PI / 2;
    beach.position.y = 0.71;
    beach.receiveShadow = true;
    beach.castShadow = false;
    this.group.add(beach);
  }

  createTrees() {
    const treePositions = [
      { angle: 0.8, radius: 7 },
      { angle: 2.5, radius: 6 },
      { angle: 3.0, radius: 8 },
      { angle: 4.2, radius: 7 },
      { angle: 5.5, radius: 6.5 },
      { angle: 1.2, radius: 8.5 },
    ].map((pos) => ({
      x: Math.cos(pos.angle) * pos.radius,
      z: Math.sin(pos.angle) * pos.radius,
    }));

    const treeModel = this.experience.resources.items.tree;

    if (treeModel) {
      treePositions.forEach((pos) => {
        const tree = treeModel.scene.clone();
        tree.position.set(pos.x, 1.0, pos.z);
        tree.scale.set(1.0, 1.0, 1.0);

        tree.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          child.matrixAutoUpdate = false;
          child.updateMatrix();
        });

        this.group.add(tree);

        this.obstacles.push({
          x: pos.x,
          z: pos.z,
          radius: 0.6,
        });
      });
    } else {
      const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.6, 6);
      const trunkMaterial = new THREE.MeshStandardMaterial({
        color: "#5d4037",
        flatShading: true,
      });

      const leavesGeometry = new THREE.ConeGeometry(0.4, 0.8, 6);
      const leavesMaterial = new THREE.MeshStandardMaterial({
        color: "#558b2f",
        flatShading: true,
      });

      const instancedTrunks = new THREE.InstancedMesh(
        trunkGeometry,
        trunkMaterial,
        10
      );
      const instancedLeaves = new THREE.InstancedMesh(
        leavesGeometry,
        leavesMaterial,
        10
      );

      instancedTrunks.castShadow = true;
      instancedLeaves.castShadow = true;

      const trunkMatrix = new THREE.Matrix4();
      const leavesMatrix = new THREE.Matrix4();

      treePositions.forEach((pos, i) => {
        trunkMatrix.setPosition(pos.x, 0.71 + 0.3, pos.z);
        instancedTrunks.setMatrixAt(i, trunkMatrix);

        leavesMatrix.setPosition(pos.x, 0.71 + 0.9, pos.z);
        instancedLeaves.setMatrixAt(i, leavesMatrix);
      });

      instancedTrunks.instanceMatrix.needsUpdate = true;
      instancedLeaves.instanceMatrix.needsUpdate = true;

      this.group.add(instancedTrunks);
      this.group.add(instancedLeaves);
    }
  }

  createRocks() {
    const rockModel = this.experience.resources.items.rock;

    const rockPositions = [
      { angle: 0.2, radius: 12 },
      { angle: 1.1, radius: 11.5 },
      { angle: 2.2, radius: 12.5 },
      { angle: 3.1, radius: 11.8 },
      { angle: 4.0, radius: 12.2 },
      { angle: 4.9, radius: 11.6 },
      { angle: 5.6, radius: 12.3 },
      { angle: 6.0, radius: 11.9 },
    ];

    rockPositions.forEach((pos) => {
      const x = Math.cos(pos.angle) * pos.radius;
      const z = Math.sin(pos.angle) * pos.radius;

      if (rockModel) {
        const rock = rockModel.scene.clone();
        rock.position.set(x, 0.8, z);
        rock.scale.set(1.8, 1.8, 1.8);
        rock.rotation.y = Math.random() * Math.PI * 2;

        rock.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          child.matrixAutoUpdate = false;
          child.updateMatrix();
        });

        this.group.add(rock);

        this.obstacles.push({
          x: x,
          z: z,
          radius: 0.9,
        });
      } else {
        const rockGeometry = new THREE.DodecahedronGeometry(
          0.2 + Math.random() * 0.15,
          0
        );
        const rockMaterial = new THREE.MeshStandardMaterial({
          color: "#78909c",
          flatShading: true,
          roughness: 0.95,
        });

        const instancedRock = new THREE.Mesh(rockGeometry, rockMaterial);
        instancedRock.position.set(x, 0.8, z);
        instancedRock.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        instancedRock.castShadow = true;
        instancedRock.receiveShadow = true;
        this.group.add(instancedRock);

        this.obstacles.push({
          x: x,
          z: z,
          radius: 0.4,
        });
      }
    });
  }

  createBoat() {
    const boatModel = this.experience.resources.items.boat;

    if (boatModel) {
      const boat = boatModel.scene.clone();
      boat.position.set(0, 0.7, 13.5);
      boat.scale.set(0.05, 0.05, 0.05);
      boat.rotation.y = Math.PI + 0.3;

      boat.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        child.matrixAutoUpdate = false;
        child.updateMatrix();
      });

      this.group.add(boat);

      this.obstacles.push({
        x: 0,
        z: 13.5,
        radius: 1.2,
      });
    }
  }

  createWater() {
    const waterGeometry = new THREE.PlaneGeometry(100, 100);

    this.water = new Water(waterGeometry, {
      textureWidth: 256,
      textureHeight: 256,
      waterNormals: new THREE.TextureLoader().load(
        "/textures/waternormals.jpg",
        (texture) => {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(4, 4);
        }
      ),
      sunDirection: this.experience.sun || new THREE.Vector3(0, 1, 0),
      sunColor: 0xffffff,
      waterColor: 0x2a6f97,
      distortionScale: 1.2,
      fog: this.scene.fog !== undefined,
    });

    this.water.rotation.x = -Math.PI / 2;
    this.water.position.y = -0.5;

    this.group.add(this.water);
    this.waterMesh = this.water;
  }

  update() {
    if (this.water && this.water.material && this.water.material.uniforms) {
      this.water.material.uniforms["time"].value += this.time.delta * 0.00008;
    }
  }
}
