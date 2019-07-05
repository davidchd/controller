// require tools
var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require('express-session');

// declare variables
const seed = "IhapoAPaaiX";

// init
var app = express();
var inCode;
fs.readFile(__dirname + "\\map.json", function(err, data) {
    var tem = JSON.parse(data);
    inCode = tem.in;
    // console.log(authCode)
});
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    name: "davidchdCRL",
    secret: seed
}));

// authorize device
app.post('/auth', function(req, res) {
    switch(req.body.action) {
        case '1':
            let authCode = req.body.authCode;
            let now = new Date();
            let validate = (now.getMonth() + 1) + "/" + now.getDay() + ", " +
                now.getFullYear() + " davidchd AUTH";
            if(authCode === validate) {
                req.session.valid = true;
            }
        case '0':
            res.send({
                code: 0,
                valid: req.session.valid
            });
            break;
        case '2':
            //
            break;
        default:
            res.send({code:-1});
    }
});

// control block
app.post('/crl', function(req,res) {
    if(req.session.valid) {
        // process req
    } else {
        res.send({code:1});
    }
});

// start server
app.listen(3000);
