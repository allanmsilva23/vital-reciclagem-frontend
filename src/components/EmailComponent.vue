<template>
  <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center;">
    <div class="modal" style="position: relative;">
      <h2 class="title" style="margin-bottom: 2rem;">Enviar E-mail</h2>

      <form @submit.prevent="sendEmail" style="width: 100%;">
        <label>
          Para:
          <input type="email" v-model="email.to" required />
        </label>

        <label>
          Assunto:
          <input type="text" v-model="email.subject" required />
        </label>

        <label>
          Mensagem:
          <textarea 
            v-model="email.message" 
            rows="6"
            class="mensagem-textarea"
            style="width: 100%; min-height: 120px; resize: vertical; border-radius: 8px; border: 1px solid #ccc; padding: 0.6rem; font-size: 1rem; background: #fff;"
            placeholder="Digite sua mensagem aqui..."
          ></textarea>
        </label>

        <label style="display: flex; flex-direction: column; gap: 0.5rem;">
          Anexar Arquivo:
          <div style="display: flex; align-items: center; gap: 10px;">
            <input 
              type="file" 
              @change="handleFileUpload" 
              ref="fileInput"
              style="flex: 1;"
            />
            <span v-if="fileName" class="file-name" style="font-size: 0.95em; color: #555;">
              {{ fileName }}
            </span>
            <button 
              type="button" 
              @click="clearFile" 
              v-if="fileName" 
              class="clear-file-btn" 
              style="background: #f8d7da; color: #d9534f; border: none; border-radius: 4px; padding: 2px 8px; cursor: pointer;"
              title="Remover arquivo"
            >X</button>
          </div>
        </label>

        <div v-if="statusMessage" :class="['messager-succes', statusType === 'success' ? 'success-message' : '']" style="margin-bottom: 1rem;">
          {{ statusMessage }}
        </div>

        <div class="actions">
          <button type="submit" :disabled="isSending">
            {{ isSending ? 'Enviando...' : 'Enviar E-mail' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import '../css/Component.css';

export default {
  name: 'EmailSender',
  data() {
    return {
      email: {
        to: '',
        subject: '',
        message: '',
        attachment: null
      },
      fileName: '',
      isSending: false,
      statusMessage: '',
      statusType: ''
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.email.attachment = file;
        this.fileName = file.name;
      } else {
        this.clearFile();
      }
    },
    clearFile() {
      this.email.attachment = null;
      this.fileName = '';
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },
    async sendEmail() {
      this.isSending = true;
      this.statusMessage = '';
      this.statusType = '';

      const formData = new FormData();
      formData.append('to', this.email.to);
      formData.append('subject', this.email.subject);
      formData.append('message', this.email.message);
      if (this.email.attachment) {
        formData.append('attachment', this.email.attachment);
      }

      try {
        const response = await axios.post(`${API_URL}/email/notify`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status >= 200 && response.status < 300) {
          this.statusMessage = response.data.message || 'E-mail enviado com sucesso!';
          this.statusType = 'success';
          this.resetForm();
        } else {
          this.statusMessage = response.data.message || 'Erro ao enviar o e-mail.';
          this.statusType = 'error';
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        if (axios.isAxiosError(error) && error.response) {
          this.statusMessage = error.response.data.error || 'Erro ao enviar o e-mail.';
          this.statusType = 'error';
        } else {
          this.statusMessage = 'Ocorreu um erro de conexão. Tente novamente.';
          this.statusType = 'error';
        }
      } finally {
        this.isSending = false;
      }
    },
    resetForm() {
      this.email = {
        to: '',
        subject: '',
        message: '',
        attachment: null
      };
      this.clearFile();
    }
  }
};
</script>
<style>
@import '../css/Component.css';
</style>