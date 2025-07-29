<template>
  <div class="not-found-container">
    <h1>404 - Página Não Encontrada</h1>
    <p>Ops! A página que você está procurando não existe.</p>
    <button @click="goHome" class="home-button">Voltar para a Página Inicial</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import '@/css/Errors.css';

const router = useRouter();

function goHome() {
  router.push('/'); 
}
</script>

<style scoped>
@import '@/css/Errors.css';
</style>

