<template>
  <div class="container">
    <div class="snippet">
      <SnippetTitle :snippet-name="snippet.title" />
      <SnippetLanguageSelector @change="onChangeLanguage" :snippet-lang="snippet.language" />
      <SnippetDescription :snippet-description="snippet.description" />
      <SnippetCode :snippet-language="snippet.language" :snippet-code="snippet.code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SnippetTitle from '../components/Snippet/SnippetTitle.vue';
import SnippetDescription from '../components/Snippet/SnippetDescription.vue';
import SnippetLanguageSelector from '../components/Snippet/SnippetLanguageSelector.vue';
import SnippetCode from '../components/Snippet/SnippetCode.vue';
import { Snippet, SnippetLanguage } from '../components/Snippet/snippet.types';
import { reactive } from 'vue';
import usePagerStore from '../store/pager/pagerStore';

const pagerStore = usePagerStore();

const snippet = pagerStore[0];

console.log(snippet);

function onChangeLanguage(e: Event) {
  const element = e.target as HTMLSelectElement;
  snippet.language = element.value as SnippetLanguage;
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