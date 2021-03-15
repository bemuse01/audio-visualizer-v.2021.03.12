VISUALIZER.object.back.shader = {
    vertex: `
        varying vec3 vPos;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vPos = position;
        }
    `,
    fragment: `
        varying vec3 vPos;
        uniform vec3 origin;
        uniform vec3 color;
        uniform float limitDist;
        void main() {
            float dist = clamp(length(vPos - origin), 0.0, limitDist);
            float opacity = 0.6 - dist / limitDist;
            gl_FragColor = vec4(color, opacity);
        }
    `
}

// shader.line.vertexShader = `
// 	varying vec3 vPos;
//     void main() {
// 	  	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       	vPos = position;
//     }
// `
// shader.line.fragmentShader = `
// 	varying vec3 vPos;
// 	uniform vec3 origin;
//     uniform vec3 color;
//     uniform float limitDistance;
//     void main() {
//     	float distance = clamp(length(vPos - origin), 0.0, limitDistance);
//       	float opacity = 1.0 - distance / limitDistance;
//       	gl_FragColor = vec4(color, opacity);
//     }
// `