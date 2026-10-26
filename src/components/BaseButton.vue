<script setup>
// 通用按钮组件
// 特点：通过 props 控制样式，通过插槽接收文字，通过 to 决定渲染成按钮还是链接
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  // primary 主按钮 / ghost 次要按钮 / danger 危险操作
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' }, // md / sm
  // 传了 to 就渲染成路由链接，否则渲染成 <button>
  to: { type: String, default: '' },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false }
})

defineEmits(['click'])

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  { 'btn--block': props.block }
])
</script>

<template>
  <!-- 有 to：跳转链接 -->
  <RouterLink v-if="to" :to="to" :class="classes">
    <slot />
  </RouterLink>

  <!-- 没有 to：普通按钮 -->
  <button
    v-else
    :type="type"
    :class="classes"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
  white-space: nowrap;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn--md {
  padding: 11px 24px;
  font-size: 14px;
}

.btn--sm {
  padding: 7px 16px;
  font-size: 13px;
}

.btn--block {
  width: 100%;
}

.btn--primary {
  background: var(--brand);
  color: #fff;
  box-shadow: 0 8px 18px rgba(217, 96, 59, 0.25);
}

.btn--primary:hover {
  background: var(--brand-dark);
}

.btn--ghost {
  background: transparent;
  color: var(--ink-2);
  border-color: var(--line);
}

.btn--ghost:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.btn--danger {
  background: #fff;
  color: #c0392b;
  border-color: #f0c4bd;
}
</style>
