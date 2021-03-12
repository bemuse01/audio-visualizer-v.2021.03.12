AUDIO.param = class{
    constructor(param = {}){
        this.fft = param.fft || 2 ** 14
        this.fps = 60
        this.display = param.display || 60
    }
}