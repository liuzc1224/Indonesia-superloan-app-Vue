<template>
    <div  class="main">
        <van-nav-bar
                :fixed="true"
                :title="$t('invite.title')"
                left-arrow
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-row>
            <van-row class="showimg">
                <van-image class="img" :src="img1" />
            </van-row>
            <van-row class="text">
                <p>
                    {{$t('invite.tip1')}}
                </p>
                <p>
                    {{$t('invite.tip2')}}
                </p>
            </van-row>

            <van-button plain size="large" class="button" @click="copy()">{{$t('invite.sub')}}</van-button>
            
        </van-row>
    </div>
</template>

<script>
    import img1 from '@/assets/imgs/pic.png'
    export default {
        name: "invite",
        data(){
            return{
                img1:img1,
                invateCode:null,
                inputValue:null,
                imgData:[]
            }
        },
        mounted(){

        },
        methods:{
            onClickLeft(){
                goBack.postMessage("goBack");
                // this.$bridge.goBack();
            },
            copy(){
                this.$bridge['inputClipBoard']();
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/main";
    .main{
        margin: 0;
        display: flex;flex-direction: column;flex: 1;
        height: 100%;
        background-color:#FFFFFF;
    }
    .showimg{
        width: 100%;
        text-align:center;
    }
    .img{
        height: 303px;
        width: 353px;
        margin-top: 18px;
    }
    .text{
        width: 100%;
        height: 38px;
        text-align: center;
        font-size: 13px;
        font-weight:bold;
        line-height: 6px;
        color: #666666;
        margin-top: 80px;
        margin-bottom: 80px;
    }
    .button {
        width: 94%;
        margin-top: 14px;
        margin-left: 3%;
        background-color: #FF0C00;
        color: #FFFFFF;
        font-size: 18px;
        line-height: 50px;
        border-radius: 5px;
        margin-bottom: 18px;
    }
    .button:hover {
        background-color: #FF0C00;
    }
    .van-nav-bar{
        background-color:#FF0C00;
    }
</style>