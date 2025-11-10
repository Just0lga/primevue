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
              class="w-full"
            />
          </div>

          <div class="field">
            <label for="username">Kullanıcı Adı</label>
            <InputText
              id="username"
              v-model="username"
              placeholder="Kullanıcı adınızı girin"
              class="w-full"
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
              class="w-full"
            />
          </div>

          <Button
            label="Giriş Yap"
            class="login-button w-full"
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  height: 80px;
  margin-bottom: 1rem;
}

.welcome-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.95rem;
}

.login-button {
  margin-top: 0.5rem;
  height: 48px;
  font-size: 1rem;
}

.forgot-password {
  text-align: center;
  margin-top: 0.5rem;
}

.forgot-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .login-card {
    max-width: 100%;
  }

  .welcome-text {
    font-size: 1.25rem;
  }
}
</style>
