<template>
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1>Crawl Management</h1>
          <p class="subtitle">Manage and monitor web crawls for your active sites</p>
        </div>
        <!-- Queue for Crawl button visible only when checkboxes are selected -->
        <button 
          class="btn-primary" 
          @click="queueForCrawl"
          :style="buttonStyle"
        >
          Queue for Crawl ({{ selectedSites.length }})
        </button>
      </div>
  
      <!-- Crawl Sites Grid -->
      <div class="grid-card">
        <!-- Select All checkbox -->
        <div class="grid-header">
          <div class="checkbox-container">
            <input 
              type="checkbox" 
              id="select-all" 
              :checked="isAllSelected"
              @change="toggleSelectAll"
              class="select-all-checkbox"
            />
            <label for="select-all" class="select-all-label">Select All</label>
          </div>
        </div>
  
        <table class="crawl-table">
          <thead>
            <tr>
              <th class="checkbox-column">
                <input 
                  type="checkbox" 
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="checkbox-input"
                />
              </th>
              <th>Site Name</th>
              <th>URL</th>
              <th>Type</th>
              <th>Crawl Status</th>
              <th>Crawl Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="site in activeSites" :key="site.id" :class="{ selected: selectedSites.includes(site.id) }">
              <td class="checkbox-column">
                <input 
                  type="checkbox" 
                  :checked="selectedSites.includes(site.id)"
                  @change="toggleSiteSelection(site.id)"
                  class="checkbox-input"
                />
              </td>
              <td class="site-name-cell">
                <div class="site-icon">{{ site.name.charAt(0).toUpperCase() }}</div>
                <span>{{ site.name }}</span>
              </td>
              <td>
                <div class="url-cell">{{ site.url }}</div>
              </td>
              <td>{{ site.type }}</td>
              <td>
                <span class="status-badge" :class="getStatusClass(site.crawlStatus)">
                  {{ site.crawlStatus || 'Queue' }}
                </span>
              </td>
              <td>{{ formatCrawlDate(site.crawlDate) }}</td>
              <td class="action-cell">
                <button class="action-btn" @click="startCrawl(site.id)">Crawl</button>
                <button class="action-btn view-details" @click="viewDetails(site.id)">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  interface Site {
    id: number
    name: string
    url: string
    type: string
    status: 'Active' | 'Inactive'
    crawlStatus?: 'Success' | 'Failed' | 'Queue'
    crawlDate?: Date
  }
  
  const router = useRouter()
  
  const allSites = ref<Site[]>([
    { id: 1, name: 'Main Website', url: 'https://example.com', type: 'Corporate', status: 'Active', crawlStatus: 'Success', crawlDate: new Date('2024-12-08') },
    { id: 2, name: 'Blog Platform', url: 'https://blog.example.com', type: 'Blog', status: 'Active', crawlStatus: 'Success', crawlDate: new Date('2024-12-07') },
    { id: 3, name: 'E-commerce Store', url: 'https://shop.example.com', type: 'E-commerce', status: 'Active', crawlStatus: 'Failed', crawlDate: new Date('2024-12-05') },
  ])
  
  const selectedSites = ref<number[]>([])
  
  const activeSites = computed(() => allSites.value.filter(site => site.status === 'Active'))
  
  const isAllSelected = computed(() => {
    return activeSites.value.length > 0 && selectedSites.value.length === activeSites.value.length
  })
  
  const buttonStyle = computed(() => {
    return {
      opacity: selectedSites.value.length > 0 ? 1 : 0,
      pointerEvents: selectedSites.value.length > 0 ? 'auto' : 'none'
    }
  })
  
  const getStatusClass = (status: string | undefined) => {
    if (!status) return 'status-queue'
    return `status-${status.toLowerCase()}`
  }
  
  const formatCrawlDate = (date: Date | undefined) => {
    return date ? formatDate(date) : 'Never'
  }
  
  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedSites.value = []
    } else {
      selectedSites.value = activeSites.value.map(site => site.id)
    }
  }
  
  const toggleSiteSelection = (siteId: number) => {
    const index = selectedSites.value.indexOf(siteId)
    if (index > -1) {
      selectedSites.value.splice(index, 1)
    } else {
      selectedSites.value.push(siteId)
    }
  }
  
  const queueForCrawl = () => {
    selectedSites.value.forEach(siteId => {
      const site = allSites.value.find(s => s.id === siteId)
      if (site) {
        site.crawlStatus = 'Queue'
      }
    })
    selectedSites.value = []
    alert('Sites queued for crawl!')
  }
  
  const startCrawl = (siteId: number) => {
    const site = allSites.value.find(s => s.id === siteId)
    if (site) {
      site.crawlStatus = 'Queue'
      alert(`Site "${site.name}" queued for crawl!`)
    }
  }
  
  const viewDetails = (siteId: number) => {
    router.push({ name: 'CrawlDetails', params: { siteId } })
  }
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
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
  
  .grid-card {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #e8e8e8;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .grid-header {
    padding: 15px;
    border-bottom: 1px solid #e8e8e8;
    background: #f9f9f9;
  }
  
  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .select-all-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #22c55e;
  }
  
  .select-all-label {
    font-weight: 500;
    color: #333;
    cursor: pointer;
  }
  
  .crawl-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .crawl-table thead {
    background: #f5f5f5;
    border-bottom: 1px solid #e8e8e8;
  }
  
  .crawl-table th {
    padding: 15px;
    text-align: left;
    font-weight: 600;
    font-size: 13px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .crawl-table td {
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
    color: #333;
  }
  
  .crawl-table tbody tr.selected {
    background: #f0fdf4;
  }
  
  .checkbox-column {
    width: 50px;
    text-align: center;
  }
  
  .checkbox-input {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #22c55e;
  }
  
  .site-name-cell {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .site-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
    flex-shrink: 0;
  }
  
  .url-cell {
    word-break: break-word;
    max-width: 200px;
  }
  
  .status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    background: #e8f5e9;
    color: #22c55e;
    display: inline-block;
  }
  
  .status-badge.status-success {
    background: #e8f5e9;
    color: #22c55e;
  }
  
  .status-badge.status-failed {
    background: #fef2f2;
    color: #ef4444;
  }
  
  .status-badge.status-queue {
    background: #fef3c7;
    color: #d97706;
  }
  
  .action-cell {
    display: flex;
    gap: 8px;
  }
  
  .action-btn {
    padding: 6px 12px;
    background: #f5f5f5;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    color: #666;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  
  .action-btn:hover {
    background: #22c55e;
    border-color: #22c55e;
    color: #ffffff;
  }
  
  .action-btn.view-details:hover {
    background: #3b82f6;
    border-color: #3b82f6;
    color: #ffffff;
  }
  
  @media (max-width: 768px) {
    .page-container {
      padding: 20px;
    }
  
    .page-header {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;
    }
  
    .url-cell {
      max-width: 100px;
    }
  
    .action-cell {
      flex-direction: column;
    }
  }
  </style>
  