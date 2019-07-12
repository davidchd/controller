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
String.prototype.exist = function(arr) {
    var count = 0;
    for(const obj of arr) {
        if(this.indexOf(obj) >= 0) {
            count += 1;
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
