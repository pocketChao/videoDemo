<template>
  <div class="page" :style="pageStyle">
    <div :style="{ height: navHeight + 'px' }" />
    <slot />
    <navi-bar left-arrow v-bind="navAttrs" fixed v-on="$listeners">
      <template v-if="$slots.navTitle" slot="title">
        <slot name="navTitle" />
      </template>
      <template v-if="$slots.navLeft" slot="left">
        <slot name="navLeft" />
      </template>
      <template v-if="$slots.navRight" slot="right">
        <slot name="navRight" />
      </template>
    </navi-bar>
  </div>
</template>

<script>
import NaviBar from "../navi-bar/index";

export default {
  name: "Page",
  components: { NaviBar },
  data() {
    return {};
  },
  props: {
    background: {
      type: String,
      default: "#F2F2F2"
    }
  },
  computed: {
    pageContentHeight() {
      return this.windowHeight - this.navHeight - 2;
    },
    pageStyle() {
      return {
        minHeight: `${this.windowHeight - 2}px`,
        padding: "1px 0",
        background: this.background
      };
    },

    navHeight() {
      return 46;
    },
    windowHeight() {
      return window.innerHeight;
    },
    windowWidth() {
      return window.innerWidth;
    },
    windowSize() {
      return {
        width: `${this.windowWidth}px`,
        height: `${this.windowHeight}px`
      };
    },
    windowContentSize() {
      return {
        width: `${this.windowWidth}px`,
        height: `${this.windowHeight - this.navHeight}px`
      };
    },
    navAttrs() {
      return this.findAttr(this.$attrs, "nav");
    }
  },
  methods: {
    findAttr(attrs, pre) {
      const newAttrs = {};
      Object.keys(attrs).forEach(key => {
        if (key.startsWith(pre)) {
          let newKey = key.substring(pre.length);
          if (newKey.startsWith("-")) {
            newKey = newKey.substring(1);
          }
          newKey = newKey.replace(/^\w/, c => c.toLowerCase());
          newAttrs[newKey] = attrs[key];
        }
      });
      return newAttrs;
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
}
.page-content {
  width: 100%;
}
</style>
