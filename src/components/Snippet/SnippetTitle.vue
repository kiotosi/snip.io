<template>
  <input
    id="snippet-title-ref"
    type="text"
    placeholder="Title of the snippet"
    spellcheck="false"
    :value="$props.title"
    class="snippet-title"
    name="title"
    maxlength="50"
  >
</template>

<script lang="ts" setup>

// Props
defineProps({
  title: {
    type: String,
    required: true
  },
});
</script>

<style scoped lang="less">
.snippet-title {
  width: 100%;
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 1rem;
  background: var(--input-bg);
  color: var(--text);
  font-weight: normal;
  padding: 12px 10px;
  .default-border();
  position: relative;

  &::before {
    content: 'Title';
    top: -1rem;
    left: 2px;
    position: absolute;
    font-size: 10px;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    transform: translateY(1em);
    opacity: 0;
  }

  &:focus {
    &:before {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &:empty:before {
    color: var(--placeholder);
    content: attr(placeholder);
  }
}
</style>
