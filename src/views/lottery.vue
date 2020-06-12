<template>
    <div class="lottery_back">
        <van-nav-bar
                :fixed="true"
                :title="$t('lottery.title')"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        >
            <van-icon class="iconfont" class-prefix="my-icon" name="fenxiang" slot="right"></van-icon>
        </van-nav-bar>
        <van-row class="main">
            <van-row>
                <van-image :src="heardImg" class="lotteryCol_img"></van-image>
            </van-row>

            <van-row class="lottery_main">
                <van-row class="lotteryNum">
                    <p>
                        {{$t("lottery.tip.start")}}
                        <span>{{lotteryNum}}</span>
                        {{$t("lottery.tip.end")}}
                    </p>
                </van-row>
                <van-row class="lottery_table">
                    <van-col span="8" class="lotteryCol">
                        <div :class="lotteryInfo===1 ? 'lotteryActive' : 'lotteryTab'">
                            <van-image class="lotteryCol_img" :src="listPrizePoolData && listPrizePoolData[0] &&listPrizePoolData[0]['prizeImg'] ? listPrizePoolData[0]['prizeImg'] : noImg" @click="clickInfo(listPrizePoolData,0)"></van-image>
                        </div>
                    </van-col>
                    <van-col span="8" class="lotteryCol">
                        <div :class="lotteryInfo===2 ? 'lotteryActive' : 'lotteryTab'">
                            <van-image class="lotteryCol_img" :src="listPrizePoolData && listPrizePoolData[1] &&listPrizePoolData[1]['prizeImg'] ? listPrizePoolData[1]['prizeImg'] : noImg" alt="" @click="clickInfo(listPrizePoolData,1)"></van-image>
                        </div>
                    </van-col>
                    <van-col span="8" class="lotteryCol">
                        <div :class="lotteryInfo===3 ? 'lotteryActive' : 'lotteryTab'">
                            <van-image class="lotteryCol_img" :src="listPrizePoolData && listPrizePoolData[2] &&listPrizePoolData[2]['prizeImg'] ? listPrizePoolData[2]['prizeImg'] : noImg" alt="" @click="clickInfo(listPrizePoolData,2)"></van-image>
                        </div>
                    </van-col>
                    <van-col span="8" class="lotteryCol">
                        <div :class="lotteryInfo===8 ? 'lotteryActive' : 'lotteryTab'">
                            <van-image class="lotteryCol_img" :src="listPrizePoolData && listPrizePoolData[7] &&listPrizePoolData[7]['prizeImg'] ? listPrizePoolData[7]['prizeImg'] : noImg" alt="" @click="clickInfo(listPrizePoolData,7)"></van-image>
                        </div>
                    </van-col>
                    <van-col span="8" class="lotteryCol">
                        <div class="lotteryTab">
                            <van-image :radius="10" class="lotteryCol_img" :src="startImg" @click="startGame"></van-image>
                        </div>
                    </van-col>
                    <van-col span="8" class="lotteryCol">
                        <div :class="lotteryInfo===4 ? 'lotteryActive' : 'lotteryTab'">
                            <van-image class="lotteryCol_img" :src="listPrizePoolData && listPrizePoolData[3] &&listPrizePoolData[3]['prizeImg'] ? listPrizePoolData[3]['prizeImg'] : noImg" alt="" @click="clickInfo(listPrizePoolData,3)"></van-image>
                        </div>
                    </van-col>
                    <van-col span="8" class="lotteryCol">
                        <div :class="lotteryInfo===7 ? 'lotteryActive' : 'lotteryTab'">
                            <van-image class="lotteryCol_img" :src="listPrizePoolData && listPrizePoolData[6] &&listPrizePoolData[6]['prizeImg'] ? listPrizePoolData[6]['prizeImg'] : noImg" alt="" @click="clickInfo(listPrizePoolData,6)"></van-image>
                        </div>
                    </van-col>
                    <van-col span="8" class="lotteryCol">
                        <div :class="lotteryInfo===6 ? 'lotteryActive' : 'lotteryTab'">
                            <van-image class="lotteryCol_img" :src="listPrizePoolData && listPrizePoolData[5] &&listPrizePoolData[5]['prizeImg'] ? listPrizePoolData[5]['prizeImg'] : noImg" alt="" @click="clickInfo(listPrizePoolData,5)"></van-image>
                        </div>
                    </van-col>
                    <van-col span="8" class="lotteryCol">
                        <div :class="lotteryInfo===5 ? 'lotteryActive' : 'lotteryTab'">
                            <van-image class="lotteryCol_img" :src="listPrizePoolData && listPrizePoolData[4] &&listPrizePoolData[4]['prizeImg'] ? listPrizePoolData[4]['prizeImg'] : noImg" alt="" @click="clickInfo(listPrizePoolData,4)"></van-image>
                        </div>
                    </van-col>
                </van-row>
                <van-button plain size="large" class="lottery_btn" @click="jumpPrize">{{$t('lottery.prize')}}</van-button>
                <van-button plain size="large" class="lottery_btn" @click="share('lottery_share_to_friend_click')">{{$t('lottery.share')}} + 1</van-button>
                <van-row class="ruleText">
                    <van-divider :style="{ color: '#ffffff', borderColor: '#ffffff', padding: '0 10px' , fontSize:'16px' }">
                        {{$t("lottery.lotteryRule")}}
                    </van-divider>
                    <p v-html="$t('lottery.rule.text2') + money + $t('lottery.rule.text3')"></p>
                    <p v-html="$t('lottery.rule.text4')"></p>
                </van-row>
                <van-row class="winnerText" v-if="lotteryData">
                    <van-divider :style="{ color: '#ffffff', borderColor: '#ffffff', padding: '0 10px' , fontSize:'16px' }">
                        {{$t("lottery.winners")}}
                    </van-divider>
                    <div id="box">
                        <van-row id="listInfo">
                            <van-row v-for="(item,index) of lotteryData" :key="`${index}_one_list`" class="lottery_main_list">
                                <van-row class="lottery_main_list_div">
                                    <van-col span="4" style="text-align: center">
                                        <van-image v-if="item && item['headPortraitUrl']" :src="item['headPortraitUrl']" class="lottery_main_list_img"></van-image>
                                        <van-image v-else  :src="defaultImg" class="lottery_main_list_img"></van-image>
                                    </van-col>
                                    <van-col span="11" class="two_td_div">
                                        <van-col span="24">{{item && item['phoneNumber'] ? item['phoneNumber'] : "" }}</van-col>
                                        <van-col span="24">{{item && item['createTimeStr'] ? item['createTimeStr'] : "" }}</van-col>
                                    </van-col>
                                    <van-col span="9" style="text-align: right;" class="prizeName">
                                        {{item && item['prizeName'] ? item['prizeName'] : "" }}
                                    </van-col>
                                </van-row>
                            </van-row>
                        </van-row>
                        <van-row id="listInfo2">
                            <van-row v-for="(item,index) of lotteryData1" :key="`${index}_two_list`" class="lottery_main_list">
                                <van-row class="lottery_main_list_div">
                                    <van-col span="4" style="text-align: center">
                                        <van-image v-if="item && item['headPortraitUrl']" :src="item['headPortraitUrl']" class="lottery_main_list_img"></van-image>
                                        <van-image v-else  :src="defaultImg" class="lottery_main_list_img"></van-image>
                                    </van-col>
                                    <van-col span="11" class="two_td_div">
                                        <van-col span="24">{{item && item['phoneNumber'] ? item['phoneNumber'] : "" }}</van-col>
                                        <van-col span="24">{{item && item['createTimeStr'] ? item['createTimeStr'] : "" }}</van-col>
                                    </van-col>
                                    <van-col span="9" style="text-align: right;" class="prizeName">
                                        {{item && item['prizeName'] ? item['prizeName'] : "" }}
                                    </van-col>
                                </van-row>

                            </van-row>
                        </van-row>



                       <!-- <ul class="c-list-unstyled" id="listInfo2">
                           <li  v-for="(item,index) of lotteryData1" :key="`${index}_two_list`">
                               <table style="position: relative">
                                   <tr>
                                       <td style="position: relative">
                                           <van-image v-if="item && item['headPortraitUrl']" :src="item['headPortraitUrl']"></van-image>
                                           <van-image v-else  :src="defaultImg"></van-image>
                                       </td>
                                       <td style="width: 60%">
                                           <div class="two_td_div">
                                               <p>{{item && item['phoneNumber'] ? item['phoneNumber'] : "" }}</p>
                                               <p>{{item && item['createTimeStr'] ? item['createTimeStr'] : "" }}</p>
                                           </div>

                                       </td>
                                       <td style="text-align: right;">
                                           <p>{{item && item['prizeName'] ? item['prizeName'] : "" }}</p>
                                       </td>
                                   </tr>
                               </table>
                           </li>
                       </ul> -->
                    </div>
                </van-row>
            </van-row>

        </van-row>
        <share-pop class="admin-modal" ref="mychild" :editModal="editModal" :shareType="shareType" v-on:changeModal="changeModal"></share-pop>

    </div>
