<template>
  <div>
    <lc-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="operationList"
      >多个组件过渡</lc-button
    >
    <transition name="multi-element" mode="out-in">
      <list
        v-if="listData.list.length"
        v-model="listData.loading"
        :finished="listData.finished"
        finished-text="列表加载完毕"
        :immediate-check="false"
        @load="onLoad"
      >
        <cell v-for="item in listData.list" :key="item" :title="item"></cell>
      </list>
      <empty v-else image="error" description="数据丢了" />
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "@vue/composition-api";
import { Button, List, Cell, Empty } from "vant";
export default defineComponent({
  name: "list",
  components: {
    "lc-button": Button,
    List,
    Cell,
    Empty
  },
  setup() {
    const show = ref(false);
    const listData = reactive({
      list: [],
      loading: ref(false),
      finished: ref(false)
    });
    function onLoad() {
      for (let i = 0; i < 10; i++) {
        listData.list.push(listData.list.length + 1);
      }
      listData.loading = false;
      listData.finished = true;
    }
    function hideList() {
      listData.list = [];
    }
    function operationList() {
      if (!listData.list.length) {
        onLoad();
        return;
      }
      hideList();
    }
    return { show, listData, onLoad, operationList };
  }
});
</script>

<style lang="scss" scoped>
/* 单元素切换 */
.multi-element-enter-active,
.multi-element-leave-active {
  transition: opacity 0.5s;
}
.multi-element-enter,
.multi-element-leave-to {
  opacity: 0;
}
</style>
