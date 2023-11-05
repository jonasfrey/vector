<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Sun Nov 05 2023 01:45:35 GMT+0100 (Central European Standard Time)","n_ts_created":1699145135160} -->
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

            // md: ## vector operations

```
### add
```javascript
            f_assert_equals(new O_vec4(1,1, 1, 1).add(3,-2, 10, -10).toString(),'(4,-1,11,-9)')

```