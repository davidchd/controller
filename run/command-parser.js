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

function toArr(arr, key = 'id') {
    const result = [];
    for(const obj of arr) {
        result.push(obj[key]);
    }
    return result;
}

function removePre(str) {
    for(const pre of _keywords.pre) {
        if(str.indexOf(pre) === 0) {
            return str.substring(pre.length).trim();
        }
    }
    return str;
}

function removeSuf(str) {
    for(const suf of _keywords.suf) {
        if(str.indexOf(suf) + suf.length === str.length) {
            return str.substr(0, str.indexOf(suf)).trim();
        }
    }
    return str;
}

/**
 * class start
 */
class CMDparser {

    /**
     * check for parseablity first
     * if unavailable do not try to parse
     *
     * @param str
     * original sentences
     */
    constructor(str) {
        this.valid =
            (str === undefined || str.trim() === '' ? false :
                str.exist(toArr(_keywords.obj, 'name')) > 0
            );
        if(this.valid) {
            this.str = str;
            this.strs = [];
            this.output = [];
            this.init();
            this.parse();
        }
    }

    test() {
        return toArr(_keywords.obj, 'name');
    }

    /**
     * split sentences into single phrase
     * remove unnecessary prefix and suffix
     */
    init() {
        this.splitCMD();
        for(const i in this.strs) {
            this.strs[i] = removeSuf(removePre(this.strs[i]));
        }
    }

    /**
     * @param cmd
     * this.str by default
     * or for recursion purpose
     *
     * @return boolean
     * for recursion purpose
     */
    splitCMD(cmd = this.str) {
        var strIdx;
        for(const splitter of _keywords.cmdSplitter) {
            strIdx = cmd.indexOf(splitter);
            if(strIdx >= 0) {
                const beg = cmd.substring(0, strIdx), end = cmd.substring(strIdx + splitter.length);
                if(this.splitCMD(beg)) {
                    this.strs.push(beg.trim());
                }
                if(this.splitCMD(end)) {
                    this.strs.push(end.trim());
                }
                return false;
            }
        }
        return true;
    }

    /**
     * try to parse each phrase
     */
    parse() {
        for(const i in this.strs) {
            if(this.checkOBJ(i)) {
                //
            }
        }
    }

    /**
     * @return boolean
     * true when parse completed
     */
    checkOBJ(i) {
        const objNames = toArr(_keywords.obj, 'name');
        const occurence = this.strs[i].exist(objNames);
        if(occurence === 0) {
            return false;
        }
        if(this.strs[i].charAt(0) === '把' || this.strs[i].charAt(0) === '将') {
            this.strs[i] = this.strs[i].substring(1);
            return this.checkOBJ(i);
        }
        for(const obj of _keywords.obj) {
            const strIdx = this.strs[i].indexOf(obj.name);
            // parse obj at beginning
            if(strIdx === 0) {
                if(occurence > 1){
                    return this.splitOBJ(i, true);
                } else {
                    this.output[i] = {'obj':obj.id};
                    this.strs[i] = this.strs[i].substring(obj.name.length);
                    return true;
                }
            }
            // parse obj at ending
            if(strIdx + obj.name.length === this.strs[i].length) {
                if(occurence > 1){
                    return this.splitOBJ(i, false);
                } else {
                    this.output[i] = {'obj':obj.id};
                    this.strs[i] = this.strs[i].substr(0, strIdx);
                    return true;
                }
            }
            // mark
            if(occurence === 1 && strIdx > 0) {
                this.output[i] = {'obj':obj.id};
                this.strs[i] =
                    this.strs[i].substr(0, strIdx) +
                    ' ' +
                    this.strs[i].substring(strIdx + obj.name.length);
                return true;
            }
        }
        // try
        if(occurence > 1) {
            return this.splitOBJ(i, undefined);
        }
        // failed to parse
        return false;
    }

    /**
     * @param i
     * index of elements in this.strs
     *
     * @param normal
     * true if the order of the phrase is obj+v
     * false for v+obj
     * undefined for unknown
     *
     * @return boolean
     * true when parse completed
     */
    splitOBJ(i, normal) {
        //
    }

}

const _code = {
};

const _keywords = {
    cmdSplitter: ['，然后再', '，然后', '然后', '，之后再', '，之后', '之后再', '之后', '，再', '再', '并且', '并'],
    objSplitter: ['和', '还有', '跟', '、', '，'],
    pre: ['麻烦一下，', '麻烦一下', '麻烦帮我', '麻烦帮忙', '帮我', '给我', '帮忙', '麻烦', '劳驾', '记得', '先', '请'],
    suf: ['可不可以', '就可以了', '可以了', '可以吗', '行不行', '好不好', '就好了', '行吗', '行嘛', '好吗', '好嘛', '好了', '了吧', '了啦', '了', '吧', '喽', '嘛', '啦'],
    check: [],
    turnon: [],
    turnoff: [],
    set: [],
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
        {
            id: 'alarm',
            name: '闹钟',
            args: []
        },
        // {
        //     id: '',
        //     name: '',
        //     args: []
        // },
        // {
        //     id: '',
        //     name: '',
        //     args: []
        // },
        // {
        //     id: '',
        //     name: '',
        //     args: []
        // },
        // {
        //     id: '',
        //     name: '',
        //     args: []
        // },
        // {
        //     id: '',
        //     name: '',
        //     args: []
        // },
    ]
};

module.exports = CMDparser;
