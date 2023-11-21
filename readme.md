<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Tue Nov 21 2023 18:04:23 GMT+0100 (Central European Standard Time)","n_ts_created":1700586263398} -->
![f_o_vec logo](./f_o_vec_library.png)
# f_o_vec
this is a small library that handles vectors in javascript, at least as good as it can be done UwU
## instanciate vectors
```javascript
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
            // create a vector from another 
            var o2 = new O_vec4(
                o
            );
            f_assert_equals(
                o.toString(), 
                o2.toString()
            );
            // clone a vector
            let o1 = new O_vec4(1,2,3,4)
            let o_cloned = o.clone();
            o1.n_x = 10
            f_assert_equals(
                o1.toString(), 
                "(10,2,3,4)"
            );
            f_assert_equals(
                o_cloned.toString(), 
                "(1,2,3,4)"
            );
```
## modulo on vector
```javascript
            f_assert_equals(
                new O_vec4(11,12,13,14)
                    .mod(7)
                    .toString(), 
                "(4,5,6,0)"
            );
            f_assert_equals(
                new O_vec4(11,22,18,19)
                    .mod(10,10,20,20)
                    .toString(), 
                "(1,2,18,19)"
            );
```
## clamp
```javascript
            // limit each component of the vector to a certain range
            let o1 = new O_vec2(11,-10) 
            f_assert_equals(
                o1.clamp(
                        new O_vec2(5,-5),//min,
                        new O_vec2(10,5)//max,
                    )
                    .toString(), 
                "(10,-5)"
            );
            
            f_assert_equals(
                o1.toString(),
                "(11,-10)"
            );
            o1.clampeq(
                new O_vec2(20,0),//min,
                new O_vec2(100,100)//max,
            )
            f_assert_equals(
                o1.toString(),
                "(20,0)"
            );
            
```
## wrap
```javascript
            // limit each component of the vector to a certain range, wrap around if value gets out of range
            // usefull for games like snake
            let o_vec = new O_vec2(10,10)
            f_assert_equals(
                o_vec.wrap(
                        new O_vec2(0,0),//min,
                        new O_vec2(2,3)//max,
                    )
                    .toString(), 
                "(0,1)"
            );
            f_assert_equals(
                new O_vec2(-1,-1).wrap(
                        new O_vec2(0,0),//min,
                        new O_vec2(10,5)//max,
                    )
                    .toString(), 
                "(9,4)"
            );
```
## access vector components
```javascript
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

```
## access components as array of numbers a_n_comp
```javascript
            f_assert_equals(o.a_n_comp, [2,3,4,5])

            //set components
            var o = new O_vec4(0);
            f_assert_equals(o.x+=1, 1)
            f_assert_equals(o.n_x+=1, 2)
            f_assert_equals(o[0]+=1, 3)

```
## Vector swizzling
```javascript
            var o = new O_vec4(2,3,4,5);

            f_assert_equals(o.xxxx.toString(), '(2,2,2,2)')
            f_assert_equals(o.xxxz.toString(), '(2,2,2,4)')
            f_assert_equals(o.xxxw.toString(), '(2,2,2,5)')
            f_assert_equals(o.xyxy.toString(), '(2,3,2,3)')
            f_assert_equals(o.wzyx.toString(), '(5,4,3,2)')

```
## vector operations
every operation results in a new vector but can be done directly on the current vector by
calling the operation with a suffix of 'eq'
a+b  => a.add(b)
a+=b => a.addeq(b)
```javascript

```
### add
```javascript
            var o_vec = new O_vec4(1,2,3,4);
            f_assert_equals(
                o_vec
                 .add(3,-2, 10, -10)
                 .toString(),
                '(4,0,13,-6)'
            )

            o_vec.addeq(3,-2, 10, -10)

            f_assert_equals(
                o_vec
                 .toString(),
                 '(4,0,13,-6)'
            )
```
### sub
```javascript
            
            var o_vec = new O_vec4(1,2,3,4);
            f_assert_equals(
                o_vec
                    .sub(3,-2, 10, -10)
                    .toString(),
                '(-2,4,-7,14)'
            )

            o_vec.subeq(3,-2, 10, -10)

            f_assert_equals(
                o_vec
                    .toString(),
                '(-2,4,-7,14)'
            )
```
### mul
```javascript
            var o_vec = new O_vec4(1,2,3,4);
            f_assert_equals(
                o_vec
                    .mul(3,-2, 10, -10)
                    .toString(),
                '(3,-4,30,-40)'
            )

            o_vec.muleq(3,-2, 10, -10)

            f_assert_equals(
                o_vec
                    .toString(),
                '(3,-4,30,-40)'
            )
```
### div
```javascript
            var o_vec = new O_vec4(1,-2, 9, -12);
            f_assert_equals(
                o_vec
                    .div(1,2,3,4)
                    .toString(),
                '(1,-1,3,-3)'
            )

            o_vec.diveq(1,2,3,4)
            f_assert_equals(
                o_vec.toString(),
                '(1,-1,3,-3)'
            )
            // md: ## other manipulations

```
### length
```javascript
            f_assert_equals(new O_vec2(3,4).length(),5)
            f_assert_equals(new O_vec3(8,11,16).length(),21)   
```
unfortunately there is no pythagorean quituple
```javascript
            f_assert_equals(new O_vec4(2,3,6,7).length(),9.899494936611665)  
```
### normalize
```javascript
            f_assert_equals(new O_vec3(1,2,3).normalize().toString(),`(0.2672612419124244,0.5345224838248488,0.8017837257372732)`)
            var o = new O_vec3(1,2,3);
            o.normalizeeq();
            f_assert_equals(o.toString(),`(0.2672612419124244,0.5345224838248488,0.8017837257372732)`)
```
### fract (get part after decimal point)
```javascript
            let o = new O_vec2(12.8291214, 0.5534)
            o.fracteq()
            f_assert_equals(o.toString(),`(0.8291214,0.5534)`)
```
### components operated on each other
```javascript
            var n = new O_vec3(1,2,3).compsadd()
            f_assert_equals(n,6)//`1+2+3
            var n = new O_vec3(1,2,3).compssub()
            f_assert_equals(n,-6)//`-1-2-3
            var n = new O_vec3(1,2,3).compsmul()
            f_assert_equals(n,6)//`1*2*3
            var n = new O_vec3(1,2,3).compsdiv()
            f_assert_equals(n,0.16666666666666666)//`(1/2)/3
