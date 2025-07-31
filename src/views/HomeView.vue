<template>
  <div class="modern-container">
    <div class="hero-background">
      <div class="overlay"></div>
      <div class="hero-content">
        <img src="@/assets/logo.png" alt="Logo Vital Reciclagem" class="logo" />
        <h1 class="title">Bem-vindo à <span class="highlight">Vital Reciclagem</span></h1>
        <p class="subtitle">
          Junte-se a nós para transformar o futuro! Cadastre sua empresa ou acesse sua conta para acompanhar coletas e contribuir para um mundo mais sustentável.
        </p>
      </div>
    </div>

    <div class="action-section">
      <router-link to="/cadastro" class="main-btn primary-btn">
        <span>Criar Conta</span>
      </router-link>
      
      <router-link to="/login" class="main-btn secondary-btn">
        <span>Já Tenho Conta</span>
      </router-link>

      <div class="divider">
        <span class="divider-text">ou</span>
      </div>

      <router-link to="/tipo-colaborador" class="collab-link">
        <svg class="user-icon" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <span>Acessar como Colaborador</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import '../css/Home.css'
</script>

<style scoped>
@import '../css/Home.css';
</style>