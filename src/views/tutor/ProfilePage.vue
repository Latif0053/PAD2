<template>
  <div class="min-h-screen flex flex-col bg-[#EEF2F7] dashboard-scope relative">
    <div class="relative z-50">
      <NavbarTutor />
    </div>

    <div class="lz-main-wrapper flex flex-col flex-1">
      <!-- Back Button - Pojok Kiri Atas -->
      <div class="bg-[#1D9E75] text-white py-12 px-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center space-x-4">
            <button
              @click="handleBack"
              class="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <ArrowLeft class="w-6 h-6 text-white" />
            </button>
            <h1 class="text-3xl md:text-4xl font-black text-white tracking-tight font-heading">Kembali</h1>
          </div>
        </div>
      </div>

      <!-- Header -->
      <div class="flex justify-center -mt-12 mb-6">
        <div
          class="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200"
        >
          <img
            v-if="tutor"
            :src="tutor.photo"
            :alt="tutor.nama"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Main Content -->
      <main class="flex-1 py-8 px-6 md:px-12 max-w-[1040px] w-full mx-auto font-body">
        <!-- Card Data Lengkap -->
        <div class="hifi-card p-6 sm:p-8 relative z-10">
          <!-- Loading State -->
          <div v-if="isLoading" class="text-center py-12">
            <div
              class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#1a2332]/10 border-t-[#1D9E75]"
            ></div>
            <p class="mt-4 text-sm font-medium text-[#5a6370]">Memuat data profil...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="errorMessage" class="text-center py-12 text-red-600">
            <p>{{ errorMessage }}</p>
            <button
              @click="loadProfile"
              class="mt-4 bg-[#1D9E75] hover:bg-[#178a61] text-white px-6 py-2 rounded-lg"
            >
              Coba Lagi
            </button>
          </div>

          <!-- Profile Content -->
          <template v-else>
            <!-- Detail Pribadi -->
            <div class="mb-8">
              <div class="flex justify-between items-center mb-4 border-b pb-2">
                <h3 class="text-xl font-semibold text-[#1D9E75]">Detail Pribadi</h3>
                <button
                  @click="editProfile"
                  type="button"
                  class="w-full sm:w-auto bg-[#1D9E75] hover:bg-[#178a61] text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Edit Profil
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Nama Lengkap</p>
                  <p class="font-medium text-gray-800">{{ tutor.namaLengkap }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Email</p>
                  <p class="font-medium text-gray-800">{{ tutor.email }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Jenis Kelamin</p>
                  <p class="font-medium text-gray-800">{{ tutor.jenisKelamin }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Tanggal Lahir</p>
                  <p class="font-medium text-gray-800">{{ tutor.tanggalLahir }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">No. Telepon</p>
                  <p class="font-medium text-gray-800">{{ tutor.noTelepon }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Agama</p>
                  <p class="font-medium text-gray-800">{{ tutor.agama }}</p>
                </div>
              </div>
            </div>

            <!-- Detail Alamat -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-[#1D9E75] mb-4 border-b pb-2">
                Detail Alamat
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Provinsi</p>
                  <p class="font-medium text-gray-800">{{ tutor.provinsi }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Kota / Kabupaten</p>
                  <p class="font-medium text-gray-800">{{ tutor.kota }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Kecamatan</p>
                  <p class="font-medium text-gray-800">{{ tutor.kecamatan }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Desa / Kelurahan</p>
                  <p class="font-medium text-gray-800">{{ tutor.desa }}</p>
                </div>
                <div class="sm:col-span-2">
                  <p class="text-sm font-medium text-[#5a6370]">Alamat Lengkap</p>
                  <p class="font-medium text-gray-800">{{ tutor.alamatLengkap }}</p>
                </div>
              </div>

              <!-- Map -->
              <div
                class="mt-4 w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative"
              >
                <!-- Google Maps Iframe -->
                <iframe
                  v-if="tutor.latitude && tutor.longitude"
                  :src="`https://www.google.com/maps?q=${tutor.latitude},${tutor.longitude}&hl=id&z=15&output=embed`"
                  width="100%"
                  height="100%"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                  class="w-full h-full"
                >
                </iframe>
                <!-- Fallback jika tidak ada koordinat -->
                <div
                  v-else
                  class="flex items-center justify-center h-full bg-gray-100"
                >
                  <div class="text-center text-gray-500 p-4">
                    <svg
                      class="w-12 h-12 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p class="text-sm font-medium">Lokasi belum tersedia</p>
                    <p class="text-xs mt-1">
                      {{ tutor.alamatLengkap || "Alamat belum diisi" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Detail Tutor -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-[#1D9E75] mb-4 border-b pb-2">
                Detail Tutor
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Keahlian</p>
                  <p class="font-medium text-gray-800">{{ tutor.keahlian }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Market Siswa</p>
                  <p class="font-medium text-gray-800">{{ tutor.marketSiswa }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Pengalaman</p>
                  <p class="font-medium text-gray-800">{{ tutor.pengalaman }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Skill Bahasa</p>
                  <p class="font-medium text-gray-800">{{ tutor.skillBahasa }}</p>
                </div>
                <div class="sm:col-span-2">
                  <p class="text-sm font-medium text-[#5a6370]">Organisasi</p>
                  <p class="font-medium text-gray-800">
                    {{ tutor.organisasi || "-" }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Tentang Saya -->
            <div
              v-if="tutor.tentangSaya && tutor.tentangSaya !== 'N/A'"
              class="mb-8"
            >
              <h3 class="text-xl font-semibold text-[#1D9E75] mb-4 border-b pb-2">
                Tentang Saya
              </h3>
              <p class="text-gray-700 whitespace-pre-wrap">
                {{ tutor.tentangSaya }}
              </p>
            </div>

            <!-- Riwayat Pendidikan -->
            <div
              v-if="tutor.pendidikan && tutor.pendidikan.length > 0"
              class="mb-8"
            >
              <h3 class="text-xl font-semibold text-[#1D9E75] mb-4 border-b pb-2">
                Riwayat Pendidikan
              </h3>
              <div class="space-y-4">
                <div
                  v-for="(edu, index) in tutor.pendidikan"
                  :key="index"
                  class="bg-gray-50 rounded-lg p-4"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <span
                        :class="[
                          'inline-block px-2 py-0.5 text-xs font-medium rounded mb-2',
                          edu.type === 'pendidikan'
                            ? 'bg-blue-100 text-blue-800'
                            : edu.type === 'pengalaman'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800',
                        ]"
                      >
                        {{
                          edu.type === "pendidikan"
                            ? "Pendidikan"
                            : edu.type === "pengalaman"
                            ? "Pengalaman"
                            : "Organisasi"
                        }}
                      </span>
                      <h5 class="font-semibold text-gray-800">
                        {{ edu.title || edu.degree || "N/A" }}
                      </h5>
                      <p class="text-sm text-gray-600">
                        {{ edu.org || edu.institution || "N/A" }}
                      </p>
                    </div>
                    <span class="text-xs text-gray-500">{{
                      edu.period || edu.year || "N/A"
                    }}</span>
                  </div>
                  <p
                    v-if="edu.detail || edu.description"
                    class="text-sm text-gray-700 mt-2"
                  >
                    {{ edu.detail || edu.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Harga & Data Bank -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold text-[#1D9E75] mb-4 border-b pb-2">
                Harga & Data Bank
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Harga Per Pertemuan</p>
                  <p class="font-semibold text-gray-800">
                    Rp
                    {{
                      tutor.hargaPerPertemuan
                        ? tutor.hargaPerPertemuan.toLocaleString("id-ID")
                        : "0"
                    }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Nama Bank</p>
                  <p class="font-medium text-gray-800">{{ tutor.bankName }}</p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Nomor Rekening</p>
                  <p class="font-medium text-gray-800">
                    {{ tutor.bankAccountNumber }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-[#5a6370]">Nama Pemilik Rekening</p>
                  <p class="font-medium text-gray-800">
                    {{ tutor.bankAccountName }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div
              class="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4 border-t"
            >
              <button
                @click="logout"
                type="button"
                class="w-full sm:w-auto border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Logout
              </button>
            </div>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import NavbarTutor from "@/components/layout/navbar-tutor.vue";
import { getTutorProfile } from "@/services/tutorProfileService.js";

const router = useRouter();

const isLoading = ref(true);
const errorMessage = ref("");

const tutor = ref({
  namaLengkap: "",
  email: "",
  jenisKelamin: "",
  tanggalLahir: "",
  noTelepon: "",
  agama: "",
  photo: null,
  provinsi: "",
  kota: "",
  kecamatan: "",
  desa: "",
  alamatLengkap: "",
  latitude: null,
  longitude: null,
  keahlian: "",
  marketSiswa: "",
  pengalaman: "",
  skillBahasa: "",
  organisasi: "",
  tentangSaya: "",
  pendidikan: [],
  jadwalMengajar: [],
  hargaPerPertemuan: 0,
  bankName: "",
  bankAccountNumber: "",
  bankAccountName: "",
  documents: {
    cv: null,
    ktp: null,
    ijazah: null,
  },
  status: "",
  statusEnum: "",
});

// Format date to Indonesian locale
const formatDate = (dateString) => {
  if (!dateString || dateString === "N/A") return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

// Ambil data profile dari backend
const loadProfile = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    const data = await getTutorProfile();
    console.log("Tutor profile data:", data);

    tutor.value = {
      namaLengkap: data.namaLengkap || "",
      email: data.email || "",
      jenisKelamin: data.jenisKelamin || "",
      tanggalLahir: formatDate(data.tanggalLahir),
      noTelepon: data.noTelepon || "",
      agama: data.agama || "",
      photo: data.photo || "https://i.pravatar.cc/150?img=12",
      provinsi: data.provinsi || "",
      kota: data.kota || "",
      kecamatan: data.kecamatan || "",
      desa: data.desa || "",
      alamatLengkap: data.alamatLengkap || "",
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      keahlian: data.keahlian || "",
      marketSiswa: data.marketSiswa || "",
      pengalaman: data.pengalaman || "",
      skillBahasa: data.skillBahasa || "",
      organisasi: data.organisasi || "",
      tentangSaya: data.tentangSaya || "",
      pendidikan: data.pendidikan || [],
      jadwalMengajar: data.jadwalMengajar || [],
      hargaPerPertemuan: data.hargaPerPertemuan || 0,
      bankName: data.bankName || "",
      bankAccountNumber: data.bankAccountNumber || "",
      bankAccountName: data.bankAccountName || "",
      documents: data.documents || {
        cv: null,
        ktp: null,
        ijazah: null,
      },
      status: data.status || "",
      statusEnum: data.statusEnum || "",
    };
  } catch (err) {
    console.error("Gagal load profile:", err);
    errorMessage.value = err.message || "Gagal memuat profil tutor";

    if (
      err.message?.toLowerCase().includes("unauthenticated") ||
      err.response?.status === 401
    ) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
};

const editProfile = () => {
  router.push("/tutor/edit-profile");
};

const handleBack = () => {
  router.push("/tutor/dashboard");
};

const logout = async () => {
  if (confirm("Apakah Anda yakin ingin keluar?")) {
    try {
      // TODO: Uncomment when API ready
      // await apiLogout();
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      router.push("/login");
    }
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=DM+Sans:wght@400;500;700&display=swap');

.dashboard-scope {
  --border: rgba(0,0,0,0.08);
}

.font-heading { font-family: 'Nunito', sans-serif; }
.font-body { font-family: 'DM Sans', sans-serif; }

@keyframes lz-content-shift {
  0% { margin-left: 260px; }
  100% { margin-left: 88px; }
}

.lz-main-wrapper {
  animation: lz-content-shift linear both;
  animation-timeline: scroll(root);
  animation-range: 0px 60px;
}

@supports not (animation-timeline: scroll()) {
  .lz-main-wrapper {
    margin-left: 260px;
  }
}

.hifi-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

/* Responsif tambahan */
@media (max-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }
}
</style>
