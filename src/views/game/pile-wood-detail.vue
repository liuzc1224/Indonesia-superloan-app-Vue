<template>
    <div class="game_main_back">
        <van-nav-bar
                :fixed="true"
                :title="$t('game.pileWood')"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        >
            <van-icon class="iconfont" class-prefix="my-icon" name="fenxiang" slot="right"></van-icon>
        </van-nav-bar>
        <van-row class="main">
            <van-overlay :show="loadingState"></van-overlay>
            <van-loading v-if="loadingState" type="spinner" class="loading" vertical></van-loading>
            <van-row v-else class="pile_wood_detail">
                <van-image :src="rank" class="rank" @click="leaderBoard"></van-image>
                <span class="first_span" @click="leaderBoard">
                  {{$t('game.leaderBoard')}}
                </span>
                <van-image :src="confront" class="confront" @click="gameShare()"></van-image>
                <span class="two_span" @click="gameShare()">
                  {{$t('game.battle')}}
                </span>
                <div class="first_text">
                    {{$t('game.pileWood')}}
                </div>
                <div class="two_text">
                    {{$t('game.slogan')}}
                </div>
                <div class="three_text">
                    {{$t('game.bestResult')}}
                    <span>{{userHistoryMaxScore}}</span>
                </div>
                <div class="four_text">
                    <van-image :src="btn" class="btn" @click="play()"></van-image>
                </div>
                <div class="five_text">
                    <div>
                        {{gratisGameNum}}
                    </div>
                    <p>{{$t('game.opportunity')}}</p>
                </div>
            </van-row>

        </van-row>
        <share-pop class="admin-modal" ref="mychild" :editModal="editModal" :shareType="shareType" v-on:changeModal="changeModal"></share-pop>

    </div>
</template>

