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

export default class Banner extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.nextPage = 2;
        this.isAutoScroll = true;
    };

    static defaultProps = {
        // 页面高度
        pageHeight: commonFn.picHeight(300),
        // 页面宽度
        pageWidth: commonFn.deviceWidth()-commonFn.picWidth(120),
        // 两个页面之间的宽度
        pageGap: commonFn.picWidth(20),
        bannerData: [1,2,3]
        //bannerList:[{imgsrc:require('../imgs/banner/banner_default.png'),title:'数据正在加载...'}],
    };

    componentDidMount() {
        this.startScroll();

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

                arr.push(<View
                        style={{width:pageWidth,height:pageHeight,backgroundColor:'#0a0',...marginStyle}}>
                        <Text>{bannerData[i]}</Text>
                    </View>);
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
        this.nextPage = Math.round(offsetX / (pageWidth + pageGap));
        this.nextPagePixel = offsetX / commonFn.deviceWidth();
        offsetX > this.oldOffsetX ? console.log('左') : console.log('右');
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
        this.isAutoScroll = false;
        if (this.scrollTimer) {
            clearInterval(this.scrollTimer);
        }
    }


    startScroll() {
        const {pageWidth,pageGap} = this.props;
        //console.log(this.nextPage);
        this.scrollView.scrollTo({x: this.nextPage * (pageWidth+pageGap)}, true);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={false}
                    onScroll={this.onScroll.bind(this)}
                    onTouchStart={()=>this.onTouchStart()}
                    onScrollEndDrag={()=>this.startScroll()}
                    ref={(ref)=>this.scrollView = ref}
                >
                    {/*<View style={[styles.pageStyle,{backgroundColor:'#a00',marginLeft:commonFn.picWidth(50)}]}>*/}
                        {/*<Text>hahahaha</Text>*/}
                    {/*</View>*/}
                    {/*<View style={[styles.pageStyle,{backgroundColor:'#0a0'}]}>*/}
                        {/*<Text>hahahaha</Text>*/}
                    {/*</View>*/}
                    {/*<View style={[styles.pageStyle,{backgroundColor:'#00a',marginRight:commonFn.picWidth(50)}]}>*/}
                        {/*<Text>hahahaha</Text>*/}
                    {/*</View>*/}
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
        height: commonFn.picHeight(365),
        borderBottomColor:'rgba(255,255,255,0.7)',
        borderBottomWidth:1,
        // marginBottom:-1
    },
    imageStyle: {
        width: commonFn.deviceWidth(),
        height: commonFn.picWidth(365),
    },
    pageStyle: {
        width:commonFn.deviceWidth()-commonFn.picWidth(120),
        height: commonFn.picWidth(365),
        marginLeft:commonFn.picWidth(10),
        marginRight:commonFn.picWidth(10)
    }
});