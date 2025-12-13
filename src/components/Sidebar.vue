<template>
  <aside class="sidebar">
    <!-- LOGO -->
    <div class="logo">
      <div class="logo-icon">SB</div>
      <span class="logo-text">Site Booster</span>
    </div>

    <!-- MENU -->
    <nav class="menu">
      <!-- Dashboard -->
      <router-link to="/dashboard" class="menu-item" active-class="active">
        <span class="menu-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 13H3v8h10v-8zM3 3h8v8H3V3zm10 0h8v8h-8V3zM13 21h8v-8h-8v8z"/>
          </svg>
        </span>
        <span class="menu-label">Dashboard</span>
      </router-link>

      <!-- Site Management -->
      <router-link to="/sites" class="menu-item" active-class="active">
        <span class="menu-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 13v10H3V3h10V1H3c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-10h-2z"/>
          </svg>
        </span>
        <span class="menu-label">Site Management</span>
      </router-link>

      <!-- Crawl Management -->
      <router-link to="/crawl-management" class="menu-item" active-class="active">
        <span class="menu-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
        </span>
        <span class="menu-label">Crawl Management</span>
      </router-link>

      <!-- Google Indexing -->
      <router-link to="/index" class="menu-item" active-class="active">
        <span class="menu-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14H9v-6h2v6zm0-8H9V7h2v1z"/>
          </svg>
        </span>
        <span class="menu-label">Google Indexing</span>
      </router-link>

      <!-- SETTINGS (COLLAPSIBLE) -->
      <div class="menu-group">
        <div
          class="menu-item"
          :class="{ active: isSettingsActive }"
          @click="toggleSettings"
        >
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l1.72-1.35c.15-.12.19-.34.1-.51l-1.63-2.83c-.12-.22-.37-.29-.59-.22l-2.03.81c-.42-.32-.86-.58-1.35-.78l-.31-2.15c-.05-.24-.24-.41-.48-.41h-3.26c-.24 0-.43.17-.49.41l.31 2.15c-.49.2-.93.47-1.35.78l-2.03-.81c-.22-.09-.47 0-.59.22l-1.63 2.83c-.12.21-.08.44.1.51l1.72 1.35c-.05.3-.07.62-.07.94 0 .33.02.64.06.94l-1.72 1.35c-.15.12-.19.34-.1.51l1.63 2.83c.12.22.37.29.59.22l2.03-.81c.42.32.86.58 1.35.78l.31 2.15c.06.24.25.41.49.41h3.26c.24 0 .43-.17.48-.41l-.31-2.15c.49-.2.93-.46 1.35-.78l2.03.81c.22.09.47 0 .59-.22l1.63-2.83c.09-.17.05-.39-.1-.51l-1.72-1.35z"/>
            </svg>
          </span>
          <span class="menu-label">Settings</span>
          <span class="arrow" :class="{ open: settingsOpen }">▾</span>
        </div>

        <div v-if="settingsOpen" class="submenu">
          <router-link
            to="/settings/google-configuration"
            class="submenu-item"
            active-class="active-sub"
          >
            Google Configuration
          </router-link>

          <router-link
            to="/settings/schedule-configuration"
            class="submenu-item"
            active-class="active-sub"
          >
            Schedule Configuration
          </router-link>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const settingsOpen = ref(false);

const isSettingsActive = computed(() =>
  route.path.startsWith("/settings")
);

watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/settings")) {
      settingsOpen.value = true;
    }
  },
  { immediate: true }
);

const toggleSettings = () => {
  settingsOpen.value = !settingsOpen.value;
};
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #fff;
  padding: 20px;
  border-right: 1px solid #e8e8e8;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  text-decoration: none;
  transition: all 0.2s;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item.active {
  background: #22c55e;
  color: #fff;
}

.menu-icon svg {
  width: 20px;
  height: 20px;
}

.menu-group .arrow {
  margin-left: auto;
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

.submenu {
  margin-left: 32px;
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.submenu-item {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  text-decoration: none;
}

.submenu-item:hover {
  background: #f5f5f5;
}

.active-sub {
  background: #e8f7ee;
  color: #16a34a;
  font-weight: 600;
}
</style>
