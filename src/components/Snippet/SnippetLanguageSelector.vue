<template>
  <select
    :value="language"
    class="snippet-language"
  >
    <option
      v-for="key in languagesSelectorKeyList"
      :key="key"
      :value="key"
    >
      {{ getLanguage(key) }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { LANGUAGES_SELECTOR_LIST } from '../../define';
import { SnippetLanguage } from '../../typescript/types/snippetsStore';

const languagesSelectorKeyList = Object.keys(LANGUAGES_SELECTOR_LIST);
defineProps<{
  language: SnippetLanguage;
}>();

function getLanguage(key: string): string {
  return LANGUAGES_SELECTOR_LIST[key as keyof typeof LANGUAGES_SELECTOR_LIST] ?? '';
}
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
