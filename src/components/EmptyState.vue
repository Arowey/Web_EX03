<script setup>
// 空状态：搜不到东西、还没收藏时显示
// 演示"默认插槽"：父组件可以在里面塞一个按钮
defineProps({
  emoji: { type: String, default: '🍽️' },
  title: { type: String, default: '这里什么都没有' },
  desc: { type: String, default: '' }
})
</script>

<template>
  <div class="empty">
    <div class="empty__emoji">{{ emoji }}</div>
    <p class="empty__title">{{ title }}</p>
    <p v-if="desc" class="empty__desc">{{ desc }}</p>

    <!-- 默认插槽：不传就什么都不显示 -->
    <div class="empty__action">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.empty {
  padding: 60px 20px;
  text-align: center;
  background: #fff;
  border: 1px dashed var(--line);
  border-radius: var(--radius);
}

.empty__emoji {
  font-size: 40px;
  opacity: 0.55;
}

.empty__title {
  margin: 12px 0 0;
  font-weight: 600;
}

.empty__desc {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--ink-3);
}

.empty__action {
  margin-top: 16px;
}
</style>
