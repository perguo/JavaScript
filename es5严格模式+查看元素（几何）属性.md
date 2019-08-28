#   es5 的严格模式
### 现在的浏览器所用：基于es3.0 + es5.0的新增方法
### es3.0 和 es5.0产生冲突的部分，使用es3.0的。
### es5.0严格模式：es3.0 和es5.0产生冲突的部分使用es5.0的。
##  es5.0的启用模式(es5.0严格模式的启动):"use strict"，写在页面最顶端，前面不能有代码
#### ps:不能使用console.log(arguments.callee), 会报TypeError错误

### "use strict"的几点说明
* 不再兼容es3的一些不规则语法，使用全新的es5规范
* 两种方法：
    * 全局严格模式
    ```
    "use strict";
    function demo() {
        console.log('a');
    }

    ```
    * 局部函数内严格模式（推荐）
* 就是一行字符串，不会对不兼容严格模式的浏览器产生影响
* 不支持with, arguments.callee, func.caller
```
    "use strict";
    function demo() {
        console.log(arguments.callee); //报错
    }
    demo();//报错
```
```
    function test() {
        "use strict";
        //console.log(arguments.callee);
    }
    function demo() {
        console.log(arguments.callee);
    }
    demo(); //不报错
```
##### with可以改变作用域链，当with里有参数时，会将参数所在放在链的最顶端。
```
 <script type="text/javascript">
     var obj = {
         name: "obj"
     };
     var name = "window";
     function test() {
         var age = 20;
         var name = "scope";
         with(obj) {
             console.log(name); // obj
             console.log(age); // 20
         }
     }
     test();
 </script>
```  
* 变量赋值前必须声明（es3中变量未经声明就赋值则归全局所有，var a = b = 2）
* 局部this必须被赋值(Person.call(null/undefined)，赋值什么就是什么)
```
<script type="text/javascript">
    "use strict";
    function test() {
        console.log(this);//this没有指向
    }
    test();// undefined
    new test();//test{}
</script>
```
* 拒绝重复属性和参数
```
<script type="text/javascript">
    "use strict";
    function test(name, name) {
        console.log(name);
    }
    test(1,2);
</script>
```
```
<script type="text/javascript">
    "use strict";
    var obj = {
        name: 'aaa',
        name: 'bbb'
    }
    //目前不报错
</script>
```

##### es3.0 不能使用eval()。eval()是魔鬼，因为它能改变作用域
## *************************************************
# try ... catch
```
<script type="text/javascript">
    try{
        console.log('a');
        console.log(b);
        console.log('c');
    }catch(e){ //e --> error
        console.log(e.name + ": " + e.message);
    }
    console.log('d');
</script>
// 结果如下
a
ReferenceError: b is not defined
d
```
    在try里面发生错误，不会执行错误后的try里的代码
### Error.name的六种值对应的信息
* EvalError: eval()的使用与定义不一致
* RangeError: 数值越界
* ReferenceError: 非法或不能识别的引用数值
    *比如：未定义就使用
* SyntaxError: 发生语法解析错误
    * 比如：中文符号
* TypeError: 操作数类型错误
* URLError: URL处理函数使用不当
* .querySelector(): 在ie7以下版本中没有，CSS选择器
* .querySelectorAll(): 在ie7以下版本中没有，CSS选择器

# ********************************************
## 查看元素的几何属性：domEle.getBoundingClientRect()
#### es5的新方法，兼容性好，但不好用；rect --> 矩形
#### 该方法返回一个对象，对象里有left, top, right, bottom等属性
* left 和 top代表该元素左上角的 X 和 Y 坐标
* right 和 bottom代表该元素右下角的 X 和 Y 坐标
#### height 和 width 属性老版本IE并未实现
#### 返回的结果并不是“实时的”

## 查看元素尺寸：
* dom.offsetWidth
* dom.offsetHeight
####  返回的是数值，没有单位; div.style.height 返回的有单位
## 查看元素位置：
* dom.offsetLeft
* dom.offsetTop(值为相对父级位置)
* dom.offsetParent(返回最近的有定位的父级元素)

## 滚动条滚动方法
* scroll(), scrollTo(): 滚到这个位置
* scrollBy(): 滚这么多的位置（累加）
    * 可以实现自动翻书功能
## 查看滚动条滚动的距离
#### 1
* window.pageXOffset: 横向滚动距离
* window.pageYOffset: 纵向滚动距离
    offset: 尺寸
#### 2
* document.body.scrollLeft/scrollTop: 横向/纵向 (IE8, IE5, IE4)
* document.documentElement.scrollLeft/Top (IE7, IE6)
    这俩兼容性比较混乱，其中一个有值时，另一个一定为0. 解决方案：取两个值的和
#### 3 封装兼容性方法，求滚动条滚动的距离getScrollOffset()
```
<script type="text/javascript">
    function getScrollOffset() {
        if (window.pageXOffset) {
            return {
                X: window.pageXOffset,
                Y: window.pageYOffset
            }
        } else{
            return {
                X: document.body.scrollLeft + document.documentElement.scrollLeft, 
                Y: document.body.scrollTop + document.documentElement.scrollTop
            }
        }
    }
</script>
```
## 查看视口的尺寸
* window.innerWidth/innerHeight IE8及IE8以下不兼容
* document.documentElement.clientWidth/clientHeight 标准模式下，任何浏览器都兼容
* document.body.clientWidth/clientHeight 适用于怪异模式下的浏览器

        怪异模式：无<!DOCTYPE html>
#### 封装兼容性方法，返回浏览器视口尺寸getViewportOffset()
```
<script type="text/javascript">
    function getViewportOffset() {
        if (window.innerWidth) {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        } else { //compatMode: 兼容模式；BackCompat: 向后兼容(怪异模式)
            if (document.compatMode === 'BackCompat') {
                return {
                    width: document.body.clientWidth,
                    height: document.body.clientHeight
                }
            } else{
                return {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                }
            }
        }
    }
</script>
```



