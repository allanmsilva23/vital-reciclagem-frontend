<template>
  <div class="container">
    <div class="top-bg">
      <img src="@/assets/logo.png" alt="Logo Vital Reciclagem" class="logo" />
    </div>
    <div class="vector-bg"></div>
    <div class="content">
      <h1 class="title">Explorar Vital Reciclagem</h1>
      <p class="subtitle">
        Cadastre sua empresa, acompanhe coletas de óleo e contribua para um futuro sustentável.
      </p>
      <button class="login-btn">Fazer login </button>
      <router-link to="/cadastro" class="register-btn">Criar conta</router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #F7FEF2;  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* fundo superior */
.top-bg {
  position: absolute;
  width: 100vw;
  height: 550px;
  top: -40px;
  left: 0;
  background-image: url('@/assets/bg-fundo.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 0;
}

.logo {
  position: absolute;
  width: 493px;
  height: 493px;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  object-fit: contain;
}

/* Conteúdo */
.content {
  position: absolute;
  top: 570px;
  width: 100%;
  max-width: 393px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding: 0 20px;
  z-index: 1;
}

.title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 130%;
  color: #4D3E3E;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 17px;
  font-weight: 400;
  line-height: 125%;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 40px;
}

/* Botões */
.login-btn {
  width: 100%;
  padding: 17px 0;
  background-color: #9DD549;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 16px;
  cursor: pointer;
}

.register-btn {
  display: block;
  width: 100%;
  padding: 17px 0;
  border: 1px solid #6BB200;
  border-radius: 10px;
  color: #6BB200;
  font-weight: 600;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}
</style>