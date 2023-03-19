<template>
    <div>
        <h1>分類列表</h1>
        <el-table
                :data="tableData"
                style="width: 1100px "
                empty-text="目前沒有任何分類"
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
                    label="類別名稱"
                    width="150"
                    prop="name"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="級別"
                    width="150"
                    prop="parentId"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="排序"
                    width="180"
                    prop="sort"
                    align-="center">
            </el-table-column>

            <el-table-column
                    label="導航欄顯示狀態"
                    width="180"
                    prop="isDisplay"
                    align-="center">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isDisplay"
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#999">
                    </el-switch>
                </template>
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


            <el-table-column label="操作" width="119" align-="center">
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
        data(){
            return{
                tableData:[]
            }
        },
        methods :{
            handleEdit(id){
                console.log("將編輯id="+id+"的管理資料");
            },
            openDeleteConfirm(id) {
                console.log("確認是否永久刪除"+id+"的類別資料...");
                this.$confirm('確認永久刪除'+id+'類別?','警告',{
                    confirmButtonText:'確認刪除',
                    cancelButtonText:'取消刪除',
                    type:'warning'
                }).then(() => {
                    this.handleDelete(id);
                }).catch(() => {

                });
            },
            handleDelete(id){
                console.log("刪除"+id+"類別資料")
                let url = "http://localhost:9080/categories/"+id+"/delete";
                this.axios
                    .create({headers : {
                            'Authorization' : localStorage.getItem('jwt') //創建頭部訊息
                        }})
                    .post(url).then((response) => {
                    let json = response.data;
                    console.log("Json:"+json)
                    if (response.data.code = 20000){
                        this.$message({
                            message:'刪除管理員成功!',
                            type:'success'
                        })
                    }else {
                        this.$message.error(response.data.message);
                    }
                    this.loadCategories(); //重新整理分類列表
                })
            },
            loadCategories:function () {
                let url = "http://localhost:9080/categories"
                let jwt = localStorage.getItem('jwt');
                console.log(jwt)
                this.axios
                    .create({headers:{
                        'Authorization' : localStorage.getItem('jwt')
                    }})
                .get(url).then((response) => {
                    let json = response.data;
                    if (json.code == 20000){
                        this.tableData = json.data;
                    }else {
                        this.$message.error(response.data.message);
                    }
                })
            }
        },
        mounted() {
            console.log("開始讀取分類列表")
            this.loadCategories();
        }
    }
</script>

<style scoped>

</style>