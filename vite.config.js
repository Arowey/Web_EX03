import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' 让打包后的资源使用相对路径，
// 这样 dist 目录放到 GitHub Pages 的任意子路径下都能正常加载。
export default defineConfig({
  base: './',
  plugins: [vue()],
  // 打包结果直接输出到 docs/，GitHub Pages 里选这个目录就行
  build: {
    outDir: 'docs'
  },
  server: {
    port: 5173,
    open: true
  }
})
