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
        b_has_to_degrees_function
    ){
        this.a_s_name = a_s_name 
        this.f_s_f__from_o_vec_class = f_s_f__from_o_vec_class,
        this.b_has_to_degrees_function = b_has_to_degrees_function
    }
}
let a_o_vec_function = [
    ...[
        {a_s_name: ['add' ], s_operator: '+', b_return_new : true},
        {a_s_name: ['addeq' ], s_operator: '+=', b_return_new : false},
        {a_s_name: ['sub' , 'subtract'], s_operator: '-', b_return_new : true},
        {a_s_name: ['subeq' , 'subtracteq'], s_operator: '-=', b_return_new : false},
        {a_s_name: ['mul' , 'multiply'], s_operator: '*', b_return_new : true},
        {a_s_name: ['muleq' , 'multiplyeq'], s_operator: '*=', b_return_new : false},
        {a_s_name: ['div' , 'divide'], s_operator: '/', b_return_new : true},
        {a_s_name: ['diveq' , 'divideeq'], s_operator: '/=', b_return_new : false},

    ].map(
        o=>{
            return new O_vec_funtion(
                o.a_s_name, 
                function(o_vec_class){
                    return `
                        function(v){
                            const o_vec = (typeof v == 'number') ? new ${o_vec_class.s_name}(...arguments) : v
                            ${(()=>{
                                if(o.b_return_new){
                                    return `
                                    return new ${o_vec_class.s_name}(
                                        ${o_vec_class.a_a_s_name_component.map(
                                            a_s_name_component =>{
                                                return `this.${a_s_name_component[0]} ${o.s_operator} o_vec.${a_s_name_component[0]}`
                                            }
                                        ).join(',\n')}
                                    )
                                    `
                                }
                                if(!o.b_return_new){
                                    return `
                                    ${o_vec_class.a_a_s_name_component.map(
                                        a_s_name_component =>{
                                            return `this.${a_s_name_component[0]} ${o.s_operator} o_vec.${a_s_name_component[0]}`
                                        }
                                    ).join('\n')}
                                    return this
                                    `
                                }
                            })()}

                        }
                    `
                }
        
            )
        }
    ),
    ...[
        {a_s_name: ['compsadd' ], s_operator: '+', n_start:0},
        {a_s_name: ['compssub' ], s_operator: '-', n_start:0},
        {a_s_name: ['compsmul' ], s_operator: '*', n_start:1},
        {a_s_name: ['compsdiv' ], s_operator: '/', n_start:1},

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
        ['norm', 'normalize'], 
        function(o_vec_class){
            return `
            function(){
                const n_length = this.length();
                return new ${o_vec_class.s_name}(
                    ${o_vec_class.a_a_s_name_component.map(
                        a_s_name_component =>{
                            return `this.${a_s_name_component[0]} / n_length`
                        }
                    ).join(',')}
                )

            }

            `
        } 
    ),
    new O_vec_funtion(
        ['normeq', 'normalizeeq'], 
        function(o_vec_class){
            return `
            function(){
                const n_length = this.length();
                ${o_vec_class.a_a_s_name_component.map(
                    a_s_name_component =>{
                        return `this.${a_s_name_component[0]} = this.${a_s_name_component[0]} / n_length`
                    }
                ).join('\n')}
                return this
            }

            `
        } 
    ),
    new O_vec_funtion(
        ['fract'], 
        function(o_vec_class){
            return `
            function(){
                return new ${o_vec_class.s_name}(
                    ${o_vec_class.a_a_s_name_component.map(
                        a_s_name_component =>{
                            return `this.${a_s_name_component[0]} % 1`
                        }
                    ).join(',')}
                )

            }

            `
        } 
    ),
    new O_vec_funtion(
        ['fracteq'], 
        function(o_vec_class){
            return `
            function(){
                ${o_vec_class.a_a_s_name_component.map(
                    a_s_name_component =>{
                        return `this.${a_s_name_component[0]} = this.${a_s_name_component[0]} % 1`
                    }
                ).join('\n')}
                return this
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
        true
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
    )


]


let a_a_s_name_component_x =  ['n_x', 'x', '0']
let a_a_s_name_component_y =  ['n_y', 'y', '1']
let a_a_s_name_component_z =  ['n_z', 'z', '2']
let a_a_s_name_component_w =  ['n_w', 'w', '3']

let a_o_vec_class = [
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
            let n_total_combinations = Math.pow(o_vec_class.n_dimensions, o_vec_class.n_dimensions);
            let a_a_n_idx = []
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
}).join('\n')}

export {${o_vec_class.s_name}}
    `
}

let a_s_js = a_o_vec_class.map(o=>f_s_js__from_o_vec_class(o)).join('\n');
await Deno.writeTextFile('created_dynamic_generated.js', a_s_js);