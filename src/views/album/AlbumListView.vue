<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/admin/album/list">相冊管理</a> </el-breadcrumb-item>
            <el-breadcrumb-item>相冊列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <h3 style="margin: 20px 0;">相冊列表</h3>

        <el-row  style="width: 1500px;margin: 0 auto">
            <el-col :span="5" v-for="a in currentDate" v-bind:key="a.id">
                <el-card :body-style="{ padding: '20px' }"style="margin: 10px">
                    <div style="padding-bottom: 10px;position: relative">
                        <p style="display: inline-block;padding-right: 150px">圖片數量:</p>
                        <el-dropdown  >
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu  slot="dropdown" >
                                <template slot-scope="scope">
                                <el-dropdown-item >
                                    <el-button
                                            @click="handleEdit(a.id,a.name)"
                                            type="text"
                                            size="small">
                                        編輯相冊
                                    </el-button>
                                </el-dropdown-item>

                                <el-dropdown-item >
                                    <el-button
                                            @click="openDeleteConfirm(a.id,a.name)"
                                            type="text"
                                            size="small">
                                        刪除相冊
                                    </el-button>
                                </el-dropdown-item>
                                </template>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <img src="" height="300px" class="image">
                    <div style="padding: 14px;">
                        <span>{{a.name}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentDate:[]
            }
        },
        methods:{
            loadAlbum:function () {
                let url = "http://localhost:9080/albums"
                let jwt = localStorage.getItem('jwt');
                console.log(jwt)
                this.axios
                    .create({headers : {
                            'Authorization' : localStorage.getItem('jwt') //創建頭部訊息
                        }})
                    .get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000){
                        this.currentDate = json.data;
                    }else {
                        this.$message.error(json.data.message);
                    }
                })
            },handleEdit(id,name) {
                console.log("將編輯id ="+id+":"+name+"相冊....");
            },
            openDeleteConfirm(id,name) {
                console.log("確認是否永久刪除"+id+":"+name+"相冊...");
                this.$confirm('確認永久刪除'+id+':'+name+'?','警告',{
                    confirmButtonText:'確認刪除',
                    cancelButtonText:'取消刪除',
                    type:'warning'
                }).then(() => {
                    this.handleDelete(id);
                }).catch(() => {

                });
            },
            handleDelete(id){
                console.log("刪除"+id+"管理員資料")
                let url = "http://localhost:9080/albums/"+id+"/delete";
                this.axios
                    .create({headers : {
                            'Authorization' : localStorage.getItem('jwt') //創建頭部訊息
                        }})
                    .post(url).then((response) => {
                    let json = response.data;
                    console.log("Json:"+json)
                    if (response.data.code == 20000){
                        this.$message({
                            message:'刪除管理員成功!',
                            type:'success'
                        })
                    }else {
                        this.$message.error(json.data.message);
                    }
                    this.loadAlbum(); //重新整理管理員列表
                })
            }

        },mounted() {
            console.log()
            this.loadAlbum();
        }
    }
</script>
<style>

    .image {
        width: 100%;
        display: block;
    }
</style>

<style scoped>

</style>