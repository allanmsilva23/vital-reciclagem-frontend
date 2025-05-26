<template>
  <div class="cadastro-container">
    <!-- Botão de voltar -->
    <button class="back-button" @click="voltar">
      <svg class="back-icon" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </button>

    <!-- Formulário de cadastro -->
    <div class="form-container">
      <div class="input-group">
        <label>Nome da empresa</label>
        <input type="text" placeholder="Nome da empresa" v-model="empresa.name">
      </div>

      <div class="input-group">
        <label>Email</label>
        <input type="email" placeholder="Email da empresa" v-model="empresa.email">
      </div>

      <div class="input-group">
        <label>Senha</label>
        <div class="password-input">
          <input :type="showPassword ? 'text' : 'password'" placeholder="Senha" v-model="empresa.password">
          <button class="toggle-password" @click.prevent="togglePassword">
            <svg class="eye-icon" viewBox="0 0 24 24">
              <path v-if="showPassword" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              <path v-else d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="input-group select-container">
        <label>Tipo de pagamento</label>
        <div class="select-wrapper">
          <select v-model="empresa.payment_method">
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao">Cartão</option>
            <option value="pix">PIX</option>
            <option value="produto">Produto</option>
          </select>
          <svg class="custom-select-icon" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>

      <div class="input-group">
        <label>CNPJ</label>
        <input type="text" placeholder="CNPJ válido da empresa" v-model="empresa.cnpj">
      </div>

      <div class="input-group">
        <label>Data de abertura da empresa</label>
        <input type="text" placeholder="DD/MM/AAAA" v-model="empresa.opening_date">
      </div>

      <div class="input-group">
        <label>Endereço</label>
        <input type="text" placeholder="Endereço da empresa" v-model="empresa.address">
      </div>

      <div class="terms-checkbox">
        <input type="checkbox" id="terms" v-model="aceitouTermos" class="custom-checkbox">
        <label for="terms">Aceito os termos e as políticas de privacidade</label>
      </div>

      <button class="create-account-button" @click="criarConta">Criar conta</button>

      <div class="login-link">
        <span>Já tem uma conta?</span>
        <router-link to="/login">Fazer login</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'CadastroView',
  data() {
    return {
      showPassword: false,
      aceitouTermos: false,
      empresa: {
        name: '',  
        email: '',
        password: '',  
        payment_method: 'dinheiro', 
        cnpj: '',
        opening_date: '',  
        address: ''  
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
        if (!this.empresa.opening_date) {
          throw new Error('Data de abertura é obrigatória');
        }

        const dadosParaEnviar = {
          ...this.empresa,
          opening_date: this.formatarData(this.empresa.opening_date)
        };

        const response = await axios.post('http://127.0.0.1:5000/clients', dadosParaEnviar, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Cadastro realizado com sucesso:', response.data);
        this.$router.push('/login'); 
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
    formatarData(data) {
      if (!data) return '';
      const [dd, mm, yyyy] = data.split('/');
      return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    },
    voltar() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
/* Reset e estilos base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  overflow-x: hidden;
  width: 100%;
}

.cadastro-container {
  position: fixed;
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background: linear-gradient(169.23deg, #FBFFF5 1.56%, #F1FFDC 97.1%);
  font-family: 'Inter', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Container do formulário */
.form-container {
  width: 100%;
  max-width: 393px;
  margin: 60px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Botão de voltar */
.back-button {
  position: fixed;
  width: 39px;
  height: 39px;
  left: 20px;
  top: 50px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2;
}

.back-icon {
  width: 24px;
  height: 24px;
  fill: #000000;
}

/* Grupos de input */
.input-group {
  margin-bottom: 20px;
  width: 100%;
  max-width: 353px;
}

.input-group label {
  display: block;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #000000;
  margin-bottom: 6px;
}

.input-group input,
.input-group select {
  width: 100%;
  height: 45px;
  padding: 18px 16px;
  background: #FFFFFF;
  border: 1px solid #D8DADC;
  border-radius: 10px;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  line-height: 125%;
  color: rgba(0, 0, 0, 0.5);
  appearance: none;
}

.input-group input::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

/* Campo de senha */
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
  padding: 0;
  width: 24px;
  height: 24px;
}

.eye-icon {
  width: 24px;
  height: 24px;
  fill: rgba(0, 0, 0, 0.6);
}

/* Select com ícone */
.select-container {
  position: relative;
  width: 100%;
  max-width: 353px;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  appearance: none;
  width: 100%;
  height: 45px;
  padding: 10px 40px 10px 16px;
  background: #fff;
  border: 1px solid #D8DADC;
  border-radius: 10px;
  font-family: 'Inter';
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
}

.select-wrapper select:focus {
  outline: none;
  border: 2px solid #FFA500; /* laranja */
}

.select-pagamento {
  color: D8DADC; /* mesma cor dos inputs */
}

.select-pagamento option {
  color: D8DADC;
}



.custom-select-icon {
  position: absolute;
  pointer-events: none;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  fill: rgba(0, 0, 0, 0.4);
}

.input-group input:focus {
  outline: none;
  border: 2px solid #FFA500;
}



/* Checkbox de termos */
.terms-checkbox {
  display: flex;
  align-items: center;
  margin: 20px 0;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: #000000;
  cursor: pointer;
  width: 100%;
  max-width: 353px;
}

.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #D8DADC;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.custom-checkbox:checked {
  background-color: #9DD549;
  border-color: #9DD549;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Botão de criar conta */
.create-account-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 353px;
  height: 56px;
  background: #9DD549;
  border-radius: 10px;
  border: none;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 20px;
  line-height: 125%;
  color: #FFFFFF;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.2s ease;
}

.create-account-button:hover {
  background-color: #8BC441;
}

/* Link para login */
.login-link {
  text-align: center;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 125%;
  color: rgba(0, 0, 0, 0.7);
  width: 100%;
  max-width: 353px;
}

.login-link a {
  color: #9DD549;
  text-decoration: none;
  margin-left: 5px;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}

/* Responsividade */
@media (max-width: 480px) {
  .back-button {
    left: 15px;
    top: 40px;
  }
  
  .form-container {
    padding: 0 15px;
    margin-top: 50px;
  }
}
</style>