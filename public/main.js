/**
 * File name: main.js
 * Created by Haodong Chen on July 4, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

$(document).ready(function() {

    let auth = {
        isAuth: false,
        msg: $("#auth-msg"),
        ref: () => {
            $.post("/auth", {"action":0}, function(data) {
                console.log(data);
                if(data.code === 0) {
                    // auth.isAuth = true;
                    auth.isAuth = data.valid;
                    if(auth.isAuth) {
                        auth.msg.html('Device Authorized, all features are enabled');
                        auth.msg.css('color', '#9acd32');
                    } else {
                        auth.msg.html('Device Unauthorized, please <a href="/auth" style="color: #ff6000; text-decoration: underline;">authorize</a>.');
                        auth.msg.css('color', '#ff6000');
                    }
                } else {
                    auth.msg.html('Unable to check for authorizing status.');
                    auth.msg.css('color', 'black');
                }
            });
            return this.isAuth;
        }
    };
    let logs = {
        holder: $("#logs"),
        add: function(content) {
            this.holder.append("<p class=\"log-p\">" + content + "</p>");
            this.holder.scrollTop(this.holder[0].scrollHeight);
        }
    };

    $(".button").click(function() {
        if(auth.ref()) {
            let act = this.innerHTML;
            logs.add("Try to: " + act);
            $.post("/crl", {"id":this.id}, function(data) {
                //
            });
        } else {
            logs.add("No action is permitted before authorizing the device.");
        }
    });

});
