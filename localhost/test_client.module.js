
import {
    f_assert_equals, 
    f_deno_test, 
    f_deno_test_summary,
    f_deno_test_all_and_print_summary 
} from "https://deno.land/x/deno_test_server_and_client_side@0.4/mod.js"


// import {
//     f_o_vec2,
//     f_o_vec3, 
//     f_o_vec4
// } from "./module.js"
import {
    O_vec2, 
    O_vec3, 
    O_vec4
} from "./module.js"

//readme.md:start
//md: ![f_o_vec logo](./f_o_vec_library.png)
//md: # f_o_vec
//md: this is a small library that handles vectors in javascript, at least as good as it can be done UwU
//readme.md:end

await f_deno_test_all_and_print_summary(
    [
        f_deno_test("instanciate vectors", () => {
            //readme.md:start
            //md: ## instanciate vectors
            var o = new O_vec4();
            f_assert_equals(o.toString(),'(0,0,0,0)');
            var o = new O_vec4(1);
            f_assert_equals(o.toString(),'(1,1,1,1)');
            var o = new O_vec4(1,2);
            f_assert_equals(o.toString(),'(1,2,2,2)');
            var o = new O_vec4(1,2,3);
            f_assert_equals(o.toString(),'(1,2,3,3)');
            var o = new O_vec4(1,2,3, 4);
            f_assert_equals(o.toString(),'(1,2,3,4)');

            //readme.md:end
        }),
        f_deno_test("access vector components", () => {
            //readme.md:start
            //md: ## access vector components
            var o = new O_vec4(2,3,4,5);
            f_assert_equals(o.x, 2)
            f_assert_equals(o.n_x, 2)
            f_assert_equals(o[0], 2)

            f_assert_equals(o.y, 3)
            f_assert_equals(o.n_y, 3)
            f_assert_equals(o[1], 3)

            f_assert_equals(o.z, 4)
            f_assert_equals(o.n_z, 4)
            f_assert_equals(o[2], 4)

            f_assert_equals(o.w, 5)
            f_assert_equals(o.n_w, 5)
            f_assert_equals(o[3], 5)

            //md: ## access components as array of numbers a_n_comp
            f_assert_equals(o.a_n_comp, [2,3,4,5])

            //set components
            var o = new O_vec4(0);
            f_assert_equals(o.x+=1, 1)
            f_assert_equals(o.n_x+=1, 2)
            f_assert_equals(o[0]+=1, 3)

            //readme.md:end
        }),
        f_deno_test("access swizzling", () => {
            //readme.md:start
            //md: ## Vector swizzling
            var o = new O_vec4(2,3,4,5);

            f_assert_equals(o.xxxx.toString(), '(2,2,2,2)')
            f_assert_equals(o.xxxz.toString(), '(2,2,2,4)')
            f_assert_equals(o.xxxw.toString(), '(2,2,2,5)')
            f_assert_equals(o.xyxy.toString(), '(2,3,2,3)')
            f_assert_equals(o.wzyx.toString(), '(5,4,3,2)')

            //readme.md:end
        }),
        f_deno_test("vector operations: add", () => {
            //readme.md:start
            // md: ## vector operations

            //md: ### add
            f_assert_equals(new O_vec4(1,1, 1, 1).add(3,-2, 10, -10).toString(),'(4,-1,11,-9)')

            //readme.md:end
        }),
        // f_deno_test("vector operations: subtract", () => {
        //     //readme.md:start
        //     //md: ### subtract
        //     f_assert_equals(f_o_vec2(5,5).subtract(2,-2).toString(),'(3,7)')
        //     //readme.md:end
        // }),
        // f_deno_test("vector operations: multiply", () => {
        //     //readme.md:start
        //     //md: ### multiply
        //     f_assert_equals(f_o_vec2(1,1).multiply(2,3).toString(),'(2,3)')
        //     //readme.md:end
        // }),
        // f_deno_test("vector operations: divide", () => {
        //     //readme.md:start
        //     //md: ### multiply
        //     f_assert_equals(f_o_vec2(4,3).divide(2,3).toString(),`(2,1)`)
        //     //readme.md:end
        // }),

        // f_deno_test("length", () => {
        //     //readme.md:start
        //     // md: ## other manipulations

        //     //md: ### length
        //     f_assert_equals(f_o_vec2(3,4).length(),5)
        //     f_assert_equals(f_o_vec3(8,11,16).length(),21)   
        //     //md: unfortunately there is no pythagorean quituple    
        //     f_assert_equals(f_o_vec4(2,3,6,7).length(),9.899494936611665)  
        //     //readme.md:end
         
            
        // }),
        // f_deno_test("normalize", () => {
        //     //readme.md:start
        //     //md: ### normalize 
        //     f_assert_equals(f_o_vec3(1,2,3).normalize().toString(),`(0.2672612419124244,0.5345224838248488,0.8017837257372732)`)
        //     var o = f_o_vec3(1,2,3);
        //     o.normalizeeq();
        //     f_assert_equals(o.toString(),`(0.2672612419124244,0.5345224838248488,0.8017837257372732)`)
        //     //readme.md:end

        // }),
        // f_deno_test("fract", () => {
        //     //readme.md:start
        //     //md: ### fract (get part after decimal point)
        //     let o = f_o_vec2(12.8291214, 0.5534)
        //     o.fracteq()
        //     f_assert_equals(o.toString(),`(0.8291214,0.5534)`)
        //     //readme.md:end

        // }),
        // f_deno_test("component operations", () => {
        //     //readme.md:start
        //     //md: ### components operated on each other
        //     var n = f_o_vec3(1,2,3).componentsadded()
        //     f_assert_equals(n,6)//`1+2+3
        //     var n = f_o_vec3(1,2,3).componentssubtracted()
        //     f_assert_equals(n,-6)//`-1-2-3
        //     var n = f_o_vec3(1,2,3).componentsmultiplied()
        //     f_assert_equals(n,6)//`1*2*3
        //     var n = f_o_vec3(1,2,3).componentsdivided()
        //     f_assert_equals(n,0.16666666666666666)//`(1/2)/3
        //     //readme.md:end
        // }),
        // f_deno_test("dot", () => {
        //     //readme.md:start
        //     //md: ### dot / dot product
        //     let n = f_o_vec2(2,3).dot(4,5)
        //     f_assert_equals(n,23)//`(2*4+3*5)=>(8+15)=>(23)`)

        //     let n2 = f_o_vec2(2,3).dot(f_o_vec2(4,5), f_o_vec2(10,20))
        //     f_assert_equals(n2,380)//`(2*4*10+3*5*20)=>(8*10+15*20)=>(80+300)=>(380)`)
        //     //readme.md:end
        // }),
        // f_deno_test("cross", () => {
        //     //readme.md:start
        //     //md: ### dot / dot product
        //     var o = f_o_vec3(2,3,4).cross(5,6,7)
        //     f_assert_equals(o.toString(),'(-3,6,-3)')
        //     var o = f_o_vec3(2,3,4);
        //     o.crosseq(5,6,7)
        //     f_assert_equals(o.toString(),'(-3,6,-3)')
        //     var o = f_o_vec3(2,3,4);
        //     o.crosseq(1)
        //     f_assert_equals(o.toString(),'(-1,2,-1)')
        //     //readme.md:end
        // }),
        // f_deno_test("sangle", () => {
        //     //readme.md:start
        //     //md: ### sangle (smallest angle) between two vectors using the (dot/length*length) formula
        //     var n_ang = f_o_vec3(2,3,4).sangle(-5,6,-7)
        //     f_assert_equals(n_ang,1.9327554742236706)
        //     var n_ang_deg = f_o_vec3(2,3,4).sangle_deg(-5,6,-7)
        //     f_assert_equals(n_ang_deg,110.73873150382231)
        //     //readme.md:end
        // }),
        // f_deno_test("hangle", () => {
        //     //md: ### the horizontal angle between two vectors
        //     // f_assert_equals(f_o_vec2(0,0).hangle(0,1),Math.PI);
        //     f_assert_equals(f_o_vec2(0,0).hangle(1,0),Math.PI);

        // }),
        
    ]
)
