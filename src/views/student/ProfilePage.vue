<template>
  <div class="min-h-screen flex flex-col bg-[#EEF2F7] dashboard-scope relative">
    
    <div class="relative z-50">
      <Navbar />
    </div>

    <div class="lz-main-wrapper flex flex-col flex-1">
      
      <main class="flex-1 py-8 px-6 md:px-12 max-w-[1040px] w-full mx-auto font-body">
        
        <button
          @click="handleBack"
          type="button"
          class="flex items-center gap-2 text-[#5a6370] hover:text-[#0C447C] font-bold text-sm mb-6 transition-colors w-fit"
        >
          <ArrowLeft class="w-5 h-5" />
          <span>Kembali ke Dashboard</span>
        </button>

        <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-black/5 shadow-sm">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#1a2332]/10 border-t-[#1D9E75]"></div>
          <p class="mt-5 text-xs font-bold text-[#5a6370] uppercase tracking-widest">Memuat Profil...</p>
        </div>

        <div v-else class="space-y-6">
          <div class="bg-[#0C447C] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8 relative overflow-hidden shadow-sm">
            <div class="absolute right-[-20px] bottom-[-40px] w-40 h-40 bg-[#1D9E75]/20 rounded-full blur-2xl"></div>
            <div class="absolute top-[-20px] left-[30%] w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            
            <img
              :src="student.photoUrl || 'https://picsum.photos/200/300'"
              class="w-24 h-24 md:w-28 md:h-28 rounded-full border-[3px] border-white/20 object-cover relative z-10 shadow-lg bg-slate-200"
              alt="Profile Photo"
            />
            
            <div class="flex-1 text-center md:text-left relative z-10">
              <h2 class="text-3xl font-black text-white font-heading tracking-tight">{{ student.namaLengkap || 'Nama Pengguna' }}</h2>
              <p class="text-white/60 text-sm mt-1 font-medium">{{ student.email || 'Email belum diatur' }}</p>
              <div class="flex items-center justify-center md:justify-start gap-2.5 mt-4">
                <span class="bg-white/10 px-3.5 py-1.5 rounded-lg text-[11px] text-white/90 font-bold uppercase tracking-wider">Siswa</span>
                <span class="bg-[#1D9E75] px-3.5 py-1.5 rounded-lg text-[11px] text-white font-bold uppercase tracking-wider shadow-sm">Akun Aktif</span>
              </div>
            </div>
            
            <div class="w-full md:w-auto mt-2 md:mt-0 relative z-10">
              <button
                @click="editProfile"
                class="w-full md:w-auto bg-white text-[#0C447C] px-8 py-3.5 rounded-xl font-black text-sm hover:bg-gray-100 transition-colors shadow-md uppercase tracking-wider"
              >
                Edit Profil
              </button>
            </div>
          </div>

          <div class="hifi-card p-6 md:p-10">
            
            <div class="mb-10">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-1.5 h-6 bg-[#1D9E75] rounded-full"></div>
                <h3 class="text-xl font-black text-[#1a2332] font-heading">Detail Pribadi</h3>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div class="field-box">
                  <p class="field-label">Nama Lengkap</p>
                  <p class="field-val">{{ student.namaLengkap || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">Email</p>
                  <p class="field-val">{{ student.email || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">Jenis Kelamin</p>
                  <p class="field-val">{{ student.jenisKelamin || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">Tanggal Lahir</p>
                  <p class="field-val">{{ student.tanggalLahir || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">No. Telepon</p>
                  <p class="field-val">{{ student.phone || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">Agama</p>
                  <p class="field-val">{{ student.agama || '-' }}</p>
                </div>
              </div>
            </div>

            <div class="mb-10">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-1.5 h-6 bg-[#EF9F27] rounded-full"></div>
                <h3 class="text-xl font-black text-[#1a2332] font-heading">Detail Alamat</h3>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div class="field-box">
                  <p class="field-label">Provinsi</p>
                  <p class="field-val">{{ student.alamat.provinsi || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">Kota / Kabupaten</p>
                  <p class="field-val">{{ student.alamat.kota || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">Kecamatan</p>
                  <p class="field-val">{{ student.alamat.kecamatan || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">Desa / Kelurahan</p>
                  <p class="field-val">{{ student.alamat.desa || '-' }}</p>
                </div>
              </div>
              
              <div class="field-box mb-6">
                <p class="field-label">Alamat Lengkap</p>
                <p class="field-val">{{ student.alamat.detail || '-' }}</p>
              </div>

              <div class="w-full h-72 bg-[#EEF2F7] rounded-xl overflow-hidden relative border border-black/5 shadow-inner">
                <iframe
                  v-if="mapEmbedUrl"
                  :src="mapEmbedUrl"
                  width="100%" height="100%" style="border: 0" allowfullscreen="" loading="lazy"
                  class="w-full h-full"
                ></iframe>
                <div v-else class="flex flex-col items-center justify-center h-full text-[#9ba3ab]">
                  <svg class="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <p class="text-sm font-bold font-heading text-[#5a6370]">Lokasi Peta Belum Tersedia</p>
                  <p class="text-xs mt-1 font-medium">Alamat belum diisi atau tidak valid</p>
                </div>
              </div>
            </div>

            <div class="mb-10">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-1.5 h-6 bg-[#185FA5] rounded-full"></div>
                <h3 class="text-xl font-black text-[#1a2332] font-heading">Detail Sekolah</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="field-box">
                  <p class="field-label">Asal Sekolah</p>
                  <p class="field-val">{{ student.sekolah.asalSekolah || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">Kelas</p>
                  <p class="field-val">{{ student.sekolah.kelas || '-' }}</p>
                </div>
              </div>
            </div>

            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="w-1.5 h-6 bg-[#D85A30] rounded-full"></div>
                <h3 class="text-xl font-black text-[#1a2332] font-heading">Kontak Orang Tua / Wali</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="field-box">
                  <p class="field-label">Nama Orangtua / Wali</p>
                  <p class="field-val">{{ student.orangtua.nama || '-' }}</p>
                </div>
                <div class="field-box">
                  <p class="field-label">Nomor Telepon Wali</p>
                  <p class="field-val">{{ student.orangtua.telepon || '-' }}</p>
                </div>
              </div>
            </div>

            <div class="border-t border-black/5 mt-10 pt-8 flex justify-end">
              <button
                @click="logout"
                type="button"
                class="w-full sm:w-auto border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-3 rounded-xl text-sm font-bold transition-colors uppercase tracking-wider shadow-sm"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import Navbar from "@/components/layout/navbar.vue";
import { getMe, logout as apiLogout } from "@/services/authService.js";

const router = useRouter();

const isLoading = ref(false);
const errorMessage = ref("");

const student = ref({
  photoUrl: "",
  namaLengkap: "",
  email: "",
  jenisKelamin: "",
  tanggalLahir: "",
  phone: "",
  agama: "",
  alamat: {
    provinsi: "",
    kota: "",
    kecamatan: "",
    desa: "",
    detail: "",
  },
  latitude: null,
  longitude: null,
  sekolah: {
    asalSekolah: "",
    kelas: "",
  },
  orangtua: {
    nama: "",
    telepon: "",
  },
  progress: 0,
});

// Computed untuk map embed URL
const mapEmbedUrl = computed(() => {
  try {
    if (student.value.latitude && student.value.longitude) {
      const lat = parseFloat(student.value.latitude);
      const lng = parseFloat(student.value.longitude);

      // Validasi koordinat
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return `https://www.google.com/maps?q=${lat},${lng}&hl=id&z=15&output=embed`;
      }
    }

    // Fallback ke alamat jika ada
    if (student.value.alamat?.detail && student.value.alamat?.kota) {
      const address = encodeURIComponent(
        `${student.value.alamat.detail}, ${student.value.alamat.kota}, ${student.value.alamat.provinsi}`
      );
      return `https://www.google.com/maps?q=${address}&hl=id&z=13&output=embed`;
    }

    return null; // Tidak ada maps untuk ditampilkan
  } catch (error) {
    console.error("Map URL error:", error);
    return null;
  }
});

// Ambil data profile dari backend
const loadProfile = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    const token = localStorage.getItem("auth_token");
    const response = await fetch("http://localhost:8000/api/student/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Gagal memuat profil");
    }

    const res = await response.json();
    const user = res;

    // Mapping gender dari backend (male/female/pria/wanita) ke display
    const genderDisplay = {
      male: "Laki-laki",
      female: "Perempuan",
      pria: "Laki-laki",
      wanita: "Perempuan",
    };

    const religionDisplay = (religion) => {
      if (!religion) return "";
      return religion.charAt(0).toUpperCase() + religion.slice(1);
    };

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };

    // Format class untuk display ("kelas 10" -> "Kelas 10")
    const formatClass = (className) => {
      if (!className) return "";

      // Extract number dari "kelas 10"
      const match = className.match(/\d+/);
      if (!match) return className;

      const num = parseInt(match[0]);
      if (num >= 1 && num <= 6) return `Kelas ${num} SD`;
      if (num >= 7 && num <= 9) return `Kelas ${num} SMP`;
      if (num >= 10 && num <= 12) return `Kelas ${num} SMA`;

      return className;
    };

    student.value = {
      photoUrl: user.profile_photo_url
        ? `http://localhost:8000/storage/${user.profile_photo_url}`
        : user.photo || "",
      namaLengkap: user.name || "",
      email: user.email || "",
      jenisKelamin: genderDisplay[user.gender] || user.gender || user.jenis_kelamin || "",
      tanggalLahir: formatDate(user.date_of_birth || user.birth_date || user.tanggal_lahir),
      phone: user.telephone_number || user.phone || user.telepon || "",
      agama: religionDisplay(user.religion) || user.agama || "",
      alamat: {
        provinsi: user.home_address?.province || user.province || user.address_province || user.provinsi || "",
        kota: user.home_address?.regency || user.regency || user.city || user.address_city || user.kota || "",
        kecamatan: user.home_address?.district || user.district || user.address_district || user.kecamatan || "",
        desa: user.home_address?.subdistrict || user.subdistrict || user.address_village || user.desa || "",
        detail: user.home_address?.street || user.street || user.address_detail || user.alamat || "",
      },
      latitude: user.latitude || null,
      longitude: user.longitude || null,
      sekolah: {
        asalSekolah: user.school || user.school_name || user.asal_sekolah || "",
        kelas: formatClass(user.class || user.grade || user.kelas || ""),
      },
      orangtua: {
        nama: user.parent || user.parent_name || user.nama_orangtua || "",
        telepon: user.parent_telephone_number || user.parent_phone || user.telepon_orangtua || "",
      },
      progress: user.progress || 0,
    };
  } catch (err) {
    console.error("Gagal load profile:", err);
    errorMessage.value = err.message || "Gagal memuat profil siswa";

    if (err.message?.toLowerCase().includes("unauthenticated") || err.message?.includes("401")) {
      router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
};

const editProfile = () => {
  router.push("/student/edit-profile");
};

const handleBack = () => {
  router.push("/student/dashboard");
};

const logout = async () => {
  try {
    await apiLogout(); 
  } catch (e) {
    console.error("Logout error:", e);
  } finally {
    localStorage.removeItem("auth_token");
    router.push("/login");
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

.dashboard-scope {
  --border: rgba(0,0,0,0.08);
}

.font-heading { font-family: 'Nunito', sans-serif; }
.font-body { font-family: 'DM Sans', sans-serif; }

/* ANIMASI SHIFT WRAPPER */
@keyframes lz-content-shift {
  0% {
    margin-left: 260px;
  }
  100% {
    margin-left: 88px; 
  }
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

/* COMPONENT: CARD */
.hifi-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

/* COMPONENT: FIELD BOX */
.field-box {
  background: #F4F7FB;
  border-radius: 12px;
  padding: 16px 20px;
}
.field-label {
  font-size: 11px;
  color: #9ba3ab;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  font-weight: 800;
}
.field-val {
  font-size: 15px;
  font-weight: 700;
  color: #1a2332;
}
</style>