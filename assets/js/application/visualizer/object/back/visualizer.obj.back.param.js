VISUALIZER.object.back.param = class{
    constructor(param = {}){
        this.count = 80
        this.radius = 440
        this.width = param.width || 18
        this.height = param.height || 300
        this.seg = param.seg || 19
        this.solid = param.solid || {
            top: 180,
            bottom: 290
        }
        this.step = param.step || 3
    }
}