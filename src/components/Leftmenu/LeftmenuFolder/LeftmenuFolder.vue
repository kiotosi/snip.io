<template>
  <div ref="leftmenuFolderReference" class="leftmenu-folder">
    <TransitionGroup name="folder">
      <DirectoryItem v-for="item in directoryList" :key="item.id" v-bind="item"
        :is-active="item.id === activeDirectoryID" />
      <LeftmenuAdd :key="'adder'" class="leftmenu-folder__adder" @click="addFolder" />
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import DirectoryItem from './LeftmenuFolderItem.vue';
import useSnippetsStore from '../../../store/snippets.store';
import usePagerStore from '../../../store/pager.store';
import LeftmenuAdd from '../LeftmenuAdd/LeftmenuAdd.vue';
import { createDirectoryMock } from '../../../typescript/creator';

// Stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Folders in leftmenu
const directoryList = computed(() => snippetsStore.directoryList);
const activeDirectoryID = computed(() => pagerStore.currentDirectory);

function addFolder() {
  const newID = snippetsStore.lastDirectoryID + 1;
  const directoryMock = createDirectoryMock(newID);
  snippetsStore.directories.push(directoryMock);
  pagerStore.currentDirectory = newID;
}
</script>

<style scoped lang="less">
.leftmenu-folder {
  width: 200px;
  height: 100vh;
  background-color: transparent;
  padding: 16px 8px;
  overflow-y: auto;

  div+div {
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