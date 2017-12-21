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
    Text,
} from 'react-native';

import commonFn from '../tools/commonFun';
import CardView from 'react-native-cardview'
export default class Banner extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.nextPage = 1;
        this.isAutoScroll = true;
        this.oldOffsetX = 0;
        this._startScroll = this.startScroll.bind(this);
    };

    static defaultProps = {
        // 页面高度
        pageHeight: commonFn.picHeight(300),
        // 页面宽度
        pageWidth: commonFn.deviceWidth()-commonFn.picWidth(80),
        // 两个页面之间的宽度
        pageGap: commonFn.picWidth(10),
        bannerData: [null,null,null]
        //bannerList:[{imgsrc:require('../imgs/banner/banner_default.png'),title:'数据正在加载...'}],
    };

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    renderBanner() {
        const {bannerData,pageWidth,pageHeight,pageGap} = this.props;
        // 第一页和最后一页比较特殊
        let margin = (commonFn.deviceWidth() - pageWidth) / 2;
            let arr = [];
            for (let i = 0; i < bannerData.length; i++) {

                let marginStyle = {
                    marginLeft: pageGap/2,
                    marginRight: pageGap/2,
                };

                if(i == 0) {
                    marginStyle.marginLeft = margin;
                } else if (i == bannerData.length - 1) {
                    marginStyle.marginRight = margin;
                }

                arr.push(
                    <CardView
                        key={i}
                        style={{width:pageWidth,height:pageHeight,backgroundColor:'#fff',...marginStyle}}
                        cardElevation={4}
                        cardMaxElevation={0}
                        cornerRadius={6}>

                        {bannerData[i]}

                    </CardView>);
            }
            return arr;


    }

    goToPage(route,params) {
        if(params.docid) {
            this.props.navigation.navigate(route,params);
        }
    }

    onScroll(event) {
        let offsetX = event.nativeEvent.contentOffset.x;
        const {pageWidth,pageGap} = this.props;
        //this.nextPage = Math.round(offsetX / (pageWidth + pageGap)*2);
        this.nextPagePixel = offsetX / commonFn.deviceWidth();
        offsetX > this.oldOffsetX ?
            this.nextPage = Math.round(offsetX / (pageWidth + pageGap)*2) :
            this.nextPage = Math.round(offsetX / (pageWidth + pageGap)/2);
        this.oldOffsetX = offsetX;
        //console.log(this.nextPage);
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

    onTouchStart(e) {

    }


    startScroll(showAnim) {
        const {pageWidth,pageGap} = this.props;
        //console.log(this.nextPage);
        this.scrollView.scrollTo({x: this.nextPage * (pageWidth+pageGap)}, showAnim);
    }

    render() {
        return (
            <View style={[styles.container,this.props.style]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={false}
                    onScroll={this.onScroll.bind(this)}
                    onTouchStart={()=>this.onTouchStart()}
                    onScrollEndDrag={()=>this.startScroll(true)}
                    ref={(ref)=>this.scrollView = ref}
                >
                    {this.renderBanner()}
                </ScrollView>
            </View>
        );
    }
}



module.exports = Banner;

const styles = StyleSheet.create({
    container: {
        width: commonFn.deviceWidth(),
        alignItems:'center',
        justifyContent:'center'
        //height: commonFn.picHeight(365),
        // marginBottom:-1
    },
});