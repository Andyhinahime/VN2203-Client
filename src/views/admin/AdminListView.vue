<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <h3 style="margin: 20px 0;">管理員列表</h3>

        <el-table
                :data="tableData"
                style="width: 1152px "
                empty-text="目前沒有任何管理員"
                border
        >

            <el-table-column
                    label="ID"
                    width="70"
                    prop="id"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="帳號"
                    width="150"
                    prop="username"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="姓名"
                    width="150"
                    prop="nickname"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="手機號碼"
                    width="180"
                    prop="phone"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="E-mail"
                    width="220"
                    prop="email"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="是否啟用"
                    width="180"
                    prop="enable"
                    align-="center">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.enable"
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#999">
                    </el-switch>
                </template>
            </el-table-column>


            <el-table-column label="操作" width="200" align-="center">
                <template slot-scope="scope">
                    <el-button
                            circle
                            icon="el-icon-edit"
                            size="mini"
                            @click="handleEdit(scope.row.id)"></el-button>
                    <el-button
                            circle
                            icon="el-icon-delete"
                            size="mini"
                            type="danger"
                            @click="openDeleteConfirm(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []

            }
        },
        methods: {
            handleEdit(id) {
                console.log("將編輯id ="+id+"的管理員資料....");
            },
            openDeleteConfirm(id) {
                console.log("確認是否永久刪除"+id+"的管理員資料...");
                this.$confirm('確認永久刪除'+id+'管理員?','警告',{
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
                let url = "http://localhost:9081/admins/"+id+"/delete";
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
                        this.$message.error(response.data.message);
                    }
                    this.loadAdmins(); //重新整理管理員列表
                })
            },loadAdmins:function () {
                let url = "http://localhost:9081/admins";
                let jwt = localStorage.getItem('jwt');
                console.log(jwt);

                this.axios
                    .create({headers : {
                        'Authorization' : localStorage.getItem('jwt') //創建頭部訊息
                    }})
                    .get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000){
                        this.tableData = json.data;
                    }else {
                        this.$message.error(json.data.message);
                    }
                })
            }
        },
        mounted() {
            console.log("開始讀取管理員列表")
            this.loadAdmins();
        }
    }
</script>

<style scoped>

</style>