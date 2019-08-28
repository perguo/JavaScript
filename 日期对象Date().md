#   日期对象 Date()
###  封装函数，打印当前是 何年何月何时何分何秒
### 它是系统提供好的
    var date = new Date()
* date --> 返回年月日时间
* date.getDate() --> 返回一月中的第几天(1-30)
* date.getDay() --> 返回一周中的第几天(0-6)(西方周日代表0)
* date.getMonth() --> 返回月份(0-11) (说明：像这种从0开始的，返回值加1才能对应正确月份)
* date.getYear() --> 返回2位数年份，不用
* date.getFullYear() --> 以4位数返回年份
* date.getHours() --> 返回时(0-23)
* date.getMinutes() --> 返回分(0-59)
* date.getSeconds() --> 返回秒(0-999)
* `date.getTime()` --> 返回1970/1/1至今的毫秒数(纪元时间1970/1/1)
####    date.getTime()很常用，重要。常用它来作`时间戳`,比如验证一个程序执行的效率
```
    var firstTime = new Date().getTime();
    for (var i = 0; i < 100000; i++) {
        var lastTime = new Date().getTime();
    }
    console.log(lastTime - firstTime);
```
### -----------------------------------------
* setDate(): 设置Date对象中月的某一天(1-31)
* setMonth(): 设置Date对象中的月份(0-11)
* setFullYear(): 设置Date对象中的年份(四位数)
* setHours(): 设置Date对象中的小时(0-23)
* setMinutes(): 设置Date对象中的分钟(0-59)
* setSeconds(): 设置Date对象中月的秒数(0-999)
* setTime(): 不好把握时间
* toTimeString(): 把Date中的时间转化成字符串
* toDateString(): 把Date中的日期转化成字符串
#####    设置一个闹钟
```
    var date = new Date();
    date.setMinutes(52);
    setInterval(function () {
        if (new Date().getTime() - date.getTime() > 100){
            console.log('时间到')
        }
    }, 100 )
```











