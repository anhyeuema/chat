
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


export default class App extends Component {


    constructor(props) {
        super(props);
        e = this;

        console.log('------bytes1-----');
        console.log(bytes1);
        console.log('------bytes1-----');

        saveImage()
            .then(res => console.log(res));
        getImage()
            .then(res => console.log(res));



        this.socket = io('http://192.168.0.110:3000', { jsonp: false });
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(DATA),
            maunen: 'bue',
            dataJson: 'red',
            text: 'red',
            id: '',
            send: 'anh yeu em',
            refreshing: false,
            page: 1,
            avatarSource: null,
            data: null,

            typedata: [],
            noidungemit: [],
            dataImageJson: '',
            textNew: '',
            imageNewJson: '',

        };
        this.arr = [];
        this.socket.on('server-send-client', data => {
            console.log(data);
            console.log('-----typedata-----');
            console.log(data.typedata);
            console.log('---type----');
            console.log(data.type);
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
                    var dataImageJson = e2.dataImageJson;
                    console.log(dataImageJson);
                })

            }


        /*
            this.setState({ //lay tu mang 1
                typedata: data.typedata,
                noidungemit: data.noidungemit,
            })
            .then( this.state.typedata.map(e2 => {
                e.setState({
                    textNew: e2.text,
                    id: e2.id,
                });
                console.log('-----textNew----');
                console.log(textNew);
                console.log('----imageNewJson----');
                console.log(imageNewJson);
            }) )
            .then( this.state.noidungemit.map(e3 => {
                e.setState({
                    textNew: e3.dataImageJson,
                });
                console.log('-----textNew----');
                console.log(textNew);
                console.log('----imageNewJson----');
                console.log(imageNewJson);
            }) );
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
        return (
            <View style={{ flex: 1, backgroundColor: '#40AEE5' }} >
                <Text key={property.id}>{property.tuoi}</Text>
                <Text key={property.id}>{property.Ten}</Text>
                <Text key={property.id}>{property.text1}</Text>
                <Text key={property.id}>{property.send1}</Text>
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
        RNFetchBlob.fetch('POST', 'http://192.168.0.110:3000', {
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
