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
    }
    #createGeometry(){
        const geometry = new THREE.RingGeometry(this.param.radius, this.param.radius + this.param.size, this.param.seg)

        geometry.setDrawRange(0, 0)

        return geometry
    }
    #createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        })
    }


    // animate
    animate(aud){
        const geometry = this.mesh.geometry
        const position = geometry.attributes.position
        
        const draw = Math.floor(aud.audio.currentTime / aud.audio.duration * (position.count / 2))
        geometry.setDrawRange(0, draw * 3 * 2)

        position.needsUpdate = true
    }
}