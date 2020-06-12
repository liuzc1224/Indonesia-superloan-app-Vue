<template>
    <div>
        <van-nav-bar
                :fixed="true"
                :title="$t('game.title')"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        >
            <van-icon class="iconfont" class-prefix="my-icon" name="fenxiang" slot="right"></van-icon>
        </van-nav-bar>
        <van-row class="main">
            <van-overlay :show="loadingState"></van-overlay>
            <van-loading v-if="loadingState" type="spinner" class="loading"  vertical></van-loading>
            <van-row v-else>
                <van-row>
                    <van-image :src="header" width="100%"></van-image>
                    <div class="game_list_header">
                        <span>{{ num }}</span>
                        <van-image :src="jiFen" class="jiFen"></van-image>
                        <p class="text">{{$t('game.cumulativePoints')}}</p>
                    </div>
                </van-row>
                <van-row class="game_list_main">
                    <van-button round @click="play()">PLAY</van-button>
                    <p>
                        {{$t('game.pileWood')}}
                    </p>
                    <p>
                        {{$t('game.slogan')}}
                    </p>
                </van-row>
                <van-row class="game_list_footer">
                    <p>
                        {{$t('game.more')}} <span @click="copy()">{{$t('game.gaZone')}}</span>
                    </p>
                </van-row>
            </van-row>

        </van-row>
    </div>
</template>

<script>
    import header from "@/assets/imgs/game/header.png"
    import jiFen from "@/assets/imgs/game/jifen.png"
    import api from '@/api/index'
    export default {
        name: "game-list",
        data(){
            return{
                num:0,
                header,
                jiFen,
                loadingState:true,
            }
        },
        mounted(){
            this.getInfo();
            window.callBackFlutter=(data)=>{
                window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                this.getNum();
            };
        },
        methods:{
            onClickLeft() {
                goBack.postMessage("goBack");
                // this.$bridge.goBack();
            },
            onClickRight(){
                shareDialog.postMessage("1");
                // this.$bridge.gameShare();
            },
            play(){
                this.$router.push("pileWoodDetail");
            },
            copy(){
                let str="https://www.skyonlinegame.com/";
                let save = function (e){
                    e.clipboardData.setData('text/plain',str);//下面会说到clipboardData对象
                    e.preventDefault();//阻止默认行为
                };
                document.addEventListener('copy',save);
                document.execCommand("copy");//使文档处于可编辑状态，否则无效
                this.$dialog.confirm({
                    title: this.$t("game.alert.title"),
                    message: this.$t("game.alert.msg"),
                    showCancelButton: false,
                    confirmButtonText: this.$t("game.alert.btn")
                });
            },
            getInfo(){
                getUserLoginInfo.postMessage("callBackFlutter");
                // this.take().then(data => {
                //     if(data){
                //         window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                //         this.getNum();
                //     }
                // });
            },
            // take(){
                // return new Promise((resolve,reject)=>{
                //     this.$bridge["getLoginInfo"](null, res => {
                //         resolve(JSON.parse(res));
                //     });
                // });
            // },
            getNum(){
                api.getGameTotalIntegral().then(res => {
                    this.loadingState=false;
                    if (res.data.success) {
                        this.num=res.data.data+'' ? res.data.data+'' : '0';
                    } else {
                        this.$notify(res.data.message);
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/css/main";
    #app{
        background-color: #eeeeee;
    }
    .game_list_header{
        position: absolute;
        font-size: 36px;
        color: #ffffff;
        top: 78.5px;
        margin-left: 40.5px;
        text-align: left;
        .jiFen{
            margin-left: 9.5px;
            width: 16px;
        }
        .text{
            font-size: 15px;
            margin-top: 22.5px;
            opacity: 0.8
        }
    }
    .game_list_main{
        margin-top: 36.5px;
        margin-left: 16.5px;
        margin-right: 13px;
        padding:16.5px;
        background-color:#FFCDCE;
        border-radius: 5px;
        height: 69px;
        button{
            position: absolute;
            float: right;
            right:27px;
            margin-top:20px;
            color: #ffffff;
            background-color: #FF0C00;
            width: 75px;
            height: 29px;
            font-size: 15px;
            line-height: 15px;
            border:none;
        }
        p:first-child{
            font-size: 15px;
            color:#434242
        }
        p:last-child{
            font-size: 12px;
            color: #999999;
            margin-top: 6px;
            padding-right: 80px;
        }
    }
    .game_list_footer{
        p{
            margin-top: 14px;
            font-size: 13px;
            color: #999999;
            margin-left: 19.5px;
        }
        span{
            color: #0088FF
        }
    }
</style>