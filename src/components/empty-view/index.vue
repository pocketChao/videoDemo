<template>
  <div class="empty-wrapper">
    <img v-if="image" class="image" :src="image" alt="" />
    <div class="name">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyView",
  props: {
    image: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: "暂无信息"
    }
  }
};
</script>

<style lang="scss" scoped>
.empty-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .image {
    max-width: 50%;
  }
  .name {
    margin-top: 20px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
  }
}
</style>
