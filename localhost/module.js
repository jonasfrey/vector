class O_comp{
    constructor(
        value
    ){
        this.value = value
    }
}
let a_a_s_name_comp = [
        ['x','n_x','0'],
        ['y','n_y','1'],
        ['z','n_z','2'],
        ['w','n_w','3'],
]
// let o_s_name_comp_n_idx = Object.assign(
//     {},
//     ...a_a_s_name_comp.map(
//     (val, n_idx)=>{
//         return val.map((s_prop)=>{
//             return {
//                 [s_prop]: n_idx
//             }
//         })
//     }
//     ).flat(1)
// )
// console.log(o_s_name_comp_n_idx)

let f_a_n__with_callback = function(
    a_n__to_add_to,
    a_a_n, 
    f_callback
){
    return a_n__to_add_to.map((value, n_idx)=>{
        
        for(let a_n of a_a_n){
            let n2 = a_n[n_idx];
            if(n2 == undefined || n2 == null){
                n2 = a_n[0]
            }
            value = f_callback(value, n2)
        }
        return value
    })
}
let f_a_a_n__from_a_v_arg = function(){
    let a_a_n = []
    let o_vec = arguments[0]
    let a_v_arg = Array.from(arguments).slice(1); 
    if(
        // if all arguments are numbers and same amount of numbers as the vector
        // we can use them to construct a new vector
        // shortcut for
        // ovec2.add(5,3) <=> ovec2.add(f_o_vec2(5,3))
        // however this would not work
        // ovec4.add(5,3, f_o_vec2(2,3)) <!=> ovec4.add(f_o_vec4(5,3,2,3))
        // ovec4.add(5,3, f_o_vec2(2,3)) <=> ovec4.add(f_o_vec4(5), f_o_vec4(3),f_o_vec4(2))
        o_vec.a_o_comp.length == a_v_arg.length
        && 
        a_v_arg.filter(v=>typeof v != 'number').length == 0
        ){
        let o_vec_arg = f_o_vec_n(o_vec.a_o_comp.length, ...a_v_arg);
        a_a_n.push(o_vec_arg.a_o_comp.map(o=>o.value))
    }else{
        a_a_n.push(
            ...Array.from(a_v_arg).map(
                v => {
                    let a = f_a_n__from_a_v_arg([v]);
                    return a
                }
            )
        )
    }
    return a_a_n
}
let f_o_vec2__operated = function(
    f_callback, 
    a_n__to_add_to, 
    a_a_n
){

    let a_n_result = f_a_n__with_callback(
        a_n__to_add_to,
        a_a_n,
        f_callback
    )
    // console.log('add called')
    let o_vec = new O_vec(a_n_result.map(n=>new O_comp(n)))
    return o_vec
}

window.o_s_name_fun_f = {}

