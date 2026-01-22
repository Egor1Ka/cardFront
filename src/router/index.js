import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import CreateCards from "../pages/CreateCards.vue";
import TestPage from "../pages/TestPage.vue";
import LibraryPage from "../pages/LibraryPage.vue";
import CardsPage from "../pages/CardsPage.vue";
import ModulesPage from "../pages/module/index.vue";
import ModulePage from "../pages/module/ModulePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/createModule",
    name: "createModule",
    component: CreateCards,
  },
  {
    path: "/test",
    name: "test",
    component: TestPage,
  },
  {
    path: "/library",
    name: "library",
    component: LibraryPage,
  },
  {
    path: "/cards",
    name: "cards",
    component: CardsPage,
  },
  {
    path: "/module",
    name: "modules",
    component: ModulesPage,
  },
  {
    path: "/module/:id",
    name: "module",
    component: ModulePage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
