<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/admin/brand/list">品牌管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>品牌列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <h3>品牌列表</h3>
        <el-table
                :data="tableData"
                empty-text="目前沒有任何品牌"
                border
                style="width: 100%  ; display: inline-block ; text-align: center" >
            <el-table-column
                    type="index"
                    label="編號"
                    width="50">
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="品牌名稱"
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="pinyin"
                    label="首字母"
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="sort"
                    label="排序"
                    width="50">
            </el-table-column>

            <el-table-column
                    prop="keywords"
                    label="關鍵詞"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="enable"
                    label="顯示狀態"
                    width="180">
                <template slot-scope="scope">
                <el-switch
                        v-model="scope.row.enable"
                        active-color="#13ce66"
                        :active-value="1"
                        :inactive-value="0"
                        inactive-color="#ff4949">
                </el-switch>
                </template>
            </el-table-column>

            <el-table-column
                    prop="productCount"
                    label="商品數量"
                    width="180">
            </el-table-column>

            <el-table-column
                    label="好評數量 / 總評論數量"
                    width="180">
                <template slot-scope="scope">
                    <span v-text="scope.row.positiveCommentCount"></span> /
                    <span v-text="scope.row.commentCount"></span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row.id)">編輯</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="openDeleteConfirm(scope.row.id,scope.row.name)">刪除</el-button>
                </template>
            </el-table-column>

        </el-table>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                currentPage4:""
            }
        }, methods: {
            loadBrands: function () {
                let url = "http://localhost:9080/brands";
                let jwt = localStorage.getItem('jwt');
                console.log(jwt)
                this.axios
                    .create({headers : {
                            'Authorization' : localStorage.getItem('jwt') //創建頭部訊息
                        }})
                    .get(url).then((response) => {
                    console.log(response.data);
                    let jsonResult = response.data
                    if (jsonResult.code == 20000) {
                        this.tableData = jsonResult.data;
                    } else {
                        this.$message.error(jsonResult.message)
                    }

                })
            },handleEdit(id) {
                console.log("根據ID值編輯資料,id值:"+id);
            },
            openDeleteConfirm(id,name) {
                this.$confirm('此操作將永久刪除「'+name+'」品牌, 是否刪除?', '刪除確認', {
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.handleDelete(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleDelete(id,name) {
                console.log("根據ID值刪除資料,id值:"+id);
                let url = "http://localhost:9080/brands/"+id+"/delete";
                this.axios.post(url).then((response) => {
                    let jsonResult = response.data;
                    if (jsonResult.code == 20000){
                        this.$message({
                            type:"success",
                            message:"刪除成功!"
                        })
                        //location.reload();
                    } else {
                        this.$message.error(jsonResult.message)
                    }
                    //重新執行顯示品牌列表
                    this.loadBrands();
                })


            }

        }
   /*     , created() {  //已創建 : 在mounted,顯示頁面之前執行
            console.log("created")
            this.loadBrands();
        }*/
        ,
        mounted() {
            console.log("mounted")
            this.loadBrands();
        }

    }
</script>

<style scoped>

</style>