<script>
export default {
  name: "PagIng",
  props: {
    total: Number,
    size: Number,
    page: Number,
  },
  data() {
    return {
     
    };
  },
  created() {},
  methods: {
    handleSizeChange(val) {
       this.$emit("changeSize", val);
       this.$emit("pageChange", 1);
    },
    handleCurrentChange(val) {
       this.$emit("pageChange", val);
    },
  },
};
</script>
<template lang="">
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<style lang="scss" scoped>
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
