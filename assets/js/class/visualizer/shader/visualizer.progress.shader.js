export default {
    vertex: `
        attribute vec3 aColor;
        varying vec3 vColor;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vColor = aColor;
        }
    `,
    fragment: `
        varying vec3 vColor;
        uniform float opacity;
        void main() {
            gl_FragColor = vec4(vColor, opacity);
        }
    `
}