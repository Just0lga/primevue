<template>
  <div class="layout-container" :class="themeClass">
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

      <!-- Menu List -->
      <div class="menu-list">
        <div v-for="menu in menus" :key="menu.label" class="menu-item-wrapper">
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
          <!-- Tema Seçimi -->
          <Dropdown
            v-model="selectedTheme"
            :options="themes"
            optionLabel="label"
            placeholder="Tema Seç"
            class="theme-dropdown"
            @change="handleThemeChange"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="theme-option">
                <span
                  >{{ slotProps.value.icon }} {{ slotProps.value.label }}</span
                >
              </div>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <div class="theme-option">
                <span
                  >{{ slotProps.option.icon }}
                  {{ slotProps.option.label }}</span
                >
              </div>
            </template>
          </Dropdown>

          <!-- Logout -->
          <Button
            icon="pi pi-sign-out"
            @click="handleLogOut"
            rounded
            severity="danger"
          />
        </div>
      </div>

      <Divider />

      <div class="theme-info-card">
        <i class="pi pi-palette theme-info-icon"></i>
        <h2 class="theme-info-title">
          Aktif Tema: {{ selectedTheme.label.toUpperCase() }}
        </h2>
        <p class="theme-info-description">
          PrimeVue'nün {{ selectedTheme.preset }} teması kullanılıyor
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { usePrimeVue } from "primevue/config";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Divider from "primevue/divider";
import Aura from "@primevue/themes/aura";
import Lara from "@primevue/themes/lara";
import Nora from "@primevue/themes/nora";

const router = useRouter();
const primevue = usePrimeVue();

const handleLogOut = () => {
  console.log("Çıkış yapılıyor");
  router.push("/");
};

const isOpen = ref(true);
const openMenus = ref([]);

// PrimeVue preset temaları
const themes = [
  {
    label: "Aura Light",
    value: "aura-light",
    icon: "🌞",
    preset: "Aura",
    theme: Aura,
    dark: false,
  },
  {
    label: "Aura Dark",
    value: "aura-dark",
    icon: "🌙",
    preset: "Aura",
    theme: Aura,
    dark: true,
  },
  {
    label: "Lara Light",
    value: "lara-light",
    icon: "💎",
    preset: "Lara",
    theme: Lara,
    dark: false,
  },
  {
    label: "Lara Dark",
    value: "lara-dark",
    icon: "🌑",
    preset: "Lara",
    theme: Lara,
    dark: true,
  },
  {
    label: "Nora Light",
    value: "nora-light",
    icon: "🌊",
    preset: "Nora",
    theme: Nora,
    dark: false,
  },
  {
    label: "Nora Dark",
    value: "nora-dark",
    icon: "🌌",
    preset: "Nora",
    theme: Nora,
    dark: true,
  },
];

const selectedTheme = ref(themes[0]);

// Tema class'ı
const themeClass = computed(() => {
  return selectedTheme.value.dark ? "dark-theme" : "light-theme";
});

// Tema değiştirme fonksiyonu
const handleThemeChange = () => {
  // PrimeVue config'ini güncelle
  if (primevue.config && primevue.config.theme) {
    primevue.config.theme.preset = selectedTheme.value.theme;

    // Dark mode option'ını ayarla
    if (primevue.config.theme.options) {
      primevue.config.theme.options.darkModeSelector = selectedTheme.value.dark
        ? ".dark-theme"
        : false;
    }
  }

  // HTML element'ine class ekle/çıkar
  const htmlElement = document.documentElement;
  if (selectedTheme.value.dark) {
    htmlElement.classList.add("dark-theme");
    htmlElement.classList.remove("light-theme");
  } else {
    htmlElement.classList.add("light-theme");
    htmlElement.classList.remove("dark-theme");
  }

  console.log("Tema değiştirildi:", selectedTheme.value.label);
};

const menus = [
  { label: "Dashboard", icon: "pi pi-home", items: [] },
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
</script>

<style scoped>
/* Layout Container - PrimeVue CSS değişkenlerini kullanır */
.layout-container {
  display: flex;
  min-height: 100vh;
  background: var(--p-surface-ground);
  color: var(--p-text-color);
  transition: all 0.3s ease;
}

/* Sidebar Stilleri */
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

.toggle-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  transition: all 0.3s ease;
}

.sidebar-collapsed .toggle-btn {
  right: 50%;
  transform: translateX(50%);
}

/* Menu Stilleri */
.menu-list {
  margin-top: 4rem;
  padding: 0.5rem;
  overflow-y: auto;
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

/* Submenu Stilleri */
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

/* Submenu Animasyonları */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.2s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Main Content Stilleri */
.main-content {
  flex: 1;
  padding: 2rem;
  background: var(--p-surface-ground);
  transition: all 0.3s ease;
}

/* Topbar Stilleri */
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

.theme-dropdown {
  min-width: 180px;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Theme Info Card */
.theme-info-card {
  margin-top: 2rem;
  padding: 2rem;
  background: var(--p-surface-card);
  border-radius: var(--p-border-radius);
  border-left: 4px solid var(--p-primary-color);
  box-shadow: var(--p-shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.theme-info-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--p-shadow-lg);
}

.theme-info-icon {
  font-size: 3rem;
  color: var(--p-primary-color);
}

.theme-info-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--p-text-color);
}

.theme-info-description {
  font-size: 1rem;
  margin: 0;
  color: var(--p-text-muted-color);
}

/* Dark Theme Özel Stilleri */
.dark-theme .layout-container {
  background: var(--p-surface-ground);
}

.dark-theme .sidebar {
  background: var(--p-surface-card);
  border-right-color: var(--p-surface-border);
}

.dark-theme .theme-info-card {
  background: var(--p-surface-card);
}

/* Responsive Tasarım */
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    z-index: 1000;
    height: 100%;
  }

  .sidebar-collapsed {
    width: 0;
    padding: 0;
    overflow: hidden;
  }

  .title {
    font-size: 1.25rem;
  }

  .main-content {
    padding: 1rem;
  }

  .theme-info-card {
    padding: 1.5rem;
  }

  .theme-info-icon {
    font-size: 2rem;
  }

  .theme-info-title {
    font-size: 1.25rem;
  }
}

/* Smooth Transitions */
* {
  transition-property: background-color, border-color, color, box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}
</style>
