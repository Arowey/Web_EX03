<script setup>
// 页脚：纯展示组件，不需要任何逻辑
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div>
        <p class="footer__title">食光 · 校园美食手账</p>
        <p class="footer__desc">记录食堂里那些值得再吃一次的窗口。</p>
      </div>
      <p class="footer__copy">© {{ year }} 南华大学 · Web 全栈开发课程作业</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 80px;
  padding: 40px 0;
  border-top: 1px solid var(--line);
  background: #fff;
}

.footer__inner {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.footer__title {
  margin: 0 0 4px;
  font-weight: 700;
}

.footer__desc {
  margin: 0;
  font-size: 13px;
  color: var(--ink-3);
}

.footer__copy {
  margin: 0;
  font-size: 12px;
  color: var(--ink-3);
}

@media (max-width: 720px) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
