import {
    O_vec2,
    O_vec3,
    O_vec4,
} from "./module.js"

let n_tau = (Math.PI*2)

function distanceBetweenPoints(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  function isPointInsideCircle(x, y, circle) {
    return distanceBetweenPoints(x, y, circle.centerX, circle.centerY) < circle.radius;
  }
  
  let f_b_collision_square = function(
    o_vec2_min_1,
    o_vec2_max_1,
    o_vec2_min_2,
    o_vec2_max_2,
  ){
    return ((
        o_vec2_min_1.n_x > o_vec2_min_2.n_x 
        &&
        o_vec2_min_1.n_x < o_vec2_max_2.n_x 
    )
    && 
    (
        o_vec2_max_1.n_x < o_vec2_max_2.n_x 
        &&
        o_vec2_max_1.n_x > o_vec2_min_2.n_x 
    ))
  }
  function f_b_collision__circle_and_polygonpoints(
    a_o_trn__shape_point, 
    o_vec2_min_polygon,
    o_vec2_max_polygon,
    n_radius, 
    o_trn_circle
  ) {
    let o_vec2_min_circle = o_trn_circle.sub(n_radius);
    let o_vec2_max_circle = o_trn_circle.add(n_radius);

    let b_collision_square = f_b_collision_square(
        o_vec2_min_circle, 
        o_vec2_max_circle,
        o_vec2_min_polygon,
        o_vec2_max_polygon,
    )
    if(b_collision_square){debugger}
    if(
        !b_collision_square
    ){
        // if the bounding boxes do not collide, there is no reason to go further with calculations
        return false;
    }
    let n_intersections = 0;
    // Loop through each edge of the polygon
    for (let n_i = 0; n_i < a_o_trn__shape_point.length; n_i++) {
        let o_trn__shape_point = a_o_trn__shape_point[n_i]
        let o_trn__shape_point_next = a_o_trn__shape_point[(n_i + 1) % a_o_trn__shape_point.length]

        // Check if the line intersects with the horizontal ray cast from the circle center
        if ((o_trn__shape_point.n_y > o_trn_circle.n_x) != (o_trn__shape_point_next.n_y > o_trn_circle.n_y)) { // If circleCenter.y lies between yi and yj
            let xIntersection = 
                (o_trn__shape_point.n_y - o_trn__shape_point.n_x)
                    * (o_trn_circle.n_y - o_trn__shape_point.n_y) 
                    / (o_trn__shape_point_next.n_y - o_trn__shape_point.n_y)
                    + o_trn__shape_point.n_x;

            if (o_trn_circle.n_x < xIntersection) { // If the intersection is to the right of the circle center
                n_intersections++;
            }
        }
    }
        
        // Odd number of intersections means the point is inside the polygon
        return n_intersections % 2 !== 0;
        
    return false
  }
  
  function isPointInsidePolygon(x, y, polygonVertices) {
    // Implement point-in-polygon algorithm (like ray-casting)
    // This is a placeholder for actual implementation.
    return false; // Replace with actual check
  }

  
function dotProduct(ax, ay, bx, by) {
    return ax * bx + ay * by;
}

function normalize(vector) {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return { x: vector.x / length, y: vector.y / length };
}

function findNormals(a_o_trn) {
    let normals = [];
    for (let i = 0; i < a_o_trn.length; i++) {
        const n_idx_next = (i + 1) % a_o_trn.length
        const edge = {
            x: a_o_trn[n_idx_next].x - a_o_trn[i].x,
            y: a_o_trn[n_idx_next].y - a_o_trn[i].y
        };
        const normal = { x: edge.y, y: -edge.x };
        normals.push(normalize(normal));
    }
    return normals;
}

function projectPolygon(axis, polygon) {
    let min = dotProduct(axis.x, axis.y, polygon[0].x, polygon[0].y);
    let max = min;
    for (let i = 1; i < polygon.length; i++) {
        const p = dotProduct(axis.x, axis.y, polygon[i].x, polygon[i].y);
        if (p < min) {
            min = p;
        } else if (p > max) {
            max = p;
        }
    }
    return { min, max };
}

function overlap(projection1, projection2) {
    return !(projection1.max < projection2.min || projection2.max < projection1.min);
}

function f_b_collision__polygonpoints(a_o_trn_1, a_o_trn_2) {
    const normalsA = findNormals(a_o_trn_1);
    const normalsB = findNormals(a_o_trn_2);

    for (let i = 0; i < normalsA.length; i++) {
        const axis = normalsA[i];
        const projectionA = projectPolygon(axis, a_o_trn_1);
        const projectionB = projectPolygon(axis, a_o_trn_2);
        if (!overlap(projectionA, projectionB)) {
            return false;
        }
    }

    for (let i = 0; i < normalsB.length; i++) {
        const axis = normalsB[i];
        const projectionA = projectPolygon(axis, a_o_trn_1);
        const projectionB = projectPolygon(axis, a_o_trn_2);
        if (!overlap(projectionA, projectionB)) {
            return false;
        }
    }

    return true;
}


let o_canvas = document.createElement('canvas');

class O_go{//go = game object
    constructor(
        f_init, 
        a_o_trn__shape_point,
        s_color, 
        f_callback_on_render, 
        f_callback_on_collision,
        
    ){
        this.f_init = f_init
        this.a_o_trn__shape_point = a_o_trn__shape_point
        this.s_color = s_color 
        this.f_callback_on_render = f_callback_on_render 
        this.f_callback_on_collision = f_callback_on_collision
        this.f_init();

    }
}
window.o_state = null;
let o_go__bad_meteroite = null;
let o_go__ship = new O_go(
    function(){
        this.o_trn = new O_vec2(20)
        this.n_radius = 50
        this.n_rot_rad = 0
        this.n_corners = 3
        this.n_health = 100
        this.n_ms__new_o_shot_last = 0;
        this.n_ms_diff_max__new_o_shot = 1000/10;//fire rate
    },
    [],
    'rgba(255,255,255,1)',
    function(){
        let o_diff = new O_vec2(o_state.o_trn__mouse).subtract(this.o_trn);
        let n_dist = o_diff.length();
        let n_ang_rad = this.o_trn.hangle(o_state.o_trn__mouse)
        // this.s_color = `rgba(222,222,222,${(Math.sin(o_state.n_t)*.5+0.5)}`
        this.s_color = `rgba(222,222,222,1)`
        let o_trn_speed = new O_vec2(
            Math.sin(n_ang_rad+(n_tau/2))*2,
            Math.cos(n_ang_rad+(n_tau/2))*2,
        )//base speed
        if(o_state.b_mousedown_r){
            
            let o_trn_new = o_state.o_trn__mouse.add(
                (this.o_trn.subtract(o_state.o_trn__mouse)).multiply(0.95)
            )

            o_trn_speed.addeq(
                o_trn_new.subtract(this.o_trn)
            );

            this.o_trn = o_trn_new
            // n_corners = parseInt((Math.sin(o_state.n_t*0.2)*.5+.5)*3+3) 
            // n_radius = (Math.sin(o_state.n_t*0.5)*.5+.5)*12+12
        }
        let o_self = this;
        if(o_state.b_mousedown_l){
            let n_ms_now = window.performance.now();
            let n_ms_diff = n_ms_now - this.n_ms__new_o_shot_last;

            if(n_ms_diff > this.n_ms_diff_max__new_o_shot){

                this.n_ms__new_o_shot_last = n_ms_now

                let o_go__shot = new O_go(
                    function(){
                        this.o_trn = new O_vec2(...o_self.o_trn.a_n_comp)
                        this.n_radius = 20
                        this.n_rot_rad = n_ang_rad
                        // this.n_corners = 3

                        this.f_remove = function(){
                            o_state.a_o_go.splice(o_state.a_o_go.indexOf(this), 1)
                            o_state.a_o_go__shot.splice(o_state.a_o_go__shot.indexOf(this), 1)
                        }
                        o_state.a_o_go__shot.push(this)
                        o_state.a_o_go.push(this)
                    },
                    [],
                    this.s_color,
                    function(n_idx){
                        this.o_trn.addeq(o_trn_speed)
                        this.n_count = (this.n_count!=undefined) ? (this.n_count +1) : 0;
                        if(this.n_count > 100){
                            this.f_remove();
                        }
                        // this.a_o_trn__shape_point = f_a_o_trn__shape_point__polygon(
                        //     this.n_corners, 
                        //     this.n_radius, 
                        //     this.n_rot_rad,
                        //     this.o_trn,
                        //     this.s_color 
                        // )
                    },
                )
            }

        }
        this.n_rot_rad = n_ang_rad;
        this.a_o_trn__shape_point = f_a_o_trn__shape_point__polygon(
            this.n_corners, 
            this.n_radius, 
            this.n_rot_rad,
            this.o_trn,
            this.s_color 
        )
        //check collision 

        let b_collision = f_b_collision__polygonpoints(
            this.a_o_trn__shape_point, 
            o_state.o_go__bad_meteroite.a_o_trn__shape_point
        )
        if(b_collision){
            this.n_health -= 1;
            // this.s_color = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},1)`
        }
        if(this.n_health < 0){
            console.log('you looose!!!!')
        }
        this.s_color = `rgba(255,255,255,${this.n_health/100})`

    },
)
o_go__bad_meteroite = new O_go(
    function(){
        this.n_health = 100;
        this.n_rot_rad = 0;
        this.o_trn = new O_vec2(0)
        let n_corners = parseInt(3+Math.random()*20);

        this.o_vec2_min = new O_vec2(0);
        this.o_vec2_max = new O_vec2(0);

        let n_rad_per_corner = (Math.PI*2)/n_corners;
        let n_radius_base = 50;
        this.a_o_trn__shape_point__original = []
        for(let n_c = 0; n_c < n_corners; n_c++){
            let n_rad = n_rad_per_corner *n_c;

            const o_trn_new = new O_vec2(
                (this.o_trn.n_x)+Math.sin(n_rad)*n_radius_base + Math.sin(Math.random()*n_tau)*n_radius_base*.2,
                (this.o_trn.n_y)+Math.cos(n_rad)*n_radius_base + Math.sin(Math.random()*n_tau)*n_radius_base*.2
            )
            if(n_c == 0){
                this.o_vec2_min = o_trn_new
                this.o_vec2_max = o_trn_new
            }else{
                this.o_vec2_min.n_x = Math.min(this.o_vec2_min.n_x, o_trn_new.n_x)
                this.o_vec2_min.n_y = Math.min(this.o_vec2_min.n_y, o_trn_new.n_y)
                this.o_vec2_max.n_x = Math.max(this.o_vec2_max.n_x, o_trn_new.n_x)
                this.o_vec2_max.n_y = Math.max(this.o_vec2_max.n_y, o_trn_new.n_y)
            }

            this.a_o_trn__shape_point__original.push(
                o_trn_new
            )
        }
        this.a_o_trn__shape_point = [...this.a_o_trn__shape_point__original]
    },
    [],
    'rgba(255,0,255,0.8)',
    function(){
        // let o_diff = new O_vec2(o_state.o_go__ship).subtract(this.o_trn);
        // let n_dist = o_diff.length();

        let n_ang_rad = this.o_trn.hangle(o_state.o_go__ship.o_trn)

        this.o_trn = o_state.o_go__ship.o_trn.add(
            this.o_trn.subtract(o_state.o_go__ship.o_trn).multiply(0.99)
        )
        this.a_o_trn__shape_point = []
        for(let o_trn of this.a_o_trn__shape_point__original){
            this.a_o_trn__shape_point.push(
                o_trn.add(this.o_trn)
            )
        }
        this.n_rot_rad = n_ang_rad

        //check collision 
        for(let o_go__shot of o_state?.a_o_go__shot){
            // debugger
            let b = f_b_collision__circle_and_polygonpoints(
                this.a_o_trn__shape_point, 
                this.o_vec2_min,
                this.o_vec2_max,
                o_go__shot.n_radius, 
                o_go__shot.o_trn
            )
            if(b){
                console.log(b)
                this.n_health -=1;
                o_go__shot.f_remove();
            }
        }
        if(this.n_health < 0){
            console.log('you winnn!!!!')
        }
        this.s_color = `rgba(255,255,0,${this.n_health/100})`
    },
)
o_state = {
    o_go__ship,
    o_go__bad_meteroite,
    a_o_go: [
        o_go__ship, 
        o_go__bad_meteroite
    ],
    a_o_go__shot: [],
    o_trn__mouse : new O_vec2(0),
    o_trn__ship : new O_vec2(0),
    o_scl__ship: new O_vec2(10,10),
    n_t: 0,
    o_canvas: o_canvas,
    o_ctx: o_canvas.getContext('2d'),
    n_ms_last:0,
    n_fps: 60,//240, 
    b_mousedown_l: false,
    b_mousedown_m: false,
    b_mousedown_r: false,
}
let f_resize = function(){
    o_canvas.width = window.innerWidth;
    o_canvas.height = window.innerHeight;
}
f_resize()

let f_draw_shape = function(
    o_ctx,
    a_o_trn__shape_point, 
    s_color
){

    if(a_o_trn__shape_point.length == 0){
        return false
    }
    o_ctx.fillStyle = s_color
    o_ctx.beginPath();
    o_ctx.moveTo(...a_o_trn__shape_point[0].a_n_comp)
    for(let n_idx = 1; n_idx < a_o_trn__shape_point.length; n_idx++){
        o_ctx.lineTo(...a_o_trn__shape_point[n_idx].a_n_comp);
    }
    o_ctx.fill();
}
class O_polygon_info{
    constructor(
        a_o_trn__shape_point,
        a_o_normal,
        o_vec2_min,
        o_vec2_max,
    ){
        this.a_o_trn__shape_point = a_o_trn__shape_point
        this.a_o_normal = a_o_normal
        this.o_vec2_min = o_vec2_min
        this.o_vec2_max = o_vec2_max
    }
}
let f_o_polygon_info__regular = function(
    n_corners, 
    n_radius, 
    n_rotation_rad,
    o_trn,
    s_color,
    b_normals = true, 
    b_rect_bounds = true
){
    let a_o_trn__shape_point = [];
    let a_o_normal = [];
    let a_o_trn__shape_rect_bounds = [];
    let o_vec2_min = null;
    let o_vec2_max = null;
    let n_rad_per_corner = (Math.PI*2)/n_corners
    for(let n_c = 0; n_c < n_corners;n_c+=1){
        let n_rad = n_rad_per_corner*n_c-n_rotation_rad + (Math.PI*2)/4+Math.PI;
        let o_trn = new O_vec2(
            o_trn.n_x+Math.cos(n_rad)*n_radius,//+(n_radius),
            o_trn.n_y+Math.sin(n_rad)*n_radius,//+(n_radius),
        )
        if(b_normals){
            if(n_c > 0){
                a_o_normal.push(o_trn.sub(a_o_trn__shape_point[n_c-1]))
            }
        }
        if(b_rect_bounds){
            if(n_c == 0){
                o_vec2_min = o_trn
                o_vec2_max = o_trn
            }else{
                o_vec2_min.n_x = Math.min(o_vec2_min.n_x, o_trn.n_x)
                o_vec2_min.n_y = Math.min(o_vec2_min.n_y, o_trn.n_y)
                o_vec2_max.n_x = Math.max(o_vec2_max.n_x, o_trn.n_x)
                o_vec2_max.n_y = Math.max(o_vec2_max.n_y, o_trn.n_y)
            }
        }
        a_o_trn__shape_point.push(
            o_trn
        )
    }
    return new O_polygon_info(
        a_o_trn__shape_point, 
        a_o_normal, 
        o_vec2_min, 
        o_vec2_max
    )
    return a_o_trn__shape_point
}

let f_a_o_trn__shape_point__polygon = function(
    n_corners, 
    n_radius, 
    n_rotation_rad,
    o_trn,
    s_color 
){
    let a_o_trn__shape_point = [];
    let n_rad_per_corner = (Math.PI*2)/n_corners
    for(let n_c = 0; n_c < n_corners;n_c+=1){
        let n_rad = n_rad_per_corner*n_c-n_rotation_rad + (Math.PI*2)/4+Math.PI;
        a_o_trn__shape_point.push(
            new O_vec2(
                o_trn.n_x+Math.cos(n_rad)*n_radius,//+(n_radius),
                o_trn.n_y+Math.sin(n_rad)*n_radius,//+(n_radius),
            )
        )
    }
    return a_o_trn__shape_point
}

window.oncontextmenu = function(){
    return false
}
window.onmousedown = function(o_e){
    o_e.preventDefault();
    o_state.b_mousedown_l = (o_e.button == 0) ? true : o_state.b_mousedown_l;
    o_state.b_mousedown_m = (o_e.button == 1) ? true : o_state.b_mousedown_m;
    o_state.b_mousedown_r = (o_e.button == 2) ? true : o_state.b_mousedown_r;
}
window.onmouseup = function(o_e){
    console.log(o_e.button)
    o_state.b_mousedown_l = (o_e.button == 0) ? false : o_state.b_mousedown_l;
    o_state.b_mousedown_m = (o_e.button == 1) ? false : o_state.b_mousedown_m;
    o_state.b_mousedown_r = (o_e.button == 2) ? false : o_state.b_mousedown_r;
}
let f_render = function(o_ctx){
    o_state.n_t = window.requestAnimationFrame(f_render);
    let n_ms_now = window.performance.now()
    let n_ms_diff = (Math.abs(n_ms_now - o_state.n_ms_last))
    // console.log(n_ms_diff)
    if(n_ms_diff > (1000/o_state.n_fps)){
        // console.log('f_render')
        // console.log(o_state.n_t)
        // o_state.o_ctx.clearRect(0, 0, o_state.o_canvas.width, o_state.o_canvas.height);
        o_state.o_ctx.fillStyle = `rgba(0.1,0.1,0.1,${(o_state.b_mousedown) ? '0.06': '0.33'})`;
        o_state.o_ctx?.fillRect(0, 0, o_state.o_canvas.width, o_state.o_canvas.height);

        for(let n_idx in o_state.a_o_go){
            let o_go = o_state.a_o_go[n_idx];
            // console.log(o_go.o_trn.toString())
            if(o_go.a_o_trn__shape_point){
                f_draw_shape(
                    o_state.o_ctx,
                    o_go.a_o_trn__shape_point,
                    o_go.s_color
                )
            }
            if(
                o_go.a_o_trn__shape_point?.length == 0 
                 && o_go.n_radius
                 && o_go.o_trn
            ){
                o_state.o_ctx.fillStyle = o_go.s_color
                o_state.o_ctx.beginPath();
                o_state.o_ctx.arc(
                    o_go.o_trn.n_x,
                    o_go.o_trn.n_y,
                    o_go.n_radius,
                    0, 
                    2*Math.PI)
                o_state.o_ctx.fill(); 

                // draw bounding box
                // let o_vec2_min_circle = o_go.o_trn.sub(o_go.n_radius);
                // let o_vec2_max_circle = o_go.o_trn.add(o_go.n_radius);
                // o_state.o_ctx.fillStyle = 'rgba(255,0,0,0.4)'
                // o_state.o_ctx.rect(
                //     o_vec2_min_circle.n_x,
                //     o_vec2_min_circle.n_y, 
                //     o_go.n_radius*2,
                //     o_go.n_radius*2
                // )
                // o_state.o_ctx.fill(); 
                
            }

            if(o_go?.f_callback_on_render){
                o_go?.f_callback_on_render(n_idx)
            }
        }
        // f_draw_polygon(o_state.o_ctx, parseInt((Math.sin(o_state.n_t*0.05)*.5+.5)*6+3), 20, 0, o_state.o_trn__mouse);
        o_state.n_ms_last = n_ms_now
    }

}
let f_start_render = function(){
    o_state.n_t = window.requestAnimationFrame(f_render);
}
let f_stop_render = function(){
    cancelAnimationFrame(o_state.n_t);
}

f_start_render();

document.body.appendChild(o_canvas);
document.body.style.padding = '0';
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
window.onmousemove = function(o_e){
    o_state.o_trn__mouse = new O_vec2(
        o_e.clientX,
        o_e.clientY
    )
    // console.log(o_state.o_trn__mouse.toString())
}