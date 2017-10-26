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
} from 'react-native';
import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun'
export default class gongluePage extends Component{
    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText="详细攻略"
                    leftFn={()=>this.goBack()}
                />
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>{this.props.navigation.state.params.title}</Text>
                    <Text style={styles.subTitle}>{this.props.navigation.state.params.subTitle}</Text>
                    <View style={styles.line}/>
                    <Text style={styles.content}>{this.props.navigation.state.params.content}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      alignItems:'center'
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