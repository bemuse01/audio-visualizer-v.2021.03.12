export default {
    vertex: `
        varying vec2 vUv;

        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        
            vUv = uv;
        }
    `,
    fragment: `
        varying vec2 vUv;

        uniform sampler2D uTexture;

        void main(){
            vec4 color = texture(uTexture, vUv);

            color.xy = vUv;

            gl_FragColor = color;
        }
    `
}