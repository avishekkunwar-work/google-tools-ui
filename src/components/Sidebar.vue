<template>
  <aside class="sidebar">
    <div class="logo">
      <div class="logo-icon">SB</div>
      <span class="logo-text">Site Booster</span>
    </div>

    <nav class="menu">
      <router-link 
        to="/dashboard" 
        class="menu-item"
        active-class="active"
      >
        <span class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 13H3v8h10v-8zM3 3h8v8H3V3zm10 0h8v8h-8V3zM13 21h8v-8h-8v8z"/>
          </svg>
        </span>
        <span class="menu-label">Dashboard</span>
      </router-link>

      <!-- Changed Contacts to Site Management with updated route and icon -->
      <router-link 
        to="/sites" 
        class="menu-item"
        active-class="active"
      >
        <span class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 13v10H3V3h10V1H3c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-10h-2zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2zm14-8h-6V5h6v2zm0 4h-6V9h6v2z"/>
          </svg>
        </span>
        <span class="menu-label">Site Management</span>
      </router-link>

      <router-link 
        to="/crawl-management" 
        class="menu-item"
        active-class="active"
      >
        <span class="menu-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12"></polyline>
          <path d="M3 12h18"></path>
        </svg>
        </span>
        <span class="menu-label">Crawl Management</span>
      </router-link>

      <router-link 
        to="/index" 
        class="menu-item"
        active-class="active"
      >
        <span class="menu-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm1 14H9v-6h2v6zm0-8H9V9h2v6z"/>
</svg>
        </span>
        <span class="menu-label">Google Indexing</span>
      </router-link>



      <router-link 
        to="/reports" 
        class="menu-item"
        active-class="active"
      >
        <span class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l1.72-1.35c.15-.12.19-.34.1-.51l-1.63-2.83c-.12-.22-.37-.29-.59-.22l-2.03.81c-.42-.32-.86-.58-1.35-.78l-.31-2.15c-.05-.24-.24-.41-.48-.41h-3.26c-.24 0-.43.17-.49.41l.31 2.15c.49-.2.93-.47 1.35-.78l2.03-.81c.22-.09.47 0 .59-.22l1.63-2.83c.12-.21.08-.44-.1-.51l-1.72-1.35zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
        </span>
        <span class="menu-label">Reports</span>
      </router-link>

      <router-link 
        to="/settings" 
        class="menu-item"
        active-class="active"
      >
        <span class="menu-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l1.72-1.35c.15-.12.19-.34.1-.51l-1.63-2.83c-.12-.22-.37-.29-.59-.22l-2.03.81c-.42-.32-.86-.58-1.35-.78l-.31-2.15c-.05-.24-.24-.41-.48-.41h-3.26c-.24 0-.43.17-.49.41l.31 2.15c.49-.2.93-.47 1.35-.78l2.03-.81c.22-.09.47 0 .59-.22l1.63-2.83c.12-.21.08-.44-.1-.51l-1.72-1.35zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
        </span>
        <span class="menu-label">Settings</span>
      </router-link>

    </nav>
  </aside>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #ffffff;
  color: #333;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
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
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
}

.logo-text {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #333;
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
  color: #666;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.menu-item:hover {
  background: #f5f5f5;
  color: #333;
}

.menu-item.active {
  background: #22c55e;
  color: #ffffff;
  font-weight: 600;
}

.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.menu-icon svg {
  width: 20px;
  height: 20px;
}

.menu-label {
  flex: 1;
}

@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  .menu-label {
    display: none;
  }
}
</style>
