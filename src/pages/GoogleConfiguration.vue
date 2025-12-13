<template>
  <div class="page-container">
    <!-- Header -->
    <div class="page-header">
      <div>
        <h1>Welcome back!</h1>
        <p class="subtitle">
          Configure credentials for Google Search Console and Indexing API
        </p>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid">
      <!-- Left Column -->
      <div class="column">
        <!-- Current Status -->
        <div class="card">
          <h3>Current Status</h3>

          <div class="status-box success">
            <div>
              <strong>Service Account:</strong><br />
              <span class="mono">
                proline-console-for-indexing@proline-v3-1668135748790.iam.gserviceaccount.com
              </span>
            </div>

            <div class="status-meta">
              <span>Last Updated: 3/17/2025 2:22 AM</span>
              <span>Last Tested: Never</span>
            </div>
          </div>

          <div class="actions">
            <button class="btn danger">Remove Credentials</button>
            <button class="btn primary">Test Credentials</button>
          </div>
        </div>

        <!-- Upload JSON -->
        <div class="card">
          <h3>Upload Service Account Key</h3>
          <p class="hint">
            Upload a Google service account JSON key file to enable URL indexing functionality.
          </p>

          <input type="file" class="file-input" />

          <div class="actions">
            <button class="btn primary">Upload Key</button>
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
            <input type="text" />
          </div>

          <div class="form-group">
            <label>Client Secret</label>
            <input type="password" />
          </div>

          <div class="form-group">
            <label>Project ID</label>
            <input type="text" />
          </div>

          <div class="form-group">
            <label>Service Account Email</label>
            <input type="email" />
          </div>

          <div class="form-group">
            <label>Private Key</label>
            <textarea rows="6"></textarea>
          </div>

          <button class="btn primary full">Save Credentials</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.page-container {
  flex: 1;
  padding: 30px;
  background: #f5f6f8;
  overflow-y: auto;
}

/* Header */
.page-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
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

/* Status */
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

/* Buttons */
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

.btn.outline {
  background: #fff;
  border: 1px solid #d1d5db;
  color: #374151;
}

.btn.full {
  width: 100%;
}

/* Inputs */
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
</style>
