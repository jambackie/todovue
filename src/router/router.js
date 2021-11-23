import VueRouter from 'vue-router';
import List from '../components/List.vue';
import Start from '../components/Start.vue';
import Edit from '../components/Edit.vue';
import Vue from 'vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Start,
  },
  {
    path: '/list',
    component: List,
  },
  {
    path: '/edit',
    component: Edit,
  },
];

const router = new VueRouter({
  routes,
});

export default router;