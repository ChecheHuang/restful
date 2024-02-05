<script>
import { Message } from "element-ui";

export default {
  name: "CusHeader",
  props: {
    selected: String,
    filterText: String,
    handleDialogOpen: Function,
  },
  data() {
    return {
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
    };
  },
  methods: {
    handleFilterTextChange(val) {
      this.$emit("update:filterText", val);
    },
    handleSelectedChange(val) {
      this.$emit("update:selected", val);
    },
    async handleFilter() {
      if (!this.selected) {
        Message({ message: "選擇篩選項目", type: "warning" });
        return;
      }
      this.$parent.currentPage = 1;
      this.$parent.pageSize = 5;
      await this.$parent.getAllCusData();
      Message({ message: "篩選成功", type: "success" });
    },
  },
};
</script>
<template>
  <div class="cus-header">
    <div class="filter-area">
      <el-select
        :value="selected"
        @change="handleSelectedChange"
        clearable
        placeholder="選擇篩選"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        :value="filterText"
        @input="handleFilterTextChange"
        prefix-icon="el-icon-search"
        placeholder="Keyword Search"
      />
      <el-button type="primary" @click="handleFilter"> 篩選 </el-button>
    </div>
    <el-button type="primary" @click="handleDialogOpen()"> 新增 </el-button>
  </div>
</template>
<style lang="scss" scoped></style>
