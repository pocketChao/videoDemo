<template>
  <div>
    <lc-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="shuffleList"
      >列表的进入/离开过渡</lc-button
    >
    <transition-group name="flip-list" tag="div">
      <div v-for="item in listData.list" :key="item">{{ item }}</div>
    </transition-group>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "@vue/composition-api";
import { Button } from "vant";
import shuffle from "lodash/shuffle.js";
export default defineComponent({
  name: "list",
  components: {
    "lc-button": Button
  },
  setup() {
    const show = ref(false);
    const listData = reactive({
      list: []
    });
    function onLoad() {
      for (let i = 0; i < 10; i++) {
        listData.list.push(listData.list.length + 1);
      }
    }
    function shuffleList() {
      listData.list = shuffle(listData.list);
    }
    onLoad();
    return { show, listData, shuffleList };
  }
});
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
