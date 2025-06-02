<template>
  <div class="login-container">
    <button class="back-button" @click="voltar">
      <svg class="back-icon" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </button>

    <div class="login-content">
      <h1 class="login-title">Login</h1>

      <div class="input-group">
        <label>Email</label>
        <input type="email" placeholder="Digite seu email" v-model="credenciais.email">
      </div>

      <div class="input-group">
        <label>Senha</label>
        <div class="password-input">
          <input :type="showPassword ? 'text' : 'password'" placeholder="Digite sua senha" v-model="credenciais.senha">
          <button class="toggle-password" @click.prevent="togglePassword">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 1l22 22" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.94 17.94C16.13 19.13 14.13 20 12 20c-5 0-9.27-3.11-11-7.5a11.89 11.89 0 0 1 4.15-5.26" />
              <path d="M9.53 9.53A3 3 0 0 0 12 15c.5 0 .97-.12 1.38-.34"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z"/>
            </svg>
          </button>
        </div>
      </div>

      <router-link to="/recuperar-senha" class="forgot-password">Esqueceu a senha?</router-link>

      <button class="login-button" @click="fazerLogin">
        <span class="login-button-text">Fazer Login</span>
      </button>

      <div class="register-link">
        <span>Não tem conta?</span>
        <router-link to="/cadastro">Criar conta</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const credenciais = reactive({
  email: '',
  senha: ''
})

const showPassword = ref(false)
const router = useRouter()

function togglePassword() {
  showPassword.value = !showPassword.value
}

function voltar() {
  router.back()
}

function fazerLogin() {
  if (credenciais.email && credenciais.senha) {
    console.log('Login simulado:', credenciais)
    router.push('/dashboard')
  } else {
    alert('Preencha todos os campos!')
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  overflow-x: hidden;
  width: 100%;
}

.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

.login-content {
  width: 100%;
  max-width: 393px;
  margin-top: 120px; /* aumentado */
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-button {
  position: fixed;
  left: 20px;
  top: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
}

.back-icon {
  width: 24px;
  height: 24px;
  fill: #000000;
}

.login-title {
  width: 100%;
  max-width: 353px;
  font-family: 'Poppins';
  font-weight: 700;
  font-size: 30px;
  line-height: 130%;
  color: #4D3E3E;
  align-self: flex-start;
  margin-bottom: 40px;
}

.input-group {
  margin-bottom: 20px;
  width: 100%;
  max-width: 353px;
}

.input-group input:focus {
  border: 2px solid #FFA500;
  outline: none;
}

.input-group label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #000;
}

.input-group input {
  width: 100%;
  height: 56px;
  padding: 18px 16px;
  border: 1px solid #D8DADC;
  border-radius: 10px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
}

.password-input {
  position: relative;
  width: 100%;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
}

.eye-icon {
  width: 22px;
  height: 22px;
  color: #555;
}

.forgot-password {
  width: 100%;
  max-width: 353px;
  text-align: right;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  margin-bottom: 30px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  max-width: 353px;
  height: 56px;
  background: #9DD549;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-bottom: 30px;
}

.login-button:hover {
  background-color: #8BC441;
}

.login-button-text {
  font-weight: 600;
  font-size: 20px;
  color: #fff;
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  width: 100%;
  max-width: 353px;
}

.register-link a {
  color: #9DD549;
  text-decoration: none;
  margin-left: 5px;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>