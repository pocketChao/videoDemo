<template>
  <div class="css-animation">
    <lc-button
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      @click="show = !show"
    >
      CSS动画
    </lc-button>
    <transition name="bounce">
      <img v-if="show" src="../../../assets/images/d.jpg" />
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/composition-api";
import { Button } from "vant";
export default defineComponent({
  name: "css-animation",
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
/* CSS动画 */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
