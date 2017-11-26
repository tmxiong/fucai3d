/**
 * Created by tmxiong on 2017/11/26.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Linking
} from 'react-native';
import cfn from '../tools/commonFun'

import config from '../config/config'
export default class shopList extends PureComponent {

    static defaultProps = {
        name:'店名',
        address:'地址',
        newstitle:'newstitle',
        phone: 'phone',
        price: 'price',
    };

    constructor(props) {
        super(props);
        this.state={
            isSealed: false,
        };
        this.unselectedBtn = ['transparent','#aaa'];
        this.selectedBtn= ['#efa900','#fff']

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
        } else {
            // collect
            this.setState({
                isSealed: !this.state.isSealed
            })
        }
    }


    render() {
        let item = this.props;
        let textColor = this.state.isSealed ? this.selectedBtn[1] : this.unselectedBtn[1];
        let borderColor = this.state.isSealed ? this.selectedBtn[0] : this.unselectedBtn[1];
        let bgColor = this.state.isSealed ? this.selectedBtn[0] : this.unselectedBtn[0];
        let btnText = this.state.isSealed ? '取消收藏':'收藏此店';
        return(
            <View
                style={styles.itemContainer}>
                <View style={{flexDirection:'row',minHeight:cfn.picHeight(50),alignItems:'center',marginTop:cfn.picHeight(20)}}>
                    <View style={styles.fourS}>
                        <Text style={{color:'#666',fontSize:8}}>4S店</Text>
                    </View>
                    <Text style={{marginLeft:cfn.picWidth(20),
                        width:cfn.deviceWidth()-cfn.picWidth(200)}}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}万</Text>
                </View>
                <Text style={{color:'#888',fontSize:10,marginTop:cfn.picHeight(10),
                    marginBottom:cfn.picHeight(10),width:cfn.deviceWidth()-cfn.picWidth(40)}}>{item.address}</Text>
                <Text style={{color:'#bbb',fontSize:10,width:cfn.deviceWidth()-cfn.picWidth(40)}}>{item.newstitle}</Text>
                <View style={{flexDirection: 'row',marginTop:cfn.picHeight(10),
                    justifyContent:'flex-end',paddingRight:cfn.picWidth(20), marginBottom:cfn.picHeight(20)}}>
                    <TouchableOpacity
                        onPress={()=>this.pressBtn('collect')}
                        activeOpacity={0.8}
                        style={[styles.btn,styles.collectBtn,
                            {backgroundColor:bgColor,borderColor:borderColor}]}>
                        <Text style={{color: textColor,fontSize:12}}>{btnText}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>this.pressBtn('phone',item.phone)}
                        activeOpacity={0.8}
                        style={styles.btn}>
                        <Text style={{color:'#fff',fontSize:12}}>电话咨询</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
        backgroundColor:'#004fef',
        alignItems:'center',
        justifyContent:'center'
    },
    collectBtn: {
        borderColor:'#aaa',
        borderWidth:1,
        backgroundColor:'transparent',
        marginRight:cfn.picWidth(20)
    }
});