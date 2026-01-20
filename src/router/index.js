import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import CreateCards from '../pages/CreateCards.vue';
import TestPage from '../pages/TestPage.vue';
import LibraryPage from '../pages/LibraryPage.vue';
import CardsPage from '../pages/CardsPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
  },
  {
    path: '/createCards',
    name: 'createCards',
    component: CreateCards,
  },
  {
    path: '/test',
    name: 'test',
    component: TestPage,
  },
  {
    path: '/library',
    name: 'library',
    component: LibraryPage,
  },
  {
    path: '/cards',
    name: 'cards',
    component: CardsPage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
