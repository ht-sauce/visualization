import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/AllPages',
  },
  {
    path: '/AllPages',
    name: '/AllPages',
    component: () => import('@/views/AllPages/index.vue'),
    meta: {
      title: '所有页面',
    },
  },
  {
    path: '/ColorCard',
    name: '/ColorCard',
    component: () => import('@/views/ColorCard/index.vue'),
    meta: {
      title: '比色卡',
    },
  },
  {
    path: '/Experiment',
    name: '/Experiment',
    component: () => import('@/views/Experiment/index.vue'),
    meta: {
      title: '实验室',
    },
  },
  {
    path: '/EditorPage',
    name: '/EditorPage',
    component: () => import('@/views/EditorPage/index.vue'),
    meta: {
      title: '页面编辑器',
    },
  },
  {
    path: '/ast-test',
    name: '/ast-test',
    component: () => import('@/views/Ast/index.vue'),
    meta: {
      title: 'ast测试工具',
    },
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

router.beforeEach((to) => {
  document.title = to.meta.title as string
})

export default router
