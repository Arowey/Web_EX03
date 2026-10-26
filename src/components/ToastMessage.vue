<script setup>
// 轻提示：全站只有这一个，由 App.vue 渲染
// <transition> 负责弹出 / 消失时的动画
defineProps({
  visible: { type: Boolean, default: false },
  text: { type: String, default: '' }
})
</script>

<template>
  <transition name="toast">
    <div v-if="visible" class="toast">{{ text }}</div>
  </transition>
</template>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  padding: 11px 22px;
  border-radius: 999px;
  background: rgba(36, 28, 22, 0.92);
  color: #fff;
  font-size: 13px;
  letter-spacing: 0.02em;
  box-shadow: 0 12px 30px rgba(36, 28, 22, 0.25);
  z-index: 99;
}

/* 进入：从下方淡入并回到中间 */
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(14px);
}
</style>
