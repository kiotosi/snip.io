<template>
  <div class="app-wrapper">
    <LeftmenuMain />
    <EmptySnippetView v-if="currentSnippetID === -1" />
    <CurrentSnippetView v-else />
  </div>
</template>

<script lang="ts" setup>

// Components
import LeftmenuMain from "./components/Leftmenu/LeftmenuMain.vue";
import EmptySnippetView from "./views/EmptySnippetView.vue";
import CurrentSnippetView from "./views/CurrentSnippetView.vue";
import { appWindow } from "@tauri-apps/api/window";

// Hooks
import { computed, onBeforeMount } from 'vue';

// Store
import useSnippetsStore from './store/snippets.store';
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
    snippetsStore.snippets = snippetsJSON.snippets;
    snippetsStore.directories = snippetsJSON.directories;
  } catch (e) {
    console.error('Failed to parse snippets.json', e);
  }
});

// Save snippets, when user requested exit
appWindow.onCloseRequested(async () => {
  await System.snippets.saveSnippetsFile(JSON.stringify({
    directories: snippetsStore.directories,
    snippets: snippetsStore.snippets
  }));
});
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

*, *::before, *::after {
  box-sizing: border-box;
}

</style>