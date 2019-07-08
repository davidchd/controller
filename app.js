/**
 * File name: app.js
 * Created by Haodong Chen on July 4, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

// require tools
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const ejs = require('ejs');
const uglify = require('uglify-js');
const {Wechaty} = require('wechaty');
const qr = require('qr-image');

// declare variables and functions
const seed = 'IhapoAPaaiX';
let inCode;
var qrcodeURL = '';
function miniCode(filename, funcs = null) {
    const code = uglify.minify(fs.readFileSync('./js/' + filename + '.js','utf8'), {compress:{unused:false},mangle:false});
    console.log('Minifying ' + filename + '.js error: ' + code.error);
    return code.code;
}

/**
 * initializing process
 * create express-server and wechat-bot instance
 */
// init project
const app = express();
fs.readFile('./map.json', (err, data) => {
    var tem = JSON.parse(data);
    inCode = tem.in;
});
app.engine('.html', ejs.__express);
app.set('views', './template');
app.set('view engine', 'html');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    name: 'davidchdCRL',
    secret: seed
}));
// init wechaty
const bot = new Wechaty({profile:'control-bot'});

/**
 * define listener methods
 */
// root front end
app.get('/', (req, res) => {
    res.render('index', req.session.valid ? {
        color: '#9acd32',
        msg: 'Device Authorized, all features are enabled. <a id="revoke" href="javascript:void(0);" style="color: #ff6000; text-decoration: underline;">REVOKE</a>',
        code: miniCode('main', )
    } : {
        color: '#ff6000',
        msg: 'Device Unauthorized, please <a href="/authorize" style="color: #ff6000; text-decoration: underline;">authorize</a>.',
        code: miniCode('main', )
    });
});
// auth front end
app.get('/authorize', (req, res) => {
    res.render('widget', req.session.valid ? {
        title: 'Authorization',
        content: '<p id="auth-alert">\n' +
                 '    <b>You have successfully authorized this device.</b><br />\n' +
                 '    You will be redirect to the control panel in <b id="num"></b>.\n' +
                 '</p>',
        code: miniCode('authorized')
    } : {
        title: 'Authorization',
        content: '<p id="auth-alert"></p>\n' +
                 '<input id="auth-code" type="password" placeholder="Authorization Code" />\n' +
                 '<a href="javascript:void(0);">\n' +
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
            const now = new Date();
            // let validate = (now.getMonth() + 1) + '/' + now.getDate() + ', ' + now.getFullYear() + ' davidchd AUTH ';
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
            //
            break;
        default:
            res.send({code:-1});
    }
});
// control
app.post('/crl', (req,res) => {
    if(req.session.valid) {
        // process req
    } else {
        res.send({code:1});
    }
});
// bot login
bot.on('scan', (qrcode) => {
    qrcodeURL = qrcode;
    console.log('https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(qrcode));
});
// bot logged in
bot.on('login', (user) => {
    console.log(user.name() + ' logged in');
    bot.say('init success')
});
// bot handle message
bot.on('message', (msg) => {
    if(!msg.self()) {
        // real action here
    } else {
        if(msg.type() === bot.Message.Type.Text && msg.text().substr(0,1) === '#') {
            console.log(msg.text().substring(1));
        }
    }
});

/**
 * run express-server and wechat-bot
 */
// start server
app.listen(3000);
// start bot
// bot.start();