o_s_name_fun_f.add = function(){
    console.log('add call')
    return f_o_vec2__operated(
        (value, n2)=>{return value+n2}, 
        this.a_o_comp.map(o=>o.value),
        f_a_a_n__from_a_v_arg(this,...arguments)
    )
},
o_s_name_fun_f.subtract = function(){
    return f_o_vec2__operated(
        (value, n2)=>{return value-n2}, 
        this.a_o_comp.map(o=>o.value),
        f_a_a_n__from_a_v_arg(this,...arguments)
    )
},
o_s_name_fun_f.multiply = function(){
    return f_o_vec2__operated(
        (value, n2)=>{return value*n2}, 
        this.a_o_comp.map(o=>o.value),
        f_a_a_n__from_a_v_arg(this,...arguments)
    )
},
o_s_name_fun_f.divide = function(){
    return f_o_vec2__operated(
        (value, n2)=>{return value/n2}, 
        this.a_o_comp.map(o=>o.value),
        f_a_a_n__from_a_v_arg(this,...arguments)
    )
},
o_s_name_fun_f.length = function(){
    return Math.sqrt(this.a_o_comp.reduce((o_prev, o_curr)=>{
        o_prev+=Math.pow(o_curr.value,2)
        return o_prev
    }, 0))
},
o_s_name_fun_f.normalize = function(){
    return this.divide(this.length());
}
o_s_name_fun_f.fract = function(){
    return new O_vec(
        this.a_o_comp.map((o)=>{
            return new O_comp(o.value % 1);
        })
    );
}
o_s_name_fun_f.componentsadded = function(){
    return this.a_o_comp.reduce((n_prev, o_curr)=>{
        n_prev+=o_curr.value
        return n_prev
    }, 0)
}
o_s_name_fun_f.componentssubtracted = function(){
    return this.a_o_comp.reduce((n_prev, o_curr)=>{
        n_prev-=o_curr.value
        return n_prev
    }, 0)
}
o_s_name_fun_f.componentsmultiplied = function(){
    let n = 1;
    for(let n_idx = 1; n_idx < this.a_o_comp.length; n_idx+=1){
        n*=this.a_o_comp[n_idx].value;
    }
    return n
}
o_s_name_fun_f.componentsdivided = function(){
    let n = 1;
    for(let n_idx = 1; n_idx < this.a_o_comp.length; n_idx+=1){
        n/=this.a_o_comp[n_idx].value;
    }
    return n
}
o_s_name_fun_f.dot = function(){
    let o_new = this.multiply(...arguments);
    return o_new.componentsadded();
}
o_s_name_fun_f.cross = function(){
    let o_vec_for_op = arguments[0];

    if(
        (arguments.length == this.a_o_comp.length || arguments.length == 1)
        && 
        Array.from(arguments).filter(v=>typeof v != 'number').length == 0
    ){
        o_vec_for_op = f_o_vec_n(this.a_o_comp.length, ...arguments)
    }

    let o_vec_a = new O_vec(new Array(this.a_o_comp.length).fill(0).map((v, n_idx)=>{
        n_idx = (n_idx+1)%this.a_o_comp.length
        return this.a_o_comp[n_idx]
    }))
    let o_vec_b = new O_vec(new Array(this.a_o_comp.length).fill(0).map((v, n_idx)=>{
        n_idx = (n_idx+2)%this.a_o_comp.length
        return o_vec_for_op.a_o_comp[n_idx]
    }))
    let o_vec_c = new O_vec(new Array(this.a_o_comp.length).fill(0).map((v, n_idx)=>{
        n_idx = (n_idx+2)%this.a_o_comp.length
        return this.a_o_comp[n_idx]
    }))
    let o_vec_d = new O_vec(new Array(this.a_o_comp.length).fill(0).map((v, n_idx)=>{
        n_idx = (n_idx+1)%this.a_o_comp.length
        return o_vec_for_op.a_o_comp[n_idx]
    }))
    let o_vres = o_vec_a.multiply(o_vec_b).subtract(o_vec_c.multiply(o_vec_d))
    return o_vres
}
o_s_name_fun_f.angle = function(){
    let o_vec_for_op = arguments[0];
    if(
        (arguments.length == this.a_o_comp.length || arguments.length == 1)
        && 
        Array.from(arguments).filter(v=>typeof v != 'number').length == 0
    ){
        o_vec_for_op = f_o_vec_n(this.a_o_comp.length, ...arguments)
    }
    let n_acos = (this.dot(o_vec_for_op))/(this.length()*o_vec_for_op.length())
    return Math.acos(n_acos);
}

o_s_name_fun_f.angle_deg = function(){
    return ((this.angle(...arguments)/(Math.PI * 2))*360)
}

//     // 'invert': function(a_o_comp){

//     // },
//     // 'mix': function(a_o_comp){

//     // },
//     // 'normalize': function(a_o_comp){

//     // },
//     // 'limit': function(a_o_comp){

//     // },
//     // 'unfloat': function(a_o_comp){

//     // },
//     // 'rotate': function(a_o_comp){

//     // },
//     // 'rotateDeg': function(a_o_comp){

//     // },
//     // 'rotateBy': function(a_o_comp){

//     // },
//     // 'rotateByDeg': function(a_o_comp){

//     // },
//     // 'randomize': function(a_o_comp){

//     // },
//     // 'dot': function(a_o_comp){

//     // },
//     // 'cross': function(a_o_comp){