<script>
    import api from '@/api/index'
    import rank from "@/assets/imgs/game/rank.png"
    import confront from "@/assets/imgs/game/confront.png"
    import btn from "@/assets/imgs/game/btn.png"
    export default {
        name: "pile-wood-detail",
        data(){
            return{
                editModal:false,
                shareType:null,
                gratisGameNum:0,
                integralGameNum:0,
                userHistoryMaxScore:0,
                rank,
                confront,
                btn,
                loadingState:true,
            }
        },
        mounted(){
            this.getInfo();
            window.callBackFlutter=(data)=>{
                window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                this.getData();
            };
        },
        methods:{
            onClickLeft() {
                this.$router.go(-1);
            },
            onClickRight(){
                this.shareType="1";
                shareDialog.postMessage(this.shareType);
                // this.$bridge.gameShare();
            },
            changeModal (param) {
                this.editModal = param;
            },
            leaderBoard(){
                this.$router.push("leaderBoard");
            },
            play(){
                this.getData();
                setTimeout(()=>{
                    if(this.gratisGameNum<1){
                        if(this.integralGameNum<2){
                            this.$dialog.confirm({
                                title: this.$t("game.tip.deduction"),
                                message: this.$t("game.tip.deductionMsg"),
                                cancelButtonText: this.$t("game.tip.cancel"),
                                confirmButtonText: this.$t("game.tip.ok"),
                                beforeClose:((action, done)=>{
                                    if (action === 'confirm') {
                                        this.gameStart(2);
                                        done();
                                    } else {
                                        done();
                                    }
                                })
                            });
                        }else{
                            this.$dialog.confirm({
                                title: this.$t("game.tip.prompt"),
                                message: this.$t("game.tip.endMsg"),
                                cancelButtonText: this.$t("game.tip.cancel"),
                                confirmButtonText: this.$t("game.tip.ok")
                            });
                        }
                    }else{
                        this.gameStart(1);
                    }
                },10)
            },
            gameShare(){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data={
                    eventName:'fight',
                    gameId:1,
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                };
                api.saveGameStatisticsLog(data).then(res => {
                    if (res.data.success) {
                        this.shareType="1";
                        shareDialog.postMessage(this.shareType);
                        // this.$bridge.gameShare();
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            getInfo(){
                getUserLoginInfo.postMessage("callBackFlutter");
                // this.take().then(data => {
                //     if(data){
                //         window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                //         this.getData();
                //     }
                // });
            },
            // take(){
            //     return new Promise((resolve,reject)=>{
            //         this.$bridge["getLoginInfo"](null, res => {
            //             resolve(JSON.parse(res));
            //         });
            //     });
            // },
            getData(){
                this.getGratisGameNumData();
                this.getIntegralGameNumData();
                this.getMaxGameScoreData();
            },
            getGratisGameNumData(){
                api.getGratisGameNum().then(res => {
                    this.loadingState=false;
                    if (res.data.success) {
                        let data=Number(res.data.data);
                        if(data<=5){
                            this.gratisGameNum=5-data;
                        }else{
                            this.gratisGameNum=0;
                        }
                    } else {
                        this.$notify(res.data.message);
                    }
                })
            },
            getIntegralGameNumData(){
                api.getIntegralGameNum().then(res => {
                    this.loadingState=false;
                    if (res.data.success) {
                        let data=Number(res.data.data);
                        this.integralGameNum=data ? data : 0;
                    } else {
                        this.$notify(res.data.message);
                    }
                })
            },
            getMaxGameScoreData(){
                api.getMaxGameScore().then(res => {
                    this.loadingState=false;
                    if (res.data.success) {
                        this.userHistoryMaxScore=res.data['userHistoryMaxScore'] ? res.data['userHistoryMaxScore'] : 0;
                    } else {
                        this.$notify(res.data.message);
                    }
                })
            },
            gameStart(beginType){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data={
                    beginType,
                    gameId:1,
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                };
                api.saveGameStatisticsLog(data).then(res => {
                    if (res.data.success) {
                        this.$router.push({
                            name:"pileWood",
                            params:{
                                gratisGameNum: this.gratisGameNum
                            }
                        })
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/css/main";
    .game_main_back{
        background:url('../../assets/imgs/game/bg.png') no-repeat;
        -moz-background-size:100% 100%;
        background-size: 100% 100%;
        height: 100%;
        padding: 0;
    }
    .pile_wood_detail{
        color: #ffffff;
        .rank{
            width: 58px;
            height: 58px;
            top:109.5px;
            position: absolute;
            right: 16.5px
        }
        .confront{
            width: 58px;
            height: 58px;
            top:199.5px;
            position: absolute;
            right: 16.5px
        }
        .btn{
            width: 100%;
            margin: 0 auto
        }
        .first_span{
            font-size: 12px;
            top:167.5px;
            position: absolute;
            right: 16.5px;
            text-align: center;
            width: 60.5px
        }
        .two_span{
            font-size: 12px;
            top:257.5px;
            position: absolute;
            right: 16.5px;
            text-align: center;
            width: 60.5px
        }
        .first_text{
            font-size: 40px;
            text-align: center;
            top: 121.5px;
            position: relative;
            width: 169px;
            margin: 0 auto;
        }
        .two_text{
            font-size: 15px;
            line-height: 20px;
            text-align: center;
            position: relative;
            width: 169px;
            top: 140px;
            margin: 0 auto;
            opacity: 0.8
        }
        .three_text{
            background:rgba(0,0,0,1);
            border-radius: 26.5px;
            opacity: 0.5;
            font-size: 14px;
            line-height: 26.5px;
            text-align: center;
            position: relative;
            width: 169px;
            top: 150px;
            margin: 0 auto;
            height: 26.5px;
            span{
                color: #E16743;
            }
        }
        .four_text{
            width: 227.5px;
            height: 73.5px;
            text-align: center;
            margin: 350px auto 0 auto;
            padding: 0
        }
        .five_text{
            width: 98.5px;
            text-align: center;
            top: 315.5px;
            position: absolute;
            float: right;
            right: 0;
            div{
                width:37.5px;
                height: 37.5px;
                border-radius: 37.5px;
                background-color: #E16743;
                line-height: 37.5px;
                position: relative;
                font-size: 18px;
                text-align: center;
                margin: 0 auto
            }
            p{
                margin-top: 6px;
                font-size: 12px;
            }
        }
    }
</style>