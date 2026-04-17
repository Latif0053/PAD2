<template>
  <div class="auth-wrap" :style="{ backgroundImage: `url(${hero})` }">
    <div class="login-panel">
      <div class="logo">
        <img :src="logo" alt="Bimbel Lazuardy" />
      </div>

      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Daftar Akun Siswa</h2>
        <p class="text-sm text-gray-500 mt-1">Buat akun untuk memulai perjalanan belajarmu.</p>
      </div>

      <form @submit.prevent="handleNext" class="login-form" novalidate>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="Masukkan email"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-all bg-white/70 backdrop-blur-sm"
          />
        </div>

        <div class="form-group password-group">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="Minimal 8 karakter"
              minlength="8"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-all bg-white/70 backdrop-blur-sm"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              <EyeClosed v-if="showPassword" class="eye-icon" />
              <Eye v-else class="eye-icon" />
            </button>
          </div>
        </div>

        <div class="form-group password-group mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
          <div class="relative">
            <input
              v-model="form.passwordConfirm"
              :type="showPasswordConfirm ? 'text' : 'password'"
              required
              placeholder="Ulangi password"
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-all bg-white/70 backdrop-blur-sm"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPasswordConfirm = !showPasswordConfirm"
            >
              <EyeClosed v-if="showPasswordConfirm" class="eye-icon" />
              <Eye v-else class="eye-icon" />
            </button>
          </div>
          <p v-if="form.passwordConfirm && form.password !== form.passwordConfirm" class="text-red-500 text-xs mt-1">
            Password tidak cocok.
          </p>
          <p v-if="errorMsg" class="text-red-500 text-xs mt-1">{{ errorMsg }}</p>
        </div>

        <div class="button-group flex gap-4">
          <button type="button" @click="handleBack" class="btn-secondary flex-1">
            Batal
          </button>
          <button type="submit" class="btn-primary flex-1" :disabled="submitting">
            {{ submitting ? "Memproses..." : "Daftar" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Eye, EyeClosed } from "lucide-vue-next";
import { useRegisterStore } from "@/stores/registerStore";
import { storeToRefs } from "pinia";
import { initiateRegister } from "@/services/authRegister";
import hero from "@/assets/hero.png";
import logo from "@/assets/logo.svg";

const router = useRouter();
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const submitting = ref(false);
const errorMsg = ref("");

const register = useRegisterStore();
const { form } = storeToRefs(register);

onMounted(() => register.loadFromStorage());
watch(form, () => register.saveToStorage(), { deep: true });

const handleBack = () => {
  if (confirm("Batalkan pendaftaran? Data yang sudah diisi akan dihapus.")) {
    if (register.reset) register.reset();
    else localStorage.removeItem("register:form");
    router.push("/login");
  }
};

const handleNext = async () => {
  errorMsg.value = "";

  if ((form.value.password || "").length < 8) {
    errorMsg.value = "Password minimal 8 karakter";
    return;
  }
  if (form.value.password !== form.value.passwordConfirm) {
    errorMsg.value = "Password dan konfirmasi tidak cocok";
    return;
  }
  if (!form.value.email) {
    errorMsg.value = "Email wajib diisi";
    return;
  }

  // Placeholder data for initial registration step (as required by original payload)
  const payload = {
    full_name: form.value.namaLengkap || "Guest",
    email: form.value.email,
    password: form.value.password,
    password_confirmation: form.value.passwordConfirm,
    gender: form.value.jenisKelamin || "pria",
    birth_day: form.value.tanggalLahir?.hari || "01",
    birth_month: form.value.tanggalLahir?.bulan || "01",
    birth_year: form.value.tanggalLahir?.tahun || "2000",
    phone: form.value.nomorTelepon || "080000000000",
    religion: form.value.agama || "islam",
    address: form.value.alamat || "Indonesia",
    role: "student",
  };

  submitting.value = true;
  try {
    const res = await initiateRegister(payload);
    const userEmail = res.email || res.data?.email || payload.email;
    const tempToken = res.temp_token || res.data?.temp_token || res.token;

    localStorage.setItem("register:email", userEmail);
    localStorage.setItem("register:temp_token", tempToken);
    register.saveToStorage();

    router.push("/student/register-otp");
  } catch (e) {
    errorMsg.value = e?.response?.data?.message || e.message || "Registrasi gagal";
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
/* ── Full-screen background ── */
.auth-wrap {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center; /* Membawa ke tengah vertikal */
  justify-content: center; /* Membawa ke tengah horizontal */
  padding: 20px;
}

/* ── Panel Card di Tengah ── */
.login-panel {
  width: 100%;
  max-width: 480px; /* Batas lebar form */
  max-height: 90vh; /* Agar bisa discroll jika layar terlalu pendek */
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 24px; /* Membuat sudut membulat seperti card */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.login-panel::-webkit-scrollbar {
  display: none;
}

/* ── Elemen di dalam form (Sama seperti sebelumnya) ── */
.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.logo img {
  width: 140px;
  height: auto;
  object-fit: contain;
}
.form-group {
  margin-bottom: 20px;
}
.password-group {
  position: relative;
}
.password-toggle {
  position: absolute;
  right: 14px;
  top: 38px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6b7280;
  transition: color 0.2s;
}
.password-toggle:hover {
  color: #41a6c2;
}
.eye-icon {
  width: 20px;
  height: 20px;
}
.btn-primary {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: #41a6c2;
  color: #fff;
  border: none;
  transition: background 0.2s;
  box-shadow: 0 4px 6px rgba(65, 166, 194, 0.2);
}
.btn-primary:hover:not(:disabled) {
  background: #2e8694;
}
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-secondary {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  color: #41a6c2;
  border: 1.5px solid #41a6c2;
  transition: background 0.2s;
}
.btn-secondary:hover {
  background: rgba(65, 166, 194, 0.1);
}
@media (max-width: 480px) {
  .login-panel {
    padding: 32px 24px;
  }
}
</style>