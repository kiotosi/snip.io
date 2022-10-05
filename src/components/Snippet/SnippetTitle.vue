<template>
  <h1 placeholder="Title of the snippet"
  contenteditable="true"
  spellcheck="false"
  @keydown="onKeyDown"
  class="snippet-title"
  type="text" name="title"
    id="snippet-title-ref">
    {{$props.title}}
  </h1>
</template>

<script lang="ts" setup>
  
  // Limit of characters in input
  const CHARACTER_LIMIT = 55;

  // Props
  defineProps({
    title: {
      type: String,
      reqiured: true
    }
  });

  /**
   * Stop input, when there is character limit
   * @param e Keydown event
   */
  function onKeyDown(e: KeyboardEvent) {
    const element = e.target as HTMLElement;
    if (element.innerText.length > CHARACTER_LIMIT && e.code !== 'Backspace') {
      e.preventDefault();
    }
  }
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