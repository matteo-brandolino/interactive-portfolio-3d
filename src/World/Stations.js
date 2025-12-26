import Station from './Station.js'
import { cvData } from '../data/cv-data.js'

export default class Stations {
    constructor() {
        this.stations = []
        this.activeStation = null

        this.createStations()
    }

    createStations() {
        const islandRadius = 10

        const stationsData = [
            {
                type: 'work',
                title: cvData.work.title,
                icon: cvData.work.icon,
                angle: 0,
                position: {
                    x: Math.sin(0) * islandRadius,
                    z: Math.cos(0) * islandRadius
                }
            },
            {
                type: 'skills',
                title: cvData.skills.title,
                icon: cvData.skills.icon,
                angle: Math.PI / 2,
                position: {
                    x: Math.sin(Math.PI / 2) * islandRadius,
                    z: Math.cos(Math.PI / 2) * islandRadius
                }
            },
            {
                type: 'projects',
                title: cvData.projects.title,
                icon: cvData.projects.icon,
                angle: Math.PI,
                position: {
                    x: Math.sin(Math.PI) * islandRadius,
                    z: Math.cos(Math.PI) * islandRadius
                }
            },
            {
                type: 'about',
                title: cvData.about.title,
                icon: cvData.about.icon,
                angle: (3 * Math.PI) / 2,
                position: {
                    x: Math.sin((3 * Math.PI) / 2) * islandRadius,
                    z: Math.cos((3 * Math.PI) / 2) * islandRadius
                }
            }
        ]

        stationsData.forEach(data => {
            const station = new Station(data)
            this.stations.push(station)
        })

        console.log(`✅ Created ${this.stations.length} stations`)
    }

    getNearestStation(characterPosition) {
        let nearest = null
        let minDistance = Infinity

        this.stations.forEach(station => {
            const stationPos = station.getPosition()
            const distance = Math.sqrt(
                Math.pow(characterPosition.x - stationPos.x, 2) +
                Math.pow(characterPosition.z - stationPos.z, 2)
            )

            if (distance < minDistance) {
                minDistance = distance
                nearest = station
            }
        })

        return nearest
    }

    checkProximity(characterPosition) {
        let foundNearStation = null

        this.stations.forEach(station => {
            const isNear = station.isNear(characterPosition)

            if (isNear) {
                foundNearStation = station
            }
        })

        if (foundNearStation !== this.activeStation) {
            if (this.activeStation) {
                this.activeStation.setActive(false)
            }

            this.activeStation = foundNearStation
            if (this.activeStation) {
                this.activeStation.setActive(true)
            }
        }

        return this.activeStation
    }

    getActiveStation() {
        return this.activeStation
    }

    deactivateAll() {
        this.stations.forEach(station => {
            station.setActive(false)
        })
        this.activeStation = null
    }

    update() {
        this.stations.forEach(station => {
            station.update()
        })
    }
}
