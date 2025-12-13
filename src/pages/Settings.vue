<template>
    <div class="settings-container">
      <h1>Settings</h1>
  
      <div class="settings-menu">
        <router-link
          to="/settings/google-configuration"
          class="menu-item"
          active-class="active"
        >
          🔑 Google Configuration
        </router-link>
  
        <router-link
          to="/settings/schedule-configuration"
          class="menu-item"
          active-class="active"
        >
          ⏰ Schedule Configuration
        </router-link>
      </div>
  
      <!-- Child pages render here -->
      <router-view />
    </div>
  </template>
  
  <style scoped>
  .settings-container {
    padding: 24px;
  }
  
  .settings-menu {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .menu-item {
    padding: 10px 14px;
    text-decoration: none;
    color: #6b7280;
    font-weight: 500;
    border-bottom: 2px solid transparent;
  }
  
  .menu-item.active {
    color: #2563eb;
    border-color: #2563eb;
  }
  </style>
  