<template>
  <div>
    <lc-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="show = !show"
    >
      自定义类名
    </lc-button>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__backInDown"
      leave-active-class="animate__animated animate__bounceOutRight animate__slow"
    >
      <p v-if="show">弘成教育</p>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { Button } from "vant";
export default defineComponent({
  name: "custom-class",
  components: {
    "lc-button": Button
  },
  setup() {
    const show = ref(false);
    return { show };
  }
});
</script>

<style scoped></style>
