<template>
  <div class="container">
    <single class="item"> </single>
    <different-enter-leave class="item"></different-enter-leave>
    <css-animation class="item"></css-animation>
    <both class="item"></both>
    <custom-class class="item"></custom-class>
    <js-transition class="item"></js-transition>
    <multi-element class="item"></multi-element>
    <multi-components class="item"></multi-components>
  </div>
</template>

<script>
import Single from "./components/single.vue";
import DifferentEnterLeave from "./components/different-enter-leave.vue";
import CssAnimation from "./components/css-animation.vue";
import Both from "./components/both.vue";
import CustomClass from "./components/custom-class.vue";
import JsTransition from "./components/js-transition.vue";
import MultiElement from "./components/multi-element.vue";
import MultiComponents from "./components/multi-components.vue";

export default {
  components: {
    Single,
    DifferentEnterLeave,
    CssAnimation,
    Both,
    CustomClass,
    JsTransition,
    MultiElement,
    MultiComponents
  },
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  padding: 20px;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .item {
    margin-top: 60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
