#   RegExp--正则表达式
### 正则表达式的作用：匹配特殊字符或有特殊搭配原则的字符的最佳选择
### 两种创建方式
   *   直接量
        *   ```
               var reg = /abc/;
               var str = "abcd";
            ```
                console.log(reg.test(str));--> true
        *   var reg = /abc/i;`ignore` `忽视大小写`
        *   var reg = /abc/g; `global` `全局匹配`
        *   var reg = /abc/m; `多行匹配`
   *    new RegExp()
        ```
           var str = "abcd";
           var reg = new RegExp('abc');
           // reg.test(str) --> true
        ```
        ```
        var reg = new RegExp("abc", "i");
        // 可以放属性
        ```
        ```
        var reg = /abce/g;
        var reg1 = new RegExp(reg);
        // reg属性改变时不会影响reg1
        var reg2 = RegExp(reg);
        // reg属性改变时，reg2随之改变（两者实质一样，只是长得有差别
        ```
   ps:reg.test()--> 返回true or false
   str.match(reg) --> 返回出匹配的结果（包含个数）
## 正文内容：各种符号含义
####    1. []:代表一位，内部写范围。如：[0-9], [A-z],[1-9A-z]
   *   ```
        var reg = /[ab][cd][d]/g;   
        var str = "abcd";
        // str.match(reg) --> bcd 
       ```
####    2./[^a]/:表示非a; /a|b/: 表示a或b
   *   ```
       var reg = /[^a][^b]/g; //查找第一位非a，第二位非b
       var reg1 = /(abc|bcd)/g; // 查找abc或bcd
        ```
####    3. (1) \w === [0-9A-z]. w:world
####    3. (2) \W === [^\w]  
####    4. (1) \d === [0-9]
####    4. (2) \D === [^\d]       
####    5. (1) \s === \n(换行符) + \f(换页符 ) + \r(回车符) +\t(制表符) + \v(垂直制表符)  ； \s查找空白字符(空白符，制表符，回车符，换行符。垂直制表符，换页符)
####    5. (2) \S === [^\s] 
####    6. (1) \b === 单词边界   
####    6. (2) \B === 非单词边界  
   *    ```
        var reg = /\bcde/g;
        var str = "abc cde fgh"; //str有6个单词边界
        //str.match(reg)会取出cde
        ``` 
####    7. (1) \xxx ：查找以八进制数xxx规定的字符
####    7. (2) \xdd ：查找以八进制数dd规定的字符
####    8. `\uxxx` 查找以16进制xxxx规定的UniCode字符              
        匹配全部：`/[\u0000-\uffff]/`, `/[\s\S]/`, `/[\d\D]/`          
####    9. . === [^\r\n] 查找（除了换行符和行结束符的）单个字符

## 转义字符 ： “\”
    *   "\"可以将其后面的符号转换成文本
     ```
     var str = "abc\"def";
     // str回车 --> abc"def
     ```
    *   \n 换行，在document中不行，不能用document.write,需用console.log(str)
   ```
   vat str = "abc\ndef";
   //console上：str回车 --> abc(这里是换行) def
   ```
    *   \r 行结束符
   ```
   var str = "abc\r\ndef";
   //console上：str回车 --> abc(这里是换行) def
   ```
    *   \t == \table, 缩进（一个缩进 = 4个空格），制表符
   ```
   var str = "abc\tdef";
   //console上：str回车 --> abc(这里是4个空格）def
   ```
### 多行字符串
####    字符串不允许分行，会报错；`加“\”解决`
```
var test = "<div></div>\
            <span></span>\"
// console上：test回车 --> " <div></div>   <span<</span> "             
```

