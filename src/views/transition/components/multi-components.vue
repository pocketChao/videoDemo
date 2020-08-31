<template>
  <div>
    <lc-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="showImage = !showImage"
      >多组件过渡</lc-button
    >
    <transition name="multi-components" mode="out-in">
      <component :is="componentName"></component>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "@vue/composition-api";
import { Button, Empty } from "vant";
import CustomImage from "@/components/custom-image.vue";
export default defineComponent({
  name: "multi-components",
  components: {
    "lc-button": Button,
    Empty,
    CustomImage
  },
  setup() {
    const showImage = ref(false);
    const componentName = computed(() =>
      showImage.value ? "CustomImage" : "Empty"
    );

    return { showImage, componentName };
  }
});
</script>

<style lang="scss" scoped>
/* 单元素切换 */
.multi-components-enter-active,
.multi-components-leave-active {
  transition: opacity 0.5s;
}
.multi-components-enter,
.multi-components-leave-to {
  opacity: 0;
}
</style>
