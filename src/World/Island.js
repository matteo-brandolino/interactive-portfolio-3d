import * as THREE from 'three'
import Experience from '../Experience/Experience.js'

export default class Island {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time

        this.group = new THREE.Group()
        this.islandRadius = 15
        this.obstacles = []

        this.createIsland()
        this.createBeach()
        this.createGrass()
        this.createTrees()
        this.createRocks()
        this.createWater()

        this.scene.add(this.group)
    }

    createIsland() {
        const baseGeometry = new THREE.CylinderGeometry(this.islandRadius, this.islandRadius - 1, 1.5, 32)
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: '#8b7355',
            flatShading: true,
            roughness: 0.9
        })
        const base = new THREE.Mesh(baseGeometry, baseMaterial)
        base.receiveShadow = true
        base.position.y = -0.25
        this.group.add(base)

        const grassGeometry = new THREE.CylinderGeometry(this.islandRadius, this.islandRadius, 0.2, 32)
        const grassMaterial = new THREE.MeshStandardMaterial({
            color: '#7cb342',
            flatShading: true,
            roughness: 0.9
        })
        this.mesh = new THREE.Mesh(grassGeometry, grassMaterial)
        this.mesh.receiveShadow = true
        this.mesh.position.y = 0.6
        this.group.add(this.mesh)
    }

    createBeach() {
        const beachGeometry = new THREE.RingGeometry(this.islandRadius - 0.5, this.islandRadius + 0.3, 64)
        const beachMaterial = new THREE.MeshStandardMaterial({
            color: '#f4e4c1',
            flatShading: true,
            roughness: 0.95
        })
        const beach = new THREE.Mesh(beachGeometry, beachMaterial)
        beach.rotation.x = -Math.PI / 2
        beach.position.y = 0.71
        beach.receiveShadow = true
        this.group.add(beach)
    }

    createGrass() {
        const grassBlade = new THREE.ConeGeometry(0.05, 0.15, 3)
        const grassMaterial = new THREE.MeshStandardMaterial({
            color: '#9ccc65',
            flatShading: true
        })

        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2
            const radius = Math.random() * (this.islandRadius - 2)
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius

            const blade = new THREE.Mesh(grassBlade, grassMaterial)
            blade.position.set(x, 0.9, z)
            blade.rotation.y = Math.random() * Math.PI
            blade.scale.set(
                0.8 + Math.random() * 0.4,
                0.8 + Math.random() * 0.4,
                0.8 + Math.random() * 0.4
            )
            blade.matrixAutoUpdate = false
            blade.updateMatrix()
            this.group.add(blade)
        }
    }

    createTrees() {
        const treePositions = [
            { angle: 0.8, radius: 7 },
            { angle: 2.5, radius: 6 },
            { angle: 3.0, radius: 8 },
            { angle: 4.2, radius: 7 },
            { angle: 5.5, radius: 6.5 },
            { angle: 1.2, radius: 8.5 }
        ].map(pos => ({
            x: Math.cos(pos.angle) * pos.radius,
            z: Math.sin(pos.angle) * pos.radius
        }))

        const treeModel = this.experience.resources.items.tree

        if (treeModel) {
            treePositions.forEach(pos => {
                const tree = treeModel.scene.clone()
                tree.position.set(pos.x, 1.0, pos.z)
                tree.scale.set(1.0, 1.0, 1.0)

                tree.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                    child.matrixAutoUpdate = false
                    child.updateMatrix()
                })

                this.group.add(tree)

                this.obstacles.push({
                    x: pos.x,
                    z: pos.z,
                    radius: 0.6
                })
            })
        } else {
            const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.6, 6)
            const trunkMaterial = new THREE.MeshStandardMaterial({
                color: '#5d4037',
                flatShading: true
            })

            const leavesGeometry = new THREE.ConeGeometry(0.4, 0.8, 6)
            const leavesMaterial = new THREE.MeshStandardMaterial({
                color: '#558b2f',
                flatShading: true
            })

            const instancedTrunks = new THREE.InstancedMesh(trunkGeometry, trunkMaterial, 10)
            const instancedLeaves = new THREE.InstancedMesh(leavesGeometry, leavesMaterial, 10)

            instancedTrunks.castShadow = true
            instancedLeaves.castShadow = true

            const trunkMatrix = new THREE.Matrix4()
            const leavesMatrix = new THREE.Matrix4()

            treePositions.forEach((pos, i) => {
                trunkMatrix.setPosition(pos.x, 0.71 + 0.3, pos.z)
                instancedTrunks.setMatrixAt(i, trunkMatrix)

                leavesMatrix.setPosition(pos.x, 0.71 + 0.9, pos.z)
                instancedLeaves.setMatrixAt(i, leavesMatrix)
            })

            instancedTrunks.instanceMatrix.needsUpdate = true
            instancedLeaves.instanceMatrix.needsUpdate = true

            this.group.add(instancedTrunks)
            this.group.add(instancedLeaves)
        }
    }

    createRocks() {
        const rockModel = this.experience.resources.items.rock

        const rockPositions = [
            { angle: 0.2, radius: 12 },
            { angle: 1.1, radius: 11.5 },
            { angle: 2.2, radius: 12.5 },
            { angle: 3.1, radius: 11.8 },
            { angle: 4.0, radius: 12.2 },
            { angle: 4.9, radius: 11.6 },
            { angle: 5.6, radius: 12.3 },
            { angle: 6.0, radius: 11.9 }
        ]

        rockPositions.forEach(pos => {
            const x = Math.cos(pos.angle) * pos.radius
            const z = Math.sin(pos.angle) * pos.radius

            if (rockModel) {
                const rock = rockModel.scene.clone()
                rock.position.set(x, 0.8, z)
                rock.scale.set(1.8, 1.8, 1.8)
                rock.rotation.y = Math.random() * Math.PI * 2

                rock.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.castShadow = true
                        child.receiveShadow = true
                    }
                    child.matrixAutoUpdate = false
                    child.updateMatrix()
                })

                this.group.add(rock)

                this.obstacles.push({
                    x: x,
                    z: z,
                    radius: 0.9
                })
            } else {
                const rockGeometry = new THREE.DodecahedronGeometry(0.2 + Math.random() * 0.15, 0)
                const rockMaterial = new THREE.MeshStandardMaterial({
                    color: '#78909c',
                    flatShading: true,
                    roughness: 0.95
                })

                const instancedRock = new THREE.Mesh(rockGeometry, rockMaterial)
                instancedRock.position.set(x, 0.8, z)
                instancedRock.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                )
                instancedRock.castShadow = true
                instancedRock.receiveShadow = true
                this.group.add(instancedRock)

                this.obstacles.push({
                    x: x,
                    z: z,
                    radius: 0.4
                })
            }
        })
    }

    createWater() {
        const seaModel = this.experience.resources.items.sea

        if (seaModel) {
            this.waterMesh = seaModel.scene.clone()
            this.waterMesh.position.set(0, -1, 0)
            this.waterMesh.scale.set(1, 1, 1)

            this.waterMesh.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.receiveShadow = true
                    if (child.material) {
                        this.waterMaterial = child.material
                    }
                }
            })

            this.group.add(this.waterMesh)
        } else {
            const waterGeometry = new THREE.PlaneGeometry(100, 100, 1, 1)
            const waterMaterial = new THREE.MeshStandardMaterial({
                color: '#0ea5e9',
                metalness: 0.5,
                roughness: 0.3
            })
            this.waterMesh = new THREE.Mesh(waterGeometry, waterMaterial)
            this.waterMesh.rotation.x = -Math.PI / 2
            this.waterMesh.position.y = -1
            this.waterMesh.receiveShadow = true
            this.group.add(this.waterMesh)
        }
    }

    update() {
    }
}
