<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="publisher_id" prop="publisherId">
        <el-input
          v-model="queryParams.publisherId"
          placeholder="enter publisher_id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="title" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="enter title"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="category_id" prop="categoryId">
        <el-input
          v-model="queryParams.categoryId"
          placeholder="enter category_id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="like_count" prop="likeCount">
        <el-input
          v-model="queryParams.likeCount"
          placeholder="enter like_count"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="comment_count" prop="commentCount">
        <el-input
          v-model="queryParams.commentCount"
          placeholder="enter comment_count"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="save_count" prop="saveCount">
        <el-input
          v-model="queryParams.saveCount"
          placeholder="enter save_count"
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
        >add</el-button>
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
        >edit</el-button>
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
        >delete</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:blogs:export']"
        >export</el-button>
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
      <el-table-column label="operation" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:blogs:edit']"
          >edit</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:blogs:remove']"
          >delete</el-button>
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

    <!-- add blogs dialogue -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="publisher_id" prop="publisherId">
          <el-input v-model="form.publisherId" placeholder="enter publisher_id" />
        </el-form-item>
        <el-form-item label="title" prop="title">
          <el-input v-model="form.title" placeholder="enter title" />
        </el-form-item>
        <el-form-item label="category_id" prop="categoryId">
          <el-input v-model="form.categoryId" placeholder="enter category_id" />
        </el-form-item>
        <el-form-item label="like_count" prop="likeCount">
          <el-input v-model="form.likeCount" placeholder="enter like_count" />
        </el-form-item>
        <el-form-item label="comment_count" prop="commentCount">
          <el-input v-model="form.commentCount" placeholder="enter comment_count" />
        </el-form-item>
        <el-form-item label="save_count" prop="saveCount">
          <el-input v-model="form.saveCount" placeholder="enter save_count" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">confirm</el-button>
        <el-button @click="cancel">cancel</el-button>
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
      loading: true,
      ids: [],
      single: true,
      multiple: true,
      showSearch: true,
      total: 0,
      blogsList: [],
      title: "",
      open: false,
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
      form: {},
      rules: {
        publisherId: [
          { required: true, message: "publisher_id can't be empty", trigger: "blur" }
        ],
        title: [
          { required: true, message: "title can't be empty", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "category_id can't be empty", trigger: "blur" }
        ],
        likeCount: [
          { required: true, message: "like_count an't be empty", trigger: "blur" }
        ],
        commentCount: [
          { required: true, message: "comment_count can't empty", trigger: "blur" }
        ],
        saveCount: [
          { required: true, message: "save_count can't be empty", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {

    getList() {
      this.loading = true;
      listBlogs(this.queryParams).then(response => {
        this.blogsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    cancel() {
      this.open = false;
      this.reset();
    },

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

    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
   
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "edit blogs";
    },
    
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getBlogs(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "edit blogs";
      });
    },
    
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateBlogs(this.form).then(response => {
              this.$modal.msgSuccess("success editing");
              this.open = false;
              this.getList();
            });
          } else {
            addBlogs(this.form).then(response => {
              this.$modal.msgSuccess("success adding");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
   
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('are you sure you want to delete the data of id "' + ids ).then(function() {
        return delBlogs(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("success deleting");
      }).catch(() => {});
    },
   
    handleExport() {
      this.download('system/blogs/export', {
        ...this.queryParams
      }, `blogs_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
