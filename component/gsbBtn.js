import React, {PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import config from '../config/config';
import cfn from '../tools/commonFun';
export default class gsbBtn extends PureComponent {

    constructor(props) {
        super(props);

        this.state={
            data:[],
            isError:false,
            btnColor:[config.baseColor,'#fff','#fff']
        };

        this.pressBtn = this._pressBtn;
    }
    static defaultProps = {

    };

    _pressBtn(index) {
        let temp = ['#fff', '#fff', '#fff'];
        temp[index] = config.baseColor;
        this.setState({
            btnColor: temp,
        },()=>{
            let x = cfn.deviceWidth()*index;
            this.props.scrollTo(x,true);
        })
    }

    render() {
        return (
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={[styles.btn,{borderBottomColor:this.state.btnColor[0]}]}
                    onPress={()=>this._pressBtn(0)}
                    activeOpacity={0.8}>
                    <Text style={{color:this.state.btnColor[0] == config.baseColor ? config.baseColor : '#444'}}>百位</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn,{borderBottomColor:this.state.btnColor[1]}]}
                    onPress={()=>this._pressBtn(1)}
                    activeOpacity={0.8}>
                    <Text style={{color:this.state.btnColor[1] == config.baseColor ? config.baseColor : '#444'}}>十位</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn,{borderBottomColor:this.state.btnColor[2]}]}
                    onPress={()=>this._pressBtn(2)}
                    activeOpacity={0.8}>
                    <Text style={{color:this.state.btnColor[2] == config.baseColor ? config.baseColor : '#444'}}>个位</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        width:cfn.deviceWidth(),
        height:cfn.picHeight(80),
        flexDirection:'row',
        alignItems:'center',
    },
    btn: {
        width:cfn.deviceWidth()/3,
        height:cfn.picHeight(80),
        borderBottomWidth:3,
        borderBottomColor:'#fff',
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
});