/**
 * File name: app-server.js
 * Created by Haodong Chen on July 8, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

// require tools
const bodyParser = require('body-parser');
const crypto = require('crypto');
const ejs = require('ejs');
const express = require('express');
const fs = require('fs');
const qr = require('qr-image');
const session = require('express-session');
const uglify = require('uglify-js');

// declare variables and supported functions
const seed = 'IhapoAPaaiX';
let inCode, server;
var qrcodeURL = '';
function loadContent(filepath) {
    return fs.readFileSync('./renderHTML/' + filepath, 'utf8');
}
function miniCode(filename) {
    const code = uglify.minify(fs.readFileSync('./renderJS/' + filename, 'utf8'));
    if(code.error !== undefined) {
        console.log('Minifying ' + filename + ' error: ' + code.error);
    }
    return code.code;
}

/**
 * init server
 */
function init() {
    fs.readFile('./run/map.json', (err, data) => {
        const tem = JSON.parse(data);
        inCode = tem.in;
    });
    server = express();
    server.engine('.html', ejs.__express);
    server.set('views', './renderHTML');
    server.set('view engine', 'html');
    server.use(express.static('./public'));
    server.use(bodyParser.urlencoded({extended:true}));
    server.use(session({
        name: 'davidchdCRL',
        secret: seed
    }));
}

/**
 * setup listeners
 */
function setup() {
    // index front end
    server.get('/', (req, res) => {
        res.render('index', {
            msg: 'Checking for authorization status...',
            code: miniCode('main.js')
        });
    });
    // auth front end
    server.get('/authorize', (req, res) => {
        res.render('widget', req.session.valid ? {
            title: 'Authorization',
            content: loadContent('widget/AuthDone.html'),
            code: miniCode('AuthDone.js')
        } : {
            title: 'Authorization',
            content: loadContent('widget/Authorizing.html'),
            code: miniCode('Authorizing.js')
        });
    });
    // front end test
    server.get('/test', (req, res) => {
        res.render('test', {
            code: miniCode('test')
        });
    });
    // wechat front end
    server.get('/wechat', (req, res) => {
        res.render('widget', {
            title: 'WeChat Login',
            content: '<img id="img" src="/wechatQR?t=0" width="100%" />',
            code: miniCode('wechat')
        });
    });
    // generate wechat login qr code
    server.get('/wechatQR', (req, res) => {
        const img = qr.image(qrcodeURL, {size:20,margin:1});
        res.writeHead(200, {'Content-Type': 'image/png'});
        img.pipe(res);
    });
    // authorize device
    server.post('/authorize', (req, res) => {
        switch(req.body.action) {
            case '1':
                const authCode = req.body.authCode;
                // const now = new Date();
                // const validate = (now.getMonth() + 1) + '/' + now.getDate() + ', ' + now.getFullYear() + ' davidchd AUTH ';
                const validate = 'f3676996c0108b14ed10144c282183cb';
                const encryption = crypto.createHash('md5WithRSAEncryption')
                                         .update(seed + authCode + 'OwO!')
                                         .digest('hex');
                if(encryption === validate) {
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
    server.post('/crl', (req,res) => {
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
    server.listen(port);
}

module.exports = {
    values: {
        server: server,
        qrcodeURL: qrcodeURL
    },
    init: init,
    setup: setup,
    start: start
};
