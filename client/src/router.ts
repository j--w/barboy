import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import Home from './views/Home.vue';
import Configure from './views/Configure.vue';

Vue.use(Router);

export interface BarboyRoute extends RouteConfig {
  label: string;
}

export const routes: BarboyRoute[] = [
    {
      path: '/',
      name: 'home',
      label: 'Order Drink',
      component: Home,
    },
    {
      path: '/configure',
      name: 'configure',
      label: 'Configure',
      component: Configure,
    },
];

export default new Router({routes});
