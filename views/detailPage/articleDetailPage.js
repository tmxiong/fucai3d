/**
 * Created by timxiong on 2017/10/26.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    WebView
} from 'react-native';
import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun'
import urls from '../../config/urls'
import Loading from '../../component/loading'
import config from '../../config/config'
export default class gongluePage extends Component{
    constructor(props) {
        super(props);

        this.id = props.navigation.state.params.id;
        this.name = props.navigation.state.params.name;
        if(this.name == '详细攻略') {
            this.url = urls.getGonglueDetail(this.id);
            this.script = 'document.getElementById("tuijian").style.display="none";' +
                'document.getElementsByClassName("share")[0].style.display="none";';
        } else {
            this.url = urls.getNewsDetail(this.id);
            this.script = 'document.getElementById("author").textContent="' + config.appName + '";' +
                'document.getElementById("tuijian").style.display="none";' +
                'document.getElementsByClassName("share")[0].style.display="none";';
        }

        this.state={
            isLoading:true,
            isError:false,
        }
    }
    componentDidMount() {

    }
    goBack() {
        this.props.navigation.goBack();
    }
    _onLoadStart() {
        this.setState({
            isLoading: true,
            isError:false
        })
    }
    _onLoadEnd() {
        this.setState({
            isLoading:false,
            isError:false
        });
    }

    _onError() {
        this.setState({
            isLoading:false,
            isError:true
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText={this.name}
                    leftFn={()=>this.goBack()}
                />
                <View style={{height:this.state.isLoading ? 0 : cfn.deviceHeight()-cfn.picHeight(140),}}>
                    <WebView
                        style={{overflow:'hidden',}}
                        source={{uri:this.url}}
                        onLoadEnd={()=>this._onLoadEnd()}
                        onLoadStart={()=>this._onLoadStart()}
                        onError={()=>this._onError()}
                        injectedJavaScript={this.script}
                    />
                </View>
                <Loading
                    isLoading={this.state.isLoading}
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: cfn.deviceWidth(),
        height: cfn.deviceHeight(),
    },
   itemContainer: {
       width:cfn.deviceWidth() - cfn.picWidth(80),
       backgroundColor:'#fff',
       borderRadius:cfn.picWidth(30),
       padding:10,
       marginTop:cfn.picWidth(40)
   },
    title: {
        fontSize:15,
        color:'#666'
    },
    subTitle: {
        marginBottom:cfn.picHeight(20),
        fontSize:12,
        color:'#aaa',
        marginTop:cfn.picHeight(20),
    },
    line: {
      height:1,
        width:cfn.deviceWidth()-cfn.picWidth(80),
        backgroundColor:'#ddd',
        marginLeft:-10
    },
    content: {
        marginTop:cfn.picHeight(20),
        color:'#999',
        fontSize:14,
        lineHeight:25
    }
});