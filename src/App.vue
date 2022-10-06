<template>
  <div class="app-wrapper">
    <LeftmenuMain />
    <CurrentSnippetView />
  </div>
</template>

<script lang="ts" setup>
// Components
import LeftmenuMain from './components/Leftmenu/LeftmenuMain.vue';
import CurrentSnippetView from './views/CurrentSnippetView.vue';

// Hooks
import { onBeforeMount } from 'vue';

// Store
import useSnippetsStore from './store/snippets.store';
import usePagerStore from './store/pager.store';

// System pre-defined functions
import System from './typescript/system';

// Saver
import initializeSaver from './typescript/saver';

// Use stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

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

// Initialize a watch to snippets store (it will save data in snippets.json, when store is mutated)
initializeSaver();
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

*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
