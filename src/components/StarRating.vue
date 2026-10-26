<script setup>
// 星级评分
// 支持"组件 v-model"：父组件写 <StarRating v-model="form.rating" /> 即可双向绑定
// 传 readonly 时只用于展示，不能点
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  readonly: { type: Boolean, default: false },
  size: { type: String, default: 'md' } // md / sm
})

const emit = defineEmits(['update:modelValue'])

// 点击第 n 颗星 -> 把 n 传回父组件
function pick(n) {
  if (!props.readonly) {
    emit('update:modelValue', n)
  }
}
</script>

<template>
  <div class="stars" :class="[`stars--${size}`, { 'stars--readonly': readonly }]">
    <button
      v-for="n in 5"
      :key="n"
      type="button"
      class="star"
      :class="{ 'star--on': n <= Math.round(modelValue) }"
      :disabled="readonly"
      @click="pick(n)"
    >
      ★
    </button>
  </div>
</template>

<style scoped>
.stars {
  display: inline-flex;
  gap: 1px;
  vertical-align: middle;
}

.star {
  background: none;
  border: none;
  padding: 0 1px;
  color: #e3d6c8;
  cursor: pointer;
  transition: color 0.15s ease, transform 0.15s ease;
}

.star--on {
  color: #f0a92e;
}

.stars--md .star {
  font-size: 20px;
}

.stars--sm .star {
  font-size: 13px;
}

.stars--readonly .star {
  cursor: default;
}

.stars:not(.stars--readonly) .star:hover {
  transform: scale(1.15);
}
</style>
