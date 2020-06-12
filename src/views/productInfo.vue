<template>
    <div id="feedback">
        <van-nav-bar
                :fixed="true"
                :title="$t('product.info.title')"
                left-arrow
                @click-left="onClickLeft"
                @click-right="share('lottery_share_icon_click')"
        >
            <van-icon class="iconfont" class-prefix="my-icon" name="fenxiang" slot="right"></van-icon>
        </van-nav-bar>
        <van-row class="main">
            <van-overlay :show="loading"></van-overlay>
            <van-loading v-if="loading" type="spinner" class="loadingCass" vertical></van-loading>
            <van-row v-else>
                <div class="info-title">
                    <van-row class="title-text">
                        <div class="b">
                            <van-icon class="iconfont" class-prefix="my-icon" name="xiazai" style="color: #ffffff"></van-icon>
                            <span>{{productData['downTimes'] ? productData['downTimes'] : 0}}</span>
                        </div>
                        <van-image :src="productData['bannerUrl']" width="50px"></van-image>
                        <div>
                            <van-row class="first-text">
                                <div class="a">{{productData['productName']}}</div>
                            </van-row>
                            <van-row>
                                <van-image v-if="productData['isNew']" class="new" :src="newImg"></van-image>
                                <van-image v-if="productData['isKsp']" :class="productData['isNew'] ? 'ksp' :'new'" :src="kspImg"></van-image>
                                <van-image v-if="productData['isStaging']" :class="productData['isNew'] || productData['isKsp'] ? 'isStaging' :'new'" :src="stagingImg"></van-image>
                            </van-row>
                            <div class="second-text">
                                <div>{{ $t("product.info.createTime")}} {{productData['createTime']}}</div>
                            </div>
                        </div>
                        <div class="money-one">
                            {{val(productData['loanMoney'])}}
                        </div>
                        <div class="money-two">
                            {{ $t("product.info.max") }}({{$t("product.loanPeriodUnit")[productData['loanPeriodUnit']]}})
                        </div>
                        <div class="info-button" @click="downLoad(productData['forwardUrl'])">
                            {{ $t("product.info.btn") }}
                        </div>
                        <div class="list-share">
                            <span @click="share('lottery_share_icon_click')">{{$t("product.info.share")}}</span>
                        </div>
                    </van-row>
                </div>
                <div class="info-product">
                    <van-row>
                        <div class="info-buffer"></div>
                        <span class="info-product-title">{{ $t("product.info.productInfo")}}</span>
                        <div class="hr"></div>
                    </van-row>
                    <van-row>
                        <div class="info-title-list">
                            {{$t("product.info.highestLoan")}}
                        </div>
                        <van-field
                            class="info-type"
                            type="text"
                            v-model="loanMoney"
                            readonly="readonly"
                        ></van-field>
                    </van-row>
                    <van-row style="width: 100%">
                        <div class="info-title-list">
                            {{$t("product.info.limit")}}
                        </div>
                        <van-field
                            class="info-type"
                            type="text"
                            v-model="loanDay"
                            readonly="readonly"
                        ></van-field>
                    </van-row>
                    <van-row>
                        <div class="info-title-list">
                            {{$t("product.info.rate")[productData['loanRateType']]}}
                        </div>
                        <van-field
                            class="info-type"
                            type="text"
                            v-model="rateType"
                            readonly="readonly"
                        ></van-field>
                    </van-row>
                    <div>
                        <div class="info-title-list">
                            {{$t("product.info.time")}}
                        </div>
                        <van-field
                            type="text"
                            class="info-type"
                            v-model="applyDay"
                            readonly="readonly"
                        ></van-field>
                    </div>
                </div>
                <div class="info-product">
                    <van-row>
                        <div class="info-buffer"></div>
                        <div class="info-product-title">{{ $t("product.info.productAdvantage")}}</div>
                        <div class="hr"></div>
                    </van-row>
                    <van-row>
                        <div class="info-title-list-text">
                            {{productData['productAdvantage']}}
                        </div>
                    </van-row>
                </div>
                <div class="info-product" v-if="productData['commentStatus']===1">
                    <van-row>
                        <div class="info-buffer"></div>
                        <div class="info-product-title">{{ $t("product.info.feedback")}}</div>
                        <div class="hr"></div>
                    </van-row>
                    <van-row>

                        <div class="c-null-value" v-if="productData['commentStatus']===1 && commentData && commentData.length===0" style="text-align: center;padding-top: 4px;width: 100%">
                            <van-image :src="pic" width="75"></van-image>
                            <p style="padding-left: 14px;padding-right: 14px;margin-top: 4px;color: #999999;font-size: 8px;line-height: 12px">{{ $t("product.info.feedbackNo")}}</p>
                        </div>
                        <div class="info-title-list-text" v-if="productData['commentStatus']===1 && commentData && commentData.length>0">
                            <ul class="c-list-unstyled" id="listInfo">
                                <li v-for="(item,index) in commentData" :key="index">
                                    <table style="margin-top: 4px;position: relative">
                                        <tr style="height: 1rem">
                                            <td style="width: 1rem;position: relative">
                                                <van-image v-if="!item['headPortraitUrl'] && !item['headUrl']" :src="userImg" alt="" ></van-image>
                                                <van-image v-if="item['headPortraitUrl']" :src="item['headPortraitUrl']" alt=""></van-image>
                                                <van-image v-if="item['headUrl']" :src="item['headUrl']" alt=""></van-image>
                                                <br/>
                                            </td>
                                            <td>
                                                <div style="position:absolute;line-height:14px;font-size: 15px;padding-left: 7.5px;color:#666666;margin-top: -15px">
                                                    {{item['userName'] && item['userName']['length'] && item['userName']['length']>=4 ? "****"+item['userName'].substring(item['userName']['length']-4) : item['userName']}}
                                                    <br/>
                                                    <span style="color: #999999;font-size: 13px">{{item['createTime']}}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="width: 1rem;position: relative">
                                            </td>
                                            <td>
                                                <div style="background-color: #DDDDDD;color: #666666;padding:10px 15px;line-height: 18px;word-break: normal ;">
                                                    {{item['comment']}}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </li>
                            </ul>
                        </div>
                        <div class="nextText">
                            <span v-if="nextId && commentData && commentData.length>0" @click="getCommentData()">{{$t('product.info.more')}}</span>
                            <span v-if="!nextId && commentData && commentData.length>0">{{$t('product.info.bottom')}}</span>
                        </div>
                    </van-row>
                </div>
                <div class="info-feedback" :style="{'marginBottom':marginBottom}" v-if="productData['commentStatus']===1">
                    <van-field
                        v-model="feedback"
                        rows="5"
                        autosize
                        type="textarea"
                        maxlength="500"
                        @focus="inputFocus"
                        @blur="inputBlur"
                        :placeholder="$t('product.info.pleaseEnter')"
                        show-word-limit
                    ></van-field>
                    <van-button :loading="stateBtn" @click="submit()"  class="feedback-btn">{{$t('product.info.comment')}}</van-button>
                </div>
            </van-row>
        </van-row>
    </div>
