<template>
  <div class="auth-wrap" :style="{ backgroundImage: `url(${hero})` }">

    <div class="login-panel">

      <div class="logo">
        <img :src="logo" alt="Bimbel Lazuardy" />
      </div>

      <div class="register-links">
        <button @click="handleSiswa" class="link-btn">Daftar sebagai Siswa</button>
        <span class="link-sep">atau</span>
        <button @click="handleTutor" class="link-btn">Daftar sebagai Tutor</button>
      </div>

      <form @submit.prevent="handleLogin" class="login-form" novalidate>

        <div class="form-group">
          <input
            id="email"
            type="email"
            v-model.trim="email"
            required
            placeholder="Email"
            inputmode="email"
            autocomplete="email"
          />
        </div>

        <div class="form-group password-group">
          <input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            v-model.trim="password"
            required
            placeholder="Password"
            autocomplete="current-password"
            minlength="8"
          />
          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
            aria-label="Toggle password visibility"
          >
            <EyeClosed v-if="showPassword" class="eye-icon" />
            <Eye v-else class="eye-icon" />
          </button>
        </div>

        <p v-if="tried && !isValid" class="error-text">
          Email harus valid dan password minimal 8 karakter.
        </p>
        <p v-if="serverError" class="error-text">{{ serverError }}</p>

        <div class="button-group">
          <button
            type="submit"
            class="btn-login"
            :disabled="submitting || !isValid"
          >
            {{ submitting ? "Memproses…" : "Masuk" }}
          </button>

          <div class="forgot-password">
            <button
              type="button"
              class="forgot-btn"
              @click="handleForgotPassword"
            >
              Lupa password?
            </button>
          </div>

          <div class="social-login">
            <div class="divider">atau</div>

            <button
              type="button"
              class="btn-social btn-google"
              @click="handleGoogleLogin"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                class="social-icon"
              />
              Sign in with Google
            </button>

            <button
              type="button"
              class="btn-social btn-facebook"
              @click="handleFacebookLogin"
            >
              <svg class="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.532-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
              Sign in with Facebook
            </button>
          </div>
        </div>
      </form>

    </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Eye, EyeClosed } from "lucide-vue-next";
import hero from "@/assets/hero.png";
import logo from "@/assets/logo.svg";
import { loginRequest, fetchMe } from "@/services/auth.js";
import { API_BASE } from "@/services/http";
// 1. Import Modal Store
import { useModalStore } from '@/stores/modalStore';
import { useAuthStore } from '@/stores/auth.js';

  const router = useRouter();
  const modal = useModalStore(); // 2. Inisialisasi Modal
  const auth = useAuthStore();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const submitting = ref(false);
const tried = ref(false);
const serverError = ref("");

function extractErr(e) {
  return (
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    e?.message ||
    "Email atau password salah."
  );
}

const isValid = computed(() => {
  const emailOk = /\S+@\S+\.\S+/.test(email.value);
  const passOk = (password.value || "").length >= 8;
  return emailOk && passOk;
});

function getRedirectPath(user) {
  if (!user) return "/login";

  let role = null;
  // ... (Logika penentuan role tetap sama seperti kode aslimu)
  if (typeof user.role === "string") {
    role = user.role;
  } else if (user.role?.name) {
    role = user.role.name;
  } else if (user.role_id) {
    const roleMap = { 1: "admin", 2: "tutor", 3: "student" };
    role = roleMap[user.role_id];
  }

  const normalizedRole = String(role || "").toLowerCase().trim();

  switch (normalizedRole) {
    case "admin":
    case "administrator":
      return "/admin/dashboard";
    case "tutor":
      const status = user.status || user.tutor_status || user.verification_status;
      if (status === "active" || status === "approved") return "/tutor/dashboard";
      return "/tutor/home-pending";
    case "student":
    case "siswa":
      return "/student/dashboard";
    default:
      return "/student/dashboard";
  }
}

const handleLogin = async () => {
  tried.value = true;
  if (!isValid.value) return;
  submitting.value = true;
  serverError.value = "";

  try {
    const result = await loginRequest({
      email: email.value,
      password: password.value,
    });

    const token = result?.token ?? result?.access_token ?? result?.data?.token ?? result?.data?.access_token;
    const userRaw = result?.user ?? result?.data?.user ?? null;

    if (!token) throw new Error("Token tidak ditemukan");

    // Save into central auth store (which persists to localStorage)
    auth.setToken(token);
    if (userRaw) auth.setUser(userRaw);

    // Ambil data detail profil
    let me = userRaw;
    try {
      const meResponse = await fetchMe();
      me = meResponse?.user || meResponse;
      if (me) auth.setUser(me);
    } catch (fetchError) {
      console.warn("Failed to fetch user profile:", fetchError);
    }

    const userData = me || userRaw;
    if (!userData) throw new Error("Data user tidak ditemukan");

    const target = getRedirectPath(userData);

    // 3. Ganti Alert Sukses dengan Modal (pakai await agar user sempat melihat pesan)
    await modal.showAlert("Berhasil", "Selamat datang kembali! Anda berhasil masuk ke sistem Lazuardy.", "success");
    
    await router.replace(target);

  } catch (error) {
    console.error("Login error:", error);
    serverError.value = extractErr(error);
    
    // 4. Ganti Alert Gagal dengan Modal
    modal.showAlert("Login Gagal", serverError.value, "error");
  } finally {
    submitting.value = false;
  }
};

