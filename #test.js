/**
 * File name: -test.js
 * Created by Haodong Chen on July 10, 2019
 * davidchd@outlook.com
 * All right reserved.
 */
const CMDParser = require('./support/support');
const parser2 = require('./support/support');

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
    const m = CMDParser.understand('帮我查一下天气 然后把空调和灯都打开 再设个下午三点的闹钟页 就可以了');
    // for(var outputIdx = 0; outputIdx < t.output.length; outputIdx ++) {
    //     if(! t.output[outputIdx].unable) {
    //         console.log('Command number ' + (outputIdx + 1) + ':', t.output[outputIdx]);
    //     } else {
    //         console.log('Command number ' + (outputIdx + 1) + ': "', t.output[outputIdx].origins, '" unable to parse. ')
    //     }
    // }
    const n = parser2.understand('你说我好看吗');
    console.log(m);
}

function test3() {
}
