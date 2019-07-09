/**
 * File name: main.js
 * Created by Haodong Chen on July 4, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

$(function() {

    var respondTime;

    var auth = {
        isAuth: false,
        msg: $('#auth-msg'),
        ref: function() {
            respondTime = new Date().getTime();
            $.ajax({
                url: '/authorize',
                type: 'post',
                timeout: 5000,
                data: {action:0},
                dataType: 'json',
                success: function(data) {
                    if(data.code === 0) {
                        // auth.isAuth = true;
                        auth.isAuth = data.valid;
                        if(auth.isAuth) {
                            auth.msg.css('color', '#9acd32');
                            auth.msg.html(
                                'Device Authorized, all features are enabled. ' +
                                '<a id="revoke" href="javascript:void(0);" ' +
                                'style="color: #ff6000; text-decoration: underline;">REVOKE</a>'
                            );
                            $('#revoke').click(function() {
                                auth.msg.css('color', '#ff6000');
                                auth.msg.html(
                                    'Cancel the authorization of this device? ' +
                                    '<a id="revokeY" href="javascript:void(0);" ' +
                                    'style="color: #ff6000; text-decoration: underline;">Confirm</a> ' +
                                    '<a id="revokeN" href="javascript:void(0);" ' +
                                    'style="color: #ff6000; text-decoration: underline;">No</a>'
                                );
                                $('#revokeY').click(function() {
                                    $.ajax({
                                        url: '/authorize',
                                        type: 'post',
                                        timeout: 5000,
                                        data: {action:2},
                                        dataType: 'json',
                                        success: function(data) {
                                            if(data.code === 0) {
                                                auth.ref();
                                            } else {
                                                logs.add('Unknown Error when revoking.');
                                                console.log(data);
                                                auth.ref();
                                            }
                                        },
                                        error: function(req, err, thrown) {
                                            auth.msg.html('Unable to revoke because of ' + err);
                                            auth.msg.css('color', 'black');
                                            console.log(thrown);
                                        }
                                    });
                                });
                                $('#revokeN').click(function() {
                                    auth.ref();
                                });
                            });
                        } else {
                            auth.msg.css('color', '#ff6000');
                            auth.msg.html('Device Unauthorized, please <a href="/authorize" style="color: #ff6000; text-decoration: underline;">authorize</a>.');
                        }
                    } else {
                        logs.add('Unknown Error when check for authorization status.');
                        console.log(data);
                        auth.ref();
                    }
                },
                error: function(req, err, thrown) {
                    auth.msg.html('Unable to check for authorizing status because of ' + err);
                    auth.msg.css('color', 'black');
                    console.log(thrown);
                },
                complete: function(req, status) {
                    respondTime -= new Date().getTime();
                    console.log(status + ': Action takes ' + respondTime);
                }
            });
            return auth.isAuth;
        }
    };
    var logs = {
        holder: $('#logs'),
        add: function(content) {
            logs.holder.append('<p class="log-p">' + content + '</p>');
            logs.holder.scrollTop(this.holder[0].scrollHeight);
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

    auth.ref();

});
