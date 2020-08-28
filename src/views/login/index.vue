<template>
  <div class="login">
    <div class="about">
      <h2 style="text-align:center;">信贷管理系统</h2>
      <el-form class="Form" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="account">
          <el-input placeholder="请输入内容" v-model="form.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" style="margin-left:20px;">提交</el-button>
          <el-button type="primary" @click="resetForm('form')" style="margin-left:120px;">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/article";
import { setToken } from "@/utils/token";
export default {
  name: "Home",
  data() {
    return {
      form: {
        account: "admin", // eslint-disable-line no-unused-vars
        password: "admin@123"
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.form).then(res => {
            console.log(res);
            let { account, token } = res.data.data;
            if (res.data.code == '20000') {
              setToken(token);
              this.$router.push("/home");
            }
          });
        } else {
          console.log("error submit");
          return false;
        }

        //     this.$http
        //       .post("user/login", this.form)
        //       .then(res => {
        //         console.log(res);
        //         if (res.data.code == "20000") {
        //           this.$router.push("/home");
        //         }
        //       })
        //       .catch(error => {
        //         console.log(error);
        //       });
        //   } else {
        //     console.log("error submit!");
        //     return false;
        //   }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.login{
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/log_bj1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.about {
  width: 500px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.Form {
  width: 450px;
  height: 200px;
  margin-top: 50px;
  margin-left: 15px;
}
</style>