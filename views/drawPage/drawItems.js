/**
 * Created by timxiong on 2017/10/24.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    DeviceEventEmitter,
    TouchableOpacity,
    Alert
} from 'react-native';
import cfn from '../../tools/commonFun';
import config from '../../config/config'
export default class drawItems extends Component {

    constructor(props) {
        super(props);

        this.color = ['#888','#888','#888'];
        this.cacheState = ['清除缓存','正在清除...','已清除缓存'];

        this.state={
            name:'北京幸运28',
            color: [config.baseColor,'#888','#888'],
            cacheState:this.cacheState[0],
        }
    }

    componentDidMount() {

    }
    goToPage(route, params) {
        this.props.navigation.navigate(route, params);
    }
    setLottery(data,index) {
        let color = JSON.parse(JSON.stringify(this.color));
        color[index] = config.baseColor;
        this.setState({name: data.name, color:color});
        DeviceEventEmitter.emit("setLottery",data);
    }

    cleanCache() {
        this.setState({
            cacheState:this.cacheState[1],
        });
        setTimeout(()=>{
            this.setState({
                cacheState:this.cacheState[2],
            });
        },2000)
    }

    render() {
        return(
            <ScrollView>
                {/*<DrawerItems {...props} />*/}
                <View style={styles.drawPage}>
                    <View
                        style={{height:cfn.picHeight(300),
                            backgroundColor:config.baseColor,
                            width:cfn.deviceWidth()/2,alignItems:'center',justifyContent:'center'}}>
                        <Image
                            style={styles.appIcon}
                            source={require('../../imgs/appIcon/cp_icon.png')}/>
                        <Text style={{marginTop:cfn.picHeight(30),color:'#fff'}}>{config.sourceName}</Text>
                    </View>
                    <View style={{width:cfn.deviceWidth()/2,flexDirection:'row',
                        height:cfn.picHeight(60),backgroundColor:'#eee',
                        alignItems:'center'}}>
                        <Text style={{color:'#555',marginLeft:cfn.picWidth(20),fontSize:12}}>当前选择：</Text>
                        <Text style={{color:config.baseColor,fontSize:12}}>{this.state.name}</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=> this.setLottery({type:1,name:'北京幸运28'},0)}
                        style={styles.itemContainer}>
                        <Text style={[styles.itemText,{color:this.state.color[0]}]}>北京幸运28</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=> this.setLottery({type:3,name:'丹麦幸运28'},1)}
                        style={styles.itemContainer}>
                        <Text style={[styles.itemText,{color:this.state.color[1]}]}>丹麦幸运28</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=> this.setLottery({type:2,name:'加拿大幸运28'},2)}
                        style={styles.itemContainer}>
                        <Text style={[styles.itemText,{color:this.state.color[2]}]}>加拿大幸运28</Text>
                    </TouchableOpacity>
                    <View style={{width:cfn.deviceWidth()/2,flexDirection:'row',
                        height:cfn.picHeight(60),backgroundColor:'#eee',
                        alignItems:'center'}}>
                        <Text
                            style={{color:'#555',marginLeft:cfn.picWidth(20),fontSize:12}}>更多功能↓↓</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=> this.goToPage('Order')}
                        style={styles.itemContainer}>
                        <Text style={styles.itemText}>更多彩种</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=> this.cleanCache()}
                        style={styles.itemContainer}>
                        <Text style={styles.itemText}>{this.state.cacheState}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=> Alert.alert("提示：","反馈邮箱：tmxiong@foxmail.com")}
                        style={styles.itemContainer}>
                        <Text style={styles.itemText}>意见反馈</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    appIcon: {
        width:cfn.picWidth(100),
        height:cfn.picWidth(100),
        borderRadius:cfn.picWidth(50),
        marginTop:cfn.picHeight(30)
    },
    icon: {
        width: 24,
        height: 24,
    },
    drawPage: {
        width:cfn.deviceWidth()/2,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    itemContainer: {
        height:cfn.picHeight(100),
        width:cfn.deviceWidth()/2,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    itemText: {
        marginLeft:cfn.picWidth(30)
    }
});