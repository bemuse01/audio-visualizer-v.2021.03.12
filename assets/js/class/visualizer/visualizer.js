import * as THREE from '../../lib/three.module.js'
import {EffectComposer} from '../../postprocess/EffectComposer.js'
import {FilmPass} from '../../postprocess/FilmPass.js'
import {RenderPass} from '../../postprocess/RenderPass.js'
import {BloomPass} from '../../postprocess/BloomPass.js'
import {ShaderPass} from '../../postprocess/ShaderPass.js'
import {FXAAShader} from '../../postprocess/FXAAShader.js'

import PublicMethod from '../../method/method.js'

import BAR from './build/visualizer.bar.build.js'
import PROGRESS from './build/visualizer.progress.build.js'
import BORDER from './build/visualizer.border.build.js'
import TIME from './build/visualizer.time.build.js'
import PP from './build/visualizer.pp.build.js'

export default class{
    constructor({app}){
        this.param = {
            fov: 60,
            near: 0.1,
            far: 10000,
            pos: 100,
            bloom: 2
        }

        this.modules = {
            // back: BACK,
            bar: BAR,
            progress: PROGRESS,
            border: BORDER,
            time: TIME,
            pp: PP
        }
        this.group = {}
        this.comp = {}
        this.build = new THREE.Group()

        this.init(app)
    }


    // init
    init(app){
        this.initGroup()
        this.initRenderObject()
        this.initRenderTarget()
        this.initComposer(app)
        this.create(app)
        this.add()
    }
    initGroup(){
        for(const module in this.modules){
            this.group[module] = new THREE.Group()
            this.comp[module] = null
        }
    }
    initRenderObject(){
        this.element = document.querySelector('.visualizer-object')

        const {width, height} = this.element.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.param.fov, width / height, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos
        
        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: PublicMethod.getVisibleWidth(this.camera, 0),
                h: PublicMethod.getVisibleHeight(this.camera, 0)
            }
        }
    }
    initRenderTarget(){
        const {w, h} = this.size.el

        this.renderTargets = [
            new THREE.WebGLRenderTarget(w, h, {format: THREE.RGBAFormat}),
            new THREE.WebGLRenderTarget(w, h, {format: THREE.RGBAFormat}),
        ]

        this.renderTargets[0].samples = 2048
        this.renderTargets[1].samples = 2048

        this.rtScenes = [
            new THREE.Scene(),
            new THREE.Scene(),
        ]

        this.rtCamera = new THREE.PerspectiveCamera(this.param.fov, w / h, this.param.near, this.param.far)
        this.rtCamera.position.z = this.param.pos
    }
    initComposer(app){
        const {right, left, bottom, top} = this.element.getBoundingClientRect()
        const width = right - left
        const height = bottom - top
        
        this.composer = new EffectComposer(app.renderer)
        this.composer.setSize(width, height)

        const renderPass = new RenderPass(this.scene, this.camera)

        const filmPass = new FilmPass(0, 0, 0, false)

        const bloomPass = new BloomPass(this.param.bloom)

        this.fxaa = new ShaderPass(FXAAShader)
        this.fxaa.uniforms['resolution'].value.set(1 / (width * RATIO), 1 / (height * RATIO))

        this.composer.addPass(renderPass)
        this.composer.addPass(bloomPass)
        this.composer.addPass(filmPass)
        this.composer.addPass(this.fxaa)
    }


    // add
    add(){
        for(let i in this.group) this.build.add(this.group[i])
        
        this.scene.add(this.build)
    }


    // create
    create({renderer}){
        for(const module in this.modules){
            const instance = this.modules[module]
            const group = this.group[module]

            this.comp[module] = new instance({group, size: this.size, ...this.comp, renderTargets: this.renderTargets, rtScenes: this.rtScenes})
        }
    }


    // animate
    animate({app, audio}){
        this.render(app)
        this.animateObject(app, audio)
    }
    render(app){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = app.renderer.domElement.clientHeight - rect.bottom

        app.renderer.setScissor(left, bottom, width, height)
        app.renderer.setViewport(left, bottom, width, height)

        // this.camera.lookAt(this.scene.position)
        // app.renderer.render(this.scene, this.camera)

        app.renderer.autoClear = false
        app.renderer.clear()

        this.camera.layers.set(PROCESS)
        this.composer.render()

        app.renderer.clearDepth()
        this.camera.layers.set(NORMAL)
        app.renderer.render(this.scene, this.camera)
        
        for(let i = 0; i < this.renderTargets.length; i++){
            app.renderer.setRenderTarget(this.renderTargets[i])
            app.renderer.clear()
            app.renderer.render(this.rtScenes[i], this.rtCamera)
            app.renderer.setRenderTarget(null)
        }
    }
    animateObject(app, audio){
        const {renderer} = app
        const {audioData, audioDataAvg, currentTime, duration} = audio

        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].animate) continue
            this.comp[i].animate({renderer, audioData, audioDataAvg, currentTime, duration})
        }
    }


    // resize
    resize(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.composer.setSize(width, height)

        this.fxaa.uniforms['resolution'].value.set(1 / (width * RATIO), 1 / (height * RATIO))

        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: PublicMethod.getVisibleWidth(this.camera, 0),
                h: PublicMethod.getVisibleHeight(this.camera, 0)
            }
        }

        this.resizeObject()
    }
    resizeObject(){
        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].resize) continue
            this.comp[i].resize(this.size)
        }
    }
}