/**
 * File name: template.js
 * Created by Haodong Chen on July 9, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

$.ajaxSetup({timeout:5000});

$.ajax({
    url: '/authorize',
    type: 'post',
    timeout: 5000,
    data: {action:0},
    dataType: 'json',
    success: function(data) {
        //
    },
    error: function(req, err, thrown) {
        //
    }
});
