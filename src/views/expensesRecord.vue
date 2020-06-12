<template>
    <div>
        <van-nav-bar
                :fixed="true"
                :title="$t('expensesRecord.title')"
                left-arrow
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-row class="thisbody">
            <van-row class="typeBtn">
                <van-row type="flex" justify="space-around">
                    <van-col span="6" @click="change(0)">
                        <span :class="type===0 ? 'activeBtn' : 'noActive'">{{$t('expensesRecord.income')}}</span>
                    </van-col>
                    <van-col span="6" @click="change(1)">
                        <span :class="type===1 ? 'activeBtn' : 'noActive'">{{$t('expensesRecord.expenditure')}}</span>
                    </van-col>
                </van-row>
            </van-row>
        </van-row>
        <van-row class="weekMonthYear">
            <van-row class="titleBtn">
                <van-row type="flex" justify="space-around">
                    <van-col span="8" @click="changeDate(1)" :class="dateType===1 ? 'activeDate' : ''">{{$t('expensesRecord.week')}}</van-col>
                    <van-col span="8" @click="changeDate(2)" :class="dateType===2 ? 'activeDate' : ''"> {{$t('expensesRecord.month')}} </van-col>
                    <van-col span="8" @click="changeDate(3)" :class="dateType===3 ? 'activeDate' : ''">{{$t('expensesRecord.year')}}</van-col>
                </van-row>
            </van-row>
        </van-row>
        
        <van-row class="wrap" id="out">
            <van-row class="inner" id="inner">
                <van-row v-for="(val,i) of slideArr" :key="i" class="slide" :style="{'width':slideWidth}">
                    <van-row :class="{'typeActive': val===dataType }" @click="changeType(val)">{{val}}</van-row>
                </van-row>
            </van-row>
        </van-row>
<!--        <van-tabs background="#FFFFFF" color="#FF0C00" title-active-color="#FF0C00" :swipe-threshold="4" :border="true" @click="changeType" :model="dataType">-->
<!--            <van-tab v-for="(item,i) in slideArr" :title="item" :key="i"></van-tab>-->
<!--        </van-tabs>-->


        <div class="charts" id="myChart"></div>

        <van-row class="tit" v-if="type===0">
            {{$t('expensesRecord.source')}}
        </van-row>
        <van-row class="tit" v-if="type===1">
            {{$t('expensesRecord.use')}}
        </van-row>
        <van-row class="list" v-for="(item,i) of sortData" :key="i">
            <van-row class="listImg">
                <van-image class="imgPath" :src="item['factorLogoPath']"></van-image>
            </van-row>
            <van-row class="listName">
                {{item['factorName']}}
            </van-row>
            <van-row class="listAmount">
                <span v-if="type===1">-</span>{{totalAmount(item['totalAmount']+"")}}
            </van-row>
        </van-row>
    </div>
</template>

