<template>
  <div :style="{ '--nav-h': navHeight }">

    <!-- NAVBAR -->
    <header class="lz-navbar-wrap">
      <div class="lz-navbar">

        <!-- Left: Logo -->
        <div class="lz-navbar-left">
          <img
            src="@/assets/logo2.svg"
            alt="Bimbel Lazuardy"
            class="lz-logo-img"
            @error="handleLogoError"
          />
        </div>

        <!-- Right: Notification + Profile -->
        <div class="lz-navbar-right">

          <!-- Notification Button -->
          <button
            @click.stop="toggleNotification"
            class="lz-nav-btn"
            aria-label="Notifications"
          >
            <Bell class="lz-nav-icon" />
            <span v-if="notificationCount > 0" class="lz-notif-dot"></span>
          </button>

          <!-- Profile Button -->
          <button
            @click="handleProfileClick"
            @mouseenter="showProfileTooltip = true"
            @mouseleave="showProfileTooltip = false"
            class="lz-profile-btn"
            aria-label="Profile"
          >
            <div class="lz-avatar-circle">
              <img
                v-if="student.photo && student.photo !== 'default'"
                :src="student.photo"
                :alt="student.name"
                class="lz-avatar-img"
                @error="handlePhotoError"
              />
              <span v-else class="lz-avatar-initial">
                {{ student.name.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="lz-profile-text">
              <span class="lz-profile-name">{{ student.name }}</span>
              <span class="lz-profile-role">Siswa</span>
            </div>
            <svg class="lz-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>

            <!-- Profile Tooltip on Hover -->
            <transition name="lz-fade">
              <div v-if="showProfileTooltip" class="lz-profile-tooltip">
                <div v-if="isLoadingProfile" class="lz-tooltip-loading">
                  <div class="lz-tooltip-spinner"></div>
                </div>
                <div v-else class="lz-tooltip-content">
                  <div class="lz-tooltip-avatar">
                    <img
                      v-if="student.photo && student.photo !== 'default'"
                      :src="student.photo"
                      :alt="student.name"
                      class="lz-avatar-img"
                      @error="handlePhotoError"
                    />
                    <span v-else class="lz-tooltip-initial">
                      {{ student.name.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div class="lz-tooltip-info">
                    <p class="lz-tooltip-name">{{ student.name }}</p>
                    <p class="lz-tooltip-email">{{ student.email }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </button>

        </div>
      </div>
    </header>

    <!-- Spacer — sama tinggi navbar -->
    <div class="lz-spacer" aria-hidden="true"></div>

    <!-- LEFT SIDEBAR Component -->
    <SidebarLeft
      :isOpen="sidebarOpen"
      :active="activeMenu"
      @close="closeSidebar"
    />

    <!-- RIGHT SIDEBAR (Notifications) Component -->
    <SidebarRight
      :isOpen="notificationOpen"
      @close="closeNotification"
      @update-count="fetchNotificationCount"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Bell } from "lucide-vue-next";
import { CircleUser } from "lucide-vue-next";
import SidebarLeft from "./sidebar-left.vue";
import SidebarRight from "./sidebar-right.vue";
import { getMe } from "@/services/authService";
import { getUnreadCount } from "@/services/notificationService";

const router = useRouter();
const route = useRoute();

const activeMenu = computed(() => {
  const path = route.path;
  if (path.includes("/student/dashboard")) return "dashboard";
  if (path.includes("/package") || path.includes("/packages")) return "paket";
  if (path.includes("/student/schedule")) return "jadwal";
  if (path.includes("/contact")) return "hubungi";
  if (path.includes("/about")) return "tentang";
  return "";
});

const isScrolled = ref(false);
const navHeight = "75px";
const sidebarOpen = ref(false);
const notificationOpen = ref(false);
const showProfileTooltip = ref(false);
const notificationCount = ref(0);
const isLoadingNotifications = ref(false);

const student = ref({
  name: "User",
  email: "",
  photo: "default",
  address: "",
  phone: "",
  class: "",
  school: "",
  progress: 0,
});

const isLoadingProfile = ref(false);
const profileFetched = ref(false);

const fetchProfileData = async () => {
  if (profileFetched.value || isLoadingProfile.value) {
    return;
  }

  try {
    isLoadingProfile.value = true;

    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.warn("No auth token found, skipping profile fetch");
      profileFetched.value = true;
      return;
    }

    const cachedUser = localStorage.getItem("auth_user");
    if (cachedUser) {
      try {
        const user = JSON.parse(cachedUser);
        console.log("Cached user data:", user);
        console.log("Photo URL:", user.photo || user.profile_photo_url);

        let photoUrl = "default";
        if (user.profile_photo_url) {
          photoUrl = `http://localhost:8000/storage/${user.profile_photo_url}`;
        } else if (user.photo && user.photo !== "default") {
          photoUrl = user.photo.startsWith("http")
            ? user.photo
            : `http://localhost:8000/storage/${user.photo}`;
        }

        student.value = {
          name: user.name || "User",
          email: user.email || "",
          photo: photoUrl,
          address: user.address || "",
          phone: user.phone || "",
          class: user.class || user.class_name || "",
          school: user.school || user.school_name || "",
          progress: user.progress || 0,
        };
        profileFetched.value = true;
        isLoadingProfile.value = false;
        return;
      } catch (e) {
        console.error("Failed to parse cached user:", e);
      }
    }

    const res = await getMe();
    const user = res.user || res.data || res;

    console.log("API response:", res);
    console.log("User data from API:", user);
    console.log("Photo from API:", user.photo || user.profile_photo_url);

    let photoUrl = "default";
    if (user.profile_photo_url) {
      photoUrl = `http://localhost:8000/storage/${user.profile_photo_url}`;
    } else if (user.photo && user.photo !== "default") {
      photoUrl = user.photo.startsWith("http")
        ? user.photo
        : `http://localhost:8000/storage/${user.photo}`;
    }

    student.value = {
      name: user.name || "User",
      email: user.email || "",
      photo: photoUrl,
      address: user.address || "",
      phone: user.phone || "",
      class: user.class || user.class_name || "",
      school: user.school || user.school_name || "",
      progress: user.progress || 0,
    };

    profileFetched.value = true;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    student.value = {
      name: "User",
      email: "",
      photo: "default",
      address: "",
      phone: "",
      class: "",
      school: "",
      progress: 0,
    };
    profileFetched.value = true;
  } finally {
    isLoadingProfile.value = false;
  }
};

const fetchNotificationCount = async () => {
  if (isLoadingNotifications.value) return;

  try {
    isLoadingNotifications.value = true;
    const token = localStorage.getItem("auth_token");

    if (!token) {
      console.warn("No auth token found, skipping notification fetch");
      return;
    }

    const res = await getUnreadCount();
    notificationCount.value = res.unread_count || res.count || 0;
  } catch (error) {
    console.error("Failed to fetch notification count:", error);
    notificationCount.value = 0;
  } finally {
    isLoadingNotifications.value = false;
  }
};

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
  if (sidebarOpen.value) {
    notificationOpen.value = false;
  }
};

const toggleNotification = () => {
  console.log("Toggle notification clicked, current state:", notificationOpen.value);
  notificationOpen.value = !notificationOpen.value;
  console.log("New state:", notificationOpen.value);
  if (notificationOpen.value) {
    sidebarOpen.value = false;
  }
};

const handleProfileClick = () => {
  showProfileTooltip.value = false;
  router.push("/student/profile-student");
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

const closeNotification = () => {
  notificationOpen.value = false;
};

const handleLogoError = (event) => {
  console.error("Logo failed to load");
  event.target.style.display = "none";
};

const handlePhotoError = (event) => {
  console.warn("Profile photo failed to load");
  event.target.style.display = "none";
  student.value.photo = "default";
};

let scrollTimeout;
const handleScroll = () => {
  if (scrollTimeout) return;
  scrollTimeout = setTimeout(() => {
    isScrolled.value = window.scrollY > 20;
    scrollTimeout = null;
  }, 100);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  fetchProfileData();
  fetchNotificationCount();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

/*
  ─────────────────────────────────────────────────────────────
  Scroll-driven — Navbar full-width dengan animasi shadow + radius

  Posisi navbar tetap full-width:
    Scroll 0   → border-radius: 0; box-shadow: none
    Scroll 60px → border-radius: 0 0 16px 16px; box-shadow
  ─────────────────────────────────────────────────────────────
*/

/* ── Animasi (Hanya memunculkan shadow & efek blur saat scroll) ── */
@keyframes lz-nav-shadow {
  from {
    box-shadow: none;
    background: rgba(255, 255, 255, 1);
  }
  to {
    box-shadow: 0 10px 30px rgba(12, 68, 124, 0.15);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
  }
}

/* ── Animasi Ukuran & Posisi Wrapper ── */
@keyframes lz-nav-float {
  0% {
    top: 0;
    width: 100%;
    max-width: 100%;
  }
  100% {
    top: 20px;
    width: 95%;
    max-width: 1300px;
  }
}

/* ── Animasi Visual Navbar ── */
@keyframes lz-nav-style {
  0% {
    background: rgba(255, 255, 255, 1);
    border-radius: 0;
    /* Saat full-width, garis Navy hanya ada di bawah agar tidak aneh di tepi layar */
    border: 1.5px solid transparent; 
    border-bottom: 1.5px solid #0C447C;
    box-shadow: none;
    backdrop-filter: blur(0px);
  }
  100% {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    /* Saat mengambang, garis Navy mengelilingi seluruh kotak */
    border: 1.5px solid #0C447C;
    box-shadow: 0 10px 30px rgba(12, 68, 124, 0.15);
    backdrop-filter: blur(12px);
  }
}

/* ── Wrapper ──────────────────────────────────────────────── */
.lz-navbar-wrap {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 50;
  margin: 0 auto;

  /* Menjalankan animasi penyusutan lebar & posisi top */
  animation: lz-nav-float linear both;
  animation-timeline: scroll(root);
  animation-range: 0px 60px;
}

/* ── Navbar bar ───────────────────────────────────────────── */
.lz-navbar {
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;

  /* Menjalankan animasi efek kaca, garis tepi, dan sudut melengkung */
  animation: lz-nav-style linear both;
  animation-timeline: scroll(root);
  animation-range: 0px 60px;
}

/* ── Left: Logo ───────────────────────────────────────────── */
.lz-navbar-left {
  display: flex;
  align-items: center;
}

.lz-logo-img {
  height: 40px;
  width: auto;
  display: block;
  object-fit: contain;
}

/* ── Right: actions ───────────────────────────────────────── */
.lz-navbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* ── Notification button ──────────────────────────────────── */
.lz-nav-btn {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  flex-shrink: 0;
}

.lz-nav-btn:hover {
  background: #EEF2F7;
  border-color: rgba(12, 68, 124, 0.15);
}

.lz-nav-icon {
  width: 22px;
  height: 22px;
  color: #5a6370;
}

.lz-notif-dot {
  position: absolute;
  top: 9px;
  right: 9px;
  width: 8px;
  height: 8px;
  background: #D85A30;
  border-radius: 50%;
  border: 2px solid white;
}

/* ── Profile button ───────────────────────────────────────── */
.lz-profile-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 14px 7px 7px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: white;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.lz-profile-btn:hover {
  background: #EEF2F7;
  border-color: rgba(12, 68, 124, 0.2);
}

.lz-avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #1D9E75;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.lz-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lz-avatar-initial {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 900;
  color: white;
}

.lz-profile-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
}

.lz-profile-name {
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #1a2332;
  white-space: nowrap;
  line-height: 1.2;
}

.lz-profile-role {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #9ba3ab;
  line-height: 1.2;
}

.lz-chevron {
  width: 16px;
  height: 16px;
  color: #9ba3ab;
  flex-shrink: 0;
}

/* ── Profile tooltip ──────────────────────────────────────── */
.lz-profile-tooltip {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 256px;
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  padding: 16px;
  z-index: 100;
  cursor: default;
}

.lz-tooltip-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
}

.lz-tooltip-spinner {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #EEF2F7;
  border-top-color: #1D9E75;
  animation: lz-spin 0.7s linear infinite;
}

@keyframes lz-spin {
  to { transform: rotate(360deg); }
}

.lz-tooltip-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lz-tooltip-avatar {
  width: 48px;
  height: 48px;
  border-radius: 13px;
  background: #1D9E75;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.lz-tooltip-initial {
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
  font-weight: 900;
  color: white;
}

.lz-tooltip-info {
  min-width: 0;
  flex: 1;
}

.lz-tooltip-name {
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #1a2332;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lz-tooltip-email {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #9ba3ab;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Spacer ───────────────────────────────────────────────── */
.lz-spacer {
  height: 72px;
  margin-left: 0;
}

/* ── Fallback ─────────────────────────────────────────────── */
@supports not (animation-timeline: scroll()) {
  .lz-navbar-wrap {
    animation: none;
    left: 0;
    top: 0;
    right: 0;
    border-radius: 0;
  }
}

/* ── Tooltip fade ─────────────────────────────────────────── */
.lz-fade-enter-active,
.lz-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.lz-fade-enter-from,
.lz-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>