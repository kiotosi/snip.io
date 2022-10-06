<template>
  <div
    @click="$emit('create')"
    class="leftmenu-placeholder"
    :class="{ 'leftmenu-placeholder_clickable': clickable }"
  >
    <div class="leftmenu-placeholder__icon">
      <i :class="'bi bi-' + iconName"></i>
    </div>
    <div class="leftmenu-placeholder__description">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface LeftmenuPlaceholderProps {
  iconName: string;
  text: string;
  clickable?: boolean;
}
defineProps<LeftmenuPlaceholderProps>();
defineEmits(['create']);
</script>

<style scoped lang="less">
.leftmenu-placeholder {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &_clickable {
    cursor: pointer;

    &:hover {
      .highlight();
    }
  }

  &__icon {
    color: @gray;
    font-size: 3em;
  }

  &__description {
    .no-selection();
    margin-top: 16px;
    text-align: center;
    max-width: 170px;
    line-height: 1.4em;
    font-size: 12px;
    color: @gray;
  }
}
</style>
