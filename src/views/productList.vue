<template>
    <div style="background-color: #F0F3F2;">
        <van-overlay :show="loadingState"></van-overlay>
        <van-loading v-if="loadingState" type="spinner" class="loading"  vertical></van-loading>
        <van-row class="product-list-banner" v-if="images.length>0 && !loading">
            <van-swipe :autoplay="3000" :height="175">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <van-image :src="image['bannerUrl']" width="100%" height="100%" @click="jump(image,index)" ></van-image>
                </van-swipe-item>
            </van-swipe>
        </van-row>

        <van-row style="padding-top: 10px" v-if="!loadingState">
            <van-pull-refresh
                    v-model="isLoading"
                    @refresh="onRefresh"
                    :pulling-text="$t('product.pulling')"
                    :loosing-text="$t('product.loosing')"
                    :loading-text="$t('product.loading')"
            >
                <van-list
                        class="item"
                        v-model="loading"
                        :finished="finished"
                        :finished-text="productData.length>=10 ? $t('product.finished') : ''"
                        :loading-text="$t('product.loading')"
                        @load="onLoad"
                >
                    <ul class="c-list-unStyled" v-if="productData">
                <li class="product-list-item"  v-for="(item, i) in productData" :key="`product-list-${i}`" @click="info(item,i)">
                    <div class="list-down">
                        <van-icon class="iconfont" class-prefix="my-icon" name="xiazai" style="color: #999999"></van-icon>
                        <span>{{item['downTimes'] ? item['downTimes'] : 0}}</span>
                    </div>
                    <div class="list-item-main">
                        <van-image :src="item['bannerUrl']"></van-image>
                        <div class="name">
                            {{item['productName']}}
                        </div>
                        <van-image v-if="item['isNew']" class="new" :src="newImg"></van-image>
                        <van-image v-if="item['isKsp']" :class="item['isNew'] ? 'ksp' :'new'" :src="kspImg"></van-image>.
                        <van-image v-if="item['isStaging']" :class="item['isNew'] || item['isKsp'] ? 'isStaging' :'new'" :src="stagingImg"></van-image>
                        <div class="list-item-button" @click="downLoad($event,item,i)">{{$t('product.downLoad')[item['forwardUrlType']]}}</div>
                    </div>
                    <table :class="item['isNew']===true || item['isKsp']===true || item['isStaging']===true ? 'info' : 'noInfo'">
                        <tr>
                            <td class="first">
                                <div class="one">{{item['loanMoney']}}</div>
                                <div class="two">{{$t('product.info.max')}}({{$t("product.loanPeriodUnit")[item['loanPeriodUnit']]}})</div>
                            </td>
                            <td class="last">
                                <div class="last-one">{{item['loanDaysMin']+" / " +item['loanDaysMax']}} {{$t('product.unit')[item['loanPeriodUnit']]}}</div>
                                <div class="last-two">{{$t('product.rate')[item['loanRateType']]}}{{$t('product.rateType')[item['loanDayMoneyRateType']]}}{{setRate(item['loanDayMoneyRate'])}}</div>
                            </td>
                        </tr>
                    </table>
                    <div class="hr"></div>
                    <div class="list-foot">
                        <van-image class="list-time" :src="timeImg"></van-image>
                        <div class="list-text">{{$t('product.tip1')}}{{item['applyDay']+$t('product.applyDayUnit')[item['applyDayUnit']]}}{{$t('product.tip2')}}</div>
                    </div>
                </li>
            </ul>
                </van-list>
            </van-pull-refresh>
        </van-row>
    </div>
</template>

