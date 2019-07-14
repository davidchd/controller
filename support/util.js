/**
 * File name: util.js
 * Created by Haodong Chen on July 12, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

module.exports = {
    toArr: toArr,
    removeBoth: removeBoth,
    removePre: removePre,
    removeSuf: removeSuf,
};

/**
 * prototype function
 */
String.prototype.exist = function(e) {
    var count = 0;
    if(typeof e === 'string') {
        if(e.length > 0 && this.indexOf(e) >= 0) {
            count += 1 + this.substring(this.indexOf(e) + e.length).exist(e);
        }
    } else {
        for (const obj in e) {
            if (e[obj] instanceof Array) {
                count += ~~(this.exist(e[obj]) > 0);
            } else if (this.indexOf(e[obj]) >= 0) {
                count += 1;
            }
        }
    }
    return count;
};

/**
 * read an {@param objList} of objects,
 * extract the {@param key} of each object in the array,
 * @return Array
 * a new array which are values of the key of the objects
 */
function toArr(objList, key = undefined) {
    const arr = [];
    if(objList instanceof Array && key === undefined) {
        key = 'id';
    } else if(key === undefined) {
        for(const obj in objList) {
            arr.push(obj);
        }
        return arr;
    }
    for(const obj in objList) {
        arr.push(objList[obj][key]);
    }
    return arr;
}

function removeBoth(str, arr) {
    return removeSuf(removePre(str, arr), arr);
}

/**
 * remove prefix of a given string
 */
function removePre(str, arr) {
    str = str.trim();
    let impurity = true;
    while(str !== '' && impurity) {
        impurity = false;
        for(const pre of arr) {
            if(str.indexOf(pre) === 0) {
                str = str.substring(pre.length).trim();
                impurity = true;
            }
        }
    }
    return str;
}

/**
 * remove suffix of a given string
 */
function removeSuf(str, arr) {
    str = str.trim();
    let impurity = true, strIdx;
    while(str !== '' && impurity) {
        impurity = false;
        for(const suf of arr) {
            strIdx = str.indexOf(suf);
            if(strIdx >= 0 && str.substring(strIdx) === suf) {
                str = str.substr(0, strIdx).trim();
                impurity = true;
            }
        }
    }
    return str;
}
