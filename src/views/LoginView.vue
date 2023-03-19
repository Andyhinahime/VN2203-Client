<template>
    <div>
        <h1>管理員登入</h1>
       <!-- <img src="../assets/logo01.png" alt="" width="10%">-->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="帳號" prop="username">
                <el-input v-model="ruleForm.username" style="width: 300px"></el-input>
            </el-form-item>

            <el-form-item label="密碼" prop="password">
                <el-input v-model="ruleForm.password" style="width: 300px"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登入</el-button>
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
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '請輸入帳號', trigger: 'blur'},
                        {min: 2, max: 15, message: '長度為 2 到 15 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '請輸入密碼', trigger: 'blur'},
                        {min: 2, max: 20, message: '長度為 8 到 20 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //發送axios異部請求
                        let url = "http://localhost:9081/admins/login";
                        let data = {
                            username: this.ruleForm.username,
                            password: this.ruleForm.password
                        }
                        this.axios.post(url, data).then((response) => {
                            if (response.data.code == 20000){
                                this.$message({
                                    message :'登入成功',
                                    type: 'success'
                                });
                                //獲取服務器端響應的jwt並存入 localStorage 中
                                let jwt = response.data.data;
                                console.log(jwt)
                                localStorage.setItem('jwt',jwt)
                                //TODO 跳轉主頁 this.$router.push('/admin')
                                this.$router.push('/admin')
                            }else{
                                this.$message.error('登入失敗,帳號或密碼錯誤')
                            }
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