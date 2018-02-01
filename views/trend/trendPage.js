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
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from '../home/homePage';
import LotteryPage from '../home/lotteryPage';
import MorePage from '../more/morePage';
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar'
import TrendPage_1 from './trendPage_1'
import {TabView} from "react-navigation";
import urls from '../../config/urls';
import fetchp from '../../tools/fetch-polyfill'
import config from '../../config/config'
import GsbBtn from '../../component/gsbBtn'
import QishuModal from '../../component/qishuModal'
import Spinner from 'react-native-loading-spinner-overlay';
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        this.state={
            data:[],
            isError:false,
            btnColor:[config.baseColor,'#fff','#fff'],
            qiShu:30,
            isLoading:true,
        };
        this.visible = false;
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
        //console.log(urls.getTrend());
        fetchp(urls.getTrend(this.state.qiShu),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>this.setError(err))
    }

    setData(data) {

        this.setState({
            data: data,
            isError:false,
        });
        setTimeout(()=>{
            this.setState({
                isLoading:false,
            })
        },300)
    }

    reload() {
        // this.setState({
        //     isError:false,
        // });
        this.getData();
    }

    setError(err) {
        this.setState({
            isError: true,
            isLoading:false,
        })
    }

    setQishu() {
        if(this.visible) {
            this._qishuModal._closeModal();
        }else {
            this._qishuModal._showModal();
        }
    }

    _onClose(qishu) {
        this.visible = false;
        if(qishu) {
            this.setState({
                qiShu:qishu,
                isLoading:true,
            });
            setTimeout(()=>{
                this.getData()
            },700)
        }
    }

    _onScroll(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        this.nextPage = Math.round(offsetX / cfn.deviceWidth());
        //this.nextPagePixel = offsetX / cfn.deviceWidth();

    }
    _scrollTo(x,animated) {
        this._scrollView.scrollTo({x:x, animated: animated});
    }
    _onMomentumScrollEnd() {
        //this.pressBtn(this.nextPage)
        this._gsbBtn.pressBtn(this.nextPage);
    }


    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText='3D走势图'
                    leftFn={()=>this.goBack()}
                    rightText={this.state.qiShu + "期"}
                    rightFn={()=>this.setQishu()}
                />
                {/*<View style={styles.btnContainer}>*/}
                    {/*<TouchableOpacity*/}
                        {/*style={[styles.btn,{borderBottomColor:this.state.btnColor[0]}]}*/}
                        {/*onPress={()=>this.pressBtn(0)}*/}
                        {/*activeOpacity={0.8}>*/}
                        {/*<Text style={{color:this.state.btnColor[0] == config.baseColor ? config.baseColor : '#444'}}>百位</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity*/}
                        {/*style={[styles.btn,{borderBottomColor:this.state.btnColor[1]}]}*/}
                        {/*onPress={()=>this.pressBtn(1)}*/}
                        {/*activeOpacity={0.8}>*/}
                        {/*<Text style={{color:this.state.btnColor[1] == config.baseColor ? config.baseColor : '#444'}}>十位</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity*/}
                        {/*style={[styles.btn,{borderBottomColor:this.state.btnColor[2]}]}*/}
                        {/*onPress={()=>this.pressBtn(2)}*/}
                        {/*activeOpacity={0.8}>*/}
                        {/*<Text style={{color:this.state.btnColor[2] == config.baseColor ? config.baseColor : '#444'}}>个位</Text>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
                <GsbBtn
                    ref={(ref)=>this._gsbBtn = ref}
                    scrollTo={this._scrollTo.bind(this)}
                />
                <ScrollView
                    ref={(ref)=>this._scrollView = ref}
                    onScroll={(e)=>this._onScroll(e)}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    //onScrollEndDrag={()=>this._onScrollEndDrag()}
                    onMomentumScrollEnd={()=>this._onMomentumScrollEnd()}

                >
                    <TrendPage_1
                        data={this.state.data}
                        weiIndex={2}
                        weishu={'百位'}
                        bgColor="#e5e5e5"
                        codeColor="#8ab2ce"
                        reload={this.reload.bind(this)}
                        isError={this.state.isError}
                    />
                    <TrendPage_1
                        data={this.state.data}
                        weiIndex={3}
                        weishu={'十位'}
                        bgColor="#e5e5e5"
                        codeColor="#ce8ac0"
                        reload={this.reload.bind(this)}
                        isError={this.state.isError}
                    />

                    <TrendPage_1
                        data={this.state.data}
                        weiIndex={4}
                        weishu={'个位'}
                        bgColor="#e5e5e5"
                        codeColor="#ceb08a"
                        reload={this.reload.bind(this)}
                        isError={this.state.isError}
                    />
                </ScrollView>
                <QishuModal
                    ref={(ref)=>this._qishuModal = ref}
                    onClose={(qishu)=>this._onClose(qishu)}
                />
                <Spinner visible={this.state.isLoading}
                         textContent={"正在加载..."}
                         overlayColor="rgba(0,0,0,0.5)"
                         color="rgb(217,29,54)"
                         textStyle={{color: 'rgb(217,29,54)',fontSize:12}} />
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    btnContainer: {
      width:cfn.deviceWidth(),
        height:cfn.picHeight(80),
        flexDirection:'row',
        alignItems:'center',
    },
    btn: {
        width:cfn.deviceWidth()/3,
        height:cfn.picHeight(80),
        borderBottomWidth:3,
        borderBottomColor:'#fff',
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{
        width:cfn.picHeight(40),
        height:cfn.picHeight(40),
        resizeMode:'contain',

    }
});