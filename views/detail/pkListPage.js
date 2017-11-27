import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import cfn from '../../tools/commonFun'
import NavBar from '../../component/NavBar'
import Global from '../../global/global'
export default class pkListPage extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            items:null,
            selectState:[],
            isAllSelected: false,
        }
    }

    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    goToPage(route,params) {
        this.props.navigation.navigate(route,params)
    }

    getData() {
        Global.storage.getAllDataForKey('PKCars')
            .then((data)=>this.setData(data))
    }
    setData(data) {
        this.getSelectState(data);
        this.renderItems(data);
    }

    // 首次加载时， 默认前两个是选中状态
    getSelectState(data) {
        let selectState = [];
        for(let i = 0; i < data.length; i++) {
            selectState.push(i > 1 ? 0 : 1);
        }
        this.setState({
            data:data,
            selectState:selectState
        })
    }

    pressItem(index) {
        let temp = this.state.selectState;
        temp[index] = temp[index] == 0 ? 1 : 0;

        this.setState({
            selectState: temp
        });
    }

    // 全选 全不选
    selectAll() {
        let data = this.state.data;
        let temp = this.state.selectState;
        let selectState = 1; // 未选中
        if(this.state.isAllSelected) {
            selectState = 0;
        }
        for(let i = 0; i < data.length; i++) {
            temp[i] = selectState;
        }

        this.setState({
            isAllSelected:!this.state.isAllSelected,
            selectState: temp,
        });
    }

    deleteItems() {
        Alert.alert(
            "提示：",
            "确定删除所选项？",
            [
                {text: '取消', onPress: () => {}},
                {text: '确定', onPress: () => this.deleteItemsOK()},
            ]
        );
        //Global.storage.clearMapForKey('history');
    }

    deleteItemsOK() {
        let selectState = this.state.selectState;
        let data = this.state.data;
        let ids = [];
        for(let i = 0; i < selectState.length; i++) {
            if(selectState[i] == 1) {
                //ids.push(data[i].id);
                Global.storage.remove({
                    key: 'PKCars',
                    id: data[i].id
                });
            }
        }
        this.getData();
        try{
            let params = this.props.navigation.state.params;
            if(params.update) {
                params.update();
            }
        }catch(e){}


    }

    addItems() {

    }

    PKItems() {
        let selectState = this.state.selectState;
        let data = this.state.data;
        let ids = [];
        for(let i = 0; i < selectState.length; i++) {
            if(selectState[i] == 1) {
                ids.push(data[i].id);
            }
        }

        if(ids.length != 2) {
            Alert.alert(
                '提示：',
                '请选择2款赛车进行PK!'
            )
        } else {
            this.goToPage('PK',{ids:ids.toString()})
        }
    }

    renderItems() {
        let data = this.state.data;
        let items = [];

        let selectedStyle = {
            backgroundColor:'rgba(255,19,24,0.1)',
            borderColor:'#f00',
        };
        let unselcetedStyle = {
            backgroundColor:'rgba(0,0,0,0.1)',
            borderColor:'#fff',
        };
        for(let i = 0; i < data.length; i++) {

            items.push(

                <View
                    key={data[i].id}
                    style={[styles.itemContainer,this.state.selectState[i] == 0 ? unselcetedStyle : selectedStyle]}>
                    <TouchableOpacity
                        onPress={()=>this.pressItem(i)}
                        activeOpacity={0.9}
                        style={styles.titleBtn}
                    >
                        <Text style={styles.titleText}>{data[i].name}</Text>
                        <Text style={styles.priceText}>{data[i].pricename + data[i].price}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.goToPage('CarVersionDetail',{id:data[i].id})}
                        style={styles.detailBtn}
                    >
                        <Text style={styles.detailText}>详情>></Text>
                    </TouchableOpacity>
                </View>

            )
        }
        return items;
    }

    render() {
        return (
            <Image
                source={require('../../imgs/pageBg/page_bg_pk.png')}
                style={styles.containerBg}>
                <NavBar
                    middleText="PK赛车列表"
                    leftFn={this.goBack.bind(this)}
                    rightText={this.state.isAllSelected ? "全不选" : "全选"}
                    rightFn={this.selectAll.bind(this)}
                />
                <View style={styles.container}>
                    <View style={styles.notice}>
                        <Text style={styles.noticeText}>注:可选择2款赛车型号进行PK,红色即为选中状态!</Text>
                    </View>

                    <ScrollView>
                        {this.state.data.length == 0 ?
                            <Text style={styles.loader}>暂无数据</Text> :
                            this.renderItems()}
                    </ScrollView>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            onPress={()=>this.deleteItems()}
                            activeOpacity={0.8}
                            style={styles.delBtn}>
                            <Text style={styles.btnText}>删除</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.PKItems()}
                            activeOpacity={0.8}
                            style={styles.PKBtn}>
                            <Text style={styles.btnText}>开始PK赛车</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.addBtn}>
                            <Text style={styles.btnText}>添加</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Image>
        )
    }

}

const styles = StyleSheet.create({
    containerBg: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'stretch'
    },
    container: {
        backgroundColor:'rgba(0,0,0,0.4)',
        flex: 1,
        alignItems:'center'
    },
    loader: {
        color:'#eee',
        fontSize:15,
        marginTop:cfn.deviceHeight()*1/3
    },
    notice: {
        height:cfn.picHeight(60),
        alignItems:'center',
        justifyContent:'center'
    },
    noticeText: {
        color:'#ccc',
    },
    itemContainer: {
        width:cfn.deviceWidth()-cfn.picWidth(40),
        minHeight:cfn.picHeight(120),
        backgroundColor:'rgba(255,19,24,0.1)',
        borderColor:'#f00',
        marginTop:cfn.picHeight(20),
        alignItems:'center',
        paddingLeft:cfn.picWidth(20),
        paddingRight:cfn.picWidth(20),
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        borderWidth:1
    },
    titleBtn: {
        width:cfn.deviceWidth()-cfn.picWidth(80 + 100),
        marginTop:cfn.picHeight(20),
        marginBottom:cfn.picHeight(20),

    },
    priceText: {
      color:'#888',
        fontSize:12,
        marginTop:cfn.picHeight(10)
    },
    titleText: {
        color:'#ddd'
    },
    detailBtn: {

    },
    detailText: {
        color:'#999',
    },
    btnContainer: {
        flexDirection:'row',
        alignItems:'center',
        width:cfn.deviceWidth(),
        height:cfn.picHeight(100),
        justifyContent:'space-between',
        paddingLeft:cfn.picWidth(20),
        paddingRight:cfn.picWidth(20),
        marginTop:cfn.picHeight(20),
        marginBottom:cfn.picHeight(20)
    },
    delBtn: {
        width:cfn.picWidth(150),
        height:cfn.picHeight(80),
        backgroundColor:'#aaa',
        alignItems:'center',
        justifyContent:'center'
    },
    PKBtn: {
        width:cfn.deviceWidth()-cfn.picWidth(40+150+150),
        height:cfn.picHeight(80),
        backgroundColor:'#e44',
        alignItems:'center',
        justifyContent:'center'
    },
    addBtn: {
        width:cfn.picWidth(150),
        height:cfn.picHeight(80),
        backgroundColor:'#4b4',
        alignItems:'center',
        justifyContent:'center'
    },
    btnText: {
        color:'#fff',
        fontSize:15
    }
});