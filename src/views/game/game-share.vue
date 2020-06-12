<template>
    <van-row>
        <van-overlay :show="loadingState"></van-overlay>
        <van-loading v-if="loadingState" type="spinner" class="loading" vertical></van-loading>
        <van-row v-else class="game_share_main">
<!--            <van-image class="logo" :src="logo"></van-image>-->
<!--            <div class="logoText">{{$t("bagikan.title")}}</div>-->
           <van-row class="pileWood">
               {{$t('game.pileWood')}}
           </van-row>
            <van-row class="inviteText">
                {{$t('game.inviteText1')}} {{ userData && userData['phoneNumber'] ? str(userData['phoneNumber']) : ''}} {{$t('game.inviteText2')}}
            </van-row>
            <van-row class="slogan">
                <div>
                    {{$t('game.slogan')}}
                </div>
            </van-row>
            <van-row class="image">
                <van-image class="vs" :src="vs"></van-image>
            </van-row>
            <van-row class="bagikanCenter">
                <p>{{$t("bagikan.phone")}}</p>
                <van-field
                        class="input-bagikan"
                        v-model="phone"
                        type="number"
                        label="+62"
                        label-width="49"
                        maxlength="15"
                        :placeholder="$t('bagikan.inputTip')"
                ></van-field>
                <van-button plain size="large" :loading="loading" class="bagikan_btn" @click="registerPhone">{{$t('bagikan.btn')}}</van-button>
            </van-row>
        </van-row>

    </van-row>
</template>

<script>
    import api from '@/api/index'
    import vs from "@/assets/imgs/gameShare/vs.png"
    import logo from "@/assets/imgs/bagikan/1.png"
    export default {
        name: "game-share",
        data(){
            return{
                vs,
                logo,
                loadingState:true,
                callData:null,
                userData:{},
                phone:null,
                stateBtn:false,
                loading:false
            }
        },
        mounted() {
            this.getCallData();
        },
        methods:{
            getCallData(){
                api.getCall().then(res=>{
                    if (res.data.success) {
                        this.callData=res.data.data;
                        let data={
                            userId:this.$route.params.referrerId
                        };
                        api.getMaxScoreByUid(data).then(response=>{
                            this.loadingState=false;
                            if (response.data.success) {
                                this.userData=res.data.data;
                            }else{
                                this.$notify(response.data.message);
                            }
                        });
                    } else {
                        this.loadingState=false;
                        this.$notify(res.data.message);
                    }
                })
            },
            registerPhone(){
                this.loading=true;
                if(this.phone===null){
                    this.loading=false;
                    this.$notify(this.$t("bagikan.inputTip"));
                    return;
                }
                this.phone=this.phone.replace(/\s*/g,"");
                if(this.phone.length<9){
                    this.loading=false;
                    this.$notify(this.$t("bagikan.inputTip"));
                    return;
                }
                let r = /^\+?[0-9][0-9]*$/;
                if(!r.test(this.phone.replace(/\s*/g,""))){
                    this.loading=false;
                    this.$notify(this.$t("bagikan.inputTip"));
                    return;
                }
                let data={
                    phoneNumber : this.phone,
                    areaCode : "62"
                };
                api.preregisterPhone(data).then(res => {
                    if(res.data.data!==0){
                        this.phone=null;
                        this.loading=false;
                        this.$notify(this.$t('bagikan.tip'));
                        return;
                    }else{
                        this.sub();
                    }
                });
            },
            sub(){
                let data=this.$route.params;
                let num=this.phone.substring(0,1)===0 ? this.phone.substring(1) : this.phone;
                data['phoneNumber']=num.replace(/\s*/g,"");
                data['countryPrefix']="62";
                api.preregister(data).then(res => {
                    this.loading=false;
                    if(res.data.success){
                        window.location.href=this.callData['sdkUrl'];
                    }else{
                        this.$notify(res.data.message);
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/css/main";
    #app{
        background: url('../../assets/imgs/gameShare/bg.png') no-repeat;background-size: cover;
    }
    .game_share_main{
        color: #ffffff;
        text-align: center;
        .logo{
            position: absolute;
            margin-top: 0.4444444444rem;
            margin-left: 0.5rem;
            height: 1.6666666667rem;
            width: 1.6666666667rem;
        }
        .logoText{
            position: absolute;
            font-size: 0.5rem;
            color: #ffffff;
            margin-top: 1.1111111111rem;
            margin-left: 2.4444444444rem;
        }
        .pileWood{
            font-size: 24px;
            margin-top: 86px;
        }
        .inviteText{
            background-color: #FF0C00;
            font-size: 12px;
            line-height: 35px;
            margin-top: 21px;
        }
        .slogan{
            margin: 11.5px auto;
            padding: 0 16.5px;
            div{
                line-height:26.5px;
                background:rgba(0,0,0,1);
                opacity:0.5;
                border-radius:26.5px;
                font-size: 12px;
            }
        }
        .image{
            width: 140.5px;
            height: 106.5px;
            margin: 39px auto;
        }
        .bagikanCenter{
            padding: 0 15px;
            p{
                text-align: left;
                font-size: 16px;
            }
            .input-bagikan{
                margin-top: 17.5px;
                border: 1.5px solid #FF0C00;
                border-radius: 5px;
            }
            .bagikan_btn{
                margin-top: 10px;
                height: 45px;
                line-height: 45px;
                font-size: 15px;
                background-color: #FF0C00;
                border: 1px solid #FF0C00;
                border-radius: 5px;
                color: #ffffff;
            }
        }
    }
</style>