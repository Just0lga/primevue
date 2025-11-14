<template>
  <div class="layout-container">
    <!-- Toggle Button -->
    <Button
      v-if="!isOpen"
      :icon="isOpen ? 'pi pi-times' : 'pi pi-bars'"
      class="toggle-btn"
      @click="toggleSidebar"
      rounded
      severity="secondary"
    />

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': !isOpen }">
      <!-- Search Box -->
      <div v-if="isOpen" class="menu-search">
        <InputText
          v-model="searchQuery"
          placeholder="Menüde ara..."
          class="search-input"
        />
      </div>

      <!-- Menu List -->
      <div class="menu-list">
        <div
          v-for="menu in filteredMenus"
          :key="menu.label"
          class="menu-item-wrapper"
        >
          <div class="menu-item" @click="toggleMenu(menu.label)">
            <div class="menu-item-content">
              <i :class="menu.icon" class="menu-icon"></i>
              <span v-if="isOpen" class="menu-label">{{ menu.label }}</span>
            </div>

            <i
              v-if="menu.items && menu.items.length > 0 && isOpen"
              :class="
                openMenus.includes(menu.label)
                  ? 'pi pi-chevron-down'
                  : 'pi pi-chevron-right'
              "
              class="submenu-icon"
            ></i>
          </div>

          <!-- Submenu -->
          <transition name="submenu">
            <div
              v-if="menu.items && openMenus.includes(menu.label) && isOpen"
              class="submenu"
            >
              <div
                v-for="sub in menu.items"
                :key="sub.label"
                class="submenu-item"
              >
                {{ sub.label }}
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content" @click="handleMainContentClick">
      <div class="topbar">
        <h1 class="title">Hoşgeldiniz Tolga Küçükaşçı</h1>

        <div class="topbar-actions">
          <!-- Theme Selector -->
          <Select
            v-model="selectedTheme"
            :options="themes"
            optionLabel="name"
            placeholder="Tema Seçin"
            class="theme-selector"
            @change="changeTheme"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="theme-item">
                <i :class="slotProps.value.icon" class="theme-icon"></i>
                <span>{{ slotProps.value.name }}</span>
              </div>
              <span v-else>Tema Seçin</span>
            </template>
            <template #option="slotProps">
              <div class="theme-item">
                <i :class="slotProps.option.icon" class="theme-icon"></i>
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </Select>

          <!-- Logout -->
          <Button
            icon="pi pi-sign-out"
            @click="handleLogOut"
            rounded
            class="logout-btn"
          />
        </div>
      </div>

      <Divider />

      <div class="top-row">
        <div class="top-container">
          <div class="top-container-row">
            <h4>Günlük Girişler</h4>
            <div class="top-container-icon-container">
              <i class="pi pi-user"></i>
            </div>
          </div>
          <h4>37</h4>
        </div>
        <div class="top-container">
          <div class="top-container-row">
            <h4>Günlük Tahsilat</h4>
            <div class="top-container-icon-container">
              <i class="pi pi-money-bill"></i>
            </div>
          </div>
          <h4>323.596₺</h4>
        </div>
        <div class="top-container">
          <div class="top-container-row">
            <h4>Aylık Tahsilat</h4>
            <div class="top-container-icon-container">
              <i class="pi pi-turkish-lira"></i>
            </div>
          </div>
          <h4>34.234.116₺</h4>
        </div>
        <div class="top-container">
          <div class="top-container-row">
            <h4>Üzerinizdeki İşler</h4>
            <div class="top-container-icon-container">
              <i class="pi pi-briefcase"></i>
            </div>
          </div>
          <h4>7</h4>
        </div>
      </div>
      <div class="title-and-buttons-row">
        <h2 class="subtitle">Kullanıcı Listesi</h2>

        <div class="buttons-row">
          <Button
            class="top-container-top-row-button"
            @click="goToAbout2"
            icon="pi pi-refresh"
          />
          <Button
            class="top-container-top-row-button"
            @click="goToAbout2"
            icon="pi pi-eraser"
          />
          <Button
            class="top-container-top-row-button"
            @click="goToAbout2"
            icon="pi pi-info-circle"
          />
          <Button
            class="top-container-top-row-button"
            @click="goToAbout2"
            icon="pi pi-microchip-ai"
          />
          <Button
            class="top-container-top-row-button"
            @click="goToAbout2"
            icon="pi pi-arrow-circle-down"
          />
        </div>
      </div>

      <div>
        <DataTable
          v-model:selection="selectedUser"
          :value="users"
          selection-mode="single"
          data-key="id"
          :paginator="true"
          :rows="10"
          :responsive-layout="'scroll'"
        >
          <Column selectionMode="single" headerStyle="width: 3rem"></Column>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="İsim"></Column>
          <Column field="email" header="E-posta"></Column>
        </DataTable>

        <p v-if="selectedUser">Seçilen kullanıcı: {{ selectedUser.name }}</p>
      </div>

      <Button
        label="Kayıtları Sorgula"
        class="goto-button"
        @click="goToAbout2"
        icon="pi pi-sign-in"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import Divider from "primevue/divider";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import { usePrimeVue } from "primevue/config";

