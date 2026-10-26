# 食光 · 校园美食手账

> 南华大学《Web 全栈开发》实验三 —— Vue 练习
> Vue 3 + Vue Router 4 + Vite 6，纯前端单页应用

一个记录学校食堂好吃窗口的小网站：3 个页面、19 个 Vue 单文件组件、12 条菜品数据。
支持关键词搜索、分类筛选、排序、收藏（写进浏览器本地存储）、评分和发表评论。

---

## 一、本地运行

需要先装好 Node.js（建议 18 以上）。

```bash
npm install      # 安装依赖，只需要第一次执行
npm run dev      # 启动开发服务器，浏览器打开 http://localhost:5173
```

打包成静态文件：

```bash
npm run build    # 结果输出到 docs/ 目录
npm run preview  # 本地预览打包后的效果
```

---

## 二、部署到 GitHub Pages（手把手版）

### 第 1 步：把项目推到 GitHub

先在 GitHub 网页上新建一个空仓库，**不要**勾选 Add README / .gitignore。
然后在本项目目录里执行（把地址换成你自己的仓库地址）：

```bash
git init
git add .
git commit -m "实验三：Vue 校园美食网站"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

> 如果 push 报 SSL 证书错误，可以临时用：
> `git -c http.sslVerify=false push -u origin main`

### 第 2 步：打包

```bash
npm run build
```

执行完会多出一个 `docs/` 目录，里面是 `index.html` 和 `assets/`。
**这个目录也要提交到仓库**，GitHub Pages 直接把它当网站根目录。

```bash
git add docs
git commit -m "构建产物"
git push
```

### 第 3 步：打开 Pages

1. 进入仓库 → **Settings** → 左侧 **Pages**
2. Source 选 **Deploy from a branch**
3. Branch 选 **main**，文件夹选 **/docs**，点 **Save**
4. 等 1～2 分钟，刷新页面，顶部会出现网址：
   `https://你的用户名.github.io/仓库名/`

打开就是你的网站。地址栏里带 `#/menu` 这种 `#` 是正常的，因为项目用的是 hash 路由（原因见下）。

### 为什么用 hash 路由？

如果换成 history 模式，地址是 `/menu`，在 GitHub Pages 上直接刷新这个地址会 404
（服务器上并不存在 menu 这个文件）。hash 路由把路径放在 `#` 后面，浏览器不会真的去请求它，
刷新永远不会 404，对课程作业来说最省事。

`vite.config.js` 里的 `base: './'` 也是同一个目的：让资源用相对路径，
这样网站放在 `用户名.github.io/仓库名/` 这种子目录下也能正常加载。

---

## 三、目录结构

```
实验三_02/
├── index.html              # 页面入口，只有一个 #app 容器
├── vite.config.js          # 构建配置（base、输出目录 docs）
├── package.json
├── docs/                   # npm run build 生成的静态站点（提交到仓库）
└── src/
    ├── main.js             # 创建应用 → 装路由 → 挂载
    ├── App.vue             # 根组件：导航 + router-view + 页脚 + 轻提示
    ├── router/index.js     # 3 条路由
    ├── data/dishes.js      # 12 条菜品数据（相当于数据库）
    ├── composables/
    │   ├── useFavorites.js # 收藏状态（全站共享 + 存 localStorage）
    │   └── useToast.js     # 轻提示状态（全站共享）
    ├── views/              # 3 个页面
    │   ├── HomeView.vue
    │   ├── MenuView.vue
    │   └── DishDetailView.vue
    ├── components/         # 15 个可复用组件
    │   ├── AppNavbar.vue  AppFooter.vue
    │   ├── BaseButton.vue  BaseTag.vue  StarRating.vue
    │   ├── DishCard.vue  DishGrid.vue
    │   ├── SearchBar.vue  CategoryTabs.vue  EmptyState.vue
    │   ├── SectionTitle.vue  StatBar.vue
    │   └── CommentList.vue  CommentForm.vue  ToastMessage.vue
    └── assets/styles/main.css  # 全局变量、重置样式、页面切换动画
```

组件数量：`App.vue` 1 个 + `views` 3 个 + `components` 15 个 = **19 个单文件组件**。

---

## 四、技术点对照（Vue 官方教程）

| 知识点 | 在哪里看 |
| --- | --- |
| 声明式渲染 / 插值 | `DishCard.vue` 的 `{{ dish.name }}` |
| 属性绑定 `v-bind` | `:style="{ background: dish.gradient }"`、`:class` |
| 事件绑定 `v-on` | `@click`、`@submit.prevent`、`@click.prevent.stop` |
| 表单绑定 `v-model` | `MenuView.vue` 的下拉框、复选框 |
| 条件渲染 `v-if / v-show` | `DishDetailView.vue` 的 `v-if="dish"`；`SearchBar.vue` 的清除按钮 |
| 列表渲染 `v-for` + `:key` | `DishGrid.vue` |
| 计算属性 `computed` | `MenuView.vue` 的 `filteredDishes` |
| 侦听器 `watch` | `useFavorites.js` 写 localStorage；详情页监听 `route.params.id` |
| 生命周期 `onMounted` | `HomeView.vue` 算问候语；详情页加载评论 |
| 组件 Props | `DishCard.vue` 接收 `dish` |
| 组件 Emits | `CommentForm.vue` 提交评论、`SearchBar.vue` 的 `update:modelValue` |
| 组件 v-model | `StarRating.vue`、`SearchBar.vue`、`CategoryTabs.vue` |
| 插槽 slot | `SectionTitle.vue` 具名插槽、`EmptyState.vue` 默认插槽 |
| 动态组件 `<component :is>` | `App.vue` 里配合 `<router-view>` 做页面切换 |
| 过渡动画 `<transition>` | `App.vue` 页面切换、`ToastMessage.vue` 轻提示 |
| 路由 | `router/index.js`、`RouterLink`、`useRoute()` 取 `params` / `query` |
| 组合式函数 | `composables/useFavorites.js`、`useToast.js` |
| 模板引用 `ref` | `CommentForm.vue` 提交后让输入框重新聚焦 |

更详细的代码讲解见同目录下的 **`代码逻辑讲解.md`**（含讲稿和常见提问）。