// ... (handleSiswa, handleTutor, dsb tetap sama)
const handleSiswa = () => router.push("/student/register");
const handleTutor = () => router.push("/tutor/register");
const handleForgotPassword = () => router.push("/forgot-password");
const handleGoogleLogin = () => (window.location.href = `${API_BASE}/auth/google`);
const handleFacebookLogin = () => (window.location.href = `${API_BASE}/auth/facebook`);
</script>

<style scoped>
/* ── Full-screen background (Dikunci agar tidak gerak/overflow) ── */
.auth-wrap {
  position: relative;
  width: 100%;
  height: 100vh; /* Kunci tepat sebesar jendela browser */
  overflow: hidden; /* Cegah scrollbar global */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: stretch;
}

/* ── Left panel: 50% lebar ── */
.login-panel {
  width: 50%;
  max-width: 500px; /* Batasi maksimal lebar form agar tidak melar di PC ultrawide */
  height: 100vh;
  overflow-y: auto; /* Jika layar sangat pendek, hanya form ini yang bisa di-scroll */
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;


scrollbar-width: none; 
  -ms-overflow-style: none; 
}

.login-panel::-webkAit-scrollbar {
  display: none;
}

/* ── Logo ── */
.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.logo img {
  width: 148px;
  height: auto;
  object-fit: contain;
}

/* ── Register links ── */
.register-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 28px;
  font-size: 14px;
}
.link-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #2e9bb5;
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  padding: 0;
  transition: color 0.2s;
}
.link-btn:hover { color: #1d7a90; }
.link-sep { color: #555; font-size: 14px; }

/* ── Form inputs ── */
.login-form { width: 100%; }

.form-group {
  margin-bottom: 14px;
}
.form-group input {
  width: 100%;
  padding: 14px 18px;
  border: 1.5px solid #9dd4e3;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  background: rgba(255, 255, 255, 0.7);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.form-group input::placeholder { color: #9ab5be; }
.form-group input:focus {
  border-color: #2e9bb5;
  box-shadow: 0 0 0 3px rgba(46, 155, 181, 0.15);
  background: rgba(255, 255, 255, 0.9);
}

/* ── Password toggle ── */
.password-group { position: relative; }
.password-toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  color: #7ab3c0;
  transition: color 0.2s;
}
.password-toggle:hover { color: #2e9bb5; }
.eye-icon { width: 22px; height: 22px; }

/* ── Error text ── */
.error-text {
  color: #d33;
  font-size: 0.82rem;
  margin-top: 6px;
  margin-bottom: 4px;
}

/* ── Button group ── */
.button-group { margin-top: 16px; }

.btn-login {
  width: 100%;
  padding: 13px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: #1e8f7f;
  color: #fff;
  transition: background 0.2s;
  margin-bottom: 8px;
}
.btn-login:hover:not(:disabled) { background: #167568; }
.btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

/* ── Forgot password ── */
.forgot-password { text-align: right; margin-bottom: 4px; }
.forgot-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: #2e9bb5;
  transition: color 0.2s;
}
.forgot-btn:hover { color: #1d7a90; }

/* ── Divider (Dibuat center presisi dengan Flexbox) ── */
.social-login { margin-top: 16px; }
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #6b8f96;
  font-size: 13px;
  margin: 16px 0;
}
.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #2e9bb5;
}
.divider::before { margin-right: 12px; }
.divider::after { margin-left: 12px; }

/* ── Social buttons ── */
.btn-social {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: opacity 0.2s, background 0.2s;
}
.btn-social:hover { opacity: 0.88; }

.social-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}

.btn-google {
  background: #ffffff;
  border: 1.5px solid #dadce0;
  color: #3c4043;
}
.btn-google:hover { background: #f8f8f8; }

.btn-facebook {
  background: #1877f2;
  border: none;
  color: #ffffff;
}
.btn-facebook:hover { background: #145db2; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .login-panel {
    width: 100%;
    max-width: 100%;
    padding: 40px 28px;
    background: rgba(255, 255, 255, 0.88);
  }
}
</style>