<template>
  <Transition name="modal-fade">
    <div class="modal-wrapper">
      <div class="modal-window">
        <input
          ref="searchRef"
          v-model="searchPhrase"
          spellcheck="false"
          placeholder="Search for.."
          type="text"
          class="modal-window__search"
        >
        <div
          v-if="searchResultList.length > 0"
          ref="searchListRef"
          class="modal-window__found-items"
        >
          <ModalSearchItem
            v-for="(item, index) in searchResultList"
            :id="index"
            :key="index"
            class="modal-window__search-item"
            :found-item="item"
            :is-active="index === currentSelectedIndex"
            @click="select(item.storeId, item.type)"
          />
        </div>
        <ModalSearchEmpty v-else />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { SearchType, SearchItem, SearchItemType } from '../../../typescript/types/modalWindow';
import { searchFolder, searchSnippet, searchCommand } from '../../../typescript/search';
import ModalSearchItem from './ModalSearchItems.vue';
import useSnippetsStore from '../../../store/snippets.store';
import usePagerStore from '../../../store/pager.store';
import ModalSearchEmpty from './ModalSearchEmpty.vue';
import { WINDOW_COMMANDS } from '../../../define';

// Store
const snippetsStore = useSnippetsStore();
const pagerStore = usePagerStore();

// Refs
const searchRef = ref<HTMLElement>();
const searchListRef = ref<HTMLElement>();
const searchPhrase = ref<string>('');
const searchType = ref<SearchType>(SearchType.all);
const searchResultList = ref<SearchItem[]>([]);
const currentSelectedIndex = ref(0);

// Emits
const emit = defineEmits([ 'close' ]);

// Side effect search
watch(searchPhrase, () => {

  if (searchPhrase.value.trim().length === 0) {
    searchResultList.value = [];
    return;
  }

  switch (searchType.value) {
    case SearchType.folder:
      searchResultList.value = searchFolder(snippetsStore.directoriesList, searchPhrase.value);
      break;

    case SearchType.snippets:
      searchResultList.value = searchSnippet(snippetsStore.snippetsList, searchPhrase.value);
      break;

    case SearchType.commands:
      searchResultList.value = searchCommand(searchPhrase.value);
      break;

    default:
      searchResultList.value = [
        ...searchSnippet(snippetsStore.snippetsList, searchPhrase.value),
        ...searchFolder(snippetsStore.directoriesList, searchPhrase.value),
        ...searchCommand(searchPhrase.value)
      ];
  }

  currentSelectedIndex.value = 0;
});


onMounted(() => {
  if (searchRef.value) {
    searchRef.value.focus();
  }

  document.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
});

function onKeydown(e: KeyboardEvent): void {

  if (e.key === 'Escape') {
    emit('close');
  }

  // Select next item
  if (e.key === 'ArrowDown' || e.key === 'n' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (searchResultList.value.length <= 0) {
      return;
    }

    if (currentSelectedIndex.value + 1 >= searchResultList.value.length) {
      currentSelectedIndex.value = 0;
    } else {
      currentSelectedIndex.value++;
    }

    if (currentSelectedIndex.value === 0) {
      scrollTop();
    }

    if (currentSelectedIndex.value >= 6) {
      scroll(true);
    }
  }

  // Select previous item
  if (e.key === 'ArrowUp' || e.key === 'p' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (searchResultList.value.length <= 0) {
      return;
    }

    if (currentSelectedIndex.value - 1 < 0) {
      currentSelectedIndex.value = searchResultList.value.length - 1;
    } else {
      currentSelectedIndex.value--;
    }

    if (currentSelectedIndex.value === 0) {
      scrollTop();
    }

    if (currentSelectedIndex.value === searchResultList.value.length - 1) {
      scrollBottom();
    }

    if (currentSelectedIndex.value < searchResultList.value.length - 6) {
      scroll(false);
    }
  }

  // Select item
  if (e.key === 'Enter' || e.key === 'j' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    const currentItem = searchResultList.value[currentSelectedIndex.value];
    select(currentItem.storeId, currentItem.type).catch(e => console.error(e));
  }
}

/**
 * Select item from search
 * @param storeId - ID of selected item
 * @param type - Type of founded item
 */
async function select(storeId: number, type: SearchItemType): Promise<void> {
  switch (type) {
    case SearchItemType.folder:
      pagerStore.currentDirectory = snippetsStore.directoriesList[storeId].id;
      break;

    case SearchItemType.snippet: {
      
      // Current snippet
      const selectedSnippet = snippetsStore.snippetsList[storeId];

      // Search for directory
      const directory = snippetsStore.directoriesList.find(folder => folder.snippetsList.includes(selectedSnippet.id));

      // Select directory
      if (directory) {
        pagerStore.currentDirectory = directory.id;
      }

      // Select snippet
      pagerStore.currentSnippet = snippetsStore.snippetsList[storeId].id;
      break;
    }

    default:
      await WINDOW_COMMANDS[storeId].command();
  }

  emit('close');
}

function scroll(down: boolean): void {
  
  if (!searchListRef.value) {
    return;
  }

  if (down) {
    searchListRef.value.scrollTop += 57;
  } else {
    searchListRef.value.scrollTop -= 57;
  }
}

function scrollTop(): void {
  if (!searchListRef.value) {
    return;
  }

  searchListRef.value.scrollTop = 0;
}

function scrollBottom(): void {
  if (!searchListRef.value) {
    return;
  }

  searchListRef.value.scrollTop = searchListRef.value.scrollHeight;
}
</script>

<style scoped lang="less">
.modal-wrapper {
  inset: 0;
  position: absolute;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsla(0, 0, 0, 0.3);
}

.modal-window {
  width: 550px;
  height: 430px;
  margin-bottom: 4rem;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid hsla(0, 0, 0, 0.07);
  box-shadow: 0px 4px 4px 0 hsla(0, 0, 0, 0.07);
  z-index: 100;
  background-color: var(--popup-bg);
  color: var(--text);
  display: flex;
  flex-direction: column;
  .no-selection();

  &__search {
    width: 100%;
    height: 40px;
    background-color: var(--background);
    .default-border();
    padding: 8px;
    color: var(--text);

    &::placeholder {
      color: var(--placeholder);
    }
  }

  &__search-item {
    & + & {
      margin-top: 8px;
    }
  }

  &__found-items {
    margin-top: 8px;
    padding-top: 8px;
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .2s ease;
}
</style>