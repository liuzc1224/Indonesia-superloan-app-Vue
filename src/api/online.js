import axios from '@/libs/api.request'

export default {
//反馈中心
    feedBack (data) {
        return axios.request({
            // url: '/help',
            url: '/jtblbgxq/7nb02mkl/mq3aru8c',
            data: data,
            method: 'post'
        })
    },

    //埋点
    event (data) {
        return axios.request({
            // url: '/event',
            url: '/gbx6mmdj/0nm3xsgy/pgtqmmxc',
            data: data,
            method: 'post'
        })
    },
    //获取用户游戏获得的总积分
    getGameTotalIntegral () {
        return axios.request({
            // url: '/game/getGameTotalIntegral',
            url: '/bmrzjiks/18z3cewj/iv8qslbt',
            method: 'get'
        })
    },
    //查询一个游戏的用户最高分，全部最高分
    getMaxGameScore () {
        return axios.request({
            // url: '/game/getMaxGameScore',
            url: '/uz1oeb09/z58r2868/t0spdt1l',
            method: 'get'
        })
    },
    //根据用户id获取当日游戏免费机会次数
    getGratisGameNum () {
        return axios.request({
            // url: '/game/getGratisGameNum',
            url: '/lufewlre/oswbptw9/fmyswh9u',
            method: 'get'
        })
    },
    //根据用户id获取当日消耗积分游戏次数
    getIntegralGameNum () {
        return axios.request({
            // url: '/game/getIntegralGameNum',
            url: '/2zrszwqa/614q2csm/hncbxjm3',
            method: 'get'
        })
    },
    //开始游戏
    gameBegin (data) {
        return axios.request({
            // url: '/game/gameBegin',
            url: '/eoc83sgv/qun9h969/yj8yiei4',
            data: data,
            method: 'post'
        })
    },
    saveGameStatisticsLog (data) {
        return axios.request({
            // url: '/game/saveGameStatisticsLog',
            url: '/jc0xct7d/kzu3ku9j/xq8jo8pl',
            data: data,
            method: 'post'
        })
    },
    //记录游戏结果
    saveGameScore (data){
        return axios.request({
            // url: '/game/saveGameScore',
            url: '/jjtrl3m5/jzuwbm3y/cyjab1to',
            data: data,
            method: 'post'
        })
    },
    //获取app下载地址
    getCall () {
        return axios.request({
            // url: '/contact/all',
            url: '/c8onz04l/5nsri7sz/42ttbi3a',
            method: 'get'
        })
    },
    //获取用户手机号 和 最高游戏得分
    getMaxScoreByUid (data){
        return axios.request({
            // url: '/game/getMaxScoreByUid/' + data['userId'],
            url: '/64jx4m6i/eihriqe3/fk67izca'+'/'+data['userId'],
            method: 'get'
        })
    },
    //校验手机号
    preregisterPhone (data){
        return axios.request({
            // url: '/register/checkPhone',
            url: '/6ohv8mk5/udviglr5/xu9a7q6g',
            params: data,
            method: 'get'
        })
    },
    // 预注册
    preregister (data) {
        return axios.request({
            // url: '/h5/preregister',
            url: '/mcph0pbs/w1o7epzp/hlezc63h',
            data: data,
            method: 'post'
        })
    },
    //所有用户游戏排行榜
    allGameScoreTop (data) {
        return axios.request({
            // url: '/game/allGameScoreTop',
            url: '/dfy898ri/1irx6fgu/ma7lt3rf',
            params: data,
            method: 'get'
        })
    },
    //抽獎
    lottery () {
        return axios.request({
            // url: '/activity/lottery',
            url: '/pqd9p248/keewxipm/bceq6ciw',
            method: 'put'
        })
    },
    //历史获奖名单
    listPrizeHistory () {
        return axios.request({
            // url: '/activity/listPrizeHistory',
            url: '/b78m2gng/85qz5o5b/9lc7jqg0',
            method: 'get'
        })
    },
    getDictionary (params) {
        return axios.request({
            // url: '/activity/listPrizeHistory',
            url: '/b78m2gng/85qz5o5b/9lc7jqg0',
            params,
            method: 'get'
        })
    },
    //获取会员信息
    getMemberByUserId () {
        return axios.request({
            // url: '/member/getMemberByUserId',
            url: '/ohj8jqu9/qplr9c5b/f3shlou1',
            method: 'get'
        })
    },
    //奖池列表
    listPrizePool () {
        return axios.request({
            // url: '/activity/listPrizePool',
            url: '/cqm9s80s/xb5ohq2n/x8y7ah4g',
            method: 'get'
        })
    },
    //抽奖方式
    getLotteryType () {
        return axios.request({
            // url: '/activity/getLotteryType',
            url: '/pyhixjqp/qgkl20xu/jbj304r2',
            method: 'get'
        })
    },
    getIntegralLotteryNumByUid () {
        return axios.request({
            // url: '/activity/getIntegralLotteryNumByUid',
            url: '/fhpzu18f/wo1yxtaw/xcebtiam',
            method: 'get'
        })
    },


    //H5分享页面：bagikan
    bagikanGetCall () {
        return axios.request({
            // url: '/contact/all',
            url: '/c8onz04l/5nsri7sz/42ttbi3a',
            method: 'get'
        })
    },
    bagikanDictionary (data) {
        return axios.request({
            // url: '/dictionary',
            url: '/q1aau2fz/idhd0er1/yfca3nih',
            params: data,
            method: 'get'
        })
    },
    bagikanPreregister (data) {
        return axios.request({
            // url: '/h5/preregister',
            url: '/mcph0pbs/w1o7epzp/hlezc63h',
            data: data,
            method: 'post'
        })
    },
    bagikanPreregisterPhone (data) {
        return axios.request({
            // url: '/register/checkPhone',
            url: '/6ohv8mk5/udviglr5/xu9a7q6g',
            params: data,
            method: 'get'
        })
    },
    //横幅：banner

    //消费记录:expensesRecord
    expensesRecordGetChart (data) {
        return axios.request({
            // url: '/summary/get/chart',
            url: '/84ayrpbx/gx1hvcun/7csqy0zu',
            data: data,
            method: 'post'
        })
    },
    expensesRecordGetSort (data) {
        return axios.request({
            // url: '/summary/get/sort',
            url: '/69kusn97/z8gbn9rc/2k97trz2',
            data: data,
            method: 'post'
        })
    },
    expensesRecordGetTotalWeek (data) {
        return axios.request({
            // url: '/summary/get/totalWeek',
            url: '/1o77dysc/2b43up2x/pebfwbrl',
            params: data,
            method: 'get'
        })
    },
    expensesRecordGetWeek () {
        return axios.request({
            // url: '/summary/get/week',
            url: '/llfra9dl/zy1rk5sm/314g9zt2',
            method: 'get'
        })
    },
    //帮助中心：help-center
    helpCenter (data) {
        return axios.request({
            // url: '/help/get' + '/' + data['textFlag'],
            url: '/9wfo7iz1/x1vsb369/aalf2vqx'+'/'+data['textFlag'],
            method: 'get'
        })
    },
    //邀请好友：invite

    //邀请注册：loan-details-share
    loanDetailsShareGetCall () {
        return axios.request({
            // url: '/contact/all',
            url: '/c8onz04l/5nsri7sz/42ttbi3a',
            method: 'get'
        })
    },
    loanDetailsShareGetMaxScoreByUid (data) {
        return axios.request({
            // url: '/game/getMaxScoreByUid' + '/' + data['userId'],
            url: '/64jx4m6i/eihriqe3/fk67izca'+'/'+data['userId'],
            method: 'get'
        })
    },
    loanDetailsShareGetLoanproduct (data) {
        return axios.request({
            // url: '/product/getOne' + '/' + data['loanProductId'],
            url: '/wl6mz7rc/aqq7w1ws/gpf1y5e7'+'/'+data['loanProductId'],
            method: 'get'
        })
    },
    loanDetailsSharePreregister (data) {
        return axios.request({
            // url: '/h5/preregister',
            url: '/mcph0pbs/w1o7epzp/hlezc63h',
            data: data,
            method: 'post'
        })
    },
    loanDetailsSharePreregisterPhone (data) {
        return axios.request({
            // url: '/register/checkPhone',
            url: '/6ohv8mk5/udviglr5/xu9a7q6g',
            params: data,
            method: 'get'
        })
    },
    //消息中心：msgCenter
    msgCenterUpdate (data) {
        return axios.request({
            // url: '/news/update',
            url: '/esojngxq/a4g349i2/0rxadp7z',
            data: data,
            method: 'put'
        })
    },
    msgCenterGetMsgList (data) {
        return axios.request({
            // url: '/news/get/pushHistory',
            url: '/1d0d3xt2/cmgmgpl7/iwxd1hgy',
            params: data,
            method: 'get'
        })
    },
    //消息详情msg-details

    //隐私协议：privacy-protocol

    //我的奖品：prize
    prizeQueryPrizeInfoByUserId (data) {
        return axios.request({
            // url: '/activity/queryPrizeInfoByUserId',
            url: '/tcnymp4l/wed29lxb/grpyvxrn',
            params: data,
            method: 'get'
        })
    },
    //协议：protocol
    protocolGetCall () {
        return axios.request({
            // url: '/contact/all',
            url: '/c8onz04l/5nsri7sz/42ttbi3a',
            method: 'get'
        })
    },

    //还款记录：repaymentDetails
    repaymentDetailsQueryBill (data) {
        return axios.request({
            // url: '/cardRepayment/queryByBillId' + '/' + data['billId'],
            url: '/qlanlgje/x5hso6es/qybcb1c5'+'/'+data['billId'],
            method: 'get'
        })
    },
    repaymentDetailsQuery (data) {
        return axios.request({
            // url: '/creditCard/query',
            url: '/cqw8tee9/3kp852kh/pclypx3a',
            params: data,
            method: 'get'
        })
    },
    repaymentDetailsRepayment (data) {
        return axios.request({
            // url: '/cardRepayment/repayment',
            url: '/sbbvmajg/li8zkhr3/r3rugr60',
            data: data,
            method: 'post'
        })
    },
    repaymentDetailsUpdate (data) {
        return axios.request({
            // url: '/cardRepayment/update',
            url: '/johg7hfj/mk14kz2q/17crvgjl',
            data: data,
            method: 'post'
        })
    },


    //banner列表
    getBanner () {
        return axios.request({
            // url: '/banner',
            url: '/o4au30nr/avd4ct7b/djnvcm8p',
            method: 'get'
        })
    },
    //产品列表
    getProduct (data) {
        return axios.request({
            // url: '/product',
            url: '/2hsz37bi/yvdb6768/jjmikd52',
            params: data,
            method: 'get'
        })
    },

    //产品详情
    getProductInfo (data) {
        return axios.request({
            // url: '/product/getOne/' + data['id'],
            url: '/wl6mz7rc/aqq7w1ws/gpf1y5e7'+'/' + data['id'],
            method: 'get'
        })
    },

    //新增产品评论
    addComment(data){
        return axios.request({
            // url: '/product/create',
            url: '/y14no30t/7bu2e1sb/5f7kxdks',
            data: data,
            method: 'post'
        })
    },
    //获取产品评论
    getComment(data){
        return axios.request({
            // url: '/product/comment',
            url: '/0r4jh8xx/x2iijuvc/epprsmww',
            params: data,
            method: 'get'
        })
    },
    //获取产品名称
    getLoanproduct (data){
        return axios.request({
            // url: '/product/getOne/' + data['loanProductId'],
            url: '/wl6mz7rc/aqq7w1ws/gpf1y5e7'+'/' + data['loanProductId'],
            method: 'get'
        })
    }
}