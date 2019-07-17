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
 * config and run server
 */
server.init();
server.setup();
server.start();

/**
 * initialize
 * create wechat-bot instance
 */
const bot = new Wechaty({profile:'control-bot'});

/**
 * setup
 */
// setup bot scan
bot.on('scan', (qrcode) => {
    server.renewQR(qrcode);
    console.log('https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(qrcode));
});
// setup bot login
bot.on('login', (user) => {
    console.log(user.name() + ' logged in');
    bot.say('init success')
});
// setup bot handling message
bot.on('message', (msg) => {
    if(msg.self()) {
        // real action here
    } else {
        if(msg.type() === bot.Message.Type.Text && msg.text().trim().charAt(0) === '》') {
            const cmd = support.understand(msg.text().substring(1));
            console.log(cmd);
            if(cmd.valid) {
                let reply1 = '理解到：\n', reply2 = '以下命令未能理解：\n';
                let able = 1, unable = 1;
                for(const i in cmd.output) {
                    if(cmd.output[i].flag === 'parsed') {
                        reply1 += (able++) + '. ' + cmd.output[i].origins + '\n';
                    } else {
                        reply2 += (unable++) + '. ' + cmd.output[i].origins + '\n';
                    }
                }
                msg.say((able === 1 && unable === 1 ? '无法识别指令，换种说法试试？' : (able === 1 ? '' : reply1 + '动作完成\n') + (unable === 1 ? '' : reply2)));
            } else {
                msg.say('无法识别指令，换种说法试试？');
            }
            if(!cmd.legal) {
                msg.say('请尽量避免在指令中使用空格或英文字母，这将降低理解速度或导致命令不可理解。')
            }
        }
    }
});

/**
 * run bot
 */
bot.start();