<script>
    import api from '@/api/index'
    import kspImg from '@/assets/imgs/-s-ksp.png'
    import newImg from '@/assets/imgs/-s-new.png'
    import stagingImg from '@/assets/imgs/-s-staging.png'
    import timeImg from '@/assets/imgs/time.png'

    export default {
        name: "productList",
        data(){
            return{
                images: [],
                kspImg,
                newImg,
                stagingImg,
                timeImg,
                loading:false,
                loadingState:true,
                finished:false,
                productData:[],
                pageSize: 10,
                currentPage: 1,
                isLoading:false
            }
        },
        mounted(){
            this.getInfo();
            window.callBackFlutter=(data)=>{
                window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                this.getBannerData();
            };
        },
        methods:{
            getInfo(){
                getUserLoginInfo.postMessage("callBackFlutter");
                // this.take().then(data => {
                //     console.log(data);
                //     if(data){
                //         window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                //         this.getBannerData();
                //     }
                // });
            },
            take(){
                return new Promise((resolve,reject)=>{
                    this.$bridge["getLoginInfo"](null, res => {
                        resolve(JSON.parse(res));
                    });
                });
            },
            getBannerData(){
                api.getBanner().then(res => {
                    this.getProductData();
                    if (res.data.success) {
                        console.log(res.data);
                        this.images=res.data.data;

                    } else {
                        this.$notify(res.data.message);
                    }
                })
            },
            getProductData(){
                let data={
                    pageSize:this.pageSize,
                    currentPage:this.currentPage
                };
                api.getProduct(data).then(res => {
                    this.loadingState=false;
                    if (res.data.success) {
                        if(res.data.data){
                            if(res.data['page']['totalPage']>this.currentPage){
                                this.currentPage++;
                            }else{
                                this.currentPage=1
                            }
                            this.productData=res.data.data;
                        }else{
                            this.productData=[];
                        }

                    } else {
                        this.$notify(res.data.message);
                    }
                })
            },
            info(item,index){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let postData={
                    eventName:'"listClick',
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"],
                    key1:"listClick",
                    value1:item['id'],
                    key2:"list_position",
                    value2:index+1,
                    vest:usrInfo['data'] && usrInfo['data']['vest'] ? usrInfo['data']['vest'] : usrInfo["vest"],
                    uniqueCode:usrInfo['uniqueCode'] && usrInfo['data']['uniqueCode'] ? usrInfo['data']['uniqueCode'] : usrInfo["uniqueCode"]
                };
                api.event(postData).then(res => {
                    if (res.data.success) {
                        let params={
                            id:item['id'],
                            index:index+1,
                        };
                        this.$bridge['appDetails'](params);
                    } else {
                        this.$notify(res.data.message);
                    }
                })
            },
            downLoad($event,item,index){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let postData={
                    eventName:"list_download_click",
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"],
                    // userId :"1",
                    key1:"list_download_click",
                    value1:item['id'],
                    key2:"list_position",
                    value2:index+1,
                    vest:usrInfo['data'] && usrInfo['data']['vest'] ? usrInfo['data']['vest'] : usrInfo["vest"],
                    uniqueCode:usrInfo['uniqueCode'] && usrInfo['data']['uniqueCode'] ? usrInfo['data']['uniqueCode'] : usrInfo["uniqueCode"]
                };
                api.event(postData).then(res => {
                    if (res.data.success) {
                        this.$bridge['appDetailsLink'](item['forwardUrl']);
                    } else {
                        this.$notify(res.data.message);
                    }
                });
                $event.stopPropagation();
            },
            setRate(data){
                if(data!=null){
                    let str=(data*100).toFixed(2);
                    return str+" %";
                }
            },
            jump(item,index){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let postData={
                    eventName:'bannerClick',
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"],
                    key1:"bannerClick",
                    value1:item['id'],
                    key2:"list_position",
                    value2:index+1,
                    vest:usrInfo['data'] && usrInfo['data']['vest'] ? usrInfo['data']['vest'] : usrInfo["vest"],
                    uniqueCode:usrInfo['uniqueCode'] && usrInfo['data']['uniqueCode'] ? usrInfo['data']['uniqueCode'] : usrInfo["uniqueCode"]
                };
                api.event(postData).then(res => {
                    if (res.data.success) {
                        this.$bridge['appDetailsLink'](item['forwardUrl']);
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            onLoad(){
                if(this.currentPage>1){
                    let data={
                        pageSize:this.pageSize,
                        currentPage:this.currentPage
                    };
                    api.getProduct(data).then(res => {
                        this.loading=false;
                        if (res.data.success) {
                            if(res.data.data){
                                if(res.data['page']['totalPage']>this.currentPage){
                                    this.currentPage++;
                                }else{
                                    this.currentPage=1
                                }
                                this.productData=this.productData.concat(res.data.data);
                            }
                        } else {
                            this.$notify(res.data.message);
                        }
                    })
                }else{
                    this.loading=false;
                    this.finished=true;
                }
            },
            onRefresh(){
                let data={
                    pageSize:10,
                    currentPage:1
                };
                api.getProduct(data).then(res => {
                    this.isLoading=false;
                    if (res.data.success) {
                        this.productData=res.data.data;
                    } else {
                        this.$notify(res.data.message);
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/main";
    .product-list-banner{
      padding: 10px 15px 0 15px;
    }
    .c-list-unStyled{
        list-style: none;
        padding: 0;
        margin:  0;
    }
    .product-list-item{
        position: relative;
        border-radius: 12px;
        background-color: #ffffff;
        margin: 0 15px 15px 10px;
        padding: 15px 18.5px;
        .list-down{
            text-align: right;
            color: #999999;
            margin-right: 11px;
            font-size: 11px;
            margin-top: -5px;
        }
        .list-item-main{
            width: 100%;
            font-size: 0.453rem;
            color: #434242;
            img{
                width: 28px;
                height: 28px;
            }
            .new{
                width: 10px;
                height: 15px;
                margin-left: 40px;
            }
            .ksp{
                width: 10px;
                height: 15px;
                margin-left: 30px;
            }
            .isStaging{
                width: 22px;
                height: 15px;
                margin-left: 20px;
            }
            .name{
                padding-right: 70px;
                font-size: 17px;
                color: #434242;
                margin-top: -28px;
                margin-left: 35px;
            }
            .list-item-button{
                background-color: #EDC311;
                height:26.5px;
                font-size: 14px;
                padding-right: 10px;
                padding-left: 10px;
                color: #ffffff;
                line-height: 26.5px;
                border-radius: 26.5px;
                float: right;
                margin-top: -20px;
            }
        }
        .noInfo{
            margin-top: 25px;
        }
        .info{
            margin-top: 10px;
        }
        .info,.noInfo{
            width: 100%;
            .first{
                width: 50%;
                border-right: 1px #EEEEEE solid;
                text-align: right;
                padding-right: 30px;
                .one{
                    color: #D10202;
                    font-size: 20px;
                }
                .two{
                    margin-top: 12px;
                    font-size: 16px;
                    color: #666666;
                }
            }
            .last{
                width: 50%;
                text-align: left;
                padding-left: 30px;
                .last-one{
                    font-size: 20px;
                    color: #434242;
                }
                .last-two{
                    margin-top: 12px;
                    font-size: 16px;
                    color: #666666;
                }
            }
        }
        .hr{
            width: 100%;
            height: 1px;
            background-color: #DDDDDD;
            margin-top: 13px;
        }
    }
    .list-foot{
        margin-top: 10px;
        .list-time{
            width: 18px;
            height: 18px;
        }
        .list-text{
            margin-top: -21px;
            color: #999999;
            font-size: 12px;
            margin-left: 20px;
        }
    }
    .loading{
        z-index: 1000;
        margin-top: 60%;
    }
</style>