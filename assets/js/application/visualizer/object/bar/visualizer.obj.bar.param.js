VISUALIZER.object.bar.param = class{
    constructor(param = {}){
        this.count = 64
        this.radius = 400
        this.width = param.width || 20
        this.height = param.height || 200
        this.seg = param.seg || 19
    }
}