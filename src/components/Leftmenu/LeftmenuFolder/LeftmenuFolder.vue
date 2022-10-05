<template>
  <TransitionGroup>
    <div ref="leftmenuFolderReference" class="leftmenu-folder">
      <DirectoryItem v-for="item in directoryList" :key="item.id" v-bind="item"
        :is-active="item.id === activeDirectoryID" />
      <LeftmenuAdd class="leftmenu-folder__adder" @click="addFolder" />
    </div>
  </TransitionGroup>
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
</style>