/*
 * File name: main.js
 * Created by Haodong Chen
 * All rights reserved.
 */

$(document).ready(function() {

    let auth = {
        isAuth: false,
        msg: $("#auth-msg"),
        ref: function() {
            $.post("/auth", {"action":0}, function(data) {
                console.log(data);
                if(data.code === 0) {
                    // auth.isAuth = true;
                    auth.isAuth = data.valid;
                    auth.msg.html(auth.isAuth ? "<p class=\"log-p\" style=\"color: #9acd32;\">Device Authorized, all features are enabled.</p>" : "<p class=\"log-p\" style=\"color: #ff6000;\">Device Unauthorized, click <a href=\"authorize.html\" style=\"color: #ff6000; text-decoration: underline;\">here</a> to authorize.</p>")
                } else {
                    auth.msg.html("<p class=\"log-p\">Unable to check for authorizing status.</p>");
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

    auth.ref();

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
