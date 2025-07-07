<template>
  <div class="container">
    <div class="top-bg">
      <img src="@/assets/logo.png" alt="Logo Vital Reciclagem" class="logo" />
    </div>
    <div class="vector-bg"></div>
    <div class="content">
      <h1 class="title">Explorar Vital Reciclagem</h1>
      <p class="subtitle">
        Cadastre sua empresa, acompanhe coletas de óleo e contribua para um futuro sustentável.
      </p>
      <router-link to="/login" class="login-btn">Fazer login</router-link>
      <router-link to="/cadastro" class="register-btn">Criar conta</router-link>
      <router-link to="/lista-estoques" class="nav-btn">Página Estoque</router-link>
      <router-link to="/lista-produtos" class="nav-btn">Página Produtos</router-link>
      <router-link to="/lista-clientes" class="nav-btn">Página Usuários</router-link>
    </div>
  </div>
</template>

<script setup>
import '../css/Home.css'
</script>
<style scoped>
@import '../css/Home.css'
</style>