##  量词
### 1.1 n+ 表示 {1, }， 前面的变量可以出现1次到多次
```
var reg = /\w+/g;
var str = "abc";
//str.match(reg)回车 --> ["abc"]
```
####    正则表达式的`贪婪匹配`原则：尽可能地匹配多个
### 1.2 n* 表示 {0, }， 前面的变量可以出现0次到多次
```
var reg = /\w*/g;
var str = "abc";
//str.match(reg)回车 --> ["abc", ""]
```
```
var reg = /\d*/g;
var str = "abc";
//str.match(reg)回车 --> ["", "", "", ""]
```
### 2. n？ 表示 {0,1}， 取0到1个
```
var reg = /\w?/g;
var str = "abc";
//str.match(reg)回车 --> ["a", "b", "c", ""]
```
### 3. n{x}  表示取x个进行匹配
```
var reg = /\w{3}/g;
var str = "abc";
//str.match(reg)回车 --> ["abc"]
```
### 4. n{x, y} 取x到y个进行匹配
```
var reg = /\w{1,3}/g;
var str = "abcd";
//str.match(reg)回车 --> ["abc", "d"]
```
### 5. n{x, } 取x个到无穷个进行匹配

##  同样重要篇
### 1.1 `n$` 匹配任何`结尾为n`的字符串
### 1.2 `^n` 匹配任何`开头为n`的字符串
```
var reg = /^abc$/g; //abc开头,abc结尾
var str = "abcabc";
//str.match(reg)回车 --> null
```
### 2.1 `?=n` 匹配任何`其后紧接指定字符串n`的字符串（正向预查、正向断言）
### 2.2 `?！n` 匹配任何`其后没有紧接指定字符串n`的字符串
####    匹配出符合这样的a的字符串：a后面紧跟b的字符串
```
var str = "abaaaa";
var reg = /a(?=b)/g;
//str.match(reg)回车 --> ["a"]
```

##  练习：写一个正则表达式，检验字符串首尾是否含有数字
```
var str = "123abc";
var reg = /^\d|\d$/g;
//reg.test(str)回车 --> true
```
##  思考：写一个正则表达式，检验字符串首尾是否都含有数字
```
var str = "123abc";
var reg = /^\d[\s\S]*\d$/g;
//reg.test(str)回车 --> true
```

#   总结
##  *, +, ?
    * 表示0次或多次，等同于{0, }. c* === c{0, }
    + 表示1次或多次，等同于{1, }. c+ === c{1, }
    ? 表示0次或1次，等同于{0,1}. c? === c{0,1}
##  打破`贪婪匹配`
```
var str = "aaaa";
var reg1 = /a/g;
var reg2 = /a+?/g;
var reg3 = /a*?/g;
//str.match(reg1)回车 --> ["aaaa"]
//str.match(reg2)回车 --> ["a","a","a","a"]
//str.match(reg3)回车 --> ["","","",""]
```   
    {1,5} --> 贪婪匹配
    {1,5}? --> 非贪婪匹配
##  reg  =/ /g; 打空格，即匹配空格
##  转义字符的应用
```
var str = "aa\\aa";
var reg = /\/g; //错误
var reg = /\\/g; //正确，结果：["\"]
```
```
var str = "aa?aa";
var reg = /?/g; //错误
var reg = /\?/g; // 正确，结果：["?"]
```
    ?, +, -, ()等都类似
    
##  去重
```
var str = "aabbbcccccc";
var reg = /(\w)\|*/g;
console.log(str.replace(reg, "$1")); //abc
```
    $1 表示第一个子表达式的内容
    
##  reg.exec()
```
var reg = /ab/g; //若不加g,每次lastIndex都从0开始
var str = "ababab";
console.log(reg.lastIndex); // 0
console.log(reg.exec(str)); // ["ab"]
console.log(reg.lastIndex); // 2
console.log(reg.exec(str)); // ["ab"]
console.log(reg.lastIndex); // 4
console.log(reg.exec(str)); // ["ab"]
console.log(reg.lastIndex); // 6
console.log(reg.exec(str)); // null
console.log(reg.lastIndex); // 0
console.log(reg.exec(str)); // ["ab"]
```
    reg.exec()函数，index一直在变（直接在控制台打印只有["ab"]，看不出效果）
