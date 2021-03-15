VISUALIZER.object.bar.param = class{
    constructor(param = {}){
        this.count = 80
        this.radius = 300
        this.width = param.width || 16
        this.height = param.height || 4
        this.seg = param.seg || 19
        this.solid = param.solid || {
            top: 180,
            bottom: 290
        }
        this.step = param.step || 3
    }
}