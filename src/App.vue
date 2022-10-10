<template>
  <div
    id="app-wrapper-ref"
    class="app-wrapper"
  >
    <LeftmenuMain />
    <CurrentSnippetView />
    <ModalSearch
      v-if="isSearchActive"
      @close="closeSearchModal"
    />
  </div>
</template>

<script lang="ts" setup>

// Components
import LeftmenuMain from './components/Leftmenu/LeftmenuMain.vue';
import CurrentSnippetView from './views/CurrentSnippetView.vue';

// Hooks
import { onBeforeMount, ref } from 'vue';

// Store
import useSnippetsStore from './store/snippets.store';
import usePagerStore from './store/pager.store';

// System pre-defined functions
import System from './typescript/system';

// Saver
import initializeSaver from './typescript/saver';
import ModalSearch from './components/ModalWindow/ModalSearch/ModalSearch.vue';

// Use stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Modal search
const isSearchActive = ref(false);

onBeforeMount(async () => {

  // Get actual information about snippets
  pagerStore.fetchPagerInfo();

  try {

    // Get snippets.json
    const snippetsJSON = await System.snippets.loadSnippetsFile();

    // Save it into global store (pinia)
    snippetsStore.snippetsList = snippetsJSON.snippetsList;
    snippetsStore.directoriesList = snippetsJSON.directoriesList;
  } catch (e) {
    console.error('Failed to parse snippets.json', e);
  }

  addEventListener('keydown', (e) => {
    
    // Show search modal
    if (!isSearchActive.value && e.key === 'p' && e.shiftKey === true && (e.metaKey === true || e.ctrlKey === true)) {
      isSearchActive.value = true;
    }
  });
});

function closeSearchModal(): void {
  isSearchActive.value = false;
}

// Initialize a watch to snippets store (it will save data in snippets.json, when store is mutated)
initializeSaver();
</script>

<style lang="less" scoped>
.app-wrapper {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  color: var(--text);
  background: var(--background);
  display: flex;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
