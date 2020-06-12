<template>
    <div class="main">
        <van-row class="head">
            <van-image class="logo" :src="img1"></van-image>
            <div class="logoText">{{$t('bagikan.title')}}</div>
            <van-image class="titleImg" :src="img9"></van-image>
        </van-row>
        <van-row class="bagikanCenter" >
            <p class="phone">{{$t('bagikan.phone')}}</p>
            <van-cell-group class="input" @keyup="Mobile(this,$event)">
                <van-field clearable label="+62" v-model="phone" :placeholder="$t('bagikan.inputTip')" maxlength="15" />
            </van-cell-group>
            <van-button plain :disabled="stateBtn" size="large" class="bagikanBtn button" @click="registerPhone()">{{$t('bagikan.btn')}}</van-button>
            <van-row class="rule">
                <van-divider :style="{ color: '#FFFFFF', borderColor: '#FFFFFF', padding: '0 16px' }">
                    {{$t("bagikan.activityRule")}}
                </van-divider>
                <p class="bagikanText">
                    {{$t('bagikan.ruleText1')}}{{num(money)}}{{$t('bagikan.ruleText11')}}
                </p>
                <p class="bagikanText">
                    {{$t('bagikan.ruleText2')}}{{money}}{{$t('bagikan.ruleText22')}}
                </p>
            </van-row>
        </van-row>
    </div>
</template>

<script>
    import img1 from '@/assets/imgs/bagikan/1.png'
    import img9 from '@/assets/imgs/bagikan/9.png'
    import api from '@/api/index'
    export default {
        name: "bagikan",
        data(){
            return{
                phone:null,
                stateBtn:false,
                money:0,
                callData:{},
                bagikan:{},
                img1:img1,
                img9:img9,
            }
        },
        mounted(){
            this.getInfo();
        },
        methods:{
            getInfo(){
                this.getDictionary();
                api.bagikanGetCall().then(res => {
                    if(res.success === false){
                        this.$notify(res.message);
                    }else{
                        // console.log(res['data']['data'])
                        this.callData=res['data']['data'];
                    }
                })
            },
            getDictionary(){
                let data={
                    language: 'id_ID',
                    type:'INVITE_AWARD',
                    code:'ina_invite_amount'
                };
                api.bagikanDictionary(data).then(res => {
                    if(res.success === false){
                        this.$notify(res.message);
                    }else{
                        this.money=res.data.data[0]['value'];
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
                api.bagikanPreregister(data).then(res =>{
                    this.stateBtn=false;
                    if(res.success === false){
                        this.$notify(res.message);
                    }else{
                        window.location.href=this.callData['sdkUrl'];
                    }
                })
            },
            down(){
                window.location.href=this.callData['sdkUrl'];
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
                let r = /^\+?[0-9][0-9]*$/;　　//正整数
                if(!r.test(phone.replace(/\s*/g,""))){
                    this.stateBtn=false;
                    this.$notify(this.$t('bagikan.inputTip'));
                    return;
                }
                let num=phone.substring(0,1)==0 ? phone.substring(1) : phone;
                let data={
                    phoneNumber : num.replace(/\s*/g,"")
                };
                api.bagikanPreregisterPhone(data).then(res => {
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
            num(data){
                if(data){
                    let strNum=data.indexOf('.');
                    if(strNum>-1){
                        return data.substring(0,strNum)
                    }
                }
            },
            Mobile(obj,e){
                if(e.keyCode == 8) return;
                let value = this.phone;
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
        height: 100%;
        background-color: #ffffff;
        overflow-y: auto;
        padding-top :0px;
    }
    .head{
        width: 100%;
        margin: 0 auto;
        padding: 0;
        text-align: center;
        position: relative;
    }
    .titleImg{
        width: 100%;
        height: 220px;
    }
    .logo{
        position: absolute;
        margin-top: 16px;
        margin-left: 9px;
        height: 63px;
        width: 63px;
        z-index: 1;
    }
    .logoText{
        position: absolute;
        font-size: 18px;
        color: #ffffff;
        margin-top: 40px;
        margin-left: 85px;
        z-index:1;
    }
    .logoText2{
        width: 100%;
        text-align: center;
        position: absolute;
        font-size: 15px;
        color: #ffffff;
        margin: 176px auto;
    }
    .bagikanCenter{
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 15px;
        margin-top: 15px;
        .phone{
            font-size: 14px;
            color: #434242;
        }
        .input{
            padding-left: 4px;
            margin-top: 17px;
            margin-bottom: 10px;
            border: 1px #FF0C00 solid;
            height: 45px;
            font-size: 14px;
            line-height: 45px;
            border-radius: 5px;
        }
        .bagikanBtn{
            margin: 0;
            width: 100%;
            background-color: #FF0C00;
            height:45px;
        }
        .bagikanText{
            font-size: 13px;
            color: #ffffff;
            line-height: 24px;
        }
        .button{
            font-size:14px;
            color: #ffffff;
            border-radius: 5px;
        }
        .rule{
            border: 5px #D2720B solid;
            border-radius: 5px;
            background-color: #FF0C00;
            margin-top: 23px;
            padding-bottom: 23px;
            padding-right: 23px;
            padding-left: 23px;
        }
    }
</style>