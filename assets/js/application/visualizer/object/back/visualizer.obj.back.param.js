VISUALIZER.object.back.param = class{
    constructor(param = {}){
        this.count = 80
        this.radius = 480
        this.width = param.width || 16
        this.height = param.height || 400
        this.seg = param.seg || 19
        this.solid = param.solid || {
            top: 180,
            bottom: 290
        }
        this.step = param.step || 3
        this.limitDist = param.limitDist || {
            static: 475,
            dynamic: 100,
            rd: 50
        }
        this.opacity = param.opacity || {
            static: 0.5,
            dynamic: 0.5,
            rd: 0.3
        }
    }
}