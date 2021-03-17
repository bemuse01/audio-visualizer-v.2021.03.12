VISUALIZER.object.progress.param = class{
    constructor(param = {}){
        this.radius = param.radius || 258 + 14
        this.size = param.size || 12
        this.seg = param.seg || 1999
        this.count = param.count || 80
        this.solid = param.solid || {
            // top: 180,
            // bottom: 290
            top: 200,
            bottom: 270
        }
        this.step = param.step || 3
    }
}