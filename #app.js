/**
 * File name: #app.js
 * Created by Haodong Chen on July 4, 2019
 * davidchd@outlook.com
 * All right reserved.
 */

// require server
const server = require('./run/app-server');

// require support
const support = require('./support/support');

// require wechat bot
const {Wechaty} = require('wechaty');

/**
 * initializing process
 * create express-server and wechat-bot instance
 */
// init server
server.init();
// init wechaty
const bot = new Wechaty({profile:'control-bot'});

/**
 * setup
 */
// setup server
server.setup();
// setup bot scan
bot.on('scan', (qrcode) => {
    server.values.qrcodeURL = qrcode;
    console.log('https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(qrcode));
});
// setup bot login
bot.on('login', (user) => {
    console.log(user.name() + ' logged in');
    bot.say('init success')
});
// setup bot handling message
bot.on('message', (msg) => {
    if(!msg.self()) {
        // real action here
    } else {
        if(msg.type() === bot.Message.Type.Text && msg.text().trim().charAt(0) === '》') {
            const cmd = support.understand(msg.text().substring(1));
            /////////
        }
    }
});

/**
 * run
 */
server.start();
// bot.start();