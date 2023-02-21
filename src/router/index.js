import { createRouter, createWebHistory } from 'vue-router';
import User from '@/views/User.vue';
import Address from '@/views/Address.vue';
import Role from '@/views/Role.vue';
import Warehouse from '@/views/Warehouse.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      name: 'user',
      component: User
    },

    {
      path: '/address',
      name: 'address',
      component: Address
    },

    {
      path: '/warehouse',
      name: 'warehouse',
      component: Warehouse
    },

    {
      path: '/role',
      name: 'role',
      component: Role
    },
   
  ]
})

export default router
