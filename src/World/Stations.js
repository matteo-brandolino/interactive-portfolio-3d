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
                type: 'info',
                title: cvData.info.title,
                icon: cvData.info.icon,
                position: {
                    x: 0,
                    z: -0.25
                }
            },
            {
                type: 'work',
                title: cvData.work.title,
                icon: cvData.work.icon,
                angle: 0.4,
                position: {
                    x: Math.sin(0.4) * islandRadius,
                    z: Math.cos(0.4) * islandRadius
                }
            },
            {
                type: 'skills',
                title: cvData.skills.title,
                icon: cvData.skills.icon,
                angle: 1.9,
                position: {
                    x: Math.sin(1.9) * islandRadius,
                    z: Math.cos(1.9) * islandRadius
                }
            },
            {
                type: 'projects',
                title: cvData.projects.title,
                icon: cvData.projects.icon,
                angle: 3.6,
                position: {
                    x: Math.sin(3.6) * islandRadius,
                    z: Math.cos(3.6) * islandRadius
                }
            },
            {
                type: 'about',
                title: cvData.about.title,
                icon: cvData.about.icon,
                angle: 5.2,
                position: {
                    x: Math.sin(5.2) * islandRadius,
                    z: Math.cos(5.2) * islandRadius
                }
            }
        ]

        stationsData.forEach(data => {
            const station = new Station(data)
            this.stations.push(station)
        })
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
