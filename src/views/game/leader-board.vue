<template>
    <div>
        <van-nav-bar
                :fixed="true"
                :title="$t('game.leaderBoard')"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        >
            <van-icon class="iconfont" class-prefix="my-icon" name="fenxiang" slot="right"></van-icon>
        </van-nav-bar>
        <van-row class="main">
            <van-overlay :show="loadingState"></van-overlay>
            <van-loading v-if="loadingState" type="spinner" class="loading" vertical></van-loading>
            <van-row v-else>
                <van-row id="leaderBoard">
                    <van-col span="12" @click="setTypeData(1)">
                        {{$t("game.honorList")}}
                        <div class="triangle-up" v-if="typeData===1"></div>
                    </van-col>
                    <van-col span="12" @click="setTypeData(2)">
                        {{$t("game.friendsList")}}
                        <div class="triangle-up" v-if="typeData===2"></div>
                    </van-col>
                </van-row>
                <van-row class="leaderBoardList" v-if="gameScoreTopVO">
                    <van-col span="12">
                        <van-row>
                            <van-col span="8" class="leader_board_div">
                                <van-image v-if="gameScoreTopVO && gameScoreTopVO['rankId']===1" class="leader_board_img" :src="one"></van-image>
                                <van-image v-if="gameScoreTopVO && gameScoreTopVO['rankId']===2" class="leader_board_img" :src="two"></van-image>
                                <van-image v-if="gameScoreTopVO && gameScoreTopVO['rankId']===3" class="leader_board_img" :src="three"></van-image>
                                <span v-if="gameScoreTopVO && gameScoreTopVO['rankId']>3 || gameScoreTopVO['rankId']<1">
                                    {{gameScoreTopVO && gameScoreTopVO['rankId']>10 ? '10+' : gameScoreTopVO['rankId']}}
                                </span>
                            </van-col>
                            <van-col span="8" class="leader_board_div">
                                <van-image v-if="gameScoreTopVO['headPortraitUrl']" class="leader_board_image" :src="gameScoreTopVO['headPortraitUrl']"></van-image>
                                <van-image v-else class="leader_board_image" :src="defaultImg"></van-image>
                            </van-col>
                            <van-col span="8" class="leaderBoardListName">
                                {{$t("game.me")}}
                            </van-col>
                        </van-row>
                    </van-col>
                    <van-col span="12">
                        <van-row>
                            <van-col span="12">
                                {{gameScoreTopVO && gameScoreTopVO['maxGameScore'] ? gameScoreTopVO['maxGameScore'] : 0}}
                            </van-col>
                            <van-col span="12">
                                <van-button plain class="leader_board_btn" @click="play">Play</van-button>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
                <van-row class="space"></van-row>
                <van-row v-if="gameScoreTopVOList">
                    <van-row class="leaderBoardList" v-for="(item,index) of gameScoreTopVOList" :key="index">
                        <van-col span="16">
                            <van-row>
                                <van-col span="8" class="leader_board_div">
                                    <van-image v-if="item && item['rankId']===1" class="leader_board_img" :src="one"></van-image>
                                    <van-image v-if="item && item['rankId']===2" class="leader_board_img" :src="two"></van-image>
                                    <van-image v-if="item && item['rankId']===3" class="leader_board_img" :src="three"></van-image>
                                    <span v-if="item && item['rankId']>3 || item['rankId']<1">
                                    {{item && item['rankId']>10 ? '10+' : item['rankId']}}
                                </span>
                                </van-col>
                                <van-col span="8" class="leader_board_div">
                                    <van-image v-if="item['headPortraitUrl']" class="leader_board_image" :src="item['headPortraitUrl']"></van-image>
                                    <van-image v-else class="leader_board_image" :src="defaultImg"></van-image>
                                </van-col>
                                <van-col span="8" class="leaderBoardListName">
                                    {{item['phoneNumber'] && item['phoneNumber'].length>4 ? "****"+item['phoneNumber'].substring(item['phoneNumber'].length-4, item['phoneNumber'].length) : ""}}
                                </van-col>
                            </van-row>
                        </van-col>
                        <van-col span="8" class="maxGameScore">
                            <span v-if="item['rankId']==1" style="color:rgba(225,103,67,1)">
                                {{item['maxGameScore'] ? item['maxGameScore'] : 0}}
                            </span>
                            <span v-if="item['rankId']==2" style="color: rgba(225,138,67,1)">
                                {{item['maxGameScore'] ? item['maxGameScore'] : 0}}
                            </span>
                            <span v-if="item['rankId']==3" style="color: rgba(225,179,67,1)">
                                {{item['maxGameScore'] ? item['maxGameScore'] : 0}}
                            </span>
                            <span v-if="item['rankId']>3 || item['rankId']<1">
                                {{item['maxGameScore'] ? item['maxGameScore'] : 0}}
                            </span>
                        </van-col>
                    </van-row>
                </van-row>
            </van-row>
        </van-row>
        <share-pop class="admin-modal" ref="mychild" :editModal="editModal" :shareType="shareType" v-on:changeModal="changeModal"></share-pop>

    </div>
