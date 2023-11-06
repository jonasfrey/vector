import {
    O_vec2,
    O_vec3,
    O_vec4,
} from "../module.js"

let n_tau = (Math.PI*2)
let o_canvas = document.createElement('canvas');

window.o_state = {
    a_o_trn: [
        new O_vec2(0),
        new O_vec2(0),
        new O_vec2(0),
        new O_vec2(0),
    ],
    a_o_trn_diff: [
        new O_vec2(0),
        new O_vec2(0),
    ],
    n_idx__a_o_trn: 0,
    o_trn__mouse : new O_vec2(0),
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
window.onresize = function(){
    f_resize()

}
f_resize()
window.oncontextmenu = function(){
    return false
}
window.onmousedown = function(o_e){
    o_e.preventDefault();
    o_state.b_mousedown_l = (o_e.button == 0) ? true : o_state.b_mousedown_l;
    o_state.b_mousedown_m = (o_e.button == 1) ? true : o_state.b_mousedown_m;
    o_state.b_mousedown_r = (o_e.button == 2) ? true : o_state.b_mousedown_r;
    o_state.n_idx__a_o_trn = (o_state.n_idx__a_o_trn+1)%o_state.a_o_trn.length;
    o_state.a_o_trn[o_state.n_idx__a_o_trn] = new O_vec2(
        o_e.clientX,
        o_e.clientY,
    )
    
    for(let n_idx in o_state.a_o_trn){
        n_idx = parseInt(n_idx)
        let o_trn = o_state.a_o_trn[n_idx];
        if((n_idx+1) % 2 == 0){
            o_state.a_o_trn_diff[parseInt((n_idx+1)/2)] = o_trn.sub(
                o_state.a_o_trn[n_idx-1]
            )
        }
    }

    // console.log(o_state.a_o_trn)
}
window.onmouseup = function(o_e){
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

        o_state.o_ctx.fillStyle = `rgba(0.1,0.1,0.1,${(o_state.b_mousedown) ? '0.06': '0.33'})`;
        o_state.o_ctx?.fillRect(0, 0, o_state.o_canvas.width, o_state.o_canvas.height);

        o_state.o_ctx.fillStyle = `rgba(0.1,0.1,0.1,${(o_state.b_mousedown) ? '0.06': '0.33'})`;
        o_state.o_ctx?.fillRect(0, 0, o_state.o_canvas.width, o_state.o_canvas.height);

        //
        for(let n_idx in o_state.a_o_trn){
            n_idx = parseInt(n_idx)
            let o_trn = o_state.a_o_trn[n_idx];
            if((n_idx+1) % 2 == 0){
                o_state.o_ctx.strokeStyle = 'red'

                o_state.o_ctx.beginPath();
                let o1 = o_state.a_o_trn[n_idx-1];
                o_state.o_ctx.moveTo(
                    ...o1.a_n_comp
                )
                o_state.o_ctx.lineTo(...o_trn.a_n_comp)
                o_state.o_ctx.stroke(); 
            }
            if(n_idx == (o_state.n_idx__a_o_trn+1)%o_state.a_o_trn.length){
                o_state.o_ctx.fillStyle = 'green'
            }else{
                o_state.o_ctx.fillStyle = 'red'
            }
            o_state.o_ctx.beginPath();
            o_state.o_ctx.arc(
                o_trn.n_x,
                o_trn.n_y,
                10,
                0, 
                2*Math.PI)
            o_state.o_ctx.fill(); 


            
            o_state.o_ctx.fillStyle = 'rgba(222,200,222,0.7)'
            o_state.o_ctx.beginPath();
            o_state.o_ctx.arc(
                o_state.o_trn__mouse.n_x,
                o_state.o_trn__mouse.n_y,
                10,
                0, 
                2*Math.PI)
            o_state.o_ctx.fill(); 
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