/**
 * File name: -test.js
 * Created by Haodong Chen on July 10, 2019
 * davidchd@outlook.com
 * All right reserved.
 */
const CMDParser = require('../run/command-parser');

// test1();
test2();
// test3();

function test1() {
    test1.a = 'sdfvsvtyny';
    test1.a.prototype.exist = (s) => {
        return !(test1.indexOf(s) < 0);
    };
    console.log(test1.a.exist(x));
}

function test2() {
    const t = new CMDParser('帮我查一下天气然后把窗帘拉开可以吗');
    console.log(t);
}

function test3() {
    //
}
