<template>
  <div class="clientes-container">
    <h2>Lista de Clientes</h2>
    <div v-if="clientes.length === 0 && !loading" class="no-data">
      Nenhum cliente cadastrado
    </div>

    <div class="table-container" v-if="clientes.length > 0">
      <table class="clientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CNPJ</th>
            <th>Forma de Pagamento</th>
            <th>Data de Abertura</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.name }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ formatarCNPJ(cliente.cnpj) }}</td>
            <td>{{ formatarPagamento(cliente.payment_method) }}</td>
            <td>{{ formatarData(cliente.opening_date) }}</td>
            <td>{{ cliente.address }}</td>
            <td class="actions">
              <button @click="confirmarExclusao(cliente.id)" class="delete-btn">
                <svg class="trash-icon" viewBox="0 0 24 24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Confirmação -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Confirmar Exclusão</h3>
          <button @click="showModal = false" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p>Tem certeza que deseja excluir este cliente?</p>
        </div>
        <div class="modal-footer">
          <button @click="showModal = false" class="cancel-btn">Cancelar</button>
          <button @click="excluirCliente" class="confirm-delete-btn">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListaClientes',
  data() {
    return {
      clientes: [],
      loading: true,
      error: null,
      showModal: false,
      clienteParaExcluir: null
    }
  },
  async created() {
    await this.carregarClientes();
  },
  methods: {
    async carregarClientes() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/clients');
        this.clientes = response.data.clients || [];
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        this.error = this.tratarErro(error);
      } finally {
        this.loading = false;
      }
    },
    
    confirmarExclusao(id) {
      this.clienteParaExcluir = id;
      this.showModal = true;
    },
    
async excluirCliente() {
  try {
    await axios.delete(`http://127.0.0.1:5000/clients/${this.clienteParaExcluir}`);
    this.showModal = false;
    this.$toast.success('Cliente excluído com sucesso!');
    await this.carregarClientes(); // ⬅️ AQUI OCORRE O RELOAD
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
    this.$toast.error(this.tratarErro(error));
  }
},

async carregarClientes() {
  try {
    const response = await axios.get('http://127.0.0.1:5000/clients');
    this.clientes = response.data.clients || [];
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
    this.error = this.tratarErro(error);
  }
},
    
    tratarErro(error) {
      if (error.response) {
        switch (error.response.status) {
          case 404: return 'Cliente não encontrado';
          case 500: return 'Erro no servidor';
          default: return error.response.data.message || `Erro ${error.response.status}`;
        }
      }
      return error.message || 'Erro desconhecido';
    },
    
    formatarData(data) {
      if (!data) return 'N/A';
      // Converte de DD/MM/YYYY para o formato desejado ou mantém o formato
      return data.includes('/') ? data : new Date(data).toLocaleDateString('pt-BR');
    },
    
    formatarCNPJ(cnpj) {
      if (!cnpj) return 'N/A';
      return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    },
    
    formatarPagamento(metodo) {
      const metodos = {
        'dinheiro': 'Dinheiro',
        'cartao': 'Cartão',
        'pix': 'PIX'
      };
      return metodos[metodo] || metodo;
    }
  }
}
</script>

<style scoped>
.clientes-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.loading, .error, .no-data {
  padding: 15px;
  margin: 10px 0;
  border-radius: 4px;
  text-align: center;
}

.loading {
  background-color: #e3f2fd;
  color: #1976d2;
}

.error {
  background-color: #ffebee;
  color: #d32f2f;
}

.no-data {
  background-color: #f5f5f5;
  color: #757575;
}

.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

.clientes-table {
  width: 100%;
  border-collapse: collapse;
}

.clientes-table th, .clientes-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.clientes-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.clientes-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.clientes-table tr:hover {
  background-color: #f1f1f1;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #f44336;
  padding: 5px;
  display: flex;
  align-items: center;
}

.delete-btn:hover {
  color: #d32f2f;
}

.trash-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* Estilos do Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 16px;
}

.modal-footer {
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-delete-btn {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-delete-btn:hover {
  background-color: #d32f2f;
}
</style>