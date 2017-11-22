/**
 * Created by timxiong on 2017/9/6.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    PixelRatio
} from 'react-native';
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar';
const {getArticleDetail} = require('../../config/urls');
import config from '../../config/config';
import Loading from '../../component/loading'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls'
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);
        this.docid = props.navigation.state.params.docid;
        this.title = props.navigation.state.params.title;
        this.mtime = props.navigation.state.params.mtime;
        this.pixelRatio = PixelRatio.get();
        this.state={
            data:'',
            isError:false,
            isLoading: false,
        }
    }
    static defaultProps = {

    };

    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }
    getData() {

        this.setState({
            isError:false,
            isLoading:true,
        });

        let url = urls.getCarNewsDetail(this.docid);
        fetchp(url,{headers: {
            'Accept':'*/*',
            'Accept-Language':'zh-CN,zh;q=0.8',
            'Connection':'keep-alive',
            'Content-Type': 'application/json',
            'Origin': 'http://c.m.163.com',
            // 以下一条可防止出现403拒绝访问错误
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }},{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }

    setError(error) {
        this.setState({
            isError:true,
            isLoading:false,
        })
    }

    setData(data) {
        data = data[this.docid];
        let bodySting = data.body;
        let imgs = data.img;

        // 160DPI(PPI) = 1dp = 1px，pixelRatio = 1;
        // RN的宽度计算：屏幕分辨率／pixelRatio
        // px单位宽度计算：RN宽度*pixelRatio

        if(imgs.length > 0) {
            for(let i = 0; i <imgs.length; i++){
                let imgWidth = cfn.deviceWidth();
                let imgHeight = imgWidth/2;

                if(imgs[i].pixel) {
                    let imgPixel = imgs[i].pixel.split('*');
                    let imgBili = imgPixel[1]/imgPixel[0]; //高除以宽;

                    imgWidth = cfn.deviceWidth() - 20 - 40;
                    imgHeight = imgWidth * imgBili;
                }

                let imgTemp = `<img src='${imgs[i].src}' style='display: block; width:${imgWidth}px; height:${imgHeight}px'>`;
                // let imgTemp = `<img src='${imgs[i].src}' style='display: block;width: ${cfn.deviceWidth()-cfn.picWidth(80)}px;padding:0;margin:0'>`;
                bodySting = bodySting.replace(imgs[i].ref,imgTemp);
            }
        }
        bodySting = bodySting.replace('wangyicaipiao','');
        bodySting = bodySting.replace('ID:','');
        bodySting = bodySting.replace(/网易汽车/g,'【'+config.appName+'】');
        this.setState({
            data:bodySting,
            isError:false,
            isLoading:false,
        })
    }
    render() {
        let htmlTemp = `<!DOCTYPE html>\n
            <html lang="en">
            <head>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=320, user-scalable=no">
            <title></title>
            </head>
            <h3>${this.title}</h3>
            <p>${this.mtime}</P>
            <body style="max-width:${cfn.deviceWidth()*this.pixelRatio}px;font-size:${14}px;padding:10px;margin:0">
            ${this.state.data}
            </body>
            </html>`;
       return(
        <View style={styles.container}>
            <NavBar
            middleText="文章详情"
            leftFn={()=>this.goBack()}
            />

            <WebView
                style={styles.webView}
                source={{html: htmlTemp}}
                scalesPageToFit={false}
            />
            <Loading
                isError={this.state.isError}
                isLoading={this.state.isLoading}
                reload={this.getData.bind(this)}
            />
        </View>)
    }
}

const styles = StyleSheet.create({
   container: {
       justifyContent:'flex-start',
       width:cfn.deviceWidth(),
       height:cfn.deviceHeight(),
   },
    webView: {
       //maxWidth:cfn.deviceWidth(),
        flex:1,
        height:cfn.deviceHeight()
    }
});