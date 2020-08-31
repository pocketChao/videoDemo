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
.multi-element-enter-active,
.multi-element-leave-active {
  transition: opacity 0.5s;
}
.multi-element-enter,
.multi-element-leave-to {
  opacity: 0;
}
</style>
