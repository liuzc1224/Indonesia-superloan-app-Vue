<template>
    <div>
        <van-nav-bar
                :fixed="true"
                :title="$t('msgCenter.title')"
                left-arrow
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-row  class="main">
            <van-overlay :show="msgLoading"></van-overlay>
            <van-loading v-if="msgLoading" type="spinner" class="loading"  vertical></van-loading>
            <van-pull-refresh
                    v-if="msgList.length>0 && !msgLoading"
                    v-model="isLoading"
                    @refresh="onRefresh"
                    :pulling-text="$t('msgCenter.pulling')"
                    :loosing-text="$t('msgCenter.loosing')"
                    :loading-text="$t('msgCenter.loading')"
                    :head-height=100
            >
               <van-list
                       v-model="loading"
                       :finished="finished"
                       :finished-text="msgList.length>=10 ? $t('msgCenter.nullText') : ''"
                       :error-text="$t('msgCenter.errText')"
                       @load="onScroll"
                       :loading-text="$t('msgCenter.loading')">
                    <ul class="c-list-unstyled" id="msg">
                        <li class="orderList_item msgCenter_item" v-for="(item,i) of msgList" :key="i">
                            <div class="msgCenter_content_1"><span class="text2">{{item['createTime'] ? toStr(item['createTime']) : "" }}</span></div>
                            <div class="msgCenter_title" v-if="item['title']" >{{ item['title'] }}</div>
                            <div class="msgCenter_content_2">{{item['text']}}</div>
                            <div class="showDetails" @click="msgDetail(item)">{{$t("msgCenter.showDetails")}}</div>
                        </li>
                    </ul>
               </van-list>
            </van-pull-refresh>
            <van-row class="c-null-value" v-if="!msgLoading && msgList.length === 0">
                <van-image :src="img1" class="ifNullImg"></van-image>
                <p class="ifNullText">{{$t("msgCenter.none")}}</p>
            </van-row>
        </van-row>
    </div>
</template>

