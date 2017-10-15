/**
 * Created by timxiong on 2017/9/8.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Platform,
    FlatList,
    Alert,
} from 'react-native';
import cfn from '../tools/commonFun';
import NavBar from './NavBar'
import lotterys from '../config/lotterys'
import Loading from'../component/loading'
import urls from '../config/urls';
import fetchp from '../tools/fetch-polyfill';
export default class searchModal extends PureComponent {

    static defaultProps = {
        visible: false,
        closeModal: ()=> {
        }
    };

    constructor(props) {
        super(props);
        this.listHeight = cfn.deviceHeight() - cfn.picHeight(370)
        this.state = {
            issueNum:null,
            id:null,
            name: null,
            showList: false,
            listHeight:0,
            lotteryView:null,
            data:null,
            codeView: null,

            isLoading:false,
            isError: false,
        }
    }

    _keyExtractor=(item, index) => item.id;

    leftFn() {
        this.props.closeModal();
    }

    renderItem({item, index}) {
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.isShowList(false,
                    {icon:item.icon,name:item.name,id:item.id})}
                style={styles.item_container}>
                <Image source={item.icon} style={styles.icon}/>
                <Text style={styles.cz_name}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    isShowList(isShow,item) {
        if(isShow){
            this.setState({listHeight:this.listHeight})
        } else {
            let lotteryView = <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={item.icon} style={{
                    width:cfn.picWidth(50),
                    height:cfn.picWidth(50),
                    resizeMode:'contain',
                }}/>
                <Text style={styles.cz_name}>{item.name}</Text>
            </View>;
            this.setState({
                listHeight: 0,
                id: item.id,
                name: item.name,
                lotteryView: lotteryView
            })
        }

    }

    search(){
        const{issueNum} = this.state;
        var reg = new RegExp(/^(\d)*$/);
        if(!issueNum) {
            return Alert.alert('提示','请输入期号');
        }else if(!reg.test(issueNum)) {
            return Alert.alert('提示','期号只能是数字');
        }else if(!this.state.lotteryView) {
            return Alert.alert('提示','请选择彩种');
        }
        this.getData(issueNum,this.state.id);
    }

    getData(num,id) {
        this.setState({
            isLoading:true,
            isError: false,
            codeView:null,
        });
        fetchp(urls.getSearchLotteryCode(num,id),{timeout:1000*10})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }

    setError(error) {
        console.log(error);
        this.setState({isLoading:false, isError:true});
    }

    setData(data) {
        console.log(data);
        data = data.showapi_res_body.result;
        if(data) {
            this.setState({data:data, isLoading: false, isError:false});
        } else {
            this.setState({isLoading: false, isError:false});
            return Alert.alert('提示','您输入的期号有误，请核对后重新输入');
        }

        this.renderCode(data);
    }

    renderCode(data) {
        let codes = data.openCode;
        if(codes.match(/[+]/)) {
            codes = codes.split('+')[0].split(',');
        } else {
            codes = codes.split(',');
        }
        let issueView = [];
        for(let i = 0; i < codes.length; i++) {
            issueView.push(
                <View
                    key={i}
                    style={{
                        width:cfn.picWidth(70),
                        height:cfn.picWidth(70),
                        borderRadius:cfn.picWidth(35),
                        alignItems:'center',
                        justifyContent:'center',
                        marginRight:cfn.picWidth(10),
                        marginTop:cfn.picHeight(10),
                        backgroundColor: '#eb3f2f',
                    }}
                >
                    <Text style={{fontSize:20, color:'#fff',backgroundColor:'transparent'}}>{codes[i]}</Text>
                </View>
            )
        }
        this.setState({
            codeView: (
                <View style={styles.result_container}>
                    <View style={{
                        flexDirection:'row',alignItems:'center',
                        borderBottomColor:'#ddd',
                        borderBottomWidth:1,
                        justifyContent:'center',
                        height:cfn.picHeight(90),
                        width:cfn.deviceWidth()-cfn.picWidth(40)

                    }}>
                        <Image style={{
                            width:cfn.picWidth(50),
                            height:cfn.picWidth(50),
                            resizeMode:'contain',
                            alignSelf:'center'
                        }} source={require('../imgs/lotteryIcons/cqssc.png')}/>
                        <Text style={{
                            fontSize:20,
                            marginLeft:cfn.picWidth(20),
                            alignSelf:'center'
                        }}>{this.state.name}</Text>
                    </View>
                    <View style={{height:cfn.picHeight(70),
                        alignItems:'center',justifyContent:'center',
                        width:cfn.deviceWidth()-cfn.picWidth(40),
                        flexDirection:'row',borderBottomColor:'#ddd',
                        borderBottomWidth:1,}}>
                        <Text style={{color:'#888'}}>{data.time}</Text>
                        <Text style={{color:'#888',marginLeft:cfn.picWidth(20)}}>第 {data.expect} 期</Text>
                    </View>

                    <View style={{flexDirection:"row",paddingTop:cfn.picHeight(20),
                        paddingBottom:cfn.picHeight(20),
                        alignItems:'center',justifyContent:'center',alignSelf:'center',
                        flexWrap:'wrap',width:cfn.deviceWidth()-cfn.picWidth(40)}}>
                        {issueView}
                    </View>
                </View>)
        })
    }

    render() {
        const {lotteryView} = this.state;
        return (
            <Modal
                style={styles.container}
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                }}
            >
                <View style={styles.container}>
                    <StatusBar hidden={false}  translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                    <NavBar
                        leftIcon={require('../imgs/close_icon.png')}
                        leftFn={this.leftFn.bind(this)}
                        middleText='开奖查询'
                        modalState={true}
                    />
                    <TextInput
                        style={styles.inputIssue}
                        placeholder='输入期号,如 20170909042'
                        underlineColorAndroid="transparent"
                        placeholderTextColor='#ddd'
                        onChangeText={(text)=>this.setState({issueNum:text})}
                    />
                    <TouchableOpacity
                        onPress={()=>this.isShowList(true)}
                        activeOpacity={1}
                        style={styles.caizhong}
                    >
                        {lotteryView ? lotteryView : <Text style={styles.cz_text}>请选择彩种</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.search()}
                        activeOpacity={0.8}
                        style={styles.btn}>
                        <Text style={styles.btn_text}>开始查询</Text>
                    </TouchableOpacity>
                    <View style={[styles.flatListStyle,{height:this.state.listHeight}]}>
                        <FlatList
                            data={lotterys}
                            renderItem={this.renderItem.bind(this)}
                            keyExtractor={this._keyExtractor}
                        />
                    </View>
                    {this.state.codeView ? <Text
                        style={{marginTop:cfn.picHeight(170),marginLeft:cfn.picHeight(20),alignSelf:'flex-start'}}>查询结果：</Text> : null}
                    {this.state.codeView}
                    <Loading
                        isLoading={this.state.isLoading}
                        isError={this.state.isError}
                        reload={()=>this.getData(this.state.issueNum,this.state.id)}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:cfn.deviceHeight(),
        backgroundColor:'#f2f2f2',
        alignItems:'center',
    },
    inputIssue: {
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        width:cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(80),
        padding:0,
        paddingLeft:cfn.picWidth(20),
        paddingRight:cfn.picWidth(20),
        marginTop:cfn.picHeight(40),
        backgroundColor:'#fff',
        fontSize:15
    },
    caizhong: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(80),
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft:cfn.picWidth(20),
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },
    cz_text: {
        color:'#ddd',
        fontSize:15
    },
    btn: {
        width: cfn.deviceWidth()-cfn.picWidth(40),
        height:cfn.picHeight(80),
        backgroundColor:'#f82222',
        marginTop:cfn.picHeight(40),
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    btn_text: {
        color:'#fff'
    },
    flatListStyle: {
        marginTop:cfn.picHeight(-120),
        width: cfn.deviceWidth()-cfn.picWidth(40),
        backgroundColor:'#fff',
        zIndex:9,
    },
    item_container: {
        width:cfn.deviceWidth()-cfn.picWidth(40) ,
        flexDirection:'row',
        height:cfn.picHeight(100),
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:1
    },
    icon: {
        width:cfn.picWidth(60),
        height:cfn.picWidth(60),
        resizeMode:'contain',
        marginLeft:cfn.picWidth(20)
    },
    cz_name: {
        fontSize:15,
        color:'#666',
        marginLeft:cfn.picWidth(20)
    },
    result_container: {
        width:cfn.deviceWidth()-cfn.picWidth(40),

        marginTop:cfn.picHeight(30),
        borderTopColor:'#ddd',
        borderTopWidth:1,
        flexWrap:'wrap',
        borderColor:'#ddd',
        borderWidth:1,
        borderRadius:7,
        backgroundColor:'#fff'
    }
});