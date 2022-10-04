<template>
  <div class="leftmenu-folder">
    <FolderItem @click="selectFolder(item.id)" v-for="item in folderList" :key="item.id" v-bind="item"
      :is-active="item.id === activeFolderId" />
  </div>
</template>

<script lang="ts" setup>
import FolderItem from './FolderItem.vue';
import useSnippetsStore from '../../../store/snippets.store';
import { computed } from 'vue';
import usePagerStore from '../../../store/pager.store';

// Stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Folders in leftmenu
const folderList = computed(() => snippetsStore.folderList);
const activeFolderId = computed(() => pagerStore.currentDirectory);

/**
 * Select directory
 * @param id ID of current directory
 */
function selectFolder(id: number) {
  pagerStore.currentDirectory = id;
}
</script>

<style scoped lang="less">
.leftmenu-folder {
  width: 200px;
  height: 100vh;
  background-color: transparent;
  padding: 16px 8px;
}
</style>