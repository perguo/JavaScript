# typeof 返回数据类型，有六种：`number`, `string`, `boolean`, object, undefined, function. 
```
    const a = 11;
    console.log(typeof (a)); //返回number
```

```
    const b = "11";
    console.log(typeof (b)); //返回string
```

```
    const d = true;
    console.log(typeof (d));  //返回boolean
```

### {}， [], 都返回object
```
    const c = {};
    console.log(typeof (c)); //返回object
```

```
    const e = [];
    console.log(typeof (e));  //返回object
```

### null 返回object.虽然null原始值是1，但在最原始的时候它是用来代替空对象来占位
```
    const f = null;
    console.log(typeof (f));  // 返回object

```


##  js的类型转换功能（其他语言没有这个功能）
```
    let num = "2" - "1";
    console.log(typeof (num) + ":" + num); 
```
   number:1
   
```
    let num1 = "2" * "1";
    console.log(typeof (num1) + ":" + num1); 
```
   number:2
