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
            for(let i in COMP) {
                if(COMP[i].animate === undefined) continue
                COMP[i].animate()
            }
        },
        createObject(app){
            this.createAudio()
        },
        createAudio(){
            COMP.audio = new AUDIO.build('assets/src/LiSA - Unlasting.mp3')

            window.addEventListener('click', () => COMP.audio.play(), false)
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