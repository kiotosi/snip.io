<template>
  <div @click="selectSnippet"  class="leftmenu-snippets-item" :class="{'leftmenu-snippets-item_active': isActive}">
    <div class="leftmenu-snippet-item__info">
      <div class="leftmenu-snippets-item__name">
        {{title}}
      </div>
      <div class="leftmenu-snippets-item__language">
        {{LANGUAGES_SELECTOR_LIST[language as keyof typeof LANGUAGES_SELECTOR_LIST]}}
      </div>
    </div>
    <div @click="deleteSnippet" class="leftmenu-snippets-item__trash">
      <i class="bi bi-trash"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LANGUAGES_SELECTOR_LIST } from '../../../define';
import usePagerStore from '../../../store/pager.store';
import useSnippetsStore from '../../../store/snippets.store';

// Store
const pagerStore = usePagerStore();
const snippetsStore = useSnippetsStore();

// Props
interface SnippetsItemProps {
  language: string
  title: string
  isActive?: boolean
  id: number
}
const props = defineProps<SnippetsItemProps>();

/**
 * Select the snippet
 * @param id ID of current snippet
 */
function selectSnippet() {
  pagerStore.currentSnippet = props.id;
  pagerStore.savePagerInfo();
}

function deleteSnippet() {
  if (pagerStore.currentSnippet === props.id) {
    pagerStore.currentSnippet = -1;
  }

  // Delete index from directory
  const directoryIndex = snippetsStore.directories.findIndex(folder => folder.id === pagerStore.currentDirectory);
  snippetsStore.directories[directoryIndex].snippets_list = snippetsStore
    .directories[directoryIndex]
    .snippets_list.filter(id => id !== props.id);

  
  // Delete snippet
  const index = snippetsStore.snippets.findIndex(snippet => snippet.id === props.id);
  snippetsStore.snippets.splice(index, 1);
}
</script>

<style scoped lang="less">
.leftmenu-snippets-item {
  width: 100%;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    .leftmenu-snippets-item__trash {
      display: block;
    }
  }

  &__name {
    .text-overflow();
    max-width: 150px;
    font-size: 14px;
  }

  &__language {
    margin-top: 4px;
    font-size: 10px;
  }
  &__trash {
    display: none;
    &:hover {
      color: @red-alt;
    }
  }
}

</style>