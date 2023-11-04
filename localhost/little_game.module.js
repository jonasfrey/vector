import {
    f_o_vec2,
    f_o_vec3, 
    f_o_vec4
} from "./module.js"
let n_tau = (Math.PI*2)

function dotProduct(ax, ay, bx, by) {
    return ax * bx + ay * by;
}

function normalize(vector) {
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    return { x: vector.x / length, y: vector.y / length };
}

function findNormals(points) {
    let normals = [];
    for (let i = 0; i < points.length; i++) {
        const next = i + 1 === points.length ? 0 : i + 1;
        const edge = {
            x: points[next].x - points[i].x,
            y: points[next].y - points[i].y
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

function f_b_collision(a_o_trn_1, a_o_trn_2) {
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
        this.o_trn = f_o_vec2(20)
        this.n_radius = 50
        this.n_rot_rad = 0
        this.n_corners = 3
        this.n_health = 100
    },
    [],
    'rgba(255,255,255,1)',
    function(){
        let o_diff = f_o_vec2(o_state.o_trn__mouse).subtract(this.o_trn);
        let n_dist = o_diff.length();
        let n_ang_rad = this.o_trn.hangle(o_state.o_trn__mouse)
        // this.s_color = `rgba(222,222,222,${(Math.sin(o_state.n_t)*.5+0.5)}`
        this.s_color = `rgba(222,222,222,1)`
        let n_speed = 0;
        if(o_state.b_mousedown_r){
            
            let o_trn_new = o_state.o_trn__mouse.add(
                (this.o_trn.subtract(o_state.o_trn__mouse)).multiply(0.95)
            )
            n_speed = this.o_trn.subtract(o_trn_new).length();

            this.o_trn = o_trn_new
            // n_corners = parseInt((Math.sin(o_state.n_t*0.2)*.5+.5)*3+3) 
            // n_radius = (Math.sin(o_state.n_t*0.5)*.5+.5)*12+12
        }
        let o_self = this;
        if(o_state.b_mousedown_l){
            let o_go__shot = new O_go(
                function(){
                    this.o_trn = f_o_vec2(o_self.o_trn)
                    this.n_radius = 2
                    this.n_rot_rad = n_ang_rad
                    this.n_corners = 3
                    if((o_state.a_o_go__shot == undefined)){
                        o_state.a_o_go__shot = []
                    }
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
                    this.o_trn.addeq(o_diff.normalize().multiply(n_speed/10))
                    this.n_count = (this.n_count!=undefined) ? (this.n_count +1) : 0;
                    if(this.n_count > 100){
                        this.f_remove();
                    }
                    this.a_o_trn__shape_point = f_a_o_trn__shape_point__polygon(
                        this.n_corners, 
                        this.n_radius, 
                        this.n_rot_rad,
                        this.o_trn,
                        this.s_color 
                    )
                },
            )

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

        let b_collision = f_b_collision(
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
        this.n_rot_rad = 0;
        this.o_trn = f_o_vec2(0)
        let n_corners = parseInt(3+Math.random()*20);

        let n_rad_per_corner = (Math.PI*2)/n_corners;
        let n_radius_base = 20;
        this.a_o_trn__shape_point__original = []
        for(let n_c = 0; n_c < n_corners; n_c++){
            let n_rad = n_rad_per_corner *n_c;
            this.a_o_trn__shape_point__original.push(
                f_o_vec2(
                    (this.o_trn.n_x)+Math.sin(n_rad)*n_radius_base + Math.sin(Math.random()*n_tau)*n_radius_base*.2,
                    (this.o_trn.n_y)+Math.cos(n_rad)*n_radius_base + Math.sin(Math.random()*n_tau)*n_radius_base*.2
                )
            )
        }
        this.a_o_trn__shape_point = [...this.a_o_trn__shape_point__original]
    },
    [],
    'rgba(255,0,255,0.8)',
    function(){
        // let o_diff = f_o_vec2(o_state.o_go__ship).subtract(this.o_trn);
        // let n_dist = o_diff.length();

        let n_ang_rad = this.o_trn.hangle(o_state.o_go__ship.o_trn)

        this.o_trn = o_state.o_go__ship.o_trn.add(
            this.o_trn.subtract(o_state.o_go__ship.o_trn).multiply(0.98)
        )
        this.a_o_trn__shape_point = []
        for(let o_trn of this.a_o_trn__shape_point__original){
            this.a_o_trn__shape_point.push(
                o_trn.add(this.o_trn)
            )
        }
        this.n_rot_rad = n_ang_rad

        //check collision 
    },
)
o_state = {
    o_go__ship,
    o_go__bad_meteroite,
    a_o_go: [
        o_go__ship, 
        o_go__bad_meteroite
    ],
    o_trn__mouse : f_o_vec2(0),
    o_trn__ship : f_o_vec2(0),
    o_scl__ship: f_o_vec2(10,10),
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
        let n_rad = n_rad_per_corner*n_c-n_rotation_rad;
        a_o_trn__shape_point.push(
            f_o_vec2(
                o_trn.n_x+Math.sin(n_rad)*n_radius,//+(n_radius),
                o_trn.n_y+Math.cos(n_rad)*n_radius,//+(n_radius),
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
            f_draw_shape(
                o_state.o_ctx,
                o_go.a_o_trn__shape_point,
                o_go.s_color
            )

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
    o_state.o_trn__mouse = f_o_vec2(
        o_e.clientX,
        o_e.clientY
    )
    // console.log(o_state.o_trn__mouse.toString())
}