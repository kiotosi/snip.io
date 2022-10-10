<template>
  <div
    class="modal-search-item"
    :class="{'modal-search-item_active': isActive}"
  >
    <div class="modal-search-item__name">
      {{ getName() }}
    </div>
    <div class="modal-search-item__type">
      {{ getType() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {SearchItem, SearchItemType} from '../../../typescript/types/modalWindow';
import useSnippetsStore from '../../../store/snippets.store';
import { WINDOW_COMMANDS } from '../../../define';

// Store
const snippetsStore = useSnippetsStore();

// Props
interface ModalSearchItemProps {
  id: number,
  foundItem: SearchItem
  isActive: boolean
}

const props = defineProps<ModalSearchItemProps>();


/**
 * Get the name of founded item
 */
function getName(): string {
  switch (props.foundItem.type) {
    case SearchItemType.folder:
      return snippetsStore.directoriesList.at(props.foundItem.storeId)?.name ?? '';

    case SearchItemType.snippet:
      return snippetsStore.snippetsList.at(props.foundItem.storeId)?.title ?? '';

    default:
      return WINDOW_COMMANDS.at(props.foundItem.storeId)?.name ?? '';
  }
}

/**
 * Get type of founded item
 */
function getType(): string {
  
  switch (props.foundItem.type) {
    case SearchItemType.snippet: {
      const snippet = snippetsStore.snippetsList.at(props.foundItem.storeId);

      if (snippet) {
        return `Snippet / ${snippet.language}`;
      }

      return 'Snippet';
    }
    case SearchItemType.folder:
      return 'Folder';
    default:
      return 'Command';
  }
}
</script>

<style scoped lang="less">
.modal-search-item {
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  .default-border();

  &_active {
    background-color: var(--popup-active-item);
  }

  &__type {
    font-size: 10px;
    margin-top: 4px;
  }


  &:hover {
    .highlight();
  }
}
</style>