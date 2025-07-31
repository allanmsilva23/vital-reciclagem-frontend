<template>
  <div class="modern-container">
    <div class="hero-background">
      <div class="overlay"></div>
      <div class="hero-content">
        <img src="@/assets/logo.png" alt="Logo Vital Reciclagem" class="logo" />
        <h1 class="title">Acessar como <span class="highlight">Colaborador</span></h1>
        <p class="subtitle">
          Escolha seu perfil para acessar a área correspondente do sistema.
        </p>
      </div>
    </div>

   <div class="action-section">
      <router-link to="/login-motorista" class="main-btn primary-btn">
        <span>Motorista</span>
      </router-link>

        <router-link to="/login-admin" class="main-btn primary-btn">
            <span>Administrador</span>
        </router-link>
    </div>
  </div>
</template>

<script setup>
import '@/css/Home.css'
</script>

<style scoped>
@import '@/css/Home.css';
</style>