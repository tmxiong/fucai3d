/*****
 * 首页轮播图
 * ****/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native';

import commonFn from '../tools/commonFun';
import Indicator from './Indicator';

export default class Banner extends PureComponent {
    componentDidMount() {
        this.startScroll();
    }

    componentWillUnmount() {
        clearInterval(this.scrollTimer);
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.nextPage = 0;
        this.isAutoScroll = true;
    };

    static defaultProps = {
        bannerData:[1,2,3],
    };

    renderBanner() {
        const {bannerData} = this.props;
        if (bannerData) {
            let arr = [];
            for (let i = 0; i < bannerData.length; i++) {
                arr.push(
                    <View key={i} style={styles.container}>
                        <View style={styles.content}>
                            {bannerData[i]}
                        </View>

                </View>);
            }
            return arr;
        }

    }

    goToPage(route,params) {
        if(params.docid) {
            this.props.navigation.navigate(route,params);
        }
    }

    onScroll(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        this.nextPage = Math.round(offsetX / (commonFn.deviceWidth()-commonFn.picWidth(40)));
        this.nextPagePixel = offsetX / (commonFn.deviceWidth()-commonFn.picWidth(40));

        //指示器滚动效果--自动滚动
        // if (this.isAutoScroll) {
        //     this.ref.indecator.setNativeProps(
        //         {style: {right: this.ref.rightX - this.nextPage * commonFn.picWidth(24)}}
        //     )
        // } else {
        //     //指示器滚动效果--手动滑动
        //     this.ref.indecator.setNativeProps(
        //         {style: {right: this.ref.rightX - this.nextPagePixel * commonFn.picWidth(24)}}
        //     )
        // }
    }

    onTouchStart() {
        this.isAutoScroll = false;
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
    }

    startScroll() {
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
        this.isAutoScroll = true;
        this.scrollTimer = setInterval(()=> {
            this.scrollView.scrollTo({x: this.nextPage * commonFn.deviceWidth()-commonFn.picWidth(40)}, true);
            this.nextPage++;
            if (this.nextPage >= this.props.bannerData.length) {
                this.nextPage = 0;
            }
        }, 3000);
    }

    render() {
        return (

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                onScroll={this.onScroll.bind(this)}
                onTouchStart={()=>this.onTouchStart()}
                onScrollEndDrag={()=>this.startScroll()}
                onTouchEnd={()=>this.startScroll()}
                ref={(ref)=>this.scrollView = ref}
            >
                {this.renderBanner()}
            </ScrollView>

        );
    }
}



module.exports = Banner;

const styles = StyleSheet.create({
    container: {
        width: commonFn.deviceWidth()-commonFn.picWidth(40),
        height: commonFn.picHeight(140),
        alignItems:'center',
        justifyContent:'center'
    },
    content: {
        width:commonFn.deviceWidth()-commonFn.picWidth(80),
        height:commonFn.picHeight(120),
        borderRadius:commonFn.picHeight(60),
        backgroundColor:'#f89'
    }
});