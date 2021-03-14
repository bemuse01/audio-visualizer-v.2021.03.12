VISUALIZER.object.back.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
    }


    // init
    #init(){
        this.param = new VISUALIZER.object.back.param()
    }


    // add
    #add(group){
    }


    // create
    #create(){
        this.#createMesh()
    }
    #createMesh(){
      
    }
    #createGeometry(){
    }
    #createMaterial(color){
    }


    // animate
    animate(buf){
    } 
}