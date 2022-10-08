<template>
  <div
    class="leftmenu-snippets-item"
    :class="{ 'leftmenu-snippets-item_active': isActive }"
    @click="selectSnippet"
  >
    <div class="leftmenu-snippet-item__info">
      <div class="leftmenu-snippets-item__name">
        {{ title }}
      </div>
      <div class="leftmenu-snippets-item__language">
        {{
          LANGUAGES_SELECTOR_LIST[
            language
          ]
        }}
      </div>
    </div>
    <div
      class="leftmenu-snippets-item__trash"
      @click="(e) => { isModalShowed = true }"
    >
      <i class="bi bi-trash" />
    </div>
  </div>

  <ModalDialog
    v-show="isModalShowed"
    :text="MODAL_WARNING"
    icon="file-x-fill"
    @action="deleteSnippet"
    @close="() => isModalShowed = false"
  />
</template>

<script setup lang="ts">
import { LANGUAGES_SELECTOR_LIST } from '../../../define';
import usePagerStore from '../../../store/pager.store';
import useSnippetsStore from '../../../store/snippets.store';
import { ref } from 'vue';
import ModalDialog from '../../ModalWindow/ModalDialog.vue';

// Store
const pagerStore = usePagerStore();
const snippetsStore = useSnippetsStore();

// Props
interface SnippetsItemProps {
  language: keyof typeof LANGUAGES_SELECTOR_LIST;
  title: string;
  isActive?: boolean;
  id: number;
}
const props = defineProps<SnippetsItemProps>();

// References
const isModalShowed = ref(false);

// Modal window
const MODAL_WARNING = 'Do you really want to remove this snippet? After deletion, this snippet can no longer be restored';

/**
 * Select the snippet
 */
function selectSnippet(): void {
  pagerStore.currentSnippet = props.id;
  pagerStore.savePagerInfo();
}

function deleteSnippet(): void {
  if (pagerStore.currentSnippet === props.id) {
    pagerStore.currentSnippet = -1;
  }

  // Delete index from directory
  const directoryIndex = snippetsStore.directories.findIndex(
    (folder) => folder.id === pagerStore.currentDirectory
  );
  snippetsStore.directories[directoryIndex].snippets_list =
    snippetsStore.directories[directoryIndex].snippets_list.filter(
      (id) => id !== props.id
    );

  // Delete snippet
  const index = snippetsStore.snippets.findIndex(
    (snippet) => snippet.id === props.id
  );
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
  color: var(--text);
  min-height: 39px;
  .no-selection();

  &_active {
    background-color: var(--leftmenu-snippet-accent);
    color: var(--text-highlight);
  }

  & + & {
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
    min-height: 1rem;
  }

  &__language {
    margin-top: 4px;
    font-size: 10px;
  }
  &__trash {
    display: none;
    &:hover {
      color: var(--trash);
    }
  }
}
</style>
