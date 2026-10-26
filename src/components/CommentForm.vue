<script setup>
// 发表评论表单：详情页使用
// 这里集中演示了三件事：v-model 表单绑定、computed 校验、ref 获取 DOM 元素
import { computed, reactive, ref } from 'vue'
import StarRating from './StarRating.vue'
import BaseButton from './BaseButton.vue'

const emit = defineEmits(['submit'])

// reactive 对象适合放"一组相关字段"
const form = reactive({
  name: '',
  rating: 5,
  content: ''
})

// 模板引用：拿到页面里那个真实的 textarea 元素
const textareaRef = ref(null)

// 计算属性：内容满 5 个字才允许提交
const canSubmit = computed(() => form.content.trim().length >= 5)

function onSubmit() {
  if (!canSubmit.value) return

  // 把数据交给父组件，由父组件决定怎么存
  emit('submit', {
    name: form.name.trim() || '匿名同学',
    rating: form.rating,
    content: form.content.trim()
  })

  // 提交后清空输入框，并把光标移回输入区
  form.content = ''
  form.rating = 5
  textareaRef.value?.focus()
}
</script>

<template>
  <!-- .prevent 阻止表单默认的整页刷新行为 -->
  <form class="form" @submit.prevent="onSubmit">
    <div class="form__row">
      <label class="field">
        <span>昵称</span>
        <input v-model="form.name" type="text" placeholder="不填就是匿名同学" maxlength="12" />
      </label>

      <div class="field">
        <span>打分</span>
        <!-- 组件上的 v-model，等价于 :model-value + @update:model-value -->
        <StarRating v-model="form.rating" />
      </div>
    </div>

    <label class="field">
      <span>吃后感</span>
      <textarea
        ref="textareaRef"
        v-model="form.content"
        rows="4"
        maxlength="200"
        placeholder="说说味道、分量、价格，至少 5 个字…"
      ></textarea>
    </label>

    <div class="form__footer">
      <span class="form__hint">
        {{ form.content.length }} / 200
        <em v-if="!canSubmit">· 还差 {{ 5 - form.content.trim().length }} 个字</em>
      </span>
      <BaseButton type="submit" :disabled="!canSubmit">发表评论</BaseButton>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.form__row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 160px;
  font-size: 13px;
  color: var(--ink-2);
}

input,
textarea {
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fdfbf8;
  font-size: 14px;
  outline: none;
  resize: vertical;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

input:focus,
textarea:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(217, 96, 59, 0.1);
}

.form__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.form__hint {
  font-size: 12px;
  color: var(--ink-3);
}

.form__hint em {
  font-style: normal;
  color: var(--brand);
}
</style>
