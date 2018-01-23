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
    View,
    FlatList
} from 'react-native';

import NavBar from '../../component/NavBar'
import cfn from '../../tools/commonFun'
import fetchp from '../../tools/fetch-polyfill'
import urls from '../../config/urls'
export default class trendMenuPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            isError:false
        }
    }

    componentDidMount() {
        this.getData()
    }

    goToPage(route,params) {
        this.props.navigation.navigate(route,params);
    }

    goBack() {
        this.props.navigation.goBack();
    }

    getData() {
        fetchp(urls.getAllTrend(30), {timeout: 5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>this.setError())
    }
    setData(data) {
        this.setState({
            data: data.items,
        })
    }
    setError() {
        this.setState({
            isError: true,
        })
    }
    _keyExtractor=(item,index)=>index;

    _renderItem({item, index}) {
        // 0 1 2 3 4      5 6 7 8 9
        let code = item.lottery.split(',');
        let da = 0,xiao = 0;
        // 大小比
        let daxiaobi = ['','','',''];
        // 大小
        let daxiao = [];
        for(let i = 0; i < code.length;i++){
            if(code[i] > 4) {
                da ++;
                daxiao.push('大');
            } else {
                xiao ++;
                daxiao.push('小')
            }
        }
        daxiaobi[da] = da + ':' + xiao;
        // 大小分布
        let daxiaofenbu = ['小小小','小小大', '小大小', '大小小', '小大大', '大小大', '大大小', '大大大'];
        let daxiaofenbu_1 = ['','','','','','','',''];
        for(let i = 0 ; i < daxiaofenbu.length; i++) {
            if(daxiaofenbu[i] == daxiao.join('')) {
                daxiaofenbu_1[i] = "√";
            }
        }

        return(
            <View style={[styles.itemContainer,{height:cfn.picHeight(80)}]}>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*2}]}>
                    <Text>{item.qiHao.substr(-3)}</Text>
                </View>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*3}]}>
                    <Text>{item.lottery.replace(/,/g,' ')}</Text>
                </View>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*4}]}>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaobi[0]==''?'#fff':'#f00'}]}><Text style={styles.text_s}>{daxiaobi[0]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaobi[1]==''?'#fff':'#f00'}]}><Text style={styles.text_s}>{daxiaobi[1]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaobi[2]==''?'#fff':'#f00'}]}><Text style={styles.text_s}>{daxiaobi[2]}</Text></View>
                    <View style={[styles.itemCell_s,{borderRightWidth:0,backgroundColor:daxiaobi[3]==''?'#fff':'#f00'}]}><Text style={styles.text_s}>{daxiaobi[3]}</Text></View>
                </View>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*3}]}>
                    <Text>{daxiao.join(' ')}</Text>
                </View>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*8}]}>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[0]==''?'#fff':'#0f0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[0]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[1]==''?'#fff':'#0f0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[1]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[2]==''?'#fff':'#0f0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[2]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[3]==''?'#fff':'#0f0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[3]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[4]==''?'#fff':'#0f0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[4]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[5]==''?'#fff':'#0f0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[5]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[6]==''?'#fff':'#0f0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[6]}</Text></View>
                    <View style={[styles.itemCell_s,{borderRightWidth:0,backgroundColor:daxiaofenbu_1[7]==''?'#fff':'#0f0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[7]}</Text></View>
                </View>
            </View>
        )
    }

    _reload() {
        if(this.isError) {
            this.setState({
                isError:false,
            },()=>this.getData());
        }


    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='大小走势'
                    leftFn={()=>this.goBack()}
                />
                <View style={styles.container}>
                    <View style={[styles.itemContainer,{height: cfn.picHeight(150),backgroundColor:'#ddd'}]}>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*2}]}>
                            <Text style={styles.text_title}>期号</Text>
                        </View>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*3}]}>
                            <Text style={styles.text_title}>号码</Text>
                        </View>
                        <View style={styles.itemCell}>
                            <View style={styles.itemCell_h}>
                                <Text style={styles.text_title}>大小比</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>0:3</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>1:2</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>2:1</Text></View>
                                <View style={[styles.itemCell_s,{borderRightWidth:0}]}><Text style={styles.text_s}>3:0</Text></View>
                            </View>

                        </View>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*3}]}>
                            <Text style={styles.text_title}>大小</Text>
                        </View>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*8}]}>
                            <View style={[styles.itemCell_h,{width:cfn.deviceWidth()/20*8}]}>
                                <Text style={styles.text_title}>大小分布</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>小小小</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>小小大</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>小大小</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>大小小</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>小大大</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>大小大</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>大大小</Text></View>
                                <View style={[styles.itemCell_s,{borderRightWidth:0}]}><Text style={styles.text_title}>大大大</Text></View>
                            </View>
                        </View>
                    </View>

                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                        ListEmptyComponent={
                            <TouchableOpacity
                                style={{marginTop:cfn.picHeight(50)}}
                                activeOpacity={0.8} onPress={()=>this._reload()}>
                                <Text>{this.state.isError ? "加载错误，点击重试" : "数据加载中..."}</Text>
                            </TouchableOpacity>

                        }
                    />

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
    text_title: {
        color:'#000'
    },
    text_s: {
        fontSize:12,
        textAlign:'center',
        color:'#fff'
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