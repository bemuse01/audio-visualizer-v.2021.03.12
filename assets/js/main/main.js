new Vue({
    el: '#wrap',
    data(){
        return{
            
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.initThree()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // three
        initThree(){
            COMP.app = new APP.build()

            this.createObject(COMP.app)
        },
        resizeThree(){
            for(let i in COMP) {
                if(COMP[i].resize === undefined) continue
                COMP[i].resize()
            }
        },
        renderThree(){
            const {app, audio} = COMP

            for(let i in COMP) {
                if(COMP[i].animate === undefined) continue
                COMP[i].animate({app, audio})
            }
        },
        createObject(app){
            this.createAudio()
            this.createVisualizer(app)
        },
        createAudio(){
            COMP.audio = new AUDIO.build('assets/src/Hiroyuki Sawano ft. ASCA & mizuki - Unti-L.mp3')

            window.addEventListener('click', () => COMP.audio.play(), false)
        },
        createVisualizer(app){
            COMP.visualizer = new VISUALIZER.object.build(app)
        },


        // event
        onWindowResize(){
            WIDTH = window.innerWidth
            HEIGHT = window.innerHeight

            this.resizeThree()
        },


        // render
        render(){
            this.renderThree()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})