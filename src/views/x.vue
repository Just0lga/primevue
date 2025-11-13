<template>
  <div class="layout-container">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': !isOpen }">
      <!-- Toggle Button -->
      <Button
        :icon="isOpen ? 'pi pi-times' : 'pi pi-bars'"
        class="toggle-btn"
        @click="toggleSidebar"
        rounded
        severity="secondary"
      />

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
        <h1 class="title">Hoşgeldiniz Tolga Küçükaşçı</h1>

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
      <div>
        <h2>Kullanıcı Listesi</h2>
        <DataTable
          :value="users"
          :paginator="true"
          :rows="10"
          :responsive-layout="'scroll'"
        >
          <Column field="id" header="ID"></Column>
          <Column field="name" header="İsim"></Column>
          <Column field="email" header="E-posta"></Column>
        </DataTable>
      </div>
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
]);

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
}

.sidebar {
  width: 256px;
  background: var(--p-surface-card);
  border-right: 1px solid var(--p-surface-border);
  box-shadow: var(--p-shadow-sm);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.sidebar-collapsed {
  width: 72px;
}

.toggle-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.menu-search {
  padding: 1rem;
  border-bottom: 1px solid var(--p-surface-border);
}

.search-input {
  width: 100%;
  padding: 0.5rem;
}

.menu-list {
  margin-top: 0.5rem;
  padding: 0.5rem;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
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
  font-size: 1.4rem;
}

.menu-label {
  font-size: 1rem;
}

.submenu {
  padding-left: 2rem;
}

.submenu-item {
  padding: 0.5rem;
  color: var(--p-text-muted-color);
}

.submenu-item:hover {
  background: var(--p-surface-hover);
  color: var(--p-text-color);
}

.main-content {
  flex: 1;
  padding: 2rem;
  background: whitesmoke;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.875rem;
  font-weight: bold;
  color: var(--p-primary-color);
}
</style>
