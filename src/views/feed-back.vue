<template>
    <div>
        <van-nav-bar
            :fixed="true"
            :title="$t('feedback.title')"
            left-arrow
            @click-left="onClickLeft"
        ></van-nav-bar>
        <van-row class="main">

            <van-row>
                <div class="tip">
                    <van-image :src="msg_icon" class="msg_icon"></van-image>
                    {{$t('feedback.tip')}}
                </div>
            </van-row>
            <van-row class="gap"></van-row>
            <van-row class="text">
                <div class="title">
                    {{$t('feedback.theme')}}
                    <span>{{inputTitle && inputTitle.length ? inputTitle.length+"/100" : "0/100"}}</span>
                </div>
            </van-row>
            <van-row>
                <van-field
                        v-model="inputTitle"
                        type="textarea"
                        :placeholder="$t('feedback.enter')"
                        rows="2"
                        maxlength="100"
                        autosize
                        v-on:blur="blurFunction"
                ></van-field>
            </van-row>
            <van-row class="gap"></van-row>
            <van-row class="text">
                <div class="title">
                    {{$t('feedback.content')}}
                    <span>{{inputValue && inputValue.length ? inputValue.length+"/500" : "0/500"}}</span>
                </div>
            </van-row>
            <van-row>
                <van-field
                        v-model="inputValue"
                        type="textarea"
                        :placeholder="$t('feedback.enter')"
                        rows="4"
                        maxlength="500"
                        autosize
                        v-on:blur="blurFunction"
                ></van-field>
            </van-row>
            <van-row class="gap"></van-row>
            <van-row class="text">
                <div class="title">
                    {{$t('feedback.image')}}
                    <span>{{imgData.length ? imgData.length+"/6" : "0/6"}}</span>
                </div>
            </van-row>
            <van-row class="feedback_img">
                <div class="feedback_item" v-for="(img,index) of imgData" :key="index">
                    <div class="img">
                        <van-icon name="close" class="feedback_item_close" @click="imgRemove(img)"></van-icon>
                        <van-image class="feedback_item_img" :src="img" @click="imgClick(index)"></van-image>
                    </div>
                </div>
                <div class="feedback_item" v-if="imgData.length < 6" @click="add()">
                    <div class="add">
                        <van-icon name="plus" class="feedback_icon"></van-icon><br />
                        {{$t('feedback.add')}}
                    </div>
                </div>
            </van-row>
            <van-row class="btn">
                <van-button round type="info" class="feedback_btn" @click="sub" :loading ="loading">{{$t('feedback.submit')}}</van-button>
            </van-row>
<!--            <van-popup v-model="show" round>-->
<!--                <div class="popDiv">-->
<!--                    <van-icon :name="iconName" class="delete"></van-icon>-->
<!--                    <p>{{popText}}</p>-->
<!--                </div>-->
<!--            </van-popup>-->
            <van-image-preview
                    v-model="show"
                    :images="imgData ? imgData : ''"
                    :showIndex="false"
                    :startPosition="imgIndex"
            ></van-image-preview>
        </van-row>
    </div>

</template>

