/**
 * File name: command-parser.js
 * Created by Haodong Chen on July 10, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

const util = require('./util');

/**
 * check for ability to be parsed
 * then process cmd
 *
 * @param str
 * original sentences
 */
function understand(str) {
    result = {};
    strs = [];
    result.valid =
        (str === undefined || str.trim() === '' ? false :
            str.exist(util.toArr(_keywords.obj, 'name')) > 0
        );
    result.legal = str.search(/[A-Za-z0-9 ]/) < 0;
    if(result.valid) {
        result.str = str;
        // result.strs = strs; // for debugging ONLY
        result.output = [];
        init();
        parse();
    }
    return result;
}

/**
 * split sentences into single phrase
 * remove unnecessary prefix and suffix
 */
function init() {
    splitCMD();
    if(strs.length === 0) {
        strs.push(result.str);
    }
    for(const i in strs) {
        strs[i] = removePreSuf(strs[i]);
        result.output[i] = {origins:strs[i]};
    }
}

/**
 * try to parse each phrase
 */
function parse() {
    for(const i in strs) {
        if(checkOBJ(i) && checkACT(i)) {
            if(strs[i].trim().length === 0) {
                result.output[i].flag = 'parsed';
            } else {
                //
            }
        } else {
            result.output[i].flag = 'unable';
        }
    }
}

/**
 * @param cmd
 * result.str by default
 * or for recursion purpose
 *
 * @return boolean
 * for recursion purpose
 */
function splitCMD(cmd = result.str) {
    cmd = removePreSuf(cmd);
    let strIdx, beg, end;
    for(const splitter of _keywords.cmdSplitter) {
        strIdx = cmd.indexOf(splitter);
        if(strIdx >= 0) {
            beg = cmd.substr(0, strIdx);
            end = cmd.substring(strIdx + splitter.length);
            if(splitCMD(beg)) {
                strs.push(beg.trim());
            }
            if(splitCMD(end)) {
                strs.push(end.trim());
            }
            return false;
        }
    }
    if(cmd.exist(_keywords.actions) > 1 && cmd.exist(' ') === 1) {
        beg = cmd.substr(0, cmd.indexOf(' '));
        end = cmd.substring(cmd.indexOf(' ') + 1);
        if(splitCMD(beg)) {
            strs.push(beg.trim());
        }
        if(splitCMD(end)) {
            strs.push(end.trim());
        }
        return false;
    }
    return true;
}

/**
 * @return boolean
 * true when extracting completed
 */
function checkOBJ(i) {
    strs[i] = removePreSuf(strs[i]);
    const objNames = util.toArr(_keywords.obj, 'name');
    const occurence = strs[i].exist(objNames);
    if(occurence === 0 || strs[i].trim().length === 0) {
        return false;
    }
    if(strs[i].charAt(0) === '把' || strs[i].charAt(0) === '将') {
        strs[i] = strs[i].substring(1);
        return checkOBJ(i);
    }
    let strIdx;
    for(const obj in _keywords.obj) {
        strIdx = strs[i].indexOf(_keywords.obj[obj].name);
        // parse _keywords.obj[obj] at beginning
        if(strIdx === 0) {
            if(occurence > 1){
                return splitOBJ(i, true);
            } else {
                result.output[i].obj = obj;
                strs[i] = strs[i].substring(_keywords.obj[obj].name.length);
                return true;
            }
        }
        // parse _keywords.obj[obj] at ending
        if(strIdx >= 0 && strs[i].substring(strIdx) === _keywords.obj[obj].name) {
            if(occurence > 1){
                return splitOBJ(i, false);
            } else {
                result.output[i].obj = obj;
                strs[i] = strs[i].substr(0, strIdx);
                return true;
            }
        }
        // mark
        if(occurence === 1 && strIdx > 0) {
            result.output[i].obj = obj;
            strs[i] =
                    strIdx > (strs[i].length - strIdx - _keywords.obj[obj].name.length) ?
                    strs[i].substr(0, strIdx) :
                    strs[i].substring(strIdx + _keywords.obj[obj].name.length);
            return true;
        }
    }
    // try
    if(occurence > 1) {
        return splitOBJ(i, undefined);
    }
    // failed to parse
    return false;
}

