<script setup>
import { ref, defineProps, defineEmits } from "@vue/composition-api";
const props = defineProps({
  selected: String,
  filterText: String,
  handleDialogOpen: Function,
  handleFilter: Function,
});
const emit = defineEmits(["update:filterText", "update:selected"]);
const options = ref([
  { name: "姓名", value: "cus_name" },
  { name: "電話", value: "cus_number" },
  { name: "Email", value: "cus_email" },
  { name: "身分證字號", value: "cus_idnumber" },
  { name: "等級", value: "cus_level" },
  { name: "狀態", value: "cus_status" },
  { name: "備註", value: "cus_remark" },
  { name: "標籤", value: "label_name" },
]);
const handleFilterTextChange = (val) => {
  emit("update:filterText", val);
};
const handleSelectedChange=(val)=>{
  emit("update:selected", val);

}
</script>
<template>
  <div class="cus-header">
    <div class="filter-area">
      <el-select
        :value="props.selected"
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
        :value="props.filterText"
        @input="handleFilterTextChange"
        prefix-icon="el-icon-search"
        placeholder="Keyword Search"
      />
      <el-button type="primary" @click="props.handleFilter"> 篩選 </el-button>
    </div>
    <el-button type="primary" @click="props.handleDialogOpen()"> 新增 </el-button>
  </div>
</template>
<style lang="scss" scoped></style>
