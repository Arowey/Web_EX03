<script setup>
// ========== 页面一：首页 ==========
// 结构：欢迎区 → 数据统计 → 分类入口 → 本周推荐 → 我的收藏
import { computed, onMounted, ref } from 'vue'
import { categories, dishes } from '../data/dishes'
import { useFavorites } from '../composables/useFavorites'
import BaseButton from '../components/BaseButton.vue'
import SectionTitle from '../components/SectionTitle.vue'
import StatBar from '../components/StatBar.vue'
import DishGrid from '../components/DishGrid.vue'
import EmptyState from '../components/EmptyState.vue'
import StarRating from '../components/StarRating.vue'

const { favoriteIds, total } = useFavorites()

// 1. 问候语：在 onMounted（组件挂载完成后）根据当前时间计算
const greeting = ref('你好')
onMounted(() => {
  const hour = new Date().getHours()
  if (hour < 11) greeting.value = '早上好'
  else if (hour < 14) greeting.value = '中午好'
  else if (hour < 18) greeting.value = '下午好'
  else greeting.value = '晚上好'
})

// 2. 今日主推：每天换一道（用日期做下标，不用改代码）
const todayPick = computed(() => dishes[new Date().getDate() % dishes.length])

// 3. 数据统计：全部由现有数据算出来，不写死
const stats = computed(() => {
  const canteens = new Set(dishes.map((d) => d.canteen.split(' · ')[0]))
  const avg = dishes.reduce((sum, d) => sum + d.rating, 0) / dishes.length
  return [
    { label: '收录菜品', value: dishes.length, unit: '道' },
    { label: '覆盖食堂', value: canteens.size, unit: '个' },
    { label: '平均评分', value: avg.toFixed(1), unit: '分' },
    { label: '我的收藏', value: total.value, unit: '道' }
  ]
})

// 4. 本周推荐：按评分从高到低取前 4 道
const recommended = computed(() =>
  [...dishes].sort((a, b) => b.rating - a.rating).slice(0, 4)
)

// 5. 我的收藏：从共享的收藏 id 里筛出完整菜品对象
const favoriteDishes = computed(() =>
  dishes.filter((dish) => favoriteIds.includes(dish.id))
)

// 分类按钮上的小图标（纯展示，所以写在页面里）
const categoryEmoji = {
  面食: '🍜',
  米饭: '🍚',
  小吃: '🍢',
  甜品: '🍮',
  饮品: '🍋'
}
const mainCategories = categories.filter((item) => item !== '全部')
</script>

<template>
  <div class="home">
    <!-- ---------- 欢迎区 ---------- -->
    <section class="hero container">
      <div class="hero__text">
        <p class="hero__greeting">{{ greeting }}，今天想吃点什么？</p>
        <h1>
          把食堂里<span class="text-brand">值得再吃一次</span>的窗口<br class="hero__br" />都记在这里
        </h1>
        <p class="hero__desc">
          12 道校园美食，来自 6 个食堂窗口。可以按分类筛、按评分排，
          也可以把喜欢的收藏起来，下次直接翻出来。
        </p>

        <div class="hero__actions">
          <BaseButton to="/menu">浏览全部菜单</BaseButton>
          <BaseButton :to="`/dish/${todayPick.id}`" variant="ghost">看看今日主推</BaseButton>
        </div>
      </div>

      <!-- 今日主推卡片 -->
      <RouterLink :to="`/dish/${todayPick.id}`" class="pick">
        <span class="pick__label">今日主推</span>
        <span class="pick__emoji">{{ todayPick.emoji }}</span>
        <span class="pick__name">{{ todayPick.name }}</span>
        <span class="pick__meta">
          <StarRating :model-value="todayPick.rating" readonly size="sm" />
          <span>¥{{ todayPick.price }}</span>
        </span>
        <span class="pick__canteen">{{ todayPick.canteen }}</span>
      </RouterLink>
    </section>

    <!-- ---------- 数据统计 ---------- -->
    <section class="container section">
      <StatBar :items="stats" />
    </section>

    <!-- ---------- 分类入口 ---------- -->
    <section class="container section">
      <SectionTitle title="按分类逛" subtitle="点一下，直接跳到对应分类的菜单" />

      <div class="cats">
        <!-- :to 传对象可以带 query，菜单页会读取 ?category=面食 -->
        <RouterLink
          v-for="item in mainCategories"
          :key="item"
          :to="{ path: '/menu', query: { category: item } }"
          class="cat"
        >
          <span class="cat__emoji">{{ categoryEmoji[item] }}</span>
          <span class="cat__name">{{ item }}</span>
        </RouterLink>
      </div>
    </section>

    <!-- ---------- 本周推荐 ---------- -->
    <section class="container section">
      <SectionTitle title="本周推荐" subtitle="按评分排的前四名">
        <template #extra>
          <RouterLink to="/menu" class="more">查看全部 →</RouterLink>
        </template>
      </SectionTitle>

      <DishGrid :dishes="recommended" />
    </section>

    <!-- ---------- 我的收藏（v-if / v-else 演示） ---------- -->
    <section class="container section">
      <SectionTitle title="我的收藏" :subtitle="`已经收藏了 ${total} 道菜，关掉浏览器也不会丢`" />

      <DishGrid v-if="favoriteDishes.length" :dishes="favoriteDishes" />

      <EmptyState
        v-else
        emoji="♡"
        title="还没有收藏任何菜品"
        desc="在卡片右上角点一下爱心，就会出现在这里"
      >
        <BaseButton to="/menu" variant="ghost" size="sm">去挑几道</BaseButton>
      </EmptyState>
    </section>

    <!-- ---------- 底部标语 ---------- -->
    <section class="container section">
      <div class="cta">
        <div>
          <h2>今天的饭，值得认真挑一下</h2>
          <p>菜单页支持搜索、分类筛选、排序，还有「只看收藏」。</p>
        </div>
        <BaseButton to="/menu">去菜单页</BaseButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- 欢迎区 ---------- */
