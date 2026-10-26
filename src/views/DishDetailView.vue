<script setup>
// ========== 页面三：详情页 ==========
// 路由是 /dish/:id，所以要先从地址里取出 id，再去数据里找出对应那道菜
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { dishes } from '../data/dishes'
import { useFavorites } from '../composables/useFavorites'
import { useToast } from '../composables/useToast'
import BaseButton from '../components/BaseButton.vue'
import BaseTag from '../components/BaseTag.vue'
import StarRating from '../components/StarRating.vue'
import SectionTitle from '../components/SectionTitle.vue'
import CommentList from '../components/CommentList.vue'
import CommentForm from '../components/CommentForm.vue'
import DishGrid from '../components/DishGrid.vue'
import EmptyState from '../components/EmptyState.vue'

const route = useRoute()
const { isFavorite, toggleFavorite } = useFavorites()
const { show } = useToast()

// 1. 当前菜品：地址里的 id 是字符串，要转成数字再比较
const dish = computed(() => dishes.find((item) => item.id === Number(route.params.id)))

const liked = computed(() => (dish.value ? isFavorite(dish.value.id) : false))

// 2. 评论：先放一份数据里的初始评论
const comments = ref([])

function loadComments() {
  comments.value = dish.value ? dish.value.comments.map((item) => ({ ...item })) : []
}

// onMounted：页面第一次打开时加载
onMounted(loadComments)

// watch：如果在"相关推荐"里点到另一道菜，地址的 id 会变，
// 但组件会被复用不会重新创建，所以要手动监听 id 变化再重新加载
watch(() => route.params.id, loadComments)

// 3. 相关推荐：同分类的其他菜品，最多 3 个
const related = computed(() => {
  if (!dish.value) return []
  return dishes
    .filter((item) => item.category === dish.value.category && item.id !== dish.value.id)
    .slice(0, 3)
})

function onFavorite() {
  toggleFavorite(dish.value.id)
  show(liked.value ? `已收藏「${dish.value.name}」` : '已取消收藏')
}

// 4. 子组件 CommentForm 触发 submit 事件时执行
function addComment(payload) {
  comments.value.unshift({
    id: Date.now(),
    time: '刚刚',
    ...payload
  })
  show('评论已发表，谢谢分享')
}
</script>

<template>
  <div class="detail container">
    <template v-if="dish">
      <!-- 返回 -->
      <RouterLink to="/menu" class="back">← 返回菜单</RouterLink>

      <!-- 上半部分：封面 + 信息 -->
      <section class="hero">
        <div class="hero__visual" :style="{ background: dish.gradient }">
          <span class="hero__emoji">{{ dish.emoji }}</span>
          <span class="hero__price">¥{{ dish.price }}</span>
        </div>

        <div class="hero__info">
          <div class="hero__tags">
            <BaseTag :text="dish.category" tone="line" />
            <BaseTag v-for="tag in dish.tags" :key="tag" :text="tag" />
          </div>

          <h1>{{ dish.name }}</h1>

          <div class="hero__rating">
            <StarRating :model-value="dish.rating" readonly />
            <strong>{{ dish.rating }}</strong>
            <span class="muted">· {{ comments.length }} 条评论</span>
          </div>

          <p class="hero__canteen">📍 {{ dish.canteen }}</p>
          <p class="hero__desc">{{ dish.desc }}</p>

          <blockquote class="hero__story">{{ dish.story }}</blockquote>

          <div class="hero__actions">
            <BaseButton @click="onFavorite">
              {{ liked ? '♥ 已收藏' : '♡ 收藏这道菜' }}
            </BaseButton>
            <BaseButton to="/menu" variant="ghost">继续逛逛</BaseButton>
          </div>
        </div>
      </section>

      <!-- 评论区 -->
      <section class="section">
        <SectionTitle title="吃后感" :subtitle="`共 ${comments.length} 条，欢迎补充你的版本`" />

        <div class="comment-layout">
          <CommentList :comments="comments" />
          <div class="comment-layout__form">
            <CommentForm @submit="addComment" />
          </div>
        </div>
      </section>

      <!-- 相关推荐 -->
      <section v-if="related.length" class="section">
        <SectionTitle title="同类推荐" subtitle="和这道菜同一个分类" />
        <DishGrid :dishes="related" />
      </section>
    </template>

    <!-- 地址里的 id 找不到对应菜品时 -->
    <EmptyState
      v-else
      emoji="🥢"
      title="这道菜好像下架了"
      desc="地址里的编号找不到对应的菜品，回菜单页看看吧"
    >
      <BaseButton to="/menu" size="sm">回到菜单</BaseButton>
    </EmptyState>
  </div>
</template>

<style scoped>
.detail {
  padding-top: 32px;
}

.back {
  display: inline-block;
  margin-bottom: 20px;
  font-size: 13px;
  color: var(--ink-2);
  transition: color 0.18s ease;
}

.back:hover {
  color: var(--brand);
}

/* ---------- 上半部分 ---------- */
.hero {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 40px;
  align-items: stretch;
}

.hero__visual {
  position: relative;
  display: grid;
  place-items: center;
  height: 100%;
  min-height: 340px;
  border-radius: 28px;
  box-shadow: var(--shadow);
}

.hero__emoji {
  font-size: 150px;
  filter: drop-shadow(0 16px 24px rgba(120, 70, 30, 0.22));
}

.hero__price {
  position: absolute;
  left: 20px;
  bottom: 20px;
  padding: 5px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  font-weight: 700;
  color: var(--brand-dark);
}

.hero__tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.hero__info h1 {
  margin: 14px 0 10px;
  font-size: 34px;
  letter-spacing: -0.01em;
}

.hero__rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.hero__rating strong {
  color: #f0a92e;
  font-size: 15px;
}

.hero__canteen {
  margin: 16px 0 0;
  font-size: 13px;
  color: var(--ink-2);
}

.hero__desc {
  margin: 12px 0 0;
  font-size: 15px;
  color: var(--ink-2);
}

.hero__story {
  margin: 18px 0 24px;
  padding: 12px 16px;
  border-left: 3px solid var(--brand);
  background: #fff;
  border-radius: 0 10px 10px 0;
  font-size: 13px;
  color: var(--ink-2);
}

.hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* ---------- 区块 ---------- */
.section {
  margin-top: 64px;
}

.comment-layout {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
  align-items: start;
}

.comment-layout__form {
  position: sticky;
  top: 90px;
}

/* ---------- 响应式 ---------- */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .hero__visual {
    height: 240px;
    min-height: 240px;
  }

  .hero__emoji {
    font-size: 90px;
  }

  .hero__info h1 {
    font-size: 26px;
  }

  .comment-layout {
    grid-template-columns: 1fr;
  }
}
</style>
