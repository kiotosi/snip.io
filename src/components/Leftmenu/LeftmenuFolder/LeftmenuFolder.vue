<template>
  <div
    v-if="directoryList.length"
    class="leftmenu-folder"
  >
    <TransitionGroup name="folder">
      <DirectoryItem
        v-for="item in directoryList"
        :key="item.id"
        v-bind="item"
        :is-active="item.id === activeDirectoryID"
        @delete="() => {isModalShowed = true; currentDeletingFolder = item.id}"
      />
      <LeftmenuAdd
        :key="'adder'"
        class="leftmenu-folder__adder"
        @click="addFolder"
      />
    </TransitionGroup>
  </div>
  <LeftmenuPlaceholder
    v-else
    :clickable="true"
    icon-name="plus-circle"
    text="To create directory click on plus sign 🙂"
    @create="addFolder"
  />

  <ModalDialog
    v-show="isModalShowed"
    :text="MODAL_WARNING"
    icon="folder-fill"
    @action="deleteFolder"
    @close="() => isModalShowed = false"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import DirectoryItem from './LeftmenuFolderItem.vue';
import useSnippetsStore from '../../../store/snippets.store';
import usePagerStore from '../../../store/pager.store';
import LeftmenuAdd from '../LeftmenuAdd/LeftmenuAdd.vue';
import { createDirectoryMock } from '../../../typescript/creator';
import LeftmenuPlaceholder from '../LeftmenuPlaceholder/LeftmenuPlaceholder.vue';
import ModalDialog from '../../ModalWindow/ModalDialog.vue';

// Stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Folders in leftmenu
const directoryList = computed(() => snippetsStore.directoryList);
const activeDirectoryID = computed(() => pagerStore.currentDirectory);

// Text in modal window, when we are deleting folder
const MODAL_WARNING = 'Do you really want to delete this directory?\nIt will be deleted irrevocably, you will not be able to restore it.';

// State of modal window
const isModalShowed = ref(false);
const currentDeletingFolder = ref(0);

function addFolder(): void {
  const newID = snippetsStore.lastDirectoryID + 1;
  const directoryMock = createDirectoryMock(newID);
  snippetsStore.directoriesList.push(directoryMock);
  pagerStore.currentDirectory = newID;
}

function deleteFolder(): void {
  if (snippetsStore.directoriesList.length === 1) {
    return;
  }

  // Getting folder index in store
  const currentFolderID = snippetsStore.directoriesList.findIndex(
    (folder) => folder.id === currentDeletingFolder.value
  );

  // Deleting all child snippets
  if (currentFolderID !== -1) {
    snippetsStore.snippetsList = snippetsStore.snippetsList.filter(
      (snippet) =>
        !snippetsStore.directoriesList[currentFolderID].snippetsList.includes(
          snippet.id
        )
    );
  }

  // Deleting folder
  snippetsStore.directoriesList.splice(currentFolderID, 1);

  if (currentDeletingFolder.value === pagerStore.currentDirectory) {
    pagerStore.currentDirectory = -1;
    pagerStore.currentSnippet = -1;
  }
}
</script>

<style scoped lang="less">
.leftmenu-folder {
  width: 200px;
  height: 100vh;
  background-color: var(--leftmenu-folder-bg);
  padding: 16px 8px;
  overflow-y: auto;

  div + div {
    margin-top: 4px;
  }

  &__adder {
    display: none;
  }

  &:hover {
    .leftmenu-folder__adder {
      display: flex;
    }
  }
}

// Transition
.folder-enter-active,
.folder-leave-active {
  transition: all 0.33s ease;
}
.folder-enter-from,
.folder-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
