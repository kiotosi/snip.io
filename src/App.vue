<template>
  <div class="app-wrapper">
    <LeftmenuMain />
    <!-- IMPL Need to change to SnippetView, when any snippet is selected.
         IMPL First of all need to implement Pinia store -->
    <EmptySnippetView />
  </div>
</template>

<script lang="ts" setup>
import LeftmenuMain from "./components/Leftmenu/LeftmenuMain.vue";
import EmptySnippetView from "./views/EmptySnippetView.vue";

</script>

<style lang="less" scoped>

.app-wrapper {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  color: @black;
  background: @white-bg;
  display: flex;
}
</style>