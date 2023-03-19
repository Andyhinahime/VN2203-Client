<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png">
         <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <el-container>
            <el-header class="layout-header">上半部分</el-header>

            <el-container class="layout-body">

                <el-aside class="layout-aside">
                    <!--:default-active="this.$router.currentRoute.path"   根據網址輸入使導航欄定位在對應的位置-->
                    <el-menu
                            router
                            :default-active="this.$router.currentRoute.path"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user-solid"></i>
                                <span>用戶管理</span>
                            </template>
                            <el-menu-item index="/admin/user/list">用戶列表</el-menu-item>
                            <el-menu-item index="/admin/user/add-new">添加用戶</el-menu-item>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-s-custom"></i>
                                <span>管理員管理</span>
                            </template>
                            <el-menu-item index="/admin/admin/list">管理員列表</el-menu-item>
                            <el-menu-item index="/admin/admin/add-new">添加管理員</el-menu-item>
                        </el-submenu>


                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-s-goods"></i>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item index="/admin/product/list">商品列表</el-menu-item>
                            <el-menu-item index="/admin/product/add-new">添加商品</el-menu-item>
                        </el-submenu>

                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>分類管理</span>
                            </template>
                            <el-menu-item index="/admin/category/list">分類列表</el-menu-item>
                            <el-menu-item index="/admin/category/add-new">添加分類</el-menu-item>
                        </el-submenu>

                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-s-ticket"></i>
                                <span>品牌管理</span>
                            </template>
                                <el-menu-item index="/admin/brand/list">品牌列表</el-menu-item>
                                <el-menu-item index="/admin/brand/add-new">添加品牌</el-menu-item>

                        </el-submenu>

                        <el-submenu index="6">
                            <template slot="title">
                                <i class="el-icon-s-data"></i>
                                <span>屬性管理</span>
                            </template>
                            <el-menu-item index="/admin/attribute/list">屬性列表</el-menu-item>
                            <el-menu-item index="/admin/attribute/add-new">添加屬性</el-menu-item>

                        </el-submenu>

                        <el-submenu index="7">
                            <template slot="title">
                                <i class="el-icon-camera-solid"></i>
                                <span>相冊管理</span>
                            </template>
                            <el-menu-item index="/admin/album/list">相冊列表</el-menu-item>
                            <el-menu-item index="/admin/album/add-new">添加相冊</el-menu-item>
                        </el-submenu>

                        <el-submenu index="8">
                            <template slot="title">
                                <i class="el-icon-brush"></i>
                                <span>屬性模板管理</span>
                            </template>
                            <el-menu-item index="/admin/attributeTemplate/list">模板列表</el-menu-item>
                            <el-menu-item index="/admin/attributeTemplate/add-new">添加模板</el-menu-item>
                        </el-submenu>

                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view/>
                </el-main>

            </el-container>
        </el-container>
    </div>
</template>

<style>
    * {
        margin: 0;
    }

    .layout-header {
        background-color: darksalmon;
        color: darkblue;
    }

    .layout-aside {
        background-color: dodgerblue;
    }

    .layout-body {
        position: absolute;
        top: 60px;
        right: 0;
        bottom: 0;
        left: 0;
    }

</style>

<script>
    /*// @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
      name: 'HomeView',
      components: {
        HelloWorld
      }
    }*/
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
