<template>
  <div class="cadastro-container">
    <button class="back-button" @click="voltar">
      <svg class="back-icon" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </button>

    <div class="form-container">
      <h1 class="title">Cadastro de Administrador</h1>

      <form @submit.prevent="criarConta" style="width: 100%;">
        <div class="input-group">
          <label for="admin-nome">Nome</label>
          <input id="admin-nome" type="text" placeholder="Nome do administrador" v-model="admin.name" required />
        </div>

        <div class="input-group">
          <label for="admin-email">Email</label>
          <input id="admin-email" type="email" placeholder="Email do administrador" v-model="admin.email" required />
        </div>

        <div class="input-group password-input">
          <label for="admin-senha">Senha</label>
          <input
            id="admin-senha"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Senha"
            v-model="admin.password"
            required
          />
          <button class="toggle-password" @click.prevent="togglePassword" tabindex="-1" type="button">
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

        <div class="input-group">
          <label for="admin-level">Nível de Administrador</label>
          <select id="admin-level" v-model="admin.level" required>
            <option disabled value="">Selecione o nível</option>
            <option value= "MASTER" >Master</option>
            <option value= "PLENO" >Pleno</option>
            <option value= "JUNIOR" >Junior</option>
          </select>
        </div>

        <div class="terms-checkbox">
          <input type="checkbox" id="terms" v-model="aceitouTermos" class="custom-checkbox">
          <label for="terms">Aceito os termos e as políticas de privacidade</label>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="actions">
          <button type="submit" class="create-account-button" :disabled="loading">
            {{ loading ? 'Carregando...' : 'Criar conta' }}
          </button>
        </div>
      </form>

      <div class="login-link">
        <span>Já tem uma conta?</span>
        <router-link to="/login-admin">Fazer login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import '../../css/Cadastro.css';

export default {
  name: 'CadastroAdminView',
  data() {
    return {
      showPassword: false,
      aceitouTermos: false,
      admin: {
        name: '',  
        email: '',
        password: '',
        level: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    async criarConta() {
      if (!this.aceitouTermos) {
        this.error = 'Você deve aceitar os termos de uso';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post(`${API_URL}/admin/`, this.admin, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Cadastro realizado com sucesso:', response.data);
        this.$router.push('/login-admin'); 
      } catch (error) {
        console.error('Erro no cadastro:', error);
        if (error.response) {
          if (error.response.status === 400) {
            this.error = error.response.data.error || 'Dados inválidos. Verifique os campos.';
          }
        } else if (error.message) {
          this.error = error.message;
        } else {
          this.error = 'Erro ao conectar com o servidor';
        }
      } finally {
        this.loading = false;
      }
    },
    voltar() {
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped>
@import '../../css/Cadastro.css';
</style>