<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="请输入姓名"
        style="width:200px"
        class="filter-item"
        @input="query()"
      ></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="query()">搜索</el-button>
    </div>

    <!-- 搜索结果列表 -->
    <el-table :data="tableData" style="width:100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <!-- fixed	列是否固定在左侧或者右侧，true 表示固定在左侧 -->
      <!-- column-key column的key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 -->
      <el-table-column fixed prop="name" label="姓名" width="100" column-key="name"></el-table-column>
      <!-- sortable	对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 -->
      <el-table-column prop="birthday" label="出生日期" width="120" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.birthday}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="80">
        <!--  slot-scope="scope"   这里取到当前单元格 -->
        <!-- {{scope.row.id}}  直接取到该单元格值 -->
        <template slot-scope="scope">
          <!--过滤器可以串联 {{ message | filterA | filterB }} -->
          <!--接收参数 {{ message | filterA('arg1', arg2) }}
                filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第一个参数，
          普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数。-->
          <span>{{scope.row.sex | getSex}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="education" label="教育程度" width="100">
        <!--  slot-scope="scope"   这里取到当前单元格 -->
        <!-- {{scope.row.id}}  直接取到该单元格值 -->
        <template slot-scope="scope">
          <span>{{scope.row.education}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address1" label="居住地址" width="200"></el-table-column>
      <el-table-column prop="mobile_phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="status" label="申请状态" width="100">
        <template slot-scope="scope">
          <!-- Tag 标签 用于标记和选择。 -->
          <el-tag :type="scope.row.status | getStatusStyle">{{scope.row.status | getStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="primary"
            @click="handleUpdate(row)"
            :disabled="row.status != 0&&row.status != 3&&row.status != 6"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(row)"
            :disabled="row.status != 0&&row.status != 3&&row.status != 6"
          >删除</el-button>
          <!-- 绑定事件，将整行数据提交 -->
          <!-- disabled	是否禁用  判断在什么状态下禁用 -->
          <el-button
            size="mini"
            type="success"
            @click="handleSubmit(row)"
            :disabled="row.status != 0&&row.status != 3&&row.status != 6"
          >提交审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog
      title="申请管理-编辑"
      :visible.sync="dialogFromVisible"
      label-position="left"
      label-width="100px"
    >
      <el-form
        ref="updateForm"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width:400px;margin-left:50px"
      >
        <el-form-item label="ID" prop="id" v-show="false">
          <el-input v-model="temp.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-input type="datatime" v-model="temp.birthday"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="temp.sex" class="filter-item" placeholdar="please select">
            <el-option
              v-for="item in sexOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="temp.education" class="filter-item" placeholdar="please select">
            <el-option
              v-for="item in educationOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住地" prop="address1">
          <el-input v-model="temp.address1"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile_phone">
          <el-input v-model.number="temp.mobile_phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFromVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateData()">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 删除弹窗 -->
    <el-dialog title="申请管理-删除" :visible.sync="dialogDelVisible">
      <p>确定删除?</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">取消</el-button>
        <el-button typr="primary" @click="delDate()">删除</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="rows"
    ></el-pagination>
  </div>
</template>
<script>
import {
  loanList,
  submitToApprove,
  loanUpdate,
  loanDelete
} from "@/api/article";
import { sexOptions, educationOptions } from "@/utils/selectData";
export default {
  name: "ComplexTable",
  data() {
    return {
      tableData: [], //表格展示的数据
      pages: 1, //总页数
      rows: 1, //总条数
      listQuery: {
        pageNo: 1, //当前页面
        pageSize: 10, //条数
        name: "" //查询条件
      },
      sexOptions,
      educationOptions,
      dialogFromVisible: false, //编辑弹层显示与隐藏
      dialogDelVisible: false,//删除弹层显示与隐藏
      temp: {
        id: "",
        name: "",
        birthday: ""
      }
    };
  },
  //   过滤器组件
  filters: {
    getSex(data) {
      switch (data) {
        case "man":
          return "男";
        case "woman":
          return "女";
        default:
          return data;
      }
    },
    getStatusStyle(data) {
      switch (data) {
        case 0:
          return "success";
        case 1:
          return "info";
        case 2:
          return "success";
        case 3:
          return "warning";
        case 4:
          return "info";
        case 5:
          return "success";
        case 6:
          return "warning";
        case 7:
          return "danger";
        default:
          return data;
      }
    },
    getStatus(data) {
      //status
      // 0-默认值进件状态
      // 1-提交初审状态
      // 2-初审通过状态
      // 3-初审拒绝状态
      // 4-提交终审状态
      // 5-终审通过状态
      // 6-终审拒绝状态
      // 7-生成合同状态
      switch (data) {
        case 0:
          return "进件";
        case 1:
          return "提交初审";
        case 2:
          return "初审通过";
        case 3:
          return "初审拒绝";
        case 4:
          return "提交终审";
        case 5:
          return "终审通过";
        case 6:
          return "终审拒绝";
        case 7:
          return "生成合同";
        default:
          return data;
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    //   获取数据
    getList() {
      loanList(this.listQuery).then(res => {
        console.log(res);
        let { code } = res.data;
        if (code == "20000") {
          let { data, rows, pages } = res.data.data.data;
          this.tableData = data;
          this.rows = rows;
          this.pages = pages;
        }
      });
    },
    // 按名称查询
    query() {
      this.getList();
    },
    // 提交审核
    handleSunmit(row) {
      submitToApprove({ id: row.id }).then(res => {
        let { code } = res.data;
        if (code == "20000") {
          this.getList();
          this.$notify({
            //通知框
            title: "提交审核",
            message: "提交成功",
            type: "success",
            duration: 1000
          });
        }
      });
    },
    //当前条数变化
    handleSizeChange(val = this.listQuery.pageSize) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    //当前页变化
    handleCurrentChange(val = this.listQuery.pageNo) {
      this.listQuery.pageNo = val;
      this.getList();
    },
    //编辑弹窗
    handleUpdate(row) {
      this.temp = { ...row };
      this.dialogFromVisible = true; //弹层显示
    },
    //弹窗提交
    updateData() {
      loanUpdate(this.temp).then(res => {
        let { code } = res.data;
        if (code == "20000") {
          this.getList();
          this.dialogFromVisible = false; //弹层隐藏
          this.$notify({
            //通知框
            title: "编辑",
            message: "编辑成功",
            type: "success",
            duration: 2000
          });
        }
      });
    },
    // 删除弹窗
    handleDel(row) {
      this.temp = { ...row };
      this.dialogDelVisible = true;
    },
    delDate() {
      loanDelete({ id: this.temp.id }).then(res => {
        let { code } = res.data;
        if (code == "20000") {
          this.getList();
          this.dialogDelVisible = false;
          this.$notify({
            title: "删除",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
        }
      });
    }
  }
};
</script>