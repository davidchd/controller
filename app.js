/**
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
const {Wechaty} = require('wechaty');
const qr = require('qr-image');

// declare variables
const seed = 'IhapoAPaaiX';
let inCode;
var qrcodeURL = '';

/**
 * initializing process
 * create express-server and wechat-bot instance
 */
// init project
const app = express();
fs.readFile('./map.json', (err, data) => {
    var tem = JSON.parse(data);
    inCode = tem.in;
    // console.log(authCode)
});
app.engine(".html", ejs.__express);
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
app.get('/', function(req, res) {
    res.render('index', req.session.valid ? {
        color: '#9acd32',
        msg: 'Device Authorized, all features are enabled',
        link: ''
    } : {
        color: '#ff6000',
        msg: 'Device Unauthorized, please ',
        link: 'authorize'
    });
});
// auth front end
app.get('/auth', function(req, res) {
    res.render('auth')
});
// wechat front end
app.get('/wechat', function(req, res) {
    res.render('tem');
});
// generate wechat login qr code
app.get('/wechatQR', (req, res) => {
    const img = qr.image(qrcodeURL);
    res.writeHead(200, {'Content-Type': 'image/png'});
    img.pipe(res);
});
// authorize device
app.post('/auth', function(req, res) {
    switch(req.body.action) {
        case '1':
            let authCode = req.body.authCode;
            let now = new Date();
            let validate = (now.getMonth() + 1) + '/' + now.getDate() + ', ' +
                now.getFullYear() + ' davidchd AUTH ';
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
app.post('/crl', function(req,res) {
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
