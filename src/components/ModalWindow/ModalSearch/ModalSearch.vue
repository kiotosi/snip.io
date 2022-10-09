<template>
  <Transition name="modal-fade">
    <div
      class="modal-wrapper"
    >
      <div class="modal-window">
        <input
          ref="searchRef"
          v-model="searchPhrase"
          spellcheck="false"
          placeholder="Search for.."
          type="text"
          class="modal-window__search"
        >
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import {SearchType} from '../../../typescript/types/modalWindow';
import {searchFolder} from '../../../typescript/search';

// Refs
const searchRef = ref<HTMLElement>();
const searchPhrase = ref<string>('');
const searchResultList = [];

// Props
interface ModalSearchProps {
  type: SearchType
}

const props = defineProps<ModalSearchProps>();

watch(searchPhrase, () => {
  search(searchPhrase.value);
});

function search(input: string): void {
  switch (props.type) {
    case SearchType.folder:

      //
      break;
  }
}

onMounted(() => {
  if (searchRef.value) {
    searchRef.value.focus();
  }
});

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
  height: 400px;
  margin-bottom: 4rem;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid hsla(0,0,0,0.07);
  box-shadow: 0px 4px 4px 0 hsla(0,0,0,0.07);
  z-index: 100;
  background-color: var(--popup-bg);
  color: var(--text);
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