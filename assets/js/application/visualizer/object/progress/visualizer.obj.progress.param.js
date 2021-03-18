VISUALIZER.object.progress.param = class{
    constructor(param = {}){
        this.radius = param.radius || 258 + 6
        this.size = param.size || 20
        this.seg = param.seg || 1999
        this.count = param.count || 80
        this.solid = param.solid || {
            // top: 180,
            // bottom: 290
            top: 200,
            bottom: 270
        }
        this.opacity = param.opacity || 0.9
        this.step = param.step || 3
    }
}