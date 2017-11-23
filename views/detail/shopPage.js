/**
 * 某品牌某型号汽车详情页
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    FlatList,
    Linking
} from 'react-native';

import NavBar from '../../component/NavBar';
import cfn from '../../tools/commonFun'
import config from '../../config/config'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';

export default class jieshaoPage extends Component {

    static defaultProps={

    };
    constructor(props) {
        super(props);

        this.id = this.props.navigation.state.params.id;
        // this.name = this.props.navigation.state.params.name;
        // this.img = this.props.navigation.state.params.img;
        this.state={
            data:[],
            loader:'正在加载...'
        }
    }

    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    getData() {
        this.setState({loader:'正在加载...'});
        fetchp(urls.getShop(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>this.setError(err))
    }

    setData(data) {
        if(data.result.dealerlist.length != 0) {
            this.setState({data:data.result.dealerlist})
        } else {
            this.setState({loader:'暂无数据'})
        }
    }
    setError(err) {
        this.setState({
            data:[],
            loader:'加载错误，点击重试'
        })
    }

    pressBtn(type, data) {
        if(type == 'phone') {
            Alert.alert(
                '是否拨打电话？',
                data,
                [
                    {text: '确定', onPress: () => Linking.openURL('tel:'+ data)},
                    {text: '取消', onPress: () => {}},

                ],
            );
        }
    }

    _keyExtractor=(item, index)=> item.id;

    renderItem({item, index}) {
        return(
            <View
                style={styles.itemContainer}>
                <View style={{flexDirection:'row',minHeight:cfn.picHeight(50),alignItems:'center',marginTop:cfn.picHeight(20)}}>
                    <View style={styles.fourS}>
                        <Text style={{color:'#666',fontSize:8}}>4S店</Text>
                    </View>
                    <Text style={{marginLeft:cfn.picWidth(20),
                        width:cfn.deviceWidth()-cfn.picWidth(200)}}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
                <Text style={{color:'#888',fontSize:10,marginTop:cfn.picHeight(10),
                    marginBottom:cfn.picHeight(10),width:cfn.deviceWidth()-cfn.picWidth(40)}}>{item.address}</Text>
                <Text style={{color:'#bbb',fontSize:10,width:cfn.deviceWidth()-cfn.picWidth(40)}}>{item.newstitle}</Text>
                <View style={{flexDirection: 'row',marginTop:cfn.picHeight(10),
                    justifyContent:'flex-end',paddingRight:cfn.picWidth(20), marginBottom:cfn.picHeight(20)}}>
                    <TouchableOpacity
                        onPress={()=>this.pressBtn('collect')}
                        activeOpacity={0.8}
                        style={[styles.btn,{marginRight:cfn.picWidth(20)}]}>
                        <Text style={{color:'#fff'}}>收藏此店</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>this.pressBtn('phone',item.phone)}
                        activeOpacity={0.8}
                        style={styles.btn}>
                        <Text style={{color:'#fff'}}>电话咨询</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText={"汽车商店"}
                    leftFn={this.goBack.bind(this)}
                />

                {this.state.data.length == 0 ?
                    <TouchableOpacity
                        style={styles.loader}
                        onPress={()=>this.getData()}
                        activeOpacity={0.8}>
                        <Text>{this.state.loader}</Text>
                    </TouchableOpacity>
                    :
                    <FlatList
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.renderItem.bind(this)}
                    ItemSeparatorComponent={()=><View style={{width:cfn.deviceWidth(),height:1,backgroundColor:'#ddd'}}/>}
                />}


            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        // backgroundColor:'#fff',
        flex:1,
        alignItems:'center'
    },
    loader: {
        position:'absolute',
        top:cfn.deviceHeight()/2,
    },
    itemContainer: {
        width:cfn.deviceWidth(),
        minHeight:cfn.picHeight(250),
        justifyContent:'center',
        paddingLeft:cfn.picWidth(20),
        backgroundColor:'#fff'
    },
    price: {
        fontSize:15,
        color:'#f33',
        position:'absolute',
        right:cfn.picWidth(20)
    },
    fourS: {
        width:cfn.picWidth(60),
        height:cfn.picHeight(30),
        borderColor:'#666',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    btn: {
        width:cfn.picWidth(140),
        height:cfn.picHeight(60),
        backgroundColor:'#4c1',
        alignItems:'center',
        justifyContent:'center'
    }

});