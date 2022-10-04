<template>
  <div class="app-wrapper">
    <LeftmenuMain />
    <!-- IMPL Need to change to SnippetView, when any snippet is selected.
         IMPL First of all need to implement Pinia store -->
    <EmptySnippetView v-if="currentSnippetID === -1"/>
    <CurrentSnippetView v-else />
  </div>
</template>

<script lang="ts" setup>

// Components
import LeftmenuMain from "./components/Leftmenu/LeftmenuMain.vue";
import EmptySnippetView from "./views/EmptySnippetView.vue";
import CurrentSnippetView from "./views/CurrentSnippetView.vue";

// Hooks
import { computed, onBeforeMount } from 'vue';

// Store
import useSnippetsStore from './store/snippets.store';
import { FolderSchema } from './typescript/types/snippetsStore';
import usePagerStore from './store/pager.store';

// System pre-defined functions
import System from "./typescript/system";

// Use stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Selected snippet id
const currentSnippetID = computed(() => pagerStore.currentSnippet);

onBeforeMount(async () => {
  
  // Get actual information about snippets
  pagerStore.fetchPagerInfo();

  try {
    // Get snippets.json
    const snippetsJSON = await System.snippets.loadSnippetsFile();

    // Save it into global store (pinia)
    snippetsStore.folders = snippetsJSON;
  } catch (e) {
    console.error('Failed to parse snippets.json', e);
  }
});

window.onbeforeunload = async () => {
  System.snippets.saveSnippetsFile(JSON.stringify(snippetsStore.folders))
};
</script>

<style lang="less" scoped>
.app-wrapper {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  color: @black;
  background: @white-bg;
  display: flex;
}
</style>