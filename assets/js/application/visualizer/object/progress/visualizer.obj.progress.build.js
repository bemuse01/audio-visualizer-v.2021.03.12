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
    }
    #createGeometry(){
        const geometry = new THREE.RingGeometry(this.param.radius, this.param.radius + this.param.size, this.param.seg)
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
    animate(audio){
        
    }
}