// require tools
var express = require("express");

// create express object
var app = express();

// app.post('/control',function (req,res) {
//     //
// });

// serve static files
app.use(express.static('./public'));

// start server
app.listen(3000);