<script>
    import api from '@/api/index'
    export default {
        name: "expensesRecord",
        data(){
            return{
                type:0,
                dateType:1,
                slideWidth:'100px',
                sortData:[],
                imgData:[],
                slideArr:[],
                dataType:"",
                xData:[],
                yData:[],
            }
        },
        mounted(){
            this.getInfo();
            window.callBackFlutter=(data)=>{
                window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                this._getTotleWeek();
            };
        },
        methods:{
            onClickLeft(){
                goBack.postMessage("goBack");
                // this.$bridge.goBack();
            },
            getInfo(){
                getUserLoginInfo.postMessage("callBackFlutter");
                // this.take().then(data => {
                //     if(data){
                //         console.log(data);
                //         console.log("6666");
                //         window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                //         this._getTotleWeek();
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
            initCharts(){
                let myChart = window.echarts.init(document.getElementById('myChart'));
                myChart.setOption({
                    color: ['#FF0C00'],
                    tooltip : {
                        trigger: 'axis',
                        // show : true,
                    },
                    grid: {
                        left: '6%',
                        right: '4%',
                        bottom: '3%',
                        top: '5%',
                        containLabel: true
                    },
                    xAxis:[
                        {
                            data:this.xData,
                            // data: ['04/01', '04/02', '04/03', '04/04', '04/05', '04/06', '04/07', '04/08', '04/09', '04/10', '04/11', '04/12', '04/13', '04/14', '04/15', '04/16', '04/17', '04/18', '04/19', '04/20', '04/21', '04/22', '04/23', '04/24', '04/25', '04/26', '04/27', '04/28', '04/29', '04/30', '04/31'],
                            axisLabel:{
                                show:true,
                                rotate:this.dateType===2 ? 45 : 0,
                                textStyle:{fontSize:10}
                            }
                        },
                    ],
                    yAxis: [{
                        position: 'left',
                        axisLabel:{
                            textStyle:{fontSize:10}
                        }
                    }],
                    series: [{
                        data:this.yData,
                        // data: [820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901],
                        type: 'bar'
                    }]
                },true);
            },
            change(data){
                console.log(data);
                this.type=data;
                console.log(this.dateType);
                this.setDateType(this.dateType);
            },
            changeDate(data){
                console.log(data);
                this.dateType=data;
                this.setDateType(data);
            },
            setDateType(data){
                let dateType = data;
                if (dateType === 1) {
                    this._getTotleWeek();
                }else if(dateType === 2){
                    this.dataType=(new Date).getMonth()+1;
                    console.log(this.dateType);
                    this._creatTab(12);
                }else{
                    this.dataType=(new Date).getFullYear();
                    this._creatTab(1);
                }
            },
            getData(){
                let year = (new Date).getFullYear()+"";
                let month= (new Date).getMonth()+1+"";
                let day= (new Date).getDate()+"";
                if (parseInt(month) >= 1 && parseInt(month) <= 9) {
                    month = "0" + month;
                }
                if (parseInt(day) >= 0 && parseInt(day) <= 9) {
                    day = "0" + day;
                }
                // console.log(year+month+day);
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let params={
                    // pm-uid:usrInfo['id']
                    userId: usrInfo['id'],
                    currentDate: year+""+month+""+day,
                    currentMonth: ""+this.dataType,
                    currentWeek: this.dataType,
                    currentYear: year,
                    dateType: this.dateType,
                    paymentType: this.type,
                };
                api.expensesRecordGetChart(params).then(res =>{
                    if(res.success === false){
                        this.$notify(res.message);
                    }else{
                        this.xData=Object.getOwnPropertyNames(res.data.data);
                        this.yData=[];
                        for(let key of this.xData){
                            // console.log(key)
                            this.yData.push(res.data.data[key]);
                            // console.log(this.yData)
                        }
                        if(this.dateType === 2){
                            this.xData=this.xData.map(v=>{
                                return v.toString().substring(6,8)+"/"+v.toString().substring(4,6);
                            })
                        }
                        this.initCharts();
                    }
                })
            },
            getSort(){
                let year = (new Date).getFullYear()+"";
                let month= (new Date).getMonth()+1+"";
                let day= (new Date).getDate()+"";
                if (parseInt(month) >= 1 && parseInt(month) <= 9) {
                    month = "0" + month;
                }
                if (parseInt(day) >= 0 && parseInt(day) <= 9) {
                    day = "0" + day;
                }
                // console.log(year+month+day);
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let params={
                    // pm-uid:usrInfo['id']
                    userId: usrInfo['id'],
                    currentDate: year+""+month+""+day,
                    currentMonth: ""+this.dataType,
                    currentWeek: this.dataType,
                    currentYear: year,
                    dateType: this.dateType,
                    paymentType: this.type,
                };
                api.expensesRecordGetSort(params).then(res =>{
                    if(res.success === false){
                        this.$notify(res.message);
                    }else{
                        this.sortData=res.data.data;
                    }
                })
            },
            _initScroll(length){
                let inner = document.getElementById('inner');
                let out = document.getElementById('out');
                let slide = document.getElementsByClassName('slide');
                this.slideWidth=out.clientWidth/5+"px";
                inner.style.width = `${out.clientWidth/5 * length}px`;
                let len = (parseInt(this.dataType) - 5) < 0 ? 0 : (parseInt(this.dataType) - 5) * (out.clientWidth/5);
                if (out) {
                    out.scroll(len, 0)
                }
                this.getData();
                this.getSort();
            },
            _getTotleWeek(){
                const Year = (new Date).getFullYear();
                let data={
                    currentYear:Year
                };
                api.expensesRecordGetTotalWeek(data).then(res =>{
                    if(res.success === false){
                        this.$notify(res.message);
                    }else{
                        api.expensesRecordGetWeek().then(resq =>{
                            if(resq.success === false){
                                this.$notify(resq.message);
                            }else{
                                this.dataType=resq.data.data;
                                this._creatTab(res.data.data);
                            }
                        })
                    }
                })
            },
            _creatTab(totleDate){
                let slideArr = [];
                let len = totleDate || 0;
                for(let k = 0;k < len ; k++){
                    slideArr.push(k+1)
                }
                if(this.dateType === 2){
                    slideArr=[
                        "Januari",
                        "Februari",
                        "Maret",
                        "April",
                        "Mei",
                        "Juni",
                        "Juli",
                        "Agustus",
                        "September",
                        "Oktober",
                        "November",
                        "Desember"
                    ]
                }
                if(this.dateType === 3){
                    slideArr=[];
                    slideArr.push( (new Date).getFullYear())
                }
                this.slideArr=slideArr;
                setTimeout(()=>{
                    this._initScroll(slideArr.length)
                },10)
            },
            changeType(data){
                console.log(data);
                this.dataType=data;
                this.getData();
                this.getSort();
            },
            // changeType(name, title){
            //     console.log(title);
            //     this.dataType=title;
            //     this.getData();
            //     this.getSort();
            // },
            totalAmount(data){
                if(data){
                    return "Rp."+(Number(data).toFixed(2)+ '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/main";
    .thisbody{
        width: 100%;
        // clear: both;
        float: left;
        background-color: #FF0C00;
    }
    .weekMonthYear{
        border-bottom: 1px #eeeeee solid;
        background:#FFFFFF;
        clear: both;
    }
    .activeBtn{
        font-weight: bold;
        opacity: 1;
        font-size: 17px;
        border-bottom: 3px solid #ffffff;
        padding-bottom: 10px;
        color: #ffffff;
    }
    .noActive{
        color: #ffffff;
        opacity: 0.7;
    }
    .titleBtn{
        box-sizing: border-box;
        font-size: 17px;
        margin-top: 2120px;
        width: 90%;
        text-align: center;
        margin-left: 5%;
        color: #666666 ;
        height: 45px;
        line-height: 45px;
        background-color: #ffffff;
    }
    .typeBtn{
        margin-top: 75px;
        width: 70%;
        margin-left: 15%;
        color: #ffffff;
        font-size: 17px;
        text-align: center;
        margin-bottom: 20px;
    }
    .activeDate{
        font-weight: bold;
        background-color: #ffffff;
        color: #FF0C00;
        border-bottom: 2px solid #FF0C00;
    }
    .charts{
        height: 217px;
        background-color: #ffffff;
        border-bottom: 1px #F4F4F4 solid;
        width: 100%;
        margin: 0;
    }
     .wrap{
         height: 42px;
         line-height: 38px;
         width: 100%;
         overflow: auto;
         border-bottom: 1px #eeeeee solid;
         text-align: center;
         background: #fff;
     }
     .inner{
         height: 100%;
         width: 100%;
     }
     .slide{
         box-sizing:border-box;
         float: left;
         font-size: 14px;
         border: 1px #ffffff solid;
         color: #999999 ;
     }
     .typeActive{
         font-weight: bold;
         color: #FF0C00;
         border-bottom: 2px #FF0C00 solid;
     }
     .slide div{
         height: 100%;
         width: 90%;
         margin-left: 5%;
         margin-right: 5%;
         bottom: 0;
     }
    .tit{
        font-size: 14px;
        color: #666666;
        line-height: 32px;
        height: 32px;
        padding-left: 18px;
        /*width: 100%;*/
        background: #ffffff;
        border-bottom: 1px #F4F4F4 solid;
    }
    .list{
        background:#FFFFFF;
        width: 100%;
        position: relative;
        float: left;
        border-bottom: 1px #F4F4F4 solid;
        .listImg{
            float: left;
            position: relative;
            width: 30px;
            height: 30px;
            margin-left: 18px;
            margin-top: 12px;
            .imgPath{
                width:30px;
            }
        }
        .listName{
            float: left;
            position: relative;
            height: 53px;
            line-height: 53px;
            font-size: 14px;
            color: #666666;
            margin-left: 22px;
        }
        .listAmount{
            float: right;
            position: relative;
            height: 53px;
            line-height: 53px;
            font-size: 14px;
            color: #666666;
            margin-right: 18px;
        }
    }
    .van-nav-bar{
        background-color:#FF0C00;
    }
    .van-hairline--bottom::after{
        border-bottom-width: 0px;
    }
</style>