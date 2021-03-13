VISUALIZER.object.bar.build = class{
    constructor(group){
        this.#init()
        this.#create()
        this.#add(group)
    }


    // init
    #init(){
        this.param = new VISUALIZER.object.bar.param()
    }


    // add
    #add(group){
        group.add(this.local)
    }


    // create
    #create(){
        this.#createMesh()
    }
    #createMesh(){
        this.local = new THREE.Group()

        const degree = 360 / this.param.count

        for(let i = 0; i < this.param.count; i++){
            const geometry = this.#createGeometry()
            const material = this.#createMaterial()
            const mesh = new THREE.Mesh(geometry, material)

            const deg = degree * i
            const x = Math.cos(deg * RADIAN) * this.param.radius
            const y = Math.sin(deg * RADIAN) * this.param.radius

            mesh.position.set(x, y, 0)
            mesh.rotation.z = (90 + deg) * RADIAN

            this.local.add(mesh)
        }
    }
    #createGeometry(){
        const geometry = new THREE.PlaneGeometry(this.param.width, this.param.height, this.param.seg)
        const count = geometry.attributes.position.count
        const array = geometry.attributes.position.array

        const deg = 180 / (count / 2 - 1)
        const radius = this.param.width / 2

        for(let i = 0; i < count; i++){
            const index = i % (count / 2)
            const degree = i < count / 2 ? 180 - deg * index : 180 + deg * index
            const x = Math.cos(degree * RADIAN) * radius
            const y = Math.sin(degree * RADIAN) * radius

            if(i < count / 2) console.log(index)

            array[i * 3] = x
            array[i * 3 + 1] = i < count / 2 ? y + this.param.height / 2 : y - this.param.height / 2
        }

        return geometry
    }
    #createMaterial(){
        return new THREE.MeshBasicMaterial({
            color: 0xffffff,
            // wireframe: true
        })
    }
}