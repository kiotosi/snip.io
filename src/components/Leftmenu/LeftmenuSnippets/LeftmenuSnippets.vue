<template>
  <!-- Case when there is no directory -->
  <LeftmenuPlaceholder
    class="leftmenu-placeholder_snippet"
    v-if="directoriesList.length < 1"
    icon-name="chevron-double-left"
    text="First of all you need to create a directory 😌"
  />

  <!-- Case when there is no snippet in directory -->
  <LeftmenuPlaceholder
    class="leftmenu-placeholder_snippet"
    v-else-if="snippetsList.length < 1"
    :clickable="true"
    @create="addSnippet"
    icon-name="plus-circle-dotted"
    text="You can create a new snippet via another plus sign 💁‍♂️"
  />

  <!-- Other cases (Display snippets list) -->
  <div v-else class="leftmenu-snippets">
    <LeftmenuSnippetItem
      v-for="snippet in snippetsList"
      :title="snippet.title"
      :id="snippet.id"
      :language="snippet.language"
      :key="snippet.id"
      :is-active="snippet.id === currentSnippetID"
    />
    <LeftmenuAdd @click="addSnippet" class="leftmenu-snippets__adder" />
  </div>
</template>

<script lang="ts" setup>
import LeftmenuSnippetItem from './LeftmenuSnippetItem.vue';
import LeftmenuAdd from '../LeftmenuAdd/LeftmenuAdd.vue';
import useSnippetsStore from '../../../store/snippets.store';
import usePagerStore from '../../../store/pager.store';
import { SnippetsSchema } from '../../../typescript/types/snippetsStore';
import { computed } from 'vue';
import { createSnippetMock } from '../../../typescript/creator';
import LeftmenuPlaceholder from '../LeftmenuPlaceholder/LeftmenuPlaceholder.vue';

// Stores
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Pager ID's
const currentDirectoryID = computed(() => pagerStore.currentDirectory);
const currentSnippetID = computed(() => pagerStore.currentSnippet);
const directoriesList = computed(() => snippetsStore.directoryList);

// Current snippet list
const snippetsList = computed<SnippetsSchema[]>(() => {
  // Current directory sub-items identificators
  const snippetsListID = snippetsStore.directories
    .filter((folder) => folder.id === currentDirectoryID.value)
    .at(0)?.snippets_list;

  if (!snippetsListID) {
    return [];
  }
  return snippetsStore.snippets.filter((snippet) =>
    snippetsListID.includes(snippet.id)
  );
});

function addSnippet(): void {
  if (snippetsStore.directories.length === 0) {
    return;
  }
  const newID = snippetsStore.lastSnippetID + 1;
  const snippetMockup = createSnippetMock(newID);

  // Push new snippet
  snippetsStore.snippets.push(snippetMockup);

  // Push new ID to current directoty
  const currentDirectory = snippetsStore.directories
    .filter((folder) => folder.id === currentDirectoryID.value)
    .at(0);

  if (currentDirectory) {
    currentDirectory.snippets_list.push(newID);
    pagerStore.currentSnippet = newID;
    pagerStore.savePagerInfo();
  }
}
</script>

<style lang="less" scoped>
.leftmenu-placeholder_snippet {
  background-color: @gray-bg-alt;
}
.leftmenu-snippets {
  background-color: @gray-bg-alt;
  height: 100vh;
  width: 200px;
  padding: 16px 8px;
  overflow-y: auto;

  &__adder {
    margin-top: 5px;
    display: none;
  }

  &:hover {
    .leftmenu-snippets__adder {
      display: flex;
    }
  }
}
</style>
