<template>
    <div>
        <van-nav-bar
                :fixed="true"
                :title="$t('helpCenter.title')"
                left-arrow
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-row class="main">
            <van-overlay :show="loadingState"></van-overlay>
            <van-loading v-if="loadingState" type="spinner" class="loading"  vertical></van-loading>
            <van-row v-else>
                <van-row class="typeTab">
                    <van-col span="10" offset="1">
                        <van-button
                                plain
                                size="large"
                                class="c-color-red"
                                @click="jumpPhone()"
                        >
                            {{$t('helpCenter.phone')}}
                        </van-button>
                    </van-col>
                    <van-col span="10" offset="2">
                        <van-button
                                plain
                                size="large"
                                class="c-color-red"
                                @click="feedback()"
                        >
                            {{$t('helpCenter.feedback')}}
                        </van-button>
                    </van-col>
                </van-row>
                <van-row>
                    <div class="showBody">
                <table class="tab_title">
                    <tr>
                        <td>
                            <div :class="type==1 ? 'active' : ''" @click="change(1)">{{$t('helpCenter.bill')}}</div>
                        </td>
                        <td>
                            <div :class="type==2 ? 'active' : ''" @click="change(2)">{{$t('helpCenter.account')}}</div>
                        </td>
                        <td>
                            <div :class="type==3 ? 'active' : ''" @click="change(3)">{{$t('helpCenter.loan')}}</div>
                        </td>
                    </tr>
                </table>
                <div class="helpMain">
                    <div  class="helpTitle">
                        <table v-for="(item,i) of tabData" :key="i" cellspacing=0>
                            <tr class="whiteBackgrand">
                                <td @click="setHidden(i)">
                                    <p class="titlecss">{{i+1+"、 "+item['textQuestion']}}</p>
                                </td>
                                <td class="mainaskfather">
                                    <van-icon name="arrow" v-if="check_item_index(i)" @click="setHidden(i)"></van-icon>
                                    <van-icon name="arrow-down" v-if="!check_item_index(i)" @click="setHidden(i)"></van-icon>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="textAnswer" :hidden="check_item_index(i)">
                                    {{item['textAnswer']}}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div v-if="!tabData||tabData.length===0" class="nomore">
                        <img :src="img1" width="197" height="139" class="nomoreimg">
                        <p class="nomoretext">{{$t("helpCenter.none")}}</p>
                    </div>
                </div>
            </div>
                </van-row>
            </van-row>
        </van-row>
    </div>
</template>

<script>
    import img1 from '@/assets/imgs/helppic.png'
    import api from '@/api/index'
    export default {
        name: "help-center",
        data(){
            return{
                img1:img1,
                tabData:[],
                type:1,
                state:[],
                loadingState:true
            }
        },
        mounted(){
            window.callBackFlutter=(data)=>{
                window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                this.getData(1);
            };
            this.getInfo();
        },
        methods: {
            onClickLeft(){
                // this.$bridge.goBack();
                goBack.postMessage("goBack");
            },
            change(data){
                this.type=data;
                this.getData(data);
                this.state=[];
            },
            getInfo(){
                getUserLoginInfo.postMessage("callBackFlutter");
                // this.take().then(data => {
                //     if(data){
                //         window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                //         this.getData(1);
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
                let params={
                    textFlag :data
                };
                api.helpCenter(params).then(res =>{
                    this.loadingState=false;
                    if(res.success === false){
                        this.$notify(res.message);
                    }else{
                        this.tabData=res.data.data;
                        // console.log(res.data);
                    }
                })
            },
            setHidden(data){
                let num = this.state.indexOf(data);
                if (num > -1) {
                    this.state.splice(num, 1);
                }else{
                    this.state.push(data)
                }
            },
            jumpPhone(){
                Call.postMessage("Call");
                // this.$bridge['callCustomerService']();
            },
            check_item_index(index){
                if(this.state.indexOf(index)> -1){
                    return true;
                }else{
                    return false;
                }
            },
            feedback(){
                this.$router.push("feedback")
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/main";
    /**{*/
    /*    margin: 0;padding: 0;*/
    /*}*/
    .showBody{
        display: flex;
        height: 100%;
        flex: 1;
        flex-flow: column;
    }
    .whiteBackgrand{
        background: #FFFFFF;
    }
    .titlecss{
        line-height: 30px;
    }
    .mainaskfather{
        width: 10%;
        text-align: center;
        color:#FF0C00;
    }
    .nomore{
        text-align: center;
        padding-top: 48px;
        .nomoreimg{
            margin: 0 auto;
        }
        .nomoretext{
            padding-left: 18px;
            padding-right: 18px;
            margin-top: 38px;
            color: #999999;
            font-size: 15px;
            line-height: 18px;
        }
    }
    .helpMain{
        margin: 0;
        flex-grow: 1;
        order: 1;
        overflow:auto;
        -webkit-overflow-scrolling: touch;
    }
    .tab_title{
        width: 100%;
        font-size: 13px;
        border-bottom: 1px #E0E0E0 solid;
        text-align: center;
        background:#FFFFFF;
        tr{
            margin: 0;
            td{
                line-height: 20px;
                padding: 12px 0;
                height: 44px;
                box-sizing:border-box;
                div{
                    margin:0;
                    padding:0;
                }
            }
        }
    }
    .active{
        color: #FF0C00;
        border-bottom: 3px solid #FF0C00;
    }
    .helpTitle{
        margin: 0;
        width: 100%;
        table{
            margin: 0;
            width: 100%;
            tr{
                .textAnswer{
                    padding-left: 8px;
                    padding-right: 8px;
                    color: #999999;
                    background: #f2f2f2;
                    font-size:15px;
                    line-height: 30px;
                }
                td{
                    border-bottom: 1px #E0E0E0 solid;
                    text-align: left;
                    font-size: 14px;
                    line-height: 52px;
                    color:#666666 ;
                    p{
                        padding-left: 18px;
                    }
                }
            }
        }

    }
    .helpButton{
        margin-bottom: 1px;
        background: #ffffff;
        color: #FF0C00;
        height: 42px;
        order: 2;
        display:-moz-flex;
        display:-webkit-flex;
        display:table;
        text-align: center;
        .but{
            flex: 1;
            font-size: 15px;
            width: 50%;
            display: table-cell;
            img{
                width: 26px;
                height: 26px;
                vertical-align: middle;
            }
            span{
                line-height: 42px;
            }
        }
    }
    table{
        table-layout:fixed;
    }
    .van-nav-bar{
        background-color:#FF0C00;
    }
    .c-color-red{
        color: #ffffff;
        border-radius: 10px;
        background:#FF0C00 !important;
    }
    .button {
        width: 94%;
        margin-top: 14px;
        margin-left: 3%;
        background-color: #FF0C00;
        color: white;
        font-size: 18px;
        line-height: 52px;
        border-radius: 5px;
        margin-bottom: 18px;
    }
    .typeTab{
        background-color: #F4F4F4;
        padding: 10px 0;
    }
</style>