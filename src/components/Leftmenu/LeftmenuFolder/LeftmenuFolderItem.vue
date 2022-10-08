<template>
  <div
    v-if="isEditing"
    class="leftmenu-folder-item"
    :class="{ 'leftmenu-folder-item_active': isActive }"
  >
    <input
      ref="directoryNameInput"
      class="leftmenu-folder-item__edit"
      :value="capitalize(name)"
      spellcheck="false"
      contenteditable="true"
      @keydown="checkRename"
      @focusout="endRename"
    >
  </div>

  <div
    v-else
    class="leftmenu-folder-item leftmenu-folder-item_display"
    :class="{ 'leftmenu-folder-item_active': isActive }"
    @dblclick="startRename"
    @click="selectFolder"
  >
    <div class="leftmenu-folder-item__name">
      {{ capitalize($props.name) }}
    </div>

    <div class="leftmenu-folder-item__info">
      <div
        v-if="directoriesCount > 1"
        class="leftmenu-folder-item__trash"
        @click="$emit('delete')"
      >
        <i class="bi bi-trash" />
      </div>
      <div class="leftmenu-folder-item__amount">
        {{ $props.snippetsAmount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalize, computed, nextTick, ref } from 'vue';
import usePagerStore from '../../../store/pager.store';
import useSnippetsStore from '../../../store/snippets.store';

// Stores
const pagerStore = usePagerStore();
const snippetsStore = useSnippetsStore();

// Reference
const directoryNameInput = ref<null | HTMLInputElement>(null);
const isEditing = ref(false);

// Props
interface FolderItemProps {
  name: string; // Folder name
  isActive?: boolean; // Is our directory active
  snippetsAmount: number; // How many snippets in current directory
  id: number; // Id of folder
}
const props = defineProps<FolderItemProps>();

// DIrectories count
const directoriesCount = computed(() => snippetsStore.directories.length);

// Emits
defineEmits([ 'delete' ]);

async function startRename(): Promise<void> {
  isEditing.value = true;
  await nextTick(() => {
    directoryNameInput.value?.focus();
  });
}

function endRename(): void {
  isEditing.value = false;
  const directory = snippetsStore.directories.find(
    (folder) => folder.id === props.id
  );

  if (directory) {
    const text = directoryNameInput.value?.value;
    directory.name = !text ? directory.name : text;
  }
}

function checkRename(e: KeyboardEvent): void {
  if (e.key === 'Enter') {
    e.preventDefault();
    endRename();
  }
}

/**
 * Select directory
 */
function selectFolder(): void {
  pagerStore.currentDirectory = props.id;
}
</script>

<style scoped lang="less">
.leftmenu-folder-item {
  width: 100%;
  padding: 4px 8px;
  border-radius: 5px;
  color: var(--text);
  min-height: 24px;

  &_display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .no-selection();
  }

  &_active {
    background-color: var(--leftmenu-folder-accent);
    color: var(--text-highlight);
  }

  & + & {
    margin-top: 5px;
  }

  &:hover {
    .highlight();

    .leftmenu-folder-item__trash {
      display: block;

      &:hover {
        i {
          color: var(--trash);
        }
      }
    }
  }

  &__edit {
    margin: 0;
    width: 100%;
    outline: none;
    border: none;
    background-color: transparent;
    color: var(--text-highlight);
  }

  &__name {
    margin-right: 12px;
    .text-overflow();
  }

  &__amount {
    font-size: 10px;
  }

  &__info {
    display: flex;
    align-items: center;
  }

  &__trash {
    display: none;
    margin-right: 8px;
    padding-left: 4px;
  }
}
</style>
