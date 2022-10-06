<template>
  <select :value="language" class="snippet-language">
    <option v-for="key in LANGUAGES_SELECTOR_KEYS" :key="key" :value="key">
      {{ LANGUAGES_SELECTOR_LIST[key as keyof typeof LANGUAGES_SELECTOR_LIST] }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { LANGUAGES_SELECTOR_LIST } from '../../define';
import { SnippetLanguage } from '../../typescript/types/snippetsStore';

const LANGUAGES_SELECTOR_KEYS = Object.keys(LANGUAGES_SELECTOR_LIST);
defineProps<{
  language: SnippetLanguage;
}>();
</script>

<style lang="less">
.snippet-language {
  appearance: none;
  -webkit-appearance: none;
  width: 300px;
  background: var(--input-bg);
  color: var(--text);
  padding: 12px 10px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  .default-border();
}
</style>
