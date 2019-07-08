/**
 * File name: wechat.js
 * Created by Haodong Chen on July 7, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

$(function() {
    var img = {
        obj: $('#img'),
        ref: function() {
            console.log('ref');
            img.obj.attr('src', '/wechatQR?t=' + new Date().getTime());
        }
    };
    img.obj.click(img.ref);
    setInterval(img.ref, 5 * 1000);
});
