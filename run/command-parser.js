/**
 * File name: command-parser.js
 * Created by Haodong Chen on July 10, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

const _cmd = {
    original: '',
    phrases: []
};

const _keywords = {
    cmd: [],
    obj: ['天气', '灯', '空调'],
    cmdSplit: ['再', '并且', '并', '然后', '还有', '也'],
    objSplit: ['和', '还有', '跟', '、', '，'],
    before: ['帮我', '帮忙', '记得'],
    after: ['了吧', '了啦', '好了', '了', '吧', '喽', '嘛', '啦']
};

class CMDparser {

    constructor(str) {
        this.str = str;
        this.init();
    }

    test() {
        return cmd.original;
    }

    init() {
        if(this.str === undefined || this.str.trim() === ''){
            this.code = -1;
        } else {
            const phrases = [];
        }
    }

    split() {

    }

    removePre(str) {

    }

}

module.exports = CMDparser;
