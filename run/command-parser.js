/**
 * File name: command-parser.js
 * Created by Haodong Chen on July 10, 2019
 * davidchd@outlook.com
 * All right reserved.
 */
const keywords = {
    cmd: [],
    obj: ['天气', '灯', '空调', '', '', '', ''],
    cmdSplit: ['再', '并且', '并', '然后', '还有', '也'],
    objSplit: ['和', '还有', '跟', '、', '，', '']
};

function parse(str) {
    if(str === undefined || str.trim() === ''){
        return {code:-1};
    }
    // change to array
    const result = {
        code: 0,
        cmd: '',
        obj: ''
    };

    if(str.substr(0,1) === '把') {
        //
    }
    return result;
}

module.exports = {
    parse: parse
};
