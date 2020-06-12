<template>
    <div style="width: 100%;height: 100%">
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
            <div id="alertbox">
                <div id="alertbox_flekk"></div>
                <div id="alertbox_content"></div>
            </div>
            <a id="button_xwuz" onclick="return menuswitch(document.getElementById('button_about'));"
               ontouchstart="return menuswitch(document.getElementById('button_about'));"></a>
            <div class="ibox" id="container" @click="handleclick()" v-if="gameOverNum===false">
                <div class="game_one" v-if="gameClick===false">
                    <div>
                        <p>put down</p>
                    </div>
                    <div style="width: 2rem;margin: 0 auto;position: relative">
                        <van-image :src="img1"></van-image>
                    </div>
                </div>

                <div class="game_two" id="container_scroller" v-if="gameClick===true">
                    <div id="ibox_game" class="iboxcontent ibc1">
                        <div id="addScore">{{'+'+numScore}}</div>
                        <div class="game_three">
                            <div class="game_three_first">
                                <div id="score_title">Score :&nbsp;</div>
                                <div id="score">0</div>
                            </div>

                            <div class="game_three_two">
                                <div>连击:&nbsp;</div>
                                <div id="combo">0</div>
                            </div>
                            <div class="game_grade">Grade: <span id="level">1</span></div>
                        </div>
                        <div id="st_outerarea">
                        </div>
                    </div>
                </div>
            </div>
            <div class="over" v-if="gameOverNum===true" >
                <div>
                    <div class="over_first" >
                        {{$t('game.gameOver')}}
                    </div>
                    <div class="over_two">
                        {{$t('game.gameScore')}}<span>{{stscore}}</span>{{$t('game.gameScore1')}}
                    </div>
                    <div class="over_three">
                        {{$t('game.receive')}}<span>{{  integral  }}</span>{{$t('game.points')}}
                    </div>
                    <div class="over_four" type="button" @click="againGame()">
                        {{$t('game.again')}}
                    </div>
                    <div class="over_five" type="button" @click="returnDetail()">
                        {{$t('game.return')}}
                    </div>
                </div>
            </div>
        </van-row>
        <share-pop class="admin-modal" ref="mychild" :editModal="editModal" :shareType="shareType" v-on:changeModal="changeModal"></share-pop>

    </div>
</template>

