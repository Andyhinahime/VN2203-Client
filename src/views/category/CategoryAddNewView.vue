<template>
    <div>
        <el-breadcrumb separator="/" >
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/admin/category/list">類別管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>添加類別</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <h3 style="margin: 20px 0px">添加類別</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"
                 class="demo-ruleForm">

            <el-form-item label="上級類別">
                <el-select v-model="ruleForm.parentId" placeholder="請選擇上級分類">
                    <el-option label="軍火" value="1"></el-option>
                    <el-option label="服飾" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="類別名稱" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="排序值" prop="sort">
                <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>

            <el-form-item label="是否啟用">
                 <el-radio v-model="ruleForm.enable" label="1">是</el-radio>
                 <el-radio v-model="ruleForm.enable" label="2">否</el-radio>
            </el-form-item>

            <el-form-item label="是否顯示在導航欄">
            <el-switch
                    v-model="ruleForm.isDisplay"
                    active-value="1"
                    inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
            </el-switch>
            </el-form-item>

            <el-form-item label="類別logo" label-width="100px">
                <!-- name 上傳文件時,文件的參數名,limit="1" 設置只能上傳一張圖片-->
                <el-upload
                        action="/upload"
                        name="picFile"
                        :limit="1"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="關鍵詞">
                <el-input
                        type="text"
                        placeholder="請輸入關鍵詞"
                        v-model="ruleForm.keywords"
                        show-word-limit
                        style="width: 800px;padding: 0;position: relative;left: 10px"
                >
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">創建</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                ruleForm: {
                    name: '',
                    parentId: "1",
                    icon:"",
                    enable:"1",
                    isDisplay:'0',
                    keywords:"",
                    sort:""
                },
                rules:{
                    name: [
                        {required: true, message: '請輸入類別名稱', trigger: 'blur'},
                        {min: 2, max: 15, message: '長度為 2 到 15 个字符', trigger: 'blur'}
                    ]
                    // sort: [
                    //     {pattern:"/^+?/d{1,2}$/",message:'1~99之間',trigger:'blur'}
                    // ]
                }
            }
        },methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
                //當點擊刪除圖片時,會執行handleRemove方法
                //file代表要刪除的文件 file.response代表文件上傳成功後,服務器響應的數據(文件名)
                console.log("文件名=" + file.response)
                let url = "http://localhost:9080/categories/"
                //http://localhost:8080/remove?name=xxx.jpg
                this.axios.post(url + file.response).then(function (response) {
                    console.log("服務器圖片已經刪除")

                })
            },  handlePictureCardPreview(file) {
                this.dialogImageUrl = file.icon;
                this.dialogVisible = true;
            }, handleSuccess(response, file, fileList) {
                console.log("文件上傳完成,圖片名:" + response);

            },  submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        let url = "http://localhost:9080/categories/add-new"
                        this.axios.post(url,this.ruleForm).then((response) => {
                            console.log(response.data)
                            if (response.data.code == 20000){
                                this.$message({
                                    type:"success",
                                    message:"添加類別成功"
                                })
                            }else{
                                this.$message.error(response.data.message)
                            }
                        })
                    }else {
                        console.log("error submit!!")
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>