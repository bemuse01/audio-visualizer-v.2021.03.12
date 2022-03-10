import * as THREE from '../../../lib/three.module.js'
import Shader from '../shader/visualizer.back.shader.js'

export default class{
    constructor({group}){
        this.param = {
            count: 80,
            radius: 24,
            width: 1.6,
            height: 40,
            seg: 19,
            solid: {
                top: 180,
                bottom: 290
            },
            step: 3,
            limitDist: {
                static: 47.5,
                dynamic: 10,
                rd: 5
            },
            opacity: {
                static: 0.5,
                dynamic: 0.5,
                rd: 0.3
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
        this.createMesh(group)
    }
    createMesh(group){
        this.local = new THREE.Group()

        const degree = 360 / this.param.count
        const solid = this.param.solid
        const step = this.param.step

        for(let i = 0; i < this.param.count; i++){
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

        group.add(this.local)
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
        return new THREE.ShaderMaterial({
            vertexShader: Shader.vertex,
            fragmentShader: Shader.fragment,
            transparent: true,
            uniforms: {
                color: {
                    value: new THREE.Color(color)
                },
                origin: {
                    value: new THREE.Vector3(0, this.param.height, 0)
                },
                limitDist: {
                    // value: 670
                    value: this.param.limitDist.static
                },
                minOpacity: {
                    value: this.param.opacity.static
                }
            }
        })
    }


    // animate
    animate(buf, min, max){
        this.local.children.forEach((mesh, i) => {
            const material = mesh.material

            // let o = METHOD.normalize(buf[i], 0, 0.6, min, max)
            // o = isNaN(o) ? 0 : o

            // let d = METHOD.normalize(buf[i], 0, 100, min, max)
            // d = isNaN(d) ? 0 : d

            // material.uniforms['minOpacity'].value = 0.4 + o
            // material.uniforms['limitDist'].value = 475 + d

            material.uniforms['minOpacity'].value = this.param.opacity.static + Math.min(buf[i] * this.param.opacity.rd, this.param.opacity.dynamic)
            material.uniforms['limitDist'].value = this.param.limitDist.static + Math.min(buf[i] * this.param.limitDist.rd, this.param.limitDist.dynamic)
        })
    }
}