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
/* Estilos base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.global-export-buttons {
  display: flex;
  justify-content: center;
  font-weight: bold;
  gap: 20px; /* Espaço entre os botões */
  margin: 30px 0; /* Espaço acima e abaixo */
}

.global-export-buttons button {
  background-color: #9dd549; /* Ou a mesma cor dos outros botões */
  color: white; /* Texto branco */
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.global-export-buttons button:hover {
  background-color: #9dd549; /* Cor de hover opcional */
}

.export-pdf,
.export-excel {
  color: white !important;
}


.usuarios-container {
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  background: #f4ffec;
  font-family: 'Inter', sans-serif;
  padding: 20px;
  padding-bottom: 80px;
  position: relative;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 15px;
}

.back-icon {
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.header h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #000000;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  margin: 30px 0 20px 0;
}

.section-title h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #4E4E4E;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.export-btn {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  gap: 8px;
  border: 1px solid #B0B0B0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn:hover {
  background: #f5f5f5;
}

.export-btn span {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #454545;
}

.new-user-btn {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  gap: 8px;
  background: #9DD549;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.new-user-btn:hover {
  background: #8bc441;
}

.new-user-btn span {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
}

/* Tabelas */
.table-container {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  margin: 0 auto;
}

.table-header {
  background: #EEEEEE;
  padding: 15px 20px;
}

.header-row {
  display: flex;
  width: 100%;
}

.header-row span {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #000000;
  padding: 0 10px;
  text-align: center;
}

.table-body {
  background: #FFFFFF;
}

.user-row {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.user-row:last-child {
  border-bottom: none;
}

.user-row span {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #333333;
  padding: 0 10px;
  text-align: center;
}

.action-icons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.action-icons svg {
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-icons svg:hover {
  opacity: 0.8;
}

/* Export buttons */
.export-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px;
}

.export-pdf,
.export-excel {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 10px;
  background: #9DD549;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-pdf:hover,
.export-excel:hover {
  background: #8bc441;
}

.export-pdf span,
.export-excel span {
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #FFFFFF;
}

/* Paginação */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  margin-top: 20px;
  width: 100%;
}

.page-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.page-info span {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  color: #737373;
}

.page-info span:first-child {
  font-weight: 700;
  color: #8B8D8A;
}

.page-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.page-controls span {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #454545;
}

.page-selector {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

.page-selector span {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #454545;
}

/* Rodapé */
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #9DD549;
  padding: 15px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;
  margin: 0 auto;
}

.footer-icon {
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.footer-icon:hover {
  opacity: 0.8;
}

/* Classes para as colunas */
.col-nome { flex: 2; min-width: 200px; text-align: center; }
.col-cnpj { flex: 1; min-width: 150px; text-align: center; }
.col-pagamento { flex: 1; min-width: 100px; text-align: center; }
.col-email { flex: 2; min-width: 200px; text-align: center; }
.col-abertura { flex: 1; min-width: 120px; text-align: center; }
.col-endereco { flex: 2; min-width: 200px; text-align: center; }
.col-placa { flex: 1; min-width: 120px; text-align: center; }
.col-senha { flex: 1; min-width: 150px; text-align: center; }
.col-acoes { flex: 1; min-width: 100px; text-align: center; }

/* Estilos para o campo de senha */
.col-senha input {
  border: none;
  background: transparent;
  width: 80px;
  text-align: center;
  pointer-events: none;
}

.col-senha button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}

/* Estilos para mobile */
@media (max-width: 768px) {
  .usuarios-container {
    padding: 15px;
    padding-bottom: 80px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .header-row {
    display: flex;
    min-width: 700px;
  }
  
  .user-row {
    display: flex;
    min-width: 700px;
  }
  
  .user-row span {
    text-align: center;
  }
  
  .action-icons {
    justify-content: center;
  }
  
  .pagination {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  .export-buttons {
    justify-content: center;
  }
}

/* Estilos para desktop */
@media (min-width: 769px) {
  .usuarios-container {
    padding: 30px;
    padding-bottom: 90px;
  }
  
  .table-container {
    border-radius: 12px;
  }
  
  .action-icons {
    justify-content: center;
  }
}

/* Centralização do conteúdo das tabelas */
.table-header .header-row span,
.table-body .user-row span {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* Garante centralização em telas menores */
@media (max-width: 768px) {
  .table-header .header-row span,
  .table-body .user-row span {
    text-align: center !important;
    justify-content: center;
  }
}
</style>

<style>
body {
  background-color: #f4ffec;
}
</style>