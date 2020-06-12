<template>
    <div>
        <van-nav-bar
                :fixed="true"
                :title="$t('banner.title')"
                left-arrow
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-row class='thisbody'>
            <van-swipe :autoplay="3000" indicator-color="#FFFFFF" class="showbanner">
                <van-swipe-item>
                    <van-image class="bannerImg" :src="img1"></van-image>
                </van-swipe-item>
                <van-swipe-item>
                    <van-image class="bannerImg" :src="img1"></van-image>
                </van-swipe-item>
            </van-swipe>
            <van-row class="bannerCard">
                <van-row class="thisTextList">
                    <van-row>
                        <van-col span="1" class="firstTd">①</van-col>
                        <van-col span="23" class="twoTd">
                            {{$t('banner.tip1')}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="1" class="firstTd">②</van-col>
                        <van-col span="23" class="twoTd">
                            {{$t('banner.tip2')}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="1" class="firstTd">③</van-col>
                        <van-col span="23" class="twoTd">
                            {{$t('banner.tip3')}}
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col span="1" class="firstTd">④</van-col>
                        <van-col span="23" class="twoTd">
                            {{$t('banner.tip4')}}
                        </van-col>
                    </van-row>
                </van-row>
            </van-row>
        </van-row>
    </div>
</template>

<script>
    import img1 from '@/assets/imgs/banner.png'
    export default {
        name: "banner",
        data(){
            return{
                img1:img1,
                invateCode:null,
                inputValue:null,
                inputTitle:null,
                imgData:[],
                stateBtn:false,
            }
        },
        mounted(){

        },
        methods:{
            onClickLeft(){
                goBack.postMessage("goBack");
                // this.$bridge.goBack();
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/main";
    .thisbody{
        background: #EEEEEE;
        padding: 0;
        margin-top:45px;
    }
    .showbanner{
        width: 96%;
        margin: 0 auto;
        padding: 0;
    }
    .bannerImg{
        width: 100%;
        margin-top: 8px;
    }
    .bannerCard{
        margin-left: 0;
        margin-top: 0;
        width: 100%;
        background-color: #ffffff;
        color: #999999;
        font-size:12px ;
        line-height: 16px;
    }
    .thisTextList{
        width: 98%;
        margin-left: 1%;
    }
    .firstTd{
        padding-top: 8px;
        padding-bottom: 8px;
    }
    .twoTd{
        padding-top: 8px;
        padding-bottom: 8px;
        border-bottom: 1px #F4F4F4 solid;
    }
    .van-nav-bar{
        background-color:#FF0C00;
    }
</style>