Province = {
    "1": '北京市',
    "2": '上海市',
    "3": '河南省',
    "4": '湖北省',
    "5": '河北省',
    "6": '湖南省',
    "7": '四川省',
};
City = {
    "01": [['10','海淀区'],['11','中关村'],['12'],'高新区'],
    "02": [['20','海淀区1'],['21','中关村1'],['22'],'高新区1'],
    "03": [['30','信阳'],['31','新乡'],['32'],'郑州'],
    "04":[['40','武汉'],['41','麻城'],['42'],'襄阳'],
    "05": [['50','洪水'],['51','廊坊'],['52'],'石家庄'],
    "06":[['60','长沙'],['61','翁草'],['62'],'高新区'],
    "07": [['70','成都'],['71','中关村'],['72'],'高新区']
};
let provinceNode = document.getElementsByClassName('provinceSelect')[0];
let cityNode = document.getElementsByClassName('citySelect')[0];

let boss = {
    init: function () { //入口
        this.showProvince();
    },
    showProvince: function () {
        const len1 = Province.length;
        let provinceStr = '';
        for (let i = 0; i < len1; i++) {
            provinceStr += "<li>" + Province[i] + "</li>";
        }
        provinceNode.innerHTML = provinceStr;
    }
    /*showCity: function showCity() {
        const len2 = this.City.length;
        let cityStr = '';
        for (let i = 0;i < len2;i ++) {
            cityStr += "<li>" + this.City[i] + "</li>";
        }
        cityNode.innerHTML = cityStr;
    }*/

}

init();