<script setup>
// 菜品卡片：全站复用最多的组件
// 首页推荐、菜单列表、详情页的"相关推荐"用的都是它
import { computed } from 'vue'
import BaseTag from './BaseTag.vue'
import StarRating from './StarRating.vue'
import { useFavorites } from '../composables/useFavorites'
import { useToast } from '../composables/useToast'

const props = defineProps({
  dish: { type: Object, required: true }
})

const { isFavorite, toggleFavorite } = useFavorites()
const { show } = useToast()

// computed 依赖响应式的收藏列表，收藏状态一变它就重新计算
const liked = computed(() => isFavorite(props.dish.id))

function onHeart() {
  toggleFavorite(props.dish.id)
  show(liked.value ? `已收藏「${props.dish.name}」` : '已取消收藏')
}
</script>

<template>
  <article class="card">
    <!-- 点击封面进入详情页，地址是 /dish/1 -->
    <RouterLink :to="`/dish/${dish.id}`" class="card__visual" :style="{ background: dish.gradient }">
      <span class="card__emoji">{{ dish.emoji }}</span>

      <!-- 收藏按钮：写在链接内部，所以要阻止冒泡，避免点收藏时跳转 -->
      <button
        type="button"
        class="heart"
        :class="{ 'heart--on': liked }"
        :title="liked ? '取消收藏' : '收藏'"
        @click.prevent.stop="onHeart"
      >
        ♥
      </button>

      <span class="card__price">¥{{ dish.price }}</span>
    </RouterLink>

    <div class="card__body">
      <div class="card__head">
        <h3>{{ dish.name }}</h3>
        <span class="card__rating">{{ dish.rating }}</span>
      </div>

      <StarRating :model-value="dish.rating" readonly size="sm" />

      <p class="card__canteen">{{ dish.canteen }}</p>

      <div class="card__tags">
        <BaseTag v-for="tag in dish.tags" :key="tag" :text="tag" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: #e2d3c2;
}

.card__visual {
  position: relative;
  display: grid;
  place-items: center;
  height: 168px;
  transition: height 0.22s ease;
}

.card:hover .card__visual {
  height: 176px;
}

.card__emoji {
  font-size: 64px;
  filter: drop-shadow(0 8px 12px rgba(120, 70, 30, 0.18));
  transition: transform 0.25s ease;
}

.card:hover .card__emoji {
  transform: scale(1.08) rotate(-4deg);
}

.heart {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: #d9c6b4;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.18s ease, color 0.18s ease, background 0.18s ease;
}

.heart:hover {
  transform: scale(1.12);
  color: var(--brand);
}

.heart--on {
  color: var(--brand);
  background: #fff;
}

.card__price {
  position: absolute;
  left: 10px;
  bottom: 10px;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 700;
  color: var(--brand-dark);
}

.card__body {
  padding: 14px 16px 16px;
}

.card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

h3 {
  margin: 0;
  font-size: 16px;
}

.card__rating {
  font-size: 13px;
  font-weight: 700;
  color: #f0a92e;
}

.card__canteen {
  margin: 6px 0 10px;
  font-size: 12px;
  color: var(--ink-3);
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
