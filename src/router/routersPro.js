export default [
  {
    // path: '/productInfo/:id/:index',
    path: '/0t06ag2z/vbqryepi/30i879yy/:id/:index',
    name: 'productInfo',//产品详情
    component: () => import('@/views/productInfo.vue')
  },{
    // path: '/productList',
    path: '/75pba9uz/wa6g35up/ggwxcw4r',
    name: 'productList',//产品列表
    component: () => import('@/views/productList.vue')
  },
  {
    // path: '/feedback',
    path: '/cnpg1vrt/uijtjwfn/bnx9v4xu',
    name: 'feedback',
    component: () => import('@/views/feed-back.vue')//用户反馈
  },
  {
    // path: '/gameList',
    path: '/vg6qcncu/di096d4a/ai0iubly',
    name: 'gameList',
    component: () => import('@/views/game/game-list.vue')//游戏列表
  },
  {
    path: '/pileWoodDetail',
    name: 'pileWoodDetail',
    component: () => import('@/views/game/pile-wood-detail.vue')//游戏首页
  },
  {
    path: '/pileWood',
    name: 'pileWood',
    component: () => import('@/views/game/pile-wood.vue')//游戏
  },
  {
    path: '/leaderBoard',
    name: 'leaderBoard',
    component: () => import('@/views/game/leader-board.vue')//游戏排行榜
  },
  {
    // path: '/gameShare/:referrerId/:source/:sourceEvent',
    path: '/0e1lw4q4/usuc6b5z/pywlwrq8/:referrerId/:source/:sourceEvent',
    name: 'gameShare',
    component: () => import('@/views/game/game-share.vue')//游戏分享页面
  },
  {
    // path: '/lottery',
    path: '/omp56r3z/kli62utw/asli08r9',
    name: 'lottery',
    component: () => import('@/views/lottery.vue')//抽奖页面
  },
  {
    // path: '/bagikan/:referrerId/:source/:sourceEvent',
    path: '/t2w58ady/s78tuy1y/phrnylkl/:referrerId/:source/:sourceEvent',
    name: 'bagikan',
    component: () => import('@/views/bagikan.vue')
  },
  {
    path: '/banner',
    name: 'banner',
    component: () => import('@/views/banner.vue')
  },
  {
    // path: '/expensesRecord',
    path: '/mt3y2ald/uw511vk8/iosndskf',
    name: 'expensesRecord',
    component: () => import('@/views/expensesRecord.vue')
  },
  {
    // path: '/help-center',
    path: '/4hzs2cxj/jwqqclvs/5z9y2miv',
    name: 'help-center',
    component: () => import('@/views/help-center.vue') //帮助中心
  },
  {
    // path: '/invite',
    path: '/99fhdina/l5t6i88c/47x0vjkk',
    name: 'invite',
    component: () => import('@/views/invite.vue')
  },
  {
    // path: '/loan-details-share/:referrerId/:source/:sourceEvent/:loanProductId',
    path: '/3matm4rc/w1u3akfs/i4f3br8h/:referrerId/:source/:sourceEvent/:loanProductId',
    name: 'loan-details-share',
    component: () => import('@/views/loan-details-share.vue')
  },
  {
    // path: '/msg-center',
    path: '/8u5k4dml/hnefrxct/2mibwdw9',
    name: 'msgCenter',
    component: () => import('@/views/msgCenter.vue')//消息中心
  },
  {
    path: '/msg-details/:all',
    name: 'msg-details',
    component: () => import('@/views/msg-details.vue')
  },
  {
    // path: '/privacy-protocol',
    path: '//0l5g9r6f/qa5ommab/rdwdmf4k',
    name: 'privacy-protocol',
    component: () => import('@/views/privacy-protocol.vue')
  },
  {
    // path: '/prize',
    path: '/ut57xgm8/298oogzo/772enu37',
    name: 'prize',
    component: () => import('@/views/prize.vue')//奖品列表
  },
  {
    // path: '/protocol',
    path: '/9jnbswog/h1tkff44/ws1z7137',
    name: 'protocol',
    component: () => import('@/views/protocol.vue')
  },
  {
    // path: '/repaymentDetails',
    path: '/161i48qu/kuh6v5vf/rlwkopv2',
    name: 'repaymentDetails',
    component: () => import('@/views/repaymentDetails.vue')
  },
]