// ✅ PrimeVue v4 için tema preset'lerini import edin
import Aura from "@primevue/themes/aura";
import Lara from "@primevue/themes/lara";
import Nora from "@primevue/themes/nora";

const router = useRouter();
const $primevue = usePrimeVue();

// ✅ PrimeVue v4 için tema tanımları
const themes = ref([
  {
    name: "Aura Light",
    value: "aura-light",
    preset: Aura,
    darkMode: false,
    icon: "pi pi-sun",
  },
  {
    name: "Aura Dark",
    value: "aura-dark",
    preset: Aura,
    darkMode: true,
    icon: "pi pi-moon",
  },
]);

const selectedTheme = ref(null);

const handleMainContentClick = () => {
  isOpen.value = false;
};
// ✅ PrimeVue v4 için DOĞRU tema değiştirme
const changeTheme = () => {
  if (!selectedTheme.value) return;

  const theme = selectedTheme.value;

  // PrimeVue config'i güncelle
  $primevue.config.theme.preset = theme.preset;

  // Dark mode kontrolü
  const root = document.documentElement;

  if (theme.darkMode) {
    root.classList.add("dark-mode");
  } else {
    root.classList.remove("dark-mode");
  }

  // localStorage'a kaydet
  localStorage.setItem("userTheme", theme.value);

  console.log(`✅ Tema değiştirildi: ${theme.name}`);
  console.log(`Preset:`, theme.preset);
  console.log(`Dark Mode:`, theme.darkMode);
};

// ✅ Sayfa yüklendiğinde tema yükle
onMounted(() => {
  const savedTheme = localStorage.getItem("userTheme");

  if (savedTheme) {
    const theme = themes.value.find((t) => t.value === savedTheme);
    if (theme) {
      selectedTheme.value = theme;
      changeTheme();
    }
  } else {
    // Varsayılan tema
    selectedTheme.value = themes.value[0];
    changeTheme();
  }
});

const handleLogOut = () => {
  console.log("Çıkış yapılıyor");
  router.push("/");
};

const goToAbout2 = () => {
  console.log("Sayfa yenileniyor");
  router.push("/");
};

const isOpen = ref(true);
const openMenus = ref([]);
const searchQuery = ref("");

const menus = [
  {
    label: "Abone İşlemleri ve Mali Hizmetler Birim Modülü",
    icon: "pi pi-wallet",
    items: [
      {
        label: "Analitik Bütçe ve Taakkuk Esaslı Muhasebe",
        icon: "pi pi-file",
      },
      { label: "Gelir Programları", icon: "pi pi-chart-line" },
      { label: "Amortisman Takibi", icon: "pi pi-calendar" },
      { label: "Stratejik Plan", icon: "pi pi-briefcase" },
    ],
  },
  {
    label: "Personel Maaşları ve Özlük Takibi",
    icon: "pi pi-users",
    items: [
      { label: "Memur Maaş", icon: "pi pi-money-bill" },
      { label: "Memur Özlük", icon: "pi pi-id-card" },
      { label: "İşçi Maaş", icon: "pi pi-money-bill" },
      { label: "İşçi Özlük", icon: "pi pi-id-card" },
      { label: "Asgari Geçim İndirimi", icon: "pi pi-percent" },
      { label: "Genel Parametreler", icon: "pi pi-cog" },
    ],
  },
  {
    label: "Varlık Yönetimi",
    icon: "pi pi-box",
    items: [
      { label: "Satın Alma Yönetimi", icon: "pi pi-shopping-cart" },
      { label: "Taşınır Mal Yönetimi", icon: "pi pi-th-large" },
      { label: "Taşınmaz Mal Yönetimi", icon: "pi pi-building" },
    ],
  },
  {
    label: "Makine İkmal Bakım Onarım",
    icon: "pi pi-wrench",
    items: [
      { label: "Veri Girişleri", icon: "pi pi-pencil" },
      { label: "Raporlar", icon: "pi pi-file" },
      { label: "Tanımlar", icon: "pi pi-cog" },
    ],
  },
  {
    label: "Telefon Rehberi ve Randevu Takip Sistemi",
    icon: "pi pi-address-book",
    items: [
      { label: "Veri İşlemleri", icon: "pi pi-pencil" },
      { label: "Raporlar", icon: "pi pi-file" },
      { label: "Tanımlar", icon: "pi pi-cog" },
    ],
  },
  {
    label: "Hizmet Masası",
    icon: "pi pi-desktop",
    items: [
      { label: "Veri Girişi", icon: "pi pi-pencil" },
      { label: "Raporlar", icon: "pi pi-file" },
      { label: "Tanımlar", icon: "pi pi-cog" },
    ],
  },
  {
    label: "Yönetim Sorgulama Paneli",
    icon: "pi pi-chart-bar",
    items: [
      { label: "Cari İşlemler", icon: "pi pi-money-bill" },
      { label: "Okuma Verileri Takibi", icon: "pi pi-eye" },
      { label: "Haritalar", icon: "pi pi-map" },
      { label: "Personel", icon: "pi pi-users" },
      { label: "Yönetimsel Analizler", icon: "pi pi-chart-line" },
    ],
  },
];

