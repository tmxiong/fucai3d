/**
 * Created by tmxiong on 2018/1/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Style,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun'
export default class trendMenuPage extends Component{

    goToPage(route,params) {
        this.props.navigation.navigate(route,params);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='走势图'
                    leftIcon={null}
                />
                <TouchableOpacity onPress={()=>this.goToPage('trend',{})}
                                  activeOpacity={0.8}
                                  style={styles.itemContainer}>
                    <Text>个、十、百位</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.goToPage('trend',{})}
                                  activeOpacity={0.8}
                                  style={styles.itemContainer}>
                    <Text>号码分布</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.goToPage('daxiao',{name:'大小走势'})}
                                  activeOpacity={0.8}
                                  style={styles.itemContainer}>
                    <Text>大小走势</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    itemContainer: {
        width: cfn.deviceWidth() - cfn.picWidth(40),
        height: cfn.picHeight(150),
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    }

});