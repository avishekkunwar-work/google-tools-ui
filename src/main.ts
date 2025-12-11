import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./style.css";

// Google
import GoogleCallback from './pages/GoogleCallback.vue';

// Notifications
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Import pages
import Dashboard from "./pages/Dashboard.vue";
import SiteManagement from "./pages/SiteManagement.vue";
import Index from "./pages/IndexManagement.vue";
import Reports from "./pages/Reports.vue";
import Settings from "./pages/Settings.vue";
import CrawlManagement from "./pages/CrawlManagement.vue";
import CrawlDetails from "./pages/CrawlDetails.vue";
import Login from "./pages/Login.vue";

// Layouts
import DefaultLayout from "./layout/DefaultLayout.vue";
import AuthLayout from "./layout/AuthLayout.vue";

// Axios instance
import api from './api'; // Axios instance with withCredentials: true

const routes = [
  { path: "/", redirect: "/dashboard" },

  // PROTECTED ROUTES (DefaultLayout)
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "dashboard", name: "Dashboard", component: Dashboard, meta: { requiresAuth: true } },
      { path: "sites", name: "SiteManagement", component: SiteManagement, meta: { requiresAuth: true } },
      { path: "index", name: "Index", component: Index, meta: { requiresAuth: true } },
      { path: "reports", name: "Reports", component: Reports, meta: { requiresAuth: true } },
      { path: "settings", name: "Settings", component: Settings, meta: { requiresAuth: true } },
      { path: "crawl-management", name: "CrawlManagement", component: CrawlManagement, meta: { requiresAuth: true } },
      { path: "crawl-details/:siteId", name: "CrawlDetails", component: CrawlDetails, meta: { requiresAuth: true } },
    ],
  },

  // PUBLIC ROUTES (AuthLayout)
  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", name: "Login", component: Login, meta: { public: true } }],
  },
  {
    path: "/unauthorized",
    component: AuthLayout,
    children: [{ path: "", name: "Unauthorized", component: () => import('./pages/Unauthorized.vue'), meta: { public: true } }],
  },
  {
    path: "/not-found",
    component: AuthLayout,
    children: [{ path: "", name: "NotFound", component: () => import('./pages/NotFound.vue'), meta: { public: true } }],
  },
  {
    path: "/:pathMatch(.*)*",
    component: AuthLayout,
    children: [{ path: "", name: "NotFound", component: () => import('./pages/NotFound.vue'), meta: { public: true } }],
  },

  { path: '/google-callback', component: GoogleCallback },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ------------------------------------------------------
//  GLOBAL AUTH GUARD (using server session/cookies)
// ------------------------------------------------------
router.beforeEach(async (to, from, next) => {
  const isPublic = to.meta.public === true;
  const requiresAuth = to.meta.requiresAuth === true;

  // ----- PUBLIC ROUTES -----
  if (isPublic) return next();

  // ----- PROTECTED ROUTES -----
  if (requiresAuth) {
    try {
      await api.get('/auth-check'); // backend checks HttpOnly cookie
      return next();
    } catch {
      return next({ path: "/login", query: { redirect: to.fullPath } });
    }
  }

  // ----- LOGIN PAGE -----
  if (to.path === "/login") {
    try {
      await api.get('/auth-check');
      return next("/dashboard"); // already logged in
    } catch {
      return next(); // allow login
    }
  }

  next();
});


const app = createApp(App);
app.use(router);

// Add toastification
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

app.mount("#app");
