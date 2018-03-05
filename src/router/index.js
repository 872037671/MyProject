import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard1',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  // 营销管理
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: 'marketing',
      icon: 'dashboard',
      noCache: true
    },
    children: [
      { path: 'grouponIndex', component: _import('groupon/index'), name: 'groupon', hidden: true, meta: { title: 'groupon', icon: 'shoppingCard', noCache: true }}, // 团购活动
      { path: 'cutGroupIndex', component: _import('cutGroup/index'), name: 'cutGroup', hidden: true, meta: { title: 'cutGroup', icon: 'fightShoping', noCache: true }}, // 拼团活动
      { path: 'bargainIndex', component: _import('bargain/index'), name: 'bargain', hidden: true, meta: { title: 'bargain', icon: 'Bargain', noCache: true }}, // 砍价活动
      { path: 'voteIndex', component: _import('vote/index'), name: 'vote', hidden: true, meta: { title: 'vote', icon: 'vote', noCache: true }}, // 投票活动
      { path: 'seckillIndex', component: _import('seckill/index'), name: 'seckill', hidden: true, meta: { title: 'seckill', icon: 'Seckill', noCache: true }}, // 爆款秒杀
      { path: 'redsplitIndex', component: _import('redsplit/index'), name: 'redsplit', hidden: true, meta: { title: 'redsplit', icon: 'fission', noCache: true }}, // 红包裂变
      { path: 'openMilk', component: _import('openMilk/index'), name: 'openMilk', hidden: true, meta: { title: 'openMilk', icon: 'fission', noCache: true }}, // 一元开奶
      { path: 'leaflet', component: _import('leaflet/index'), name: 'leaflet', hidden: false, meta: { title: 'leaflet', icon: 'fission', noCache: true }}, // 微传单
      { path: 'addGroupon', hidden: true, component: _import('groupon/addGroupon'), name: 'addGroupon', meta: { title: 'addGroupon' }}, // 新增团购活动
      { path: 'grouponReport', component: _import('groupon/report'), name: 'grouponReport', hidden: true, meta: { title: 'grouponreport' }}, // 团购活动报表
      { path: 'grouponActivity', hidden: true, component: _import('groupon/activitySetup'), name: 'grouponActivity', meta: { title: 'grouponActivity' }}, // 团购活动素材
      { path: 'duckIconGroupon', hidden: true, component: _import('groupon/icon'), name: 'duckIconGroupon', meta: { title: 'duckIconGroupon' }}, // 团购活动点亮图标
      { path: 'redpacketGroupon', hidden: true, component: _import('groupon/redpacket'), name: 'redpacketGroupon', meta: { title: 'redpacketGroupon' }}, // 团购活动分裂红包
      { path: 'cutGroupReport', hidden: true, component: _import('cutGroup/report'), name: 'cutGroupReport', meta: { title: 'cutgroupreport' }}, // 拼团活动报表
      { path: 'cutGroupIndex/addcutGroup', hidden: true, component: _import('cutGroup/addcutGroup'), name: 'addcutGroup', meta: { title: 'addcutGroup' }}, // 新增拼团活动
      { path: 'cutGroupIndex/activitySetup', hidden: true, component: _import('cutGroup/activitySetup'), name: 'cutGroupactivitySetup', meta: { title: 'activitySetup' }}, // 拼团活动素材
      { path: 'redpacket', component: _import('cutGroup/redpacket'), name: 'redpacket', hidden: true, meta: { title: 'redpacket' }}, // 分裂红包
      { path: 'cutGroupIndex/duckIcon', hidden: true, component: _import('cutGroup/icon'), name: 'cutGroupduckIcon', meta: { title: 'cutGroupduckIcon' }}, // 点亮图标
      { path: 'bargainReport', hidden: true, component: _import('bargain/report'), name: 'bargainReport', meta: { title: 'bargainReport' }}, // 砍价活动报表
      { path: 'addbargain', hidden: true, component: _import('bargain/addbargain'), name: 'addbargain', meta: { title: 'addbargain' }}, // 新增砍价活动
      { path: 'bargainActivity', hidden: true, component: _import('bargain/activitySetup'), name: 'bargainActivity', meta: { title: 'bargainActivity' }}, // 砍价活动素材
      { path: 'duckIconbargain', hidden: true, component: _import('bargain/icon'), name: 'duckIconbargain', meta: { title: 'duckIconbargain' }}, // 砍价活动点亮图标
      { path: 'redpacketbargain', hidden: true, component: _import('bargain/redpacket'), name: 'redpacketbargain', meta: { title: 'redpacketbargain' }}, // 砍价活动分裂红包
      { path: 'voteReport', hidden: true, component: _import('vote/report'), name: 'voteReport', meta: { title: 'voteReport' }}, // 投票活动报表
      { path: 'addVote', hidden: true, component: _import('vote/addVote'), name: 'addVote', meta: { title: 'addVote' }}, // 新增投票活动
      { path: 'Extension', hidden: true, component: _import('vote/Extension'), name: 'Extension', meta: { title: 'Extension' }}, // 新增投票活动
      { path: 'redPackageIndex', component: _import('redPackage/index'), name: 'redPackage', meta: { title: 'redPackage', icon: 'redPack', noCache: true }}, // 分享红包
      { path: 'seckillReport', hidden: true, component: _import('seckill/report'), name: 'seckillReport', meta: { title: 'seckillReport' }}, // 秒杀活动报表
      { path: 'addSeckill', hidden: true, component: _import('seckill/addSeckill'), name: 'addSeckill', meta: { title: 'addSeckill' }}, // 新增秒杀活动
      { path: 'SeckillIndex/activitySetup', hidden: true, component: _import('seckill/activitySetup'), name: 'SeckillactivitySetup', meta: { title: 'SeckillactivitySetup' }}, // 秒杀活动素材
      { path: 'duckIconSeckill', hidden: true, component: _import('seckill/icon'), name: 'duckIconSeckill', meta: { title: 'duckIconSeckill' }}, // 秒杀活动点亮图标
      { path: 'redpacketSeckill', hidden: true, component: _import('seckill/redpacket'), name: 'redpacketSeckill', meta: { title: 'redpacketSeckill' }}, // 团购活动分裂红包
      { path: 'redsplitReport', hidden: true, component: _import('redsplit/report'), name: 'redsplitReport', meta: { title: 'redsplitReport' }}, // 红包裂变活动报表
      { path: 'addredsplit', hidden: true, component: _import('redsplit/addredsplit'), name: 'addredsplit', meta: { title: 'addredsplit' }}, // 新增红包裂变活动
      { path: 'redsplitActivity', hidden: true, component: _import('redsplit/activitySetup'), name: 'redsplitActivity', meta: { title: 'redsplitActivity' }}, // 红包裂变活动素材
      { path: 'openMilkAddActivity', component: _import('openMilk/Activity/addActivity'), name: 'addActivity', hidden: true, meta: { title: 'openMilkAddActivity' }}, // 添加一元开奶活动
      { path: 'openMilkList', component: _import('openMilk/Activity/list'), name: 'openMilklist', hidden: true, meta: { title: 'openMilklist' }}, // 一元开奶活动列表页
      { path: 'openMilkOrderList', component: _import('openMilk/Activity/orderList'), name: 'openMilkOrderList', hidden: true, meta: { title: 'openMilkOrderList' }}, // 一元开奶活动订单列表页
      { path: 'openMilkAddHospital', component: _import('openMilk/hospital/addHospital'), name: 'addHospital', hidden: true, meta: { title: 'openMilkHospital' }}, // 添加医院设置
      { path: 'openMilkHospitalList', component: _import('openMilk/hospital/list'), name: 'openMilkHospitallist', hidden: true, meta: { title: 'openMilkHospitallist' }}, // 一元开奶医院设置列表页
      { path: 'openMilkAddCuiru', component: _import('openMilk/cuiru/addCuiru'), name: 'openMilkAddCuiru', hidden: true, meta: { title: 'openMilkAddCuiru' }}, // 添加催乳师设置
      { path: 'openMilkCuiru', component: _import('openMilk/cuiru/list'), name: 'openMilkCuiru', hidden: true, meta: { title: 'openMilkCuiru' }}, // 一元开奶催乳师设置列表页
      { path: 'leaflet/addLeaflet', hidden: true, component: _import('leaflet/addLeaflet'), name: 'addLeaflet', meta: { title: 'addLeaflet' }}, // 微传单活动设置
      { path: 'leaflet/activitySetup', hidden: true, component: _import('leaflet/activitySetup'), name: 'leafletactivitySetup', meta: { title: 'leafletactivitySetup' }} // 微传单活动素材
    ]
  }
  /* {
    path: '/groupon',
    component: Layout,
    meta: {
      title: 'groupon',
      icon: 'component'
    },
    children: [{
      path: 'index',
      component: _import('groupon/index'),
      name: 'groupon',
      meta: { title: 'groupon', icon: 'component', noCache: true }
    },
    {
      path: 'report',
      hidden: true,
      name: 'report',
      component: _import('groupon/report'),
      meta: { title: 'report' }
    }]
  },
  {
    path: '/cutGroup',
    component: Layout,
    meta: {
      title: 'cutGroup',
      icon: 'component'
    },
    children: [{
      path: 'index',
      component: _import('cutGroup/index'),
      name: 'cutGroup',
      meta: { title: 'cutGroup', icon: 'component', noCache: true }
    },
    {
      path: 'report',
      hidden: true,
      name: 'cutGroupreport',
      component: _import('cutGroup/report'),
      meta: { title: 'report' }
    }]
  }*/
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/CustomerSettingIndex',
    component: Layout,
    redirect: 'dashboard',
    meta: {
      title: 'setting_sysem',
      icon: 'dashboard',
      noCache: true
    },
    children: [{
      path: 'CustomerSettingIndex',
      component: _import('CustomerSetting/index'),
      name: 'CustomerSettingIndex',
      meta: {
        title: 'CustomerSettingIndex',
        icon: 'component',
        noCache: true
      }
    }]
  },
  /*
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: { role: ['admin'] },
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        role: ['admin']
      }
    }]
  },

  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
    ]
  },

  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
      { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
          { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
          { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
      { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', meta: { title: 'exportZip', icon: 'zip' }}]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  },
  */

  { path: '*', redirect: '/404', hidden: true }
]
