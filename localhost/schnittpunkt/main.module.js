import {
    O_vec2,
    O_vec3,
    O_vec4,
} from "../module.js"

let n_tau = (Math.PI*2)
let o_canvas = document.createElement('canvas');

let f_a_a_n_eliminated = function(
    a_a_n
){
   
    let n_factor = a_a_n[1][0] / a_a_n[0][0];
    console.log(n_factor)
    let a_n_res = a_a_n[1].map(
        (n, n_idx)=>{
            return n - (a_a_n[0][n_idx] * n_factor)
        }
    )
    return [
        a_a_n[0],
        a_n_res, 
    ]

}
let f_n__solved = function(
    a_n__equation, // [+1x, +2y, +3z, =6]
    a_n__variablevalues, // [1, null, 3]
){
    
    if(a_n__variablevalues.filter(v=>v===null || v===undefined).length != 1){
        throw Error(`cannot solve , to many unknown variables null or undefined are unknown ${a_n__variablevalues}`)
    }
    let n_idx_unknown_var = a_n__variablevalues.indexOf(null);
    if(n_idx_unknown_var == -1){a_n__variablevalues.indexOf(undefined)}
    let n_coefficient_unknown_var = a_n__equation[n_idx_unknown_var];
    let n_sum = 0;
    for(let n_idx in a_n__variablevalues){
        if(
            a_n__variablevalues[n_idx] == null
            || 
            a_n__variablevalues[n_idx] == undefined
            ){
                continue
        }
        n_sum += a_n__variablevalues[n_idx] * a_n__equation[n_idx]
    }
    debugger
    let n_value_unknown_var = (
        a_n__equation.at(-1)
         - n_sum
         )
         /n_coefficient_unknown_var;
    return n_value_unknown_var;
}
let f_solve_linear_equation_system = function(
    a_a_n, // [[1,2, =4], [2,3, =3]]
    // [
    //     [1, 2, 4, =5]
    //     [2, 3, 4, =1]
    //     [1, 2, 7, =2]
    // ]
){
    let n_zeros = 0;
    for(let n_idx in a_a_n){
        let a_n__wihtout_zero = a_a_n
    }
    let a_a_n_res = f_a_a_n_eliminated(
        a_a_n
    );
    let a_n_res = a_a_n_res.at(-1);
    let n_vlast = a_n_res.at(-1)/ a_n_res.at(-2); // -5 / -1 -> 5 , y=5 
    console.log(n_vlast)
    // 1x + 2y = 4 
    // 1x  = (4-2y)/1
    let n_vsecondlast = f_n__solved(
        a_a_n[0], 
        [null, n_vlast]
    )
    // (a_a_n[0].at(-1)-a_a_n[0].at(-2)*n_vlast)/a_a_n[0][0]
    
    return [n_vsecondlast, n_vlast]
}
f_solve_linear_equation_system(
    [
        [2,3,6],
        [4,9,15]
    ]
)
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