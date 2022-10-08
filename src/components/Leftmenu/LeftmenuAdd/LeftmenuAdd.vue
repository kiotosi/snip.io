<template>
  <div class="leftmenu-folder-add">
    <i class="bi bi-plus-lg leftmenu-folder-add__icon" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.leftmenu-folder-add {
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  background-color: var(--leftmenu-adder-bg);
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 5px;
  color: var(--text-highlight);

  &:hover {
    .highlight();
  }
}
</style>
