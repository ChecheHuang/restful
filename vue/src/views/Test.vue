<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      count: 1,
      person: {
        name: "carl",
        age: 18,
      },
      src: "https://i.pinimg.com/564x/9a/14/8f/9a148fa11aab1c97cf193a8d255bdfd8.jpg",
      showImg: true,
      arr: ["a", "b", "c", "d"],
    };
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    },
  },
  watch: {
    // count(val, prev) {
    //   console.log(val);
    //   console.log(prev);
    // },
    //  "person.name": function (val, prev) {
    //   console.log(val);
    //   console.log(prev);
    // },
    // person: {
    //   handler(value, prev) {
    //     console.log(value);
    //     console.log(prev);
    //   },
    //   immediate: false,
    //   deep: true,
    // },
  },
  methods: {
    test() {
      console.log("hello");
    },
    addCount(count = 10) {
      this.count += count;
    },
    changeImg() {
      if (
        this.src ===
        "https://i.pinimg.com/564x/9a/14/8f/9a148fa11aab1c97cf193a8d255bdfd8.jpg"
      ) {
        this.src =
          "https://i.pinimg.com/564x/4c/b4/19/4cb4195813002bda62d7332aec712a85.jpg";
      } else {
        this.src =
          "https://i.pinimg.com/564x/9a/14/8f/9a148fa11aab1c97cf193a8d255bdfd8.jpg";
      }
    },
  },
  created() {
    this.test();
  },
};
</script>
<template>
  <div class="">
    this is Test Page
    <h1>原始count為{{ count }}</h1>
    <h1>doubleCount為{{ doubleCount }}</h1>
    <button @click="count += 1">count增加1</button>
    <button @dblclick="addCount()">點兩下加10</button>
    <button @dblclick="addCount(5)">點兩下加5</button>
    <div>{{ person.name }}</div>
    <input type="text" v-model="person.name" />
    <input type="number" v-model="person.age" />
    <br />
    <img v-if="showImg" width="200px" :src="src" alt="" @click="changeImg" />
    <div style="display: flex; gap: 10px">
      <div v-for="(item, index) in arr" :key="index">{{ index }}---{{ item }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
