// f_a_n_vec2 = [2,3];

import {
    f_measure_time 
}from "https://deno.land/x/date_functions@1.3/mod.js"

import {
    O_vec2 as O_vec2_dyn 
}from "./created_dynamic_generated.js"
// test speed 
let n_its = 100000000;



var o_vec2_1 = new O_vec2_dyn(2,3)
var o_vec2_2 = new O_vec2_dyn(2,3)
f_measure_time('class instance dyn')
for(let n = 0; n < n_its; n+=1){
    let o_vec3 = o_vec2_1.add(2,3).sub(2,3).mul(2,3).div(2,3);
}
f_measure_time('')



let a_n_vec2_t1 = new Int16Array([2,3]);
let a_n_vec2_t2 = new Int16Array([2,3]);
f_measure_time('typed array')
for(let n = 0; n < n_its; n+=1){
    for(let n_idx =0 ; n_idx < a_n_vec2_t1.length; n_idx+=1){
        let n1 = a_n_vec2_t2[n_idx]
        a_n_vec2_t2[n_idx] = 1 + a_n_vec2_t1[n_idx] - a_n_vec2_t1[n_idx] * a_n_vec2_t1[n_idx] / a_n_vec2_t1[n_idx]
    }
}
console.log(a_n_vec2_t2)
f_measure_time('')


let a_n_vec2_1 = [2,3];
let a_n_vec2_2 = [2,3];
f_measure_time('non typed array')
for(let n = 0; n < n_its; n+=1){
    for(let n_idx =0 ; n_idx < a_n_vec2_1.length; n_idx+=1){
        let n1 = a_n_vec2_2[n_idx]
        a_n_vec2_2[n_idx] = 1 + a_n_vec2_1[n_idx] - a_n_vec2_1[n_idx] * a_n_vec2_1[n_idx] / a_n_vec2_1[n_idx]
    }
}
console.log(a_n_vec2_2)
f_measure_time('')


var o_vec2_1 = {x:2,y:3}
var o_vec2_2 = {x:4,y:6}
f_measure_time('object without loop')
for(let n = 0; n < n_its; n+=1){
    o_vec2_2.x = 1+o_vec2_1.x- o_vec2_1.x * o_vec2_1.x / o_vec2_1.x
    o_vec2_2.y = 1+o_vec2_1.y- o_vec2_1.y * o_vec2_1.y / o_vec2_1.y
}
console.log(a_n_vec2_2)
f_measure_time('')



var o_vec2_1 = {x:2,y:3}
var o_vec2_2 = {x:4,y:6}
f_measure_time('object with loop')
for(let n = 0; n < n_its; n+=1){
    for(let s_prop of ['x','y']){
        o_vec2_2[s_prop] = 1+o_vec2_1[s_prop]- o_vec2_1[s_prop] * o_vec2_1[s_prop] / o_vec2_1[s_prop]
    }
}
console.log(a_n_vec2_2)
f_measure_time('')





// var o_vec2_1 = f_o_vec2(2,3)
// var o_vec2_2 = f_o_vec2(2,3)
// f_measure_time('my slow lib')
// let o_vec3 = o_vec2_1.add(2,3)
// console.log
// // for(let n = 0; n < n_its; n+=1){
// //     let o_vec3 = o_vec2_1.add(2,3)
// //     //.sub(2,3).mul(2,3).div(2,3);

// // }
// // console.log(a_n_vec2_2)
// // f_measure_time('')
