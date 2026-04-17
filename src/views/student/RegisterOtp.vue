<template>
  <div class="auth-wrap" :style="{ backgroundImage: `url(${hero})` }">
    <div class="login-panel">
      <div class="logo">
        <img :src="logo" alt="Bimbel Lazuardy" />
      </div>

      <div class="text-center space-y-3 mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#41a6c2]/10 mb-2">
          <svg class="w-8 h-8 text-[#41a6c2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-800">Verifikasi OTP</h1>
        <p class="text-sm text-gray-500 leading-relaxed">
          Kode 4 digit telah dikirim ke<br/>
          <span class="font-medium text-[#41a6c2]">{{ targetEmail || "email Anda" }}</span>
        </p>
      </div>

      <div class="mt-2">
        <div class="flex items-center justify-center gap-4">
          <input
            v-for="(d, i) in OTP_LENGTH"
            :key="i"
            ref="boxes"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="1"
            class="h-16 w-16 rounded-xl border border-gray-300 text-center text-2xl font-semibold outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-all bg-white/70 backdrop-blur-sm"
            :aria-label="`Digit ${i + 1}`"
            v-model="digits[i]"
            @input="onInput(i)"
            @keydown.backspace.prevent="onBackspace(i)"
            @paste.prevent="onPaste"
          />
        </div>

        <div class="mt-8 space-y-4">
          <button
            class="btn-primary w-full"
            :disabled="busy || !canVerify"
            @click="verifyOtp"
          >
            {{ busy ? "Memverifikasi..." : "Verifikasi Kode" }}
          </button>

          <div class="text-center">
            <p class="text-sm text-gray-500 mb-2">Belum menerima kode?</p>
            <button
              class="text-[#41a6c2] font-medium text-sm hover:underline disabled:opacity-50 disabled:no-underline"
              :disabled="busy || cooldown > 0"
              @click="sendOtp"
            >
              <span v-if="cooldown > 0">Kirim ulang dalam {{ cooldown }}s</span>
              <span v-else>Kirim Ulang Kode</span>
            </button>
          </div>

          <div v-if="msg || err" class="p-3 rounded-lg text-sm text-center" :class="err ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'">
            {{ err || msg }}
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-200 flex justify-between">
          <button @click="handleBack" class="text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
            &larr; Kembali
          </button>
          <button @click="handleSubmit" :disabled="!verified || busy" class="text-sm text-[#41a6c2] hover:text-[#2e8694] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Lanjut &rarr;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { resendOtp, verifyEmail } from "@/services/authRegister";
import hero from "@/assets/hero.png";
import logo from "@/assets/logo.svg";

const props = defineProps({
  email: { type: String, default: "" },
  nextPath: { type: String, default: "/student/register-lanjutan" },
});

const OTP_LENGTH = 4;
const router = useRouter();
const boxes = ref([]);
const digits = ref(Array.from({ length: OTP_LENGTH }, () => ""));
const busy = ref(false);
const msg = ref("");
const err = ref("");
const verified = ref(false);
const cooldown = ref(0);
let timer = null;

const targetEmail = computed(() => {
  return props.email || localStorage.getItem("register:email") || "";
});

const code = computed(() => digits.value.join("").replace(/\D/g, ""));
const canVerify = computed(() => code.value.length === OTP_LENGTH);

function focusBox(i) {
  nextTick(() => {
    const el = boxes.value[i];
    if (el && typeof el.focus === "function") el.focus();
  });
}

function onInput(i) {
  err.value = "";
  msg.value = "";
  verified.value = false;
  digits.value[i] = (digits.value[i] || "").replace(/\D/g, "").slice(0, 1);
  if (digits.value[i] && i < OTP_LENGTH - 1) focusBox(i + 1);
  
  // Auto verify when all digits are filled
  if (code.value.length === OTP_LENGTH) {
    verifyOtp();
  }
}

function onBackspace(i) {
  if (digits.value[i]) {
    digits.value[i] = "";
    return;
  }
  if (i > 0) {
    digits.value[i - 1] = "";
    focusBox(i - 1);
  }
}

function onPaste(e) {
  const text = (e.clipboardData?.getData("text") ?? "").replace(/\D/g, "");
  if (!text) return;
  for (let i = 0; i < OTP_LENGTH; i++) digits.value[i] = text[i] ?? "";
  const last = Math.min(text.length, OTP_LENGTH) - 1;
  focusBox(last >= 0 ? last : 0);
  if (code.value.length === OTP_LENGTH) verifyOtp();
}

function startCooldown(sec = 30) {
  cooldown.value = sec;
  clearInterval(timer);
  timer = setInterval(() => {
    cooldown.value--;
    if (cooldown.value <= 0) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

async function sendOtp() {
  try {
    busy.value = true;
    err.value = "";
    msg.value = "";
    const email = targetEmail.value;
    if (!email) throw new Error("Email tidak ditemukan");

    const res = await resendOtp({ email });
    msg.value = res?.message || "OTP terkirim";
    startCooldown(30);
  } catch (e) {
    err.value = e?.response?.data?.message || e.message || "Gagal kirim OTP";
  } finally {
    busy.value = false;
  }
}

async function verifyOtp() {
  try {
    busy.value = true;
    err.value = "";
    msg.value = "";

    const email = targetEmail.value;
    if (!email) throw new Error("Email tidak ditemukan");
    if (!canVerify.value) throw new Error(`Masukkan ${OTP_LENGTH} digit OTP`);

    const res = await verifyEmail({ email, otp: code.value });

    msg.value = res?.message || "OTP valid";
    verified.value = true;
    
    // Auto proceed to next step after successful verification
    setTimeout(() => handleSubmit(), 1000);
  } catch (e) {
    verified.value = false;
    err.value = e?.response?.data?.message || e.message || "OTP salah";
    // Clear boxes on error
    digits.value = Array.from({ length: OTP_LENGTH }, () => "");
    focusBox(0);
  } finally {
    busy.value = false;
  }
}

function handleBack() {
  router.push("/student/register");
}

function handleSubmit() {
  if (!verified.value) {
    err.value = "Harap verifikasi OTP terlebih dahulu";
    return;
  }
  router.push(props.nextPath);
}

onMounted(() => {
  focusBox(0);
  startCooldown(60); // Auto start cooldown on mount
});
onUnmounted(() => clearInterval(timer));
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