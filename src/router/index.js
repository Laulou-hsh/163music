import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/recommend'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
      path: '/recommend',
      name: 'Recommend',
      component: ()=>import('@/views/Recommend')
  },
  {
      path: '/songitem/:id',
      name: 'SongItem',
      component: ()=>import('@/views/SongItem')
  },
  {
      path: '/hot',
      name: 'Hot',
      component: ()=>import('@/views/Hot')
  },
  {
      path: '/search',
      name: 'Search',
      component: ()=>import('@/views/Search')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router;
