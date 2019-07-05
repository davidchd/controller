/*
 * File name: authorize.js
 * Created by Haodong Chen
 * All rights reserved.
 */

$(document).ready(function() {

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
            }
        });
    });

});
