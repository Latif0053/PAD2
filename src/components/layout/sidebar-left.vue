<template>
  <aside class="lz-sidebar">

    <!-- Nav -->
    <nav class="lz-nav">
      <RouterLink
        to="/student/dashboard"
        @click="close"
        :class="['lz-item', isActive('dashboard') && 'lz-item--active']"
      >
        <div class="lz-item-icon-wrap">
          <LayoutDashboard class="lz-item-icon" />
        </div>
        <span class="lz-label">Dashboard</span>
      </RouterLink>

      <RouterLink
        to="/packages"
        @click="close"
        :class="['lz-item', isActive('paket') && 'lz-item--active']"
      >
        <div class="lz-item-icon-wrap">
          <BookText class="lz-item-icon" />
        </div>
        <span class="lz-label">Paket Belajar</span>
      </RouterLink>

      <RouterLink
        to="/student/schedule"
        @click="close"
        :class="['lz-item', isActive('jadwal') && 'lz-item--active']"
      >
        <div class="lz-item-icon-wrap">
          <CalendarDays class="lz-item-icon" />
        </div>
        <span class="lz-label">Jadwal Belajar</span>
      </RouterLink>

      <RouterLink
        to="/student/payment-history"
        @click="close"
        :class="['lz-item', isActive('riwayat') && 'lz-item--active']"
      >
        <div class="lz-item-icon-wrap">
          <History class="lz-item-icon" />
        </div>
        <span class="lz-label">Riwayat Bayar</span>
      </RouterLink>
    </nav>

    <!-- Logout -->
    <div class="lz-logout-area">
      <button @click="handleLogout" class="lz-logout-btn">
        <div class="lz-item-icon-wrap">
          <LogOut class="lz-item-icon lz-logout-icon" />
        </div>
        <span class="lz-label lz-logout-label">Keluar</span>
      </button>
    </div>

  </aside>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import {
  LayoutDashboard,
  BookText,
  History,
  CalendarDays,
  LogOut,
} from "lucide-vue-next";
import { logout as apiLogout } from "@/services/authService";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  active: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

const router = useRouter();

const handleLogout = async () => {
  try {
    await apiLogout();
  } catch (e) {
    console.error("Logout error:", e);
  } finally {
    localStorage.removeItem("auth_token");
    router.push("/login");
  }
};

const route = useRoute();

const isActive = (menu) => {
  switch (menu) {
    case "dashboard":
      return route.path === "/student/dashboard";
    case "paket":
      return route.path === "/packages";
    case "jadwal":
      return route.path === "/student/schedule";
    case "riwayat":
      return route.path === "/student/payment-history";
    default:
      return false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

/*
  ─────────────────────────────────────────────────────────────
  CSS Scroll-driven Animation
  Scroll 0px  → Full height (menyambung dari bawah navbar ke dasar), nempel kiri.
  Scroll 60px → Jadi pulau kecil (floating), sejajar kiri dengan navbar.
  ─────────────────────────────────────────────────────────────
*/

@keyframes lz-sidebar-float {
  0% {
    top: 72px; 
    height: calc(100vh - 72px); 
    width: 260px; /* Lebar normal */
    left: 0;
    border-radius: 0;
    border-color: transparent #0C447C transparent transparent; 
    box-shadow: none;
    background: rgba(255, 255, 255, 1);
  }
  100% {
    top: 104px; 
    height: calc(100vh - 128px); 
    
    width: 70px; 
    
    left: calc(50vw - min(47.5vw, 650px)); 
    border-radius: 16px;
    border-color: #0C447C; 
    box-shadow: 0 10px 30px rgba(12, 68, 124, 0.15);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
  }
}

@keyframes lz-label-hide {
  0%   { opacity: 1; max-width: 160px; overflow: hidden; white-space: nowrap; }
  60%  { opacity: 0; max-width: 160px; }
  100% { opacity: 0; max-width: 0;     overflow: hidden; white-space: nowrap; }
}

@keyframes lz-logo-text-hide {
  0%   { opacity: 1; max-width: 160px; }
  60%  { opacity: 0; max-width: 160px; }
  100% { opacity: 0; max-width: 0;     }
}

/* ── Sidebar shell ─────────────────────────────────────────── */
.lz-sidebar {
  position: fixed;
  z-index: 40;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* Base border tebalnya */
  border: 1.5px solid #0C447C;

  /* Menjalankan animasi ukuran & posisi */
  animation: lz-sidebar-float linear both;
  animation-timeline: scroll(root);
  animation-range: 0px 60px;
}

/* ── Fallback: Firefox & Safari yang belum support ─────────── */
@supports not (animation-timeline: scroll()) {
  .lz-sidebar { 
    animation: none; 
    top: 72px;
    height: calc(100vh - 72px);
    width: 260px; 
    left: 0; 
    border-radius: 0;
    border-color: transparent #0C447C transparent transparent;
  }
  .lz-label { animation: none; opacity: 1; max-width: 160px; }
  .lz-logo-text-wrap { animation: none; opacity: 1; max-width: 160px; }
}

/* ── Logo area ─────────────────────────────────────────────── */
.lz-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  border-bottom: 1px solid rgba(12, 68, 124, 0.1);
  flex-shrink: 0;
  background: transparent;
}

/* ── Nav ───────────────────────────────────────────────────── */
.lz-nav {
  flex: 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden;
}

.lz-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 12px;
  border-radius: 10px;
  border: 1.5px solid transparent;
  text-decoration: none;
  background: transparent;
  transition: all 0.15s;
  cursor: pointer;
  min-width: 0;
  overflow: hidden;
}

.lz-item:hover:not(.lz-item--active) {
  background: rgba(12, 68, 124, 0.05);
  border-color: #0C447C;
}

.lz-item--active {
  background: rgba(12, 68, 124, 0.08);
  border: 1.5px solid #0C447C;
}

.lz-item--active .lz-label,
.lz-item:hover:not(.lz-item--active) .lz-label {
  color: #0C447C;
  font-weight: 700;
}

/* ── Icon wrap ─────────────────────────────────────────────── */
.lz-item-icon-wrap {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.lz-item-icon {
  width: 20px;
  height: 20px;
  color: #0C447C;
  flex-shrink: 0;
}

.lz-item--active .lz-item-icon,
.lz-item:hover:not(.lz-item--active) .lz-item-icon {
  color: #0C447C;
}

/* ── Logout ─────────────────────────────────────────────────── */
.lz-logout-area {
  padding: 8px;
  border-top: 1px solid rgba(12, 68, 124, 0.1);
  flex-shrink: 0;
}

.lz-logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 12px;
  border-radius: 10px;
  border: 1.5px solid #D85A30;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s;
  overflow: hidden;
}

.lz-logout-btn:hover {
  background: rgba(216, 90, 48, 0.08);
}

.lz-logout-icon {
  color: #D85A30 !important;
}

.lz-logout-label {
  color: #D85A30 !important;
  font-weight: 600;
}
</style>