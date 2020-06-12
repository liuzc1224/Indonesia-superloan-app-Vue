<template>
    <div>
        <van-nav-bar
                :fixed="true"
                :title="$t('msgDetails.title')"
                left-arrow
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-row class="main">
            <van-row class="title">{{msgDetail.title}}</van-row>
            <van-row class="time">{{msgDetail['createTime'] ? toStr(msgDetail['createTime']) : "" }}</van-row>
            <van-row class="text">{{msgDetail.text}}</van-row>
        </van-row>
    </div>
</template>

<script>
    import {formatDate} from '../libs/date'
    export default {
        name: "msg-details",
        data(){
            return{
                msgDetail:{}
            }
        },
        mounted(){
            // console.log(this.$route.query)
            this.msgDetail=this.$route.query.all;
        },
        methods:{
            toStr(data) {
                return formatDate(new Date(data), 'dd-MM-yyyy hh:mm:ss');
            },
            onClickLeft(){
                goBack.postMessage("goBack");
                // this.$bridge.goBack();
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/main";
    .main{
    }
    .title{
        margin-top:10px;
        margin-right:15px;
        margin-left:15px;
        font-size:17px !important;
        color:#434242;
    }
    .time{
        margin-top:10px;
        margin-right:15px;
        margin-left:15px;
        font-size:13px;
        color:#999999;
    }
    .text{
        margin-top:10px;
        margin-right:15px;
        margin-left:15px;
        font-size:15px;
        color:#666666;
    }
    .van-nav-bar{
        background-color:#FF0C00;
    }
</style>