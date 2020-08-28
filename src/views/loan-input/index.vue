<template>
  <div class="app-container">
    <div class="filter-container"></div>
    <el-form ref="temp" :rules="rules" :model="temp" label-position="left" label-width="80px">
      <!-- 个人信息 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人基本信息</span>
        </div>
        <!-- gutter	栅格间隔 -->
        <!-- xs	<768px 响应式栅格数或者栅格属性对象
        sm	≥768px 响应式栅格数或者栅格属性对象
        md	≥992px 响应式栅格数或者栅格属性对象
        lg	≥1200px 响应式栅格数或者栅格属性对象-->
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <!-- label	标签文本
              prop	表单域 model 字段，
            在使用 validate、resetFields 方法的情况下，该属性是必填的-->
            <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker v-model="temp.birthday" type="datetime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="temp.sex" class="filter-item" placeholder="place select">
                <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
                <el-option
                  v-for="item in sexOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="身份证" prop="identity_card">
                <!-- 数字类型的验证需要在 v-model 处加上 .number 的修饰符，
                这是 Vue 自身提供的用于将绑定值转化为 number 类型的修饰符 -->
              <el-input v-model.number="temp.identity_card" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="婚姻状况" prop="marriage">
              <el-select v-model="temp.marriage" class="filter-item" placeholder="place select">
                <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
                <el-option
                  v-for="item in marriagenOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="教育程度" prop="education">
              <el-select v-model="temp.education" class="filter-item" placeholder="place select">
                <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
                <el-option
                  v-for="item in educationOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="居住地址" prop="address1">
              <el-input v-model="temp.address1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="户籍地址" prop="address2">
              <el-input v-model="temp.address2" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="住宅电话" prop="phone">
              <el-input v-model.number="temp.phone" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="手机号" prop="mobilephone">
              <el-input v-model.number="temp.mobilephone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 职业信息 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>公司基本信息</span>
        </div>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="现职公司" prop="company">
              <el-input v-model="temp.company" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="所属行业" prop="trade">
              <el-select v-model="temp.trade" class="filter-item" placeholder="place select">
                <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
                <el-option
                  v-for="item in companyOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="职位" prop="position">
              <el-input v-model="temp.position" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <el-form-item label="公司地址" prop="company_address">
              <el-input v-model="temp.company_address" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="公司类型" prop="company_type">
              <el-input v-model="temp.company_type" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="公司邮箱" prop="company_email">
              <el-input v-model="temp.company_email" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="公司电话" prop="company_phone">
              <el-input v-model.number="temp.company_phone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 收支情况 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人收支信息</span>
        </div>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="个人收入" prop="income">
              <el-input v-model="temp.income" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 家庭联系人 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>家庭联系人</span>
        </div>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="关系1" prop="contact">
              <el-input v-model="temp.contact" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="姓名" prop="contact_name">
              <el-input v-model="temp.contact_name" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="联系电话" prop="contact_phone">
              <el-input v-model.number="temp.contact_phone" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <!-- 工作证明人 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>工作证明人</span>
        </div>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="关系2" prop="contact2">
              <el-input v-model="temp.contact2" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="姓名" prop="contact2_name">
              <el-input v-model="temp.contact2_name" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="联系电话" prop="contact2_phone">
              <el-input v-model.number="temp.contact2_phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="部门" prop="contact2_dep">
              <el-input v-model="temp.contact2_dep" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="职位" prop="contact2_pos">
              <el-input v-model="temp.contact2_pos" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-form-item label="备注">
                <!-- autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，
                并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。 -->
              <el-input v-model="temp.remark" :autosize="{minRows:2,maxRows:40}" type="textarea" placeholder="请输入备注信息"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFrom('temp')">提交</el-button>
        <el-button @click="clear('temp')">重置</el-button>
    </div>
  </div>
</template>

