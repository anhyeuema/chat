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



//gia ma va ma hoa base64
var fs = require('fs');
// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file); //chuyenthanh buffer
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

// convert image to base64 encoded string
var base64str = base64_encode('1.jpg');
console.log(base64str);

/*
// convert base64 string back to image 
base64_decode(base64str, 'copy.jpg');
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
      io.sockets.emit('server-send-client', { typedata: [ {anh: noidung, id: socket.id, text: data} ], type: [{ ba: '3', hai: '2'}], noidungemit:[ {dataImageJson: fileanh}], fileBase: [{ fileImgaBase: base64str,bufferImage: bitmap  }] });
    })
 });


//console.log(text.toJSON());


/*
var roles = {
  sender  : "",
  receiver    : ""  
};
io.sockets.on('connection', function (socket) { 
  socket.on('setRole', function (data) {
    socket.role = data.trim();
    roles[socket.role] = socket.id;
    console.log("Role "+ socket.role + " is connected.");    
  }); 

  socket.on("sendPhoto", function(data){
    var guess = data.base64.match(/^data:image\/(png|jpeg);base64,/)[1];
    var ext = "";
    switch(guess) {
      case "png"  : ext = ".png"; break;
      case "jpeg" : ext = ".jpg"; break;
      default     : ext = ".bin"; break;
    }
    var savedFilename = "/upload/"+randomString(10)+ext; //Trong sự kiện sendPhoto  ở trên, mình xử lý lưu ảnh vào thư mục public/upload/  co ten file lay gay nhien randomString(10)+ext
    fs.writeFile(__dirname+"/public"+savedFilename, getBase64Image(data.base64), 'base64', function(err) {
      if (err !== null)
        console.log(err);
      else 
        io.to(roles.receiver).emit("receivePhoto", {
          path: savedFilename,
        });
        console.log("Send photo success!");
    });
  });

  socket.on('disconnect', function() {
    console.log("Role " + socket.role + " is disconnect.");
  }); 
});

function randomString(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function getBase64Image(imgData) {
    return imgData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
}
*/