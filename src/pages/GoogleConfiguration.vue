<template>
  <div class="page-container">
    <!-- Header -->
    <div class="page-header">
      <h1>Welcome back!</h1>
      <p class="subtitle">
        Configure credentials for Google Search Console and Indexing API
      </p>
    </div>

    <!-- Content Grid -->
    <div class="grid">
      <!-- Left Column -->
      <div class="column">
        <!-- Current Status -->
        <div class="card">
          <h3>Current Status</h3>

          <div class="status-box success" v-if="credentials.serviceAccountEmail">
            <div>
              <strong>Service Account:</strong><br />
              <span class="mono">{{ credentials.serviceAccountEmail }}</span>
            </div>

          </div>
          <div class="status-box" v-else>
            <span>No credentials uploaded</span>
          </div>

          <div class="actions">
            <button class="btn danger" @click="removeCredentials" :disabled="loading">
              Remove Credentials
            </button>
          </div>
        </div>

        <!-- Upload JSON -->
        <div class="card">
          <h3>Upload Service Account Key</h3>
          <p class="hint">
            Upload a Google service account JSON key file to enable URL indexing functionality.
          </p>

          <input type="file" class="file-input" @change="handleFileChange" />

          <div class="actions">
            <button class="btn primary" @click="uploadKey" :disabled="loading">
              Upload Key
            </button>
          </div>

          <div class="info">
            <h4>How to get a service account key?</h4>
            <ol>
              <li>Go to Google Cloud Console</li>
              <li>Create or select a service account</li>
              <li>Go to “Keys” → “Add Key”</li>
              <li>Create a new JSON key</li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="column">
        <div class="card">
          <h3>Manual Credentials Entry</h3>

          <div class="form-group">
            <label>Client ID</label>
            <input type="text" v-model="credentials.clientId" />
          </div>

          <div class="form-group">
            <label>Project ID</label>
            <input type="text" v-model="credentials.projectId" />
          </div>

          <div class="form-group">
            <label>Service Account Email</label>
            <input type="email" v-model="credentials.serviceAccountEmail" />
          </div>

          <div class="form-group">
            <label>Private Key ID</label>
            <input type="text" v-model="credentials.privateKeyId" />
          </div>

          <div class="form-group">
            <label>Private Key</label>
            <textarea rows="6" v-model="credentials.privateKey"></textarea>
          </div>

          <button class="btn primary full" @click="updateCredentials" :disabled="loading">
            Update Credentials
          </button>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <!-- <p v-if="error" style="color: red; margin-top: 12px">{{ error }}</p> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import api from '../api' // your Axios instance
import { useToast } from 'vue-toastification';
const toast = useToast();
const loading = ref(false)
const error = ref<string | null>(null)
const selectedFile = ref<File | null>(null)

// Reactive credentials object
const credentials = reactive({
  clientId: '',
  projectId: '',
  serviceAccountEmail: '',
  privateKey: '',
  privateKeyId: '',
  lastUpdated: ''})

// Fetch existing credentials
const fetchCredentials = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await api.get('/google-config/get')
    const data = res.data?.data
    if (data) {
      credentials.clientId = data.clientId || ''
      credentials.projectId = data.projectId || ''
      credentials.serviceAccountEmail = data.clientEmail || ''
      credentials.privateKey = data.privateKey || ''
      credentials.privateKeyId = data.privateKeyId || ''
      credentials.lastUpdated = data.lastUpdated || ''
    }
  } catch (err: any) {
    console.error(err)
    error.value = err.message || 'Failed to fetch credentials'
  } finally {
    loading.value = false
  }
}

// Handle file selection
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  }
}

// Upload JSON key
const uploadKey = async () => {
  if (!selectedFile.value) {
    toast.error('Please select a JSON file first');
    return;
  }
  loading.value = true
  error.value = null
  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    await api.post('/google-config/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    toast.success('Service account key uploaded successfully!');

    await fetchCredentials()
  } catch (err: any) {
    console.error(err)
    error.value = err.message || 'Failed to upload key'
  } finally {
    loading.value = false
  }
}


// Remove credentials
const removeCredentials = async () => {
  if (!confirm('Are you sure you want to remove credentials?')) return
  loading.value = true
  error.value = null
  try {
    await api.post('/google-config/remove')
    toast.success('Credentials removed successfully!');
    Object.assign(credentials, {
      clientId: '',
      projectId: '',
      serviceAccountEmail: '',
      privateKey: '',
      privateKeyId: '',
      lastUpdated: ''
    })
  } catch (err: any) {
    console.error(err)
    error.value = err.message || 'Failed to remove credentials'
  } finally {
    loading.value = false
  }
}

// Update credentials (update API)
const updateCredentials = async () => {
  loading.value = true
  error.value = null
  try {
    await api.post('/google-config/update', {
      clientId: credentials.clientId,
      projectId: credentials.projectId,
      clientEmail: credentials.serviceAccountEmail,
      privateKey: credentials.privateKey,
      privateKeyId: credentials.privateKeyId
    })
    toast.success('Credentials updated successfully!');
    credentials.lastUpdated = new Date().toLocaleString()
  } catch (err: any) {
    console.error(err)
    error.value = err.message || 'Failed to update credentials'
  } finally {
    loading.value = false
  }
}

// Fetch credentials on mount
onMounted(() => {
  fetchCredentials()
})
</script>

<style scoped>
/* Keep all your previous styles */
.page-container {
  min-height: 100vh;
  padding: 30px;
  background: #f5f6f8;
}

/* Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 700;
}

.subtitle {
  font-size: 14px;
  color: #666;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  margin-top: 24px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Card */
.card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

.card h3 {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
}

/* Status Box */
.status-box {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 14px;
}

.status-box.success {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
}

.mono {
  font-family: monospace;
  font-size: 13px;
  word-break: break-all;
}

.status-meta {
  font-size: 12px;
  color: #555;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Actions */
.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  border: none;
}

.btn.primary {
  background: #2563eb;
  color: #fff;
}

.btn.danger {
  background: #dc2626;
  color: #fff;
}

.btn.full {
  width: 100%;
}

/* Forms */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
}

label {
  font-size: 13px;
  margin-bottom: 4px;
  color: #374151;
}

input,
textarea {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 13px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.4);
}

.file-input {
  margin: 12px 0;
}

/* Info */
.hint {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 10px;
}

.info {
  margin-top: 16px;
  font-size: 13px;
  color: #4b5563;
}

.info h4 {
  margin-bottom: 6px;
}

/* Responsive */
@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .page-container {
    padding: 14px;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .subtitle {
    font-size: 13px;
  }
}
</style>