<script>
    import api from '@/api/index'
    import img1 from "@/assets/imgs/game/1.png"
    import img11 from "@/assets/imgs/i/11.png"
    import img13 from "@/assets/imgs/i/13.png"
    import img21 from "@/assets/imgs/i/21.png"
    import img23 from "@/assets/imgs/i/23.png"
    import img31 from "@/assets/imgs/i/31.png"
    import img33 from "@/assets/imgs/i/33.png"
    import img41 from "@/assets/imgs/i/41.png"
    import img43 from "@/assets/imgs/i/43.png"
    import stackthelog from "@/assets/imgs/i/stackthelog.png"
    import dropshadow from "@/assets/imgs/i/dropshadow.png"
    export default {
        name: "pile-wood",
        data(){
            return{
                editModal:false,
                shareType:null,
                img1,
                img11,
                img12:"url(" + require("../../assets/imgs/i/12.png") + ")",
                img13,
                img21,
                img22:"url(" + require("../../assets/imgs/i/22.png") + ")",
                img23,
                img31,
                img32:"url(" + require("../../assets/imgs/i/32.png") + ")",
                img33,
                img41,
                img42:"url(" + require("../../assets/imgs/i/42.png") + ")",
                img43,
                stackthelog,
                dropshadow,
                numScore:2,
                logh:20,
                userHistoryMaxScore:0,
                extraleft:[],
                extraright:10,
                saw:document.body.offsetWidth*96/100,
                sah:document.body.offsetHeight*90/100,
                stdir:null,
                stwidth:[],
                stmargin:[],
                sttype:[],
                ststart:[],
                stscore:0,
                sts:0,
                stinterval:null,
                paddingtarget:0,
                paddingnow:0,
                gameisover:1,
                dnd:0,
                ibox_active:'game',
                ibox_cur:0,
                ibox_targets:[],
                ibox_scroll_timer:null,
                now : new Date(),
                expire : new Date(),
                stispace:[],
                myims:null,
                gamesplayed:null,
                theirbest:null,
                gameOverNum:false,
                gameClick:false,
                gratisGameNum:0,
                integralGameNum:0,
                integral:0,
                userHistoryMaxScoreState:true,
                allHistoryMaxScore:0,
                allHistoryMaxScoreState:true,
            }
        },
        mounted(){
            this.getInfo();
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
                // this.changeModal(true);
                // this.$bridge.gameShare();
            },
            getInfo(){
                this.take().then(data => {
                    if(data){
                        window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
                        this.getData();
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
            getData(){
                // this.getGratisGameNumData();
                // this.getIntegralGameNumData();
                // this.getMaxGameScoreData();
            },
            getGratisGameNumData(){
                api.getGratisGameNum().then(res => {
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
                    if (res.data.success) {
                        this.userHistoryMaxScore=res.data['userHistoryMaxScore'] ? res.data['userHistoryMaxScore'] : 0;
                    } else {
                        this.$notify(res.data.message);
                    }
                })
            },
            init() {
                let tmp=document.createElement('div');
                tmp.style.position='absolute';
                tmp.style.cursor='pointer';
                if(typeof(tmp.ontouchstart) !== 'undefined') {
                    tmp.ontouchstart=this.handleclick;
                } else {
                    tmp.onmousedown=this.handleclick;
                    tmp.onclick = function() {return false;}
                }
                //放下按钮
                // tmp.style.backgroundImage='url(../../assets/imgs/i/stackthelog.png)';
                tmp.style.backgroundImage=this.stackthelog;
                tmp.style.backgroundPosition='center center';
                tmp.style.backgroundRepeat='no-repeat';
                tmp.style.width='100%';
                tmp.style.height=this.sah*20/100+'px';
                // tmp.style.padding='17px 11px 0 11px';
                tmp.style.zIndex='600';
                tmp.style.marginTop=this.sah+'px';
                this.$('st_outerarea').appendChild(tmp);

                let tmp2=document.createElement('div');
                tmp2.id='st_scrollarea';
                tmp2.style.backgroundPosition='bottom center';
                // tmp2.style.width='320px';
                // tmp2.style.height='315px';
                tmp2.style.width='100%';
                tmp2.style.height='100%';
                tmp2.style.position='absolute';
                this.$('st_outerarea').appendChild(tmp2);

                let tmp1=document.createElement('div');
                tmp1.style.position='absolute';
                tmp1.style.width='100%';
                tmp1.style.height='87px';
                tmp1.style.marginTop='228px';
                tmp1.style.zIndex='10';
                this.$('st_scrollarea').appendChild(tmp1);

                let tmp3=document.createElement('div');
                tmp3.style.position='absolute';
                tmp3.style.width='100%';
                tmp3.style.height='39px';
                tmp3.style.marginTop='417px';
                tmp3.style.zIndex='20';
                this.$('st_scrollarea').appendChild(tmp3);

                let tmp5=Math.floor(Math.random()*4)+1;

                let tmp6=document.createElement('div');
                tmp6.id='stp_0';
                tmp6.style.position='absolute';
                tmp6.style.height=this.logh+'px';
                tmp6.style.width="100%";
                tmp6.style.marginTop=this.sah-this.logh+'px';
                tmp6.style.marginLeft=this.stmargin[0]-this.extraleft[this.sttype[0]]+7+'px';
                this.$('st_scrollarea').appendChild(tmp6);
                this.showaronk('stp_0',this.sttype[0],this.ststart[0],this.stwidth[0]);
                // addshadow();
                this.stack_init();
            },
            gameover() {
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data={
                    gameId: 1,
                    gameScore: this.stscore,
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                };
                api.saveGameScore(data).then(res => {
                    if (res.data.success) {
                        let data=Number(res.data.data);
                        this.integral=data ? data : 0;
                        this.gameOverNum=true;
                        this.getData();
                    } else {
                        this.$notify(res.data.message);
                    }
                });
                return false;
            },
            stack_init() {
                if(this.sts>20) {
                    this.paddingtarget=(this.sts-20)*(this.logh-4);
                    if(this.sts > 25) {
                        this.$('st_scrollarea').removeChild(this.$('stp_'+(this.sts-26)));
                        if(this.sts % 2 == 0 && this.sts>26) {
                            this.$('st_scrollarea').removeChild(this.$('shd_'+(this.sts-26)));
                        }
                    }
                }

                this.sts++;
                this.stwidth[this.sts]=this.stwidth[this.sts-1];
                this.ststart[this.sts]=(this.stwidth[this.sts]-document.body.offsetWidth)*Math.random();
                this.stmargin[this.sts]=0;
                this.stdir=Math.log(this.sts+1)*2;
                this.$('level').innerHTML=(Math.floor(this.sts/10)+1)+"";
                this.sttype[this.sts]=Math.floor(Math.random()*4)+1;
                if(Math.random()>.5) {
                    this.stdir*=-1;
                    this.stmargin[this.sts]=this.saw-this.stwidth[this.sts];
                }
                let tmp=document.createElement('div');
                tmp.id='stp_'+this.sts;
// tmp.style.backgroundColor='#ffeb00';
// tmp.style.overflow='hidden';
                tmp.style.position='absolute';
                tmp.style.height=this.logh+'px';
                tmp.style.width=this.extraleft[this.sttype[this.sts]]+this.stwidth[this.sts]+this.extraright/2+'px';
                tmp.style.marginTop=this.sah-(this.sts+2)*(this.logh-4)+'px';
                tmp.style.marginLeft=this.stmargin[this.sts]-this.extraleft[this.sttype[this.sts]]+7+'px';
                this.$('st_scrollarea').appendChild(tmp);
                this.showaronk('stp_'+this.sts,this.sttype[this.sts],this.ststart[this.sts],this.stwidth[this.sts]);
                this.stinterval=setInterval(()=>{this.stack_dothemove()},50);
            },
            stack_dothemove() {
                //if($('score').innerHTML < stscore) {
                // $('score').innerHTML=Math.floor((parseInt($('score').innerHTML)+stscore*3)/4);
                //}
                if(this.paddingtarget > this.paddingnow+1) {
                    this.paddingnow=(this.paddingtarget+this.paddingnow)/2;
                    this.$('st_scrollarea').style.paddingTop=this.paddingnow+'px';
                }
                this.stmargin[this.sts]+=this.stdir;
                if(this.stmargin[this.sts] < 0) {
                    this.stmargin[this.sts]=-this.stmargin[this.sts]; this.stdir*=-1;
                }
                else if(this.stmargin[this.sts]+this.stwidth[this.sts] > this.saw) {
                    this.stmargin[this.sts]=this.saw-this.stwidth[this.sts]-this.stmargin[this.sts]-this.stwidth[this.sts]+ this.saw;
                    this.stdir*=-1;
                }
                document.getElementById('stp_'+this.sts).style.marginLeft=this.stmargin[this.sts]-this.extraleft[this.sttype[this.sts]]+7+'px';
            },
            handleclick() {
                if(!this.gameClick){
                    this.gameClick=true;
                    setTimeout(()=>{
                        this.restartgame();
                        this.getData();
                    },10);

                    this.gameOverNum=false;
                    return ;
                }
                if(this.dnd==1) {return false;}
                this.dnd=1;
                clearTimeout(this.stinterval);
                // let stwo=this.stwidth[this.sts];
                let hcf='';
                if(this.stmargin[this.sts] < this.stmargin[this.sts-1]) {
                    this.stwidth[this.sts]-=this.stmargin[this.sts-1]-this.stmargin[this.sts]; this.stmargin[this.sts]=this.stmargin[this.sts-1]; hcf='left';
                }
                if(this.stmargin[this.sts]+this.stwidth[this.sts] > this.stmargin[this.sts-1]+this.stwidth[this.sts-1]) {
                    this.stwidth[this.sts]-= this.stmargin[this.sts]+this.stwidth[this.sts] - this.stmargin[this.sts-1]-this.stwidth[this.sts-1]; hcf='right';
                }
                if(this.stwidth[this.sts] <= 0) {
                    hcf='all'
                }
                this.cutaronk('stp_'+this.sts,this.sttype[this.sts],this.ststart[this.sts],this.stwidth[this.sts],hcf);
                if(this.stwidth[this.sts] <= 0) {this.stwidth[this.sts]=0;}
                if(this.sts % 2 == 0 && this.stwidth[this.sts] > 0) {
                    this.addshadow();
                }
                let bon=Math.floor(this.stwidth[this.sts]/10*Math.log(this.sts+1));
                // if(Math.abs(this.stwidth[this.sts] - this.stwidth[this.sts-1])<3 && this.stwidth[this.sts]>0) {
                //   console.log("88888888888888888")
                //   bon*=2;
                //   this.$('combo').innerHTML=(parseInt(this.$('combo').innerHTML)+1)+"";
                //   let tmp=document.createElement('div');
                //   tmp.innerHTML='<div style="padding:5px;font-size: 0.3rem"><b>漂亮 完美!</b></div>';
                //   tmp.id='box_perfect';
                //   tmp.style.zIndex='10';
                //   tmp.style.opacity='0.5';
                //   tmp.style.position='absolute';
                //   tmp.style.fontSize='0.5rem';
                //   tmp.style.textAlign='center';
                //   tmp.style.width='2.5rem';
                //   tmp.style.backgroundColor='#ffffff';
                //   tmp.style.marginLeft=(document.body.offsetWidth-parseFloat(tmp.style.width))/2+'px';
                //   let tmp3=(this.sah-(this.sts+2)*(this.logh-4)-16);
                //   tmp.style.marginTop=tmp3+'px';
                //   this.$('st_scrollarea').appendChild(tmp);
                //   let tmp2=[];
                //   tmp2[0]="";
                //   tmp2[1]="document.getElementById('score_title').style.color='#ffffff'; document.getElementById('box_perfect').style.marginTop='"+(tmp3-25)+"px';";
                //   tmp2[2]="document.getElementById('box_perfect').style.marginTop='"+(tmp3-50)+"px';";
                //   tmp2[3]="document.getElementById('box_perfect').style.marginTop='"+(tmp3-75)+"px';";
                //   tmp2[4]="document.getElementById('st_scrollarea').removeChild(document.getElementById('box_perfect')); document.getElementById('score_title').style.color=''";
                //   let ttt=Math.random();
                //   this.stispace[ttt]=tmp2;
                //   this.setTI(ttt,50);
                // }
                // this.stscore+=bon;
                //
                // this.stscore+=2;
                this.addScore(this.numScore);
            },
            addScore(data){
                let that =this;
                document.getElementById("addScore").style.display='block';
                let i=1;
                let time=setInterval(()=>{
                    i++;
                    document.getElementById("addScore").style.paddingTop=1.5/i +"rem";
                    if(i==5){
                        clearInterval(time);
                        i=1;
                        document.getElementById("addScore").style.display='none';
                        document.getElementById("addScore").style.paddingTop="1.5rem";
                        that.stscore+=data;
                        if(that.stscore ===50){
                            this.$toast(this.$t('game.receive')+' 5 '+this.$t('game.points'));
                        }
                        if(that.stscore ===100){
                            this.$toast(this.$t('game.receive')+' 20 '+this.$t('game.points'));
                        }
                        if(that.stscore>that.userHistoryMaxScore){
                            if(that.userHistoryMaxScoreState){
                                this.$toast(this.$t('game.max'));
                                that.userHistoryMaxScoreState=false;
                            }

                        }
                        if(that.stscore>that.allHistoryMaxScore){
                            if(that.allHistoryMaxScoreState){
                                this.$toast(this.$t('game.one'));
                                that.allHistoryMaxScoreState=false;
                            }
                        }

                        that.$('score').innerHTML=(that.stscore).toString();
                        if(that.stscore>that.theirbest) {that.$('score').style.color='#ffffff';}
                    }
                },100)
            },
            addshadow() {
                let tmp=document.createElement('img');
                tmp.src=this.dropshadow;
                tmp.id='shd_'+this.sts;
                tmp.style.zIndex='15';
                tmp.style.position='absolute';
                tmp.style.width=(this.extraleft[this.sttype[this.sts]]+this.stwidth[this.sts]+this.extraright/2)+'px';
                tmp.style.height='30px';
                tmp.style.marginLeft=(this.stmargin[this.sts]-this.extraleft[this.sttype[this.sts]]+7)+'px';
                tmp.style.marginTop=(this.sah-(this.sts+1)*(this.logh-4)-1)+'px';
                this.$('st_scrollarea').appendChild(tmp);
            },
            cutaronk(crid,crtype,crstart,crstays,crfrom) {
                //srfrom: left: bal oldalrol vag le, right: jobb oldalrol vag le
                let croriw=parseInt(document.getElementById(crid).getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.width);
                if(crfrom == 'right') {
                    document.getElementById(crid).getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.width=crstays+'px';
                    document.getElementById(crid).getElementsByTagName('div')[0].getElementsByTagName('img')[0].style.marginLeft=this.extraleft[crtype]+crstays-this.extraright/2+'px';
                    this.showaronk(crid,crtype,crstart-crstays,croriw-crstays);
                    document.getElementById(crid).childNodes[1]['style'].marginLeft=crstays+'px';
                    document.getElementById(crid).childNodes[1]['style'].zIndex='12';
                } else if(crfrom == 'left'){
                    document.getElementById(crid).getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.width=crstays+'px';
                    document.getElementById(crid).getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.marginLeft=this.extraleft[crtype]+croriw-crstays+1+'px';
                    document.getElementById(crid).getElementsByTagName('div')[0].getElementsByTagName('div')[0].style.backgroundPosition=crstart+crstays-croriw+'px';
                    document.getElementById(crid).getElementsByTagName('div')[0].getElementsByTagName('img')[1].style.marginLeft=croriw-crstays+'px';
                    this.showaronk(crid,crtype,crstart,croriw-crstays);
                    document.getElementById(crid).childNodes[1]['style'].zIndex=(this.sts % 2 == 1)?('14'):('16');
                }
                if(crfrom !='') {
                    let tmp=[];
                    if(crfrom == 'left' || crfrom == 'right') {
                        tmp[0]="this.$('"+crid+"').style.marginTop='"+(this.sah-(this.sts+1)*(this.logh-4))+"px';document.getElementById('"+crid+"').childNodes[1].style.marginTop='2px';  document.getElementById('"+crid+"').childNodes[0].style.zIndex="+((this.sts % 2)?(13):(16))+";";
                        tmp[1]="this.$('"+crid+"').childNodes[1].style.opacity='.75'; this.$('"+crid+"').childNodes[1].style.marginTop='7px';";
                        tmp[2]="this.$('"+crid+"').childNodes[1].style.opacity='.5';this.$('"+crid+"').childNodes[1].style.marginTop='12px';";
                        tmp[3]="this.$('"+crid+"').childNodes[1].style.opacity='.25';this.$('"+crid+"').childNodes[1].style.marginTop='17px';";
                        tmp[4]="this.$('"+crid+"').removeChild(document.getElementById('"+crid+"').childNodes[1]);"
                    } else if(crfrom =='all') {
                        tmp[0]="this.$('"+crid+"').childNodes[0].style.marginTop='2px';";
                        tmp[1]="this.$('"+crid+"').childNodes[0].style.opacity='.75'; document.getElementById('"+crid+"').childNodes[0].style.marginTop='7px';";
                        tmp[2]="this.$('"+crid+"').childNodes[0].style.opacity='.5'; document.getElementById('"+crid+"').childNodes[0].style.marginTop='12px';";
                        tmp[3]="this.$('"+crid+"').childNodes[0].style.opacity='.25'; document.getElementById('"+crid+"').childNodes[0].style.marginTop='17px';";
                        tmp[4]="this.$('"+crid+"').removeChild(document.getElementById('"+crid+"').childNodes[0]);"
                    }
                    if(this.stwidth[this.sts] >0) { tmp[4]+="this.stack_init(); this.dnd=0;"; } else { tmp[4]+='this.gameover();' }
                    let ttt=Math.random();
                    this.stispace[ttt]=tmp;
                    this.setTI(ttt,50);
                } else {
                    document.getElementById(crid).style.marginTop=(this.sah-(this.sts+1)*(this.logh-4))+'px';
                    document.getElementById(crid).childNodes[0]['style'].zIndex=((this.sts % 2)?(13):(16));
                    this.stack_init();
                }
            },
            showaronk(srid,srtype,srstart,srsize) {
                let srt=srtype;
                let tmp=document.createElement('div');
                tmp.style.position='absolute';
                tmp.style.width=this.extraleft[srtype]+srsize+this.extraright/2+'px';
                tmp.style.height=this.logh+'px';
                tmp.style.zIndex='15';

                let tmp1=document.createElement('div');
                tmp1.style.position='absolute';
                tmp1.style.width=srsize+'px';
                tmp1.style.height=this.logh+'px';
                tmp1.style.marginLeft=this.extraleft[srtype]+'px';
                let tmpUrl1;
                if(srt===1){
                    tmpUrl1=this.img12;
                }else if(srt===2){
                    tmpUrl1=this.img22;
                }else if(srt===3){
                    tmpUrl1=this.img32;
                }else{
                    tmpUrl1=this.img42;
                }
                // tmp1.style.backgroundImage='url(../../assets/imgs/i/'+srt+'2.png)';
                tmp1.style.backgroundImage=tmpUrl1;
                tmp1.style.backgroundPosition=srstart+'px 0';
                tmp.appendChild(tmp1);

                let tmp2=document.createElement('img');
                let tmpUrl2;
                if(srt===1){
                    tmpUrl2=this.img13;
                }else if(srt===2){
                    tmpUrl2=this.img23;
                }else if(srt===3){
                    tmpUrl2=this.img33;
                }else{
                    tmpUrl2=this.img43;
                }
                // tmp2.src='../../assets/imgs/i/'+srt+'3.png';
                tmp2.src=tmpUrl2;
                tmp2.style.marginLeft=(this.extraleft[srtype]+srsize-this.extraright/2)+"px";
                tmp2.style.position='absolute';
                tmp.appendChild(tmp2);

                tmp2=document.createElement('img');
                let tmpUrl3;
                if(srt===1){
                    tmpUrl3=this.img11;
                }else if(srt===2){
                    tmpUrl3=this.img21;
                }else if(srt===3){
                    tmpUrl3=this.img31;
                }else{
                    tmpUrl3=this.img41;
                }
                // tmp2.src='../../assets/imgs/i/'+srt+'1.png';
                tmp2.src=tmpUrl3;
                tmp2.style.position='absolute';
                tmp.appendChild(tmp2);
                this.$(srid).appendChild(tmp);
            },
            gameStart(beginType){
                let usrInfo = JSON.parse(window.sessionStorage["loginInfo"]);
                let data={
                    beginType:beginType,
                    gameId:1,
                    userId :usrInfo['data'] && usrInfo['data']['id'] ? usrInfo['data']['id'] : usrInfo["id"]
                };
                api.gameBegin(data).then(res => {
                    if (res.data.success) {
                        location.reload();
                    } else {
                        this.$notify(res.data.message);
                    }
                });
            },
            restartgame() {
                this.ibox_targets['game']=0;
                this.ibox_targets['highscore']=-320;
                this.ibox_targets['about']=-640;
                this.extraleft[1]=6;
                this.extraleft[2]=4;
                this.extraleft[3]=5;
                this.extraleft[4]=5;
                this.expire.setTime(this.now.getTime() + 1000*60*60*24*90); //90 days
                this.stwidth[0]=document.body.offsetWidth*80/100; //a ronk maga!
                this.ststart[0]=(this.stwidth[0]*1/100)*Math.random();
                this.stmargin[0]=(this.saw-this.stwidth[0])/2; //ronk margoja!
                this.sttype[0]=Math.floor(Math.random()*4)+1;
                clearInterval(this.stinterval);
                this.gameisover=0;
                this.stwidth=[];
                this.stmargin=[];
                this.sttype=[];
                this.ststart=[];
                this.stscore=0;
                this.sts=0;
                this.stwidth[0]=document.body.offsetWidth*80/100; //a ronk maga!
                this.ststart[0]=(this.stwidth[0]-document.body.offsetWidth)*Math.random();
                this.stmargin[0]=(document.body.offsetWidth*15/100)/2; //ronk margoja!
                this.sttype[0]=Math.floor(Math.random()*4)+1;
                this.paddingtarget=0;
                this.paddingnow=0;
                this.dnd=0;
                this.$('combo').innerHTML='0';
                this.$('level').innerHTML='1';
                this.$('score').innerHTML=(this.stscore).toString();
                this.$('score').style.color='#ffffff';
                this.$('st_outerarea').innerHTML='';
                this.init();
            },
            pausegame() {
                clearTimeout(this.stinterval);
            },
            resumegame() {
                if (this.gameisover == 0) {
                    this.stinterval = setInterval(()=>{this.stack_dothemove()}, 50);
                }
            },
            $(id) {
                return document.getElementById(id);
            },
            setTI(todos,interval) {
                if(this.stispace[todos].length == 0) {delete this.stispace[todos];return false;}
                eval(this.stispace[todos].shift());
                setTimeout(()=>{
                    this.setTI(todos,interval)
                },interval);
            },
            iconfirm(iquestion,idoit) {
                document.getElementById('alertbox_content').innerHTML=iquestion+'<br style="clear:both" /><br /><a href="#" ontouchstart="idismiss();eval(\''+idoit+'\'); return false;" onclick="idismiss();eval(\''+idoit+'\'); return false;"><img src="../../assets/imgs/i/b_yes.png" alt="Yes" /></a><a href="#" ontouchstart="idismiss(); return false;" onclick="idismiss(); return false;"><img src="../../assets/imgs/i/b_no.png" alt="No" /></a>';
                document.getElementById('alertbox').style.display='block';
            },
            idismiss() {
                document.getElementById('alertbox').style.display='none';
                this.resumegame();
            },
            menuswitch(obj) {
                let whereto=obj.href.split('#')[1];
                if(whereto=='game' && this.ibox_active == 'game') {
                    this.pausegame();
                    this.iconfirm('<h1>新游戏</h1>确定要<br />重新开始游戏吗?','restartgame();');
                    return false;
                }
                if(this.ibox_active == 'game' && whereto!='game') {this.pausegame();}
                let mse='';
                if(this.ibox_active != 'game' && whereto=='game') {mse='resumegame();';}

                let tmp=['game','highscore','about'];
                let tmp2=[];
                tmp2['game']=0;
                tmp2['highscore']='-72px';
                tmp2['about']='-182px';
                for(let i in tmp) {
                    document.getElementById('button_'+tmp[i]).style.backgroundPosition=tmp2[tmp[i]]+' '+((tmp[i]==whereto)?(0):('-41px'));
                }
                let ibox_start;
                if(whereto == this.ibox_active) {return false;} else { ibox_start=this.ibox_targets[this.ibox_active]; this.ibox_active=whereto; }
                for(let i in this.ibox_targets) {
                    document.getElementById('button_'+i).className=(i==whereto)?('active'):('');
                }
                obj.className='active';
                tmp2=[];
                let tmp3=ibox_start;
                for(let i=0;i<=5;i++) {
                    tmp3=(tmp3-0+this.ibox_targets[whereto])/2;
                    tmp2.push('document.getElementById(\'container_scroller\').style.marginLeft=\''+tmp3+'px\';');
                }
                tmp2.push('document.getElementById(\'container_scroller\').style.marginLeft=\''+this.ibox_targets[whereto]+'px\';');
                if(mse!='') {tmp2.push(mse);}
                let ttt=Math.random();
                this.stispace[ttt]=tmp2;
                this.setTI(ttt,50);
                return false;
            },
            returnDetail(){
                this.$router.push("pileWoodDetail") ;
            },
            againGame(){
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
                            confirmButtonText: this.$t("game.tip.ok"),
                            beforeClose:((action, done)=>{
                                if (action === 'confirm') {
                                    this.$router.push("pileWoodDetail");
                                    done();
                                } else {
                                    done();
                                }
                            })
                        });
                    }
                }else{
                    this.gameStart(1);
                }
            },
            share(){
                this.shareType="1";
                shareDialog.postMessage(this.shareType);
                // this.$bridge.gameShare();
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/css/main";
    #app{
        background: none;
    }
    .main{
        width:100%;
        height: 100%;
    }
    .game_one{
        margin: 75px auto;
        div:first-child{
            text-align: center;
            p{
                font-size: 30px;
                color: #ffffff;
                opacity: 0.5
            }
        }
    }
    .game_two{
        width:10000px;
        height: 100%;
        #ibox_game{
            position: relative;
            height: 100%;
            width: 100%;
            .game_three{
                width: 150px;
                height:37.5px;
                overflow:hidden;
                margin-left: 13px;
                padding-top:10px;
                font-size:16px;
                position:absolute;
                z-index:20;
                .game_three_first{
                    float:left;
                    #score_title{
                        float:left;
                        color: #ffffff;
                        font-size: 18px
                    }
                    #score{
                        color: #ffffff;
                        float:left;
                        width:75px;
                        font-size: 18px
                    }
                }
                .game_three_two{
                    float:right;
                    display: none;
                    div:first-child{
                        float:left
                    }
                    #combo{
                        float:left;
                        width:56px;
                    }
                }
                .game_grade{
                    text-align:center;
                    color: #ffffff;
                    font-size: 18px;
                    display: none
                }
            }
            #st_outerarea{
                width:100%;
                height:100%;
                overflow:hidden;
                position: relative;
            }
        }
        #addScore{
            padding-top: 56px;
            color: white;
            float:left;
            width:2em;
            font-size: 18.5px;
            position: absolute;
            left: 71px;
            z-index: 20;
            opacity: 0.7;
            display: none
        }
    }
    .over_first{
        font-size: 25px;
        text-align: center;
        top: 112.5px;
        position: relative;
        width: 100%;
        color: #ffffff
    }
    .over_two{
        font-size: 11.5px;
        line-height: 34px;
        text-align: center;
        position: relative;
        width: 204.5px;
        top: 157px;
        margin: 0 auto;
        color: #ffffff;
        height: 33px;
        background: url('../../assets/imgs/game/rectangle.png') no-repeat;
        background-size:cover;
        span{
            padding: 0 5px
        }
    }
    .over_three{
        background:rgba(0,0,0,1);
        border-radius: 14px;
        opacity: 0.5;
        font-size: 15.5px;
        line-height: 27.5px;
        text-align: center;
        position: relative;
        width: 176px;
        top:168px;
        margin: 7px auto;
        color: #ffffff;
        height: 27.5px;
        span{
            padding: 0 5px
        }
    }
    .over_four{
        width: 237px;
        height: 75.5px;
        text-align: center;
        margin: 243.5px auto 0 auto;
        color: #ffffff;
        font-size: 18px;
        line-height: 75.5px;
        background: url('../../assets/imgs/game/again.png') no-repeat;
        background-size:cover;
    }
    .over_five{
        width: 237px;
        height: 75.5px;
        text-align: center;
        margin: 18px auto 0 auto;
        color: #ffffff;
        font-size: 18px;
        line-height: 67.5px;
        background: url('../../assets/imgs/game/return.png') no-repeat;
        background-size:cover;
    }
    body {
        background-color: #000000;
        color: #a3b3c3;
        border: 0;
        padding: 0;
        font-size: 90%;
        overflow: hidden;
        width: 100%;
        margin: auto;
    }

    h1 {
        margin: .4em;
    }

    h3 {
        font-size: 0.5rem;
        margin: 12px;
        padding-left: 0;
        margin-bottom: .5em;
        color: #ffffff;
    }

    p {
        margin: 12px;
        margin-top: .5em;
        margin-bottom: .5em;
        font-size: 0.4rem;
    }

    a {
        color: #ffffff;
    }

    td {
        text-align: center;
        font-size: 70%;
    }

    .ibox {
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: auto;
        bottom:1.5rem;
        background: url('../../assets/imgs/i/bg.jpg') no-repeat;background-size:cover;
    }
    .over{
        width: 100%;
        height: 100%;
        margin: auto;
        background: url('../../assets/imgs/i/bg.jpg') no-repeat;background-size:cover;
    }
    .iboxcontent {
        width: 100%;
        height: 100%;
        float: left;
        overflow: hidden;
    }
    #alertbox {
        display: none;
        position: absolute;
        z-index: 200;
    }

    #alertbox_flekk {
        position: absolute;
        width: 320px;
        height: 356px;
        background-color: #000000;
        opacity: .8;
    }

    #alertbox_content {
        position: absolute;
        width: 320px;
        height: 286px;
        margin-top: 70px;
        text-align: center;
        color: #ffffff;
    }

    #alertbox_content .fontostext {
        color: #a3b3c3;
    }

    #alertbox a {
        margin: 10px;
        width: 114px;
        height: 54px;
    }

    img {
        border: 0;
    }

    #imenu {
        width: 320px;
        height: 41px;
        margin: auto;
        text-align: center;
        background-image: url(../../assets/imgs/i/menu.png);
        background-position: 0 0px;
    }

    #imenu a:hover {
        opacity: .5;
    }

    #button_game {
        background-image: url(../../assets/imgs/i/menu.png);
        display: block;
        float: left;
        width: 72px;
        height: 41px;
        background-position: 0 0;
    }

    #button_highscore {
        background-image: url(../../assets/imgs/i/menu.png);
        display: block;
        float: left;
        width: 110px;
        height: 41px;
        background-position: -72px -41px;
    }

    #button_about {
        background-image: url(../../assets/imgs/i/menu.png);
        display: block;
        float: left;
        width: 100px;
        height: 41px;
        background-position: -182px -41px;
    }

    #score, #combo, #level {
        color: #ffffff;
    }

    #button_xwuz {
        position: absolute;
        display: block;
        width: 48px;
        height: 57px;
        margin: 5px 0 0 267px;
        //background-image: url(./i/xwuz.png);
        z-index: 1;
        cursor: pointer;
    }

    #yourbest {
        text-align: center;
        font-weight: bold;
        color: #ffffff;
        font-size: 300%;
        margin: .5em auto .5em auto;
        width: 296px;
        height: 65px;
        padding-top: 15px;
    }

    .fontostext {
        color: #ffffff;
    }

    #preload {
        width: 100%;
        position: absolute;
        visibility: hidden;
        overflow: hidden;
    }
</style>