### /(a)\1/g; 匹配第一个子表达式的内容
### \1 --> 反向引用第一个子表达式的内容
```
var str = "aaaa";
var reg = /(\w)\1\1\1/g; //三次反向引用
//str.match(reg)回车 --> ["aaaa"]
```
```
var str = "aaaabbbb";
var reg = /(\w)\1\1\1/g; //三次反向引用
//str.match(reg)回车 --> ["aaaa", "bbbb"]
```
    思考：如何匹配出形如："aabb"这样的字符串
    var reg = /(\w)\1(\w)\2/g;
### 练习
```
var str = "aabb";
var reg = /(\w)\1(\w)\1/;
console.log(reg.exec(str));
// 结果：["aabb", "a", "b", index: 0, input: "aabb"]
// 'a' -> 第一个匹配的为；'b' -> 第二个匹配的位
// 当reg 有g时，结果不变

console.log(str.match(reg));
// 结果：["aabb", "a", "b", index: 0, input: "aabb"]
// 当reg 有g时，结果：["aabb"]

console.log(str.search(reg));
//结果：0 （返回匹配到的位置）
// 当匹配不到结果时，返回 -1

console.log(str.split(reg));//按正则表达式拆
// 结果：["", "a", "b", ""]
```

### reg.replace("a", "b") --> 把a替换成b
    reg.replace()没有访问全局的能力，只能匹配一个
```
var str = "aa";
console.log(replace("a", "b"); //结果：ba
```
####    replace()的正则表达式的写法
```
var reg = /a/g;
var str = "aa";
console.log(str.replace(reg, "b"); //结果：bb
```
##  练习:将aabb改为bbaa
```
var str = "aabb";
var reg = /(\w)\1(\w)\2/g;
console.log(str.replace(reg, "$2$2$1$1");//$2:第二个子表达式的内容
//或者下面一种写法（推荐）
console.log(str.replace(reg, function() {
     return $2 + $2 + $1 +$1
}
```

### str.toUpperCase() --> 转换成大写
### str.toLowerCase() --> 转换成小写
```
str = "aabb";
//str.toUpperCase()回车 --> AABB
//str.toUpperCase().toLowerCase回车 --> aabb
```
##  练习：将the-first-name改为小驼峰式命名theFirstName
```
var str = "the-first-name";
var reg = /-(\w)/g; //选出-f, -n
console.log(str.replace(reg, function($, $1) {
     return $1.toUpperCase();
}));

```

##  baidu笔试题（超难）：科学计数法
```
var str = "1000000000"; //1.000.000.000
//思路：逆着数，每3个0点一个点
// $后面有3个0结尾
// (\d{3})+$
// ?=(\d{3})+$
var reg = /(?=(\d{3})+$)/g;
console.log(str.replace(reg, "."));
```
    上述代码有缺陷，当str = "100000000"时，会返回 .100.000.000
    改进版：添加非单词边界
```
    var str = "100000000";
    var reg = /(?=(\B)(\d{3})+$)/g;
    console.log(str.replace(reg, "."));
```


##  练习：
### 1.匹配手机号：reg = /^[1][3,4,5,7,8][0-9]{9}$/;

### 2.验证邮箱格式：
####  首先分析一下：
  eg: 123@qq.com,  zhang-san@qq.com, blog123@sina.com
  * @之前必须有内容，且只能是字母（大小写）、数字、下划线(_)、减号(-)、点(.)；
  * @和最后一个点(.)之间必须有内容，且只能是字母(大小写)、数字、点(.)、减号(-)，且两个点不能挨着；
  * 最后一个点(.)之后必须有内容，且内容只能是字母(大小写)、数字且长度大于等于2个字节，小于等于6个字节
### reg = /^([a-zA-Z0-9])(\w|[-_.])+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})/
### reg.test(email)

