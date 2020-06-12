import axios from '@/libs/api.request'

export default {
//反馈中心
    feedBack (data) {
        return axios.request({
            url: '/help',
            data: data,
            method: 'post'
        })
    },
    //埋点
    event (data) {
        return axios.request({
            url: '/event',
            data: data,
            method: 'post'
        })
    },
    //获取用户游戏获得的总积分
    getGameTotalIntegral () {
        return axios.request({
            url: '/game/getGameTotalIntegral',
            method: 'get'
        })
    },
    //查询一个游戏的用户最高分，全部最高分
    getMaxGameScore () {
        return axios.request({
            url: '/game/getMaxGameScore',
            method: 'get'
        })
    },
    //根据用户id获取当日游戏免费机会次数
    getGratisGameNum () {
        return axios.request({
            url: '/game/getGratisGameNum',
            method: 'get'
        })
    },
    //根据用户id获取当日消耗积分游戏次数
    getIntegralGameNum () {
        return axios.request({
            url: '/game/getIntegralGameNum',
            method: 'get'
        })
    },
    //开始游戏
    gameBegin (data) {
        return axios.request({
            url: '/game/gameBegin',
            data: data,
            method: 'post'
        })
    },
    saveGameStatisticsLog (data) {
        return axios.request({
            url: '/game/saveGameStatisticsLog',
            data: data,
            method: 'post'
        })
    },
    //记录游戏结果
    saveGameScore (data){
        return axios.request({
            url: '/game/saveGameScore',
            data: data,
            method: 'post'
        })
    },
    //获取app下载地址
    getCall () {
        return axios.request({
            url: '/contact/all',
            method: 'get'
        })
    },
    //获取用户手机号 和 最高游戏得分
    getMaxScoreByUid (data){
        return axios.request({
            url: '/game/getMaxScoreByUid'+'/' + data['userId'],
            method: 'get'
        })
    },
    //校验手机号
    preregisterPhone (data){
        return axios.request({
            url: '/register/checkPhone',
            params: data,
            method: 'get'
        })
    },
    // 预注册
    preregister (data) {
        return axios.request({
            url: '/h5/preregister',
            data: data,
            method: 'post'
        })
    },
    //所有用户游戏排行榜
    allGameScoreTop (data) {
        return axios.request({
            url: '/game/allGameScoreTop',
            params: data,
            method: 'get'
        })
    },
    //抽獎
    lottery () {
        return axios.request({
            url: '/activity/lottery',
            method: 'put'
        })
    },
    //历史获奖名单
    listPrizeHistory () {
        return axios.request({
            url: '/activity/listPrizeHistory',
            method: 'get'
        })
    },
    getDictionary (params) {
        return axios.request({
            url: '/activity/listPrizeHistory',
            params,
            method: 'get'
        })
    },
    //获取会员信息
    getMemberByUserId () {
        return axios.request({
            url: '/member/getMemberByUserId',
            method: 'get'
        })
    },
    //奖池列表
    listPrizePool () {
        return axios.request({
            url: '/activity/listPrizePool',
            method: 'get'
        })
    },
    //抽奖方式
    getLotteryType () {
        return axios.request({
            url: '/activity/getLotteryType',
            method: 'get'
        })
    },
    getIntegralLotteryNumByUid () {
        return axios.request({
            url: '/activity/getIntegralLotteryNumByUid',
            method: 'get'
        })
    },


    //H5分享页面：bagikan
    bagikanGetCall () {
        return axios.request({
            url: '/contact/all',
            method: 'get'
        })
    },
    bagikanDictionary (data) {
        return axios.request({
            url: '/dictionary',
            params: data,
            method: 'get'
        })
    },
    bagikanPreregister (data) {
        return axios.request({
            url: '/h5/preregister',
            data: data,
            method: 'post'
        })
    },
    bagikanPreregisterPhone (data) {
        return axios.request({
            url: '/register/checkPhone',
            params: data,
            method: 'get'
        })
    },
    //横幅：banner

    //消费记录:expensesRecord
    expensesRecordGetChart (data) {
        return axios.request({
            url: '/summary/get/chart',
            data: data,
            method: 'post'
        })
    },
    expensesRecordGetSort (data) {
        return axios.request({
            url: '/summary/get/sort',
            data: data,
            method: 'post'
        })
    },
    expensesRecordGetTotalWeek (data) {
        return axios.request({
            url: '/summary/get/totalWeek',
            params: data,
            method: 'get'
        })
    },
    expensesRecordGetWeek () {
        return axios.request({
            url: '/summary/get/week',
            method: 'get'
        })
    },
    //帮助中心：help-center
    helpCenter (data) {
        return axios.request({
            url: '/help/get' + '/' + data['textFlag'],
            method: 'get'
        })
    },
    //邀请好友：invite

    //邀请注册：loan-details-share
    loanDetailsShareGetCall () {
        return axios.request({
            url: '/contact/all',
            method: 'get'
        })
    },
    loanDetailsShareGetMaxScoreByUid (data) {
        return axios.request({
            url: '/game/getMaxScoreByUid' + '/' + data['userId'],
            method: 'get'
        })
    },
    loanDetailsShareGetLoanproduct (data) {
        return axios.request({
            url: '/product/getOne' + '/' + data['loanProductId'],
            method: 'get'
        })
    },
    loanDetailsSharePreregister (data) {
        return axios.request({
            url: '/h5/preregister',
            data: data,
            method: 'post'
        })
    },
    loanDetailsSharePreregisterPhone (data) {
        return axios.request({
            url: '/register/checkPhone',
            params: data,
            method: 'get'
        })
    },
    //消息中心：msgCenter
    msgCenterUpdate (data) {
        return axios.request({
            url: '/news/update',
            data: data,
            method: 'put'
        })
    },
    msgCenterGetMsgList (data) {
        return axios.request({
            url: '/news/get/pushHistory',
            params: data,
            method: 'get'
        })
    },
    //消息详情msg-details

    //隐私协议：privacy-protocol

    //我的奖品：prize
    prizeQueryPrizeInfoByUserId (data) {
        return axios.request({
            url: '/activity/queryPrizeInfoByUserId',
            params: data,
            method: 'get'
        })
    },
    //协议：protocol
    protocolGetCall () {
        return axios.request({
            url: '/contact/all',
            method: 'get'
        })
    },

    //还款记录：repaymentDetails
    repaymentDetailsQueryBill (data) {
        return axios.request({
            url: '/cardRepayment/queryByBillId' + '/' + data['billId'],
            method: 'get'
        })
    },
    repaymentDetailsQuery (data) {
        return axios.request({
            url: '/creditCard/query',
            params: data,
            method: 'get'
        })
    },
    repaymentDetailsRepayment (data) {
        return axios.request({
            url: '/cardRepayment/repayment',
            data: data,
            method: 'post'
        })
    },
    repaymentDetailsUpdate (data) {
        return axios.request({
            url: '/cardRepayment/update',
            data: data,
            method: 'post'
        })
    },


    //banner列表
    getBanner () {
        return axios.request({
            url: '/banner',
            method: 'get'
        })
    },
    //产品列表
    getProduct (data) {
        return axios.request({
            url: '/product',
            params: data,
            method: 'get'
        })
    },

    //产品详情
    getProductInfo (data) {
        return axios.request({
            url: '/product/getOne/' + data['id'],
            method: 'get'
        })
    },

    //新增产品评论
    addComment(data){
        return axios.request({
            url: '/product/create',
            data: data,
            method: 'post'
        })
    },
    //获取产品评论
    getComment(data){
        return axios.request({
            url: '/product/comment',
            params: data,
            method: 'get'
        })
    },
    //获取产品名称
    getLoanproduct (data){
        return axios.request({
            url: '/product/getOne/' + data['loanProductId'],
            method: 'get'
        })
    }
}