VISUALIZER.object.build = class{
    constructor(){
        this.#init()
        this.#create()
        this.#add()
    }


    // init
    #init(){
        this.param = new VISUALIZER.object.param()

        this.#initGroup()
        this.#initRenderObject()
    }
    #initGroup(){
        this.group = {
            back: new THREE.Group(),
            bar: new THREE.Group()
        }

        this.build = new THREE.Group
    }
    #initRenderObject(){
        this.element = document.querySelector('.visualizer-object')

        const {width, height} = this.element.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.param.fov, width / height, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos
        
        // this.width = METHOD.getVisibleWidth(this.camera, 0)
        // this.height = METHOD.getVisibleHeight(this.camera, 0)
    }


    // add
    #add(){
        for(let i in this.group) this.build.add(this.group[i])
        
        this.scene.add(this.build)
    }


    // create
    #create(){
        this.#createBar()
    }
    #createBar(){
        this.bar = new VISUALIZER.object.bar.build(this.group.bar)
    }


    // animate
    animate(app, buf){
        this.#render(app)
        this.#animateObject(buf)
    }
    #render(app){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = app.renderer.domElement.clientHeight - rect.bottom

        app.renderer.setViewport(left, bottom, width, height)
        app.renderer.setScissor(left, bottom, width, height)

        this.camera.lookAt(this.scene.position)
        app.renderer.render(this.scene, this.camera)
    }
    #animateObject(buf){
        this.bar.animate(buf)
    }


    // resize
    resize(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        // this.width = METHOD.getVisibleWidth(this.camera, 0)
        // this.height = METHOD.getVisibleHeight(this.camera, 0)
    }
}