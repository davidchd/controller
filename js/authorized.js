/**
 * File name: authorized.js
 * Created by Haodong Chen on July 8, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

$(function() {
    var count = {
        s: 3,
        num: $('#num')
    };
    function countdown() {
        count.num.html(count.s);
        if(count.s > 0) {
            count.s -= 1;
            setTimeout(countdown, 1000);
        } else {
            $(location).attr('href', '/');
        }
    }
    countdown();
});
