### 原叫LiveScript,后为推广改为JavaScript。所以，js与java毫无关系。
##  JS特点：
### 1.解释性语言。
* 翻译分为解释性语言和编译性语言
*   编译性语言：通篇翻译，之后会生成一个文件。（如：.c文件编译后会生成一个.obj文件）
*     优点：快。（可开发底层东西，如游戏引擎）
*     不足：移植性不好（不跨平台）
*     编译性语言代表：c,c++等。
*   解释性语言：读一行翻译一行，不生成其他文件，翻译一行执行一行。
*     优点：跨平台（不需生成文件）。
*     不足：稍微慢
*     解释性语言代表：php, python等
####  PS：Java比较特殊，.java文件->.class文件，但它是非编译性语言。（.java --> .javac --> 编译 --> .class -> jvm --解释性）

### 2.单线程。同一时间只能做一个工作。

### 3.ECMA标准，也称ECMAScript.

##  js三大部分：ECMAScript, DOM, BOM

##  引入js
* 页面级js:（内部写代码）
```
<script type="text/javascript">
         document.write("Hello world!");
</script>
```
####  <script>标签放在head内和body内均可。
* 外部js文件
```
<script type="text/javascript" src="index.js">
         document.write("Hello world!");
</script>
```
