<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/admin/attributeTemplate/list">屬性模板管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>屬性模板列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <h3 style="margin: 20px 0;">屬性模板列表</h3>

        <el-table
                :data="tableData"
                style="width: 870px "
                empty-text="目前沒有任何模板"
                border
        >

            <el-table-column
                    label="編號"
                    width="70"
                    type="index"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="ID"
                    width="70"
                    prop="id"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="模板名稱"
                    width="180"
                    prop="name"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="屬性數量"
                    width="180"
                    prop=""
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="參數數量"
                    width="180"
                    prop=""
                    align-="center">
            </el-table-column>


            <el-table-column label="操作" width="189" align-="center">
                <template slot-scope="scope">
                    <el-button
                            circle
                            icon="el-icon-edit"
                            size="mini"
                            @click="handleEdit(scope.row.id,scope.row.name)"></el-button>
                    <el-button
                            circle
                            icon="el-icon-delete"
                            size="mini"
                            type="danger"
                            @click="openDeleteConfirm(scope.row.id,scope.row.name)"></el-button>
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
            handleEdit(id,name) {
                console.log("將編輯id =[" + id + "]:"+name+"的管理員資料....")
            },
            openDeleteConfirm(id,name) {
                console.log("確認是否永久刪除" + id + ":"+name+"的模板資料...")
                this.$confirm("確認永久刪除" + id + ":"+name+"?", '警告', {
                    confirmButtonText: '確認刪除',
                    cancelButtonText: '取消刪除',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(id);
                }).catch(() => {

                });
            },
            handleDelete(id) {
                console.log('刪除' + id + '的模板資料')
                let url = "http://localhost9080/attribute-template/" + id + "/delete";
                this.axios
                    .create({
                        headers: {
                            'Authorization': localStorage.getItem('jwt')
                        }
                    })
                    .post(url).then((response) => {
                    let json = response.data;
                    console.log('json:' + json);
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '刪除模板成功',
                            type: 'success'
                        })
                    } else {
                        this.$message.error(response.data.message);
                    }
                    this.loadTemplate();
                })
            },
            loadTemplate: function () {
                let url = "http://localhost:9080/attribute-template";
                let jwt = localStorage.getItem('jwt');
                console.log('jwt:' + jwt)

                this.axios
                    .create({
                        headers: {
                            'Authorization': localStorage.getItem('jwt')
                        }
                    })
                    .get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000) {
                        this.tableData = json.data;
                    } else {
                        this.$message.error(response.data.message);
                    }
                })
            }
        },
        mounted() {
            console.log('開始讀取屬性模板列表')
            this.loadTemplate();
        }
    }
</script>

<style scoped>

</style>





