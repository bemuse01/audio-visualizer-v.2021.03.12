VISUALIZER.object.progress.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
    }


    // init
    #init(){
        this.param = new VISUALIZER.object.progress.param()
    }


    // add
    #add(group){
        group.add(this.mesh)
    }


    // create
    #create(){
        this.#createMesh()
    }
    #createMesh(){
        const geometry = this.#createGeometry()
        const material = this.#createMaterial()
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.rotation.z = 90 * RADIAN
        this.mesh.scale.set(1, -1, 1)
        this.mesh.layers.set(PROCESS)
    }
    #createGeometry(){
        const geometry = new THREE.RingGeometry(this.param.radius, this.param.radius + this.param.size, this.param.seg)
        const color = VISUALIZER.object.progress.method.createColorAttr(this.param, geometry.attributes.position.count)

        geometry.setAttribute('aColor', new THREE.BufferAttribute(color, 3))
        geometry.setDrawRange(0, 0)

        return geometry
    }
    #createMaterial(){
        return new THREE.ShaderMaterial({
            vertexShader: VISUALIZER.object.progress.shader.vertex,
            fragmentShader: VISUALIZER.object.progress.shader.fragment,
            transparent: true
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