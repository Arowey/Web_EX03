<script setup>
// 顶部导航：所有页面共用
// 注意收藏角标：它读的是 useFavorites() 里的共享状态，
// 所以任何页面点了收藏，这里的数字会立刻跟着变
import { useFavorites } from '../composables/useFavorites'

const { total } = useFavorites()
</script>

<template>
  <header class="nav">
    <div class="container nav__inner">
      <RouterLink to="/" class="brand">
        <span class="brand__mark">食</span>
        <span class="brand__text">
          食光
          <small>校园美食手账</small>
        </span>
      </RouterLink>

      <nav class="links">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/menu">美食菜单</RouterLink>
        <span class="fav" title="我的收藏">
          <span class="fav__heart">♥</span>
          {{ total }}
        </span>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(251, 246, 239, 0.86);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand__mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--brand);
  color: #fff;
  font-weight: 700;
  font-size: 17px;
}

.brand__text {
  display: flex;
  flex-direction: column;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
}

.brand__text small {
  font-size: 11px;
  font-weight: 400;
  color: var(--ink-3);
  letter-spacing: 0.08em;
}

.links {
  display: flex;
  align-items: center;
  gap: 26px;
  font-size: 14px;
  color: var(--ink-2);
}

.links a {
  padding: 6px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.18s ease, border-color 0.18s ease;
}

.links a:hover {
  color: var(--brand);
}

/* router-link 自动给当前页加上的类名 */
.links a.router-link-active {
  color: var(--brand);
  border-bottom-color: var(--brand);
}

.fav {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--line);
  font-size: 13px;
  color: var(--ink-2);
}

.fav__heart {
  color: var(--brand);
}

@media (max-width: 720px) {
  .nav__inner {
    height: 60px;
  }

  .brand__text small {
    display: none;
  }

  .links {
    gap: 16px;
    font-size: 13px;
  }
}
</style>
