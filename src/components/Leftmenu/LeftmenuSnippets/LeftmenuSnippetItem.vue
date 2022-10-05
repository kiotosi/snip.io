<template>
  <div @click="selectSnippet(id)"  class="leftmenu-snippets-item" :class="{'leftmenu-snippets-item_active': isActive}">
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
import usePagerStore from '../../../store/pager.store';

// Store
const pagerStore = usePagerStore();

// Props
interface SnippetsItemProps {
  language: string
  title: string
  isActive?: boolean
  id: number
}
defineProps<SnippetsItemProps>();

/**
 * Select the snippet
 * @param id ID of current snippet
 */
function selectSnippet(id: number) {
  pagerStore.currentSnippet = id;
  pagerStore.savePagerInfo();
}
</script>

<style scoped lang="less">
.leftmenu-snippets-item {
  width: 100%;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 5px;
  color: @gray;
  min-height: 39px;
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