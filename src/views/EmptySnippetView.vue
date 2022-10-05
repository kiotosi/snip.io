<template>
  <div class="empty-screen">
    <i class="empty-screen__icon bi bi-journals"></i>
    <div class="empty-screen__description">
      <p class="empty-screen__text">There is no selected snippets.</p>
      <p class="empty-screen__text">
        Please use sidebar to select snippet or create a new one.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less">
.empty-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: @gray;

  &__icon {
    font-size: 4rem;
  }

  &__description {
    padding: 0 12px;
    margin-top: 1rem;
  }

  &__text {
    user-select: none;
    pointer-events: none;
    margin-bottom: 0;

    &:not(:first-child) {
      margin-top: 0.2em;
    }
  }
}
</style>
