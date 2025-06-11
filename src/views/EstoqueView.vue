<template>
  <div class="estoque-container">
    <!-- Cabeçalho -->
    <div class="header">
      <div class="back-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#000A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1>Gestão de estoque</h1>
    </div>

    <!-- Níveis de Estoque -->
    <div class="section">
      <div class="section-title">
        <h2>Níveis de Estoque</h2>
      </div>

      <!-- Botões de ação -->
      <div class="action-buttons">
        <button class="export-btn">
          <span>Filtro</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7H20M6.99994 12H16.9999M10.9999 17H12.9999" stroke="#454545" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="new-product-btn">
          <span>Novo Produto</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V18M18 12H6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Tabela de produtos -->
      <div class="table-container">
        <div class="table-header">
          <div class="header-row">
            <span class="col-produto">Produto</span>
            <span class="col-quant">Quant.</span>
            <span class="col-status">Status</span>
            <span class="col-min">Quant. Mínima</span>
            <span class="col-edit">Ações</span>
          </div>
        </div>
        
        <div class="table-body">
          <div class="product-row" v-for="(product, index) in products" :key="index">
            <span class="col-produto">{{ product.name }}</span>
            <span class="col-quant">{{ product.quantity }}</span>
            <span class="col-status" :class="getStatusClass(product.status)">{{ product.status }}</span>
            <span class="col-min">{{ product.minQuantity }}</span>
            <div class="col-edit action-icons">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M9 15V12.5L17.75 3.75C18.4404 3.05964 19.5596 3.05964 20.25 3.75V3.75C20.9404 4.44036 20.9404 5.55964 20.25 6.25L15.5 11L11.5 15H9Z" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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

    <!-- Histórico de Movimentação -->
    <div class="section">
      <div class="section-title">
        <h2>Histórico de Movimentação</h2>
      </div>

      <!-- Botões de histórico -->
      <div class="history-buttons">
        <button class="export-btn">
          <span>Filtro</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 7H20M6.99994 12H16.9999M10.9999 17H12.9999" stroke="#454545" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="update-history-btn">
          <span>Atualizar histórico</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6V18M18 12H6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Tabela de histórico -->
      <div class="table-container">
        <div class="history-header">
          <div class="header-row">
            <span class="col-data">Data</span>
            <span class="col-produto">Produto</span>
            <span class="col-tipo">Tipo</span>
            <span class="col-quant">Quant.</span>
            <span class="col-dest">Destinatário</span>
            <span class="col-edit">Ações</span>
          </div>
        </div>

        <div class="history-body">
          <div class="history-row" v-for="(item, index) in history" :key="'history-'+index">
            <span class="col-data">{{ item.date }}</span>
            <span class="col-produto">{{ item.product }}</span>
            <span class="col-tipo">{{ item.type }}</span>
            <span class="col-quant">{{ item.quantity }}</span>
            <span class="col-dest">{{ item.destination }}</span>
            <div class="col-edit action-icons">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M9 15V12.5L17.75 3.75C18.4404 3.05964 19.5596 3.05964 20.25 3.75V3.75C20.9404 4.44036 20.9404 5.55964 20.25 6.25L15.5 11L11.5 15H9Z" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="#737373" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

            <!-- Paginação do histórico -->
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
  <!-- Primeiro ícone SVG -->
  <div class="footer-icon">
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 22.1134V11.6366C24.9999 11.0109 24.8571 10.3934 24.5823 9.83089C24.3076 9.26838 23.9081 8.77563 23.4141 8.38997L14.6981 1.58458C14.2133 1.20581 13.6152 1 12.9993 1C12.3835 1 11.7854 1.20581 11.3005 1.58458L2.58448 8.38859C2.09062 8.77454 1.6913 9.26757 1.41677 9.83032C1.14225 10.3931 0.999723 11.0108 1 11.6366V22.1134C1 23.7079 2.29514 25 3.89339 25H9.36328V14.0517H16.6353V25H22.1052C22.8726 25 23.6086 24.6959 24.1512 24.1545C24.6938 23.6132 25 22.879 25 22.1134Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

  <!-- Segundo ícone SVG -->
  <div class="footer-icon">
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.7177 5.80456C24.0444 5.80456 25.12 4.72902 25.12 3.40228C25.12 2.07554 24.0444 1 22.7177 1C21.391 1 20.3154 2.07554 20.3154 3.40228C20.3154 4.72902 21.391 5.80456 22.7177 5.80456Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.3802 2.05249H7.29739C3.53382 2.05249 1.2002 4.71787 1.2002 8.48143V18.5825C1.2002 22.346 3.48807 25 7.29739 25H18.0504C21.814 25 24.1476 22.346 24.1476 18.5825V9.78552" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M6.78271 16.626L10.5234 11.7644L14.7903 15.1161L18.451 10.3916" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

  <!-- Ícone USUÁRIOS -->
  <div class="footer-icon active">
    <!-- Fundo oval SVG só quando ativo -->
    <div class="footer-bg">
      <svg width="62" height="40" viewBox="0 0 62 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 8.95431 8.9543 0 20 0H42C53.0457 0 62 8.95431 62 20C62 31.0457 53.0457 40 42 40H20C8.9543 40 0 31.0457 0 20Z" fill="white" fill-opacity="0.2"/>
      </svg>
    </div>
    <!-- Ícone usuários -->
    <img :src="require('@/assets/usuarios.png')" alt="Usuários icone" />
  </div>

  <!-- Ícone ESTOQUE -->
  <div class="footer-icon">
    <!-- Fundo oval SVG só quando ativo -->
    <div class="footer-bg">
      <!-- Este SVG só aparece se estiver com a classe 'active' -->
    </div>
