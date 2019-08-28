#   JS定时器
##  1. setInterval();
### setInterval(function(){  } , 1000 ); 每隔1000ms执行一次function()
####    用setInterval()检测时间
```
    var firstTime = new Date().getTime();
    setInterval(function () {
        var lastTime = new Date().getTime();
        console.log(lastTime - firstTime);
        firstTime = lastTime;
    }, 1000)
    //结果发现，setInterval检测时间并不准
```
## 2. clearInterval()
### (1) window上的方法：window.clearInterval()
### (2) 有返回值，有一个数字作为它的唯一标识。可以通过clearInterval()和这个唯一标识将它清除掉。
```
    var i = 0;
    var timer = setInterval(function () {
        console.log(i++);
        if (i > 9) {
            clearInterval(timer);
        }
    }, 1000)
    //控制台打印timer， 返回1
    // 从0到9，然后停止
```
## 3. setTimeout(); 推迟一段时间后执行
####    应用：电影试看5分钟
```
    setTimeout(function () {
        console.log('a');
    }, 1000)// 推迟1s执行
```
##  4. clearTimeout()
```
    var timer = setTimeout(function () {
        console.log('a');
    }, 100);
    clearTimeout(timer);
```
##  小结：以上4个方法都是全局对象window上的方法，内部函数this指向window
### 补充：setInterval("js代码", 1000);也可写js代码，每隔1s执行一次js代码
    eg:setInterval('console.log("a")', 1000);
    
##  练习：设置一个计时器，显示分和秒，到3分钟的时候停止
```
minutes:<input type="text" value="0" style="font-size: 20px;font-weight: bold;text-align: right">
seconds:<input type="text" value="0" style="font-size: 20px;font-weight: bold;text-align: right">
<script type="text/javascript">
    var minutesNode = document.getElementsByTagName('input')[0];
    var secondsNode = document.getElementsByTagName('input')[1];
    var seconds = 0;
    var minutes = 0;
    var timer = setInterval(function () {
        seconds ++;
        if(seconds === 60) {
            seconds = 0;
            minutes ++;
        }
        minutesNode.value = minutes;
        secondsNode.value = seconds;
        if (minutes === 3){
            clearInterval(timer);
        }
    }, 1000)
</script>
```    










