<template>
  <div class="leftmenu-snippets">
    <SnippetsItem @click="selectSnippet(snippet.id)" v-for="snippet in snippetsList" :title="snippet.title" :language="snippet.language" :key="snippet.id"
      :is-active="snippet.id === currentSnippet" />
  </div>
</template>

<script lang="ts" setup>
import SnippetsItem from './SnippetsItem.vue';
import useSnippetsStore from '../../../store/snippets.store';
import usePagerStore from '../../../store/pager.store';
import { SnippetSchema } from '../../../typescript/types/snippetsStore';
import { computed } from 'vue';

// Stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Pager ID's
const currentDirectory = computed(() => pagerStore.currentDirectory);
const currentSnippet = computed(() => pagerStore.currentSnippet);

// Current snippet list
const snippetsList = computed<SnippetSchema[]>(() => {
  return snippetsStore.folders.
    filter(folder => folder.id === currentDirectory.value).at(0)?.snippets ?? [];
});

/**
 * Select the snippet
 * @param id ID of current snippet
 */
function selectSnippet(id: number) {
  pagerStore.currentSnippet = id;
  pagerStore.savePagerInfo();
}

</script>

<style lang="less" scoped>
.leftmenu-snippets {
  background-color: @gray-bg-alt;
  height: 100vh;
  width: 200px;
  padding: 16px 8px;
}
</style>