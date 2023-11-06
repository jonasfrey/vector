
let f_a_n2_eliminated = function(
    a_n1, 
    a_n2
){
    console.log('eliminate')
    console.log(a_n1)
    console.log(a_n2)
    let n_coeff_unknown_var = a_n1.find(n=>n!=0);
    let n_idx_coeff_unknonw_var = a_n1.indexOf(n_coeff_unknown_var);

    let n_factor = a_n2[n_idx_coeff_unknonw_var] / a_n1[n_idx_coeff_unknonw_var];
    let a_n_res = a_n2.map(
        (n, n_idx)=>{
            return n - (a_n1[n_idx] * n_factor)
        }
    )
    return a_n_res

}
let f_a_n__solved = function(
    a_n__equation, //       [+1x, +2y, +3z, =6]
    a_n__variablevalues, // [0,    3,   0,  =3]
){
    console.log('solve')
    console.log(a_n__equation)
    console.log(a_n__variablevalues)
    if(a_n__equation.length != a_n__variablevalues.length){
        let s_msg = `equations are not of same dimension, [${a_n__equation}], length (${a_n__equation.length}) and 
        [${a_n__variablevalues}], length : ${a_n__variablevalues.length}`
        throw Error(s_msg)

    }    
    if(a_n__variablevalues.slice(0,-1).filter(n=>n!=0).length != 1){
        throw Error(`cannot solve , to many unknown variables null or undefined are unknown ${a_n__variablevalues}`)
    }
    let n_idx_of_known_var = null; 
    for(let n_idx = 0; n_idx < a_n__variablevalues.length-1;n_idx+=1){
        if(a_n__variablevalues[n_idx]!=0){
            n_idx_of_known_var = n_idx
            break;
        }
    }
    let n_coefficient_known_var = a_n__variablevalues[n_idx_of_known_var];
    let n_value_known_var = a_n__variablevalues.at(-1)/n_coefficient_known_var;
    let n_coefficient_in_equation = a_n__equation[n_idx_of_known_var];
    a_n__equation[n_idx_of_known_var] = 0;
    a_n__equation[a_n__equation.length-1] = a_n__equation.at(-1) + n_coefficient_in_equation*n_value_known_var;
    return a_n__equation
}
const f_a__cloned = (a_v) => a_v.map(v => Array.isArray(v) ? f_a__cloned(v) : v);

let f_a_a_n_solve_linear_equation_system = function(
    a_a_n, // [[1,2, =4], [2,3, =3]]
    // [
    //     [1, 2, 4, =5]
    //     [2, 3, 4, =1]
    //     [1, 2, 7, =2]
    // ]
){
    a_a_n = f_a__cloned(a_a_n)

    let n_dimensions = a_a_n[0].length;
    for(let a_n of a_a_n){
        if(a_n.length != n_dimensions){
            throw Error(`dimensions of equations are not matching, ${a_a_n[0]}(length: ${a_a_n[0].length}), ${a_n}(length: ${a_n.length})`)
        }
    }
    debugger
    let b_can_eliminate = true;
    while(b_can_eliminate){

        // find two equations with same amount of unknown variables at same indexes
        // but with more than one variable
        b_can_eliminate = false;
        console.log('gasd')
        for(let a_n1 of a_a_n){
            if(a_n1.slice(0,-1).filter(n=>n!=0).length == 1){
                continue
            }
            let n_idx_a_n1 = a_a_n.indexOf(a_n1);
            for(let a_n2 of a_a_n){
                let n_idx_a_n2 = a_a_n.indexOf(a_n2);
    
                if(a_n1 == a_n2){
                    continue
                }
                let b_match = true;
                for(let n_idx1 in a_n1.slice(0,-1)){
                    if(
                        (a_n1[n_idx1]== 0 && a_n2[n_idx1]!=0)
                        ||
                        (a_n1[n_idx1] != 0 && a_n2[n_idx1]== 0)
                        ){
                        b_match = false
                        break
                    }
                }
                if(b_match){
                    // console.log(a_n1, a_n2)
                    a_a_n[n_idx_a_n2] = f_a_n2_eliminated(a_n1, a_n2)
                    b_can_eliminate = true;
                    break;
                }
            }
            if(b_can_eliminate){
                break;
            }
        }
        
        let n_index_of_only_variable = null;
        let a_n__only_one_variable = a_a_n.find(
            a_n=>{
                let a_n_filtered = a_n.slice(0,-1).filter(n=>n!=0);
                if(a_n_filtered.length == 1){
                    n_index_of_only_variable = a_n?.indexOf(a_n_filtered?.[0]);
                    return true
                }
                return false
            }
        )
        if(a_n__only_one_variable){
            for(let a_n of a_a_n){
                if(a_n != a_n__only_one_variable)
                a_n = f_a_n__solved(
                    a_n,
                    a_n__only_one_variable
                )
            };
        }
        
    }
    return a_a_n;
    // console.log('done, cannot eliminate or solve any further'); 
    // console.log(a_a_n);

}
let f_solve_linear_equation_system = function(
    a_a_n
){
    let a_a_n__solved = f_a_a_n_solve_linear_equation_system(a_a_n);
    console.log('before solve')
    console.log(a_a_n)
    console.log('after solve')
    console.log(a_a_n__solved)
    let a_s_solution = new Array(a_a_n[0].length-1).fill(0).map(
        (v,n_idx)=>{
            let a_a_n_found = a_a_n__solved.find(a_n=>{return a_n[n_idx]!=0});
            let n_coeff = null;
            let n_val_per_one = 0;
            if(a_a_n_found){                
                n_coeff = a_a_n_found[n_idx];
                n_val_per_one = a_a_n_found.at(-1) / n_coeff;
            }
            return `v${n_idx+1}: ${n_val_per_one}`
        }
    );
    console.log(`solution {${a_s_solution.join(',')}}`)
    Deno.exit()
}
// f_solve_linear_equation_system(
//     [
//         [1,0,2,3,6],
//         [2,0,4,9,15],
//         [0,0,4,0,21],
//         [0,0,4,8,20]
//     ]
// )

// f_solve_linear_equation_system(
//     [
//         [2, 3, -1, 5],
//         [1, 1, 1, 6],
//         [-3, -4, 3, -5],
//     ]
// )
// f_solve_linear_equation_system(
//     [
//         [1,1,-1,3],
//         [1,2,-2,2],
//         [2,-1,2,15]
//     ]
// )
f_solve_linear_equation_system(
    [
        [5,-2,1],
        [3,3,9]
    ]
)

// let a_n = f_a_n__solved(
//     [1,2,3,6],//a_n__equation, //       [+1x, +2y, +3z, =6]
//     [0,-3,0,3]//a_n__variablevalues, // [0,    3,   0,  =3]
// )
// console.log(a_n)

// f_a_n__solved(
//     [1,0,0,3,16.5],
//     [0,0,0,3,3],
// )