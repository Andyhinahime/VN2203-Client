<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <h3>添加管理員</h3>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="帳號" prop="username" style="width: 500px">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密碼" prop="password" style="width: 500px">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item label="姓名" prop="nickname" style="width: 500px">
                <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>

            <el-form-item label="手機號碼" prop="phone" style="width: 500px">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>

            <el-form-item label="E-Mail" prop="email" style="width: 500px">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>

            <el-form-item label="頭像" prop="avatar">
                <el-upload
                        class="upload-demo"
                        action="http://localhost:9081/pictures/add-new"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        >
                    <el-button size="small" type="primary">上傳</el-button>
                    <div slot="tip" class="el-upload__tip">只能上傳jpg/png文件，且不超過500kb</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="個人簡介" prop="description">
                <el-input
                        type="textarea"
                        placeholder="請輸入內容,不得超過30字"
                        v-model="ruleForm.description"
                        maxlength="30"
                        show-word-limit
                        style="width: 600px"
                        rows="3"
                >
                </el-input>
            </el-form-item>


            <el-form-item label="是否啟用" prop="enable">
                <el-switch
                        v-model="ruleForm.enable"
                        active-value="1"
                        inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#999">
                </el-switch>
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
                    username: '',
                    password: '',
                    nickname: '',
                    phone: '',
                    email: "",
                    avatar: "",
                    description: '',
                    enable: 1
                },
                rules: {
                    username: [
                        {required: true, message: '請輸入用戶名', trigger: 'blur'},
                        {min: 4, max: 15, message: '長度在 4 到 15 ', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '請輸入密碼', trigger: 'blur'},
                        {min: 4, max: 15, message: '長度在 4 到 15 ', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let url = 'http://localhost:9081/admins/add-new';
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
                                    message: '添加管理員成功！',
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
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>

<style scoped>

</style>