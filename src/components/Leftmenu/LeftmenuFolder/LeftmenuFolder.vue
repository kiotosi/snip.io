<template>
  <div class="leftmenu-folder">
    <FolderItem @click="onClickFolderItem(item.id)" v-for="item in folderList" :key="item.id" v-bind="item" />
  </div>
</template>

<script lang="ts" setup>
import FolderItem from './FolderItem.vue';
import { reactive } from 'vue';
import { FolderList } from '../../../typescript/types/leftmenuFolder';

/**
 * IMPL Implement capture of all directories from snippets.json through pinia
 * Also generate the following list via methods described in this component
 */
// remove This list not required, this is an example.
// Delete it after implementing an algorithm, that captures all snippets
const folderList: FolderList = reactive<FolderList>(
  [
    {
      isActive: true,
      name: "math",
      snippetsAmount: 0,
      id: 0
    },
    {
      isActive: false,
      name: "Looooooooooooooooooooooooooooong",
      snippetsAmount: 2,
      id: 1
    },
    {
      isActive: false,
      name: "work",
      snippetsAmount: 32,
      id: 2
    }
  ]);
  // END OF TEST


/**
 * Click event on folder.
 * Changes isActive folder in array.
 * @param id ID of folder
 */
function onClickFolderItem(id: number): void {

  // Changing active folder
  folderList
    .forEach(folder => {

      if (folder.id !== id) {
        folder.isActive = false;
      } else {
        folder.isActive = true;
      }

    });

  return;
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