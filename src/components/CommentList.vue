<script setup>
// 评论列表：详情页使用
// 用 v-if / v-else 处理"有评论"和"没评论"两种情况
import StarRating from './StarRating.vue'

defineProps({
  comments: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="comments">
    <p v-if="comments.length === 0" class="comments__empty">
      还没有人留言，来做第一个吧。
    </p>

    <article v-for="item in comments" :key="item.id" class="comment">
      <div class="comment__avatar">{{ item.name.slice(0, 1) }}</div>

      <div class="comment__main">
        <div class="comment__head">
          <span class="comment__name">{{ item.name }}</span>
          <StarRating :model-value="item.rating" readonly size="sm" />
          <span class="comment__time">{{ item.time }}</span>
        </div>
        <p class="comment__text">{{ item.content }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.comments {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.comments__empty {
  margin: 0;
  padding: 24px;
  text-align: center;
  color: var(--ink-3);
  font-size: 13px;
  background: #fff;
  border: 1px dashed var(--line);
  border-radius: var(--radius);
}

.comment {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 14px;
}

.comment__avatar {
  flex: none;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--brand-soft);
  color: var(--brand-dark);
  font-weight: 700;
  font-size: 14px;
}

.comment__main {
  flex: 1;
  min-width: 0;
}

.comment__head {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.comment__name {
  font-weight: 600;
  font-size: 14px;
}

.comment__time {
  margin-left: auto;
  font-size: 12px;
  color: var(--ink-3);
}

.comment__text {
  margin: 6px 0 0;
  font-size: 14px;
  color: var(--ink-2);
}
</style>
