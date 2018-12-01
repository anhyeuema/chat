
//thieu thi thi ta chay yarn add react-native
import { View, Text, TouchableOpacity, Image, Dimensions, RefreshControl, TextInput, ListView, AsyncStorage, } from 'react-native';
import React, { Component } from 'react';
//import { Base64 } from 'js-base64';
import image from '../Components/images/1.jpg';
import Buffer1 from 'buffer'; // tren thu vien buffer
//    import RNFS  from 'react-native-fs';// npm install react-native-fs// yarn react-native// react-native link react-native-fs// https://www.npmjs.com/package/react-native-fs
import io from 'socket.io-client/dist/socket.io.js';//yarn add react-native-socket.io-client// yarn add socket.io-client
// import sizeOf1 from 'image-size';// yarn add image-size  //yarn add buffer-image-size
import getImage from '../api/getImage';
import saveImage from '../api/saveImage';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

var text = 'trungtamlaptrinhkhoapham';

var bytes = Buffer1.Buffer(text);
var jsoon = bytes.toJSON();// tu json truyen buffer roi moi chuyen toString duoc

//var bufferimage =  Buffer1.Buffer(image);
//var imgaejsoon = bufferimage.toJSON();


var imag = image;

var DATA = [
    { Ten: 'Mr.hoang', tuoi: '30' },
    { Ten: 'Mr.nhung', tuoi: '58' },
    { Ten: 'Mr.anh', tuoi: '20' },
    { Ten: 'Mr.yen', tuoi: '30' },
];
var bytes1 = Buffer1.Buffer(DATA);
//var fs = require('fs');

var e;

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

