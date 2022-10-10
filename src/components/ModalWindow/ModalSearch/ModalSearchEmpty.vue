<template>
  <div class="modal-search-empty">
    <div class="modal-search-empty__icon">
      <i class="bi bi-lightning" />
    </div>
    <div class="modal-search-empty__text">
      Search for something 🙂
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.modal-search-empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--text);


  &__icon {
    font-size: 3rem;
  }

  &__text {
    font-size: 16px;
    font-weight: 200;
    margin-top: 25px;
  }
}
</style>