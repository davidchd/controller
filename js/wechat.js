/**
 * File name: wechat.js
 * Created by Haodong Chen on July 7, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

$(function() {
    var img = $("#img");
    setInterval(function() {
        img.attr('src', '/wechatQR?t=' + new Date().getTime())
    }, 10 * 1000);
});
