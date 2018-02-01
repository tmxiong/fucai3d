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
import QishuModal from '../../component/qishuModal'
import Spinner from 'react-native-loading-spinner-overlay';
export default class trendMenuPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            isError:false,
            qiShu:30,
            isLoading:false,
        };
        this.visible = false;
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
        fetchp(urls.getAllTrend(this.state.qiShu), {timeout: 5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((err)=>this.setError())
    }
    setData(data) {
        this.setState({
            data: data.items,
        });
        setTimeout(()=>{
            this.setState({
                isLoading:false,
            })
        },300)
    }
    setError() {
        this.setState({
            isError: true,
            isLoading:false,
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
            if(code[i] % 2 == 0) {
                da ++;
                daxiao.push('偶');
            } else {
                xiao ++;
                daxiao.push('奇')
            }
        }
        daxiaobi[da] = xiao + ':' + da;
        // 大小分布
        let daxiaofenbu = ['偶偶偶','偶偶奇', '偶奇偶', '奇偶偶', '偶奇奇', '奇偶奇', '奇奇偶', '奇奇奇'];
        let daxiaofenbu_1 = ['','','','','','','',''];
        for(let i = 0 ; i < daxiaofenbu.length; i++) {
            if(daxiaofenbu[i] == daxiao.join('')) {
                daxiaofenbu_1[i] = "√";
            }
        }

        return(
            <View style={[styles.itemContainer,{height:cfn.picHeight(80)}]}>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*2}]}>
                    <Text style={{color:'#000'}}>{item.qiHao.substr(-3)}</Text>
                </View>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*3}]}>
                    <Text style={{color:'#e00'}}>{item.lottery.replace(/,/g,' ')}</Text>
                </View>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*4}]}>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaobi[0]==''?'#fff':'#f00'}]}><Text style={styles.text_s}>{daxiaobi[0]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaobi[1]==''?'#fff':'#f00'}]}><Text style={styles.text_s}>{daxiaobi[1]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaobi[2]==''?'#fff':'#f00'}]}><Text style={styles.text_s}>{daxiaobi[2]}</Text></View>
                    <View style={[styles.itemCell_s,{borderRightWidth:0,backgroundColor:daxiaobi[3]==''?'#fff':'#f00'}]}><Text style={styles.text_s}>{daxiaobi[3]}</Text></View>
                </View>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*3}]}>
                    <Text style={{fontSize:12,color:daxiao[0] === '奇'? '#000': '#aaa'}}>{daxiao[0]}</Text>
                    <Text style={{fontSize:12,color:daxiao[1] === '奇'? '#000': '#aaa'}}>{daxiao[1]}</Text>
                    <Text style={{fontSize:12,color:daxiao[2] === '奇'? '#000': '#aaa'}}>{daxiao[2]}</Text>
                </View>
                <View style={[styles.itemCell_row,{width:cfn.deviceWidth()/20*8}]}>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[0]==''?'#fff':'#0d0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[0]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[1]==''?'#fff':'#0d0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[1]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[2]==''?'#fff':'#0d0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[2]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[3]==''?'#fff':'#0d0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[3]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[4]==''?'#fff':'#0d0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[4]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[5]==''?'#fff':'#0d0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[5]}</Text></View>
                    <View style={[styles.itemCell_s,{backgroundColor:daxiaofenbu_1[6]==''?'#fff':'#0d0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[6]}</Text></View>
                    <View style={[styles.itemCell_s,{borderRightWidth:0,backgroundColor:daxiaofenbu_1[7]==''?'#fff':'#0d0'}]}><Text style={styles.text_s}>{daxiaofenbu_1[7]}</Text></View>
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

    setQishu() {
        if(this.visible) {
            this._qishuModal._closeModal();
        }else {
            this._qishuModal._showModal();
        }
    }

    _onClose(qishu) {
        this.visible = false;
        if(qishu) {
            this.setState({
                qiShu:qishu,
                isLoading:true,
            });
            setTimeout(()=>{
                this.getData()
            },700)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='奇偶比'
                    leftFn={()=>this.goBack()}
                    rightText={this.state.qiShu + "期"}
                    rightFn={()=>this.setQishu()}
                />
                <View style={styles.container}>
                    <View style={[styles.itemContainer,{height: cfn.picHeight(190),backgroundColor:'#e5e5e5'}]}>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*2}]}>
                            <Text style={styles.text_title}>期号</Text>
                        </View>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*3}]}>
                            <Text style={styles.text_title}>号码</Text>
                        </View>
                        <View style={styles.itemCell}>
                            <View style={styles.itemCell_h}>
                                <Text style={styles.text_title}>奇偶比</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>0:3</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>1:2</Text></View>
                                <View style={styles.itemCell_s}><Text style={styles.text_title}>2:1</Text></View>
                                <View style={[styles.itemCell_s,{borderRightWidth:0}]}><Text style={styles.text_title}>3:0</Text></View>
                            </View>

                        </View>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*3}]}>
                            <Text style={styles.text_title}>奇偶</Text>
                        </View>
                        <View style={[styles.itemCell,{width:cfn.deviceWidth()/20*8}]}>
                            <View style={[styles.itemCell_h,{width:cfn.deviceWidth()/20*8}]}>
                                <Text style={styles.text_title}>奇偶分布</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.itemCell_s}><Text style={[styles.text_title,{height:cfn.picHeight(130)}]}>偶偶偶</Text></View>
                                <View style={styles.itemCell_s}><Text style={[styles.text_title,{height:cfn.picHeight(130)}]}>偶偶奇</Text></View>
                                <View style={styles.itemCell_s}><Text style={[styles.text_title,{height:cfn.picHeight(130)}]}>偶奇偶</Text></View>
                                <View style={styles.itemCell_s}><Text style={[styles.text_title,{height:cfn.picHeight(130)}]}>奇偶偶</Text></View>
                                <View style={styles.itemCell_s}><Text style={[styles.text_title,{height:cfn.picHeight(130)}]}>偶奇奇</Text></View>
                                <View style={styles.itemCell_s}><Text style={[styles.text_title,{height:cfn.picHeight(130)}]}>奇偶奇</Text></View>
                                <View style={styles.itemCell_s}><Text style={[styles.text_title,{height:cfn.picHeight(130)}]}>奇奇偶</Text></View>
                                <View style={[styles.itemCell_s,{borderRightWidth:0}]}><Text style={[styles.text_title,{height:cfn.picHeight(130)}]}>奇奇奇</Text></View>
                            </View>
                        </View>
                    </View>

                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderItem.bind(this)}
                        keyExtractor={this._keyExtractor}
                        legacyImplementation={true}
                        ListEmptyComponent={
                            <TouchableOpacity
                                style={{marginTop:cfn.picHeight(50)}}
                                activeOpacity={0.8} onPress={()=>this._reload()}>
                                <Text>{this.state.isError ? "加载错误，点击重试" : "数据加载中..."}</Text>
                            </TouchableOpacity>

                        }
                    />

                </View>
                <QishuModal
                    ref={(ref)=>this._qishuModal = ref}
                    onClose={(qishu)=>this._onClose(qishu)}
                />
                <Spinner visible={this.state.isLoading}
                         textContent={"正在加载..."}
                         overlayColor="rgba(0,0,0,0.5)"
                         color="rgb(217,29,54)"
                         textStyle={{color: 'rgb(217,29,54)',fontSize:12}} />
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
        height: cfn.picHeight(190),
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
        //backgroundColor:'#fff',
        height:cfn.picHeight(190),
        alignItems:'center',
        justifyContent:'center'
    },
    //竖的
    itemCell_s: {
        width:cfn.deviceWidth()/20,
        alignItems:'center',
        justifyContent:'center',
        height:cfn.picHeight(130),
        borderRightWidth:1,
        borderRightColor:'#eee',
    },
    // 横的
    itemCell_h: {
        borderBottomColor:'#eee',borderBottomWidth:1,
        height:cfn.picHeight(60),alignItems:'center',
        justifyContent:'center',width:cfn.deviceWidth()/20*4
    },
    text_title: {
        color:'#333',
        fontSize:12,
        textAlign:'center',
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