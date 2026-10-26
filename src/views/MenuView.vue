<script setup>
// ========== 页面二：菜单页 ==========
// 核心是一个 computed：把「搜索词 + 分类 + 只看收藏 + 排序」四个条件
// 叠加在一起，算出最终要显示的数组
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { categories, dishes } from '../data/dishes'
import { useFavorites } from '../composables/useFavorites'
import SearchBar from '../components/SearchBar.vue'
import CategoryTabs from '../components/CategoryTabs.vue'
import DishGrid from '../components/DishGrid.vue'
import EmptyState from '../components/EmptyState.vue'
import BaseButton from '../components/BaseButton.vue'

const route = useRoute()
const { isFavorite } = useFavorites()

// 首页点分类跳过来时会带 ?category=面食，这里读一次作为初始值
const initCategory = categories.includes(route.query.category) ? route.query.category : '全部'

const keyword = ref('')
const category = ref(initCategory)
const sort = ref('default')
const onlyFavorite = ref(false)

// 排序选项，模板里用 v-for 渲染
const sortOptions = [
  { value: 'default', label: '默认排序' },
  { value: 'rating', label: '评分优先' },
  { value: 'priceAsc', label: '价格从低到高' },
  { value: 'priceDesc', label: '价格从高到低' }
]

// 筛选 + 排序，一步算完
const filteredDishes = computed(() => {
  const word = keyword.value.trim()

  // 第一步：筛选
  let list = dishes.filter((dish) => {
    const matchCategory = category.value === '全部' || dish.category === category.value
    const matchKeyword =
      word === '' ||
      dish.name.includes(word) ||
      dish.desc.includes(word) ||
      dish.canteen.includes(word) ||
      dish.tags.some((tag) => tag.includes(word))
    const matchFavorite = !onlyFavorite.value || isFavorite(dish.id)

    return matchCategory && matchKeyword && matchFavorite
  })

  // 第二步：排序（先复制一份，不直接改原数组）
  if (sort.value === 'rating') {
    list = [...list].sort((a, b) => b.rating - a.rating)
  } else if (sort.value === 'priceAsc') {
    list = [...list].sort((a, b) => a.price - b.price)
  } else if (sort.value === 'priceDesc') {
    list = [...list].sort((a, b) => b.price - a.price)
  }

  return list
})

// 有没有设置过筛选条件（用来决定"重置"按钮显不显示）
const hasFilter = computed(
  () => keyword.value !== '' || category.value !== '全部' || onlyFavorite.value
)

function resetFilter() {
  keyword.value = ''
  category.value = '全部'
  sort.value = 'default'
  onlyFavorite.value = false
}
</script>

<template>
  <div class="menu container">
    <!-- 页面标题 -->
    <header class="menu__head">
      <h1>美食菜单</h1>
      <p>共 {{ dishes.length }} 道菜，按分类、关键词、收藏状态随便筛。</p>
    </header>

    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar__row">
        <SearchBar v-model="keyword" placeholder="搜菜名、食堂或标签，比如「牛肉」" />

        <select v-model="sort" class="sort">
          <option v-for="item in sortOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>

        <label class="switch">
          <input v-model="onlyFavorite" type="checkbox" />
          <span>只看收藏</span>
        </label>
      </div>

      <CategoryTabs v-model="category" :categories="categories" />
    </div>

    <!-- 结果统计 -->
    <div class="result">
      <span>
        找到 <strong>{{ filteredDishes.length }}</strong> 道菜
        <em v-if="category !== '全部'">· 分类「{{ category }}」</em>
      </span>
      <button v-if="hasFilter" class="reset" type="button" @click="resetFilter">
        清空筛选
      </button>
    </div>

    <!-- 列表：有数据就显示网格，没数据就显示空状态 -->
    <DishGrid v-if="filteredDishes.length" :dishes="filteredDishes" />

    <EmptyState
      v-else
      emoji="🔍"
      title="没有找到符合条件的菜"
      desc="换个关键词，或者清空筛选条件再看看"
    >
      <BaseButton variant="ghost" size="sm" @click="resetFilter">清空筛选</BaseButton>
    </EmptyState>
  </div>
</template>

<style scoped>
.menu {
  padding-top: 48px;
}

.menu__head h1 {
  margin: 0;
  font-size: 32px;
}

.menu__head p {
  margin: 8px 0 0;
  color: var(--ink-2);
  font-size: 14px;
}

/* ---------- 工具栏 ---------- */
.toolbar {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 28px 0 18px;
  padding: 18px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.toolbar__row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.sort {
  height: 44px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: #fff;
  font-size: 13px;
  color: var(--ink-2);
  cursor: pointer;
  outline: none;
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 44px;
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 13px;
  color: var(--ink-2);
  cursor: pointer;
  user-select: none;
}

.switch input {
  accent-color: var(--brand);
  cursor: pointer;
}

/* ---------- 结果统计 ---------- */
.result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  font-size: 13px;
  color: var(--ink-3);
}

.result strong {
  color: var(--ink);
  font-size: 15px;
}

.result em {
  font-style: normal;
}

.reset {
  border: none;
  background: none;
  color: var(--brand);
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
