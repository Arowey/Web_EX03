<script setup>
// 小标签：招牌 / 微辣 / 早餐 …… 首页、卡片、详情页都在用
defineProps({
  text: { type: String, required: true },
  // soft 浅色底 / line 描边
  tone: { type: String, default: 'soft' }
})
</script>

<template>
  <span class="tag" :class="`tag--${tone}`">{{ text }}</span>
</template>

<style scoped>
.tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 1.6;
  white-space: nowrap;
}

.tag--soft {
  background: var(--brand-soft);
  color: var(--brand-dark);
}

.tag--line {
  border: 1px solid var(--line);
  color: var(--ink-2);
}
</style>
