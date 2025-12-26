import Experience from '../Experience/Experience.js'
import Island from './Island.js'
import Character from './Character.js'
import Stations from './Stations.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.island = new Island()
        this.character = new Character()
        this.stations = new Stations()

        console.log('🌍 World created with island, character, and stations')
    }

    update() {
        if (this.island) {
            this.island.update()
        }

        if (this.character) {
            this.character.update()
        }

        if (this.stations) {
            this.stations.update()
        }
    }
}
