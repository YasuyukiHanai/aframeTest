precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

vec2 random2(vec2 p){
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))))*43758.5453);
}

void main(){

  vec2 st = gl_FragCoord.xy / resolution.xy;
  st.x *= resolution.x/resolution.y;
  vec3 color = vec3(.0);

  //scale
  st *= 4.;

  //Tile the space
  vec2 i_st = floor(st);
  vec2 f_st = fract(st);

  float m_dist = 1.; //minimum distance

  for(int y = -1; y<=1; y++){
    for(int x = -1; x <=1; x++){
        //Neighbor place in the grid
        vec2 neighbor = vec2(float(x), float(y));

        //Random pos from current + neibor place in the grid
        vec2  point = random2(i_st + neighbor);

        //Animate the point
        point =  0.5 +0.5*sin(time+6.2831*point);

        //Vector between the pixel and  the point
        vec2 diff = neighbor +  point -  f_st;

        //Distance to the point
        float dist = length(diff);

        //Keep the closer distance
        m_dist = min(m_dist, dist);
    }
  }

  //Draw the min distance(distnce field)
  color += m_dist;

  //Draw cell center
  color += 1.-step(.02, m_dist);

  //Draw grid
  color += step(.98, f_st.x)+step(.98, f_st.y);

  //Show isoLines
  //color -= step(.7, abs(sin(27.0*m_dist)))*.5;



  gl_FragColor = vec4(color, 1.);
}
