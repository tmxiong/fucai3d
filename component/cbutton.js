/**
 * Created by xiongtm on 2017/11/8.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import cfn from '../tools/commonFun'
import config from '../config/config'
export default class cbutton extends PureComponent {

    static defaultProps = {
        onChangeBack: ()=>{},
        btnIndex: 0,
        btnState: 0, //0没点击，1点击了
        btnText:'',
    };
    constructor(props) {
        super(props);
        this.btnColor=['#fff', config.baseColor];
        this.btnText=['#aaa','#fff'];
        this.state={
            btnState: props.btnState
        };

        this.buttonRef = this.setBtn.bind(this);
    }
    onChange() {
        // 告诉上级我是第几号按钮
        this.props.onChangeBack(this.props.btnIndex,this.props.date);
    }

    setBtn(index) {
        // 自身btnIndex 与传进来的 index 匹配
        if(index == this.props.btnIndex) {
            // 已经被点击
            if(this.state.btnState == 1) {
                //alert(index+'又被点击了')
            } else {
                this.setState({btnState:1});
                // alert(index+'第一次被点击')
            }
        } else {
            this.setState({btnState:0})
        }
    }

   render() {
       return(
           <TouchableOpacity
               activeOpacity={0.8}
               onPress={()=>this.onChange()}
               style={[styles.btn,{backgroundColor:this.btnColor[this.state.btnState]}]}>
               <Text style={{color:this.btnText[this.state.btnState]}}>{this.props.btnText}</Text>
           </TouchableOpacity>
       )
   }
}
const styles = StyleSheet.create({
    btn: {
        width: cfn.picWidth(100),
        height:cfn.picHeight(50),
        marginRight:cfn.picWidth(10),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:cfn.picWidth(10),
        borderColor:'#aaa',
        borderWidth:1
    },
});