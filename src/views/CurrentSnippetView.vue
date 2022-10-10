<template>
  <div class="container">
    <div
      v-if="currentSnippet"
      class="snippet"
    >
      <SnippetTitle
        :title="currentSnippet.title"
        @focusout="onTitleInput"
      />
      <SnippetLanguageSelector
        :language="currentSnippet.language"
        @change="onLanguageSelect"
      />
      <SnippetDescription
        :description="currentSnippet.description"
        @focusout="onDescriptionInput"
      />
      <SnippetCode
        :language="currentSnippet.language"
        :code="currentSnippet.code"
        @save-code="onCodeInput"
      />
    </div>
    <EmptySnippetView v-else />
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
import {
  SnippetLanguage,
  SnippetsSchema,
} from '../typescript/types/snippetsStore';
import EmptySnippetView from './EmptySnippetView.vue';

// Stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Pager ID's
const currentSnippetID = computed(() => pagerStore.currentSnippet);

const currentSnippet = computed<SnippetsSchema>(
  () =>
    snippetsStore.snippetsList.filter(
      (snippet) => snippet.id === currentSnippetID.value
    )[0]
);

function onTitleInput(e: Event): void {
  const element = e.target as HTMLInputElement;
  element.value = element.value.trim();

  if (element.value.length === 0) {
    element.value = currentSnippet.value.title;
  } else {
    currentSnippet.value.title = element.value;
  }
}

function onLanguageSelect(e: Event): void {
  const element = e.target as HTMLSelectElement;
  currentSnippet.value.language = element.value as SnippetLanguage;
}

function onDescriptionInput(e: Event): void {
  const element = e.target as HTMLTextAreaElement;
  currentSnippet.value.description = element.value;
}

function onCodeInput(code: string): void {
  currentSnippet.value.code = code;
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