<script>
import {createLoan} from '@/api/article'
import {sexOptions, marriagenOptions,educationOptions,companyOptions} from "@/utils/selectData"
// const sexOptions = [
//   { key: "man", display_name: "男" },
//   { key: "woman", display_name: "女" }
// ];
// const marriagenOptions = [
//   { key: "married", display_name: "已婚" },
//   { key: "unmarried", display_name: "未婚" }
// ];
// const educationOptions = [
//   { key: "college", display_name: "大学" },
//   { key: "highschool", display_name: "高中" }
// ];
// const companyOptions = [
//   { key: "enducation", display_name: "教育" },
//   { key: "finance", display_name: "金融" }
// ];
export default {
  name: "ComplexTable",
  data() {
    return {
      temp: {
        name: "", //姓名
        birthday: "", //出生日期
        identity_card: "", //身份证
        sex: "", //性别
        marriagen: "", //婚姻状况
        education: "", //教育程度
        address1: "", //居住地址
        address2: "", //户籍地址
        phone: "", //住宅电话
        mobilephone: "", //手机号
        company: "", //现职公司
        trade: "", //所属行业
        position: "", //职位
        company_address: "", //公司地址
        company_type: "", //公司类型
        company_email: "", //公司邮箱
        company_phone: "", //公司电话
        income: "" ,//个人收入
        contact:"",//关系1
        contact_name:"",//联系人姓名
        contact_phone:"",//联系人电话
        contact2:"",//关系2
        contac2_name:"",//联系人2姓名
        contact2_phone:"",//联系人2电话
        contac2_dep:"",//联系人2部门
        contact2_pos:"",//联系人2职位
        remark:"",//备注信息
      },
      rules: {
        name: [
          // 是否必须： required:true|| fasle
          // 'blur'是鼠标失去焦点的时候会触发验证
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在2到5个字符", trigger: "blur" }
        ],
        birthday: [
          //  type 显示类型
          // 'change'是表单的值改变的时候会触发验证
          {
            type: "date",
            required: true,
            message: "请输入姓名",
            trigger: "change"
          }
        ],
        identity_card: [
          { required: true, message: "请输入身份证", trigger: "change" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        marriage: [
          { required: true, message: "请选择婚姻状况", trigger: "change" }
        ],
        education: [
          { required: true, message: "请选择受教育程度", trigger: "change" }
        ],
        address1: [
          { required: true, message: "请输入现住址", trigger: "blur" }
        ],
        address2: [
          { required: true, message: "请输入户籍", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入住宅电话", trigger: "blur" }],
        mobilephone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        company: [
          { required: true, message: "请输入现职公司名", trigger: "blur" }
        ],
        trade: [
          { required: true, message: "请选择所属行业", trigger: "change" }
        ],
        position: [{ required: true, message: "请输入职位", trigger: "blur" }],
        company_address: [
          { required: true, message: "请输入公司地址", trigger: "blur" }
        ],
        company_type: [
          { required: true, message: "请输入公司类型", trigger: "blur" }
        ],
        company_email: [
          { required: true, message: "请输入公司邮箱", trigger: "blur" }
        ],
        company_phone: [
          { required: true, message: "请输入公司电话", trigger: "blur" }
        ],
        income: [{ required: true, message: "请输入你的收入", trigger: "blur" }],
        contact: [
          { required: true, message: "请输入关系", trigger: "blur" }
        ],
        contact_name: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        contact_phone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" }
        ],
        contact2: [
          { required: true, message: "请输入关系2", trigger: "blur" }
        ],
        contact2_name: [
          { required: true, message: "请输入联系人2姓名", trigger: "blur" }
        ],
        contact2_phone: [
          { required: true, message: "请输入联系人2电话", trigger: "blur" }
        ],
        contact2_dep: [
          { required: true, message: "请输入联系人2所属部门", trigger: "blur" }
        ],
        contact2_pos: [
          { required: true, message: "请输入联系人2职位", trigger: "blur" }
        ],
      },
      sexOptions,
      marriagenOptions,
      educationOptions,
      companyOptions
    };
  },
  methods:{
    //   提交信息
    // 表单验证 this.$refs[formName].validate()
    // formName是form的ref属性
      submitFrom(formName){
        console.log(this.temp);
        this.$refs.[formName].validate((valid) =>{
            if(valid){
                createLoan(this.temp).then( res =>{
                    console.log(res);
                    if(res.data.code == '20000'){
                        this.$router.push('/input-manager')
                    }
                })
            }else{
                console.log('error submit');
                return false
            }
        })
      },
      clear(formName){
        //   this.$refs[formName].resetFields()
        // 只是将查询条件初始化，所以在初始化时绑定什么值就还是什么值。
        // 想要清空指定的已绑定数据的表单元素，
        // 需要将清空的语句写在this.$refs[formName].resetFields()之后。
          this.$refs[formName].resetFields();
          this.temp={};
      }
  }
};
</script>
<style>
.box-card {
  margin-bottom: 15px;
}
</style>