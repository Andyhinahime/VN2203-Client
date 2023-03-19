<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/admin/attributeTemplate/list">屬性模板管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>新增屬性模板</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <h3 style="margin: 20px 0;">新增屬性模板</h3>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="模板名稱" prop="name" style="width: 500px">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="拼音" prop="pinyin" style="width: 500px">
                <el-input v-model="ruleForm.pinyin"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="sort" style="width: 500px">
                <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>

            <el-form-item label="關鍵字" prop="keywords">
                <el-input
                        type="textarea"
                        placeholder="請輸入內容,不得超過30字"
                        v-model="ruleForm.keywords"
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
        data() {
            return {
                ruleForm: {
                    name: '',
                    pinyin: '',
                    keywords: '',
                    sort: ''
                },
                rules: {
                    name: [
                        {required: true, message: '請輸入模板名稱', trigger: 'blur'},
                        {min: 4, max: 15, message: '長度在 4 到 15 ', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = 'http://localhost:9080/attribute-template/add-new';
                        console.log('url >>> ' + url);
                        console.log('data >>> ');
                        console.log(this.ruleForm);
                        this.axios
                            .create({headers : {
                                    'Authorization' : localStorage.getItem('jwt') //創建頭部訊息
                                }})
                            .post(url, this.ruleForm).then((response) => {
                            console.log(response.data);
                            if (response.data.code == 20000) {
                                this.$message({
                                    message: '新增模板成功！',
                                    type: 'success'
                                });
                                this.resetForm(formName);
                            } else {
                                this.$message.error(response.data.message);
                            }
                        }).catch(function (error) {
                            console.log('響應結果失敗！');
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>