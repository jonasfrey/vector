import {
    f_o_vec2,
    f_o_vec3, 
    f_o_vec4
} from "./module.js"

let o_canvas = document.createElement('canvas');

let o_state = {
    o_trn__mouse : f_o_vec2(0),
    o_trn__ship : f_o_vec2(0),
    o_scl__ship: f_o_vec2(10,10),
    n_id__raf: 0,
    o_canvas: o_canvas,
    o_ctx: o_canvas.getContext('2d'),
    n_ms_last:0,
    n_fps: 60,//240, 
    b_mousedown: false,
}
let f_resize = function(){
    o_canvas.width = window.innerWidth;
    o_canvas.height = window.innerHeight;
}
f_resize()
let f_draw_polygon = function(
    o_ctx, 
    n_corners, 
    n_radius, 
    n_rotation_rad,
    o_trn
){
    o_ctx.save();

    // move to the center of the canvas
    o_ctx.translate(o_trn.x,o_trn.y);

    // rotate the canvas to the specified degrees
    o_ctx.rotate(n_rotation_rad);

    o_ctx.beginPath();
    o_ctx.moveTo(0,0);
    for(let n_c = 0; n_c < n_corners;n_c+=1){
        let n_rad = ((Math.PI*2)/n_corners)*(n_c);
        let o_trn2 = f_o_vec2(
            Math.sin(n_rad)*n_radius,//+(n_radius),
            Math.cos(n_rad)*n_radius-n_radius,//+(n_radius),
        )
        if(n_c == 0){
            o_ctx.moveTo(o_trn2.x,o_trn2.y)
        }else{
            o_ctx.lineTo(o_trn2.x,o_trn2.y)

        }
    }
    o_ctx.fill();
    o_ctx.restore();
}
window.onmousedown = function(){
    o_state.b_mousedown = true;
}
window.onmouseup = function(){
    o_state.b_mousedown = false;
}
let f_render = function(o_ctx){
    o_state.n_id__raf = window.requestAnimationFrame(f_render);
    let n_ms_now = window.performance.now()
    let n_ms_diff = (Math.abs(n_ms_now - o_state.n_ms_last))
    // console.log(n_ms_diff)
    if(n_ms_diff > (1000/o_state.n_fps)){
        console.log('f_render')
        // console.log(o_state.n_id__raf)
        // o_state.o_ctx.clearRect(0, 0, o_state.o_canvas.width, o_state.o_canvas.height);
        o_state.o_ctx.fillStyle = "rgba(0.1,0.1,0.1,0.2)";

        o_state.o_ctx?.fillRect(0, 0, o_state.o_canvas.width, o_state.o_canvas.height);
        let n_dist = f_o_vec2(o_state.o_trn__mouse-o_state.o_trn__ship).length();
        let o_trn__ship_new = o_state.o_trn__mouse.add(
            (o_state.o_trn__ship.subtract(o_state.o_trn__mouse)).multiply(0.95-((o_state.b_mousedown)?0.12:0))
        )
        // let n_ang_rad = f_o_vec2(o_trn__ship_new).angle(o_state.o_trn__mouse);
        let o_diff = o_state.o_trn__ship.subtract(o_state.o_trn__mouse)
        let n_ang_rad = Math.atan2(o_diff.y,o_diff.x)+(Math.PI/2)
        o_state.o_trn__ship = o_trn__ship_new
        console.log(o_state.o_trn__ship)

        o_state.o_ctx.fillStyle = "rgba(222,222,222,0.8)";
        f_draw_polygon(o_state.o_ctx, parseInt((Math.sin(o_state.n_id__raf*0.05)*.5+.5)*3+3), 20, n_ang_rad, o_state.o_trn__ship);
        // f_draw_polygon(o_state.o_ctx, parseInt((Math.sin(o_state.n_id__raf*0.05)*.5+.5)*6+3), 20, 0, o_state.o_trn__mouse);
        o_state.n_ms_last = n_ms_now
    }

}
let f_start_render = function(){
    o_state.n_id__raf = window.requestAnimationFrame(f_render);
}
let f_stop_render = function(){
    cancelAnimationFrame(o_state.n_id__raf);
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
    console.log(o_state.o_trn__mouse.toString())
}