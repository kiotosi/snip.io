<template>
  <div
    v-if="isEditing"
    class="leftmenu-folder-item"
    :class="{ 'leftmenu-folder-item_active': isActive }"
  >
    <input
      :value="capitalize(name)"
      ref="directoryNameInput"
      spellcheck="false"
      contenteditable="true"
      @keydown="checkRename"
      @focusout="endRename"
      class="leftmenu-folder-item__edit"
    />
  </div>

  <div
    v-else
    @dblclick="startRename"
    @click="selectFolder"
    class="leftmenu-folder-item leftmenu-folder-item_display"
    :class="{ 'leftmenu-folder-item_active': isActive }"
  >
    <div class="leftmenu-folder-item__name">{{ capitalize($props.name) }}</div>
    <div class="leftmenu-folder-item__info">
      <div @click="deleteFolder" class="leftmenu-folder-item__trash">
        <i class="bi bi-trash"></i>
      </div>
      <div class="leftmenu-folder-item__amount">
        {{ $props.snippetsAmount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalize, nextTick, ref } from 'vue';
import usePagerStore from '../../../store/pager.store';
import useSnippetsStore from '../../../store/snippets.store';

// Stores
const pagerStore = usePagerStore();
const snippetsStore = useSnippetsStore();

// Reference
const directoryNameInput = ref<null | HTMLInputElement>(null);
const isEditing = ref(false);

// Props
interface FolderItemProps {
  name: string; // Folder name
  isActive?: boolean; // Is our directory active
  snippetsAmount: number; // How many snippets in current directory
  id: number; // Id of folder
}
const props = defineProps<FolderItemProps>();

function startRename() {
  isEditing.value = true;
  nextTick(() => {
    directoryNameInput.value?.focus();
  });
}

function deleteFolder() {
  if (snippetsStore.directories.length === 1) {
    return;
  }

  // Getting folder index in store
  const currentFolderID = snippetsStore.directories.findIndex(
    (folder) => folder.id === props.id
  );

  // Deleting all child snippets
  if (currentFolderID !== -1) {
    snippetsStore.snippets = snippetsStore.snippets.filter(
      (snippet) =>
        !snippetsStore.directories[currentFolderID].snippets_list.includes(
          snippet.id
        )
    );
  }

  // Deleting folder
  snippetsStore.directories.splice(currentFolderID, 1);

  if (props.id === pagerStore.currentDirectory) {
    pagerStore.currentDirectory = -1;
    pagerStore.currentSnippet = -1;
  }
}

function endRename() {
  isEditing.value = false;
  const directory = snippetsStore.directories.find(
    (folder) => folder.id === props.id
  );

  if (directory) {
    const text = directoryNameInput.value?.value;
    directory.name = !text ? directory.name : text;
  }
}

function checkRename(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault();
    endRename();
  }
}

/**
 * Select directory
 * @param id ID of current directory
 */
function selectFolder(): void {
  pagerStore.currentDirectory = props.id;
}
</script>

<style scoped lang="less">
.leftmenu-folder-item {
  width: 100%;
  padding: 4px 8px;
  border-radius: 5px;
  color: @gray;
  min-height: 24px;

  &_display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .no-selection();
  }

  &_active {
    background-color: @teal-alt;
    color: @white-bg;
  }

  & + & {
    margin-top: 5px;
  }

  &:hover {
    .highlight();

    .leftmenu-folder-item__trash {
      display: block;

      &:hover {
        i {
          color: @red-alt;
        }
      }
    }
  }

  &__edit {
    margin: 0;
    width: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    color: @white;
  }

  &__name {
    margin-right: 12px;
    .text-overflow();
  }

  &__amount {
    font-size: 10px;
  }

  &__info {
    display: flex;
    align-items: center;
  }

  &__trash {
    display: none;
    margin-right: 8px;
    padding-left: 4px;
  }
}
</style>
