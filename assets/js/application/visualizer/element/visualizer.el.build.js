VISUALIZER.element.build = class{
    constructor(){
        this.create()
    }


    // create
    create(){
        this.createVisualizerDuration()
    }
    createVisualizerDuration(){
        this.duration = '0:00'
    }


    // animate
    animate(param){
        const {audio} = param.audio

        const min = Math.floor(audio.currentTime / 60)
        const sec = Math.floor(audio.currentTime % 60)

        this.duration = `${min}:${sec < 10 ? '0' + sec : sec}`
    }
}