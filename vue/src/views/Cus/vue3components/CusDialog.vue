<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  computed,
  watch,
} from "@vue/composition-api";
import { createLabel, getLabel } from "@/api/label";
import { Message } from "element-ui";
import { createCus, editCus } from "@/api/cus";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  dialogForm: Object,
  dialogStatus: String,
  getAllCusData: Function,
});
const emit = defineEmits(["update:visible", "update:dialogForm"]);
const dialogVisible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit("update:visible", value);
  },
});
const myDialogForm = computed({
  get() {
    return props.dialogForm;
  },
  set(value) {
    emit("update:dialogForm", value);
  },
});
const statusOptions = ["新客戶", "舊客戶", "潛在客戶"];
const levelOptions = ["銅", "銀", "金", "白金"];
const addLabelText = ref("");
const labelList = ref("");

const initLabelData = async () => {
  const labelData = await getLabel();
  labelList.value = labelData.map(({ id, label_name }) => ({
    value: id,
    label_name,
  }));
};
const dialogStatusWatcher = computed(() => props.dialogStatus);
watch(dialogStatusWatcher, (dialogStatus) => {
  if (dialogStatus === "edit") {
    initLabelData();
  }
});
const handleSubmit = async () => {
  let message;
  if (props.dialogStatus === "add") {
    await createCus(myDialogForm.value);
    message = "新增成功";
  }
  if (props.dialogStatus === "edit") {
    const submitData = { ...myDialogForm.value };
    submitData.label_names = submitData.label_names.map(
      ({ value, label_name }) => ({
        id: value,
        label_name,
      })
    );
    await editCus(submitData);
    message = "修改成功";
  }
  dialogVisible.value = false;
  await props.getAllCusData();
  Message({ message, type: "success" });
};
const handleAddLabel = async () => {
  await createLabel({ label_name: addLabelText.value });
  await initLabelData();
  Message({ message: "新增成功", type: "success" });
};
</script>

<template>
  <div class="">
    <el-dialog
      :title="dialogStatus === 'add' ? '新增客戶' : '修改客戶'"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form :model="myDialogForm">
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