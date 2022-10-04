<template>
  <div class="container">
    <div v-if="currentSnippet" class="snippet">
      <SnippetTitle :title="title" />
      <SnippetLanguageSelector @change="onChangeLanguage" :snippet-lang="currentSnippet.language" />
      <SnippetDescription  :snippet-description="description" />
      <SnippetCode :snippet-language="currentSnippet.language" :snippet-code="code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SnippetTitle from '../components/Snippet/SnippetTitle.vue';
import SnippetDescription from '../components/Snippet/SnippetDescription.vue';
import SnippetLanguageSelector from '../components/Snippet/SnippetLanguageSelector.vue';
import SnippetCode from '../components/Snippet/SnippetCode.vue';
import { computed } from 'vue';
import useSnippetsStore from '../store/snippets.store';
import { SnippetLanguage, SnippetSchema } from '../typescript/types/snippetsStore';
import usePagerStore from '../store/pager.store';
import { ref } from 'vue';

// IMPL: Need to implement mixin with stores and id's
// Stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Pager ID's
const currentDirectoryID = ref(pagerStore.currentDirectory);
const currentSnippetID = ref(pagerStore.currentSnippet);

// Subscribe to pager snippet state
pagerStore.$subscribe((mutation, state) => {
  
  // We must change snippet only if we cnage current snippet
  // This hack is used because, when we changed directory our snippet non exists in currentDirectoryID
  if (mutation.type === 'direct' && state.currentSnippet !== currentSnippetID.value ){
    currentDirectoryID.value = state.currentDirectory;
    currentSnippetID.value = state.currentSnippet;
  }
});

// Current indexes in array of snippets (in store)
const actualIndexes = computed(() => {
  return snippetsStore
    .getActualIndexes(currentDirectoryID.value, currentSnippetID.value);
});
// Current snippet
const currentSnippet = computed<SnippetSchema>(() => {
  return snippetsStore.folders[actualIndexes.value[0]]?.snippets[actualIndexes.value[1]];
});

const title = ref(currentSnippet.value?.title ?? '');
const description = ref(currentSnippet.value?.description ?? '');
const code = ref(currentSnippet.value?.code ?? '');

/**
 * Event on change language of snippet in editor
 * @param e Change event
 */
function onChangeLanguage(e: Event): void {
  const element = e.target as HTMLSelectElement;
  snippetsStore.folders[actualIndexes.value[0]].snippets[actualIndexes.value[1]].language = element.value as SnippetLanguage;
}
</script>


<style scoped lang="less">
.container {
  width: 100%;
  height: 100vh;
  padding: 32px 54px;
}

.snippet {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
}
</style>