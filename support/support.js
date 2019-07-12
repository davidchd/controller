/**
 * File name: support.js
 * Created by Haodong Chen on July 12, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

const util = require('./util');
const parser = require('./command-parser');

module.exports = {
    understand: parser.understand,
    toArr: util.toArr,
    removeBoth: util.removeBoth,
    removePre: util.removePre,
    removeSuf: util.removeSuf,
};
