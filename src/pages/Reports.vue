<template>
  <div class="page-container">
    <div class="page-header">
      <div>
        <h1>Reports</h1>
        <p class="subtitle">View reports</p>
      </div>
      <!-- <button class="btn-primary">+ Generate Report</button> -->
    </div>

    <p class="coming-soon">Reports page</p>
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

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
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

.btn-primary {
  padding: 10px 20px;
  background: #22c55e;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #16a34a;
}

.coming-soon {
  font-size: 16px;
  color: #999;
  text-align: center;
  padding: 40px;
}
</style>