</template>

<script>
    import one from "@/assets/imgs/game/one.png"
    import two from "@/assets/imgs/game/two.png"
    import three from "@/assets/imgs/game/three.png"
    import defaultImg from "@/assets/imgs/game/gerenzhongxin.png"
    import api from '@/api/index'
    export default {
        name: "leader-board",
        data(){
            return{
                one,
                two,
                three,
                defaultImg,
                typeData:1,
                gameScoreTopVO:{},
                gameScoreTopVOList:{},
                loadingState:false,
                editModal:false,
                shareType:null,
            }
        },
        mounted(){
            this.getInfo();
            window.callBackFlutter=(data)=>{
                window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                let params={
                    gameId:1
                };
                this.getData(params);
            };
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            changeModal (param) {
                this.editModal = param;
            },
            onClickRight() {
                this.shareType="1";
                shareDialog.postMessage(this.shareType);
                // this.$bridge.gameShare();
            },
            setTypeData(data){
                this.typeData=data;
                let params={
                    gameId:1
                };
                if(data===2){
                    let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                    params['referrerId']=usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"];
                }
                this.getData(params);
            },
            play(){
                this.$route.push("pileWoodDetail");
            },
            getInfo(){
                getUserLoginInfo.postMessage("callBackFlutter");
                // this.take().then(data => {
                //     if(data){
                //         window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                //         let params={
                //             gameId:1
                //         };
                //         this.getData(params);
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
            getData(data){
                api.allGameScoreTop(data).then(res=>{
                    if (res.data.success) {
                        this.gameScoreTopVO=res.data.data['gameScoreTopVO'];
                        this.gameScoreTopVOList=res.data.data['gameScoreTopVOList'];
                    } else {
                        this.$notify(res.data.message);
                    }
                })
            },
        }
    }
</script>

<style lang="less">
    @import "../../assets/css/main";
    #app{
        background: #ffffff;
    }
    #leaderBoard{
        width: 100%;
        background-color: #FF0C00;
        color: #ffffff;
        font-size: 17px;
        line-height: 52.5px;
        text-align: center;
        .triangle-up{
            width:0;
            height:0;
            border-left:7.5px solid transparent;
            border-right:7.5px solid transparent;
            border-bottom:11.5px solid #ffffff;
            margin: -11.5px auto;
            position: relative;
        }
    }
    .leaderBoardList{
        color: #434242;
        font-size: 17px;
        line-height: 40px;
        padding-top: 10px;
        background-color: #ffffff;
        border-bottom: #F4F4F4 1px solid;
        text-align: center;
        .leaderBoardListName{
            text-align: left;
        }
        .leader_board_img{
            width: 28px;
            height: 40px;
        }
        .leader_board_image{
            width: 40px;
            height: 40px;
            border-radius: 40px;
        }
        .leader_board_btn{
            width: 54px;
            line-height: 24.5px;
            height: 24.5px;
            text-align: center;
            background-color: #FF0C00;
            color: #ffffff;
            border-radius: 24.5px;
        }
    }
    .space{
        height: 14px;
        background-color: #F4F4F4;
        border-bottom: 1px solid #dddddd;
        border-top: 1px solid #dddddd;
    }
    .maxGameScore{
        text-align: right;
        padding-right: 21px;
    }
</style>