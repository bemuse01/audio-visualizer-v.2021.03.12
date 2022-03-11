import * as THREE from '../../../lib/three.module.js'

import Method from '../method/visualizer.progress.method.js'
import Shader from '../shader/visualizer.progress.shader.js'

export default class{
    constructor({group}){
        this.param = {
            radius: 25.1,
            size: {
                thin: 0.5,
                thick: 2.8
            },
            seg: 239,
            count: 80,
            solid: {
                top: 180,
                bottom: 290
                // top: 200,
                // bottom: 270
            },
            opacity: {
                thin: 1.0,
                thick: 0.125
            },
            step: 3,
            layers: {
                thin: NORMAL,
                thick: PROCESS
            }
        }

        this.init(group)
    }


    // init
    init(group){
        this.create(group)
    }


    // create
    create(group){
        this.local = new THREE.Group()

        for(let key in this.param.size){
            const mesh = this.createMesh(key)
            
            this.local.add(mesh)
        }

        group.add(this.local)
    }
    createMesh(key){
        const geometry = this.createGeometry(key)
        const material = this.createMaterial(key)
        const mesh = new THREE.Mesh(geometry, material)
        mesh.rotation.z = 90 * RADIAN
        // mesh.layers.set(this.param.layers[key])
        return mesh
    }
    createGeometry(key){
        const geometry = new THREE.RingGeometry(this.param.radius - this.param.size[key], this.param.radius, this.param.seg)
        const color = Method.createColorAttr(this.param, geometry.attributes.position.count)

        geometry.setAttribute('aColor', new THREE.BufferAttribute(color, 3))

        return geometry
    }
    createMaterial(key){
        return new THREE.ShaderMaterial({
            vertexShader: Shader.vertex,
            fragmentShader: Shader.fragment,
            transparent: true,
            uniforms: {
                opacity: {value: this.param.opacity[key]}
            }
        })
    }
}