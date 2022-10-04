<template>
  <h1 placeholder="Title of the snippet"
  contenteditable="true"
  spellcheck="false"
  class="snippet-title"
  type="text" name="title"
    id="snippet-title-ref">
    {{text}}
  </h1>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';

  const text = ref('');
  defineProps({
    title: {
      type: String,
      reqiured: true
    }
  });
</script>

<style scoped lang="less">
.snippet-title {
  width: 100%;
  font-size: 1rem;
  background: @white;
  color: @gray;
  font-weight: normal;
  padding: 12px 10px;
  .default-border();

  &:empty:before {
    color: fadeout(@gray-alt, 40%);
    content: attr(placeholder);
  }
}
</style>