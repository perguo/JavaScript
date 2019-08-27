###  DOM(Document Object Model)定义了表示和修改文档所需的方法。DOM对象即为宿主对象，由浏览器厂商定义，用来操作html和xml功能的一类对象的集合。也有人称DOM是对HTML以及XML的标准编程接口。
####    dom不能操作css,但可以通过行间样式间接修改css
```
<div></div>
<script>
   var div = document.getElementsByTagName('div')[0];
   div.style.width = "100px";
   div.style.height = '100px';
   div.style.backgroundColor = "red";
</script>
```
### 查看元素节点
    1. document 代表整个文档
    2. document.getElementById() 通过id选
    3. .getElementsByTagName() 标签名（取出来的是类数组）
    4. .getElemrntsByClassName() 类名（ie8及以下版本不可用）
    5. getElementsByName() 只有部分标签可生效（表单，表单元素，img, iframe等），现在其他标签也可用
    小结：这5个属于`实时的`；Element加s的，取出来的都是一组（类数组）
    ---------------------------------------------------------------------------------------
    6. .querySelector() CSS选择器，在ie7及以下版本中没有
    7. .querySelectorAll() CSS选择器，在ie7及以下版本中没有
    小结：这两个是`静态的`。他们功能强大但不常用：a.版本，b.静态，非实时（如照片）
    
### 遍历节点树
*   parentNode: 父节点（最顶端的parentNode为#document）
*   childNodes: 子节点们
*   firstChild: 第一个子节点
*   lastChild: 最后一个子节点
*   nextSibling: 后一个兄弟节点
*   previousSibling: 前一个兄弟节点
```
<div>
    <!-- This is Comment! -->
    <strong></strong>
    <span></span>
</div>
<script type="text/javascript">
    let div = document.getElementsByTagName('div')[0];
</script>
//控制台打印div.childNodes回车，得 NodeList(7) [text, comment, text, strong, text, span, text]
```

### 基于元素节点树的遍历
*   parentElement: 返回当前元素的父元素节点(IE不兼容)，最高只能到HTML
*   children: 只返回当前元素的元素子节点
*   node.childElementCount === node.childElement.length: 当前元素节点的子元素节点个数(IE不兼容)
*   firstElementChild: 返回第一个元素节点(IE不兼容)
*   lastElementChild: 返回最后一个元素节点(IE不兼容)
*   nextElementsSibling/previousElementsSibling: 返回后/前一个兄弟元素节点

    同上例，当控制台打印div.children回车 --> [strong, span]

### 节点的四个属性
*   nodeName: 元素的标签名，以大写形式表示，只读
*   nodeValue: Text节点或Comment节点的文本内容，`可读写`
*   nodeType: 该节点的类型，只读 (获取节点类型)
*   attributes: Element节点的属性集合（如：id, class, length等） 
    nodeType,获取节点类型。根据其返回的数值，可判断其对应元素是何种类型 
    
    元素节点 ----- 1 (需要记住) <br>
    属性节点 ----- 2<br>
    文本节点 ----- 3 (需要记住)<br>
    注释节点 ----- 8<br>
    document ----- 9<br>
    DocumentFragment ---- 11 
####    节点的一个方法：Node.hasChildNodes(): 判断里面是否有孩子节点
    eg: div.hasChildNodes() 回车 --> true
 #  -----------------------------------------------------   
##  DOM结构树
### DOM
* Document
    * HTMLDocument
* CharacterData
    * Text
    * Comment
* Element
    * HTMLElement
        * HTMLHeadElement
        * HTMLBodyElement
        * HTMLTitleElement
        * HTMLParagraphElement
        * HTMLInputElement
        * HTMLTableElement
        * ...etc
