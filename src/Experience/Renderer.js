import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFShadowMap;
    this.instance.shadowMap.autoUpdate = false;

    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.6;

    // WebGL Context Loss Handling
    this.canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault()
      console.warn('WebGL context lost')

      alert('Il rendering 3D è stato interrotto. La pagina verrà ricaricata.')
      setTimeout(() => location.reload(), 1000)
    })

    this.canvas.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored')
    })
  }

  updateShadows() {
    this.instance.shadowMap.needsUpdate = true;
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
