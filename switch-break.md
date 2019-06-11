##  switch_break, 选择执行语句
### break,终止循环。且只能用于循环语句。
```
let data = window.prompt('input');
    switch (data) {
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
            console.log("working");
            break;
        case "saturday":
        case "sunday":
            console.log("relaxing");
            break;
    }
```

##  continue语句，跳过本次循环（本次循环之后的语句都不执行），继续下一次循环
### 打印出100以内满足不能被7整除和不含7的整数
```
for (let i = 1;i < 100;i ++){
        if (i % 7 == 0 || i % 10 == 7){
            continue;
        }
        /* 当if满足条件时，执行continue，跳过后面的console语句，开始下一轮循环 */
        console.log(i);
    }
```
