// main.js
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.js";
import ChatView from "./views/ChatView.js";
import AlbumView from "./views/AlbumView.js";
import SettingsView from "./views/SettingsView.js";
import ReportView from "./views/ReportView.js";
import PrivacyView from "./views/PrivacyView.js";
import AuthView from "./views/AuthView.js";

const routes = [
  { path: "/", component: HomeView },
  { path: "/chat", component: ChatView },
  { path: "/album", component: AlbumView },
  { path: "/settings", component: SettingsView },
  { path: "/report", component: ReportView },
  { path: "/privacy", component: PrivacyView },
  { path: "/auth", component: AuthView }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp({}).use(router).mount("#app");
