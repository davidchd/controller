/**
 * File name: -server.js
 * Created by Haodong Chen on July 4, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

// require tools
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');
const uglify = require('uglify-js');

// declare variables and supported functions
const seed = 'IhapoAPaaiX';
let inCode, app;
var qrcodeURL = '';
function miniCode(filename, funcs = null) {
    const code = uglify.minify(fs.readFileSync('./renderJS/' + filename + '.js','utf8'), {compress:{unused:false},mangle:false});
    console.log('Minifying ' + filename + '.js error: ' + code.error);
    return code.code;
}

/**
 * init server
 */
function init() {
    fs.readFile('./map.json', (err, data) => {
        const tem = JSON.parse(data);
        inCode = tem.in;
    });
    app = express();
    app.engine('.html', ejs.__express);
    app.set('views', './renderHTML');
    app.set('view engine', 'html');
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(session({
        name: 'davidchdCRL',
        secret: seed
    }));
}

/**
 * setup listeners
 */
function setup() {
    // index front end
    app.get('/', (req, res) => {
        res.render('index', {
            msg:
                'Checking for authorization status...',
            code: miniCode('main', )
        });
    });
    // auth front end
    app.get('/authorize', (req, res) => {
        res.render('widget', req.session.valid ? {
            title: 'Authorization',
            content:
                '<p class="auth-alert">\n' +
                '    <b>You have successfully authorized this device.</b><br />\n' +
                '    You will be redirect to the control panel in <b id="num"></b>.<br />\n' +
                '</p>' +
                '<a class="auth-alert" href="/">redirect now</a>',
            code: miniCode('authorized')
        } : {
            title: 'Authorization',
            content:
                '<p class="auth-alert"></p>\n' +
                '<input id="auth-code" type="password" placeholder="Authorization Code" />\n' +
                '<a style="text-decoration: none;" href="javascript:void(0);">\n' +
                '    <p id="auth-submit">AUTHORIZE THIS DEVICE</p>\n' +
                '</a>',
            code: miniCode('authorizing')
        });
    });
    // front end test
    app.get('/test', (req, res) => {
        res.render('test', {
            code: miniCode('test')
        });
    });
    // wechat front end
    app.get('/wechat', (req, res) => {
        res.render('widget', {
            title: 'WeChat Login',
            content: '<img id="img" src="/wechatQR?t=0" width="100%" />',
            code: miniCode('wechat')
        });
    });
    // generate wechat login qr code
    app.get('/wechatQR', (req, res) => {
        const img = qr.image(qrcodeURL, {size:20,margin:1});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    });
    // authorize device
    app.post('/auth', (req, res) => {
        switch(req.body.action) {
            case '1':
                const authCode = req.body.authCode;
                // const now = new Date();
                // const validate = (now.getMonth() + 1) + '/' + now.getDate() + ', ' + now.getFullYear() + ' davidchd AUTH ';
                const validate = '  ';
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
                req.session.valid = false;
                req.session.destroy(() => {
                    res.send({code: 0});
                });
                break;
            default:
                res.send({code:-1});
        }
    });
    // RESERVED control interface
    app.post('/crl', (req,res) => {
        if(req.session.valid) {
            // process req
        } else {
            res.send({code:1});
        }
    });
}

/**
 * start server
 */
function start(port = 3000) {
    app.listen(port);
}

module.exports = {
    values: {
        qrcodeURL: qrcodeURL
    },
    init: init,
    setup: setup,
    start: start
};