<script>
    import {formatDate} from '../libs/date'
    import img1 from '@/assets/imgs/helppic.png'
    import api from '@/api/index'
    export default {
        name: "msgCenter",
        data(){
            return{
                img1:img1,
                isLoading:false,
                msgLoading:true,
                searchModel:{nextId:null,limit:10},
                msgList:[],
                error: false,
                loading: false,
                finished: false,
            }
        },
        mounted(){
            window.callBackFlutter=(data)=>{
                this.msgLoading=false;
                window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                this.msgUpdate();
                this.getList();
            };
            this.getInfo();
        },
        // filters: {
        //     formatDate: function (value) {
        //         let date = new Date(value);
        //         let y = date.getFullYear();
        //         let MM = date.getMonth() + 1;
        //         MM = MM < 10 ? ('0' + MM) : MM;
        //         let d = date.getDate();
        //         d = d < 10 ? ('0' + d) : d;
        //         let h = date.getHours();
        //         h = h < 10 ? ('0' + h) : h;
        //         let m = date.getMinutes();
        //         m = m < 10 ? ('0' + m) : m;
        //         let s = date.getSeconds();
        //         s = s < 10 ? ('0' + s) : s;
        //         return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        //     }
        // },
        methods:{
            onClickLeft(){
                // this.$bridge.goBack();
                goBack.postMessage("goBack");
            },
            toStr(data) {
                return formatDate(new Date(data), 'dd-MM-yyyy hh:mm:ss');
            },
            msgUpdate(){
                api.msgCenterUpdate().then(res => {
                    if(res.data.success === false){
                        this.$notify(res.message);
                    }else{
                        if(res.data.success === true && res.data.data != null){
                            console.log(res)
                        }
                    }
                })
            },
            getInfo(){
                getUserLoginInfo.postMessage("callBackFlutter");
                // this.take().then(data => {
                //     if(data){
                //         window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                    // }
                // });
            },
            take(){
                return new Promise((resolve,reject)=>{
                    this.$bridge["getLoginInfo"](null, res => {
                        resolve(JSON.parse(res));
                    });
                });
            },
            getList(){
                api.msgCenterGetMsgList(this.searchModel).then(res => {
                    this.isLoading = false;
                    this.msgLoading = false;
                    if(res.data.success === false){
                        this.$notify(res.data.message);
                    }else{
                        if(res.data.success === true && res.data.data != null){
                            // console.log(res);
                            this.searchModel.nextId = res.data.data["nextId"];
                            if(!this.msgList){
                                this.msgList = [];
                            }
                            this.msgList = this.msgList.concat(
                                res.data.data["appPushHistoryOutputBOList"]);
                        }
                    }
                })
            },
            onScroll($event){
                api.msgCenterGetMsgList(this.searchModel).then(res => {
                    this.isLoading = false;
                    console.log(res)
                    if(res.data.success === false){
                        this.$notify(res.message);
                    }else{
                        // this.finished = true;
                        console.log(res.data.data)
                        if(res.data.success === true && res.data.data !== null){
                            this.searchModel.nextId = res.data.data["nextId"];
                            console.log(this.searchModel.nextId)
                            if(this.searchModel.nextId<0){
                                this.finished = true;
                            }
                            if(!this.msgList){
                                this.msgList = [];
                            }
                            this.msgList = this.msgList.concat(
                                res.data.data["appPushHistoryOutputBOList"]);
                        }
                    }
                })
            },
            onRefresh($event){
                // console.log($event);
                let data={
                    limit:  this.searchModel.limit,
                };
                api.msgCenterGetMsgList(data).then(res => {
                    this.isLoading = false;
                    if(res.data.success === false){
                        this.$notify(res.message);
                    }else{
                        //假数据
                        // this.msgList=this.msgList.concat([{id:23,businessTypeId:2,title:"这里是主题啊亲",text:"这里是推送内容，同时测试多行文本如何进行展示的基本配置，如不解，请忽视此推送",status:false,sendTime:1576824329},{id:23,businessTypeId:2,title:"第二条列表测试",text:"列表测试的基本复列，为各位测试账号进行最新的功能测试，所有用户可见，如果不了解请忽略此信息66666666666666 66666666666666666 66666666666666666666666 666666666666666666666",status:false,sendTime:1576824420}])
                        if(res.data.success === true && res.data.data != null){
                            this.searchModel.nextId = res.data.data["nextId"];
                            if(!this.msgList){
                                this.msgList = [];
                            }
                            this.msgList = res.data.data["appPushHistoryOutputBOList"]
                        }
                    }
                })
            },
            msgDetail(item){
                this.$router.push({
                    name:"msg-details",
                    query:{
                        all:item
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/main";
    .main {
        /*padding-top:95px;*/
        /*padding-bottom: 1000px;*/
        background: #EEEEEE;
    }
    .msgCenter_title {
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        margin-top: 16px;
        margin-right:10px;
        margin-left:10px;
    }
    .msgCenter_content_1 {
        font-size: 14px;
        color: rgba(190, 190, 190, 1);
        text-align: center;
        color: #ffffff;
    }
    .msgCenter_content_2 {
        font-size: 14px;
        color: rgba(190, 190, 190, 1);
        /*margin-bottom: 16px;*/
        margin-top: 16px;
        margin-right:10px;
        margin-left:10px;
        overflow: hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .msgCenter_item {
        /*padding: 600px !important;*/
        background-color: #ffffff;
        margin-top: 10px;
        margin-right:10px;
        margin-left:10px;
        padding-top: 20px;
        padding-bottom: 20px;
        border-radius:5px;
    }
    .c-null-value{
        text-align: center;
        font-size : 16px ;
        margin-top: 20px;
        color: #ccc;
        text-align: center;
        padding-top: 49px;
        /*padding-bottom: 1000px;*/
    }
    .ifNullImg{
        margin: 0 auto;
        height:139px;
        width:197px;
    }
    .ifNullText{
        padding-left: 18px;
        padding-right: 18px;
        margin-top: 37px;
        color: #999999;
        font-size: 15px;
        line-height: 18px;
    }
    .c-list-unstyled{
        list-style: none;
        padding: 0;
        margin:  0;
        padding-bottom: 500px;
    }
    .text2{
        padding-left: 11px;
        padding-right: 11px;
        padding-top:4px;
        padding-bottom:4px;
        border-radius: 10px;
        background-color: #CCCCCC;
    }
    .showDetails{
        padding-left: 11px;
        padding-right: 11px;
        padding-top:11px;
        border-top: 2px solid #F4F4F4;
        transform:translateY(10px);
    }
    .van-nav-bar{
        background-color:#FF0C00;
    }
</style>