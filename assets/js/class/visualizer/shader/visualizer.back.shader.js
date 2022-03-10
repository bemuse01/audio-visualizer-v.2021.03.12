export default {
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
        uniform float minOpacity;
        void main() {
            float dist = clamp(length(vPos - origin), 0.0, limitDist);
            float opacity = minOpacity - (dist / limitDist) * minOpacity;
            gl_FragColor = vec4(color, opacity);
        }
    `
}