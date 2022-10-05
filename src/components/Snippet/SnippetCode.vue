<template>
  <div @focusout="onSave" class="snippet-code" ref="snippetEditor" />
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, onUpdated } from 'vue';
import { SnippetLanguage } from '../../typescript/types/snippetsStore';
import Codeflask from 'codeflask';
import Prism from 'prismjs';

const snippetEditor = ref(null) as Ref<null | HTMLElement>;

let editor: Codeflask;

const props = defineProps<{
  language: SnippetLanguage,
  code: string
}>();

const emit = defineEmits(['saveCode'])


onMounted(() => {
  initializeEditor();
});


onUpdated(() => {
  initializeEditor();
});

/**
 * Creates new editor with new language
 * @param editor Codeflask editor instance
 */
function initializeEditor() {
  editor = new Codeflask(snippetEditor.value as HTMLElement, {
    language: props.language
  });
  editor.addLanguage(props.language, Prism.languages[props.language] as Prism.Languages);
  editor.updateCode(props.code);
}

function onSave() {
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
    .default-border();
  }
</style>