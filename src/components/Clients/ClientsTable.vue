<template>
  <div class="estoque-container">
    <!-- Cabeçalho -->
    <div class="header">
      <div class="back-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="#000A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <h1>Gestão de Clientes</h1>
    </div>

    <!-- Seção de clientes -->
    <div class="section">
      <div class="section-title">
        <h2>Clientes Cadastrados</h2>
      </div>

      <!-- Botões de ação -->
      <div class="action-buttons">
        <button class="export-btn">
          <span>Filtro</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20M6.99994 12H16.9999M10.9999 17H12.9999" stroke="#454545" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button class="new-product-btn" @click="openCreateModal">
          <span>Novo Cliente</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 6V18M18 12H6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <!-- Modais -->
      <ClientModal
        :visible="showCreateModal"
        title="Novo Cliente"
        confirmButtonText="Criar"
        @confirm="handleCreateClient"
        @close="closeCreateModal"
      />

      <ClientEdit
        v-if="editClient"
        :visible="!!editClient"
        :initialData="editClient"
        title="Editar Cliente"
        confirmButtonText="Salvar"
        @confirm="handleUpdateClient"
        @close="cancelEdit"
      />

      <DeleteClientModal
        :visible="showDeleteModal"
        :clientName="clientToDelete?.name"
        @close="showDeleteModal = false"
        @confirm="deleteClientConfirmed"
      />

      <!-- Tabela -->
      <div class="table-container">
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr class="header-row">
              <th class="col-nome">Nome</th>
              <th class="col-email">E-mail</th>
              <th class="col-address">Endereço</th>
              <th class="col-edit">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="clients.length === 0">
              <td colspan="4" class="text-center">Nenhum cliente encontrado</td>
            </tr>
            <tr v-for="client in clients" :key="client.id" class="product-row">
              <td class="col-nome">
                {{ client.name || 'Sem nome' }}
              </td>
              <td class="col-email">
                {{ client.email || '-' }}
              </td>
              <td class="col-address">
                {{ client.address || '-' }}
              </td>
            <td class="col-edit">
    <div class="action-buttons">
      <button @click="startEdit(client)" class="btn-icon" title="Editar">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z" fill="#718096"/>
          <path d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" fill="#718096"/>
        </svg>
      </button>
      <button @click="deleteClient(client.id)" class="btn-icon" title="Excluir">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 7V16C5 17.1046 5.89543 18 7 18H13C14.1046 18 15 17.1046 15 16V7" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 7V5C8 3.89543 8.89543 3 10 3H10.5C11.6046 3 12.5 3.89543 12.5 5V7" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 7H18" stroke="#718096" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginação -->
      <div class="pagination">
        <div class="page-info">
          <span>1</span>
          <span>-</span>
          <span>1</span>
          <span>de 10 páginas</span>
        </div>
        <div class="page-controls">
          <span>Página</span>
          <div class="page-selector">
            <span>1</span>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
              <path d="M10.0002 14.6666L3.3335 6.33325H16.6668L10.0002 14.6666Z" fill="#454545" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Botões de exportação -->
    <div class="global-export-buttons">
      <button class="export-pdf">Gerar PDF</button>
      <button class="export-excel">Gerar Excel</button>
    </div>

    <!-- Rodapé -->
    <div class="footer">
      <div class="footer-icon">
        <router-link to="/">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M25 22.1134V11.6366C24.9999 11.0109 24.8571 10.3934 24.5823 9.83089C24.3076 9.26838 23.9081 8.77563 23.4141 8.38997L14.6981 1.58458C14.2133 1.20581 13.6152 1 12.9993 1C12.3835 1 11.7854 1.20581 11.3005 1.58458L2.58448 8.38859C2.09062 8.77454 1.6913 9.26757 1.41677 9.83032C1.14225 10.3931 0.999723 11.0108 1 11.6366V22.1134C1 23.7079 2.29514 25 3.89339 25H9.36328V14.0517H16.6353V25H22.1052C22.8726 25 23.6086 24.6959 24.1512 24.1545C24.6938 23.6132 25 22.879 25 22.1134Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </router-link>
      </div>
      <div class="footer-icon">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M22.7177 5.80456C24.0444 5.80456 25.12 4.72902 25.12 3.40228C25.12 2.07554 24.0444 1 22.7177 1C21.391 1 20.3154 2.07554 20.3154 3.40228C20.3154 4.72902 21.391 5.80456 22.7177 5.80456Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16.3802 2.05249H7.29739C3.53382 2.05249 1.2002 4.71787 1.2002 8.48143V18.5825C1.2002 22.346 3.48807 25 7.29739 25H18.0504C21.814 25 24.1476 22.346 24.1476 18.5825V9.78552" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path opacity="0.4" d="M6.78271 16.626L10.5234 11.7644L14.7903 15.1161L18.451 10.3916" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </div>
