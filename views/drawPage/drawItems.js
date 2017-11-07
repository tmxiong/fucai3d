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
        this.selctedIcon = require('../../imgs/drawPage/kuai3_selected.png');
        this.unselctedIcon = require('../../imgs/drawPage/kuai3_unselected.png');
        this.selctedText = '#d81e06';
        this.unselctedText = '#8a8a8a';
        this.state={
            name:'江苏快3',
            color: [config.baseColor,'#888','#888'],
            cacheState:this.cacheState[0],
            kuai3Icon:[this.selctedIcon, this.unselctedIcon, this.unselctedIcon, this.unselctedIcon, this.unselctedIcon, this.unselctedIcon,],
            kuai3Text:[this.selctedText, this.unselctedText, this.unselctedText, this.unselctedText, this.unselctedText, this.unselctedText,]
        }
    }

    componentDidMount() {

    }
    goToPage(route, params) {
        this.props.navigation.navigate(route, params);
    }
    setLottery(data,index) {
        let iconTemp = [this.unselctedIcon, this.unselctedIcon, this.unselctedIcon, this.unselctedIcon, this.unselctedIcon, this.unselctedIcon];
        let textTemp = [this.unselctedText, this.unselctedText, this.unselctedText, this.unselctedText, this.unselctedText, this.unselctedText];
        iconTemp[index] = this.selctedIcon;
        textTemp[index] = this.selctedText;
        this.setState({kuai3Icon:iconTemp, kuai3Text:textTemp, name: data.name});
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
                    <Image
                        source={require('../../imgs/home/menu_bg_3.png')}
                        style={{height:cfn.picHeight(300),resizeMode:'stretch',
                            width:cfn.deviceWidth()/3*2,alignItems:'center',justifyContent:'center'}}>
                        <Image
                            style={styles.appIcon}
                            source={require('../../imgs/appIcon/ic_launcher.png')}/>
                        <Text style={{marginTop:cfn.picHeight(30),color:'#fff'}}>{config.sourceName}</Text>
                    </Image>
                    <View style={{width:cfn.deviceWidth()/3*2,flexDirection:'row',
                        height:cfn.picHeight(60),backgroundColor:'#eee',
                        alignItems:'center'}}>
                        <Text style={{color:'#555',marginLeft:cfn.picWidth(20),fontSize:12}}>当前选择：</Text>
                        <Text style={{color:config.baseColor,fontSize:12}}>{this.state.name}</Text>
                    </View>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        <View style={styles.k3Container}>
                            <TouchableOpacity style={styles.kuai3Btn} activeOpacity={0.8}
                                              onPress={()=>this.setLottery({type:'k3js',name:'江苏快3'},0)}>
                            <Image source={this.state.kuai3Icon[0]}
                                   style={styles.kuai3Icon}/>
                            <Text style={[styles.kuai3Text,{color:this.state.kuai3Text[0]}]}>江苏快3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.k3Container,{borderLeftColor:'#ddd',borderLeftWidth:1,
                        borderRightColor:'#ddd',borderRightWidth:1}]}>
                            <TouchableOpacity style={styles.kuai3Btn} activeOpacity={0.8}
                                              onPress={()=>this.setLottery({type:'k3jl',name:'吉林快3'},1)}>
                            <Image source={this.state.kuai3Icon[1]}
                                   style={styles.kuai3Icon}/>
                            <Text style={[styles.kuai3Text,{color:this.state.kuai3Text[1]}]}>吉林快3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.k3Container}>
                            <TouchableOpacity style={styles.kuai3Btn} activeOpacity={0.8}
                                              onPress={()=>this.setLottery({type:'k3Hb',name:'湖北快3'},2)}>
                            <Image source={this.state.kuai3Icon[2]}
                                   style={styles.kuai3Icon}/>
                            <Text style={[styles.kuai3Text,{color:this.state.kuai3Text[2]}]}>湖北快3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.k3Container}>
                            <TouchableOpacity style={styles.kuai3Btn} activeOpacity={0.8}
                                              onPress={()=>this.setLottery({type:'k3jx',name:'江西快3'},3)}>
                            <Image source={this.state.kuai3Icon[3]}
                                   style={styles.kuai3Icon}/>
                            <Text style={[styles.kuai3Text,{color:this.state.kuai3Text[3]}]}>江西快3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.k3Container,{borderLeftColor:'#ddd',borderLeftWidth:1,
                            borderRightColor:'#ddd',borderRightWidth:1}]}>
                            <TouchableOpacity style={styles.kuai3Btn} activeOpacity={0.8}
                                              onPress={()=>this.setLottery({type:'k3ah',name:'安徽快3'},4)}>
                            <Image source={this.state.kuai3Icon[4]}
                                   style={styles.kuai3Icon}/>
                            <Text style={[styles.kuai3Text,{color:this.state.kuai3Text[4]}]}>安徽快3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.k3Container}>
                            <TouchableOpacity style={styles.kuai3Btn} activeOpacity={0.8}
                                              onPress={()=>this.setLottery({type:'k3hb',name:'河北快3'},5)}>
                            <Image source={this.state.kuai3Icon[5]}
                                   style={styles.kuai3Icon}/>
                            <Text style={[styles.kuai3Text,{color:this.state.kuai3Text[5]}]}>河北快3</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{width:cfn.deviceWidth()/3*2,flexDirection:'row',
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
                        onPress={()=> this.goToPage('Welcome',{showWebView:false,url:''})}
                        style={styles.itemContainer}>
                        <Text style={styles.itemText}>欢迎页</Text>
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
        width:cfn.deviceWidth()/3*2,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    itemContainer: {
        height:cfn.picHeight(100),
        width:cfn.deviceWidth()/3*2,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    itemText: {
        marginLeft:cfn.picWidth(30)
    },
    k3Container: {
        alignItems:'center',
        justifyContent:'center',
        width:cfn.deviceWidth()/3*2/3,
        height:cfn.picWidth(170),
        borderTopColor:'#ddd',
        borderTopWidth:1,
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    kuai3Btn: {
        alignItems:'center',
        justifyContent:'center',
    },
    kuai3Icon: {
        width: cfn.picWidth(80),
        height:cfn.picWidth(80)
    },
    kuai3Text: {
        color:'#888',
        marginTop:cfn.picHeight(10)
    }

});