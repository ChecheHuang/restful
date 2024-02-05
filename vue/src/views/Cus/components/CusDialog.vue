<script>
import { createLabel, getLabel } from "@/api/label";
import { Message } from "element-ui";
import { createCus, editCus } from "@/api/cus";

export default {
  name: "",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    dialogForm: Object,
    dialogStatus: String,
    getAllCusData: Function,
  },
  data() {
    return {
      dialogVisible: this.visible,
      myDialogForm: this.dialogForm,
      levelOptions: ["銅", "銀", "金", "白金"],
      statusOptions: ["新客戶", "舊客戶", "潛在客戶"],
      dialogFormRules: {
        cus_name: [{ required: true, message: "請輸入姓名" }],
        cus_number: [{ required: true, message: "請輸入電話" }],
        cus_email: [{ required: true, message: "請輸入Email" }],
        cus_idnumber: [{ required: true, message: "請輸入身分證字號" }],
        cus_birthday: [{ required: true, message: "請輸入生日" }],
        cus_status: [{ required: true, message: "請選擇狀態" }],
        cus_level: [{ required: true, message: "請選擇等級" }],
      },
      addLabelText: "",
      labelList: [],
    };
  },
  watch: {
    visible(newValue) {
      if (this.$refs["myDialogForm"]) {
        this.$refs["myDialogForm"].resetFields();
      }
      this.dialogVisible = newValue;
    },
    dialogVisible(newValue) {
      this.$emit("update:visible", newValue);
    },
    dialogForm(newValue) {
      this.myDialogForm = newValue;
    },
    myDialogForm(newValue) {
      this.$emit("update:dialogForm", newValue);
    },
    async dialogStatus(newValue) {
      if (newValue === "edit") {
        await this.initLabelData();
      }
    },
  },
  methods: {
    async handleSubmit() {
      this.$refs["myDialogForm"].validate(async (valid) => {
        if (valid) {
          let message;
          if (this.dialogStatus === "add") {
            await createCus(this.myDialogForm);
            message = "新增成功";
          }
          if (this.dialogStatus === "edit") {
            const submitData = { ...this.myDialogForm };
            submitData.label_names = submitData.label_names.map(
              ({ value, label_name }) => ({
                id: value,
                label_name,
              })
            );
            await editCus(submitData);
            message = "修改成功";
          }
          this.dialogVisible = false;
          await this.getAllCusData();
          Message({ message, type: "success" });
        } else {
          console.error(this.dialogForm);
        }
      });
    },
    async handleAddLabel() {
      await createLabel({ label_name: this.addLabelText });
      await this.initLabelData();
      Message({ message: "新增成功", type: "success" });
    },
    async initLabelData() {
      const labelData = await getLabel();
      this.labelList = labelData.map(({ id, label_name }) => ({
        value: id,
        label_name,
      }));
    },
  },
};
</script>
<template>
  <div class="">
    <el-dialog
      :title="dialogStatus === 'add' ? '新增客戶' : '修改客戶'"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form
        :model="myDialogForm"
        :rules="dialogFormRules"
        ref="myDialogForm"
      >
        <el-form-item label="姓名" prop="cus_name">
          <el-input
            v-model="myDialogForm.cus_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="電話" prop="cus_number">
          <el-input
            v-model="myDialogForm.cus_number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="E-mail" prop="cus_email">
          <el-input
            v-model="myDialogForm.cus_email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="身分證字號" prop="cus_idnumber">
          <el-input
            v-model="myDialogForm.cus_idnumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         <el-form-item label="出生日期" prop="cus_birthday">
          <el-date-picker
            v-model="myDialogForm.cus_birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="選擇日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="等級" prop="cus_level">
          <el-select v-model="myDialogForm.cus_level">
            <el-option
              v-for="item in levelOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="狀態" prop="cus_status">
          <el-select v-model="myDialogForm.cus_status">
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="備註" prop="cus_remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4 }"
            v-model="myDialogForm.cus_remark"
          ></el-input>
        </el-form-item>
        <template v-if="dialogStatus === 'edit'">
          <el-form-item label="新增標籤">
            <el-input v-model="addLabelText" />
            <el-button type="primary" @click="handleAddLabel">
              新增標籤
            </el-button>
          </el-form-item>
          <el-form-item label="標籤">
            <el-select
              v-model="myDialogForm.label_names"
              multiple
              placeholder="请選擇"
            >
              <el-option
                v-for="item in labelList"
                :key="item.label_name"
                :label="item.label_name"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">確定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped></style>
