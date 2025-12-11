<template>
    <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <Header />
      <router-view />
    </div>
  </div> 
    
  </template>
  
  <script setup lang="ts">
  import Sidebar from "../components/Sidebar.vue"
  import Header from "../components/Header.vue"
  </script>
  
  
<style scoped>
  .app-container {
    display: flex;
    height: 100vh;
    background: #f4f4f4;
  }
  
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  </style>