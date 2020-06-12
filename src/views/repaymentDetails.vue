<template>
    <div>
        <van-nav-bar
                :fixed="true"
                :title="$t('repaymentDetails.title')"
                left-arrow
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-row class="main">
            <van-row class="info-title">
                <van-row class="cardInfo">
                    <van-row v-if="dataInfo['bankName']">
                        <div class="zh">
                            <van-icon name="idcard" color="#FFFFFF"/>
                            <span style="position: relative;">{{dataInfo['bankName'] ? dataInfo['bankName'] : ""}}{{dataInfo['creditCardNo'] ? dataInfo['creditCardNo'] : ""}}</span>
                        </div>
                    </van-row>
                    <van-row>
                        <van-col span="10" class="je">
                            <p>{{$t('repaymentDetails.currentRepaymentMoney')}}</p>
                            <p class="num">{{dataInfo['currentRepaymentMoney'] ? setMoney(dataInfo['currentRepaymentMoney']) : "RP. 0.00"}}</p>
                        </van-col>
                        <van-col span="14">
                            <van-row class="date">
                                <van-row style=" word-break: break-all;">{{$t('repaymentDetails.repaymentMoney')}}:<span>{{dataInfo['repaymentMoney'] ? setMoney(dataInfo['repaymentMoney']) : "RP. 0.00"}}</span></van-row>
                                <van-row>{{$t('repaymentDetails.stringOutAccountDate')}}: <span>{{dataInfo['stringOutAccountDate'] ? dataInfo['stringOutAccountDate'] : ""}}</span></van-row>
                                <van-row>{{$t('repaymentDetails.stringRepaymentDate')}}:     <span>{{dataInfo['stringRepaymentDate'] ? dataInfo['stringRepaymentDate'] : ""}}</span></van-row>
                            </van-row>
                        </van-col>
                    </van-row>
                    <van-row class="day">
                        <p v-if="dataInfo['status']!=3">
                            {{$t('repaymentDetails.tip1')}} {{dataInfo['statusDay'] ? dataInfo['statusDay'] : 0}} {{$t('repaymentDetails.tip2')}}
                        </p>
                        <p v-if="dataInfo['status']===3">
                            {{$t('repaymentDetails.tip3')}} {{dataInfo['statusDay'] ? dataInfo['statusDay'] : 0}} {{$t('repaymentDetails.tip4')}}
                        </p>
                    </van-row>
                </van-row>
            </van-row>

            <van-row class="info">
                    <van-row class="dd">
                        <van-col span="8">
                            {{$t('repaymentDetails.repaymentAmount')}}
                        </van-col>
                        <van-col span="16">
                            <input type="tel" placeholder="RP. 0.00" v-model="repaymentAmount" class="moneyinput">
                        </van-col>
                    </van-row>
                    <van-row class="dd">
                        <van-col span="8">
                            {{$t('repaymentDetails.repaymentDate')}}
                        </van-col>
                        <van-col span="16">
                            <div class="picker_text" @click="showPicker = true">{{showtime ? showtime : $t('repaymentDetails.payDate')}}</div>
                            <van-popup v-model="showPicker" position="bottom">
                                <van-datetime-picker
                                    v-model="currentDate"
                                    type="date"
                                    :min-date="minDate"
                                    :max-date="maxDate"
                                    @confirm="ttt()"
                                    @cancel="fff()"
                                ></van-datetime-picker>
                            </van-popup>
                        </van-col>
                    </van-row>
                    <van-row class="dd">
                        <table @click="getBank()" class="onewidth">
                            <tr>
                                <td class="halfwidth">
                                    <p>{{$t('repaymentDetails.accountName')}}</p>
                                </td>
                                <td class="accountName">
                                    <span v-if="!accountName" style="color: #666666;">{{$t('repaymentDetails.prompt')}}</span>
                                    <span v-if="accountName">
                                        {{accountName}}
                                    </span>
                                    <span v-if="accountNumber">
                                        : {{accountNumber.substring(accountNumber.length-4,accountNumber.length)}}
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </van-row>
                    <van-row>
                        <van-button @click="sub()"  size="large" class="button1" :disabled='stateBtn || !repaymentAmount || !paymentAccountCardAccountID'>{{$t('repaymentDetails.submit')}}</van-button>
                        <van-button @click="update()"  size="large" class="button2" :disabled="updateBtn">{{$t('repaymentDetails.btn')}}</van-button>
                    </van-row>
                </van-row>
        </van-row>
    </div>
</template>

