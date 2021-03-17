VISUALIZER.object.progress.method = {
    createColorAttr(param, len){
        const color = new Float32Array(len * 3)

        const half = len / 2
        const solid = param.solid
        const step = param.step
        const div = Math.floor(half / param.count)

        for(let i = 0; i < half; i++){
            const index = Math.floor(i / div) % (param.count / 2)

            const s = i < half / 2 ? solid.top + step * index : solid.bottom - step * index
            const c = new THREE.Color(`hsl(${s}, 100%, 70%)`)

            color[i * 3] = c.r
            color[i * 3 + 1] = c.g
            color[i * 3 + 2] = c.b

            color[(i + half) * 3] = c.r
            color[(i + half) * 3 + 1] = c.g
            color[(i + half) * 3 + 2] = c.b
        }

        console.log(color)

        return color
    }
}