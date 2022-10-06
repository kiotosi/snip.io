<template>
  <textarea :value="description" placeholder="Type description to your snippet" name="description" class="snippet-description"></textarea>
</template>

<script lang="ts" setup>
  defineProps({
    description: {
      type: String,
      required: true
    }
  })
</script>

<style scoped lang="less">
.snippet-description {
  margin-top: 2rem;
  display: block;
  width: 100%;
  min-height: 100px;
  max-height: 200px;
  padding: 12px 10px;
  resize: vertical;
  color: @gray;
  position: relative;
  .default-border();

  &::placeholder {
    color: fadeout(@gray-alt, 40%);
  }

  &::-webkit-scrollbar {
    display: none;
  }

}
</style>