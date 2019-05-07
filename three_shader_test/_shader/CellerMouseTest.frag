// Author: @patriciogv
// Title: 4 cells voronoi

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;

    vec3 color = vec3(.0);

    // Cell positions
    vec2 point[5];
    point[0] = vec2(0.83,0.75);
    point[1] = vec2(0.60,0.07);
    point[2] = vec2(0.28,0.64);
    point[3] =  vec2(0.31,0.26);
    point[4] = mouse*st;

    float m_dist = 1.;  // minimun distance
    vec2 m_point;        // minimum position

    // Iterate through the points positions
    for (int i = 0; i < 5; i++) {
        float dist = distance(st, point[i]);
        if ( dist < m_dist ) {
            // Keep the closer distance
            m_dist = dist;

            // Kepp the position of the closer point
            m_point = point[i];
        }
    }

    vec4 c1 = vec4(0.4, 0.3, 0.8, 1.0 );
    vec4 c2 = vec4(0.9, 0.2, 0.6, 1.0);



    // Add distance field to closest point center
    color += m_dist*2.;

    // tint acording the closest point position
    color.rg = m_point;

    // Show isolines
    //color -= abs(sin(80.0*m_dist))*0.07;

    // Draw point center
    //scolor += 1.-step(.02, m_dist);

    gl_FragColor = vec4(color,1.0);
}
