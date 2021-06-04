VISUALIZER.object.border.build = class{
    constructor(group){
        this.init()
        this.create()
        this.add(group)
    }


    // init
    init(){
        this.param = new VISUALIZER.object.border.param()
    }


    // add
    add(group){
        group.add(this.local)
    }


    // create
    create(){
        this.local = new THREE.Group()

        for(let key in this.param.size){
            const mesh = this.createMesh(key)
            
            this.local.add(mesh)
        }
    }
    createMesh(key){
        const geometry = this.createGeometry(key)
        const material = this.createMaterial(key)
        const mesh = new THREE.Mesh(geometry, material)
        mesh.rotation.z = 90 * RADIAN
        mesh.layers.set(this.param.layers[key])
        return mesh
    }
    createGeometry(key){
        const geometry = new THREE.RingGeometry(this.param.radius - this.param.size[key], this.param.radius, this.param.seg)
        const color = VISUALIZER.object.progress.method.createColorAttr(this.param, geometry.attributes.position.count)

        geometry.setAttribute('aColor', new THREE.BufferAttribute(color, 3))

        return geometry
    }
    createMaterial(key){
        return new THREE.ShaderMaterial({
            vertexShader: VISUALIZER.object.progress.shader.vertex,
            fragmentShader: VISUALIZER.object.progress.shader.fragment,
            transparent: true,
            uniforms: {
                opacity: {value: this.param.opacity[key]}
            }
        })
    }
}