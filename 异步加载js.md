# 异步加载js
### js是同步加载的，遇到html和css时，会阻断他们的加载线。（js单线程）
### js加载的缺点： 加载工具方法没必要阻塞文档，过多的js加载会影响页面效率，一旦网速不好，那么整个网站将等待js加载而不进行后续渲染等工作
### 有些工具方法需要按需加载，用到在加载，不用不加载

## javascript 异步加载的三种方案
* defer异步加载，但要等到dom文档全部解析完才会被执行。只有IE能用，也可将代码写到内部。
    * 执行时不组阻塞页面
```
<script type="text/javascript" src="a.js" defer="defer"></script>
```
```
<script type="text/javascript" defer="defer">var a = 123;</script>
```
* async异步加载，加载完就执行，只能加载外部脚本，不能把js写到script标签里。
    * 执行时不阻塞页面
    * asynchronous 异步
```
<script type="text/javascript" src="a.js" async="async"></script>
```
* 创建script，插入到dom中，加载完毕后callBack
```
//demo.js内容：function test(){ console.log('a'); } 
<script>
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = 'demo.js';//异步下载
    document.head.appendChild(script);
    //test();// 报错：test is not defined(因为文件未下载完)
    //改正如下： 
    setTimeout(function () {
            test();
        },10)
</script>
```
#### 有一种机制，可以提醒文件何时下载完，然后触发函数onload（兼容性好，除IE都可用）
```
script.onload = function () {
        test();
}
```
#### IE有状态码
* script.readyState = "loading"; 加载中
* script.readyState = "loaded";  加载完
##### IE上的解决方法：
```
script.onreadystatechange = function () {
   if(script.readyState == "complete" || script.readyState == "loaded"){
      test();
   }
}
```
### 异步加载js的兼容版
```
<script type="text/javascript">
    function loadScript(url, callback) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "complete" || script.readyState === "loaded") {
                    callback();
                }
            }
        } else {
            script.onload = function () {
                callback();
            }
        }
        script.src = url;
        document.head.appendChild(script);
    }
    loadScript('demo.js', function () {
        test();
    })
</script>
```

# js 加载时间线
### 1.创建Document对象，开始解析web页面。解析HTML元素和他们的文本内容后添加Element对象和Text节点到文档中。此阶段document.readyState="loading".
### 2. 遇到link外部css，创建线程加载，并继续解析文档
### 3. 遇到script外部js, 并且没有设置async, defer, 浏览器加载，并阻塞，等待js加载完成并执行该脚本，然后继续解析文档。
### 4. 遇到script外部js, 并且设置有async, defer, 浏览器创建线程加载，并继续解析文档。对于async属性的脚本，脚本加载完成后立即执行。（异步禁止使用document.write()）
### 5. 遇到img等，先正常解析dom结构，然后浏览器异步加载src,并继续解析文档
### 6. 当文档解析完成（donTree建立），document.readyState = 'interactive'(活跃的)
### 7. 文档解析完成后，所有设置有defer的脚本会按照顺序执行
### 8. document对象触发DOMContentLoaded事件，这也标志着程序执行从`同步脚本执行阶段`，转化为`事件驱动阶段`
### 9. 当所有async的脚本加载完成并执行后，img等加载完成后，document.readyState = 'complete', window对象触发load事件
### 10. 从此，以异步响应方式处理用户输入，网络事件等。

```
<script type="text/javascript">
    console.log(document.readyState);

    document.onreadystatechange = function () {
        console.log(document.readyState);
    };
    document.addEventListener('DOMContentLoaded', function () {
        console.log('同步脚本执行阶段-->事件驱动阶段');
    }, false)
    //对应结果：
    //loading
    //interactive
    //同步脚本执行阶段-->事件驱动阶段
    //complete
</script>
```