* Attr
### 小结：<br>document: 指整个文档<br>Document: 是对象，不能new Document 
### document --(继承自)--> HTMLDocument.prototype --(继承自)-> Document.prototype
#   ---------------------------------------------------
##  DOM基本操作
* .getElementByTagId方法定义在Document.prototype上，即Element节点上不能使用
* .getElementsByName方法定义在HTMLDocument.prototype上，即非html中的document不能用
* .getElementsByTagName方法定义在Document.prototype和Element.prototype上
* HTMLDocument.prototype定义了一些常用的属性；body, head分别指代HTML文档中的body, head标签
* Document.prototype上定义了documentElement属性，指代文档的根元素；在HTML文档中，它总是指代html标签
    document.documentElement回车--> 《html>...<html》
* .getElementsByClassName, querySelector, querySelectorAll在Document.prototype, ELement.prototype类中均有定义

##  练习
### 1.封装函数，返回元素e的第n层祖先元素节点
```
<div>
    <strong>
        <span>
            <i></i>
        </span>
    </strong>
</div>
<script type="text/javascript">
    function retParent(elem, n) {
        while(elem && n) {
            elem = elem.parentElement;
            n --;
        }
        return elem;
    }
    //var i = document.getElementsByTagName('i')[0];
</script>
```
### 2.编辑函数，封装myChildren功能，解决以前部分浏览器的兼容问题
```
<div>
    <b></b>
    abcdefghijklmnopqrstuvwxyz
    <!--this is comment-->
    <strong>
        <span>
            <i></i>
        </span>
    </strong>
</div>
<script type="text/javascript">
    Element.prototype.myChildren = function () {
        var child = this.childNodes;
        var len = child.length;
        var arr = [];
        for (var i = 0; i < len; i++) {
            if (child[i].nodeType === 1) {
                arr.push(child[i]);
            }
        }
        return arr;
    };
    var div = document.getElementsByTagName('div')[0];
    var strong = document.getElementsByTagName('strong')[0];
    //div.myChildren() --> [b, strong]
</script>
```

### 3. 封装函数，返回元素e的第n个兄弟元素节点。n为正，返回后面的兄弟元素节点；n为负，返回前面的兄弟元素节点；n为0，返回自己
```
<div>
    <span></span>
    <p></p>
    <strong></strong>
    <i></i>
    <address></address>
</div>
<script type="text/javascript">
    function retSibling(e, n) {
        /*while(e && n) {
            if (n > 0){
                e = e.nextElementSibling;
                n --;
            } else {
                e = e.previousElementSibling;
                n ++;
            }
        } //兼容性不好，下面是完善版，ie9以下不支持*/
        while(e && n) {
            if (n > 0){
                if (e.nextElementSibling){
                    e = e.nextElementSibling;
                } else{
                    for (e = e.nextElementSibling; e && e.nodeType != 1; e = e.nextElementSibling) ;
                }
                n --;
            } else {
                if (e.previousElementSibling) {
                    e = e.previousElementSibling;
                }  else{
                    for (e = e.previousElementSibling; e && e.nodeType != 1; e = e.previousElementSibling);
                }
                n ++;
            }
        }
        return e;
    }
    var strong = document.getElementsByTagName('strong')[0];
</script>
```
#   -------------------------------------------------
##  DOM基本操作2
### 增：
*   `document.createElement();`创建元素节点（标签）<br>
    var div = document.createElement('div');<br>
    说明：此时div只是在js中创建，并未生成到html中<br>
    `document.body.appendChild(div);`// 将div添加到html中<br>
    再输入div.innerHTML = 123;页面就会显示123
*   document.createTextNode(); 创建文本节点<br>
    var text = document.creatTextNode('添加文本');
*   document.createComment(); 创建注释节点<br>
    var comment = document.createComment('This is comment');
*   document.createDocumentFragment();创建文档碎片节点

