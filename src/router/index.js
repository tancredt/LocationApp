import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/components/Login.vue'
import ChangeLocationSelection from '@/components/ChangeLocationSelection.vue'
import ChangeDetectorLocation from '@/components/ChangeDetectorLocation.vue'
import ChangeCylinderLocation from '@/components/ChangeCylinderLocation.vue'
import MicroRaeSwap from '@/components/MicroRaeSwap.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false, title: 'Login - FRV Hazmat Location Management' }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/components/About.vue'),
      meta: { requiresAuth: true, title: 'About - FRV Hazmat Location Management' }
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/components/Help.vue'),
      meta: { requiresAuth: true, title: 'Help & FAQ - FRV Hazmat Location Management' }
    },
    {
      path: '/change-location',
      name: 'ChangeLocationSelection',
      component: ChangeLocationSelection,
      meta: { requiresAuth: true, title: 'Select Equipment - FRV Hazmat Location Management' }
    },
    {
      path: '/change-detector-location',
      name: 'ChangeDetectorLocation',
      component: ChangeDetectorLocation,
      meta: { requiresAuth: true, title: 'Change Detector Location - FRV Hazmat Location Management' }
    },
    {
      path: '/microrae-swap',
      name: 'MicroRaeSwap',
      component: MicroRaeSwap,
      meta: { requiresAuth: true, title: 'MicroRAE Swap - FRV Hazmat Location Management' }
    },
    {
      path: '/change-cylinder-location',
      name: 'ChangeCylinderLocation',
      component: ChangeCylinderLocation,
      meta: { requiresAuth: true, title: 'Change Cylinder Location - FRV Hazmat Location Management' }
    }
  ],
})

// Global route guard
router.beforeEach(async (to, from, next) => {
  // Update document title based on route meta
  const title = to.meta?.title || 'FRV Hazmat Location Management';
  document.title = title;

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