<img :src="require('@/assets/estoque.png')" alt="Estoque icone" />
  </div>
</div>
</div>


</template>

<script>
import usuariosIcon from '@/assets/usuarios.png'
import estoqueIcon from '@/assets/estoque.png'

export default {
  data() {
    return {
      products: [
        { name: 'Produto 1', quantity: 50, status: 'Ok', minQuantity: 10 },
        { name: 'Produto 2', quantity: 50, status: 'Ok', minQuantity: 10 },
        { name: 'Produto 3', quantity: 8, status: 'Alerta', minQuantity: 10 },
        { name: 'Produto 4', quantity: 0, status: 'Falta', minQuantity: 10 }
      ],
      history: [
        { date: '00/00/00', product: 'Produto 1', type: 'Entrada', quantity: 50, destination: 'Empresa A' },
        { date: '00/00/00', product: 'Produto 2', type: 'Saída', quantity: 50, destination: 'Empresa B' },
        { date: '00/00/00', product: 'Produto 3', type: 'Entrada', quantity: 50, destination: 'Empresa C' },
        { date: '00/00/00', product: 'Produto 4', type: 'Saída', quantity: 50, destination: 'Empresa D' }
      ]
    }
  },
  methods: {
    getStatusClass(status) {
      return {
        'status-ok': status === 'Ok',
        'status-alerta': status === 'Alerta',
        'status-falta': status === 'Falta'
      }
    }
  }
}
</script>

