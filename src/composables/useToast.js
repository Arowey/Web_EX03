// ============================================================
// 轻提示（Toast）的共享状态
// 任何组件只要调用 useToast().show('已收藏') 就能弹出一句提示，
// 真正负责显示的是 App.vue 里的 <ToastMessage />
// ============================================================
import { reactive } from 'vue'

const toast = reactive({
  visible: false,
  text: ''
})

let timer = null

export function useToast() {
  function show(text, duration = 1800) {
    toast.text = text
    toast.visible = true

    // 每次弹出前先清掉上一个定时器，避免连续点击时提前消失
    clearTimeout(timer)
    timer = setTimeout(() => {
      toast.visible = false
    }, duration)
  }

  return { toast, show }
}