<script>
    import {formatDate} from '../libs/date'
    import api from '@/api/index'
    export default {
        name: "repaymentDetails",
        data(){
            return{
                invateCode:null,
                inputValue:null,
                inputTitle:null,
                imgData:[],
                today:"",
                today1:"",
                paymentAccountCardAccountID:null,
                repaymentAmount:null,
                dataInfo:{},
                enum_edu:[],
                uccid:null,
                repaymentDate:null,
                showtime:null,
                accountType:null,
                loading:true,
                stateBtn:false,
                updateBtn:false,
                accountName:"",
                accountNumber:"",
                showPicker: false,
                tip:{},
                minDate: new Date(1999, 10, 1),
                maxDate: new Date(2099, 10, 1),
                currentDate: new Date(),
            }
        },
        mounted(){
            this.tip = this.$t('repaymentDetails');
            let year = (new Date).getFullYear()+"";
            let month= (new Date).getMonth()+1+"";
            let day= (new Date).getDate()+"";
            if (parseInt(month) >= 1 && parseInt(month) <= 9) {
                month = "0" + month;
            }
            if (parseInt(day) >= 0 && parseInt(day) <= 9) {
                day = "0" + day;
            }
            this.showtime=day+"-"+month+"-"+year;
            this.today1=year+"-"+month+"-"+day;
            this.queryBill();
            window.callBackFlutter=(data)=>{
                window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                let dataObj={
                    billId:this.uccid
                };
                api.repaymentDetailsQueryBill(dataObj).then(res => {
                    if(res.success === false){
                        this.$notify(res.message);
                        setTimeout(function () {
                            goBack.postMessage("goBack");
                            // this.$bridge.goBack();
                        },10)
                    }else{
                        this.dataInfo= res.data.data;
                        this.query();
                    }
                })
            };
            window.callBackUccId=(data)=>{
                this.uccid= data;
                getUserLoginInfo.postMessage("callBackFlutter");
            };
            window.bankData=(data)=>{
                this.paymentAccountCardAccountID=data['id'];
                this.accountName=data['accountName'];
                this.accountNumber=data['accountNumber'];
                this.accountType=data['accountType'];
            };
        },
        methods:{
            ttt(){
                this.showtime=formatDate(new Date(this.currentDate),"dd-MM-yyyy");
                this.repaymentDate=this.currentDate;
                this.showPicker=false;
            },
            fff(){
                this.showPicker=false;
            },
            onClickLeft(){
                goBack.postMessage("goBack");
                // this.$bridge.goBack();
            },
            queryBill(){
                getUccid.postMessage("callBackUccId");
                // this.take().then(data => {
                //     this.uccid= data;
                //     let dataObj={
                //         billId:this.uccid
                //     };
                //     this.userInfo().then(info => {
                //         if(info){
                //             window.sessionStorage.setItem("loginInfo", JSON.stringify(info));
                //             api.repaymentDetailsQueryBill(dataObj).then(res => {
                //                 if(res.success === false){
                //                     this.$notify(res.message);
                //                     setTimeout(function () {
                //                         this.$bridge["goBack"]();
                //                     },10)
                //                 }else{
                //                     this.dataInfo= res.data.data;
                //                     this.query();
                //                 }
                //             })
                //         }
                //
                //     })
                // });
            },
            userInfo(){

                return new Promise((resolve,reject)=>{
                    this.$bridge["getLoginInfo"](null, res => {
                        resolve(JSON.parse(res));
                    });
                });
            },
            query(){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let dataObj={
                    userId:usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                };
                api.repaymentDetailsQuery(dataObj).then(res => {
                        if(res.success === false){
                            this.$notify(res.message);
                            setTimeout(function () {
                                goBack.postMessage("goBack");
                                // this.$bridge["goBack"]();
                            },1000)
                        }else{
                            this.enum_edu=res.data.data;
                        }
                })
            },
            take(){
                // return new Promise((resolve,reject)=>{
                //     this.$bridge["getUccid"](null, res => {
                //         resolve(JSON.parse(res));
                //     });
                // });
            },
            sub(){
                this.stateBtn=true;
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let repaymentDate;
                if(this.repaymentDate){
                let year = (new Date(this.repaymentDate)).getFullYear()+"";
                let month= (new Date(this.repaymentDate)).getMonth()+1+"";
                let day= (new Date(this.repaymentDate)).getDate()+"";
                if (parseInt(month) >= 1 && parseInt(month) <= 9) {
                    month = "0" + month;
                }
                if (parseInt(day) >= 0 && parseInt(day) <= 9) {
                    day = "0" + day;
                }
                repaymentDate=year+"-"+month+"-"+day;
                }
                let data={
                    accountType:this.accountType,
                    creditorCardAccountBillID:this.dataInfo['id'],
                    creditorCardAccountID:this.dataInfo['uccId'],
                    paymentAccountCardAccountID:this.paymentAccountCardAccountID,
                    repaymentAmount:this.repaymentAmount,
                    repaymentDate:repaymentDate ? repaymentDate+" 00:00:00" : this.today1+" 00:00:00",
                    userID:usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                };
                api.repaymentDetailsRepayment(data).then(res => {
                        if(res.success === false){
                            this.$notify(res.message);
                            this.stateBtn=false;
                        }else{
                            this.$notify({ type: 'success', message: this.$t("repaymentDetails.success") });
                            setTimeout(()=> {
                                goBack.postMessage("goBack");
                                // this.$bridge.goBack();
                            },1000)
                        }
                })
            },
            setMoney(data){
                if(data){
                    return "Rp."+(Number(data).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
                }
            },
            update(){
                this.updateBtn=true;
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let repaymentDate;
                if(this.repaymentDate){
                let year = (new Date(this.repaymentDate)).getFullYear()+"";
                let month= (new Date(this.repaymentDate)).getMonth()+1+"";
                let day= (new Date(this.repaymentDate)).getDate()+"";
                if (parseInt(month) >= 1 && parseInt(month) <= 9) {
                    month = "0" + month;
                }
                if (parseInt(day) >= 0 && parseInt(day) <= 9) {
                    day = "0" + day;
                }
                repaymentDate=year+"-"+month+"-"+day;
                }
                let data={
                    accountType:this.accountType,
                    creditorCardAccountBillID:this.dataInfo['id'],
                    creditorCardAccountID:this.dataInfo['uccId'],
                    paymentAccountCardAccountID:this.paymentAccountCardAccountID,
                    repaymentAmount:this.repaymentAmount,
                    repaymentDate:repaymentDate ? repaymentDate+" 00:00:00" : this.today1+" 00:00:00",
                    userID:usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"],
                    type:1,
                };
                api.repaymentDetailsUpdate(data).then(res => {
                        if(res.success === false){
                            this.$notify(res.message);
                            this.updateBtn=false;
                        }else{
                            this.$notify({ type: 'success', message: this.$t("repaymentDetails.success") });
                            this.updateBtn=false;
                            setTimeout(()=> {
                                goBack.postMessage("goBack");
                                // this.$bridge.goBack();
                            },1000)
                        }
                })
            },
            imgClick(data){
                this.imgData = this.imgData.filter(function(val){
                return val!=data;
                });
            },
            stringify(data){
                return JSON.stringify(data);
            },
            getBank(){
                getBank.postMessage("bankData");
                // this.bank().then(data => {
                    // console.log("回调----data---", data);
                    // this.paymentAccountCardAccountID=data['id'];
                    // this.accountName=data['accountName'];
                    // this.accountNumber=data['accountNumber'];
                    // this.accountType=data['accountType'];
                    // console.log(12333352154165415)
                // })
            },
            bank(){
                getBank.postMessage("bankData");
                // return new Promise((resolve,reject)=>{
                //     this.$bridge["getBank"](null, res => {
                //         resolve(JSON.parse(res));
                //     });
                // });
            },
        }
    }
</script>

<style lang="less">
    @import "../assets/css/main";
    #app{
        background: #ffffff;
    }
    .topTable{
        width: 98%;
        margin: 0 auto;
        tr{
            width: 100%;
        }
    }
    .info-title{
        background-color: #eeeeee;
        padding: 15px;
    }
    .onewidth{
        width: 100%;
    }
    .halfwidth{
        width: 50%;
        p{
            margin:0;
        }
    }
    .moneyinput{
        width: 100%;
        border: none;
        text-align: right;
        color: #666666;
    }
    .accountName{
        color: #666666;
        width: 50%;
        text-align:right;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .cardInfo{
        padding: 0 10px;
        border-radius: 5px;
        background-color: #FF0C00;
        color: white;
    }
    .zh{
    padding-left: 13px;
    font-size: 13px;
    line-height: 24px;
    span{
        padding-left: 4px;
    }
    }
    .je{
        text-align: center;
        font-size: 15px;
        margin-top: 7px;
    .num{
        margin-top: 13px;
        font-size: 24px;
        word-break: break-all;
    }
    }
    .date{
        margin-top: 10px;
        font-size: 13px;
        line-height: 28px;
    div{
        width: 100%;
        span{
            font-size: 13px;
            padding-left: 6px;
        }
    }
    }
    .info{
        background-color: white;
        font-size: 15px;
        padding: 0 15px;
        .dd{
            padding: 12px 0;
            line-height: 24px;
            border-bottom: 1px #eeeeee solid;
            color: #999999;
            .picker_text{
                color: #666666;
                text-align: right;
            }
        }
    }
    .day{
        font-size: 13px;
        line-height: 18px;
        border-top: 1px white solid;
        p{
            text-align: center;
        }
    }
    .button-inner{
    font-size: 15px;
    }
    .button1{
        margin-top: 14px;
        background-color: #FF0C00;
        color: white;
        font-size: 18px;
        border-radius: 5px;
    }
    .button2{
        margin-top: 14px;
        font-size: 18px;
        border-radius: 5px;
        background-color: white;
        border: 1px solid #FF0C00;
        color: #999999;
    }
    .van-nav-bar{
        background-color:#FF0C00;
    }
</style>