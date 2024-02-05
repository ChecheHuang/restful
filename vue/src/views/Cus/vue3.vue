<script setup>
import { MessageBox } from "element-ui";
import { getAllCus2,deleteCus } from "@/api/cus";
import { Message } from "element-ui";
import PagIng from "./vue3components/PagIng.vue";
import CusDialog from "./vue3components/CusDialog.vue";
import CusTable from "./vue3components/CusTable.vue";
import CusHeader from "./vue3components/CusHeader.vue";
import { ref, onBeforeMount } from "@vue/composition-api";
const tableData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(5);
const loading = ref(false);
const filterText = ref("");
const selected = ref("");
const visible = ref(false);
const dialogStatus = ref("add");
const dialogForm = ref({
  cus_name: "",
  cus_number: "",
  cus_email: "",
  cus_idnumber: "",
  cus_birthday: "",
  cus_remark: "",
  cus_status: "",
  cus_level: "",
  label_name: [],
});
const getAllCusData = async () => {
  loading.value = true;
  const data = { page: currentPage.value, size: pageSize.value };
  if (selected.value && filterText.value) {
    data[selected.value] = filterText.value;
  }
  const res = await getAllCus2(data);
  total.value = res.total;
  tableData.value = res.data;
  loading.value = false;
};
const handleDelete = async (data) => {
  try {
    await MessageBox.confirm(
      `確認要刪除嗎? 刪除客戶--${data.cus_name}`,
      "提示",
      {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning",
      }
    );

    await deleteCus({ cus_id: data.id });
    await getAllCusData();
    Message({ message: "删除成功!", type: "success" });
  } catch (err) {
    Message({ message: "已取消删除", type: "info" });
  }
};

const handleFilter = async () => {
  if (!selected.value) {
    Message({ message: "選擇篩選項目", type: "warning" });
    return;
  }
  currentPage.value = 1;
  pageSize.value = 5;
  await getAllCusData();
  Message({ message: "篩選成功", type: "success" });
};

const handleDialogOpen = async (data) => {
  if (!data) {
    dialogStatus.value = "add";
    dialogForm.value = {
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
    dialogStatus.value = "edit";
    data.label_names = data.label_names.map(({ id, label_name }) => ({
      value: id,
      label_name,
    }));
    dialogForm.value = data;
  }
  visible.value = true;
};
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1;
  getAllCusData();
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
  getAllCusData();
};
onBeforeMount(() => {
  getAllCusData();
});
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
      :handleFilter="handleFilter"
    />
    <CusTable
      :tableData="tableData"
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
