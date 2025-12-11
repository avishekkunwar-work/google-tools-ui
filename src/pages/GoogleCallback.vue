<template>
    <div>Logging in with Google...</div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '../api'; // your axios instance
  import { useToast } from 'vue-toastification';
  
  const router = useRouter();
  const toast = useToast();
  
  onMounted(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('Google code:', code);
  
    if (!code) {
      toast.error('No code received from Google.');
      return;
    }
  
    try {
      // POST request with query param
      const res = await api.post('/google-login', null, { params: { code } });
  
      // Save tokens
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
  
      toast.success('Welcome! Login successful!');
      router.push('/dashboard'); // redirect after login
    } catch (err) {
      console.error(err);
      toast.error('Google login failed! Please try again.');
      router.push('/login');
    }
  });
  </script>
  