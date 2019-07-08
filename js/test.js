/**
 * File name: test.js
 * Created by Haodong Chen on July 4, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

$(function() {
    var alert = $("#auth-alert");
    var input = $("#auth-code");
    $("#auth-submit").click(function() {
        $.post("/auth", {"action":1,"authCode":input.val()}, function(data) {
            if(data.code === 0) {
                if(data.valid === true) {
                    alert.html("");
                } else {
                    alert.html("Invalid Authorization Code");
                }
            } else {
                alert.html("Connot Connect to the Server")
            }
        });
    });
});
