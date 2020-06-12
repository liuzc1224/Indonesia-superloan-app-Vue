<template>
    <div class="main">
        <van-row class="topImg">
            <van-image class="logo" :src="img1"/>
            <van-row class="logoText">{{$t("bagikan.title")}}</van-row>
            <van-image :src="img6" class="img6" />
        </van-row>
        <van-row class="mainBody">
            <van-row class="maxtextcolor">
                {{$t("loanDetailsShare.text1")}}<span class="redText">{{$t("loanDetailsShare.text2")}}</span>{{$t("loanDetailsShare.text3")}}
            </van-row>
            <van-image :src="img4" class="centerImg" />
            <van-row class="recommender">
                {{$t('loanDetailsShare.prompt1')}}
                {{ userData && userData['phoneNumber'] ? str(userData['phoneNumber']) : ''}}
                {{$t('loanDetailsShare.prompt2')}}
                {{productName}}
                {{$t('loanDetailsShare.prompt3')}}
            </van-row>
            <van-row class="moreText">
                <span>{{$t('loanDetailsShare.tip')}}</span>
            </van-row>
            <van-row class="bagikanCenter">
                <p class="phone">{{$t("bagikan.phone")}}</p>
                <van-cell-group class="input" @keyup="Mobile(this,$event)">
                    <van-field clearable label="+62" v-model="phone" :placeholder="$t('bagikan.inputTip')" maxlength="15" />
                </van-cell-group>
                <van-button plain :disabled="stateBtn" size="large" class="bagikanBtn button" @click="registerPhone()">{{$t('bagikan.btn')}}</van-button>
            </van-row>
        </van-row>
    </div>
</template>

<script>
    import img1 from '@/assets/imgs/bagikan/1.png'
    import img6 from '@/assets/imgs/6.png'
    import img4 from '@/assets/imgs/4.png'
    import api from '@/api/index'
    export default {
        name: "loan-details-share",
        data(){
            return{
                img1:img1,
                img6:img6,
                img4:img4,
                languagePack:null,
                phone:null,
                stateBtn:false,
                callData:'',
                bagikan:{},
                userData:{},
                productName:'',
            }
        },
        mounted(){
            this.getProductName();
            api.loanDetailsShareGetCall().then(res => {
                if(res.success === false){
                    this.$notify(res.message);
                }else{
                    this.callData=res['data']['data'];
                }
            });
            let data={
                userId:this.$route.params['referrerId']+""
            };
            api.loanDetailsShareGetMaxScoreByUid(data).then(res => {
                if(res.success === false){
                    this.$notify(res.message);
                }else{
                    this.userData=res.data.data;
                }
            })
        },
        methods:{
            getProductName(){
                let data={
                    loanProductId: this.$route.params['loanProductId']
                };
                api.loanDetailsShareGetLoanproduct(data).then(res => {
                    if(res.success === false){
                        this.$notify(res.message);
                        return;
                    }else{
                        this.productName=res.data.data && res.data.data['productName'] ? res.data.data['productName'] : "";
                    }
                })
            },
            sub(){
                this.stateBtn=true;
                let data=this.$route.params;
                let num=this.phone.substring(0,1)==0 ? this.phone.substring(1) : this.phone;
                data['phoneNumber']=num.replace(/\s*/g,"");
                data['countryPrefix']="62";
                data['referrerId']=this.$route.params['referrerId'];
                data['source']=this.$route.params['source'];
                data['sourceEvent']=this.$route.params['sourceEvent'];
                console.log(data);
                api.loanDetailsSharePreregister(data).then(res => {
                    this.stateBtn=false;
                    if(res.success === false){
                        this.$notify(res.message);
                    }else{
                        window.location.href=this.callData['sdkUrl'];
                    }
                })
            },
            registerPhone(){
                let phone=''
                if(this.phone){
                    phone=this.phone.replace(/\s*/g,"");
                }
                if(!phone){
                    this.stateBtn=false;
                    this.$notify(this.$t('bagikan.inputTip'));
                    return;
                }
                if(phone.length<9){
                    this.stateBtn=false;
                    this.$notify(this.$t('bagikan.inputTip'));
                    return;
                }
                console.log(phone.substring(0,1));
                console.log(phone.substring(1));
                let r = /^\+?[0-9][0-9]*$/;　　//正整数
                console.log(r.test(phone));
                if(!r.test(phone.replace(/\s*/g,""))){
                    this.stateBtn=false;
                    this.$notify(this.$t('bagikan.inputTip'));
                    return;
                }
                let num=phone.substring(0,1)==0 ? phone.substring(1) : phone;
                let data={
                    phoneNumber : num.replace(/\s*/g,"")
                };
                // console.log(data)
                api.loanDetailsSharePreregisterPhone(data).then(res => {
                    if(res.success === false){
                        this.$notify(res.message);
                    }else{
                        if(res.data.data!==0){
                            this.$notify(this.$t('bagikan.tip'));
                            this.phone=null;
                            return;
                        }else{
                            this.sub();
                        }
                    }
                })
            },
            str(data){
                return data.length>4 ? "****"+data.substring(data.length-4) : data;
            },
            Mobile(obj,e){
                if(e.keyCode == 8) return;
                let value = this.phone;
                console.log(value);
                value = value.replace(/\s*/g, "");
                let result = [];
                for(let i = 0; i < value.length; i++){
                    if (i==3||i==7 || i==11){
                        result.push(" " + value.charAt(i));
                    }
                    else{
                        result.push(value.charAt(i));
                    }
                }
                this.phone = result.join("");
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/main";
    .main{
        padding-top:0px;
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        overflow-y: auto;
    }
    .maxtextcolor{
        color: #666666;
    }
    .topImg{
        width: 100%;
        padding: 0;
        position: relative;
        .img6{
            width: 227px;
            height: 122px;
        }
    }
    .logo{
        position: absolute;
        z-index: 2;
        margin-top: 16px;
        margin-left: 18px;
        height: 62px;
        width: 62px;
    }
    .logoText{
        position: absolute;
        z-index: 2;
        font-size: 18px;
        color: #ffffff;
        margin-top: 42px;
        margin-left: 92px;
    }
    .mainBody{
        text-align: center;
        font-size: 18px;
        .redText{
            color: #FF0C00;
            font-size: 25px;
        }
        .centerImg{
            width: 162px;
            margin-top: 23px;
        }
        .recommender{
            padding: 0 26px;
            font-size: 16px;
            line-height: 23px;
        }
        .moreText{
            color: #999999;
            font-size: 14px;
            margin-top: 18px;
            line-height:18px;
        }

    }
    .bagikanCenter{
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 18px;
        margin-top: 15px;
        .phone{
            text-align: left;
            font-size: 16px
        }
        .input{
            padding-left: 4px;
            margin-top: 17px;
            margin-bottom: 10px;
            border: 1px #368EFA solid;
            height: 45px;
            font-size: 14px;
            line-height: 45px;
            border-radius: 5px;
        }
        .bagikanBtn{
            width: 100%;
            background-color: #FF0C00;
            height:45px;
            margin-top: 12px;
        }
        .bagikanText{
            font-size: 13px;
            color: #ffffff;
        }
        .button{
            font-size:14px;
            color: #ffffff;
            border-radius: 5px;
        }
    }
    .van-nav-bar{
        background-color:#FF0C00;
    }
</style>