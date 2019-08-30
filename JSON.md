# json
### JSON是一种传输数据的格式（以对象为样板，本质上就是对象，但用途有区别。对象是本地用的，json是用来传输的）
### JSON.parse(); string --> json (前端从后端拿)
### JSON.stringify(); json --> string(前端传给后端)
```
var obj = {
    "name": "abc",
    "age": 20
}
var str = JSON.stringify(obj);
//console打印
//str --> "{"name": "abc", "age": 20}"
//JSON.parse(str) --> Object {name: "abc", age: 20}
```

# 知识点补充
### domTree + cssTree = renderTree(渲染)
#### domTree: 深度遍历

### reflow: 重排、重构
###### 效率低，编程时要避免
* dom节点的删除、添加
* dom节点的宽高变化、位置变化、display none-->block
* offsetWidth, offsetLeft

### repaint: 重绘
* 改变背景颜色，不会对后续代码有影响
* 该字体大小，会影响后续代码，这个种叫重构





