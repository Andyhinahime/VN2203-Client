import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/admin', //配置一個統一的前綴
        name: 'home',
        component: HomeView,
        redirect: '/admin/user/list',
        children: [
            {
                path: 'user/list', //不以 "/" 為開頭 表示相對路徑
                component: () => import('../views/user/UserListView'),
                meta: {
                    title: '酷鯊商城 - 用戶列表'
                }
            }, {
                path: 'user/add-new',
                component: () => import('../views/user/UserAddNewView'),
                meta: {
                    title: '酷鯊商城 - 添加用戶'
                }
            },{
                path: 'admin/list', //不以 "/" 為開頭 表示相對路徑
                component: () => import('../views/admin/AdminListView'),
                meta: {
                    title: '酷鯊商城 - 管理員列表'
                }
            },{
                path: 'admin/add-new', //不以 "/" 為開頭 表示相對路徑
                component: () => import('../views/admin/AdminAddNewView'),
                meta: {
                    title: '酷鯊商城 - 添加管理員'
                }
            },
            {
                path: 'product/list',
                component: () => import('../views/product/ProductListView'),
                meta: {
                    title: '酷鯊商城 - 商品列表'
                }
            }, {
                path: 'product/add-new',
                component: () => import('../views/product/ProductAddNewView'),
                meta: {
                    title: '酷鯊商城 - 添加商品'
                }
            }, {
                path: 'category/add-new',
                component: () => import('../views/category/CategoryAddNewView'),
                meta: {
                    title: ' 酷鯊商城 - 添加分類'
                }
            }, {
                path: 'category/list',
                component: () => import('../views/category/CategoryListView'),
                meta: {
                    title: ' 酷鯊商城 - 分類列表'
                }
            },{
                path: "brand/add-new",
                component: () => import('../views/brand/BrandAddNewView'),
                meta: {
                    title: '酷鯊商城 - 添加品牌'
                }
            },{
                path: "brand/list",
                component: () => import('../views/brand/BrandListView'),
                meta: {
                    title: '酷鯊商城 - 添加品牌'
                }
            },{
                path: "attribute/add-new",
                component: () => import('../views/attribute/AttributeAddNewView'),
                meta: {
                    title: '酷鯊商城 - 添加屬性'
                }
            },{
                path: "attribute/list",
                component: () => import('../views/attribute/AttributeListView'),
                meta: {
                    title: '酷鯊商城 - 屬性列表'
                }
            },{
                path: "album/add-new",
                component: () => import('../views/album/AlbumAddNewView'),
                meta: {
                    title: '酷鯊商城 - 添加相冊'
                }
            },{
                path: "album/list",
                component: () => import('../views/album/AlbumListView'),
                meta: {
                    title: '酷鯊商城 - 相冊列表'
                }
            },{
                path: "attributeTemplate/add-new",
                component: () => import('../views/attributeTemplate/AttributeTemplateAddNewView'),
                meta: {
                    title: '酷鯊商城 - 添加模板'
                }
            },{
                path: "attributeTemplate/list",
                component: () => import('../views/attributeTemplate/AttributeTemplateListView'),
                meta: {
                    title: '酷鯊商城 - 模板列表'
                }
            }
        ]

    },
   {
        path: '/',
        name: 'login',
        component: () => import('../views/LoginView')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : '酷鯊商城管理員頁面';
    next();
})