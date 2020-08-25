<template>
  <div>
    <lc-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="show = !show"
      >多元素过渡</lc-button
    >
    <transition name="multi-element">
      <div v-if="show" key="save">
        Save
      </div>
      <div v-else key="edit">
        Edit
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { Button } from "vant";
export default defineComponent({
  name: "multi-element",
  components: {
    "lc-button": Button
  },
  setup() {
    const show = ref(false);
    return { show };
  }
});
</script>

<style lang="scss" scoped>
/* 多元素过渡 */
.multi-element-enter-active {
  transition: all 0.3s ease;
}
.multi-element-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