var url = 'data:image/jpg;base64,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';
export default class App extends Component {
    constructor(props) {
        super(props);
        e = this;
        console.log('------bytes1-----');
        console.log(bytes1);
        console.log('------bytes1-----');

        saveImage()
            .then(res => {
                console.log(res)
            });
        getImage()
            .then(res => {
                console.log('----res----');
                console.log(res);

            });



        this.socket = io('http://192.168.0.102:3000', { jsonp: false });
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            maunen: 'bue',
            dataJson: 'red',
            text: 'red',
            send: 'anh yeu em',
            refreshing: false,
            page: 1,
            avatarSource: null,
            data: null,

            typedata: [],
            textNew: '',
            id: '',
            noidungemit: [],
            dataImageJson: '', // bien nay co the trung ten voi bien dataImageJson ma ben sever gui sang
            imageNewJson: '',  //bien nay co the khac ten voi bien dataImageJson ma ben sever gui sang
            convertJsonToBase64: '', //bien de hung chuyen tu dataImageJson dang BASE64

            fileBase: [],
            fileImgaBase: '',

        };
        this.arr = [];
        const nhanData = async () => {
            const socketOn = await this.socket.on('server-send-client', async (data) => {
                console.log(await data);
                console.log('-----typedata-----');
                console.log(await data.typedata);
                console.log('---type----');
                console.log(await data.type);
                console.log('---fileImgaBase----');
                console.log(await data.fileImgaBase);

                /*
                    {
                        data.typedata.map(e1 => {  // data.typedata la lay ra tung mang 1, data.typedata.map(e => {...} trong 1 mang thi ra co the lay tung phan tu trong mang
                            console.log('---textdata-----');
                            console.log(e1.text);
                            console.log('---id-----');
                            console.log(e1.id);
                            var buffer = Buffer1.Buffer(e1.text); //data nhan duoc la json ta chuyen ve buffer 
                            var tostring = buffer.toString(); // sau chuyen buffer ve chuoi tostring
                            console.log('---text-----');
                            console.log(tostring);
                            var res = [
                                { text1: tostring, send1: tostring }
                            ];
                            console.log(res);
                            e.setState({
                                id: e1.id,
                                maunen: tostring,
                                dataJson: tostring,
                                text: tostring,
                                dataSource: ds.cloneWithRows(res),
                                send: tostring,
                                refreshing: true,
        
                            });
        
                        })
                    }
                    { 
                        data.noidungemit.map(e2 => {
                            var dataImageJson1 = e2.dataImageJson;
                            console.log('-----dataImageJson1-----');
                            console.log(dataImageJson1);
                           // console.log(dataImageJson1.toImage());
                        })
        
                    }
                */


                /*
                this.setState({ //lay tu mang 1
                    typedata: data.typedata,
                    noidungemit: data.noidungemit,
                })
                    .then(this.state.typedata.map(e2 => {
                        e.setState({
                            textNew: e2.text,
                            id: e2.id,
                        });
                        console.log('-----textNew----');
                        console.log(this.state.textNew);
                        console.log('----imageNewJson----');
                        console.log(this.state.id);
                    }))
                    .then(this.state.noidungemit.map(e3 => {
                        e.setState({
                            imageNewJson: e3.dataImageJson,
                        });
                        console.log('----imageNewJson----');
                        console.log(this.state.imageNewJson);
                    }));
                    */


                const noidungemit1 = await data.noidungemit;
                console.log('---noidungemit1----');
                console.log(noidungemit1);
                this.setState({ //lay tu mang 1
                    typedata: data.typedata,
                    noidungemit: noidungemit1,
                    fileBase: data.fileBase,
                });
                this.state.typedata.map(e2 => {
                    var buffer = Buffer1.Buffer(e2.text); //data nhan duoc la json ta chuyen ve buffer 
                    var tostring = buffer.toString(); // sau chuyen buffer ve chuoi tostring
                    e.setState({
                        //textNew: e2.text,
                        textNew: tostring,
                        id: e2.id,
                    });
                    console.log('-----textNew----');
                    console.log('textNew:::', this.state.textNew);
                    console.log('----id----');
                    console.log('id:::', this.state.id);
                });
                 this.state.noidungemit.map(async(e3) => {
                    var imageNewJson1 = await e3.dataImageJson;
                    var convertJsonToBase64A = await new Buffer1.Buffer(imageNewJson1).toString('base64');
                    e.setState({      //setState ({ xxx: yyyy }) de sau nay muon lay da rung ta goi this.state.xxx
                        imageNewJson: imageNewJson1,
                        convertJsonToBase64: convertJsonToBase64A,
                    });
                    console.log('----imageNewJson----');
                    console.log('imageNewJson:::', this.state.imageNewJson);
                    //   console.log(new Buffer1.Buffer(this.state.imageNewJson).toString('base64'));
                    console.log('----convertJsonToBase64----');
                    console.log('convertJsonToBase64:::', this.state.convertJsonToBase64);
                });

                var res = [{ text1: this.state.textNew, send1: this.state.textNew, id1: this.state.id, convertJsonToBase64_1: this.state.convertJsonToBase64 }]
                console.log('----res-------');
                console.log(res);
                res.map(e => {
                    this.setState({
                        id: e.id1,
                        maunen: e.text1,
                        dataJson: e.text1,
                        text: e.text1,
                        dataSource: ds.cloneWithRows(res),
                        send: e.text1,
                        refreshing: true,
                    });
                });

                /*
                e.setState({
                    dataSource: ds.cloneWithRows(res),
                });
                */

                /*
                console.log('------fileBase-----');
                console.log(this.state.fileBase);
                this.state.fileBase.map(e4 => {
                    e.setState({
                        fileImgaBase: e4.fileImgaBase,
                    });
                    console.log('----fileImgaBase----');
                    console.log('fileImgaBase:::', this.state.fileImgaBase);
                });
                */



                /*
                    //    const { typedata, noidungemit, text, dataImageJson } = this.state;
                    //   var { typedata, noidungemit } = data;
                    this.setState({ //lay tu mang 1
                        textNew: data.typedata,
                        imageNewJson: data.noidungemit,
                    })
                        .then((textNew, imageNewJson) => {
                            this.setState({
                                textNew: textNew.text,
                                imageNewJson: imageNewJson.dataImageJson,
                            });
                        });
                    var { textNew, imageNewJson } = this.state;
                    console.log('-----textNew----');
                    console.log(textNew);
                    console.log('----imageNewJson----');
                    console.log(imageNewJson);
                    // var textNew = this.state.textNew;
                    // var imageNewJson = this.state.imageNewJson;
                    var buffer = Buffer1.Buffer(textNew); //data nhan duoc la json ta chuyen ve buffer 
                    var tostring = buffer.toString(); // sau chuyen buffer ve chuoi tostring
                    var res = [
                        { text1: tostring, send1: tostring }
                    ];
                    console.log(res);
                    e.setState({
                        id: 2,
                        maunen: tostring,
                        dataJson: tostring,
                        text: tostring,
                        dataSource: ds.cloneWithRows(res),
                        send: tostring,
                        refreshing: true,
        
                    });
                    console.log('----DULIEU_TRA_VE---');
                    console.log(data);
                    console.log('----toString---');
                    console.log(data.toString());
                    console.log('----Buffer---');
                    console.log(Buffer1.Buffer(data));
                    //var buffer = Buffer1.Buffer(data);
                    console.log(buffer.toString());
                */
            });
            return socketOn; //tra ve ket qua yyy
        }
        nhanData(); // goi ham async await

    }

    componentDidMount() {
        try {
            console.log('------bytes1-----');
            console.log(bytes1);
            console.log('------bytes1-----');
        } catch (e) {
            console.log(e);
            console.log('-----e-----');
        }
    }
    /*
        componentDidMount() {
            var bytes = Buffer1.Buffer(
                text
            ); //Buffer1 la lay thu vien, con Buffer la ham Buffer. de chuyen file ve dang buffer
            console.log('----App-----');
            console.log(bytes); //log buffer hien thi ra
        
            console.log('----App1-----');
            console.log(bytes.toJSON()); //chuyen buffer ve JSON() de truyen di
            console.log('----App2-----');
            console.log(bytes.toString()); //dua buffer ve string ve dang chuoi cua no hoan goc
        }
    */


    test() {  //nhan nut test la nhay vao test
        var bytes = Buffer1.Buffer(text);
        console.log('----App-----');
        console.log(bytes);

        console.log('----App1-----');
        console.log(bytes.toJSON());
        console.log('----App2-----');
        console.log(bytes.toString());
    }

    send() {
        var text2 = this.state.send;
        var bytes2 = Buffer1.Buffer(text2);
        var dataJson = bytes2.toJSON();// tu json truyen buffer roi moi chuyen toString duoc
        //this.setState({ send: jsoon});
        this.socket.emit('client-send-color', dataJson)
    }

    taoHang(property) {
        this.arr = property;
        var base64Icon = 'data:image/jpg;base64,property.convertJsonToBase64_1';
        return (
            <View style={{ flex: 1, backgroundColor: '#40AEE5' }} >
                <View style={{ flex: 1, backgroundColor: '#3962FB' }} >
                    <Image
                        style={{ width: 150, height: 150 }}
                        source={{ uri: base64Icon }}
                    />
                    <Image
                        style={{ width: 66, height: 58 }}
                        source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
                    />
                </View>
                <View style={{ flex: 1, backgroundColor: '#0A2B55' }}>
                    <Text key={property.id1}>{property.tuoi}</Text>
                    <Text key={property.id1}>{property.Ten}</Text>
                    <Text key={property.id1}>{property.text1}</Text>
                    <Text key={property.id1}>{console.log(property.send1)}</Text>
                    <Text key={property.id1}>{console.log(property.convertJsonToBase64_1)}</Text>
                    <Text key={property.id1}>{property.send1}</Text>
                </View>
            </View>
        );
    }

    showImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                    data: data,
                });
            }
        });
    }

    uploadImage() {
        RNFetchBlob.fetch('POST', 'http://192.168.0.102:3000', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
        }, [
                { name: 'avatar', filename: 'avatar.png', data: this.state.data },
                { name: 'info', data: 'khoapham' },
            ])
            .then((resp) => {
                console.log(resp);
            }).catch((err) => {
                console.log(err);
            })
    }
    render() {
        const imga = this.state.avatarSource == null ? null :
            <Image
                source={this.state.avatarSource}
                style={{ height: 300, width: 300 }}
            />
        return (
            <View style={{ flex: 1, backgroundColor: '#52BB80' }}>
                <Text> Componet app</Text>
                <TouchableOpacity onPress={() => this.test()}>
                    <Text>test</Text>
                </TouchableOpacity>

                <TextInput
                    style={{ backgroundColor: '#fff' }}
                    placeholder="nhap..."
                    value={this.state.send}
                    onChangText={text => this.setState({ send: text })}
                />

                <TextInput
                    style={{ backgroundColor: '#fff' }}
                    placeholder="..."
                    value={this.state.text}
                    onChangText={text => this.setState({ text: text })}

                />
                <TouchableOpacity onPress={() => this.send()}>
                    <Text>send</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.showImage()}>
                    <Text>ShowImage</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.uploadImage()}>
                    <Text>upload</Text>
                </TouchableOpacity>
                <Image
                    style={{ width: 66, height: 58 }}
                    source={{ uri: 'data:image/png;base64,this.state.convertJsonToBase64' }}
                />

                {/* <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: url }}
                /> */}


                {imga}

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.taoHang}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                const newpage = this.state.page + 1;
                                this.taoHang(property, newpage)
                                    .then(() => {
                                        this.arr = property.concat(this.arr);
                                        this.setState({
                                            dataSource: ds.cloneWithRows(res),
                                            refreshing: false,
                                        })
                                    }
                                    )
                                    .catch(e => console.log(e));
                            }}
                        />
                    }
                />




            </View>
        );
    }
}


