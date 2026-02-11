import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/components/Login.vue'
import ChangeLocationSelection from '@/components/ChangeLocationSelection.vue'
import ChangeDetectorLocation from '@/components/ChangeDetectorLocation.vue'
import ChangeCylinderLocation from '@/components/ChangeCylinderLocation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/change-location',
      name: 'ChangeLocationSelection',
      component: ChangeLocationSelection,
      meta: { requiresAuth: true }
    },
    {
      path: '/change-detector-location',
      name: 'ChangeDetectorLocation',
      component: ChangeDetectorLocation,
      meta: { requiresAuth: true }
    },
    {
      path: '/change-cylinder-location',
      name: 'ChangeCylinderLocation',
      component: ChangeCylinderLocation,
      meta: { requiresAuth: true }
    }
  ],
})

// Global route guard
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()
    await authStore.checkAuth()

    if (authStore.isAuthenticated) {
      next()
    } else {
      // Redirect to login page
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router