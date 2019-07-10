# controller

This is a simple remote control project which allows users to remotely control networked devices. It uses [express](github.com/expressjs/express) framework and many other libraries such as [body-parser](github.com/expressjs/body-parser) for parsing post request and [UglifyJS2](github.com/mishoo/UglifyJS2) for minifying front end JavaScript files.

Such a project uses nodejs server to provide uses the feature of controlling devices from a web page. Session is being used as a authentication tool for the sake of security. Users have to authorize a device with some sort of pass code. For now, the validate code is encrypted in md5 with RSA encryption and stored in the back end in plaintext. 

The project also uses [wechaty](github.com/Chatie/wechaty) for dealing with WeChat communication, which enables users to send a single message on the wechat to remotely control devices. 

PS: As of yet, the project is still working in progress. New features may be added, and current features may be modified or removed. For me, the purpose of this project is mainly to try and learn new things. 0w0 
