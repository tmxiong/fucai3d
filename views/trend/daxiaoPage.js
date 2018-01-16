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

    goBack() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='大小走势'
                    leftFn={()=>this.goBack()}
                />
                <View style={styles.container}>
                    <View style={[styles.itemContainer,{height: cfn.picHeight(150)}]}>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*2}]}>
                            <Text>期号</Text>
                        </View>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*3}]}>
                            <Text>号码</Text>
                        </View>
                        <View style={styles.itemCell}>
                            <View style={styles.itemCell_h}>
                                <Text>大小比</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>0:3</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>0:3</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>0:3</Text></View>
                                <View style={[styles.itemCell_s,{borderRightWidth:0}]}><Text style={styles.text_s}>0:3</Text></View>
                            </View>

                        </View>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*3}]}>
                            <Text>大小</Text>
                        </View>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*8}]}>
                            <View style={[styles.itemCell_h,{width:cfn.deviceWidth()/20*8}]}>
                                <Text>大小分布</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>小小小</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>小小大</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>小大小</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>大小小</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>小大大</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>大小大</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_s}>大大小</Text></View>
                                <View style={[styles.itemCell_s,{borderRightWidth:0}]}><Text style={styles.text_s}>大大大</Text></View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.itemContainer,{height:cfn.picHeight(80)}]}>
                        <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*2}]}>
                            <Text>234</Text>
                        </View>
                        <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*3}]}>
                            <Text>345</Text>
                        </View>
                        <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*4}]}>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>0:3</Text></View>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>0:3</Text></View>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>0:3</Text></View>
                            <View style={[styles.itemCell_s,{borderRightWidth:0}]}><Text style={styles.text_s}>0:3</Text></View>
                        </View>
                        <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*3}]}>
                            <Text>大小大</Text>
                        </View>
                        <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*8}]}>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>小</Text></View>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>小</Text></View>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>小</Text></View>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>大</Text></View>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>小</Text></View>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>大</Text></View>
                            <View style={styles.itemCell_s}><Text style={styles.text_s}>大</Text></View>
                            <View style={[styles.itemCell_s,{borderRightWidth:0}]}><Text style={styles.text_s}>大</Text></View>
                        </View>
                    </View>
                </View>

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
        width: cfn.deviceWidth(),
        height: cfn.picHeight(150),
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderBottomColor:'#eee',
        borderBottomWidth:1
    },
    itemCell: {
        borderRightWidth:1,
        borderRightColor:'#eee',
        backgroundColor:'#fff',
        height:cfn.picHeight(150),
        alignItems:'center',
        justifyContent:'center'
    },
    //竖的
    itemCell_s: {
        width:cfn.deviceWidth()/20,
        alignItems:'center',
        justifyContent:'center',
        height:cfn.picHeight(90),
        borderRightWidth:1,
        borderRightColor:'#eee'
    },
    // 横的
    itemCell_h: {
        borderBottomColor:'#eee',borderBottomWidth:1,
        height:cfn.picHeight(60),alignItems:'center',
        justifyContent:'center',width:cfn.deviceWidth()/20*4
    },
    text_s: {
        fontSize:12,
        textAlign:'center'
    },
    itemCell_row: {
        borderRightWidth:1,
        borderRightColor:'#eee',
        backgroundColor:'#fff',
        height:cfn.picHeight(80),
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },

});