</template>


<script>
import ClientModal from '@/components/Clients/ClientModal.vue';
import ClientEdit from '@/components/Clients/ClientEdit.vue';
import DeleteClientModal from '@/components/Clients/ClientDelete.vue';
import '@/css/TableClients.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default {
  components: {
    ClientModal,
    DeleteClientModal,
    ClientEdit
  },
  data() {
    return {
      clients: [],
      showCreateModal: false,
      editClient: null,
      showDeleteModal: false,
      clientToDelete: null
    };
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
      } catch (e) {
        return dateString;
      }
    },

    openCreateModal() {
      this.showCreateModal = true;
    },

    closeCreateModal() {
      this.showCreateModal = false;
    },

    async fetchClients() {
      try {
        const res = await axios.get(`${API_URL}/clients`);
        console.log('Resposta da API:', res.data);
        let data = [];

        if (Array.isArray(res.data.clients)) {
          data = res.data.clients;
        } else if (Array.isArray(res.data.data)) {
          data = res.data.data;
        } else if (res.data.items) {
          data = res.data.items;
        } else if (Array.isArray(res.data)) {
          data = res.data;
        } else {
          console.warn('Estrutura de dados inesperada:', res.data);
        }

        this.clients = data.map(item => ({
          id: item.id || item._id,
          name: item.name || 'Sem nome',
          email: item.email || '',
          cnpj: item.cnpj || '',
          address: item.address || '',
          opening_date: item.opening_date || null,
          payment_method: item.payment_method || ''
        }));
      } catch (e) {
        console.error('Erro ao buscar clientes:', e);
        this.clients = [];
      }
    },

    async handleCreateClient(formData) {
      try {
        const payload = {
          name: formData.name,
          email: formData.email || '',
          password: formData.password,
          cnpj: formData.cnpj || '',
          address: formData.address || '',
          payment_method: formData.payment_method,
          opening_date: formData.opening_date
        };

        const response = await axios.post(`${API_URL}/clients/`, payload);

        if (response.status === 201) {
          this.fetchClients();
          this.closeCreateModal();
          this.$toast.success('Cliente criado com sucesso!');
        } else {
          throw new Error(response?.data?.error || 'Erro desconhecido');
        }
      } catch (error) {
        console.error('Erro ao criar cliente:', error);

        let errorMessage = 'Erro ao criar cliente';

        if (error.response) {
          errorMessage = error.response.data?.message || error.response.data?.error || error.response.statusText;
        } else if (error.request) {
          errorMessage = 'Sem resposta do servidor';
        } else {
          errorMessage = error.message;
        }

        this.$toast.error(`Falha: ${errorMessage}`);
      }
    },

 async handleUpdateClient(formData) {
  try {
    await axios.put(`${API_URL}/clients/${formData.id}`, {
      name: formData.name,
      email: formData.email,
      cnpj: formData.cnpj,
      address: formData.address,
      payment_method: formData.payment_method,
      opening_date: formData.opening_date
    });

    this.fetchClients();     
    this.cancelEdit();     

    this.$toast?.success?.('Cliente atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    this.$toast?.error?.('Erro ao atualizar cliente');
  }
},

    async deleteClient(id) {
      this.clientToDelete = this.clients.find(c => c.id === id);
      this.showDeleteModal = true;
    },

    async deleteClientConfirmed() {
      if (!this.clientToDelete) return;
      try {
        await axios.delete(`${API_URL}/clients/${this.clientToDelete.id}`);
        this.fetchClients();
        this.showDeleteModal = false;
        this.clientToDelete = null;
        this.$toast.success('Cliente deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        this.showDeleteModal = false;
        this.clientToDelete = null;
        this.$toast.error('Erro ao deletar cliente.');
      }
    },

      startEdit(client) {
        const [day, month, year] = client.opening_date.split('/');
        this.editClient = {
          ...client,
          opening_date: `${year.length === 2 ? '20' + year : year}-${month}-${day}`
        };
      },
    cancelEdit() {
      this.editClient = null;
    }
  }
};
</script>

<style>
@import '@/css/TableStock.css'
</style>