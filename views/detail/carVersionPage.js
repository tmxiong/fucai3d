/**
 * Created by xiongtm on 2017/11/12.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import cfn from '../../tools/commonFun'
import fetchp from '../../tools/fetch-polyfill';
import urls from '../../config/urls';
export default class carVersionPage extends Component {
    static defaultProps={

    };

    constructor(props) {
        super(props);
        this.id = props.navigation.state.params.id;
        this.state={
            data:null,
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetchp(urls.getCarVersion(this.id),{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=>this.setData(data))
    }
    setData(data) {
        this.setState({data:data})
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <View style={styles.img}/>
                    <View>
                        <Text>法拉利</Text>
                        <Text>1.5元</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
   container: {

   } ,
    itemContainer: {
        flexDirection:'row'
    },
    img: {
       width:cfn.picWidth(200),
        height:cfn.picHeight(120),
        backgroundColor:'#f07',
    },
});