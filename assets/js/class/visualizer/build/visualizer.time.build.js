import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'
import Shader from '../shader/visualizer.time.shader.js'

export default class{
    constructor({size, rtScenes}){
        this.size = size
        this.rtScene = rtScenes[1]

        this.param = {
            width: 500,
            height: 500,
            planeWidth: 50,
            planeHeight: 50,
            font: 'NotoSansDisplayLight',
            fontSize: '140px',
            fontColor: '#ffffff'
        }
    
        this.ctx = document.createElement('canvas').getContext('2d')
        this.ctx.canvas.width = this.param.width
        this.ctx.canvas.height = this.param.height

        this.init()
    }


    // init
    init(){
        this.create()
    }
 
  

    // create
    create(){
        this.texture = new THREE.CanvasTexture(this.ctx.canvas)

        this.object = new Plane({
            width: this.param.planeWidth,
            height: this.param.planeHeight,
            widthSeg: 1,
            heightSeg: 1,
            materialOpt: {
                // map: this.texture,
                // transparent: true
                vertexShader: Shader.vertex,
                fragmentShader: Shader.fragment,
                transparent: true,
                // blending: THREE.AdditiveBlending,
                uniforms: {
                    uTexture: {value: this.texture}
                }
            }
        })

        this.rtScene.add(this.object.get())
    }


    // animate
    animate({currentTime}){
        const min = ~~(currentTime / 60) || 0
        const sec = ~~(currentTime % 60) || 0
        const time = `${min}:${sec < 10 ? '0' + sec : sec}`

        this.drawCanvasTexture(this.ctx, time, {...this.param})
        this.texture.needsUpdate = true
    }
    drawCanvasTexture(ctx, txt1, {font, fontColor, fontSize}){
        const {width, height} = ctx.canvas

        ctx.clearRect(0, 0, width, height)

        ctx.font = `${fontSize} ${font}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = fontColor
        // ctx.fillText(~~(window.performance.now()), width / 2, height / 2)
        ctx.fillText(txt1, width / 2, height / 2)
        ctx.fillText(txt1, width / 2, height / 2)
    }
}