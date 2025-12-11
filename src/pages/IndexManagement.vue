<template>
  <div class="page-container">
    <div class="page-header">
      <div>
        <h1>Google Indexing</h1>
        <p class="subtitle">Index Management</p>
      </div>
    </div>

    <div class="index-grid">
      <div v-for="index in indexList" :key="index.id" class="index-card">
        <div class="index-header">
          <h3>{{ index.name }}</h3>
          <span class="index-badge">{{ index.size }}</span>
        </div>
        <p class="index-industry">{{ index.industry }}</p>
        <div class="index-stats">
          <div class="stat">
            <span class="stat-label">Contacts</span>
            <span class="stat-value">{{ index.contacts }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Deals</span>
            <span class="stat-value">{{ index.deals }}</span>
          </div>
        </div>
        <div class="index-actions">
          <button class="action-btn">View</button>
          <button class="action-btn delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const indexList = [
  { id: 1, name: 'Tech Corp', industry: 'Technology', size: 'Enterprise', contacts: 12, deals: 5 },
  { id: 2, name: 'Design Co', industry: 'Design & Creative', size: 'Small', contacts: 3, deals: 1 },
  { id: 3, name: 'Digital Media', industry: 'Media & Publishing', size: 'Medium', contacts: 8, deals: 3 },
]
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

.index-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.index-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.index-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.index-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.index-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.index-badge {
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.index-industry {
  margin: 0 0 15px 0;
  font-size: 13px;
  color: #999;
}

.index-stats {
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 15px;
}

.stat {
  flex: 1;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.stat-value {
  display: block;
  font-size: 18px;
  color: #333;
  font-weight: 700;
}

.index-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 8px;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  color: #666;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #22c55e;
  border-color: #22c55e;
  color: #ffffff;
}

.action-btn.delete {
  color: #ef4444;
}

.action-btn.delete:hover {
  background: #ef4444;
  border-color: #ef4444;
  color: #ffffff;
}

@media (max-width: 768px) {
  .page-container {
    padding: 20px;
  }

  .companies-grid {
    grid-template-columns: 1fr;
  }
}
</style>
