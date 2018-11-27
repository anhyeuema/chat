var base64 = require('base-64'); //tren thu vien base64
var utf8 = require('utf8'); //su dung co dau tieng viet utf8
 
var text = 'khoapham12345456711111111111111111'; //chuoi se ma hoa
var bytes = utf8.encode(text); // chuyen nay thanh ting viet co dau
var encoded = base64.encode(bytes); //ma hoa  chuoi nay
//console.log(encoded); //log ket qua ma hoa ra
/*
console.log(encoded);
console.log(bytes);
console.log(text.toString());
*/

var fs = require('fs');
var noidung = fs.readFileSync(__dirname + "/1.jpg");
console.log('-----test fs-----');
console.log(noidung);
var fileanh = noidung.toJSON();
console.log(noidung.toJSON());

/*
var arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset, buffer.byteOffset + buffer.byteLength
);
*/


var Buffer = require('buffer/').Buffer  // khai bao thu vien buffer


/*
var toArrayBuffer = require('to-arraybuffer');
var buffer = new Buffer(100);
// Fill the buffer with some data
var ab = toArrayBuffer(buffer);
// `ab` now contains the same data as `buffer`
console.log('------1------'); // log buffer ra
console.log(ab); // log buffer ra
*/


var text = 'khoapham12345456711111111111111111';
var bytes = Buffer(text); // truyen ve dang buffer
console.log('-----test BUFFER-----');
console.log(bytes); // log buffer ra
console.log(bytes.toJSON());
console.log(bytes.toString());

/*
var express = require('express');
var app = express();
var formidable = require('express-formidable');
var fs = require('fs');
app.use(formidable({uploadDir: './public' }));
app.listen(3000, () => console.log('SERVER started'));


app.post('/', (req,res) => {
//  console.log(req.fields);
  console.log(req.files.avatar);
  fs.rename(req.files.avatar.path, req.files.avatar.path + '.jpg', err => {
    res.send('xin chao');
  });
});
*/


var express = require('express');
var app = express();
var server = require('http').Server(app);
 var io = require('socket.io')(server);
 server.listen(3000);

 io.on('connection', socket => {
    console.log('co nguoi vua ket noi: ' + socket.id);
    socket.on('client-send-color', data => {
        console.log('app vua gui massage: ' + Buffer(data));
        console.log(data);
       // console.log(data.toJSON());
        console.log(Buffer(data).toString());
        io.sockets.emit('server-send-client', { typedata: [ {anh: noidung, id: socket.id, text: data} ], type: [{ ba: '3', hai: '2'}], noidungemit:[ {dataImageJson: fileanh}] });
    })
 });


//console.log(text.toJSON());
