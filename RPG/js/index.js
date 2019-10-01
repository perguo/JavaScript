
const img = document.getElementById('img');
let btnsArea = document.getElementsByClassName('btnsArea')[0];


let animate = null;
let move = null;
let num = 0;
let stopImg = null;
let speed = 10;

//判断方向
btnsArea.addEventListener('click', function (e) {
    let flag = e.target.id;

    if (flag === 'stop') {
        clearInterval(animate);
        clearInterval(move);
        img.src = 'img/' + stopImg + '-' + 0 + '.png';
        return -1;
    }
    stopImg = flag;
    if (flag.length > 0) { //确定点击的不是空白区域
        clearInterval(animate);
        clearInterval(move);
        animate = setInterval(function () {    //人物自身的动画
            num ++;
            img.src = 'img/' + flag + '-' + num + '.png';
            num = num % 4;

            /*switch(flag) {
                            case 'lu':
                                img.style.top = img.offsetTop - speed + 'px';
                                img.style.left = img.offsetLeft - speed + 'px';
                                break;
                            case 'down':
                                img.style.top = parseInt(img.style.top) + speed + 'px';
                                break;
                        }*/
        },500)
    }

    //人物的移动动画
    move = setInterval(function () {
        switch(flag){
            case 'lu':
                img.style.left = img.offsetLeft - speed + 'px';
                img.style.top = img.offsetTop - speed + 'px';
                break;
            case 'up':
                img.style.top = img.offsetTop - speed + 'px';
                break;
            case 'ru':
                img.style.left = img.offsetLeft + speed + 'px';
                img.style.top = img.offsetTop - speed + 'px';
                break;
            case 'left':
                img.style.left = img.offsetLeft - speed + 'px';
                break;
            case 'right':
                img.style.left = img.offsetLeft + speed + 'px';
                break;
            case 'ld':
                img.style.left = img.offsetLeft - speed + 'px';
                img.style.top = img.offsetTop +speed + 'px';
                break;
            case 'down':
                img.style.top = img.offsetTop + speed + 'px';
                break;
            case 'rd':
                img.style.left = img.offsetLeft + speed + 'px';
                img.style.top = img.offsetTop + speed + 'px';
                break;
            case 'stop':
                //img.style.left = img.offsetLeft;
                //img.style.top = img.offsetTop;
                //clearInterval(move);
                break;

        }
    }, 500)
});

