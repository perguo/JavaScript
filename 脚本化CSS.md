# 脚本化CSS
## `读写`元素CSS属性：dom.style.prop
    eg: div.style.height
* 可读写行间样式，无兼容性问题，碰到float这样的保留字属性，前面应加css
    * eg: div.style.cddFloat
* 复合属性必须拆解，组合单词变成小驼峰式写法
    * div.style.backgroundColor
    * div.style.borderStyle
* 写入的值必须是字符串格式
    * div.style.height = "100px";
* style展示的是`行间样式`，未写入行间的显示为空

## 查询计算样式：window.getComputedStyle(ele, null)
* 只读
* 返回的计算样式的值都是`绝对值`，没有相对单位
    * 比如：em 为相对单位
    * 比如：red会返回rgb(255, 0, 0)
* IE8及IE8以下不兼容。
    *专有方法：prop.currentStyle --> CSSStyleDeclaration;返回的值是原有值，而非绝对值
* window.getComputedStyle(div, null).width 返回的是权重最高的width值
### 封装兼容性方法getStyle(elem, prop)
```
<script type="text/javascript">
    function getStyle(elem, prop) {
        if (window.getComputedStyle(elem, prop)) {
            return window.getComputedStyle(elem, prop)[prop];
        } else {
            return elem.currentStyle[prop];
        }
    }
</script>
```    
### 小拓展：第二个参数null, 用来解决伪元素操作需求
```
div::after{
            content: "";
            width: 50px;
            height: 50px;
            background-color: green;
            display: inline-block;
        }
var div = document.getElementsByTagName('div')[0];
window.getComputedStyle(div, "after").width;
```


