precision mediump float;
uniform float time;
uniform vec2 resolution;

float random(vec2 st){
    return fract(sin(dot(st, vec2(12.9898, 78.233)))*43758.5453);
}

float flickeringLines(vec2 st){

	float flick = abs(sin(time*30.))/2.;
	return flick;
}

float drawLines(vec2 st, float n,float lines, float pos){

	float r =  random(st)*sin(time*9.);
	 float s = step(flickeringLines(st),sin(lines*st.y));  //線を細かく分割
	// float s = step(0.4,sin(lines*st.y));  //線を細かく分割
	float l = step(n*s,distance(st.y, pos)); //２列の真ん中に線を描画

	return l;
}

float bugLine(vec2 st, float n){

	float r =  random(st)*sin(time*9.);
	float px2 = step(n, st.x)*step(n+0.6, 1.-st.x);
	return px2;
}

void main() {
	vec2 uv = gl_FragCoord.xy / resolution.xy;

  //vec2 st = step(0., sin(1000.*uv));
  uv.y = uv.y*2.;  //画面を2倍
	//uv.x = uv.x *4.;
  vec2 st = fract(uv);   //画面を２分割
	vec2 id = floor(uv);   //2画面の整数値をとってidに追加


  vec4 black = vec4(0., 0., 0., 1.);  //黒
  vec4 c1 = vec4(0.8, 0.0, 0.8, 1.);  //pink
  vec4 c2 = vec4(0.1, 1.0, 0.1, 1.);  //lightGreen


  vec4 p = mix(c1, black, drawLines(st, 0.25,500., 0.65));   //pink
	vec4 p2 = mix(c2, black, drawLines(st, 0.9,1000., 0.9));   //lightgreen
	float p3 = step(0.12, 2.-uv.y)*step(1.75, uv.y);   //blackLine1
	float p4 = step(0.02, 2.-uv.y)*step(1.9, uv.y)+step(0.3, 2.-uv.y)*step(1.65, uv.y);    //blackLine2
  vec3 col = vec3(mix(p, p2, id.y));
	col = col-p3-p4;
	float col2 = abs(sin(bugLine(st, 0.1)*time*15.)); //バグの黒帯部分
	float px1 = abs(sin(step(0.699, uv.x)*step(0.3, 1.-uv.x)*time*10.));
	vec3 p5 = vec3(mix(black, c2, px1));

	col = col-col2+p5;


	// vec3 col = vec3(0);    //idチェックのため
	// col.rg = id;           //idチェックのため

	gl_FragColor = vec4(vec3(col), 1.);
}
