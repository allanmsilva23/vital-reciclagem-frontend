<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
    <div class="modal" >
      <button class="back-button" @click="voltar" style="position: absolute; left: -50px; top: 10px;">
        <svg class="back-icon" viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>

      <h1 class="title" style="margin-bottom: 2rem;">Login</h1>

      <form @submit.prevent="fazerLogin">
        <label>
          Email
          <input 
            type="email" 
            placeholder="Digite seu email" 
            v-model="credenciais.email"
            :disabled="loading"
            required
          />
        </label>

        <label>
          Senha
          <div style="position: relative;">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Digite sua senha" 
              v-model="credenciais.senha"
              :disabled="loading"
              required
              style="padding-right: 40px;"
            />
            <button 
              class="toggle-password" 
              @click.prevent="togglePassword"
              :disabled="loading"
              style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;"
              tabindex="-1"
              type="button"
            >
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
        </label>

        <div v-if="errorMessage" class="error-message" style="margin-bottom: 1rem;">
          {{ errorMessage }}
        </div>

        <router-link 
          to="/recuperar-senha" 
          class="forgot-password"
          :class="{ 'disabled-link': loading }"
          style="display: block; text-align: right; margin-bottom: 1.5rem;"
        >
          Esqueceu a senha?
        </router-link>

        <div class="actions">
          <button 
            type="submit"
            :disabled="loading"
          >
            {{ loading ? 'Carregando...' : 'Fazer Login' }}
          </button>
        </div>
      </form>

      <div class="link" style="margin-top: 1.5rem;">
        <span>Não tem conta?</span>
        <router-link 
          to="/cadastro"
          :class="{ 'disabled-link': loading }"
        >
          Criar conta
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import '../css/style.css'

const API_URL = import.meta.env.VITE_API_URL;

const credenciais = reactive({
  email: '',
  senha: ''
})

const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()

function togglePassword() {
  showPassword.value = !showPassword.value
}

function voltar() {
  router.back()
}

async function fazerLogin() {
  if (!credenciais.email || !credenciais.senha) {
    errorMessage.value = 'Preencha todos os campos!'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(`${API_URL}/clients/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credenciais.email,
        password: credenciais.senha
      }),
      credentials: 'include' // Para lidar com cookies se necessário
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao fazer login')
    }

    // Armazena os dados do usuário
    localStorage.setItem('client', JSON.stringify(data.client))
    router.push('/dashboard')
    
  } catch (error) {
    errorMessage.value = error.message || 'Credenciais inválidas'
    console.error('Erro no login:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import '../css/style.css'

</style>