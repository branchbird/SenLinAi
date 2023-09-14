export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/', redirect: '/welcome' },
  {
    path: '/bi',
    name: '数据智能分析',
    icon: 'crown',
    routes: [
      { path: '/bi/add_chart', name: '数据智能分析(同步)', icon: 'LineChartOutlined', component: './Chart' },
      { path: '/bi/asyncChart', name: '数据智能分析(异步)', icon: 'smile', component: './Chart/asyncChart' },
      { path: '/bi/my_chart', name: '我的图表', icon: 'pieChart', component: './Chart/historyChart' },
    ]
  },
  {
    path: '/mq',
    name: '智能问答（MQ）',
    icon: 'crown',
    routes: [
      { path: '/mq/assistant', name: '问答助手', icon: 'smile', component: './Assistant' },
      { path: '/mq/history', name: '我的问答', icon: 'smile', component: './Assistant/history' },
    ]
  },

  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user-list' },
      { icon: 'table', path: '/admin/user-list', component: './Admin/UserList', name: '用户管理' },
      { icon: 'table', path: '/admin/dict', component: './Dict', name: '数据字典' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
  {
    path: '/user/center',
    name: '个人中心',
    icon: 'smile',
    component: './User/UserCenter',
    // https://umijs.org/docs/max/layout-menu#hideinxxx
    hideInMenu: true,
  },
];
