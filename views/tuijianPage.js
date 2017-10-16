/**
 * Created by timxiong on 2017/9/6.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    FlatList,
    RefreshControl
} from 'react-native';

import NavBar from '../component/NavBar';
import cfn from '../tools/commonFun'
import urls from '../config/urls'
import config from '../config/config'
import fetchp from '../tools/fetch-polyfill';

export default class MinePage extends Component {

    constructor(props) {
        super(props);

        this.error = '加载错误，点击重试';
        this.loading = '正在加载...';

        this.state = {
            data:[],
            isRefreshing:true,
            isError: false,
            loadState: this.loading
        }
    }

    static defaultProps = {};

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetchp(urls.getTuijianData(),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
            .catch((error)=>this.setError(error))
    }

    setData(data) {
        //console.log(data);
        this.setState({
            data:data.items,
            isRefreshing:false
        })
    }

    setError(error) {
        this.setState({
            isError:true,
            isLoading:false,
            data:[],
            loadState:this.error
        });
    }



    goToDetail(route, params) {
        this.props.navigation.navigate(route, params)
    }

    _keyExtractor = (item, index) => item.period;

    renderItem({item, index}) {
        let list = [<View key={'t'+1} style={styles.itemTitle}>
            <Text key={'t'+2} style={styles.itemText}>{item.date + "  第" + item.period + "期"}</Text></View>,
            <View
                key={'t'+3}
                style={styles.itemContainer}>
                <Text style={[styles.mingci,{color:'#071244'}]}>名次</Text>
                {index == 0 ? null : <View style={styles.haomaContainer}>
                    <Text style={[styles.haoma,{color:'#071244'}]}>开奖号码</Text>
                </View>}

                <View style={styles.tuijianContainer}>
                    <Text style={[styles.tuijianTitle,{color:'#071244'}]}>专家推荐</Text>
                </View>
            </View>];
        let data = item.data;
        let result = item.result.split(',');
        let tuijianCode = null;
        result.push(parseInt(result[0]) + parseInt(result[1]));

        for(let i = 0; i < data.length; i++) {

            let codeColor = ['#999','#999','#999','#999','#999',]; //推荐号码
            let strColor = ['#999', '#999']; // 推荐大小单双

            if(index == 0) {
                codeColor = ['#222','#222','#222','#222','#222'];
                strColor = ['#222','#222']
            }

            let dataCode = data[i].data; // 推荐的号码与大小单双 index=0 => 号码； index=1 => 单双； index=2 => 大小
            tuijianCode = dataCode[0].result.split(',');
            if(dataCode[0].state == 1) {
                // 找出推荐成功的号码
                for(let j = 0; j < tuijianCode.length; j++) {
                    if(tuijianCode[j] == result[i]) {
                        codeColor[j] = '#f00';
                        break;
                    }
                }
            }
            // 找出推荐成功的 大小单双
            if(i < 10) {
                if(dataCode[1].state == 1) {
                    strColor[0] = '#f00';
                } else if(dataCode[2].state == 1) {
                    strColor[1] = '#f00';
                }
            }


            list.push(
                <View
                    key={item.period + data[i].name}
                    style={styles.itemContainer}>
                    <Text style={[styles.mingci,{color:'#071244'}]}>{data[i].name}</Text>

                    {index == 0 ? null : <View style={styles.haomaContainer}>
                        <View style={styles.code}>
                            <Text style={styles.haoma}>{result[i]}</Text>
                        </View>
                    </View>}

                    <View style={styles.tuijianContainer}>

                        <Text style={[styles.tuijianNum,{color:codeColor[0]}]}>{tuijianCode[0]}</Text>
                        <Text style={styles.tuijianNum}>,</Text>
                        <Text style={[styles.tuijianNum,{color:codeColor[1]}]}>{tuijianCode[1]}</Text>
                        <Text style={styles.tuijianNum}>,</Text>
                        <Text style={[styles.tuijianNum,{color:codeColor[2]}]}>{tuijianCode[2]}</Text>
                        <Text style={styles.tuijianNum}>,</Text>
                        <Text style={[styles.tuijianNum,{color:codeColor[3]}]}>{tuijianCode[3]}</Text>
                        <Text style={styles.tuijianNum}>,</Text>
                        <Text style={[styles.tuijianNum,{color:codeColor[4]}]}>{tuijianCode[4]}</Text>

                        <View style={{width:cfn.picWidth(140),flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                            {i == 10 ? null :
                                [<Text key="单双" style={[styles.tuijianStr,{color:strColor[0]}]}>{dataCode[1].result}</Text>,
                            <Text key="大小" style={[styles.tuijianStr,{color:strColor[1]}]}>{dataCode[2].result}</Text>]}
                        </View>
                    </View>
                </View>
            )
        }

        return list;

    }

    _onRefresh() {
        this.setState({
            isRefreshing:true
        });
        this.getData();
    }

    reLoad() {

        if(this.state.loadState == this.error) {
            this.setState({
                isLoading:true,
                isError: false,
                loadState:this.loading
            });
            this.getData();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    middleText='专家推荐'
                    leftIcon={null}
                />

                {this.state.data.length == 0 ?
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{position:'absolute',top:cfn.deviceHeight()/2}}
                        onPress={()=>this.reLoad()}
                    >
                        <Text>{this.state.loadState}</Text>
                    </TouchableOpacity> :
                    <FlatList
                    //style={styles.flatListStyle}
                    data={this.state.data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#000"
                            title="正在加载···"
                            titleColor="#000"
                            colors={['#000']}
                            progressBackgroundColor="#fff"
                        />}
                />}

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: cfn.deviceHeight()
    },
    itemContainer: {
        flexDirection:'row',
        alignItems:'center',
        width:cfn.deviceWidth(),
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        height:cfn.picHeight(60),
        backgroundColor:'#fff'
    },
    itemTitle:{
      height:cfn.picHeight(70),
        marginLeft:cfn.picWidth(20),
        justifyContent:'center',
        marginTop:cfn.picHeight(20)
    },
    itemText: {
        color:'#222'
    },
    mingci: {
        width:cfn.picWidth(150),
        textAlign:'center',
        color:'#555',
        fontSize:13
    },
    haomaContainer: {
        width:cfn.picWidth(150),
        alignItems:'center',
        justifyContent:'center',
        borderLeftColor:'#ddd',
        borderLeftWidth:1,
    },
    haoma: {
        color:'#eee',
        fontSize:13,
    },
    code: {
        width:cfn.picHeight(40),
        height:cfn.picHeight(40),
        backgroundColor:'#e11',
        borderRadius:cfn.picHeight(20),
        alignItems:'center',
        justifyContent:'center'
    },
    tuijianTitle: {
        color:'#071244',
        fontSize:13,
    },
    tuijianNum: {
        color:'#071244',
        fontSize:13,
        minWidth:cfn.picWidth(25)
    },
    tuijianStr: {
        color:'#999',
        fontSize:13,
        minWidth:cfn.picWidth(45)
    },
    tuijianContainer: {
        flexDirection: 'row',
        alignItems:'center',
        width:cfn.deviceWidth() - cfn.picWidth(150+150),
        justifyContent:'center',
        borderLeftColor:'#ddd',
        borderLeftWidth:1,
    },

});