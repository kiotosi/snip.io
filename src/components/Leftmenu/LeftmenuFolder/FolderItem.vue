<template>
  <div class="leftmenu-folder-item" :class="{'leftmenu-folder-item_active': isActive}">
    <div class="leftmenu-folder-item__name">{{capitalize($props.name)}}</div>
    <div class="leftmenu-folder-item__amount">{{$props.snippetsAmount}}</div>
  </div>
</template>

<script setup lang="ts">
import { capitalize } from 'vue';

// Props
interface FolderItemProps {
  name: string // Folder name
  isActive?: boolean // Is our directory active
  snippetsAmount: number // How many snippets in current directory
}

defineProps<FolderItemProps>()

</script>

<style scoped lang="less">

.leftmenu-folder-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 5px;
  color: @gray;
  .no-selection();

  &_active {
    background-color: @teal-alt;
    color: @white-bg;
  }

  &+& {
    margin-top: 5px;
  }

  &:hover {
    .highlight();
  }

  &__name {
    margin-right: 12px;
    .text-overflow();
  }

  &__amount {
    font-size: 10px;
  }

}
</style>