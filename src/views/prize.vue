<template>
    <div>
        <van-nav-bar
                :fixed="true"
                :title="$t('lottery.prize')"
                left-arrow
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh($event)" class="main" :pulling-text="$t('lottery.pulling')" :loosing-text="$t('lottery.loosing')" :loading-text="$t('lottery.loading')" :head-height=100>
           <van-list v-model="loading" :finished="finished"
                     :finished-text="prizeList.length>=10 ? $t('product.finished') : ''"
                     :finished-text="$t('lottery.nullText')"
                     :error-text="$t('lottery.errText')" @load="onScroll($event)" :loading-text="$t('lottery.loading')">
                <van-row class="spinner_tip" v-if="isLoading"></van-row>
                <van-row class="c-null-value" v-if="prizeList && prizeList.length == 0">
                    <van-image :src="img1" class="ifNullImg" />
                    <p class="ifNullText">{{$t("lottery.prizeNo")}}</p>
                </van-row>
                <ul class="c-list-unstyled" id="msg">
                    <li class="orderList_item msgCenter_item" v-for="(item,i) of prizeList" :key="i">
                    <table class="tableMore">
                        <tr class="trMore">
                            <td class="td1">
                                <div class="divIntd1">
                                    <p v-if="item['prizeName']" class="p1">{{ item['prizeName'] }}</p>
                                    <p v-if="item['createTime']" class="p2">{{ item['createTime'] }}</p>
                                </div>
                            </td>
                            <td class="td2">
                                <p class="pIntd2">
                                    + {{item['prizeNum']}}
                                </p>
                            </td>
                        </tr>
                    </table>
                    </li>
                </ul>
           </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import img1 from '@/assets/imgs/helppic.png'
    import api from '@/api/index'
    export default {
        name: "prize",
        data(){
            return{
                img1:img1,
                isLoading:false,
                searchModel:{currentPage:1,pageSize:20,VirtualInfo:1,columns:'create_time',orderBy:'true'},
                prizeList:[],
                error: false,
                loading: false,
                finished: false,
            }
        },
        mounted(){
            this.getData();
        },
        methods:{
            onClickLeft(){
                goBack.postMessage("goBack");
                // this.$bridge.goBack();
            },
            getData(){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data=this.searchModel;
                data['userId']=usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"];
                // data['userId']="1";
                api.prizeQueryPrizeInfoByUserId(data).then( res => {
                    this.isLoading = false;
                    if(res.data.success === false){
                        this.$notify(res.message);
                    }else{
                        if(res.data.success === true && res.data.data != null){
                            this.searchModel.currentPage++;
                            if(!this.prizeList){
                                this.prizeList = [];
                            }
                            this.prizeList = this.prizeList.concat(res.data.data);
                        }
                    }
                })
            },
            getList($event){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data=this.searchModel;
                data['userId']=usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"];
                // data['userId']="1";
                api.prizeQueryPrizeInfoByUserId(data).then( res => {
                    this.isLoading = false;
                    // setTimeout(() => {
                    //     $event.complete();
                    // }, 100);
                    if(res.data.success === false){
                        this.$notify(res.message);
                    }else{
                        if(res.data.success === true && res.data.data != null){
                            this.searchModel.currentPage++;
                            if((res.data.data.length)<this.searchModel.pageSize){
                                this.finished = true;
                            }
                            if(!this.prizeList){
                                this.prizeList = [];
                            }
                            this.prizeList = this.prizeList.concat(res.data.data);
                        }
                    }
                })
            },
            onScroll($event){
                // body高度
                // console.log($event);
                this.getList($event);
            },
            onRefresh($event){
                // console.log($event);
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data={
                    userId:usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"],
                    // userId :"1",
                    currentPage:  1,
                    pageSize:  this.searchModel.pageSize,
                    virtualInfo: this.searchModel.virtualInfo,
                    columns : 'create_time' ,
                    orderBy : 'true'
                };
                api.prizeQueryPrizeInfoByUserId(data).then( res => {
                    // console.log(res.data.success)
                    this.isLoading = false;
                    // setTimeout(() => {
                    //     $event.complete();
                    // }, 100);
                    if(res.data.success === false){
                        this.$notify(res.message);
                    }else{
                        if(res.data.success === true && res.data.data != null){
                            this.searchModel.currentPage++;
                            if(!this.prizeList){
                                this.prizeList = [];
                            }
                            this.prizeList = this.prizeList.concat(res.data.data);
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/main";
    .spinner_tip {
        width: 31px;
        height: 31px;
        background-color: #FF0C00;
        margin: 100px auto;
        -webkit-animation: rotateplane 1.2s infinite ease-in-out;
        animation: rotateplane 1.2s infinite ease-in-out;
    }
    .main {
        /*padding-top:95px;*/
        /*padding-bottom: 1000px;*/
        background: #EEEEEE;
    }
    .msgCenter_item {
        background-color: #ffffff;
        margin-top: 6px;
        margin-right:10px;
        margin-left:10px;
        /*padding-top: 20px;*/
        /*padding-bottom: 20px;*/
        /*border-radius:5px;*/
    }
    .c-null-value{
        text-align: center;
        font-size : 16px ;
        margin-top: 20px;
        color: #ccc;
        text-align: center;
        padding-top: 49px;
        border-radius:5px;
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
    .tableMore{
        /*padding-top: 11px;*/
        position: relative;
        width:100%;
        .trMore{
            height: 38px;
            .td1{
                width: 60%;
                .divIntd1{
                    /*position: absolute;*/
                    padding-left: 8px;
                    .p1{
                        margin:0;
                        font-size: 16px;
                        color: #434242;
                    }
                    .p2{
                        margin:0;
                        font-size: 12px;
                        color:#999999;
                        margin-top: 11px;
                    }
                }
            }
            .td2{
                text-align: right;
                .pIntd2{
                    font-size: 18px;
                    color: #434242;
                    padding-top: 6px;
                    /*position: absolute;*/
                    /*right: 11px;*/
                    text-align: right;
                    padding-right: 8px;
                }
            }
        }
    }
    .van-nav-bar{
        background-color:#FF0C00;
    }
</style>