/**
 * @param i
 * index of elements in strs
 *
 * @param normal
 * true if the order of the phrase is obj+v
 * false for v+obj
 * undefined for unknown
 *
 * @return boolean
 * true when splitting completed
 */
function splitOBJ(i, normal) {
    result.output[i].obj = [];
    let strIdx, stuck;
    const objArr = util.toArr(_keywords.obj, 'name');
    switch(normal) {
        case true:
            while(strs[i].exist(objArr)) {
                stuck = true;
                for(const obj in _keywords.obj) {
                    strIdx = strs[i].indexOf(_keywords.obj[obj].name);
                    if(strIdx === 0) {
                        stuck = false;
                        result.output[i].obj.push(obj);
                        strs[i] = util.removePre(strs[i].substring(_keywords.obj[obj].name.length), _keywords.objSplitter);
                    }
                }
                if(stuck) {
                    return false;
                }
            }
            return true;
        case false:
            while(strs[i].exist(objArr)) {
                stuck = true;
                for(const obj in _keywords.obj) {
                    strIdx = strs[i].indexOf(_keywords.obj[obj].name);
                    if(strIdx >= 0 && strs[i].substring(strIdx) === _keywords.obj[obj].name) {
                        stuck = false;
                        result.output[i].obj.push(obj);
                        strs[i] = util.removeSuf(strs[i].substr(0, strIdx), _keywords.objSplitter);
                    }
                }
                if(stuck) {
                    return false;
                }
            }
            return true;
        default:
            console.log('To be finished :- split objects in the middle');
            return false;
    }
}

/**
 * @param i
 * index of elements in strs
 *
 * @return boolean
 * true when extracting completed
 */
function checkACT(i) {
    strs[i] = removePreSuf(strs[i]);
    if(strs[i].trim().length === 0 || strs[i].exist(_keywords.actions) !== 1) {
        return false;
    }
    strs[i] = util.removeBoth(strs[i], _keywords.mid);
    let strIdx;
    for(const acts in _keywords.actions) {
        for(const act of _keywords.actions[acts]) {
            strIdx = strs[i].indexOf(act);
            if(strIdx >= 0) {
                result.output[i].act = acts;
                strs[i] =
                        strIdx > (strs[i].length - strIdx - act.length) ?
                        strs[i].substr(0, strIdx) :
                        strs[i].substring(strIdx + act.length);
                return true;
            }
        }
    }
    return false;
}

function removePreSuf(e) {
    return util.removeSuf(util.removePre(e, _keywords.pre), _keywords.suf);
}

let result;
let strs = [];

const _keywords = {
    cmdSplitter: ['，然后再', '，之后再', '，然后', '，之后', '之后再', '然后', '之后', '，对了', '对了', '并且', '，再', '再', '并'],
    objSplitter: ['还有', '和', '跟', '、', '，'],
    pre: ['麻烦', '一下', '帮我', '帮忙', '给我', '劳驾', '记得', '先', '请', '，'],
    suf: ['可不可以', '就可以了', '行不行', '好不好', '就好了', '可以', '行', '好', '了', '吧', '喽', '嘛', '啦'],
    mid: ['一下', '都', '个', '的', '了'],
    actions: {
        check: ['看看', '查查', '查看', '问问', '看', '查', '问'],
        turnon: ['打开', '启动', '开启', '开开', '开', '启'],
        turnoff: ['关上', '关闭', '停止', '关', '停'],
        set: ['配置', '设置', '设定', '调', '配', '设', '定'],
    },
    obj: {
        weather: {
            name: '天气',
            args: []
        },
        light: {
            name: '灯',
            args: []
        },
        ac: {
            name: '空调',
            args: []
        },
        curtain: {
            name: '窗帘',
            args: []
        },
        alarm: {
            name: '闹钟',
            args: []
        },
        window: {
            name: '窗户',
            args: []
        },
        door: {
            name: '门',
            args: []
        },
        // '': {
        //     name: '',
        //     args: []
        // },
        // '': {
        //     name: '',
        //     args: []
        // },
        // '': {
        //     name: '',
        //     args: []
        // },
    }
};

module.exports = {
    understand: understand,
};
