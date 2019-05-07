<script id="vertexShader" type="x-shader/x-vertex">
varying vec2 vUv;
attribute float invert;
varying float flip;
void main() {
	vUv = uv;
	flip = invert;
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}
</script>