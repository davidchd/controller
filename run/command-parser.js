/**
 * File name: command-parser.js
 * Created by Haodong Chen on July 10, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

String.prototype.exist = function(s) {
    var count = 0;
    for(const obj of s) {
        if(this.indexOf(obj) >= 0) {
            count += 1;
        }
    }
    return count;
};

function objName(arr) {
    const result = [];
    for(const obj of arr) {
        result.push(obj.name);
    }
    return result;
}

function removePre(str) {
    for(const pre of _keywords.pre) {
        if(str.indexOf(pre) === 0) {
            return str.substring(pre.length);
        }
    }
    return str;
}

function removeSuf(str) {
    for(const suf of _keywords.suf) {
        if(str.indexOf(suf) + suf.length === str.length) {
            return str.substr(0, str.indexOf(suf));
        }
    }
    return str;
}

class CMDparser {

    constructor(str) {
        this.valid =
            (str === undefined || str.trim() === '' ? false :
                str.exist(objName(_keywords.obj)) > 0
            );
        if(this.valid) {
            this.str = str;
            this.strs = [];
            this.cmd = [];
            this.init();
            // this.parse();
        }
    }

    test() {
        return objName(_keywords.obj);
    }

    init() {
        this.splitCMD();
        for(const i in this.strs) {
            this.strs[i] = removeSuf(removePre(this.strs[i]));
        }
    }

    splitCMD(cmd = this.str) {
        var strIdx;
        for(const splitter of _keywords.cmdSplitter) {
            strIdx = cmd.indexOf(splitter);
            if(strIdx >= 0) {
                const beg = cmd.substring(0, strIdx), end = cmd.substring(strIdx + splitter.length);
                if(this.splitCMD(beg)) {
                    this.strs.push(beg);
                }
                if(this.splitCMD(end)) {
                    this.strs.push(end);
                }
                return false;
            }
        }
        return true;
    }

    parse() {
        for(const i in this.strs) {
            normal = this.isNormal(this.strs[i]);
        }
    }

    /**
     * @return true if the order of the phrase is obj+v, false otherwise
     */
    isNormal(str) {
        for(const obj of _keywords.obj) {
            //
        }
    }

    splitOBJ() {
        //
    }

}

const _code = {
};

const _keywords = {
    cmd: [],
    cmdSplitter: ['，然后', '然后', '，再', '再', '并且', '并'],
    objSplitter: ['和', '还有', '跟', '、', '，'],
    pre: ['麻烦一下，', '麻烦一下', '麻烦帮我', '麻烦帮忙', '帮我', '帮忙', '麻烦', '劳驾', '记得', '先', '请'],
    suf: ['可不可以', '可以吗', '行不行', '好不好', '行吗', '行嘛', '好吗', '好嘛', '好了', '了吧', '了啦', '了', '吧', '喽', '嘛', '啦'],
    check: [],
    turnon: [],
    turnoff: [],
    obj: [
        {
            id: 'weather',
            name: '天气',
            args: []
        },
        {
            id: 'light',
            name: '灯',
            args: []
        },
        {
            id: 'ac',
            name: '空调',
            args: []
        },
        {
            id: 'curtain',
            name: '窗帘',
            args: []
        },
        // {
        //     id: '',
        //     name: '',
        //     args: []
        // }
    ]
};

module.exports = CMDparser;
