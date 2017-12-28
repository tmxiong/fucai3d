/**
 * Created by xiongtm on 2017/9/7.
 */

import React, {PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import cfn from '../tools/commonFun'
export default class loadingModal extends PureComponent {
    static navigationOptions = {header: null};

    static defaultProps={
        reload:()=>{},
        isLoading: true,
        isError: false
    };

    constructor(props) {
        super(props);
        this.loading = '正在拼命加载...';
        this.error = '加载失败，点击重试';
        this.state = {
            isLoading: false,
            isError: false
        }
    }

    componentWillReceiveProps(props) {
        //if(this.props!=props){
            this.setState({
                isLoading:props.isLoading,
                isError:props.isError
            });
        //}
    }

    reload() {
        if(this.state.isError) {
            this.props.reload();
        }
    }

    render() {
        let text = this.loading;
        if(!this.state.isLoading && !this.state.isError) {
            return null;
        } else if(this.state.isError) {
            text = this.error;
        }

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={()=>this.reload()}
                style={{
                    position: 'absolute',
                    alignItems: 'center',
                    alignSelf:'center',
                    top: cfn.deviceHeight() / 2,
                    justifyContent: 'center',
                    height:cfn.picHeight(80),
                    zIndex:2
                }}>
                <Text style={{color:'#888',fontSize:14,backgroundColor:'transparent'}}>{text}</Text>
            </TouchableOpacity>)
    }
}