### 插
* PARENTNODE.appendChild();(剪切操作)
```
<div></div>
<span></span>
<script type="text/javascript">
    var div = document.getElementsByTagName('div')[0];
    var span = document.getElementsByTagName('span')[0];
    //div.append(span)回车 --> <div><span></span></div>
</script>
```
* PARENTNODE.insertBefore(a, b);//div里插入a标签，在b标签前面
```
<div>
    <span></span>
</div>
<script type="text/javascript">
    var div = document.getElementsByTagName('div')[0];
    var span = document.getElementsByTagName('span')[0];
    var strong = document.createElement('strong');
</script>
//div.insertBefore(strong, span) --> <div><strong></strong><span></span></div>
```
## 删
* parent.removeChild(); 父节点删除子节点（谋杀式）
    * (剪切）div.removeChild(span) --> span1 = div.removeChild(span) --> <span></span>
* child.remove(); 子节点自己调用方式删除（自杀式）
    * 删除：span.remove()回车

##  替换
* parent.replaceChild(new, origin);
#   *************************************************
##  Element节点的一些属性
### 1. innerHTML
* div.innerHTML ---> 获取div内容
* div.innerHTML = '123'; ---> 覆盖div原来内容
* div.innerHTML += '456'; ---> 追加，给div加内容
* div.innerHTML = "<span style='backgound-color:red>123</span>" ---> 加标签
### 2. innerText(火狐不兼容) / textContent(老版本IE不好使)
* div.innerText ---> 获取文本内容（123456）
* div.innerText = 123; ---> <div>123</div>

## Element节点的一些方法
### 1. ele.setAttribute();
```
<div>
    <span></span>
</div>
<script type="text/javascript">
    var div = document.getElementsByTagName('div')[0];
    var span = document.getElementsByTagName('span')[0];
</script>
// div.setAttribute('class', 'demo') --> <div class = "demo">
// div.setAttribute('id', 'only') --> <div class = "demo" id = "only">
```
### 2. ele.getAttribute();
    div.getAttribute('id')回车 --> "only"
```
<!-- ele.getAttribute()属性例子，每点击一次hehe,控制台记录一次-->
<div>
    <a href="#" data-log = "0">hehe</a>
</div>
<script type="text/javascript">
    var div = document.getElementsByTagName('div')[0];
    var a = document.getElementsByTagName('a')[0];
    a.onclick = function () {
        console.log(this.getAttribute('data-log'));
    }
</script>
```

##  Test
### test1. 给下列三个标签设置一个'this-name',值为标签名
```
<div></div>  
<span></span>
<strong></strong>
<script>
   var all = document.getElementsByTagName('*');
   for (var i = 0; i < all.length; i ++) {
       all[i].setAttribute('this-name', all[i].nodeName);
       //all[i].setAttribute('this-name', all[i].nodeName.toLowerCase()); 小写
   }
</script>
//结果如下：<div this-name = "DIV"></div> ...
```
### test2. 编写js脚本生成下面这段DOM结构。要求使用标准的DOM方法或属性
    <div class="example">
        <p class="slogan">你好！世界</p>
    </div>
```
<script type="text/javascript">
    var div = document.createElement('div');
    var p = document.createElement('p');
    div.setAttribute('class', 'example');
    p.setAttribute('class', 'slogan');
    var text = document.createTextNode("你好！世界");
    p.appendChild(text);
    div.appendChild(p);
    document.body.appendChild(div);
    //或者这样简单粗暴的写：div.innerHTML = "<p ...>"  
</script>
```

### test3. 封装函数innerAfter(); 功能类似insertBefore()
```
<div>
    <i></i>
    <b></b>
    <span></span>
</div>
<script type="text/javascript">
    Element.prototype.insertAfter = function (targetNode, afterNode) {
        var beforeNode = afterNode.nextElementSibling;
        if (beforeNode == null){
            this.appendChild(targetNode);
        } else{
            this.insertBefore(targetNode, beforeNode);
        }
    }
</script>
```

### test4. 将目标节点内部的节点顺序逆序
    如：<div><a><em></em></a></div>转换成<div><em><a></a></em></div>
    思路：利用appendChild剪切：
    （1）将倒数第二项剪切到最后的位置
    （2）将倒数第三项剪切到最后的位置
    （3）以此类推......
```
<div>
    <a></a>
    <span></span>
    <b></b>
</div>
<script type="text/javascript">
    var div = document.getElementsByTagName('div')[0];
    var len = div.children.length;
    for (var i = len-1; i > 0; i--) {
        div.appendChild(div.children[i-1]);
    }
</script>
```



    
    
    