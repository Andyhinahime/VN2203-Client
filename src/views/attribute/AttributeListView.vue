<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/admin/attribute/list">屬性管理</a> </el-breadcrumb-item>
            <el-breadcrumb-item>屬性列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <h3>屬性列表</h3>
        <el-table
                :data="tableData"
                style="width: 1042px "
                empty-text="目前沒有任何屬性"
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
                    label="屬性名稱"
                    width="150"
                    prop="name"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="屬性值輸入方式"
                    width="150"
                    prop="inputType"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="可選值內容"
                    width="180"
                    prop="valueList"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="排序"
                    width="220"
                    prop="sort"
                    align-="center">
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
                console.log("將編輯id =" + id + "的屬性資料....");
            },
            openDeleteConfirm(id) {
                console.log("確認是否永久刪除" + id + "的屬性資料...");
                this.$confirm('確認永久刪除' + id + '屬性?', '警告', {
                    confirmButtonText: '確認刪除',
                    cancelButtonText: '取消刪除',
                    type: 'warning'
                }).then(() => {
                    this.handleDelete(id);
                }).catch(() => {

                });
            },
            handleDelete(id) {
                console.log("刪除" + id + "屬性資料")
                let url = "http://localhost:9080/attributes/" + id + "/delete";
                this.axios
                    .create({
                        headers: {
                            'Authorization': localStorage.getItem('jwt')
                        }
                    })
                    .post(url).then((response) => {
                    let json = response.data;
                    console.log("JSON:{}", json)
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '刪除屬性成功',
                            type: 'success'
                        })
                    } else {
                        this.$message.error(response.data.message);
                    }
                    this.loadAttributes();
                })
            },
            loadAttributes: function () {
                let url = "http://localhost:9080/attributes";
                let jwt = localStorage.getItem('jwt');
                console.log(jwt);
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
            console.log("開始讀取屬性列表")
            this.loadAttributes();
        }
    }
</script>

<style scoped>

</style>