/**
 * File name: Authorizing.js
 * Created by Haodong Chen on July 8, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

$(function() {
    var respondTime;
    var alert = $('.auth-alert');
    var input = $('#auth-code');
    $('#auth-submit').click(function() {
        respondTime = new Date().getTime();
        $.ajax({
            url: '/authorize',
            type: 'post',
            timeout: 5000,
            data: {'action':1,'authCode':input.val()},
            dataType: 'json',
            success: function(data) {
                if(data.code === 0) {
                    if(data.valid === true) {
                        $(location).attr('href', '/authorize?t=0');
                    } else {
                        alert.html('Invalid Authorization Code');
                    }
                } else {
                    alert.html('Unknown Error when authorizing.');
                    console.log(data);
                }
            },
            error: function(req, err, thrown) {
                alert.html('Unable to authorize because of ' + err);
            },
            complete: function(req, status) {
                respondTime -= new Date().getTime();
                console.log(status + ': Action takes ' + respondTime);
            }
        });
    });
});
