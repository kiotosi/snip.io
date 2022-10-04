<template>
  <div class="leftmenu-snippets-item" :class="{'leftmenu-snippets-item_active': isActive}">
    <div class="leftmenu-snippets-item__name">
      {{title}}
    </div>
    <div class="leftmenu-snippets-item__language">
      {{LANGUAGES_SELECTOR_LIST[language as keyof typeof LANGUAGES_SELECTOR_LIST]}}
    </div>
  </div>
</template>

<script setup lang="ts">
import { LANGUAGES_SELECTOR_LIST } from '../../../define';

// Props
interface SnippetsItemProps {
  language: string
  title: string
  isActive?: boolean
}
defineProps<SnippetsItemProps>();
</script>

<style scoped lang="less">
.leftmenu-snippets-item {
  width: 100%;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 5px;
  color: @gray;
  .no-selection();

  &_active {
    background-color: @brown-alt;
    color: @white-bg;
  }

  &+& {
    margin-top: 5px;
  }

  &:hover {
    .highlight();
  }

  &__name {
    .text-overflow();
    font-size: 14px;
  }

  &__language {
    margin-top: 4px;
    font-size: 10px;
  }
}
</style>