import Experience from "../Experience/Experience.js";
import Island from "./Island.js";
import Character from "./Character.js";
import Stations from "./Stations.js";
import Camp from "./Camp.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.island = new Island();
    this.camp = new Camp();

    if (this.camp.obstacles && this.island.obstacles) {
      this.island.obstacles.push(...this.camp.obstacles);
    }

    this.character = new Character();
    this.stations = new Stations();
  }

  update() {
    if (this.island) {
      this.island.update();
    }

    if (this.camp) {
      this.camp.update();
    }

    if (this.character) {
      this.character.update();
    }

    if (this.stations) {
      this.stations.update();
    }
  }
}
