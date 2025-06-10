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

    <!-- Tabela de usuários -->
    <div class="table-header">
      <div class="header-row">
        <span>Nome</span>
        <span>Email</span>
        <span>Perfil</span>
        <span>Status</span>
        <span>Ações</span>
      </div>
    </div>
    
    <div class="table-body">
      <div class="user-row" v-for="(user, index) in users" :key="index">
        <span>{{ user.name }}</span>
        <span>{{ user.email }}</span>
        <span>{{ user.role }}</span>
        <span :class="{'status-active': user.active, 'status-inactive': !user.active}">
          {{ user.active ? 'Ativo' : 'Inativo' }}
        </span>
        <div class="action-icons">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M9 15V12.5L17.75 3.75C18.4404 3.05964 19.5596 3.05964 20.25 3.75V3.75C20.9404 4.44036 20.9404 5.55964 20.25 6.25L15.5 11L11.5 15H9Z" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <div class="pagination">
      <div class="page-info">
        <span>1</span>
        <span>-</span>
        <span>10</span>
        <span>of 13 Pages</span>
      </div>
      <div class="page-controls">
        <span>The page on</span>
        <div class="page-selector">
          <span>1</span>
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0002 14.6666L3.3335 6.33325H16.6668L10.0002 14.6666Z" fill="#454545"/>
          </svg>
        </div>
      </div>
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
        { name: 'João Silva', email: 'joao@empresa.com', role: 'Administrador', active: true },
        { name: 'Maria Souza', email: 'maria@empresa.com', role: 'Gerente', active: true },
        { name: 'Carlos Oliveira', email: 'carlos@empresa.com', role: 'Operador', active: false },
        { name: 'Ana Pereira', email: 'ana@empresa.com', role: 'Analista', active: true }
      ]
    }
  }
}
</script>

<style scoped>
.usuarios-container {
  width: 100%;
  height: 100vh;
  background: #F5FFED;
  font-family: 'Inter', sans-serif;
  padding: 20px;
  overflow-y: auto;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.back-icon {
  margin-right: 20px;
  cursor: pointer;
}

.header h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #000000;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.export-btn {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 6px;
  border: 1px solid #B0B0B0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
}

.export-btn span {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #454545;
}

.new-user-btn {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 6px;
  background: #9DD549;
  border-radius: 12px;
  border: none;
  cursor: pointer;
}

.new-user-btn span {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
}

.table-header {
  background: #EEEEEE;
  border-radius: 8px 8px 0 0;
  padding: 20px 15px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.header-row span {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
  text-align: center;
  flex: 1;
}

.table-body {
  background: #FFFFFF;
  border-radius: 0 0 8px 8px;
}

.user-row {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #CACACA;
}

.user-row span {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
  text-align: center;
  flex: 1;
}

.action-icons {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex: 1;
}

.status-active {
  background: #B2FFB4;
  border-radius: 4px;
  padding: 10px;
  color: #0F9816 !important;
}

.status-inactive {
  background: rgba(255, 178, 178, 0.82);
  border-radius: 4px;
  padding: 10px;
  color: #E91000 !important;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-top: 20px;
}

.page-info {
  display: flex;
  align-items: flex-start;
  gap: 3px;
}

.page-info span {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #737373;
}

.page-info span:first-child {
  font-weight: 700;
  color: #8B8D8A;
}

.page-controls {
  display: flex;
  align-items: center;
  gap: 13px;
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
  padding: 4px 8px;
  gap: 2px;
  border: 1px solid #B0B0B0;
  border-radius: 8px;
}

.page-selector span {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #454545;
}

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #9DD549;
  border-radius: 0 0 50px 50px;
  padding: 15px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.footer-icon {
  padding: 8px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .header-row, .user-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-row span, .user-row span {
    text-align: left;
    margin-bottom: 5px;
    flex: none;
    width: 100%;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 10px;
  }
  
  .pagination {
    flex-direction: column;
    gap: 10px;
  }
}
</style>