```
### dot / dot product
```javascript
            let n = new O_vec2(2,3).dot(4,5)
            f_assert_equals(n,23)//`(2*4+3*5)=>(8+15)=>(23)`)

            //dot product with multiple vectors
            let n2 = new O_vec2(2,3)
                .mul(4,5)
                .mul(10,20)
                .compsadd()
            f_assert_equals(n2,380)//`(2*4*10+3*5*20)=>(8*10+15*20)=>(80+300)=>(380)`)
```
### dot / dot product
```javascript
            var o = new O_vec3(2,3,4).cross(5,6,7)
            f_assert_equals(o.toString(),'(-3,6,-3)')
            var o = new O_vec3(2,3,4);
            o.crosseq(5,6,7)
            f_assert_equals(o.toString(),'(-3,6,-3)')
            // var o = new O_vec3(2,3,4);
                // o.crosseq(1)
                // f_assert_equals(o.toString(),'(-1,2,-1)')
```
### sangle (smallest angle) between two vectors using the (dot/length*length) formula
```javascript
            var n_ang = new O_vec3(2,3,4).sangle(-5,6,-7)
            f_assert_equals(n_ang,1.9327554742236706)
            var n_ang_deg = new O_vec3(2,3,4).sangle_deg(-5,6,-7)
            f_assert_equals(n_ang_deg,110.73873150382231)

```
### the horizontal angle between two vectors
```javascript
            // f_assert_equals(f_o_vec2(0,0).hangle(0,1),Math.PI);
            f_assert_equals(new O_vec2(0,0).hangle(0,1),((Math.PI*2)/4)*2);
            f_assert_equals(new O_vec2(0,0).hangle(1,0),-((Math.PI*2)/4)*1);
            f_assert_equals(new O_vec2(0,0).hangle(0,-1),-((Math.PI*2)/4)*0);
            f_assert_equals(new O_vec2(0,0).hangle(-1,0),((Math.PI*2)/4)*1);


```
### convert/parse (using parseInt) a vector or some of its properties to an integer
```javascript

            f_assert_equals(
                new O_vec2(1.12341234, 2.12341234).comps_to_int().toString(),
                new O_vec2(1,2).toString()
            );

            f_assert_equals(
                new O_vec2(1.12341234, 2.12341234).to_int().toString(),
                new O_vec2(1,2).toString()
            );

            f_assert_equals(
                new O_vec2(-23.123, -31.1234).to_int().toString(),
                new O_vec2(-23,-31).toString()
            );

            f_assert_equals(
                new O_vec2(-23.123, -31.1234).to_int('n_x').toString(),
                new O_vec2(-23,-31.1234).toString()
            );

            f_assert_equals(
                new O_vec4(1.2,3.4,5.6,7.8).to_int('x', 'w').toString(),
                new O_vec4(1,3.4, 5.6, 7).toString()
            );
            // eq functions, 
            let o1 = new O_vec4(1.2,3.4,5.6,7.8);
            o1.to_inteq();
            f_assert_equals(
                o1.toString(),
                new O_vec4(1,3,5,7).toString()
            );
```
### convert a vector to a one dimensional index
```javascript

            //lets say we have a 4x3 matrix
            //     0  1  2  3 
            //------------------< X
            // 0 | 0, 1, 2, 3
            // 1 | 4, 5, 6, 7 // X:Y 1:2 would be index 9
            // 2 | 8, 9,10,11
            //   ^
            //   Y
            f_assert_equals(
                new O_vec2(1.1234,2.9234).to_index(
                    new O_vec2(4,3)
                ),
                9
            );

```
### convert a vector to a one dimensional index
```javascript

            //lets say we have a 4x3 (o_scl) matrix
            //     0  1  2  3 
            //------------------< X
            // 0 | 0, 1, 2, 3
            // 1 | 4, 5, 6, 7 
            // 2 | 8, 9,10,11 // index 1 would be X:Y 3:2
            //   ^
            //   Y
            let o_scl = new O_vec2(4,3);
            f_assert_equals(
                o_scl.from_index(11),
                new O_vec2(3,2)// this is the resulting translation o_trn
            );
```