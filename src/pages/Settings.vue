<template>
  <div class="page-container">
    <div class="page-header">
      <div>
        <h1>Settings</h1>
        <p class="subtitle">Manage your account settings</p>
      </div>
    </div>

    <p class="coming-soon">Settings page - Coming soon</p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.page-container {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background: #f9f9f9;
}

.page-header h1 {
  font-size: 32px;
  color: #333;
  margin: 0 0 10px 0;
  font-weight: 700;
}

.subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.coming-soon {
  font-size: 16px;
  color: #999;
  text-align: center;
  padding: 40px;
}
</style>
