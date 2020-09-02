<template>
  <div id="dynamic-transition">
    Fade In:
    <input
      type="range"
      v-model="data.fadeInDuration"
      min="0"
      v-bind:max="data.maxFadeDuration"
    />
    Fade Out:
    <input
      type="range"
      v-model="data.fadeOutDuration"
      min="0"
      v-bind:max="data.maxFadeDuration"
    />
    <transition
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <p v-if="data.show">弘成教育</p>
    </transition>
    <lc-button
      v-if="data.stop"
      v-on:click="
        data.stop = false;
        data.show = false;
      "
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
    >
      开始动画
    </lc-button>
    <lc-button
      v-else
      v-on:click="data.stop = true"
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
      >停止动画</lc-button
    >
  </div>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api";
import { Button } from "vant";
import Velocity from "velocity-animate";
export default defineComponent({
  name: "dynamic-transition",
  components: {
    "lc-button": Button
  },
  setup() {
    const data = reactive({
      show: true,
      stop: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500
    });
    function beforeEnter(el) {
      el.style.opacity = 0;
    }
    function enter(el, done) {
      Velocity(
        el,
        { opacity: 1 },
        {
          duration: data.fadeInDuration,
          complete: function() {
            done();
            if (!data.stop) data.show = false;
          }
        }
      );
    }
    function leave(el, done) {
      Velocity(
        el,
        { opacity: 0 },
        {
          duration: data.fadeOutDuration,
          complete: function() {
            done();
            data.show = true;
          }
        }
      );
    }

    return { data, beforeEnter, enter, leave };
  }
});
</script>

<style scoped></style>