/*


    /*
    componentDidMount() {
        //DocumentDirectoryPath 
        var bytes = Buffer1.Buffer(imag); //Buffer1 la lay thu vien, con Buffer la ham Buffer. de chuyen file ve dang buffer
        var noidung = RNFS.DocumentDirectoryPath +'/1.jpg';
       // var noidung = fs.readFileSync(__dirname + "/1.jpg");
        console.log('---noidung-----');
        console.log(noidung);
       // console.log(noidung.toJSON()); //chuyen buffer ve JSON() de truyen di
        console.log('----App-----');
        console.log(bytes); //log buffer hien thi ra
    
        console.log('----App1-----');
        console.log(bytes.toJSON()); //chuyen buffer ve JSON() de truyen di
        console.log('----App2-----');
        console.log(bytes.toString()); //dua buffer ve string ve dang chuoi cua no hoan goc
    }
    */

    /*
    componentDidMount() {
        sizeOf1.sizeOf('../Components/images/1.jpg', function (err, dimensions) {
            console.log(dimensions.width, dimensions.height);
        });
    }
    */

    /*
    componentDidMount() {
        var noidung = fs.readFileSync(__dirname + "/1.jpg");
        console.log(noidung);
        console.log(noidung.toJSON());
    }
    */


    /*
    componentDidMount() {
        var bytes = Buffer1.Buffer(
            imag
        ); //Buffer1 la lay thu vien, con Buffer la ham Buffer. de chuyen file ve dang buffer
        console.log('----App-----');
        console.log(bytes); //log buffer hien thi ra
    
        console.log('----App1-----');
        console.log(bytes.toJSON()); //chuyen buffer ve JSON() de truyen di
        console.log('----App2-----');
        console.log(bytes.toString()); //dua buffer ve string ve dang chuoi cua no hoan goc
    }
    */


    /*
    componentDidMount() {
        var pngBase64 ="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        var y = Base64.decode(pngBase64);

       console.log('------App-------');
        console.log(y);
        console.log('------App-------');
    }
    */
