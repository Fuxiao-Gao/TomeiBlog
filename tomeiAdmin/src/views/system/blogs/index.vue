<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="publisher_id" prop="publisherId">
        <el-input
          v-model="queryParams.publisherId"
          placeholder="请输入publisher_id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="title" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入title"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="category_id" prop="categoryId">
        <el-input
          v-model="queryParams.categoryId"
          placeholder="请输入category_id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="like_count" prop="likeCount">
        <el-input
          v-model="queryParams.likeCount"
          placeholder="请输入like_count"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="comment_count" prop="commentCount">
        <el-input
          v-model="queryParams.commentCount"
          placeholder="请输入comment_count"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="save_count" prop="saveCount">
        <el-input
          v-model="queryParams.saveCount"
          placeholder="请输入save_count"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:blogs:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:blogs:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:blogs:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:blogs:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="blogsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="publisher_id" align="center" prop="publisherId" />
      <el-table-column label="title" align="center" prop="title" />
      <el-table-column label="category_id" align="center" prop="categoryId" />
      <el-table-column label="like_count" align="center" prop="likeCount" />
      <el-table-column label="comment_count" align="center" prop="commentCount" />
      <el-table-column label="save_count" align="center" prop="saveCount" />
      <el-table-column label="created_time" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="update_time" align="center" prop="updateTime" width="180">
         <template slot-scope="scope">
           <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
         </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:blogs:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:blogs:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改blogs对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="publisher_id" prop="publisherId">
          <el-input v-model="form.publisherId" placeholder="请输入publisher_id" />
        </el-form-item>
        <el-form-item label="title" prop="title">
          <el-input v-model="form.title" placeholder="请输入title" />
        </el-form-item>
        <el-form-item label="category_id" prop="categoryId">
          <el-input v-model="form.categoryId" placeholder="请输入category_id" />
        </el-form-item>
        <el-form-item label="like_count" prop="likeCount">
          <el-input v-model="form.likeCount" placeholder="请输入like_count" />
        </el-form-item>
        <el-form-item label="comment_count" prop="commentCount">
          <el-input v-model="form.commentCount" placeholder="请输入comment_count" />
        </el-form-item>
        <el-form-item label="save_count" prop="saveCount">
          <el-input v-model="form.saveCount" placeholder="请输入save_count" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listBlogs, getBlogs, delBlogs, addBlogs, updateBlogs } from "@/api/system/blogs";

export default {
  name: "Blogs",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // blogs表格数据
      blogsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        publisherId: null,
        title: null,
        categoryId: null,
        likeCount: null,
        commentCount: null,
        saveCount: null,
        createTime: null,
        updateTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        publisherId: [
          { required: true, message: "publisher_id不能为空", trigger: "blur" }
        ],
        title: [
          { required: true, message: "title不能为空", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "category_id不能为空", trigger: "blur" }
        ],
        likeCount: [
          { required: true, message: "like_count不能为空", trigger: "blur" }
        ],
        commentCount: [
          { required: true, message: "comment_count不能为空", trigger: "blur" }
        ],
        saveCount: [
          { required: true, message: "save_count不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询blogs列表 */
    getList() {
      this.loading = true;
      listBlogs(this.queryParams).then(response => {
        this.blogsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        publisherId: null,
        title: null,
        categoryId: null,
        likeCount: null,
        commentCount: null,
        saveCount: null,
        createTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加blogs";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBlogs(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改blogs";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBlogs(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBlogs(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除blogs编号为"' + ids + '"的数据项？').then(function() {
        return delBlogs(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/blogs/export', {
        ...this.queryParams
      }, `blogs_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
