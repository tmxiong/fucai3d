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
        price: 'price',
        id:'id',
        item:[],
        savePKCars:()=>{},
        goToPage:()=>{},
    };

    constructor(props) {
        super(props);
        this.state={
            isSelected: props.isSelected || false, //收藏按钮
            isSelectedPK: props.isSelectedPK || false, //PK按钮
        };
        //收藏按钮背景颜色,按钮文字颜色
        this.unselectedBtn = ['transparent','#aaa'];
        this.selectedBtn= ['#efa900','#fff'];

        //PK按钮背景颜色,按钮文字颜色
        this.unselectedPKBtn = ['#f33','#fff'];
        this.selectedPKBtn = ['#bbb','#333']

    }

    pressBtn(type, data) {
        if(type == 'Shop') {
            this.props.goToPage(type,data)
        } else if(type == 'collect'){
            // collect
            this.setState({
                isSelected: !this.state.isSelected
            })
        } else {
            this.setState({
                isSelectedPK: true,
            });
            this.props.savePKCars(data);
        }
    }


    render() {
        let item = this.props;
        let textColor = this.state.isSelected ? this.selectedBtn[1] : this.unselectedBtn[1];
        let borderColor = this.state.isSelected ? this.selectedBtn[0] : this.unselectedBtn[1];
        let bgColor = this.state.isSelected ? this.selectedBtn[0] : this.unselectedBtn[0];
        let btnText = this.state.isSelected ? '取消收藏':'收藏此车';

        let PKBgColor = this.state.isSelectedPK ? this.selectedPKBtn[0] : this.unselectedPKBtn[0];
        let PKTextColor = this.state.isSelectedPK ? this.selectedPKBtn[1] : this.unselectedPKBtn[1];
        let PKBtnText = this.state.isSelectedPK ? '已加入PK赛车' : '加入PK赛车';
        return(
            <View
                style={styles.itemContainer}>
                <TouchableOpacity
                    onPress={()=>this.goToPage('CarVersionDetail',{id:item.id})}
                    activeOpacity={0.8}
                    style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                    <Text style={styles.detailText}>详细配置>></Text>
                </TouchableOpacity>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={()=>this.pressBtn('Shop',{id:item.id})}
                        activeOpacity={0.8} style={styles.btn}>
                        <Text style={styles.btnText}>经销商</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.pressBtn('collect')}
                        activeOpacity={0.8}
                        style={[styles.btn,{backgroundColor:bgColor,borderColor:borderColor}]}>
                        <Text style={[styles.btnText,{color:textColor}]}>{btnText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.pressBtn('PK',item.item)}
                        activeOpacity={0.8} style={[styles.pk,{backgroundColor:PKBgColor}]}>
                        <Text style={[styles.pkText,{color:PKTextColor}]}>{PKBtnText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        //flexDirection:'row',
        backgroundColor:'#fff',
        minHeight:cfn.picHeight(220),
        justifyContent:'center'
    },
    textContainer: {
        marginLeft:cfn.picWidth(20),
        marginTop:cfn.picHeight(20),
        justifyContent:'center'
    },
    name: {
        fontSize:15,
        color:'#333'
    },
    price: {
        marginTop:cfn.picHeight(10),
        fontSize:15,
        color:'#f33'
    },
    detailText: {
        position:'absolute',
        right:cfn.picWidth(20),
        fontSize:13,
        color:'#aaa',
    },
    btnContainer: {
        marginTop:cfn.picHeight(20),
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:cfn.picWidth(20),
        marginBottom:cfn.picHeight(20)
    },
    btn: {
        width:(cfn.deviceWidth()-cfn.picWidth(80))/4,
        height:cfn.picHeight(60),
        alignItems:'center',
        justifyContent:'center',
        //borderRadius:10,
        borderColor:'#bbb',
        borderWidth:1,
        marginRight:cfn.picWidth(20)
    },
    btnText: {
        color:'#bbb',
        fontSize:12,
    },
    pkText: {
        color:'#fff',
        fontSize:12
    },
    pk: {
        width:(cfn.deviceWidth()-cfn.picWidth(80))/2,
        height:cfn.picHeight(60),
        backgroundColor:config.baseColor,
        alignItems:'center',
        justifyContent:'center',
        //borderRadius:10
    },
});