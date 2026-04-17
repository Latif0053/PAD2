<template>
  <location-permission
    v-model="showLocationmodal"
    @granted="handleGranted"
    @denied="handleDenied"
  />
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
    <div class="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 w-full max-w-3xl border border-gray-100">
      
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800">Lengkapi Data Diri</h1>
        <p class="text-gray-500 mt-2">Tinggal selangkah lagi untuk menyelesaikan pendaftaran.</p>
      </div>

      <div class="space-y-8">
        <div class="bg-white rounded-xl">
          <h2 class="text-lg font-semibold text-[#41a6c2] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <span class="bg-[#41a6c2]/10 p-1.5 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></span>
            Data Pribadi
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
              <input
                v-model="baseForm.namaLengkap"
                type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors"
                placeholder="Sesuai kartu identitas"
              />
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Nomor Telepon / WhatsApp</label>
              <input
                v-model="baseForm.nomorTelepon"
                type="tel"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors"
                placeholder="+62 812..."
              />
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Jenis Kelamin</label>
              <select
                v-model="baseForm.jenisKelamin"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors bg-white"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Agama</label>
              <select
                v-model="baseForm.agama"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors bg-white"
              >
                <option value="">Pilih Agama</option>
                <option value="islam">Islam</option>
                <option value="kristen">Kristen</option>
                <option value="katolik">Katolik</option>
                <option value="hindu">Hindu</option>
                <option value="buddha">Buddha</option>
                <option value="konghucu">Konghucu</option>
              </select>
            </div>

            <div class="form-group md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Lahir</label>
              <div class="grid grid-cols-3 gap-3">
                <select v-model.number="baseForm.tanggalLahir.hari" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] bg-white">
                  <option :value="''">Tanggal</option>
                  <option v-for="d in daysInmonth" :key="d" :value="d">{{ d }}</option>
                </select>
                <select v-model.number="baseForm.tanggalLahir.bulan" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] bg-white">
                  <option :value="''">Bulan</option>
                  <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
                </select>
                <select v-model.number="baseForm.tanggalLahir.tahun" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] bg-white">
                  <option :value="''">Tahun</option>
                  <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl">
          <h2 class="text-lg font-semibold text-[#41a6c2] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <span class="bg-[#41a6c2]/10 p-1.5 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg></span>
            Sekolah & Wali
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Asal Sekolah</label>
              <input
                v-model="form.asalSekolah"
                type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors"
                placeholder="Nama sekolah"
              />
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Kelas</label>
              <select
                v-model="form.kelas"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors bg-white"
              >
                <option value="">Pilih Kelas</option>
                <option value="1">Kelas 1 SD</option>
                <option value="2">Kelas 2 SD</option>
                <option value="3">Kelas 3 SD</option>
                <option value="4">Kelas 4 SD</option>
                <option value="5">Kelas 5 SD</option>
                <option value="6">Kelas 6 SD</option>
                <option value="7">Kelas 7 SMP</option>
                <option value="8">Kelas 8 SMP</option>
                <option value="9">Kelas 9 SMP</option>
                <option value="10">Kelas 10 SMA</option>
                <option value="11">Kelas 11 SMA</option>
                <option value="12">Kelas 12 SMA</option>
              </select>
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Kurikulum</label>
              <select
                v-model="form.kurikulum"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors bg-white"
              >
                <option value="">Pilih Kurikulum</option>
                <option value="1">KTSP 2013</option> <option value="2">Merdeka</option>   </select>
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Nama Orangtua / Wali</label>
              <input
                v-model="form.namaOrangtua"
                type="text"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors"
                placeholder="Nama lengkap wali"
              />
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Nomor Telepon Wali</label>
              <input
                v-model="form.nomorTeleponOrangtua"
                type="tel"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors"
                placeholder="+62 8..."
              />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl">
          <h2 class="text-lg font-semibold text-[#41a6c2] mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <span class="bg-[#41a6c2]/10 p-1.5 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></span>
            Domisili & Alamat
          </h2>
          
          <div class="space-y-4">
            <wilayah-dropdown />
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Alamat Lengkap</label>
              <textarea
                v-model="baseForm.alamat"
                rows="3"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]/50 focus:border-[#41a6c2] transition-colors resize-none"
                placeholder="Alamat akan terisi otomatis jika izin lokasi diberikan, atau ketik manual jalan, nomor rumah, RT/RW..."
              ></textarea>
            </div>
          </div>
        </div>

        <div v-if="err" class="rounded-xl border border-red-200 bg-red-50 text-red-600 px-4 py-3 text-sm flex items-center gap-2">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {{ err }}
        </div>

        <div class="flex gap-4 pt-4 mt-6 border-t border-gray-100">
          <button @click="handleBack" class="px-6 py-3 border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 rounded-xl font-medium transition-all w-1/3">
            Kembali
          </button>
          <button @click="handleSubmit" :disabled="loading" class="px-6 py-3 bg-[#41a6c2] text-white hover:bg-[#2e8694] rounded-xl font-medium transition-all w-2/3 shadow-lg shadow-[#41a6c2]/30 disabled:opacity-60 disabled:cursor-not-allowed">
            {{ loading ? "Menyimpan Data..." : "Selesaikan Pendaftaran" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import WilayahDropdown from "@/components/WilayahDropdown.vue";
import LocationPermission from "@/components/LocationPermission.vue";
import { updateStudentRole } from "@/services/authRegister";
import { useRegisterStore } from "@/stores/registerStore";
import { useModalStore } from "@/stores/modalStore"; // 1. Tambahkan import
import { storeToRefs } from "pinia";

const router = useRouter();
const modal = useModalStore(); // 2. Inisialisasi modal
const props = defineProps({ nextPath: { type: String, default: "/student/dashboard" } });

const err = ref("");
const loading = ref(false);
const showLocationmodal = ref(true);
const userLocation = ref(null);
const LOC_KEY = "register:location";
const LOC_PERMISSION_KEY = "register:loc-permission";

const form = ref({
  asalSekolah: "",
  kelas: "",
  kurikulum: "",
  namaOrangtua: "",
  nomorTeleponOrangtua: "",
});

const regStore = useRegisterStore();
const { form: baseForm } = storeToRefs(regStore);

onMounted(() => {
  regStore.loadFromStorage();
  const raw = localStorage.getItem(LOC_KEY);
  if (raw) {
    try {
      userLocation.value = JSON.parse(raw);
    } catch {}
  }
});

watch(baseForm, () => regStore.saveToStorage(), { deep: true });

const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

const daysInmonth = computed(() => {
  const b = Number(baseForm.value.tanggalLahir?.bulan || 0);
  const t = Number(baseForm.value.tanggalLahir?.tahun || 0);
  if (!b) return 31;
  if ([1, 3, 5, 7, 8, 10, 12].includes(b)) return 31;
  if ([4, 6, 9, 11].includes(b)) return 30;
  return isLeap(t) ? 29 : 28;
});

watch(
  () => [baseForm.value.tanggalLahir?.bulan, baseForm.value.tanggalLahir?.tahun],
  () => {
    const max = daysInmonth.value;
    if (Number(baseForm.value.tanggalLahir.hari) > max) {
      baseForm.value.tanggalLahir.hari = "";
    }
  },
  { immediate: true }
);

async function handleGranted(loc) {
  userLocation.value = loc;
  baseForm.value.location = loc;
  localStorage.setItem(LOC_KEY, JSON.stringify(loc));
  showLocationmodal.value = false;

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.lat}&lon=${loc.lng}`);
    const data = await res.json();
    if (data?.display_name && !baseForm.value.alamat) {
      baseForm.value.alamat = data.display_name;
    }
  } catch {}
}

function handleDenied() {
  localStorage.setItem(LOC_PERMISSION_KEY, "denied");
  showLocationmodal.value = false;
}

const verified = computed(() => {
  const dataLanjutanValid = Object.values(form.value).every((v) => String(v ?? "").trim() !== "");
  const baseValid = !!baseForm.value.namaLengkap && !!baseForm.value.nomorTelepon && !!baseForm.value.jenisKelamin && !!baseForm.value.agama && !!baseForm.value.tanggalLahir.hari && !!baseForm.value.tanggalLahir.bulan && !!baseForm.value.tanggalLahir.tahun;
  return dataLanjutanValid && baseValid;
});

const handleBack = async () => {
  const confirmed = await modal.showConfirm(
    "Batalkan Pendaftaran?", 
    "Data yang sudah diisi akan dihapus jika kamu kembali sekarang.",
    "warning"
  );
  if (confirmed) {
    router.push("/student/register-otp");
  }
};

const handleSubmit = async () => {
  if (!verified.value) {
    err.value = "Harap lengkapi semua data form (Data Pribadi, Sekolah, dan Alamat).";
    return;
  }

  loading.value = true;
  err.value = "";
  
  try {
    const dateOfBirth = `${baseForm.value.tanggalLahir.tahun}-${String(baseForm.value.tanggalLahir.bulan).padStart(2, "0")}-${String(baseForm.value.tanggalLahir.hari).padStart(2, "0")}`;

    const payload = {
      email: baseForm.value.email,
      password: baseForm.value.password,
      name: baseForm.value.namaLengkap,
      gender: baseForm.value.jenisKelamin,
      date_of_birth: dateOfBirth,
      telephone_number: baseForm.value.nomorTelepon,
      religion: baseForm.value.agama,
      province: baseForm.value.provinsi || "",
      regency: baseForm.value.kabupaten || "",
      district: baseForm.value.kecamatan || "",
      subdistrict: baseForm.value.kelurahan || "",
      street: baseForm.value.alamat || "",
      latitude: baseForm.value.location?.lat || -7.3297,
      longitude: baseForm.value.location?.lng || 112.7814,
      school: form.value.asalSekolah,
      class_id: parseInt(form.value.kelas) || null,
      curriculum_id: parseInt(form.value.kurikulum) || null, 
      parent: form.value.namaOrangtua,
      parent_telephone_number: form.value.nomorTeleponOrangtua,
    };

    const result = await updateStudentRole(payload);

    if (result.token) {
      localStorage.setItem("auth_token", result.token);
      localStorage.setItem("auth_user", JSON.stringify(result.user || { email: baseForm.value.email }));
    }

    if (regStore.reset) regStore.reset();
    localStorage.removeItem("register:email");
    localStorage.removeItem("register:temp_token");
    localStorage.removeItem("register:form");

    await modal.showAlert("Sukses", "Registrasi berhasil! Selamat datang.", "success");
    router.push(props.nextPath);
  } catch (e) {
    const msg = e?.response?.data?.message || e.message || "Gagal menyimpan data lanjutan.";
    modal.showAlert("Gagal", msg, "error");
  } finally {
    loading.value = false;
  }
};
</script>