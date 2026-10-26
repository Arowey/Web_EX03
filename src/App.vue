<script setup>
// App.vue 是"根组件"，它负责三件事：
// 1. 显示所有页面共用的导航栏和页脚
// 2. 用 <router-view> 决定当前该显示哪个页面
// 3. 显示全站唯一的轻提示
import { useToast } from './composables/useToast'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import ToastMessage from './components/ToastMessage.vue'

const { toast } = useToast()
</script>

<template>
  <AppNavbar />

  <main class="main">
    <!-- router-view 的插槽写法：可以拿到当前要渲染的页面组件，
         再用 <transition> 给页面切换加上淡入淡出动画 -->
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <AppFooter />

  <!-- 轻提示：状态来自 useToast()，任何组件都能触发 -->
  <ToastMessage :visible="toast.visible" :text="toast.text" />
</template>
