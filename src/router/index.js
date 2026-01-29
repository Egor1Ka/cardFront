import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import MainPage from "../pages/MainPage.vue";
import CreateCards from "../pages/CreateCards.vue";
import TestPage from "../pages/TestPage.vue";
import LibraryPage from "../pages/LibraryPage.vue";
import CardsPage from "../pages/CardsPage.vue";
import ModulesPage from "../pages/module/index.vue";
import ModulePage from "../pages/module/ModulePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import { useAuth } from "@/composables/useAuth";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: MainPage,
      },
      {
        path: "createModule",
        name: "createModule",
        component: CreateCards,
      },
      {
        path: "test",
        name: "test",
        component: TestPage,
      },
      {
        path: "library",
        name: "library",
        component: LibraryPage,
      },
      {
        path: "cards",
        name: "cards",
        component: CardsPage,
      },
      {
        path: "module",
        name: "modules",
        component: ModulesPage,
      },
      {
        path: "module/:id",
        name: "module",
        component: ModulePage,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
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

router.beforeEach(async (to) => {
  const { getUser } = useAuth();
  const currentUser = await getUser();

  if (to.name === "login") {
    if (currentUser) return { name: "home" };
    return true;
  }

  if (!currentUser) return { name: "login" };

  return true;
});

export default router;