//     // },

//     // 'lengthSq': function(a_o_comp){

//     // },
//     // 'distance': function(a_o_comp){

//     // },
//     // 'horizontalAngle': function(a_o_comp){

//     // },
//     // 'verticalAngle': function(a_o_comp){

//     // },
// };

let f_n_idx_a_o_comp__from_s_name_prop = function(s_name_prop){
    let n_idx_a_o_comp = null;
    for(let n_idx in a_a_s_name_comp){
        let a_s_name_comp = a_a_s_name_comp[n_idx];
        if(a_s_name_comp.indexOf(s_name_prop)!=-1){
            n_idx_a_o_comp = parseInt(n_idx);
            break
        }
    }
    return n_idx_a_o_comp
                    
}

class O_vec{
    constructor(a_o_comp){
        this.a_o_comp = a_o_comp
        return new Proxy(
            this, 
            {
                get:function(o_target, s_prop, o_receiver){
                    
                    let n_idx_a_o_comp = f_n_idx_a_o_comp__from_s_name_prop(s_prop);

                    if(n_idx_a_o_comp != null){
                        let n_ret = o_target.a_o_comp[n_idx_a_o_comp].value;
                        return n_ret;
                    }
                    let s_name_fun = s_prop
                    let b_eq = false;
                    if(s_prop.toString().endsWith('eq')){
                        s_name_fun = s_name_fun.slice(0,-2);
                        b_eq = true
                    }
                    if(Object.keys(o_s_name_fun_f).includes(s_name_fun)){
                        let f = o_s_name_fun_f[s_name_fun];
                        if(typeof f == 'function'){
                            return function(){            
                                let o_vec_new = f.apply(this, arguments)
                                if(b_eq){
                                    this.a_o_comp = o_vec_new.a_o_comp;
                                    return this
                                }
                                return o_vec_new;
                            }
                        }
                    }
                    let val_reflect = Reflect.get(o_target, s_prop, o_receiver);
                    return val_reflect
                }, 
                set(o_target, s_name_prop, value) {
                    let n_idx_a_o_comp = f_n_idx_a_o_comp__from_s_name_prop(s_name_prop);
                    if(n_idx_a_o_comp != null){

                        o_target.a_o_comp[n_idx_a_o_comp].value = value;
                        return o_target.a_o_comp[n_idx_a_o_comp].value
                    }
                    // The default behavior to store the value
                    o_target[s_name_prop] = value;
                    return o_target[s_name_prop];

                  },
            }
        )
    }
    toString(){
        return `(${this.a_o_comp.map(o=>o.value).join(',')})`    
    }


}
let f_a_n__from_a_v_arg = (a_v_arg)=>{
    return Array.from(a_v_arg).map(v=>{
        if(typeof v == 'number'){
            return [v]
        }
        if(v instanceof O_vec){
            return [v.a_o_comp.map(o=>o.value)]
        }
        return Object.values(v)
    }).flat(2);
}

let f_o_vec_n = function(
    n_dimensions
){
    let a_n = f_a_n__from_a_v_arg(Array.prototype.slice.call(arguments, 1))
    // console.log(a_n)
    let n_before = 0;
    let a_o_comp = new Array(n_dimensions).fill(0).map((val, n_idx)=>{
        let n = a_n[n_idx];
        if(!n){
            n = n_before
        }
        n_before = n
        return new O_comp(n)
    })

    return new O_vec(a_o_comp)
}
let f_o_vec2 = function(){
    return f_o_vec_n(2, ...arguments)
}
let f_o_vec3 = function(){
    return f_o_vec_n(3, ...arguments)
}
let f_o_vec4 = function(){
    return f_o_vec_n(4, ...arguments)
}
export {
    f_o_vec2, 
    f_o_vec3, 
    f_o_vec4
}

// // what i want to be able to do 
// let o_vec = f_o_vec3(2); // results in o_vec(2,2,2)
// let o_v2 = o_vec.add(3, f_o_vec2(1), 2);// results in (2,2,2)+(3,3,3)+(1,1)+(2,2,2) => (8,8,7)