</template>

<script>
    import api from '@/api/index'
    import kspImg from '@/assets/imgs/-s-ksp.png'
    import newImg from '@/assets/imgs/-s-new.png'
    import stagingImg from '@/assets/imgs/-s-staging.png'
    import pic from '@/assets/imgs/helppic.png'
    import userImg from '@/assets/imgs/game/gerenzhongxin.png'
    export default {
        name: "productInfo",
        data(){
            return{
                loading:true,
                productData:[],
                commentData:[],
                kspImg,
                newImg,
                stagingImg,
                pic,
                userImg,
                marginBottom:"0",
                id:null,
                nextId:null,
                index:null,
                currentPage: 1,
                feedback:"",
                stateBtn:false,
                loanMoney:null,
                loanDay:null,
                rateType:null,
                applyDay:null,
            }
        },
        mounted(){
            this.id = this.$route.params.id;
            this.index = this.$route.params.index;
            this.getInfo();
            window.callBackFlutter=(data)=>{
                window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                this.getData();
            };
        },
        methods:{
            onClickLeft(){
                goBack.postMessage("goBack");
                // this.$bridge.goBack();
            },
            getInfo(){
                getUserLoginInfo.postMessage("callBackFlutter");
                // this.take().then(data => {
                //     if(data){
                //         window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                //         this.getData();
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
            share(name){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data={
                    eventName:name,
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                    // userId :"1"
                };
                api.event(data).then(res => {
                    if (res.data.success) {
                        this.$bridge['shareLink'](this.id);
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            val(data){
                if(data!=null){
                    return data.toString().replace( /\B(?=(?:\d{3})+$)/g, ',' )
                }
            },
            downLoad(data){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let postData={
                    eventName:"detailClick",
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"],
                    key1:"detailClick",
                    value1:this.id,
                    key2:"list_position",
                    value2:this.index,
                    vest:usrInfo['data'] && usrInfo['data']['vest'] ? usrInfo['data']['vest'] : usrInfo["vest"],
                    uniqueCode:usrInfo['uniqueCode'] && usrInfo['data']['uniqueCode'] ? usrInfo['data']['uniqueCode'] : usrInfo["uniqueCode"]
                };
                api.event(postData).then(res => {
                    if (res.data.success) {
                        this.$bridge['appDetailsLink'](data);
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            setRate(data){
                if(data!=null){
                    let str=(data*100).toFixed(2);
                    return str+" %";
                }
            },
            submit(){
                if(!this.feedback){
                    return;
                }
                if(this.feedback.length<5){
                    return;
                }
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let postData={
                    productId:this.id,
                    comment:this.feedback,
                    userId:usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                    // userId :"1"
                };
                this.stateBtn=true;
                api.addComment(postData).then(res => {
                    this.stateBtn = false;
                    if (res.data.success) {
                        this.feedback="";
                        this.getCommentData();
                        this.$toast.success(this.$t('product.info.success'));
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            getData(){
                let data={
                    id: this.id
                    // id: 117
                };
                api.getProductInfo(data).then(res => {
                    this.loading=false;
                    if (res.data.success) {
                        this.productData=res.data.data;
                        let productData=res.data.data;
                        this.loanMoney=productData && productData['loanMoney'] ? this.val(productData['loanMoney']) : '';
                        this.loanDay=productData['loanDaysMin']+'('+this.$t('product.unit')[productData['loanPeriodUnit']]+') - ' +productData['loanDaysMax']+'('+this.$t('product.unit')[productData['loanPeriodUnit']]+')';
                        this.rateType=this.$t('product.rateType')[productData['loanDayMoneyRateType']]+this.setRate(productData['loanDayMoneyRate']);
                        this.applyDay=productData['applyDay']+this.$t('product.applyDayUnit')[productData['applyDayUnit']];

                        if(this.productData['commentStatus']===1){
                            this.getCommentData();
                        }
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            getCommentData(){
                let postData={
                    nextId : this.nextId,
                    currentPage : this.currentPage,
                    productId:this.id
                };
                api.getComment(postData).then(res => {
                    if (res.data.success) {
                        if(res.data.data){
                            this.nextId=res.data.data['nextId'];
                            if(res.data.data['loanProductCommentVO']){
                                if(res.data.data['nextId']){
                                    this.currentPage=this.currentPage+1;
                                    this.commentData = this.commentData.concat(res.data.data['loanProductCommentVO']);
                                }else{
                                    if(this.currentPage===1){
                                        this.commentData = res.data.data['loanProductCommentVO'];
                                    }else{
                                        this.commentData = this.commentData.concat(res.data.data['loanProductCommentVO']);
                                    }

                                }
                            }
                        }

                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            inputFocus(){
                let height=document.getElementById("feedback").scrollTop;
                console.log("6666");
                console.log(height);
                this.marginBottom="300px";
                console.log(window.screen.availWidth);
                this.ScrollTop(height+300,200);
            },
            inputBlur(){
                this.marginBottom="0";
            },
            ScrollTop(number = 0, time){
                if (!time) {
                    document.getElementById('feedback').scrollTop = number;
                    return number;
                }
                const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
                let spacingInex = time / spacingTime; // 计算循环的次数
                let nowTop = document.getElementById("feedback").scrollTop; // 获取当前滚动条位置
                let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
                let scrollTimer = setInterval(() => {
                    if (spacingInex > 0) {
                        spacingInex--;
                        this.ScrollTop(nowTop += everTop);
                    } else {
                        clearInterval(scrollTimer); // 清除计时器
                    }
                }, spacingTime);
            },
        }
    }
</script>

<style lang="less">
    @import "../assets/css/main";
    .iconfont{
        color: #ffffff;
        font-size: 23px;
    }
    #feedback{
        height: 100%;
        overflow-y: auto;
    }
    .main{
        width: 100%;
        background-color: #F4F4F4;
        .info-title{
            background-image: url('../assets/imgs/bg-info.png');
            background-size: cover;
            -webkit-background-size: cover;
            -o-background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            padding: 16px;
            .title-text{
                color: #ffffff;
                position: relative;
                .b{
                    position: absolute;
                    width: 100%;
                    text-align: right;
                    font-size: 14px;
                    span{
                        margin-left: 5px;
                    }
                }
                .first-text{
                    width: 200px;
                    margin-top: -50px;
                    margin-left: 60px;
                    .a{
                        font-size: 16px;
                    }
                }
                .new{
                    width: 22px;
                    height: 18px;
                    margin-left: 60px;
                }
                .ksp{
                    width: 22px;
                    height: 18px;
                    margin-left: 20px;
                }
                .isStaging{
                    width: 22px;
                    height: 18px;
                    margin-left: 20px;
                }
                .second-text{
                    padding-left: 60px;
                    padding-top: 3px;
                    font-size: 13px;
                }
            }
            .money-one{
                position: relative;
                font-size: 24px;
                text-align: center;
                margin-top: 37.5px;
            }
            .money-two{
                position: relative;
                font-size: 12px;
                text-align: center;
                margin-top: 12px;
            }
            .info-button{
                padding: 0 16px;
                position: relative;
                color: #ffffff;
                margin-top: 23.5px;
                height: 46.5px;
                font-size: 16px;
                line-height: 46.5px;
                background: -webkit-linear-gradient(#FFE12A, #FFE42B); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(#FFE12A, #FFE42B); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(#FFE12A, #FFE42B); /* Firefox 3.6 - 15 */
                background: linear-gradient(#FFE12A, #FFE42B); /* 标准的语法 */
                border-radius: 7px;
                text-align: center;
                box-shadow:0 4px 2px 0 rgba(255,144,99,0.31);
            }
            .list-share{
                width: 100%;
                font-size: 15px;
                color: #ffffff;
                text-align: center;
                margin-top: 16.5px;
                margin-bottom: 15px;
                span{
                    padding-bottom: 2px;
                    border-bottom: 1px solid #ffffff;
                }
            }
        }
        .info-product{
            margin-top: 16px;
            background-color: #ffffff;
            padding: 10px 15px 10px 15px;
            border-radius: 5px;
            .info-buffer{
                background-color: #EDC311;
                width: 3.5px;
                height: 16px;
                border-radius: 3.5px;
                float: left;
            }
            .info-product-title{
                padding-left: 10px;
                font-size: 16px;
                color: #434242;
                line-height: 18px;
            }
            .info-type{
                border: 1px #EEEEEE solid;
                height: 45px;
                border-radius: 8px;
                font-size: 15px;
                line-height: 45px;
                color: #666666;
                padding: 0 13px;
            }
            .info-title-list{
                font-size: 15px;
                color: #666666;
                line-height: 35px;
            }
            .info-title-list-text{
                font-size: 15px;
                color: #666666;
                line-height: 25px;
            }
        }
        .hr{
            float: left;
            width: 100%;
            height: 1px;
            background-color: #F4F4F4;
            margin-top: 10px;
        }
        .info-product:last-child{
            margin-bottom: 37.5px;
        }
        .info-feedback{
            margin-top: 16px;
            background-color: #ffffff;
            padding: 10px 15px 0 15px;
            z-index: 1;
            text-align: right;
        }
        .feedback-btn{
            margin-top: 15px;
            height: 35px;
            line-height: 35px;
            font-size: 15px;
            color: #ffffff;
            padding: 0 30px;
            background-color: #EDC311;
            border-radius: 5px;
            margin-bottom: 14px;
        }
        .nextText{
            margin-top: 7.5px;
            width: 100%;
            color: #999999;
            text-align: center;
            font-size: 6.5px;
        }
        #listInfo{
            img{
                height: 37.5px;
                width: 37.5px;
                border-radius: 37.5px;
            }
        }
    }
    table,tr{
        width: 100%;
    }
    .info-feedback .van-field{
        background-color: #F4F4F4;
    }
    .loadingCass{
        z-index: 1000;
        margin-top: 60%;
    }

</style>