.hero {
  position: relative;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 48px;
  padding-top: 60px;
  padding-bottom: 20px;
}

.hero__greeting {
  display: inline-block;
  margin: 0 0 14px;
  padding: 5px 14px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--line);
  font-size: 13px;
  color: var(--ink-2);
}

.hero h1 {
  margin: 0;
  font-size: 40px;
  line-height: 1.32;
  letter-spacing: -0.01em;
}

.hero__desc {
  margin: 18px 0 28px;
  max-width: 460px;
  color: var(--ink-2);
  font-size: 15px;
}

.hero__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* 今日主推卡片 */
.pick {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 32px 24px 26px;
  border-radius: 28px;
  background: linear-gradient(150deg, #fff3e2, #ffd9bb);
  box-shadow: var(--shadow);
  transition: transform 0.25s ease;
}

.pick:hover {
  transform: translateY(-6px) rotate(-1deg);
}

.pick__label {
  position: absolute;
  top: 16px;
  left: 18px;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--brand-dark);
}

.pick__emoji {
  font-size: 84px;
  line-height: 1.2;
  filter: drop-shadow(0 12px 16px rgba(140, 80, 30, 0.2));
}

.pick__name {
  font-size: 19px;
  font-weight: 700;
}

.pick__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--brand-dark);
  font-weight: 600;
}

.pick__canteen {
  font-size: 12px;
  color: #9c7a5c;
}

/* ---------- 通用区块间距 ---------- */
.section {
  margin-top: 64px;
}

/* ---------- 分类入口 ---------- */
.cats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.cat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 22px 10px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.cat:hover {
  transform: translateY(-4px);
  border-color: #e6d4c1;
  box-shadow: var(--shadow-sm);
}

.cat__emoji {
  font-size: 26px;
}

.cat__name {
  font-size: 13px;
  color: var(--ink-2);
}

/* ---------- 查看全部 ---------- */
.more {
  font-size: 13px;
  color: var(--brand);
}

/* ---------- 底部标语 ---------- */
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 34px 38px;
  border-radius: 24px;
  background: linear-gradient(120deg, #2f241d, #4a372b);
  color: #fff;
}

.cta h2 {
  margin: 0;
  font-size: 21px;
}

.cta p {
  margin: 6px 0 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}

/* ---------- 响应式 ---------- */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 32px;
    padding-top: 40px;
  }

  .hero h1 {
    font-size: 30px;
  }

  /* 手机上让标题自然换行，不要强制断行 */
  .hero__br {
    display: none;
  }

  .cats {
    grid-template-columns: repeat(3, 1fr);
  }

  .cta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
