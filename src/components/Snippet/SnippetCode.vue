<template>
  <div class="snippet-code" ref="snippetEditor" />
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, onUpdated } from 'vue';
import { SnippetLanguage } from '../../typescript/types/snippetsStore';
import Codeflask from 'codeflask';
import Prism from 'prismjs';

const snippetEditor = ref(null) as unknown as Ref<HTMLElement>;
let editor: Codeflask;

const props = defineProps<{
  snippetLanguage: SnippetLanguage,
  snippetCode: string
}>();


onMounted(() => {
  initializeEditor(editor);
});


onUpdated(() => {
  initializeEditor(editor);
});

/**
 * Creates new editor with new language
 * @param editor Codeflask editor instance
 */
function initializeEditor(editor: Codeflask) {
  editor = new Codeflask(snippetEditor.value, {
    language: props.snippetLanguage
  });
  editor.addLanguage(props.snippetLanguage, Prism.languages[props.snippetLanguage] as Prism.Languages);
  editor.updateCode(props.snippetCode);
}
</script>

<style scoped lang="less">
  .snippet-code {
    position: relative;
    width: 100%;
    height: 210px;
    flex-grow: 1;
    margin-top: 2rem;
    .default-border();
  }
</style>