export default [
  {
    path: '/productInfo/:id/:index',
    name: 'productInfo',//产品详情
    component: () => import('@/views/productInfo.vue')
  },{
    path: '/productList',
    name: 'productList',//产品列表
    component: () => import('@/views/productList.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/feed-back.vue')//用户反馈
  },
  {
    path: '/gameList',
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
    path: '/gameShare/:referrerId/:source/:sourceEvent',
    name: 'gameShare',
    component: () => import('@/views/game/game-share.vue')//游戏分享页面
  },
  {
    path: '/lottery',
    name: 'lottery',
    component: () => import('@/views/lottery.vue')//抽奖页面
  },
  {
    path: '/bagikan/:referrerId/:source/:sourceEvent',
    name: 'bagikan',
    component: () => import('@/views/bagikan.vue')
  },
  {
    path: '/banner',
    name: 'banner',
    component: () => import('@/views/banner.vue')
  },
  {
    path: '/expensesRecord',
    name: 'expensesRecord',
    component: () => import('@/views/expensesRecord.vue')
  },
  {
    path: '/help-center',
    name: 'help-center',
    component: () => import('@/views/help-center.vue') //帮助中心
  },
  {
    path: '/invite',
    name: 'invite',
    component: () => import('@/views/invite.vue')
  },
  {
    path: '/loan-details-share/:referrerId/:source/:sourceEvent/:loanProductId',
    name: 'loan-details-share',
    component: () => import('@/views/loan-details-share.vue')
  },
  {
    path: '/msgCenter',
    name: 'msgCenter',
    component: () => import('@/views/msgCenter.vue')//消息中心
  },
  {
    path: '/msg-details/:all',
    name: 'msg-details',
    component: () => import('@/views/msg-details.vue')
  },
  {
    path: '/privacy-protocol',
    name: 'privacy-protocol',
    component: () => import('@/views/privacy-protocol.vue')
  },
  {
    path: '/prize',
    name: 'prize',
    component: () => import('@/views/prize.vue')//奖品列表
  },
  {
    path: '/protocol',
    name: 'protocol',
    component: () => import('@/views/protocol.vue')
  },
  {
    path: '/repaymentDetails',
    name: 'repaymentDetails',
    component: () => import('@/views/repaymentDetails.vue')
  },
]
