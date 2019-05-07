precision mediump float;
uniform float time;
uniform vec2 resolution;


void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	uv.x = uv.x * 4.5-0.25;
	uv.y = uv.y * 3.;
	vec2 st = fract(uv);

	vec4 c1 = vec4(0.3, 0.4, 0.9, 1.);
	vec4 c2 = vec4(1., 1., 1., 1.);
	float d = distance(vec2(0.5, 0.5), st);
	d = step(-0.99, sin(d*10.));
  vec3 col = vec3(mix(c1, c2, d));
	gl_FragColor = vec4(col, 1.);


}
