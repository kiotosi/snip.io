<template>
  <div
    ref="snippetEditor"
    class="snippet-code"
    @focusout="onSave"
  />
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, onUpdated } from 'vue';
import { SnippetLanguage } from '../../typescript/types/snippetsStore';
import Codeflask from 'codeflask';
import Prism from 'prismjs';

const snippetEditor = ref(null) as Ref<null | HTMLElement>;

let editor: Codeflask;

const props = defineProps<{
  language: SnippetLanguage;
  code: string;
}>();

const emit = defineEmits([ 'saveCode' ]);

onMounted(() => {
  initializeEditor();
});

onUpdated(() => {
  initializeEditor();
});

/**
 * Creates new editor with new language
 */
function initializeEditor(): void {
  editor = new Codeflask(snippetEditor.value as HTMLElement, {
    language: props.language,
    defaultTheme: false,
  });
  editor.addLanguage(
    props.language,
    Prism.languages[props.language] as Prism.Languages
  );
  editor.updateCode(props.code);
}

function onSave(): void {
  emit('saveCode', editor.getCode());
}
</script>

<style scoped lang="less">
.snippet-code {
  position: relative;
  width: 100%;
  height: 210px;
  flex-grow: 1;
  margin-top: 2rem;
  position: relative;
  background-color: var(--input-bg);
  .default-border();
}
</style>
