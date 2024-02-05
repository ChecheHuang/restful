<script>
import { getAllCus2, deleteCus } from "@/api/cus";
import { Message } from "element-ui";
import PagIng from "./components/PagIng.vue";
import CusDialog from "./components/CusDialog.vue";
import CusTable from "./components/CusTable.vue";
import CusHeader from "./components/CusHeader.vue";
export default {
  name: "",
  components: {
    CusDialog,
    PagIng,
    CusTable,
    CusHeader,
  },
  props: {},
  data() {
    return {
      data: [],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      loading: true,
      filterText: "",
      selected: "",
      options: [
        { name: "姓名", value: "cus_name" },
        { name: "電話", value: "cus_number" },
        { name: "Email", value: "cus_email" },
        { name: "身分證字號", value: "cus_idnumber" },
        { name: "等級", value: "cus_level" },
        { name: "狀態", value: "cus_status" },
        { name: "備註", value: "cus_remark" },
        { name: "標籤", value: "label_name" },
      ],
      visible: false,
      dialogStatus: "add",
      dialogForm: {
        cus_name: "",
        cus_number: "",
        cus_email: "",
        cus_idnumber: "",
        cus_birthday: "",

        cus_remark: "",
        cus_status: "",
        cus_level: "",
        label_name: [],
      },
    };
  },
  computed: {},
  methods: {
    async getAllCusData() {
      this.loading = true;
      const data = { page: this.currentPage, size: this.pageSize };
      if (this.selected && this.filterText) {
        data[this.selected] = this.filterText;
      }
      const res = await getAllCus2(data);
      this.total = res.total;
      this.data = res.data;
      this.loading = false;
    },
    async handleDelete(data) {
      try {
        await this.$confirm("確認要刪除嗎?", `刪除客戶--${data.cus_name}`, {
          confirmButtonText: "確認",
          cancelButtonText: "取消",
          type: "warning",
        });
        await deleteCus({ cus_id: data.id });
        await this.getAllCusData();
        Message({ message: "删除成功!", type: "success" });
      } catch (err) {
        Message({ message: "已取消删除", type: "info" });
      }
    },
    async handleFilter() {
      if (!this.selected) {
        Message({ message: "選擇篩選項目", type: "warning" });
        return;
      }
      this.size = 5;
      this.page = 1;
      await this.getAllCusData();
      Message({ message: "篩選成功", type: "success" });
    },
    async handleDialogOpen(data) {
      // console.log(data);
      if (!data) {
        this.dialogStatus = "add";
        this.dialogForm = {
          cus_name: "",
          cus_number: "",
          cus_email: "",
          cus_idnumber: "",
          cus_birthday: "",
          cus_remark: "",
          cus_status: "",
          cus_level: "",
          label_names: [],
        };
      } else {
        this.dialogStatus = "edit";
        data.label_names = data.label_names.map(({ id, label_name }) => ({
          value: id,
          label_name,
        }));
        this.dialogForm = data;
      }
      this.visible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getAllCusData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllCusData();
    },
  },
  created() {
    this.getAllCusData();
  },
};
</script>
<template>
  <div class="cus">
    <CusDialog
      :visible.sync="visible"
      :dialogForm.sync="dialogForm"
      :dialogStatus="dialogStatus"
      :getAllCusData="getAllCusData"
    />
    <CusHeader
      :selected.sync="selected"
      :filterText.sync="filterText"
      :handleDialogOpen="handleDialogOpen"
    />
    <CusTable
      :data="data"
      :loading="loading"
      @handleDelete="handleDelete"
      @handleDialogOpen="handleDialogOpen"
    />
    <PagIng
      :total="total"
      :size="pageSize"
      :page="currentPage"
      @changeSize="handleSizeChange"
      @pageChange="handleCurrentChange"
    />
  </div>
</template>
<style lang="scss">
.cus {
  .cus-header {
    // width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    .filter-area {
      display: flex;
      flex-wrap: nowrap;
      .el-input {
        width: 200px;
      }
      .el-select {
        width: 150px;
        margin-right: 60px;
      }
    }
  }
  .el-dialog__body {
    padding: 10px;
    .el-form-item {
      margin-bottom: 17px;
    }
  }
  .el-table {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
