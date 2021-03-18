VISUALIZER.object.border.param = class{
    constructor(param = {}){
        this.radius = param.radius || 251
        this.size = param.size || {
            thin: 5,
            thick: 28
        }
        this.seg = param.seg || 239
        this.count = param.count || 80
        this.solid = param.solid || {
            top: 180,
            bottom: 290
            // top: 200,
            // bottom: 270
        }
        this.opacity = param.opacity || {
            thin: 1.0,
            thick: 0.1
        }
        this.step = param.step || 3
    }
}