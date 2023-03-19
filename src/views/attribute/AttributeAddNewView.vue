<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/admin/attribute/list">屬性管理</a> </el-breadcrumb-item>
            <el-breadcrumb-item>添加屬性</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <h3>添加屬性</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="屬性名稱" prop="name" style="width: 500px">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="所屬商品類型" prop="templateId" style="width: 500px">
                <el-input v-model="ruleForm.templateId"></el-input>
            </el-form-item>

            <el-form-item label="屬性是否可選" prop="inputType" style="width: 500px">
                <el-input v-model="ruleForm.inputType"></el-input>
            </el-form-item>

            <el-form-item label="排序值" prop="sort" style="width: 500px">
                <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>



            <el-form-item label="可選值列表" prop="valueList">
                <el-input
                        type="textarea"
                        placeholder="請輸入內容,不得超過30字"
                        v-model="ruleForm.valueList"
                        maxlength="30"
                        show-word-limit
                        style="width: 600px"
                        rows="3"
                >
                </el-input>
            </el-form-item>



            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">新增管理員</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>


        </el-form>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                ruleForm:{
                    name:"",
                    templateId:"",
                    inputType:"",
                    valueList:"",
                    sort:""
                },
                rules: {
                    name: [
                        {required: true, message: '請輸入屬性名稱', trigger: 'blur'},
                        {min: 4, max: 15, message: '長度在 4 到 15 ', trigger: 'blur'}
                    ]
                }
            }
        },
        methods :{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        let url = 'http://localhost:9080/attributes/add-new'
                        console.log('url >>> ' + url);
                        console.log('data >>> ');
                        console.log(this.ruleForm);
                        this.axios
                            .create({headers : {
                                    'Authorization' : localStorage.getItem('jwt') //創建頭部訊息
                                }})
                            .post(url,this.ruleForm).then((response) => {
                            if (response.data.code == 20000) {
                                this.$message({
                                    message: '添加屬性成功！',
                                    type: 'success'
                                });
                                this.resetForm(formName);
                            } else {
                                this.$message.error(response.data.message);
                            }
                        }).catch(function (error) {
                            console.log("響應結果失敗!")
                        })
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>