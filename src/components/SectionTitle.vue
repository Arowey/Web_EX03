<script setup>
// 区块标题：标题 + 副标题 + 右侧插槽
// 首页和菜单页都用它，避免每个页面重复写一遍标题样式
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>

<template>
  <div class="section-title">
    <div>
      <h2>{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>

    <!-- 具名插槽：右侧可以塞"查看全部"之类的链接 -->
    <slot name="extra" />
  </div>
</template>

<style scoped>
.section-title {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

h2 {
  margin: 0;
  font-size: 22px;
  letter-spacing: 0.01em;
}

p {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--ink-3);
}
</style>
