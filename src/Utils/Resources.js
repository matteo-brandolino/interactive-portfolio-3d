import EventEmitter from './EventEmitter.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Resources extends EventEmitter {
    constructor(sources = []) {
        super()

        this.sources = sources
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.loadingStatus = {}

        this.loaders = {}
        this.setLoaders()

        if (this.sources.length > 0) {
            this.startLoading()
        } else {
            this.trigger('ready')
        }
    }

    setLoaders() {
        this.loaders.gltfLoader = new GLTFLoader()
    }

    startLoading() {
        console.log(`🔄 Starting to load ${this.toLoad} resources...`)

        for (const source of this.sources) {
            this.loadingStatus[source.name] = 'loading'

            if (source.type === 'gltfModel') {
                console.log(`📦 Loading: ${source.name} from ${source.path}`)

                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        if (this.loadingStatus[source.name] === 'loading') {
                            console.log(`✅ Loaded: ${source.name}`)
                            this.loadingStatus[source.name] = 'loaded'
                            this.sourceLoaded(source, file)
                        }
                    },
                    (progress) => {
                        if (progress.total > 0) {
                            const percent = (progress.loaded / progress.total) * 100
                            this.trigger('progress', source.name, percent)
                        }
                    },
                    (error) => {
                        if (this.loadingStatus[source.name] === 'loading') {
                            console.warn(`⚠️ Could not load ${source.name}:`, error.message || error)
                            console.log(`Using fallback for ${source.name}`)
                            this.loadingStatus[source.name] = 'error'
                            this.sourceLoaded(source, null)
                        }
                    }
                )
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++

        console.log(`📊 Progress: ${this.loaded}/${this.toLoad} resources loaded`)

        const progressPercent = (this.loaded / this.toLoad) * 100
        this.trigger('loaded', progressPercent)

        if (this.loaded === this.toLoad) {
            console.log(`✨ All resources loaded! Triggering 'ready' event`)
            this.trigger('ready')
        }
    }

    addSources(newSources) {
        this.sources.push(...newSources)
        this.toLoad = this.sources.length

        for (const source of newSources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }
}