const users = ref([
  { id: 1, name: "Tolga", email: "tolga@example.com" },
  { id: 2, name: "Ayşe", email: "ayse@example.com" },
  { id: 3, name: "Mehmet", email: "mehmet@example.com" },
  { id: 4, name: "Elif", email: "elif@example.com" },
  { id: 5, name: "Tolga", email: "tolga@example.com" },
  { id: 6, name: "Ayşe", email: "ayse@example.com" },
  { id: 7, name: "Mehmet", email: "mehmet@example.com" },
  { id: 8, name: "Elif", email: "elif@example.com" },
  { id: 9, name: "Tolga", email: "tolga@example.com" },
  { id: 10, name: "Ayşe", email: "ayse@example.com" },
  { id: 11, name: "Mehmet", email: "mehmet@example.com" },
  { id: 12, name: "Elif", email: "elif@example.com" },
  { id: 13, name: "Tolga", email: "tolga@example.com" },
  { id: 14, name: "Ayşe", email: "ayse@example.com" },
  { id: 15, name: "Mehmet", email: "mehmet@example.com" },
  { id: 16, name: "Elif", email: "elif@example.com" },
]);

const selectedUser = ref(null);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const toggleMenu = (menuLabel) => {
  if (openMenus.value.includes(menuLabel)) {
    openMenus.value = openMenus.value.filter((m) => m !== menuLabel);
  } else {
    openMenus.value.push(menuLabel);
  }
};

const filteredMenus = computed(() => {
  if (!searchQuery.value) return menus;

  const query = searchQuery.value.toLowerCase();

  return menus
    .map((menu) => {
      const isMainMatch = menu.label.toLowerCase().includes(query);
      const filteredSubItems = menu.items?.filter((sub) =>
        sub.label.toLowerCase().includes(query)
      );

      if (isMainMatch || (filteredSubItems && filteredSubItems.length > 0)) {
        return {
          ...menu,
          items: filteredSubItems?.length ? filteredSubItems : menu.items,
        };
      }
      return null;
    })
    .filter((m) => m !== null);
});
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  background: var(--p-surface-ground);
  color: var(--p-text-color);
  transition: all 0.3s ease;
  position: relative;
}

