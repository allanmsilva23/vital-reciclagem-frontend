<template>
  <div class="usuarios-container">
    <!-- Cabeçalho -->
    <div class="header">
      <div class="back-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#000A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1>Gerenciamento de usuários</h1>
    </div>

    
      <!-- Botões de ação -->
      <div class="action-buttons">
        <button class="export-btn">
          <span>Filtro</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7H20M6.99994 12H16.9999M10.9999 17H12.9999" stroke="#454545" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="new-user-btn">
          <span>Novo Usuário</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V18M18 12H6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

    <!-- Seção de Usuários -->
    <div class="section">
      <div class="section-title">
        <h2>Lista de Usuários</h2>
      </div>

      <div class="table-container">
      <div class="table-header">
        <div class="header-row">
          <span class="col-nome">Nome</span>
          <span class="col-cnpj">CNPJ</span>
          <span class="col-pagamento">Pagamento</span>
          <span class="col-email">Email</span>
          <span class="col-abertura">Data de Abertura</span>
          <span class="col-endereco">Endereço</span>
          <span class="col-acoes">Ações</span>
        </div>
      </div>
      <div class="table-body">
        <div class="user-row" v-for="(user, index) in users" :key="index">
          <span class="col-nome">{{ user.name }}</span>
          <span class="col-cnpj">{{ user.cnpj }}</span>
          <span class="col-pagamento">{{ user.payment }}</span>
          <span class="col-email">{{ user.email }}</span>
          <span class="col-abertura">{{ user.openingDate }}</span>
          <span class="col-endereco">{{ user.address }}</span>
          <div class="col-acoes action-icons">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M9 15V12.5L17.75 3.75C18.4404 3.05964 19.5596 3.05964 20.25 3.75V3.75C20.9404 4.44036 20.9404 5.55964 20.25 6.25L15.5 11L11.5 15H9Z" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </div>
        </div>
      </div>
    </div>

    

    <!-- Botões de exportação gerais -->
<div class="global-export-buttons">
  <button class="export-pdf">Gerar PDF</button>
  <button class="export-excel">Gerar Excel</button>
</div>

    <div class="section">
      <div class="section-title">
        <h2>Motoristas Cadastrados</h2>
      </div>
      <div class="action-buttons">
        <button class="export-btn">
          <span>Filtro</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7H20M6.99994 12H16.9999M10.9999 17H12.9999" stroke="#454545" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="new-user-btn">
          <span>Novo Motorista</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V18M18 12H6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="table-container">
        <div class="table-header">
          <div class="header-row">
            <span class="col-nome">Nome</span>
            <span class="col-email">Email</span>
            <span class="col-placa">Placa do Carro</span>
            <span class="col-senha">Senha</span>
            <span class="col-acoes">Ações</span>
          </div>
        </div>
        <div class="table-body">
          <div class="user-row" v-for="(driver, index) in drivers" :key="index">
            <span class="col-nome">{{ driver.name }}</span>
            <span class="col-email">{{ driver.email }}</span>
            <span class="col-placa">{{ driver.plate }}</span>
            <span class="col-senha">
              <input :type="driver.showPassword ? 'text' : 'password'" :value="driver.password" readonly />
              <button @click="driver.showPassword = !driver.showPassword">👁</button>
            </span>
            <div class="col-acoes action-icons">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M9 15V12.5L17.75 3.75C18.4404 3.05964 19.5596 3.05964 20.25 3.75V3.75C20.9404 4.44036 20.9404 5.55964 20.25 6.25L15.5 11L11.5 15H9Z" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
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
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.0002 14.6666L3.3335 6.33325H16.6668L10.0002 14.6666Z" fill="#454545"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Botões de exportação gerais -->
<div class="global-export-buttons">
  <button class="export-pdf">Gerar PDF</button>
  <button class="export-excel">Gerar Excel</button>
</div>

    <!-- Rodapé -->
    <div class="footer">
      <div class="footer-icon">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 22.1134V11.6366C24.9999 11.0109 24.8571 10.3934 24.5823 9.83089C24.3076 9.26838 23.9081 8.77563 23.4141 8.38997L14.6981 1.58458C14.2133 1.20581 13.6152 1 12.9993 1C12.3835 1 11.7854 1.20581 11.3005 1.58458L2.58448 8.38859C2.09062 8.77454 1.6913 9.26757 1.41677 9.83032C1.14225 10.3931 0.999723 11.0108 1 11.6366V22.1134C1 23.7079 2.29514 25 3.89339 25H9.36328V14.0517H16.6353V25H22.1052C22.8726 25 23.6086 24.6959 24.1512 24.1545C24.6938 23.6132 25 22.879 25 22.1134Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="footer-icon">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.7177 5.80456C24.0444 5.80456 25.12 4.72902 25.12 3.40228C25.12 2.07554 24.0444 1 22.7177 1C21.391 1 20.3154 2.07554 20.3154 3.40228C20.3154 4.72902 21.391 5.80456 22.7177 5.80456Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.3802 2.05249H7.29739C3.53382 2.05249 1.2002 4.71787 1.2002 8.48143V18.5825C1.2002 22.346 3.48807 25 7.29739 25H18.0504C21.814 25 24.1476 22.346 24.1476 18.5825V9.78552" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path opacity="0.4" d="M6.78271 16.626L10.5234 11.7644L14.7903 15.1161L18.451 10.3916" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import '@/css/TableClients.css';

export default {
  data() {
    return {
      users: [
        {
          name: 'Empresa A',
          cnpj: '12.345.678/0001-90',
          payment: 'Dinheiro',
          email: 'joao@empresa.com',
          openingDate: '10/05/2022',
          address: 'Rua A, 123 - São Paulo/SP'
        },
        {
          name: 'Empresa B',
          cnpj: '98.765.432/0001-21',
          payment: 'Produto',
          email: 'maria@empresa.com',
          openingDate: '15/03/2023',
          address: 'Av. B, 456 - Rio de Janeiro/RJ'
        },
        {
          name: 'Empresa C',
          cnpj: '11.223.344/0001-55',
          payment: 'Dinheiro',
          email: 'carlos@empresa.com',
          openingDate: '22/01/2023',
          address: 'Rua C, 789 - Belo Horizonte/MG'
        }
      ],
      drivers: [
        {
          name: 'Pedro',
          email: 'pedro@email.com',
          plate: 'ABC-1234',
          password: 'senha123',
          showPassword: false
        },
        {
          name: 'Ana Santos',
          email: 'ana@email.com',
          plate: 'XYZ-5678',
          password: 'minhasenha',
          showPassword: false
        },
        {
          name: 'Luiz Costa',
          email: 'luiz@email.com',
          plate: 'DEF-9012',
          password: '123456',
          showPassword: false
        }
      ]
    };
  },
  methods: {
    togglePassword(driver) {
      driver.showPassword = !driver.showPassword;
    }
  }
};
</script>
<style scoped>
@import '../css/TableClients.css';
</style>