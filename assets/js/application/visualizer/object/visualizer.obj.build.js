VISUALIZER.object.build = class{
    constructor(app){
        this.#init(app)
        this.#create()
        this.#add()
    }


    // init
    #init(app){
        this.param = new VISUALIZER.object.param()

        this.#initGroup()
        this.#initRenderObject()
        this.#initComposer(app)
    }
    #initGroup(){
        this.group = {
            back: new THREE.Group(),
            bar: new THREE.Group(),
            progress: new THREE.Group()
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
    #initComposer(app){
        this.bloom = this.param.bloom

        const {right, left, bottom, top} = this.element.getBoundingClientRect()
        const width = right - left
        const height = bottom - top
        
        this.composer = new THREE.EffectComposer(app.renderer)
        this.composer.setSize(width, height)

        const renderPass = new THREE.RenderPass(this.scene, this.camera)

        const copyShader = new THREE.ShaderPass(THREE.CopyShader)
        copyShader.renderToScreen = true

        const filmPass = new THREE.FilmPass(0, 0, 0, false)

        const bloomPass = new THREE.BloomPass(this.bloom)

        this.fxaa = new THREE.ShaderPass(THREE.FXAAShader)
        this.fxaa.uniforms['resolution'].value.set(1 / (width * RATIO), 1 / (height * RATIO))

        this.composer.addPass(renderPass)
        this.composer.addPass(bloomPass)
        this.composer.addPass(filmPass)
        this.composer.addPass(this.fxaa)
    }


    // add
    #add(){
        for(let i in this.group) this.build.add(this.group[i])
        
        this.scene.add(this.build)
    }


    // create
    #create(){
        this.#createBar()
        this.#createBack()
        this.#createProgress()
    }
    #createBar(){
        this.bar = new VISUALIZER.object.bar.build(this.group.bar)
    }
    #createBack(){
        this.back = new VISUALIZER.object.back.build(this.group.back)
    }
    #createProgress(){
        this.progress = new VISUALIZER.object.progress.build(this.group.progress)
    }


    // animate
    animate(app, audio){
        this.#render(app)
        this.#animateObject(audio)
    }
    #render(app){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = app.renderer.domElement.clientHeight - rect.bottom

        app.renderer.setViewport(left, bottom, width, height)
        app.renderer.setScissor(left, bottom, width, height)

        // this.camera.lookAt(this.scene.position)
        // app.renderer.render(this.scene, this.camera)

        app.renderer.autoClear = false
        app.renderer.clear()

        this.camera.layers.set(PROCESS)
        this.composer.render()

        app.renderer.clearDepth()
        this.camera.layers.set(NORMAL)
        app.renderer.render(this.scene, this.camera)
    }
    #animateObject(audio){
        this.bar.animate(audio.buf)
        this.back.animate(audio.buf, audio.min, audio.max)
        this.progress.animate(audio)
    }


    // resize
    resize(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.fxaa.uniforms['resolution'].value.set(1 / (width * RATIO), 1 / (height * RATIO))

        // this.width = METHOD.getVisibleWidth(this.camera, 0)
        // this.height = METHOD.getVisibleHeight(this.camera, 0)
    }
}