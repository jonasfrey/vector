<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Sun Nov 05 2023 01:45:35 GMT+0100 (Central European Standard Time)","n_ts_created":1699145135162} -->
```javascript
        //     //md: ### subtract
        //     f_assert_equals(f_o_vec2(5,5).subtract(2,-2).toString(),'(3,7)')
        //     //md: ### multiply
        //     f_assert_equals(f_o_vec2(1,1).multiply(2,3).toString(),'(2,3)')
        //     //md: ### multiply
        //     f_assert_equals(f_o_vec2(4,3).divide(2,3).toString(),`(2,1)`)
        //     // md: ## other manipulations

        //     //md: ### length
        //     f_assert_equals(f_o_vec2(3,4).length(),5)
        //     f_assert_equals(f_o_vec3(8,11,16).length(),21)   
        //     //md: unfortunately there is no pythagorean quituple    
        //     f_assert_equals(f_o_vec4(2,3,6,7).length(),9.899494936611665)  
        //     //md: ### normalize 
        //     f_assert_equals(f_o_vec3(1,2,3).normalize().toString(),`(0.2672612419124244,0.5345224838248488,0.8017837257372732)`)
        //     var o = f_o_vec3(1,2,3);
        //     o.normalizeeq();
        //     f_assert_equals(o.toString(),`(0.2672612419124244,0.5345224838248488,0.8017837257372732)`)
        //     //md: ### fract (get part after decimal point)
        //     let o = f_o_vec2(12.8291214, 0.5534)
        //     o.fracteq()
        //     f_assert_equals(o.toString(),`(0.8291214,0.5534)`)
        //     //md: ### components operated on each other
        //     var n = f_o_vec3(1,2,3).componentsadded()
        //     f_assert_equals(n,6)//`1+2+3
        //     var n = f_o_vec3(1,2,3).componentssubtracted()
        //     f_assert_equals(n,-6)//`-1-2-3
        //     var n = f_o_vec3(1,2,3).componentsmultiplied()
        //     f_assert_equals(n,6)//`1*2*3
        //     var n = f_o_vec3(1,2,3).componentsdivided()
        //     f_assert_equals(n,0.16666666666666666)//`(1/2)/3
        //     //md: ### dot / dot product
        //     let n = f_o_vec2(2,3).dot(4,5)
        //     f_assert_equals(n,23)//`(2*4+3*5)=>(8+15)=>(23)`)

        //     let n2 = f_o_vec2(2,3).dot(f_o_vec2(4,5), f_o_vec2(10,20))
        //     f_assert_equals(n2,380)//`(2*4*10+3*5*20)=>(8*10+15*20)=>(80+300)=>(380)`)
        //     //md: ### dot / dot product
        //     var o = f_o_vec3(2,3,4).cross(5,6,7)
        //     f_assert_equals(o.toString(),'(-3,6,-3)')
        //     var o = f_o_vec3(2,3,4);
        //     o.crosseq(5,6,7)
        //     f_assert_equals(o.toString(),'(-3,6,-3)')
        //     var o = f_o_vec3(2,3,4);
        //     o.crosseq(1)
        //     f_assert_equals(o.toString(),'(-1,2,-1)')
        //     //md: ### sangle (smallest angle) between two vectors using the (dot/length*length) formula
        //     var n_ang = f_o_vec3(2,3,4).sangle(-5,6,-7)
        //     f_assert_equals(n_ang,1.9327554742236706)
        //     var n_ang_deg = f_o_vec3(2,3,4).sangle_deg(-5,6,-7)
        //     f_assert_equals(n_ang_deg,110.73873150382231)
```