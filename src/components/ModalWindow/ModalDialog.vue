<template>
  <div
    class="modal-wrapper"
  >
    <div class="modal-window">
      <div class="modal-window__body">
        {{ text }}
      </div>
      <div class="modal-window__options">
        <div
          class="modal-window__buttons modal-button modal-button_accept"
          @click="() => {
            $emit('action');
            $emit('close');
          }"
        >
          <i :class="'bi bi-' + icon" />
        </div>
        <div
          class="modal-window__buttons modal-button modal-button_reject"
          @click="$emit('close')"
        >
          <i class="bi bi-arrow-counterclockwise" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false,
    default: 'trash'
  }
});

defineEmits([ 'action', 'close' ]);
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
  width: 350px;
  margin-bottom: 4rem;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid hsla(0,0,0,0.07);
  box-shadow: 0px 4px 4px 0 hsla(0,0,0,0.07);
  z-index: 100;
  background-color: var(--popup-bg);
  color: var(--text);
  .no-selection();

  &__options {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__icon {
    font-size: 24px;
    padding-bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--trash)
  }

  &__body {
    white-space: pre-wrap;
    font-size: 14px;
    text-align: center;
    padding: 0 .75rem;
  }
}

.modal-button {
  margin-top: 24px;
  padding: 8px 18px;
  color: var(--text-highlight);
  background-color: var(--input-bg);
  border-radius: 4px;
  .no-selection();
  background-color: var(--leftmenu-folder-accent);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    .highlight();
  }

  &+& {
    margin-left: 12px;
  }

  &_accept {
    background-color: var(--popup-accent);
    width: 80%;
  }

  &_reject {
    width: 20%;
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>