</template>

<script>
    import heardImg from "@/assets/imgs/11.png"
    import noImg from "@/assets/imgs/no.png"
    import startImg from "@/assets/imgs/start.png"
    import defaultImg from "@/assets/imgs/game/gerenzhongxin.png"
    import api from '@/api/index'
    export default {
        name: "lottery",
        data(){
            return{
                defaultImg,
                heardImg,
                noImg,
                startImg,
                editModal:false,
                shareType:null,
                lotteryNum:0,
                lotteryInfo:null,
                lotteryData : [],
                lotteryData1 : [],
                listPrizePoolData : [],
                userInfoData: {},
                msgList: [],
                index : 0,           //当前亮区位置
                prevIndex: 0,          //前一位置
                Speed: 300,           //初始速度
                Time : null,           //定义对象
                arr : [1,2,3,4,5,6,7,8],       //初始化数组(横列，竖列)
                // tb = document.getElementById("tb");    //获取表格对象
                cycle : 0,           //转动圈数
                flag : false,           //结束转动标志
                quick : 0,           //加速
                stateBtn : false,
                lotteryType:{},
                lotteryTypeNum : 0,
                lotteryActivityData : {},
                num:0,
                timer:null,
                money:null
            }
        },
        mounted() {
            setInterval(()=> {
                this.getLotteryData()
            },60000);
            this.getInfo();
            window.callBackFlutter=(data)=>{
                if(data){
                    window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                    this.getDictionaryData();
                    this.getMemberByUserIdData();
                    this.getLotteryData();
                    this.getListPrizePool();
                    this.getLotteryTypeData();
                    this.getIntegralLotteryNumByUidData();
                }
            }
        },
        methods:{
            onClickLeft(){
                goBack.postMessage("goBack");
                // this.$bridge.goBack();
            },
            onClickRight(){
                this.shareIcon('lottery_share_icon_click');
            },
            getInfo(){
                getUserLoginInfo.postMessage("callBackFlutter");
                // this.take().then(data => {
                //     console.log(data);
                //     if(data){
                //         window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                //         this.getDictionaryData();
                //         this.getMemberByUserIdData();
                //         this.getLotteryData();
                //         this.getListPrizePool();
                //         this.getLotteryTypeData();
                //         this.getIntegralLotteryNumByUidData();
                //     }
                // });
            },
            getDictionaryData(){
                let data={
                    language: 'id_ID',
                    type:'INVITE_AWARD',
                    code:'ina_invite_amount'
                };
                api.getDictionary(data).then(res=>{
                    if (res.data.success) {
                        this.money=res.data.data[0]['value'];
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            getMemberByUserIdData(){
                api.getMemberByUserId().then(res=>{
                    if (res.data.success) {
                        this.userInfoData=res.data.data;
                        this.lotteryNum=res.data.data['lotteryNum'];
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            getIntegralLotteryNumByUidData(){
                api.getIntegralLotteryNumByUid().then(res=>{
                    if (res.data.success) {
                        this.lotteryTypeNum=Number(res.data.data);
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            getLotteryTypeData(){
                api.getLotteryType().then(res=>{
                    if (res.data.success) {
                        this.lotteryType=res.data.data;
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            getListPrizePool(){
                api.listPrizePool().then(res=>{
                    if (res.data.success) {
                        this.listPrizePoolData=[];
                        let data=res.data.data;
                        if(res.data.data['length']>0){
                            this.arr.forEach(v=>{
                                let obj=data.filter(item=>{
                                    return item['positionId']===v;
                                });
                                let info=obj && obj[0] ? obj[0] : {};
                                this.listPrizePoolData.push(info);
                            });
                        }
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            take(){
                return new Promise((resolve,reject)=>{
                    this.$bridge["getLoginInfo"](null, res => {
                        resolve(JSON.parse(res));
                    });
                });
            },
            changeModal (param) {
                this.editModal = param;
            },
            share(name){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data={
                    eventName:name,
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                };
                api.event(data).then(res=>{
                    if (res.data.success) {
                        this.$dialog.confirm({
                            title: this.$t("lottery.shareAlert.title"),
                            message: this.$t("lottery.shareAlert.msg") + this.money + this.$t("lottery.shareAlert.msg1"),
                            cancelButtonText: this.$t("lottery.tip.cancel"),
                            confirmButtonText: this.$t("lottery.tip.ok"),
                            beforeClose:((action, done)=>{
                                if (action === 'confirm') {
                                    this.shareType="2";
                                    shareDialog.postMessage(this.shareType);
                                    done();
                                    // this.$bridge.shareDialog(1)
                                } else {
                                    done();
                                }
                            })
                        });
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            shareIcon(name){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data={
                    eventName:name,
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                };
                api.event(data).then(res=>{
                    if (res.data.success) {
                        this.shareType="2";
                        shareDialog.postMessage(this.shareType);
                        // this.$bridge.shareDialog(1)
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            clickInfo(data,index){
                if(data && data[index]){
                    this.$dialog.confirm({
                        title: this.$t("lottery.prizeDescription.title"),
                        message: data[index]['prizeDesc'],
                        showCancelButton:false,
                        confirmButtonText: this.$t("lottery.prizeDescription.btn")
                    });
                }else{
                    this.$dialog.confirm({
                        title: this.$t("lottery.prizeDescription.title"),
                        message: this.$t("lottery.prizeDescription.none"),
                        showCancelButton:false,
                        confirmButtonText: this.$t("lottery.prizeDescription.btn")
                    });
                }
            },
            startGame(){
                // this.begin();
                if(this.lotteryNum<1){
                    if(this.lotteryType['lotteryType']){
                        //扣除积分弹窗
                        if(this.lotteryTypeNum <this.lotteryType['everydayLotteryMostNum']){
                            if(this.userInfoData['currentIntegral']>this.lotteryType['everyConsume']){
                                this.$dialog.confirm({
                                    title: this.$t("lottery.deduction.title"),
                                    message: this.$t("lottery.deduction.msg1") + this.lotteryType['everyConsume'] + this.$t("lottery.deduction.msg2"),
                                    cancelButtonText: this.$t("lottery.tip.cancel"),
                                    confirmButtonText: this.$t("lottery.deduction.ok1") + this.lotteryType['everyConsume'] + this.$t("lottery.deduction.ok2"),
                                    beforeClose:((action, done)=>{
                                        if (action === 'confirm') {
                                            this.getLottery();
                                            done();
                                        } else {
                                            done();
                                        }
                                    })
                                });
                            }else{
                                this.$dialog.confirm({
                                    title: this.$t("lottery.shareAlert.title"),
                                    message: this.$t("lottery.shareAlert.msg") + this.money + this.$t("lottery.deduction.msg1"),
                                    cancelButtonText: this.$t("lottery.tip.cancel"),
                                    confirmButtonText: this.$t("lottery.tip.ok"),
                                    beforeClose:((action, done)=>{
                                        if (action === 'confirm') {
                                            this.shareType="2";
                                            shareDialog.postMessage(this.shareType);
                                            // this.$bridge.shareDialog(1);
                                            done();
                                        } else {
                                            done();
                                        }
                                    })
                                });
                            }
                        }else{
                            this.$dialog.confirm({
                                title: this.$t("lottery.tip.prompt"),
                                message: this.$t("lottery.tip.limit"),
                                cancelButtonText: this.$t("lottery.tip.cancel"),
                                confirmButtonText: this.$t("lottery.tip.ok")
                            });
                            return;
                        }
                        // }
                        // });
                    }else{
                        this.$dialog.confirm({
                            title: this.$t("lottery.shareAlert.title"),
                            message: this.$t("lottery.shareAlert.msg") + this.money + this.$t("lottery.deduction.msg1"),
                            cancelButtonText: this.$t("lottery.tip.cancel"),
                            confirmButtonText: this.$t("lottery.tip.ok"),
                            beforeClose:((action, done)=>{
                                if (action === 'confirm') {
                                    this.shareType="2";
                                    shareDialog.postMessage(this.shareType);
                                    // this.$bridge.shareDialog(1);
                                    done();
                                } else {
                                    done();
                                }
                            })
                        });
                        return;
                    }
                }else{
                    this.getLottery();
                }
            },
            begin(){
                this.lotteryInfo=null;
                this.stateBtn=true;//
                clearInterval(this.Time); //停止循环执行Stat函数
                this.cycle=0;//默认转动圈数为0
                this.flag=false;//默认不转动
                this.Time = setInterval(this.Star,this.Speed);//循环执行Star
            },
            Star(num){
                //跑马灯变速
                if(this.flag==false){
                    //走五格开始加速
                    if(this.quick==5){
                        clearInterval(this.Time);
                        this.Speed=50;
                        this.Time=setInterval(this.Star,this.Speed);
                    }
                    //跑N圈减速
                    if(this.cycle>=5){
                        clearInterval(this.Time);
                        this.Speed=300;
                        this.flag=true;       //触发结束
                        this.Time=setInterval(this.Star,this.Speed);
                    }
                }
                if(this.index>=this.arr['length']){
                    this.index=0;
                    this.cycle++;
                }

                this.lotteryInfo=this.arr[this.index];
                // tb.rows[arr[index][0]].cells[arr[index][1]].className="playcurr";//给表格外圈加样式
                if(this.index>0)
                    this.prevIndex=this.index-1;
                else{
                    this.prevIndex=this.arr.length-1;
                }
                // this.lotteryInfo=this.arr[this.index];
                // tb.rows[arr[prevIndex][0]].cells[arr[prevIndex][1]].className="playnormal";//给表格外圈加样式
                this.index++;
                this.quick++;
                if(this.lotteryActivityData['data'] && this.lotteryActivityData['data']['lotteryNumUpperLimit']===true){
                    this.quick=0;
                    clearInterval(this.Time);
                    this.index=0;
                    this.stateBtn=false;
                    this.$dialog.confirm({
                        title: this.$t("lottery.success.title"),
                        message: this.lotteryActivityData['data']['customMessage'],
                        showCancelButton:false,
                        confirmButtonText: this.$t("lottery.prizeDescription.btn"),
                        beforeClose:((action, done)=>{
                            if (action === 'confirm') {
                                this.getInfo();
                                done();
                            } else {
                                done();
                            }
                        })
                    });
                }
                //结束转动并选中号码
                if(this.lotteryActivityData['data'] && this.lotteryActivityData['data']['positionId']){
                    if(this.flag===true &&this.cycle>=5&& this.index===parseInt(this.lotteryActivityData['data']['positionId'])){
                        this.quick=0;
                        clearInterval(this.Time);
                        this.index=0;
                        this.stateBtn=false;
                        if(this.lotteryActivityData['data']['broughtOut']===true){
                            this.$dialog.confirm({
                                title: this.$t("lottery.success.title"),
                                message: this.lotteryActivityData['data']['customMessage'],
                                showCancelButton:false,
                                confirmButtonText: this.$t("lottery.prizeDescription.btn"),
                                beforeClose:((action, done)=>{
                                    if (action === 'confirm') {
                                        this.getInfo();
                                        done();
                                    } else {
                                        done();
                                    }
                                })
                            });
                        }else{
                            this.$dialog.confirm({
                                title: this.$t("lottery.success.title"),
                                message: this.lotteryActivityData['data']['notify'],
                                showCancelButton:false,
                                confirmButtonText: this.$t("lottery.prizeDescription.btn"),
                                beforeClose:((action, done)=>{
                                    if (action === 'confirm') {
                                        this.getInfo();
                                        done();
                                    } else {
                                        done();
                                    }
                                })
                            });
                        }
                    }
                }
            },
            jumpPrize(){
                this.$router.push("prize");
            },
            getLottery(){
                api.lottery().then(res=>{
                    if (res.data.success) {
                        this.lotteryActivityData=res.data;
                        this.begin();
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            getLotteryData(){
                api.listPrizeHistory().then(res=>{
                    if (res.data.success) {
                        if(this.num===0){
                            this.num++;
                            this.lotteryData=res.data.data;
                            this.lotteryData1=res.data.data;
                            let box=document.getElementById("box");
                            let aa=document.getElementById("listInfo");
                            setTimeout(()=>{
                                box.scrollTop = aa.scrollHeight;
                            },0);
                        }else{
                            this.lotteryData=res.data.data;
                            this.timer=setInterval(()=>{
                                this.roll();
                            },5)
                        }
                    } else {
                        this.$notify(res.data.message);
                    }
                })
            },
            roll(){
                let box=document.getElementById("box");
                let aa=document.getElementById("listInfo");
                if (box.scrollTop <=0) {
                    this.lotteryData1=this.lotteryData;
                    box.scrollTop=aa.scrollHeight+10;
                    clearInterval(this.timer);
                } else {
                    box.scrollTop--;
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/main";
    .lottery_back{
        overflow-y: auto;
        background: url('../assets/imgs/bg.png') no-repeat;
        background-size: cover;
    }
    .lotteryCol_img{
        width: 100%;
        height: 100%;
    }
    .lottery_main{
        margin: 0 16.5px;
        .lotteryNum{
            margin-top: 30.5px;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
            p{
                span{
                    color: #FC8E3C;
                }
            }
        }
        .lottery_table{
            border: 18.5px solid transparent;
            border-radius: 30px;
            border-image: url('../assets/imgs/choujiang.png') 35 35 round;
            background-color: #EDDDA1;
            margin-bottom: 25.5px;
            .lotteryCol{
                padding: 0;
                margin: 0;
                height: 75px;
            }
        }
        .lotteryActive{
            height: 75px;
            width: 100%;
            padding: 2px;
            box-sizing: border-box;
            border: 2px solid #FF0C00;
        }
        .lotteryTab{
            height: 75px;
            width: 100%;
            box-sizing: border-box;
            border: 2px solid #EDDDA1;
        }
        .startImg{
            margin: 2px auto;
            width: 96%;
            height: 100%;
        }
        .lottery_btn{
            margin-top: 15px;
            background-color: #FF0C00;
            border-radius: 5px;
            border: 1px solid #FF0C00;
            color: #ffffff;
            height: 45px;
            line-height: 45px;
        }
        .ruleText{
            margin-top: 30.5px;
            border: 5px #D9362E solid;
            border-radius: 5px;
            background-color: #FF0C00;
            color: #ffffff;
            padding: 32.5px;
            p{
                word-break:break-all;
                font-size: 14px;
                line-height: 21px;
                margin-top: 39px;
            }
        }
        .winnerText{
            margin-top: 30.5px;
            margin-bottom: 30.5px;
            border: 5px #D9362E solid;
            border-radius: 5px;
            background-color: #FF0C00;
            color: #ffffff;
            padding: 32.5px 22px;
        }
        #box,#listInfo,#listInfo2{
            height: 400px;
        }
        #box{
            overflow-y: hidden;
        }
        #listInfo2 .lottery_main_list,#listInfo .lottery_main_list{
            height: 40px;
            .lottery_main_list_img{
                width: 35px;
                height: 35px;
            }
            .two_td_div{
                padding-left: 5px;
                font-size: 15px;
                color: #ffffff;
                div:last-child{
                    font-size: 12px;
                    padding-left: 7px;
                    line-height: 15px;
                }
            }
            .prizeName{
                line-height: 35px;
            }
        }
    }

</style>