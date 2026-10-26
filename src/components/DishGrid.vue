<script setup>
// 卡片网格：只负责"排版"，把数据循环交给 DishCard 渲染
// 这样每个页面只需要写一行 <DishGrid :dishes="list" />，不用重复写 v-for
import DishCard from './DishCard.vue'

defineProps({
  dishes: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="grid">
    <!-- :key 用唯一 id，帮助 Vue 高效复用 DOM -->
    <DishCard v-for="dish in dishes" :key="dish.id" :dish="dish" />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}
</style>
