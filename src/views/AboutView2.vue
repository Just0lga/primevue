<template>
  <div class="layout-container">
    <!-- Toggle Button - Sidebar dışında, her zaman görünür -->
    <Button
      :icon="isOpen ? 'pi pi-times' : 'pi pi-bars'"
      class="toggle-btn"
      @click="toggleSidebar"
      rounded
      severity="secondary"
    />

    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': !isOpen }">
      <!-- 🔍 Search Box -->
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
    <div class="main-content">
      <div class="topbar">
        <h1 class="title">Hoşgeldiniz Tolga Küçükaşçı a</h1>

        <div class="topbar-actions">
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
      <h2>Kullanıcı Listesi</h2>
      <div class="buttons-row">
        <Button
          class="top-container-top-row-button"
          @click="goToAbout2"
          icon="pi pi-refresh"
        /><Button
          class="top-container-top-row-button"
          @click="goToAbout2"
          icon="pi pi-eraser"
        /><Button
          class="top-container-top-row-button"
          @click="goToAbout2"
          icon="pi pi-info-circle"
        /><Button
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import Divider from "primevue/divider";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";

const router = useRouter();

const handleLogOut = () => {
  console.log("Çıkış yapılıyor");
  router.push("/");
};
const goToAbout2 = () => {
  console.log("Çıkış yapılıyor");
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

// 🔍 Menü Filtreleme
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

/* Toggle Button - Sidebar DIŞINDA */
.toggle-btn {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1002;
  background-color: rgb(219, 234, 254);
  color: rgb(92, 148, 254);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.sidebar {
  width: 256px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  background: var(--p-surface-card);
  border-right: 1px solid var(--p-surface-border);
  box-shadow: var(--p-shadow-sm);
}

.sidebar-collapsed {
  width: 72px;
}

.menu-search {
  padding-top: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  display: flex;
  border-bottom: 1px solid var(--p-surface-border);
}

.search-input {
  width: 100%;
}

.menu-list {
  padding: 0.5rem;
  overflow-y: auto;
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
  color: var(--p-highlight-color);
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
  color: var(--p-text-muted-color);
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
  background: whitesmoke;
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

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

:deep(.top-container-top-row-button:hover) {
  background-color: rgb(3, 38, 3) !important;
  border-color: rgb(3, 38, 3) !important;
  transform: scale(1.1);
}

.top-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.top-container {
  background: white;
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
  color: rgb(100, 116, 140);
}

.top-container-icon-container {
  background-color: rgb(219, 234, 254);
  color: rgb(92, 148, 254);
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
  background-color: blue;
  transform: scale(1.1);
}

.top-container h4:last-child {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: black;
  text-align: start;
}

.goto-button {
  margin-top: 1rem;
  height: 40px;
  font-size: 1rem;
  border: none;
  border-radius: 16px;
  color: white;
  width: 100%;
}

/* Mobil Responsive */
@media (max-width: 768px) {
  .toggle-btn {
    position: fixed !important;
    top: 1rem !important;
    left: 1rem !important;
    z-index: 1002 !important;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
    height: 100vh;
    width: 280px;
    z-index: 1000;
    transform: translateX(0);
    transition: transform 0.3s ease;
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
}

* {
  transition-property: background-color, border-color, color, box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}
</style>
