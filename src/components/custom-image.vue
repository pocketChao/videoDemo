<template>
  <l-c-image
    style="margin-top: 20px"
    width="80"
    height="80"
    fit="cover"
    src="https://img.yzcdn.cn/vant/cat.jpeg"
  ></l-c-image>
</template>

<script>
import { Image } from "vant";
export default {
  name: "custom-image",
  components: {
    LCImage: Image
  }
};
</script>

<style scoped></style>
