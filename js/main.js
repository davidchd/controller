/**
 * File name: main.js
 * Created by Haodong Chen on July 4, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

$(function() {

    var auth = {
        isAuth: false,
        msg: $('#auth-msg'),
        ref: function() {
            $.post('/auth', {'action':0}, function(data) {
                console.log(data);
                if(data.code === 0) {
                    // auth.isAuth = true;
                    auth.isAuth = data.valid;
                    if(auth.isAuth) {
                        auth.msg.css('color', '#9acd32');
                        auth.msg.html('Device Authorized, all features are enabled. <small onclick="revoke()" style="color: #ff6000; text-decoration: underline;">REVOKE</small>');
                    } else {
                        auth.msg.css('color', '#ff6000');
                        auth.msg.html('Device Unauthorized, please <a href="/authorize" style="color: #ff6000; text-decoration: underline;">authorize</a>.');
                    }
                } else {
                    auth.msg.html('Unable to check for authorizing status.');
                    auth.msg.css('color', 'black');
                }
            });
            return this.isAuth;
        }
    };
    var logs = {
        holder: $('#logs'),
        add: function(content) {
            this.holder.append('<p class="log-p">' + content + '</p>');
            this.holder.scrollTop(this.holder[0].scrollHeight);
        }
    };

    $('.button').click(function() {
        if(auth.ref()) {
            var act = this.innerHTML;
            logs.add('Try to: ' + act);
            $.post('/crl', {'id':this.id}, function(data) {
                //
            });
        } else {
            logs.add('No action is permitted before authorizing the device.');
        }
    });

    var revoke = function() {
        auth.msg.css('color', '#ff6000');
        auth.msg.html('Cancel the authorization of this device? ' +
                      '<a id="revokeY" href="javascript:void(0);" style="color: #ff6000; text-decoration: underline;">Confirm</a> ' +
                      '<a id="revokeN" href="javascript:void(0);" style="color: #ff6000; text-decoration: underline;">No</a>');
    }
    $('#revokeY').click(function() {
        //
    });
    $('#revokeN').click(function() {
        //
    });

});
