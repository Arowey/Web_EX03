<script setup>
// 数据统计条：首页用来显示"收录菜品 / 食堂窗口 / 平均分 / 我的收藏"
// 数据由父组件算好传进来，本组件只负责显示
defineProps({
  items: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="stats">
    <div v-for="item in items" :key="item.label" class="stat">
      <p class="stat__value">
        {{ item.value }}<small>{{ item.unit }}</small>
      </p>
      <p class="stat__label">{{ item.label }}</p>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}

.stat {
  background: #fff;
  padding: 22px 20px;
  text-align: center;
}

.stat__value {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.stat__value small {
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-3);
  margin-left: 3px;
}

.stat__label {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--ink-3);
  letter-spacing: 0.06em;
}

@media (max-width: 720px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