<script>
    import msg_icon from "@/assets/imgs/msg_icon.png"
    import api from '@/api/index'
    export default {
        name: "feed-back",
        data(){
            return{
                msg_icon,
                iconName:null,
                show:false,
                popText:null,
                loading:false,
                inputTitle:null,
                inputValue:null,
                stateBtn:false,
                imgData:[],
                imgIndex:null
            }
        },
        mounted(){
            this.loading=false;
            window.callBackGallery=(data)=>{
                if(data){
                    const base64 = "data:image/jpeg;base64," + data['imageBase64'];
                    console.log(this.imgData.indexOf(base64));
                    if(this.imgData.indexOf(base64)===-1){
                        this.imgData.push(base64);
                        console.log(this.imgData)
                    }
                }
            };
        },
        methods:{
            onClickLeft() {
                // this.$bridge.goBack();
                this.$router.go(-1);
            },
            blurFunction(){
                console.log("656");
                closeFocus.postMessage("closeFocus");
            },
            sub(){
                let _this=this;
                this.loading=true;
                if(!this.inputTitle){
                    this.$notify({
                        type: 'warning',
                        message: _this.$t('feedback.themeTip')
                    });
                    this.loading=false;
                    return;
                }
                if(!this.inputValue){
                    this.$notify({
                        type: 'warning',
                        message: _this.$t('feedback.contentTip')
                    });
                    this.loading=false;
                    return;
                }
                let fromData=new FormData();
                if(this.imgData.length>0){
                    this.imgData.forEach((item)=>{
                        fromData.append('opinionImageList',this.convertBase64UrlToBlob(item));
                    });
                }
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let id=usrInfo["id"];
                fromData.append("opinionTheme",this.inputTitle);
                fromData.append("userId",id);
                fromData.append("opinionContent",this.inputValue);
                let data={
                    eventName:"submit_opinion",
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                };
                api.event(data).then(res => {
                    if (res.data.success) {
                        api.feedBack(fromData).then(res => {
                            this.loading=false;
                            if (res.data.success) {
                                this.$toast.success({
                                    message: this.$t('feedback.success'),
                                    icon: 'checked',
                                    mask: 'true',
                                    duration: '2000'
                                });
                                let time=setTimeout(()=>{
                                    goBack.postMessage("goBack");
                                    // this.$bridge.goBack();
                                },1000)
                            } else {
                                this.$toast.success({
                                    message: this.$t('feedback.failure'),
                                    icon: 'clear',
                                    mask: 'true',
                                    duration: '2000'
                                });
                                let time=setTimeout(()=>{
                                    goBack.postMessage("goBack");
                                    // this.$bridge.goBack();
                                },1000)
                            }
                        }).catch(err=>{
                            this.loading=false;
                        });
                    } else {
                        this.$notify(res.data.message);
                    }
                });

            },
            imgRemove(data){
                this.imgData = this.imgData.filter(function(val){
                    return val!==data;
                });
            },
            imgClick(data){
              this.show=true;
              this.imgIndex=data;
            },
            add(){
                getGallery.postMessage("callBackGallery");
                // this.take().then(data => {
                //     console.log("照片回调----imgchange---", data);
                //     if(data && data['imageBase64']){
                //         const base64 = "data:image/jpeg;base64," + data['imageBase64'];
                //         console.log(this.imgData.indexOf(base64));
                //         if(this.imgData.indexOf(base64)===-1){
                //             this.imgData.push(base64);
                //             console.log(this.imgData)
                //         }
                //     }
                // });
            },
            take(){
                getGallery.postMessage("callBackGallery");
                // return new Promise((resolve,reject)=>{
                    // this.$bridge["getGallery"](null, res => {
                    //     resolve(JSON.parse(res));
                    // });
                // });
            },
            convertBase64UrlToBlob(urlData){
                let bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
                //处理异常,将ascii码小于0的转换为大于0
                let ab = new ArrayBuffer(bytes.length);
                let ia = new Uint8Array(ab);
                for (let i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob( [ab] , {type : 'image/png'});
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/main";
    #app{
        background: #EEEEEE;
    }
    .main{
        height: 100%;
        width: 100%;
    }
    .tip{
        background-color: #FFEED6;
        color: #999999;
        font-size: 13px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        .msg_icon{
            width: 17.5px;
            vertical-align: middle;
        }
    }
    .gap{
        height: 10px;
    }
    .text{
        background-color: #ffffff;
        padding: 0 15px;
        color: #494951;
        .title{
            font-size: 15px;
            height: 43px;
            line-height: 43px;
            border-bottom: 1px solid #C7C7C7;
            span{
                color: #999999;
                float: right;
            }
        }
    }
    .btn{
        padding: 31px 15px 0 15px;
        background: #EEEEEE;
        .feedback_btn{
            border-color: #FF0C00;
        }

    }
    .van-popup .popDiv{
        padding-top: 30px;
        width: 195px;
        background-color: #ffffff;
        text-align: center;
        .van-icon{
            font-size: 80px;
            color: #FF0C00;
        }
        p{
            font-size: 20px;
        }
    }
    .feedback_img{
        padding: 5px 14px;
        position: relative;
        background-color: #ffffff;
        .feedback_item{
            padding: 5px;
            text-align: center;
            width: 100px;
            height: 120px;
            float: left;
            overflow: hidden;
            .img{
                color: #FF0C00;
                width: 100%;
                height: 100%;
                text-align: right;
                .feedback_item_img{
                    width: 100%;
                    height: 100%;
                    object-fit:cover;
                }
                .feedback_item_close{
                    font-size: 20px;
                    position: absolute;
                    margin-right: 0;
                    z-index: 1000;
                    background-color: #ffffff;
                    border-radius: 20px;
                }
            }
            .add{
                float: left;
                width: 100%;
                height: 100%;
                color: #FF0C00;
                border: 1px #FF0C00 solid;
                .feedback_icon{
                    font-size: 50px;
                    line-height: 80px;
                }
            }
        }
    }
</style>