.toggle-btn {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 1002;
  background-color: var(--p-highlight-bg);
  color: var(--p-highlight-text-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Toggle butonu hover durumunu temaya bağlama */
.toggle-btn:hover {
  background-color: var(--p-highlight-bg-hover);
}

.sidebar {
  width: 256px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  padding-top: 3rem;
  /* Değişkenler zaten doğru kullanılıyordu */
  background: var(--p-surface-card);
  border-right: 1px solid var(--p-surface-border);
  box-shadow: var(--p-shadow-sm);
}

.sidebar-collapsed {
  width: 72px;
}

.menu-search {
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  border-bottom: 1px solid var(--p-surface-border);
}

.search-input {
  width: 100%;
}

.menu-list {
  padding: 0.5rem;
  overflow-y: auto;
  margin-top: rem;
  flex: 1;
}

.menu-item-wrapper {
  margin-bottom: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: var(--p-border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  color: var(--p-text-color);
}

.menu-item:hover {
  background: var(--p-highlight-bg);
  color: var(--p-highlight-text-color);
}

.menu-item-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.menu-icon {
  font-size: 1.5rem;
}

.menu-label {
  font-size: 1rem;
  letter-spacing: 0.025em;
}

.submenu-icon {
  font-size: 0.875rem;
  opacity: 0.7;
}

.submenu {
  padding-left: 3rem;
  margin-top: 0.25rem;
}

.submenu-item {
  padding: 0.5rem;
  border-radius: var(--p-border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  /* İkincil metin rengi için değişken kullanıldı */
  color: var(--p-text-color-secondary);
}

.submenu-item:hover {
  background: var(--p-surface-hover);
  color: var(--p-text-color);
}

.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.2s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.main-content {
  flex: 1;
  padding: 2rem;
  /* SABİT RENK DEĞİŞTİRİLDİ: 'whitesmoke' yerine 'surface-ground' */
  background: var(--p-surface-ground);
  transition: all 0.3s ease;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.875rem;
  font-weight: bold;
  margin: 0;
  color: var(--p-primary-color);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.subtitle {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1;
  color: var(--p-primary-color);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-selector {
  min-width: 160px;
}

.theme-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-icon {
  font-size: 1rem;
}

.buttons-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  gap: 0.6rem;
}

.top-container-top-row-button {
  display: flex;
  height: 2.2rem;
  width: 2.6rem;
}

.title-and-buttons-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
:deep(.top-container-top-row-button:hover) {
  border-color: var(--p-highlight-bg-hover) !important;
  transform: scale(1.2);
}

.top-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.top-container {
  background: var(--p-surface-card);
  border: 0.1px solid white;
  padding: 1.5rem 0.7rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(25% - 0.75rem);
  min-width: 200px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.top-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.top-container-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.top-container-row h4 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 300;
  /* SABİT RENK DEĞİŞTİRİLDİ: 'rgb(...)' yerine 'text-color-secondary' */
  color: var(--p-text-color-secondary);
}

.top-container-icon-container {
  /* SABİT RENKLER DEĞİŞTİRİLDİ: Daha iyi bir tema deseni için 'primary' renkleri kullanıldı */
  background-color: var(--p-primary-subtle-bg);
  color: var(--p-primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4em;
  border-radius: 30%;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.top-container-icon-container:hover {
  /* SABİT RENKLER DEĞİŞTİRİLDİ: 'blue' yerine 'primary-color' */
  background-color: var(--p-primary-color);
  color: var(--p-primary-color-text); /* Ana renk üzerinde zıt metin rengi */
  transform: scale(1.1);
}

.top-container h4:last-child {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  /* SABİT RENK DEĞİŞTİRİLDİ: 'black' yerine 'text-color' */
  color: var(--p-text-color);
  text-align: start;
}

.goto-button {
  margin-top: 1rem;
  height: 40px;
  font-size: 1rem;
  border: none;
  border-radius: 16px;
  /* SABİT RENK DEĞİŞTİRİLDİ: 'white' yerine 'primary-color-text' */
  color: var(--p-primary-color-text);
  /* Not: Arka plan rengi, PrimeVue teması tarafından (.p-button) otomatik olarak atanacaktır. */
  width: 100%;
}

@media (max-width: 768px) {
  .toggle-btn {
    position: fixed !important;
    top: 1rem !important;
    left: 1rem !important;
    z-index: 1002 !important;
  }

  :deep(.sidebar) {
    position: fixed;
    left: 0;
    top: 0;
    background-color: var(--p-surface-950) !important;
    height: 100vh;
    width: 280px;
    z-index: 2010;
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  :deep(.sidebar *) {
    color: white !important;
    background-color: var(--p-surface-ground);
  }

  .menu-search {
    margin-top: 1rem;
  }

  .sidebar-collapsed {
    transform: translateX(-100%);
    width: 280px;
  }

  .main-content {
    padding: 1rem;
    padding-top: 4rem;
    width: 100%;
  }

  .title {
    font-size: 1.25rem;
  }

  .top-container {
    flex: 1 1 calc(50% - 0.5rem);
    min-width: 150px;
  }

  .theme-selector {
    min-width: 120px;
  }
}

* {
  transition-property: background-color, border-color, color, box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}
</style>
