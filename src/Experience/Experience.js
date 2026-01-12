import * as THREE from "three";
import { Sky } from "three/addons/objects/Sky.js";
import Sizes from "../Utils/Sizes.js";
import Time from "../Utils/Time.js";
import Resources from "../Utils/Resources.js";
import Camera from "../Camera/Camera.js";
import Renderer from "./Renderer.js";
import World from "../World/World.js";
import UIManager from "../UI/UIManager.js";
import LanguageSwitcher from "../UI/LanguageSwitcher.js";
import Stats from "../Utils/Stats.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;

    this.canvas = canvas;

    this.sizes = new Sizes();
    this.time = new Time();
    if (localStorage.getItem("debug") === "true") {
      this.stats = new Stats();
    }
    this.scene = new THREE.Scene();

    this.resources = new Resources([
      {
        name: "character",
        type: "gltfModel",
        path: "/models/character.glb",
      },
      {
        name: "tree",
        type: "gltfModel",
        path: "/models/tree.glb",
      },
      {
        name: "rock",
        type: "gltfModel",
        path: "/models/rock.glb",
      },
      {
        name: "wooden_sign",
        type: "gltfModel",
        path: "/models/wooden_sign.glb",
      },
      {
        name: "tent",
        type: "gltfModel",
        path: "/models/tent.glb",
      },
      {
        name: "bonfire",
        type: "gltfModel",
        path: "/models/bonfire.glb",
      },
    ]);

    this.camera = new Camera();
    this.renderer = new Renderer();
    this.setLights();
    this.setSky();

    this.resources.on("loaded", (progress) => {
      const progressBar = document.getElementById("progress-bar-fill");
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
    });

    this.resources.on("ready", () => {
      this.world = new World();
      this.ui = new UIManager();
      this.languageSwitcher = new LanguageSwitcher();
      this.hideLoadingScreen();
    });

    setTimeout(() => {
      if (!this.world) {
        this.world = new World();
        this.ui = new UIManager();
        this.languageSwitcher = new LanguageSwitcher();
        this.hideLoadingScreen();
      }
    }, 10000);

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  setLights() {
    this.ambientLight = new THREE.AmbientLight("#fff5e6", 0.6);
    this.scene.add(this.ambientLight);

    this.hemisphereLight = new THREE.HemisphereLight("#ffd89b", "#b89968", 0.7);
    this.scene.add(this.hemisphereLight);

    this.directionalLight = new THREE.DirectionalLight("#fffaf0", 0.9);
    this.directionalLight.position.set(5, 8, 5);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.set(256, 256);
    this.directionalLight.shadow.camera.far = 15;
    this.directionalLight.shadow.camera.left = -8;
    this.directionalLight.shadow.camera.right = 8;
    this.directionalLight.shadow.camera.top = 8;
    this.directionalLight.shadow.camera.bottom = -8;
    this.scene.add(this.directionalLight);
  }

  setSky() {
    this.sky = new Sky();
    this.sky.scale.setScalar(10000);
    this.scene.add(this.sky);

    const skyUniforms = this.sky.material.uniforms;

    skyUniforms["turbidity"].value = 10;
    skyUniforms["rayleigh"].value = 2;
    skyUniforms["mieCoefficient"].value = 0.005;
    skyUniforms["mieDirectionalG"].value = 0.8;

    const sun = new THREE.Vector3();
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer.instance);

    const phi = THREE.MathUtils.degToRad(90 - 2);
    const theta = THREE.MathUtils.degToRad(180);

    sun.setFromSphericalCoords(1, phi, theta);

    skyUniforms["sunPosition"].value.copy(sun);

    this.scene.environment = pmremGenerator.fromScene(this.sky).texture;

    this.sun = sun;
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
      }, 500);
    }
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    if (localStorage.getItem("debug") === "true") {
      this.stats.update();
    }
    this.camera.update();

    if (this.world) {
      this.world.update();
    }

    this.renderer.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    if (this.languageSwitcher) {
      this.languageSwitcher.destroy();
    }

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        for (const key in child.material) {
          const value = child.material[key];

          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.renderer.instance.dispose();
  }
}
