// f_a_n_vec2 = [2,3];

import {
    f_measure_time 
}from "https://deno.land/x/date_functions@1.3/mod.js"

class O_vec_class{
    constructor(
        s_name, 
        n_dimensions, 
        a_a_s_name_component, 
        a_s_function
    ){
        this.s_name = s_name
        this.n_dimensions = n_dimensions        
        this.a_a_s_name_component = a_a_s_name_component
        this.a_s_function = a_s_function
    }
}
class O_vec_funtion{
    constructor(
        a_s_name,// first is main function, following are aliases 
        f_s_f__from_o_vec_class, 
        b_has_to_degrees_function = false,
        f_b_generate = ()=>{return true}
    ){
        this.a_s_name = a_s_name 
        this.f_s_f__from_o_vec_class = f_s_f__from_o_vec_class,
        this.b_has_to_degrees_function = b_has_to_degrees_function
        this.f_b_generate = f_b_generate
    }
}
let f_f_s_f__from_o_vec_class__from_params = function(
    f_s_function_params = ()=>{return ''}, 
    f_s_function_before_return = ()=>{return ''},
    f_a_s_valuereceivers_s_component_operation, 
    b_return_new_vector = true
){
    
    return function(o_vec_class){
        let a_s_valuereceivers_s_component_operation = f_a_s_valuereceivers_s_component_operation(
            o_vec_class
        )
        return `
        function(${f_s_function_params(o_vec_class)}){
            ${f_s_function_before_return(o_vec_class)}
            ${(()=>{
                if(b_return_new_vector){
                    return `return new ${o_vec_class.s_name}(
                        ${a_s_valuereceivers_s_component_operation.map(
                            a_s=>a_s.pop()
                        ).join(',')}
                    )`
                }else{
                    return `
                        ${a_s_valuereceivers_s_component_operation.map(
                            a_s=>a_s.join('=')
                        ).join(';')}
                        return this
                    `
                }
            })()}
        }

        `
    } 
}
let a_o_vec_function = [

    // all the functions that can return a new vector or be applied to the current vector itself
    ...[false, true].map(
        b =>{
            return [
                // js math. functions that require only one argument
                ...Object.getOwnPropertyNames(Math).map(s=>{

                    if(typeof Math[s] === 'function' && Math[s].length === 1){
                        return s;
                    }
                }).filter(v=>v).map(
                    s=>{
                        return [
                            [`math_${s}`, s], 
                            (o_vec_class)=>{return ''},
                            (o_vec_class)=>{return `
                            let b_all = arguments.length == 0
                            let a_v_arg = Array.from(arguments);
                            `},
                            (o_vec_class) => {
                                return o_vec_class.a_a_s_name_component.map(
                                    a_s_name_component =>{
                                        return [
                                            `this.${a_s_name_component[0]}`, 
                                            `(b_all || a_v_arg?.some(v=>${JSON.stringify(a_s_name_component)}.includes(v))) ? Math.${s}(this.${a_s_name_component[0]}): this.${a_s_name_component[0]}`
                                        ] 
                                    }
                                )
                            },
        
                        ]
                    }
                ),
                [
                    ['comps_to_int', 'to_int'], 
                    (o_vec_class)=>{return ''},
                    (o_vec_class)=>{return `
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    `},
                    (o_vec_class) => {
                        return o_vec_class.a_a_s_name_component.map(
                            a_s_name_component =>{
                                return [
                                    `this.${a_s_name_component[0]}`, 
                                    `(b_all || a_v_arg?.some(v=>${JSON.stringify(a_s_name_component)}.includes(v))) ? parseInt(this.${a_s_name_component[0]}): this.${a_s_name_component[0]}`
                                ] 
                            }
                        )
                    },

                ],
                ...[
                    {a_s_name: ['add' ], s_operator: '+'},
                    {a_s_name: ['sub' , 'subtract'], s_operator: '-'},
                    {a_s_name: ['mul' , 'multiply'], s_operator: '*'},
                    {a_s_name: ['div' , 'divide'], s_operator: '/'},
                ].map(
                    o=>{
                        return [
                            o.a_s_name, 
                            (o_vec_class)=>{return 'v'},
                            (o_vec_class)=>{return `const o_vec = (typeof v == 'number') ? new ${o_vec_class.s_name}(...arguments) : v`},
                            (o_vec_class) => {
                                return o_vec_class.a_a_s_name_component.map(
                                    a_s_name_component =>{
                                        return [
                                            `this.${a_s_name_component[0]}`, 
                                            `this.${a_s_name_component[0]} ${o.s_operator} o_vec.${a_s_name_component[0]}`
                                        ] 
                                    }
                                )
                            }
                        ]
                    }
                ),
                [
                    ['comps_to_int', 'to_int'],
                    (o_vec_class)=>{return ''},
                    (o_vec_class)=>{return `
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    `},
                    (o_vec_class) => {
                        return o_vec_class.a_a_s_name_component.map(
                            a_s_name_component =>{
                                return [
                                    `this.${a_s_name_component[0]}`, 
                                    `(b_all || a_v_arg?.some(v=>${JSON.stringify(a_s_name_component)}.includes(v))) ? parseInt(this.${a_s_name_component[0]}): this.${a_s_name_component[0]}`
                                ] 
                            }
                        )
                    },
                ],
                [
                    ['abs', 'absolute'],
                    (o_vec_class)=>{return ''},
                    (o_vec_class)=>{return `
                    let b_all = arguments.length == 0
                    let a_v_arg = Array.from(arguments);
                    `},
                    (o_vec_class) => {
                        return o_vec_class.a_a_s_name_component.map(
                            a_s_name_component =>{
                                return [
                                    `this.${a_s_name_component[0]}`, 
                                    `(b_all || a_v_arg?.some(v=>${JSON.stringify(a_s_name_component)}.includes(v))) ? Math.abs(this.${a_s_name_component[0]}): this.${a_s_name_component[0]}`
                                ] 
                            }
                        )
                    },
                ],
                [
                    ['norm', 'normalize'],
                    (o_vec_class)=>{return ''},
                    (o_vec_class)=>{return `
                    const n_length = this.length();
                    `},
                    (o_vec_class) => {
                        return o_vec_class.a_a_s_name_component.map(
                            a_s_name_component =>{
                                return [
                                    `this.${a_s_name_component[0]}`, 
                                    `this.${a_s_name_component[0]} / n_length`
                                ] 
                            }
                        )
                    },
                ],
                [
                    ['fract'],
                    (o_vec_class)=>{return ''},
                    (o_vec_class)=>{return ``},
                    (o_vec_class) => {
                        return o_vec_class.a_a_s_name_component.map(
                            a_s_name_component =>{
                                return [
                                    `this.${a_s_name_component[0]}`, 
                                    `this.${a_s_name_component[0]} % 1`
                                ] 
                            }
                        )
                    },
                ],
                [
                    ['mod'],
                    (o_vec_class)=>{return 'v'},
                    (o_vec_class)=>{return `
                    const o_vec = (typeof v == 'number') ? new ${o_vec_class.s_name}(...arguments) : v
                    `},
                    (o_vec_class) => {
                        return o_vec_class.a_a_s_name_component.map(
                            a_s_name_component =>{
                                return [
                                    `this.${a_s_name_component[0]}`, 
                                    `this.${a_s_name_component[0]} % o_vec.${a_s_name_component[0]}`
                                ] 
                            }
                        )
                    },
                ],
                
                [
                    ['clamp', 'clamp_minmax'], 
                    
                    (o_vec_class)=>{return `
                    o_vec_min, 
                    o_vec_max
                    `},
                    (o_vec_class)=>{return ``},
                    (o_vec_class) => {
                        return o_vec_class.a_a_s_name_component.map(
                            a_s_name_component =>{
                                return [
                                    `this.${a_s_name_component[0]}`, 
                                    `
                                    f_n_clamped(
                                        this.${a_s_name_component[0]}, 
                                        o_vec_min.${a_s_name_component[0]},
                                        o_vec_max.${a_s_name_component[0]},
                                    )`

                                ] 
                            }
                        )
                    },

                ],

                                
                [
                    ['wrap', 'wrap_minmax'], 
                    
                    (o_vec_class)=>{return `
                    o_vec_min, 
                    o_vec_max
                    `},
                    (o_vec_class)=>{return ``},
                    (o_vec_class) => {
                        return o_vec_class.a_a_s_name_component.map(
                            a_s_name_component =>{
                                return [
                                    `this.${a_s_name_component[0]}`, 
                                    `
                                    f_n_wrapped(
                                        this.${a_s_name_component[0]}, 
                                        o_vec_min.${a_s_name_component[0]},
                                        o_vec_max.${a_s_name_component[0]},
                                    )`

                                ] 
                            }
                        )
                    },

                ]

            ].map(
                a_v =>{
                    let a_s_name = a_v[0]
                    if(b){
                        a_s_name = a_s_name.map(s=>`${s}eq`)
                    }
                    return new O_vec_funtion(
                        a_s_name,
                        f_f_s_f__from_o_vec_class__from_params(
                            a_v[1],
                            a_v[2],
                            a_v[3],
                            !b, 
                        ),
                    )
                }
            )
        }
    ).flat(),


    new O_vec_funtion(
        ['f_n_idx__from_o_scl', 'to_index', 'to_idx'], 
        function(o_vec_class){
            let a_a_s = o_vec_class.a_a_s_name_component
            return `
            function(o_scl){
                return (
                ${[
                    `(parseInt(this.${a_a_s?.[0]?.[0]}) % parseInt(o_scl.${a_a_s?.[0]?.[0]}))`,
                    `+ (parseInt(this.${a_a_s?.[1]?.[0]}) * parseInt(o_scl.${a_a_s?.[0]?.[0]}))`,
                    `+ (parseInt(this.${a_a_s?.[2]?.[0]}) * parseInt(o_scl.${a_a_s?.[0]?.[0]}) * parseInt(o_scl.${a_a_s?.[1]?.[0]}))`,
                    `+ (parseInt(this.${a_a_s?.[3]?.[0]}) * parseInt(o_scl.${a_a_s?.[0]?.[0]}) * parseInt(o_scl.${a_a_s?.[1]?.[0]} * parseInt(o_scl.${a_a_s?.[2]?.[0]})))`   
                ].slice(0,o_vec_class.n_dimensions).join('\n')}
                )
            }

            `
        } 
    ),
    new O_vec_funtion(
        ['f_o_trn__from_n_idx', 'from_index', 'from_idx'], 
        function(o_vec_class){
            let a_a_s = o_vec_class.a_a_s_name_component
            return `
            function(n_idx){
                n_idx = parseInt(n_idx)

                return new ${o_vec_class.s_name}(
                ${[
                    `(n_idx % parseInt(this.${a_a_s?.[0]?.[0]}))`,
                    `parseInt(n_idx / parseInt(this.${a_a_s?.[0]?.[0]}))`,
                    `parseInt(n_idx / parseInt(this.${a_a_s?.[0]?.[0]}) * parseInt(this.${a_a_s?.[1]?.[0]}))`,
                    `parseInt(n_idx / parseInt(this.${a_a_s?.[0]?.[0]}) * parseInt(this.${a_a_s?.[1]?.[0]}) * parseInt(this.${a_a_s?.[2]?.[0]}))`   
                ].slice(0,o_vec_class.n_dimensions).join(',\n')}
                )
            }

            `
        } 
    ),
    ...[
        {a_s_name: ['f_n_sum_comps','compsadd' ], s_operator: '+', n_start:0},
        {a_s_name: ['f_n_diff_comps','compssub' ], s_operator: '-', n_start:0},
        {a_s_name: ['f_n_prod_comps','compsmul' ], s_operator: '*', n_start:1},
        {a_s_name: ['f_n_quot_comps','compsdiv' ], s_operator: '/', n_start:1},
    ].map(
        o=>{
            return new O_vec_funtion(
                o.a_s_name, 
                function(o_vec_class){
                    return `
                        function(){
                            return ${o.n_start}
                            ${o_vec_class.a_a_s_name_component.map(
                                a_s_name_component =>{
                                    return `${o.s_operator} this.${a_s_name_component[0]}`
                                }
                            ).join('\n')}
                        }
                    `
                }
        
            )
        }
    ),

    new O_vec_funtion(
        ['dot', 'dotproduct'], 
        function(o_vec_class){
            return `
            function(v){
                const o_vec = (typeof v == 'number') ? new ${o_vec_class.s_name}(...arguments) : v
                return ${o_vec_class.a_a_s_name_component.map(
                    a_s_name_component =>{
                        return `this.${a_s_name_component[0]} * o_vec.${a_s_name_component[0]}`
                    }
                ).join('+\n')}
            }

            `
        } 
    ),
    new O_vec_funtion(
        ['len', 'length'], 
        function(o_vec_class){
            return `
            function(){
                return Math.sqrt(${o_vec_class.a_a_s_name_component.map(
                    a_s_name_component =>{
                        return `this.${a_s_name_component[0]} * this.${a_s_name_component[0]}`
                    }
                ).join('+')})
            }

            `
        } 
    ), 
    new O_vec_funtion(
        ['clone', 'cln'], 
        function(o_vec_class){
            return `
            function(){
                return new ${o_vec_class.s_name}(
                    ${o_vec_class.a_a_s_name_component.map(
                        a_s_name_component =>{
                            return `this.${a_s_name_component[0]}`
                        }
                    ).join(',')}
                )

            }

            `
        } 
    ),
    new O_vec_funtion(
        ['sangle', 'smallestangle', 'shortestangle'], 
        function(o_vec_class){
            return `
            function(v){
                const o_vec = (typeof v == 'number') ? new ${o_vec_class.s_name}(...arguments) : v
                return Math.acos(
                    this.dot(o_vec)/(this.length()*o_vec.length())
                )
            }

            `
        },
        true 
    ),
    new O_vec_funtion(
        ['hangle', 'horizontalangle'], 
        function(o_vec_class){
            return `
            function(v){
                const o_vec = (typeof v == 'number') ? new ${o_vec_class.s_name}(...arguments) : v
                let o_vec_diff = this.sub(o_vec);
                return Math.atan2(
                    o_vec_diff.${o_vec_class.a_a_s_name_component[0][0]},
                    o_vec_diff.${o_vec_class.a_a_s_name_component[1][0]}
                )
            }

            `
        },
        true, 
        (o_vec_class)=>{return o_vec_class.n_dimensions == 2}

    ),
    ...[0,1].map(
        (n)=>{
            return new O_vec_funtion(
                [`cross${(n == 0) ? '' : 'eq'}`, `crossproduct${(n == 0) ? '' : 'eq'}` ], 
                function(o_vec_class){
                    return `
                    function(v){
                        const o_vec = (typeof v == 'number') ? new ${o_vec_class.s_name}(...arguments) : v
        
                        const o_vec_a = new ${o_vec_class.s_name}(
                            ${o_vec_class.a_a_s_name_component.map(
                                (v, n_idx)=>{
                                    n_idx = (n_idx+1)%o_vec_class.n_dimensions
                                    return `this.${o_vec_class.a_a_s_name_component[n_idx][0]}`
                                }
                            ).join(',')}
                        )
                        const o_vec_b = new ${o_vec_class.s_name}(
                            ${o_vec_class.a_a_s_name_component.map(
                                (v, n_idx)=>{
                                    n_idx = (n_idx+2)%o_vec_class.n_dimensions
                                    return `o_vec.${o_vec_class.a_a_s_name_component[n_idx][0]}`
                                }
                            ).join(',')}
                        )
                        const o_vec_c = new ${o_vec_class.s_name}(
                            ${o_vec_class.a_a_s_name_component.map(
                                (v, n_idx)=>{
                                    n_idx = (n_idx+2)%o_vec_class.n_dimensions
                                    return `this.${o_vec_class.a_a_s_name_component[n_idx][0]}`
                                }
                            ).join(',')}
                        )
                        const o_vec_d = new ${o_vec_class.s_name}(
                            ${o_vec_class.a_a_s_name_component.map(
                                (v, n_idx)=>{
                                    n_idx = (n_idx+1)%o_vec_class.n_dimensions
                                    return `o_vec.${o_vec_class.a_a_s_name_component[n_idx][0]}`
                                }
                            ).join(',')}
                        )
                        ${
                            (()=>{
                                if(n == 0){
                                    return `
                                    return new ${o_vec_class.s_name}(
                                    ${o_vec_class.a_a_s_name_component.map(
                                        a_s_name_component =>{
                                            return `this.${a_s_name_component[0]} = o_vec_a.${a_s_name_component[0]} * o_vec_b.${a_s_name_component[0]} - o_vec_c.${a_s_name_component[0]} * o_vec_d.${a_s_name_component[0]}`
                                        }
                                    ).join(',\n')}
                                    )
                                    `
                                }else{
                                    return `
                                    ${o_vec_class.a_a_s_name_component.map(
                                        a_s_name_component =>{
                                            return `this.${a_s_name_component[0]} = o_vec_a.${a_s_name_component[0]} * o_vec_b.${a_s_name_component[0]} - o_vec_c.${a_s_name_component[0]} * o_vec_d.${a_s_name_component[0]}`
                                        }
                                    ).join(',\n')}
                                    return this
                                    `
                                }
                            })()
                        }
                    }
        
                    `
                } 
            )
            
        }
    ),



]


