// ============================================================
// 收藏功能的"共享状态"（组合式函数 / composable）
// 写在模块最外层 = 整个应用只有一份数据，
// 任何组件调用 useFavorites() 拿到的都是同一份收藏列表。
// ============================================================
import { computed, reactive, watch } from 'vue'

const STORAGE_KEY = 'shiguang-favorites'

// 从浏览器本地存储里读出上次的收藏，第一次访问时是空数组
function loadFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

// 模块级的响应式数组：全站共享
const favoriteIds = reactive(loadFromStorage())

// 侦听器 watch：收藏列表一变，就自动写回 localStorage
watch(
  favoriteIds,
  (ids) => localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)),
  { deep: true }
)

export function useFavorites() {
  // 判断某个菜是否已被收藏
  const isFavorite = (id) => favoriteIds.includes(id)

  // 收藏 / 取消收藏
  function toggleFavorite(id) {
    const index = favoriteIds.indexOf(id)
    if (index > -1) {
      favoriteIds.splice(index, 1)
    } else {
      favoriteIds.push(id)
    }
  }

  // 计算属性：收藏总数，导航栏的角标直接用它
  const total = computed(() => favoriteIds.length)

  return { favoriteIds, isFavorite, toggleFavorite, total }
}
