// 路由表：一个 path 对应一个页面组件
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import DishDetailView from '../views/DishDetailView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/menu', name: 'menu', component: MenuView },
  // :id 是动态路由参数，/dish/3 里的 3 会被存进 route.params.id
  { path: '/dish/:id', name: 'dish', component: DishDetailView },
  // 输错地址时统一回到首页
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  // hash 模式地址形如 /#/menu，部署到 GitHub Pages 刷新不会 404，最省事
  history: createWebHashHistory(),
  routes,
  // 切换页面时自动回到顶部
  scrollBehavior: () => ({ top: 0 })
})

export default router
