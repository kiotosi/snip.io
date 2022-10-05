<template>
  <div class="container">
    <div v-if="currentSnippet" class="snippet">
      <SnippetTitle @focusout="onTitleInput" :title="currentSnippet.title" />
      <SnippetLanguageSelector @change="onLanguageSelect" :language="currentSnippet.language" />
      <SnippetDescription @focusout="onDescriptionInput" :description="currentSnippet.description" />
      <SnippetCode @save-code="onCodeInput" :language="currentSnippet.language" :code="currentSnippet.code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SnippetTitle from '../components/Snippet/SnippetTitle.vue';
import SnippetDescription from '../components/Snippet/SnippetDescription.vue';
import SnippetLanguageSelector from '../components/Snippet/SnippetLanguageSelector.vue';
import SnippetCode from '../components/Snippet/SnippetCode.vue';
import useSnippetsStore from '../store/snippets.store';
import usePagerStore from '../store/pager.store';
import { SnippetLanguage, SnippetsSchema } from '../typescript/types/snippetsStore';

// IMPL: Need to implement mixin with stores and id's
// Stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Pager ID's
const currentSnippetID = computed(() => pagerStore.currentSnippet);

const currentSnippet = computed<SnippetsSchema>(() => snippetsStore.snippets
  .filter(snippet => snippet.id === currentSnippetID.value)[0]
);

function onTitleInput(e: Event) {
  const element = e.target as HTMLElement;
  element.innerText = element.innerText.trim().slice(0, 50);
  currentSnippet.value.title = element.innerText;
}

function onLanguageSelect(e: Event) {
  const element = e.target as HTMLSelectElement;
  currentSnippet.value.language = element.value as SnippetLanguage;
}

function onDescriptionInput(e: Event) {
  const element = e.target as HTMLTextAreaElement;
  currentSnippet.value.description = element.value;
}

function onCodeInput(code: string) {
  currentSnippet.value.code = code;
  console.log(currentSnippet.value.code);
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