<style scoped>
/* Estilos base */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.estoque-container {
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

.action-buttons, .history-buttons {
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

.new-product-btn, .update-history-btn {
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

.new-product-btn:hover, .update-history-btn:hover {
  background: #8bc441;
}

.new-product-btn span, .update-history-btn span {
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

.table-header, .history-header {
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
  text-align: center;
  padding: 0 10px;
}

.table-body, .history-body {
  background: #FFFFFF;
}

.product-row, .history-row {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.product-row:last-child, .history-row:last-child {
  border-bottom: none;
}

.product-row span, .history-row span {
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

.status-ok {
  background: #B2FFB4;
  border-radius: 6px;
  padding: 8px 12px;
  color: #0F9816 !important;
  display: inline-block;
  text-align: center;
}

.status-alerta {
  background: rgba(250, 243, 61, 0.48);
  border-radius: 6px;
  padding: 8px 12px;
  color: #E69800 !important;
  display: inline-block;
  text-align: center;
}

.status-falta {
  background: rgba(255, 178, 178, 0.82);
  border-radius: 6px;
  padding: 8px 12px;
  color: #E91000 !important;
  display: inline-block;
  text-align: center;
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

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #000; /* cor de fundo do rodapé */
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.footer-icon {
  position: relative;
  width: 62px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-icon svg,
.footer-icon img {
  position: relative;
  z-index: 2;
  width: 26px;
  height: 26px;
}

.footer-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: none;
}

.footer-icon.active .footer-bg {
  display: block;
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

/* Centralizar texto nas colunas da tabela */
.col-produto,
.col-quant,
.col-status,
.col-min,
.col-data,
.col-tipo,
.col-dest {
  text-align: center !important;
  display: flex;
  justify-content: center;
  align-items: center;
}



/* Classes para as colunas */
.col-produto { flex: 2; min-width: 200px; text-align: left; }
.col-quant { flex: 1; min-width: 80px;   text-align: center;}
.col-status { flex: 1; min-width: 100px;  text-align: center; }
.col-min { flex: 1; min-width: 120px;  text-align: center; }
.col-edit { flex: 1; min-width: 100px;  text-align: center; }
.col-data { flex: 1; min-width: 100px;   text-align: center;}
.col-tipo { flex: 1; min-width: 100px;   text-align: center;}
.col-dest { flex: 2; min-width: 180px;   text-align: center; }

/* Estilos para mobile */
@media (max-width: 768px) {
  .estoque-container {
    padding: 15px;
    padding-bottom: 80px;
  }
  
  .action-buttons, .history-buttons {
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
  
  .product-row, .history-row {
    display: flex;
    min-width: 700px;
  }
  
  .product-row span, .history-row span {
    text-align: center;
  }
  
  .col-produto, .col-dest {
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
  
  .status-ok, .status-alerta, .status-falta {
    padding: 6px 10px;
  }
}

/* Estilos para desktop */
@media (min-width: 769px) {
  .estoque-container {
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

/* Aplica centralização ao conteúdo das colunas das tabelas */
.table-container .header-row span,
.table-container .product-row span,
.table-container .history-header .header-row span,
.table-container .history-body .history-row span {
  text-align: center;
  display: inline-block;
  width: 100%;
}

/* Para as ações (ícones) também centralizarem */
.table-container .col-edit {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Garante centralização também em telas menores */
@media (max-width: 768px) {
  .table-container .header-row span,
  .table-container .product-row span,
  .table-container .history-header .header-row span,
  .table-container .history-body .history-row span {
    text-align: center;
  }
}


/* Centraliza conteúdo das colunas nas duas tabelas */
.table-header .header-row span,
.table-body .product-row span,
.history-header .header-row span,
.history-body .history-row span,
.col-edit {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .table-header .header-row span,
  .table-body .product-row span,
  .history-header .header-row span,
  .history-body .history-row span {
    text-align: center !important;
    justify-content: center;
  }
}


.table-header .header-row span,
.table-body .product-row span {
  width: 100px;           /* Defina uma largura fixa igual para header e body */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;             /* Remova padding que atrapalhe alinhamento */
  margin: 0;              /* Remova margem */
  box-sizing: border-box; /* Para evitar overflow na largura */
}

.historico-table .table-header .header-row span,
.historico-table .table-body .product-row span {
  width: 120px;  /* Mesma largura para a coluna data no header e no body */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.historico-table .table-header .header-row .col-data,
.historico-table .table-body .product-row .col-data {
  width: 120px;
}

.historico-table .table-header .header-row .col-acao,
.historico-table .table-body .product-row .col-acao {
  width: 150px;
}

.historico-table .table-header .header-row .col-valor,
.historico-table .table-body .product-row .col-valor {
  width: 100px;
}

.history-header .header-row span,
.history-body .history-row span {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.history-header .header-row {
  display: flex;
  padding: 10px 0;
  text-align: center;
}

.history-row span,
.history-header .header-row span {
  text-align: center;
  display: inline-block;
  width: 100%;
}

</style>

<style>
body {
  background-color: #f4ffec;
}
</style>
