<template>
  <div class="flex">
    <Sidebar v-model:visible="sidebarVisible" position="left" showCloseIcon>
      <h3 class="mb-3">Menü</h3>
      <PanelMenu :model="menus" />
    </Sidebar>

    <div class="flex flex-column w-full p-4">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2>Hoşgeldiniz Tolga Küçükaşçı</h2>

        <div class="flex align-items-center gap-2">
          <Dropdown
            v-model="theme"
            :options="themes"
            optionLabel="label"
            optionValue="value"
            placeholder="Tema Seç"
          />
          <Button icon="pi pi-sign-out" @click="handleLogOut" />
        </div>
      </div>

      <Button
        icon="pi pi-bars"
        label="Menüyü Aç"
        @click="sidebarVisible = true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "primevue/sidebar";
import PanelMenu from "primevue/panelmenu";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { useRouter } from "vue-router";

const router = useRouter();
const sidebarVisible = ref(false);
const theme = ref("saga-blue");

const themes = [
  { label: "Saga Blue", value: "saga-blue" },
  { label: "Vela Green", value: "vela-green" },
  { label: "Arya Purple", value: "arya-purple" },
];

const handleLogOut = () => {
  router.push("/");
};

const menus = [
  { label: "Dashboard", icon: "pi pi-home" },
  {
    label: "Kullanıcılar",
    icon: "pi pi-users",
    items: [{ label: "Liste" }, { label: "Yeni Kullanıcı" }],
  },
  {
    label: "Ayarlar",
    icon: "pi pi-cog",
    items: [{ label: "Genel" }, { label: "Güvenlik" }],
  },
  {
    label: "Raporlar",
    icon: "pi pi-chart-bar",
    items: [{ label: "Satış" }, { label: "Kullanım" }, { label: "Performans" }],
  },
];
</script>
