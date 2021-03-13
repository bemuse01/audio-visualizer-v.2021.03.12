VISUALIZER.object.bar.param = class{
    constructor(param = {}){
        this.count = 80
        this.radius = 300
        this.width = param.width || 18
        this.height = param.height || 0
        this.seg = param.seg || 19
        this.solid = param.solid || 180
        this.step = param.step || 3
    }
}