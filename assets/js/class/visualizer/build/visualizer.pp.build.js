import * as THREE from '../../../lib/three.module.js'
import Plane from '../../objects/plane.js'
import Shader from '../shader/visualizer.volumetric.shader.js'
import VisualizerParam from '../param/visualizer.param.js'

export default class{
    constructor({group, size, renderTargets}){
        this.size = size
        
        this.renderTargets = renderTargets

        this.param = {
            exposure: 0.25
        }

        this.init(group)
    }


    // init
    init(group){
        this.initRenderTarget()
        this.create(group)
    }
    initRenderTarget(){
        const {w, h} = this.size.el

        this.renderTarget = new THREE.WebGLRenderTarget(w, h, {format: THREE.RGBAFormat})
        // this.renderTarget.samples = 2048

        this.rtCamera = new THREE.PerspectiveCamera(VisualizerParam.fov, w / h, VisualizerParam.near, VisualizerParam.far)
        this.rtCamera.position.z = VisualizerParam.pos

        this.rtScene = new THREE.Scene()
    }


    // create
    create(group){
        this.createEffect(group)
        this.createEffect2(group)
        // this.createBlend(group)
    }
    createEffect(group){
        this.effect = new Plane({
            width: this.size.obj.w,
            height: this.size.obj.h,
            widthSeg: 1,
            heightSeg: 1,
            materialOpt: {
                vertexShader: Shader.effect.vertex,
                fragmentShader: Shader.effect.fragment,
                transparent: true,
                // blending: THREE.AdditiveBlending,
                uniforms: {
                    // uRes: {value: new THREE.Vector2(this.size.el.w, this.size.el.h)},
                    tDiffuse: {value: this.renderTargets[0].texture},
                    lightPosition: {value: new THREE.Vector2(0.5, 0.5)},
                    exposure: {value: this.param.exposure},
                    // exposure: {value: 0.22},
                    // decay: {value: 0.95},
                    decay: {value: 0.95},
                    // density: {value: 0.8},
                    density: {value: 0.6},
                    weight: {value: 0.4},
                    samples: {value: 60}
                }
            }
        })

        // this.rtScene.add(this.effect.get())
        group.add(this.effect.get())
    }
    createEffect2(group){
        this.effect2 = new Plane({
            width: this.size.obj.w,
            height: this.size.obj.h,
            widthSeg: 1,
            heightSeg: 1,
            materialOpt: {
                vertexShader: Shader.effect.vertex,
                fragmentShader: Shader.effect.fragment,
                transparent: true,
                // blending: THREE.AdditiveBlending,
                uniforms: {
                    tDiffuse: {value: this.renderTargets[1].texture},
                    lightPosition: {value: new THREE.Vector2(0.5, 0.5)},
                    exposure: {value: 0.3},
                    decay: {value: 0.95},
                    density: {value: 0.8},
                    weight: {value: 0.4},
                    samples: {value: 50}
                }
            }
        })

        group.add(this.effect2.get())
    }
    createBlend(group){
        this.blend = new Plane({
            width: this.size.obj.w,
            height: this.size.obj.h,
            widthSeg: 1,
            heightSeg: 1,
            materialOpt: {
                map: this.renderTarget.texture,
                transparent: true,
                blending: THREE.AdditiveBlending,
                // vertexShader: Shader.blend.vertex,
                // fragmentShader: Shader.blend.fragment,
                // transparent: true,
                // uniforms: {
                //     // uRes: {value: new THREE.Vector2(this.size.el.w, this.size.el.h)},
                // }
            }
        })

        group.add(this.blend.get())
    }
    


    // resize
    resize(size){
        this.size = size
        
        // this.object.resize({width: this.size.obj.w, height: this.size.obj.h, widthSeg: 1, heightSeg: 1})
    }


    // animate
    animate({renderer, audioData, audioDataAvg}){
        if(audioData){
            const exposure = audioDataAvg * 0.2
            this.effect.setUniform('exposure', this.param.exposure - exposure)
        }

        renderer.setRenderTarget(this.renderTarget)
        renderer.clear()
        renderer.render(this.rtScene, this.rtCamera)
        renderer.setRenderTarget(null)
    }
}