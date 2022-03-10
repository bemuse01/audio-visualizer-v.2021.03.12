import * as THREE from '../../../lib/three.module.js'
import Method from '../method/visualizer.progress.method.js'
import Shader from '../shader/visualizer.progress.shader.js'

export default class{
    constructor({group}){
        this.param = {
            radius: 258 + 6,
            size: 20,
            seg: 1999,
            count: 80,
            solid: {
                // top: 180,
                // bottom: 290
                top: 200,
                bottom: 270
            },
            opacity: 0.9,
            step: 3
        }

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
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.rotation.z = 90 * RADIAN
        this.mesh.scale.set(1, -1, 1)
        this.mesh.layers.set(PROCESS)

        group.add(this.mesh)
    }
    createGeometry(){
        const geometry = new THREE.RingGeometry(this.param.radius, this.param.radius + this.param.size, this.param.seg)
        const color = Method.createColorAttr(this.param, geometry.attributes.position.count)

        geometry.setAttribute('aColor', new THREE.BufferAttribute(color, 3))
        geometry.setDrawRange(0, 0)

        return geometry
    }
    createMaterial(){
        return new THREE.ShaderMaterial({
            vertexShader: Shader.vertex,
            fragmentShader: Shader.fragment,
            transparent: true,
            uniforms: {
                opacity: {value: this.param.opacity}
            }
        })
    }


    // animate
    animate(audio){
        const geometry = this.mesh.geometry
        const position = geometry.attributes.position
        
        const draw = Math.floor(audio.currentTime / audio.duration * (position.count / 2))
        geometry.setDrawRange(0, draw * 3 * 2)

        position.needsUpdate = true
    }
}