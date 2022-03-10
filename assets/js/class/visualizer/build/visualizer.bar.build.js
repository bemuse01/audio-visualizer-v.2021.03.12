import * as THREE from '../../../lib/three.module.js'
import Spline from '../../../lib/cubic-spline.js'

export default class{
    constructor({group, rtScene}){
        this.rtScene = rtScene

        this.param = {
            count: 80,
            radius: 29.5,
            width: 1.6,
            height: 1.2,
            seg: 19,
            solid: {
                top: 180,
                bottom: 290
            },
            audioStep: 25,
            step: 3,
            smooth: 0.2,
            boost: 10
        }

        this.xs = Array.from({length: this.param.count}, (_, i) => i * 0.8)

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        this.createMesh(group)
    }
    createMesh(group){
        this.local = new THREE.Group()

        const degree = 360 / this.param.count
        const solid = this.param.solid
        const step = this.param.step

        for(let i = 0; i < this.param.count; i++){
            // solid = i < this.param.count / 2 ? solid + this.param.step : solid - this.param.step
            const index = i % (this.param.count / 2)
            const s = i < this.param.count / 2 ? solid.top + step * index : solid.bottom - step * index
            const color = `hsl(${s}, 100%, 70%)`
            
            const geometry = this.createGeometry()
            const material = this.createMaterial(color)
            const mesh = new THREE.Mesh(geometry, material)

            const deg = degree * i
            const x = Math.cos(deg * RADIAN) * this.param.radius
            const y = Math.sin(deg * RADIAN) * this.param.radius

            mesh.position.set(x, y, 0)
            mesh.rotation.z = (90 + deg) * RADIAN
            mesh.layers.set(NORMAL)

            this.local.add(mesh)
        }

        this.local.rotation.z = 120 * RADIAN

        // group.add(this.local.clone())
        this.rtScene.add(this.local)
    }
    createGeometry(){
        const geometry = new THREE.PlaneGeometry(this.param.width, this.param.height, this.param.seg)
        const count = geometry.attributes.position.count
        const array = geometry.attributes.position.array

        geometry.origin = []

        const deg = 180 / (count / 2 - 1)
        const radius = this.param.width / 2

        for(let i = 0; i < count; i++){
            const index = i % (count / 2)
            const degree = i < count / 2 ? 180 - deg * index : 180 + deg * index
            const x = Math.cos(degree * RADIAN) * radius
            const y = Math.sin(degree * RADIAN) * radius

            array[i * 3] = x
            array[i * 3 + 1] = i < count / 2 ? y + this.param.height / 2 : y - this.param.height / 2
            geometry.origin[i] = i < count / 2 ? y + this.param.height / 2 : y - this.param.height / 2
        }

        return geometry
    }
    createMaterial(color){
        return new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1.0,
            // blending: THREE.AdditiveBlending
            // wireframe: true
        })
    }


    // animate
    animate({audioData}){
        if(!audioData) return

        const sample = Array.from({length: this.param.count}, (_, i) => audioData[i * this.param.audioStep]).map(e => e / 255)
        const buffer = this.createAudioBuffer({sample})

        this.local.children.forEach((mesh, i) => {
            const origin = mesh.geometry.origin
            const position = mesh.geometry.attributes.position
            const array = position.array

            for(let j = position.count / 2; j < position.count; j++){
                array[j * 3 + 1] = origin[j] - buffer[i]
            }

            position.needsUpdate = true
        })
    }
    createAudioBuffer({sample}){
        const len = sample.length 
        let temp = []

        const xs = this.xs
        const ys = sample
        // ys[~~(len * start * smooth)] = 0
        // ys[~~(len * start * smooth) + 1] = 0
        // // ys[~~(len * start * smooth) + 2] = 0
        // // ys[~~((len * start + len - 1) * smooth) - 1] = 0
        // ys[~~((len * start + len - 1) * smooth)] = 0
        // ys[~~((len * start + len - 1) * smooth) + 1] = 0
        const spline = new Spline(xs, ys)
        
        for(let i = 0; i < len; i++){
            temp.push(spline.at(i * this.param.smooth) * this.param.boost)
        }

        return temp
    }
}