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
    WebView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import cfn from '../tools/commonFun'
import NavBar from '../component/NavBar';

import config from '../config/config';
import lotterys from '../config/lotterys';
export default class articleDetailPage extends Component {
    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        this.state={
            data:'',
            isError:false,
            isLoading: false,
        }
    }
    static defaultProps = {

    };

    componentDidMount() {
        //this.getData();
    }

    goBack() {
        this.props.navigation.goBack();
    }

    goToDetail(route, params) {
        this.props.navigation.navigate(route, params)
    }

    _keyExtractor=(item, index) => item.id;

    renderItem({item, index}) {
        return(
            <TouchableOpacity
                style={styles.item_container}
                activeOpacity={0.8}
                onPress={()=>this.goToDetail('jieshaoDetail',{title:item.name,jieshao:item.jieshao})}>
                <Image source={item.icon} style={styles.icon}/>
                <Text style={styles.cz_name}>{item.name}</Text>
                <Image
                    style={styles.icon_r}
                    source={require('../imgs/more_r_icon.png')}/>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <NavBar
                    middleText='玩法介绍'
                    leftFn={()=>this.goBack()}
                />

                <FlatList
                    data={lotterys}
                    style={styles.flatListStyle}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={this._keyExtractor}
                />

            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'flex-start',
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        backgroundColor:'#fff',
        alignItems:'center'
    },
    flatListStyle: {
        width: cfn.deviceWidth(),
        backgroundColor:'#fff',
        zIndex:9,
    },
    item_container: {
        width:cfn.deviceWidth()-cfn.picWidth(40) ,
        flexDirection:'row',
        height:cfn.picHeight(100),
        alignItems:'center',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        alignSelf:'center'
    },
    icon: {
        width:cfn.picWidth(50),
        height:cfn.picWidth(50),
        resizeMode:'contain',
        marginLeft:cfn.picWidth(20)
    },
    icon_r: {
        width: cfn.picWidth(50),
        height: cfn.picHeight(50),
        resizeMode: 'contain',
        position: 'absolute',
        right: cfn.picWidth(20)
    },
    cz_name: {
        fontSize:15,
        color:'#333',
        marginLeft:cfn.picWidth(20)
    },
});