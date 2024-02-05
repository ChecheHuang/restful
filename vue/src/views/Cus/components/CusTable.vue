<script>
export default {
  name: "CusTable",
  props: {
    data: Array,
    loading:Boolean
  },
  data() {
    return {};
  },
  methods: {
    handleDialogOpen(data) {
      this.$emit('handleDialogOpen',data)
    },
    handleDelete(data){
      this.$emit('handleDelete',data)
    }
  },
};
</script>
<template>
  <el-table :data="data" v-loading="loading" border style="width: 100%">
    <el-table-column prop="id" label="ID" align="center"> </el-table-column>
    <el-table-column prop="cus_name" label="姓名" width="120px" align="center">
    </el-table-column>
    <el-table-column
      prop="cus_number"
      label="電話"
      width="120px"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="cus_email"
      label="Email"
      width="250px"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="cus_idnumber"
      label="身分證字號"
      width="120px"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="cus_birthday"
      label="生日"
      width="100px"
      align="center"
    >
    </el-table-column>
    <el-table-column prop="cus_age" label="年齡" align="center">
    </el-table-column>
    <el-table-column prop="cus_level" label="等級" align="center">
    </el-table-column>
    <el-table-column prop="cus_status" label="狀態" align="center">
    </el-table-column>
    <el-table-column
      prop="cus_remark"
      label="備註"
      width="100px"
      align="center"
    >
    </el-table-column>
    <el-table-column label="標籤" align="center">
      <template slot-scope="scope">
        <div
          v-if="scope.row"
          :key="i.label_name"
          v-for="i in scope.row.label_names"
        >
          {{ i.label_name }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="200">
      <template v-slot:default="scope">
        <el-button
          @click="handleDialogOpen({ ...scope.row })"
          type="warning"
          size="mini"
          icon="el-icon-edit"
        >
          修改
        </el-button>
        <el-button
          @click="handleDelete(scope.row)"
          type="danger"
          size="mini"
          icon="el-icon-delete"
        >
          刪除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="scss" scoped></style>
