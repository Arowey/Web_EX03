<script setup>
// 搜索框：自定义 v-model
// 父组件写 <SearchBar v-model="keyword" />，
// 输入框的值会同步给父组件的 keyword
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '搜索…' }
})

const emit = defineEmits(['update:modelValue'])

// 输入时把最新内容发回父组件
function onInput(event) {
  emit('update:modelValue', event.target.value)
}

function clear() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="search">
    <span class="search__icon">🔍</span>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
    />
    <!-- v-show：元素始终存在，只是切换显示 -->
    <button v-show="modelValue" class="search__clear" type="button" @click="clear">
      ✕
    </button>
  </div>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 220px;
  padding: 0 14px;
  height: 44px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.search:focus-within {
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(217, 96, 59, 0.1);
}

.search__icon {
  font-size: 14px;
  opacity: 0.6;
}

input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
}

.search__clear {
  border: none;
  background: #f2e8dc;
  color: var(--ink-2);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 10px;
  cursor: pointer;
  line-height: 1;
}
</style>
