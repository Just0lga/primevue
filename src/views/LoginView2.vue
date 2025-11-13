<template>
  <div class="login-container">
    <Card class="login-card">
      <template #content>
        <div class="logo-section">
          <img src="/src/assets/logo.png" alt="logo" class="logo" />
          <h2 class="welcome-text">Uygulamamıza Hoşgeldiniz</h2>
        </div>

        <div class="form-section">
          <div class="field">
            <label for="user-number">Kullanıcı Numarası</label>
            <InputText
              id="user-number"
              v-model="userNumber"
              placeholder="Kullanıcı numaranızı girin"
            />
          </div>

          <div class="field">
            <label for="username">Kullanıcı Adı</label>
            <InputText
              id="username"
              v-model="username"
              placeholder="Kullanıcı adınızı girin"
            />
          </div>

          <div class="field">
            <label for="password">Kullanıcı Şifresi</label>
            <Password
              id="password"
              v-model="password"
              placeholder="Parolanızı girin"
              toggleMask
              :feedback="false"
            />
          </div>

          <Button
            label="Giriş Yap"
            class="login-button"
            @click="handleLogin"
            icon="pi pi-sign-in"
          />

          <div class="forgot-password">
            <a href="#" class="forgot-link">Parolanızı mı unuttunuz?</a>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";

const router = useRouter();
const userNumber = ref("");
const username = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("Giriş yapılıyor");
  router.push("/about");
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: whitesmoke;
}

.login-card {
  width: 100%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(40px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  height: 130px;
  margin-bottom: 1rem;
}

.welcome-text {
  font-size: 1.3rem;
  font-weight: 400;
  color: #004456;
  margin: 0;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: #004456;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-weight: 300;
  color: #004456;
  font-size: 0.85rem;
}

:deep(.p-inputtext),
:deep(.p-password-input) {
  background-color: rgba(255, 255, 255, 0);
  color: #004456;
  border: 0.5px solid #004456;
  border-radius: 16px;
  width: 100%;
  height: 40px;
  padding: 0 12px;
}

:deep(.p-inputtext::placeholder),
:deep(.p-password-input::placeholder) {
  color: #004456;
  opacity: 1;
}

:deep(.p-inputtext:hover),
:deep(.p-password-input:hover) {
  border-color: #007b8f !important;
  box-shadow: 0 0 5px rgba(0, 123, 143, 0.3) !important;
  transition: all 0.3s ease;
}

:deep(.p-inputtext:focus),
:deep(.p-password-input:focus) {
  border-color: #007b8f !important;
  box-shadow: 0 0 5px rgba(0, 123, 143, 0.3) !important;
  transition: all 0.3s ease;
}

.login-button {
  margin-top: 0.5rem;
  height: 40px;
  font-size: 1rem;
  background-color: #004456;
  border: none;
  border-radius: 16px;
  color: white;
  width: 100%;
}

:deep(.login-button:hover) {
  background-color: white !important;
  color: #004456 !important;
  box-shadow: 0 0 5px rgba(0, 123, 143, 0.3) !important;
  border: none !important;
  transition: all 0.3s ease;
}

.forgot-password {
  text-align: center;
}

.forgot-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-card {
    max-width: 100%;
  }

  .welcome-text {
    font-size: 1.25rem;
  }
}
</style>