let a_a_s_name_component_x =  ['n_x', 'x', '0']
let a_a_s_name_component_y =  ['n_y', 'y', '1']
let a_a_s_name_component_z =  ['n_z', 'z', '2']
let a_a_s_name_component_w =  ['n_w', 'w', '3']

let a_o_vec_class = [
    new O_vec_class(
        "O_vec1",
        1, 
        [
            a_a_s_name_component_x,
        ]
    ), 
    new O_vec_class(
        "O_vec2",
        2, 
        [
            a_a_s_name_component_x,
            a_a_s_name_component_y,
        ]
    ), 
    new O_vec_class(
        "O_vec3",
        3, 
        [
            a_a_s_name_component_x,
            a_a_s_name_component_y,
            a_a_s_name_component_z,
        ]
    ),
    new O_vec_class(
        "O_vec4",
        4, 
        [
            a_a_s_name_component_x,
            a_a_s_name_component_y,
            a_a_s_name_component_z,
            a_a_s_name_component_w,
        ]
    )
]

let f_s_js__from_o_vec_class = function(
    o_vec_class
){
    return `
class ${o_vec_class.s_name}{
    constructor(
        ${o_vec_class.a_a_s_name_component.map(
            a_s_name_component => a_s_name_component[0]
        ).join(',\n')}
    ){

        if(typeof ${o_vec_class.a_a_s_name_component[0][0]} === 'object'){
            let o = ${o_vec_class.a_a_s_name_component[0][0]}
            ${o_vec_class.a_a_s_name_component.map(
                a_s=>{
                    return `${a_s[0]} = o.${a_s[0]}`
                }
            ).join('\n')}
        }

        ${o_vec_class.a_a_s_name_component.map(
            (a_s_name_component, n_idx) =>{
                let a_s = ['0', ...o_vec_class.a_a_s_name_component.map(a_s=>{return `this.${a_s[0]}`})]
                return `
                
                this.${a_s_name_component[0]} = (typeof ${a_s_name_component[0]} === 'number') ? ${a_s_name_component[0]} : ${a_s[n_idx]}
                `
                // return `this.${a_s_name_component[0]} = (${a_s_name_component[0]});`
            }
        ).join('\n')}
    }
    toString(){
        return '('+${o_vec_class.a_a_s_name_component.map(
            a_s_name_component =>{
                return `this.${a_s_name_component[0]}.toString()`
            }
        ).join("+','+")}+')'
    }
    ${o_vec_class.a_a_s_name_component.map(
        a_s_name_component =>{
            let s_name_component_main = a_s_name_component[0]
            return a_s_name_component.slice(1).map(
                s_name_component =>{
                    return `
                    get ${s_name_component}(){
                        return this.${s_name_component_main}
                    }
                    set ${s_name_component}(v){
                        this.${s_name_component_main} = v
                    }
                    `
                }
            ).join('\n')

        }
    ).join('\n')}

    get a_n_comp(){
        return [
            ${o_vec_class.a_a_s_name_component.map(
                (a_s_name_component, n_idx) =>{
                    return `this.${a_s_name_component[0]}`
                }
            ).join(',\n')}
        ]
    }
    ${


        (()=>{
            // vector swizzling
            let n_total_combinations = Math.pow(o_vec_class.n_dimensions, o_vec_class.n_dimensions);
            let a_a_n_idx = []
            if(o_vec_class.n_dimensions > 1){

                for (let n = 0; n < n_total_combinations; n++) {
                    let a_n_idx = [];
                    // Convert the number to base 3 and pad it with zeros to ensure it has 3 digits
                    let base3String = n.toString(o_vec_class.n_dimensions).padStart(o_vec_class.n_dimensions, '0');
                    for (let n2 = 0; n2 < o_vec_class.n_dimensions; n2++) {
                        // Convert each character back to an integer and add to the index array
                        a_n_idx.push(parseInt(base3String[n2], o_vec_class.n_dimensions));
                    }
                    // console.log(n);
                    // console.log(a_n_idx);
                    a_a_n_idx.push(a_n_idx)
                }
            }
            return a_a_n_idx.map((a_n_idx)=>{
                return `get ${a_n_idx.map(n=>o_vec_class.a_a_s_name_component[n][1]).join('')}(){
                    return new ${o_vec_class.s_name}(
                        ${a_n_idx.map(n=>`this.${o_vec_class.a_a_s_name_component[n][0]}`).join(',')}
                    )
                }`
            }).join('\n')

        })()
    }
}
${o_vec_class.s_name}.n_tau = Math.PI * 2
${a_o_vec_function.map(o_vec_function=>{
    console.log(o_vec_function)
    if(!o_vec_function.f_b_generate(o_vec_class)){
        return ''
    }

    let s_name_main = o_vec_function.a_s_name[0]
    let s_func = o_vec_function.f_s_f__from_o_vec_class(o_vec_class)
    return `
    ${o_vec_class.s_name}.prototype.${s_name_main} = ${s_func}
    ${o_vec_function.a_s_name.slice(1).map(s_name=>{
        return `${o_vec_class.s_name}.prototype.${s_name} = ${o_vec_class.s_name}.prototype.${s_name_main}`
    }).join('\n')}
    ${(()=>{
        if(o_vec_function.b_has_to_degrees_function){
            return o_vec_function.a_s_name.slice(0).map(s_name=>{
                return `${o_vec_class.s_name}.prototype.${s_name}_deg = function(){
                    return (${o_vec_class.s_name}.prototype.${s_name_main}.call(this,...arguments)/${o_vec_class.s_name}.n_tau)*360
                }`
            }).join('\n')
        }
        return ''
    })()}
    ` 
}).filter(v=>v!= '').join('\n')}

export {${o_vec_class.s_name}}
    `
}

let a_s_js = a_o_vec_class.map(o=>f_s_js__from_o_vec_class(o)).join('\n');
await Deno.writeTextFile('created_dynamic_generated.js',
`
import { 
    f_n_wrapped,
    f_n_clamped
} from './module.js'
${a_s_js}`
);