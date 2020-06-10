<template>
  <nav-bar
    v-bind="$attrs"
    :left-arrow="false"
    :style="naviStyle"
    v-on="$listeners"
  >
    <template v-if="$slots.left" slot="left">
      <slot name="left" />
    </template>
    <template v-else-if="leftArrow">
      <icon
        slot="left"
        name="arrow-left"
        :color="leftArrowColor"
        :size="24"
        @click.native="$listeners['click-left'] || $router.go(-1)"
      />
    </template>
    <template v-if="$slots.title" slot="title">
      <slot name="title" />
    </template>
    <template v-if="$slots.right" slot="right">
      <slot name="right" />
    </template>
  </nav-bar>
</template>

<script>
import { NavBar, Icon } from "vant";

export default {
  components: { NavBar, Icon },
  props: {
    leftArrowColor: {
      default: "#737880",
      type: String
    },
    backgroundColor: {
      default: "#fff",
      type: String
    },
    leftArrow: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    naviStyle() {
      return {
        backgroundColor: this.backgroundColor
      };
    }
  }
};
</script>
