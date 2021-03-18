VISUALIZER.object.param = class{
    constructor(param = {}){
        this.fov = param.fov || 60
        this.near = param.near || 1
        this.far = param.far || 50000
        this.pos = param.pos || 1250
        this.bloom = param.bloom || 2.0
    }
}