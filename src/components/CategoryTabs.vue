<script setup>
// 分类筛选按钮组，同样使用自定义 v-model
defineProps({
  categories: { type: Array, default: () => [] },
  modelValue: { type: String, default: '全部' }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="tabs">
    <button
      v-for="item in categories"
      :key="item"
      type="button"
      class="tab"
      :class="{ 'tab--active': item === modelValue }"
      @click="emit('update:modelValue', item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tab {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink-2);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.tab:hover {
  border-color: var(--brand);
  color: var(--brand);
}

.tab--active {
  background: var(--ink);
  border-color: var(--ink);
  color: #fff;
}
</style>
