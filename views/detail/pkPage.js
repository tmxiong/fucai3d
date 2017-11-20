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
    SectionList
} from 'react-native';

import NavBar from '../../component/NavBar';
import cfn from '../../tools/commonFun'
import config from '../../config/config'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';

export default class jieshaoPage extends Component {

    static defaultProps={

    };
    constructor(props) {
        super(props);

        // this.id = this.props.navigation.state.params.id;
        this.id = '23370,21620';
        // this.name = this.props.navigation.state.params.name;
        // this.img = this.props.navigation.state.params.img;
        this.state={
            data:[],
            carImg:['',''],
            carName:[['',''],['','']],
            carPrice:[['',''],['','']],
            carItems:null,
        }
    }


    componentDidMount() {
        this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    getData() {
        fetchp(urls.getPK(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
    }

    setData(data) {
        let items = [data.result[0].paramitems, data.result[1].paramitems];
        let carItems = this.renderItems(items);


        this.setState({
            carImg:[data.result[0].specinfo.carsimage,data.result[1].specinfo.carsimage],
            carName:[[data.result[0].specinfo.serisename,data.result[0].specinfo.specname],
                [data.result[1].specinfo.serisename,data.result[1].specinfo.specname]],
            carPrice:[[data.result[0].dealerinfo.allprice,data.result[0].dealerinfo.price],
                [data.result[1].dealerinfo.allprice,data.result[1].dealerinfo.price]],
            carItems: carItems
        });
    }

    renderItems(carItems) {
        let sections = [];
        for(let i = 0; i < carItems[0].length; i++) {

            let items = [];

            // 配置差异
            let peizhi_1 = [];
            let peizhi_2 = [];

            for(let j = 0; j < carItems[0][i].items.length; j++) {
                if(carItems[0].length - 1 == i) {

                    if(carItems[0][i].items[j].value == 1) {
                        peizhi_1.push(
                            <View style={styles.chayiContent}>
                                <Text style={styles.chayiText}>{carItems[0][i].items[j].name}</Text>
                            </View>
                        );
                    } else if(carItems[1][i].items[j].value == 1) {
                        peizhi_2.push(
                            <View style={styles.chayiContent}>
                                <Text style={styles.chayiText}>{carItems[1][i].items[j].name}</Text>
                            </View>
                        );
                    }

                    items = <View style={[styles.itemContainer,{flexDirection:'row',alignItems:'flex-start'}]}>
                        <View style={styles.chayiContainer}>
                            {peizhi_1}
                        </View>
                        <View style={[styles.chayiContainer,{justifyContent:'flex-end',alignItems:'flex-start'}]}>
                            {peizhi_2}
                        </View>
                    </View>

                } else {
                    items.push(
                        <View style={styles.itemContainer}>
                            <View style={styles.itemTextContainer}>
                                <Text>{carItems[0][i].items[j].value}</Text>
                                <Text>{carItems[0][i].items[j].name}</Text>
                                <Text>{carItems[1][i].items[j].value}</Text>
                            </View>
                            <View style={styles.itemTiaoContainer}>
                                <View style={[styles.tiao,styles.tiao1]}/>
                                <View style={[styles.tiao,styles.tiao2]}/>
                            </View>
                        </View>
                    )
                }

            }

            sections.push(
                <View key={i}>
                    <Text style={styles.pkSubTitle}>{carItems[0][i].itemtype}</Text>
                    {items}
                </View>) ;
        }

        return sections;
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText={'PK赛车'}
                    leftFn={this.goBack.bind(this)}
                />
                <View style={styles.titleContainer}>
                    <Image source={{uri:this.state.carImg[0]}} style={styles.car}>
                        <View style={styles.carImg}>
                            <View style={styles.carName}>
                                <Text style={styles.carNameText1}>{this.state.carName[0][0]}</Text>
                                <Text style={styles.carNameText2}>{this.state.carName[0][1]}</Text>
                            </View>
                        </View>

                    </Image>
                    <Image source={{uri:this.state.carImg[1]}} style={styles.car}>
                        <View style={styles.carImg}>
                            <View style={styles.carName}>
                                <Text style={styles.carNameText1}>{this.state.carName[1][0]}</Text>
                                <Text style={styles.carNameText2}>{this.state.carName[1][1]}</Text>
                            </View>
                        </View>
                    </Image>
                    <View style={styles.pk}>
                        <Text style={styles.pkText}>PK</Text>
                    </View>
                </View>

                <ScrollView>

                    <Text style={styles.pkTitle}>PK价格</Text>
                    <View style={[styles.itemContainer,{flexDirection:'row'}]}>

                        <View style={styles.priceContainer}>

                            <Text style={[styles.priceText,{fontSize:12}]}>全款参考:</Text>
                            <Text style={[styles.priceText,{fontWeight:'bold',fontSize:18}]}>{this.state.carPrice[0][0]}</Text>

                            <View style={{flexDirection:'row'}}>
                                <Text style={styles.priceText}>裸车价参考:</Text>
                                <Text style={styles.priceText}>{this.state.carPrice[0][1]}</Text>
                            </View>

                        </View>

                        <View style={[styles.priceContainer,{marginLeft:cfn.picWidth(40),borderColor:'#a45'}]}>

                            <Text style={[styles.priceText,{fontSize:12,color:'#a45'}]}>全款参考:</Text>
                            <Text style={[styles.priceText,{fontWeight:'bold',fontSize:18,color:'#a45'}]}>{this.state.carPrice[1][0]}</Text>

                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.priceText,{color:'#a45'}]}>裸车价参考:</Text>
                                <Text style={[styles.priceText,{color:'#a45'}]}>{this.state.carPrice[1][1]}</Text>
                            </View>

                        </View>
                    </View>



                    <Text style={styles.pkTitle}>PK配置</Text>
                    {this.state.carItems}
                    {/*<Text style={styles.pkSubTitle}>动力性能</Text>*/}
                    {/*<View style={[styles.itemContainer,{flexDirection:'row'}]}>*/}
                        {/*<View style={styles.chayiContainer}>*/}

                        {/*</View>*/}

                        {/*<View style={styles.chayiContainer}>*/}
                            {/*<View style={styles.chayiContent}>*/}
                                {/*<Text style={styles.chayiText}>气囊气囊</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    {/*</View>*/}

                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
   container: {

       flex:1,
       alignItems:'center',
       width:cfn.deviceWidth()
   },
   content: {
       width:cfn.deviceWidth(),
       padding:cfn.picWidth(20)
   },
    text: {
       color:'#333',
        lineHeight:25,
        fontSize:14
    },
    titleContainer: {
        flexDirection:'row',
        width:cfn.deviceWidth(),
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#fff',
        height:cfn.picHeight(240)
    },
    car: {

    },
    carName: {
        position:'absolute',
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.5)',
        width:(cfn.deviceWidth()-cfn.picWidth(60))/2,
    },
    carNameText1: {
        color:'#fff',
        fontSize:14
    },
    carNameText2: {
        color:'#fff',
        fontSize:10
    },
    pk: {
      width:cfn.picWidth(100),
        height:cfn.picWidth(100),
        borderRadius:cfn.picWidth(50),
        backgroundColor:'#f00',
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        left:(cfn.deviceWidth()-cfn.picWidth(40))/2 - cfn.picWidth(30),
    },
    pkText: {
        fontSize:25,
        color:'#fff',
        fontWeight:'bold'
    },
    pkTitle: {
        fontSize: 16,
        color:'#000',
        alignSelf:'center',
        marginTop:cfn.picHeight(40)
    },
    pkSubTitle: {
        alignSelf:'center',
        color:'#333',
        fontSize:12,
        marginTop:cfn.picHeight(20)
    },

    priceContainer: {
        width:cfn.picHeight(200),
        height:cfn.picHeight(200),
        borderColor:'#45a',
        borderWidth:2,
        justifyContent:'center',
        alignItems:'center'
    },
    priceText: {
      fontSize:9,
        color:'#45a'
    },

    carImg: {
        width:(cfn.deviceWidth()-cfn.picWidth(60))/2,
        height:cfn.picHeight(200),
        // backgroundColor:'#c11'
    },
    itemContainer: {
        width:cfn.deviceWidth(),
        alignItems:'center',
        justifyContent:'center',
        marginTop:cfn.picHeight(20)
    },
    itemTextContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:cfn.deviceWidth()-cfn.picWidth(40),
        alignItems:'center',
        height:cfn.picHeight(50),
    },
    itemTiaoContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:cfn.deviceWidth()-cfn.picWidth(40),
    },
    tiao: {
        width:(cfn.deviceWidth()-cfn.picWidth(50))/2,
        height:cfn.picHeight(20),
    },
    tiao1: {
        backgroundColor:'#45a'
    },
    tiao2: {
        backgroundColor:'#a45'
    },
    chayiContainer: {
        width:(cfn.deviceWidth()-cfn.picWidth(40))/2,
        //backgroundColor:'#d78',
        minHeight:0,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    chayiContent: {
        height:cfn.picHeight(40),
        minWidth:10,
        alignItems:'center',justifyContent:'center',
        paddingLeft:3,paddingRight:3,
        margin:5,
        borderColor:'#a45',
        borderWidth:1
    },
    chayiText: {
        fontSize:10,
        color:'#a45'
    }
});