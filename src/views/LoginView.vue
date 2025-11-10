<template>
  <div
    class="flex flex-column align-items-center justify-content-center min-h-screen"
    style="background: url('/assets/e.jpg') center/cover no-repeat"
  >
    <Card
      class="shadow-4 p-4 w-full md:w-30rem text-center"
      style="border-radius: 1rem"
    >
      <template #title>
        <img src="/assets/logo.png" alt="logo" class="h-6rem mb-3" />
        <h2 class="text-primary">Uygulamamıza Hoşgeldiniz</h2>
      </template>

      <template #content>
        <div class="flex flex-column gap-3">
          <div class="flex flex-column align-items-start">
            <label for="user-number">Kullanıcı Numarası</label>
            <InputText
              id="user-number"
              v-model="userNumber"
              placeholder="Kullanıcı numaranızı girin"
              class="w-full"
            />
          </div>

          <div class="flex flex-column align-items-start">
            <label for="username">Kullanıcı Adı</label>
            <InputText
              id="username"
              v-model="username"
              placeholder="Kullanıcı adınızı girin"
              class="w-full"
            />
          </div>

          <div class="flex flex-column align-items-start">
            <label for="password">Kullanıcı Şifresi</label>
            <Password
              id="password"
              v-model="password"
              placeholder="Parolanızı girin"
              :feedback="false"
              toggleMask
              class="w-full"
            />
          </div>

          <Button label="Giriş Yap" class="w-full mt-3" @click="handleLogin" />
        </div>

        <div class="mt-3">
          <a href="#" class="text-sm text-primary hover:underline"
            >Parolanızı mı unuttunuz?</a
          >
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
