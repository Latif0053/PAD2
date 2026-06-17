<template>
  <div class="min-h-screen flex flex-col bg-[#EEF2F7] dashboard-scope">
    <Navbar />

    <main class="flex-1 py-10 px-6 md:px-12 max-w-[1040px] w-full mx-auto font-body pl-[260px] pt-[72px]">
      
      <button
        @click="handleBack"
        type="button"
        class="flex items-center gap-2 text-[#5a6370] hover:text-[#0C447C] font-bold text-sm mb-6 transition-colors w-fit"
      >
        <ArrowLeft class="w-5 h-5" />
        <span>Kembali ke Profil</span>
      </button>

      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-black text-[#1a2332] tracking-tight font-heading mb-2">
          Edit Profil
        </h1>
        <p class="text-sm font-medium text-[#5a6370]">
          Perbarui informasi data diri, sekolah, dan kontak wali.
        </p>
      </header>

      <div class="hifi-card p-6 md:p-10">
        
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#1a2332]/10 border-t-[#1D9E75]"></div>
          <p class="mt-5 text-xs font-bold text-[#5a6370] uppercase tracking-widest">Memuat data...</p>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-12">
          
          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1.5 h-6 bg-[#0C447C] rounded-full"></div>
              <h3 class="text-xl font-black text-[#1a2332] font-heading">Foto Profil</h3>
            </div>
            
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div class="relative shrink-0">
                <img
                  :src="photoPreview || 'https://picsum.photos/200/300'"
                  alt="Profile Photo"
                  class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-slate-100"
                />
                <button
                  @click="triggerPhotoUpload"
                  type="button"
                  class="absolute bottom-1 right-1 bg-[#1D9E75] hover:bg-[#0F6E56] text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-105"
                  title="Ubah Foto"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </button>
                <input ref="photoInput" type="file" accept="image/*" @change="handlePhotoChange" class="hidden" />
              </div>
              <div class="text-center sm:text-left sm:mt-4">
                <p class="text-sm font-bold text-[#1a2332] mb-1">Unggah Foto Baru</p>
                <p class="text-xs font-medium text-[#5a6370]">Format yang didukung: JPG, PNG (Maks. 2MB)</p>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1.5 h-6 bg-[#1D9E75] rounded-full"></div>
              <h3 class="text-xl font-black text-[#1a2332] font-heading">Detail Pribadi</h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="form-label">Nama Lengkap</label>
                <input v-model="form.namaLengkap" type="text" required class="form-input" placeholder="Masukkan nama lengkap" />
              </div>
              <div>
                <label class="form-label">Email</label>
                <input v-model="form.email" type="email" required class="form-input" placeholder="Contoh: andi@gmail.com" />
              </div>
              <div>
                <label class="form-label">Jenis Kelamin</label>
                <select v-model="form.jenisKelamin" required class="form-input cursor-pointer">
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label class="form-label">Tanggal Lahir</label>
                <input v-model="form.tanggalLahir" type="date" required class="form-input cursor-pointer" />
              </div>
              <div>
                <label class="form-label">No. Telepon</label>
                <input v-model="form.phone" type="tel" required class="form-input" placeholder="Contoh: 081234567890" />
              </div>
              <div>
                <label class="form-label">Agama</label>
                <select v-model="form.agama" required class="form-input cursor-pointer">
                  <option value="">Pilih Agama</option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1.5 h-6 bg-[#EF9F27] rounded-full"></div>
              <h3 class="text-xl font-black text-[#1a2332] font-heading">Detail Alamat</h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="form-label">Provinsi</label>
                <input v-model="form.alamat.provinsi" type="text" required class="form-input" placeholder="Contoh: Jawa Timur" />
              </div>
              <div>
                <label class="form-label">Kota / Kabupaten</label>
                <input v-model="form.alamat.kota" type="text" required class="form-input" placeholder="Contoh: Surabaya" />
              </div>
              <div>
                <label class="form-label">Kecamatan</label>
                <input v-model="form.alamat.kecamatan" type="text" required class="form-input" placeholder="Masukkan kecamatan" />
              </div>
              <div>
                <label class="form-label">Desa / Kelurahan</label>
                <input v-model="form.alamat.desa" type="text" required class="form-input" placeholder="Masukkan desa/kelurahan" />
              </div>
              <div class="sm:col-span-2">
                <label class="form-label">Alamat Lengkap</label>
                <textarea v-model="form.alamat.detail" required rows="3" class="form-input resize-none" placeholder="Nama jalan, nomor rumah, RT/RW..."></textarea>
              </div>
            </div>

            <div class="mt-8">
              <label class="form-label mb-3 flex items-center justify-between">
                <span>Titik Lokasi Peta</span>
                <span class="text-[10px] text-[#5a6370] font-medium normal-case tracking-normal">Opsional</span>
              </label>
              
              <div class="w-full h-80 bg-[#EEF2F7] rounded-xl overflow-hidden relative border border-black/10">
                <iframe :src="mapEmbedUrl" width="100%" height="100%" style="border: 0" allowfullscreen="" loading="lazy" class="w-full h-full"></iframe>

                <div v-if="form.latitude && form.longitude" class="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-black/5">
                  <div class="flex items-center gap-4">
                    <div>
                      <p class="text-[10px] font-bold text-[#5a6370] uppercase tracking-wider mb-0.5">Koordinat Terpilih</p>
                      <p class="text-sm font-black text-[#1a2332]">Lat: {{ Number(form.latitude).toFixed(5) }}, Lng: {{ Number(form.longitude).toFixed(5) }}</p>
                    </div>
                    <button @click="clearLocation" type="button" class="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-colors border border-red-500">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-5 mt-4">
                <div>
                  <label class="form-label">Latitude</label>
                  <input v-model.number="form.latitude" type="number" step="0.000001" class="form-input" placeholder="-6.200000" />
                </div>
                <div>
                  <label class="form-label">Longitude</label>
                  <input v-model.number="form.longitude" type="number" step="0.000001" class="form-input" placeholder="106.816666" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1.5 h-6 bg-[#185FA5] rounded-full"></div>
              <h3 class="text-xl font-black text-[#1a2332] font-heading">Detail Sekolah</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="form-label">Asal Sekolah</label>
                <input v-model="form.sekolah.asalSekolah" type="text" required class="form-input" placeholder="Contoh: SMA Negeri 1" />
              </div>
              <div>
                <label class="form-label">Kelas</label>
                <select v-model="form.sekolah.kelas" required class="form-input cursor-pointer">
                  <option value="">Pilih Kelas</option>
                  <optgroup label="SD">
                    <option value="Kelas 1">Kelas 1 SD</option>
                    <option value="Kelas 2">Kelas 2 SD</option>
                    <option value="Kelas 3">Kelas 3 SD</option>
                    <option value="Kelas 4">Kelas 4 SD</option>
                    <option value="Kelas 5">Kelas 5 SD</option>
                    <option value="Kelas 6">Kelas 6 SD</option>
                  </optgroup>
                  <optgroup label="SMP">
                    <option value="Kelas 7">Kelas 7 SMP</option>
                    <option value="Kelas 8">Kelas 8 SMP</option>
                    <option value="Kelas 9">Kelas 9 SMP</option>
                  </optgroup>
                  <optgroup label="SMA">
                    <option value="Kelas 10">Kelas 10 SMA</option>
                    <option value="Kelas 11">Kelas 11 SMA</option>
                    <option value="Kelas 12">Kelas 12 SMA</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-3 mb-6">
              <div class="w-1.5 h-6 bg-[#D85A30] rounded-full"></div>
              <h3 class="text-xl font-black text-[#1a2332] font-heading">Kontak Orang Tua / Wali</h3>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label class="form-label">Nama Orangtua / Wali</label>
                <input v-model="form.orangtua.nama" type="text" required class="form-input" placeholder="Masukkan nama wali" />
              </div>
              <div>
                <label class="form-label">Nomor Telepon Wali</label>
                <input v-model="form.orangtua.telepon" type="tel" required class="form-input" placeholder="Contoh: 0812..." />
              </div>
            </div>
          </div>

          <div class="pt-8 border-t border-black/5 flex flex-col-reverse sm:flex-row justify-end items-center gap-4">
            <button
              @click.prevent="handleBack"
              type="button"
              class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-[#5a6370] hover:bg-[#EEF2F7] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              class="w-full sm:w-auto bg-[#1D9E75] hover:bg-[#0F6E56] text-white px-10 py-3.5 rounded-xl font-black text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#1D9E75]/20 uppercase tracking-wider"
            >
              {{ isSubmitting ? "Menyimpan..." : "Simpan Perubahan" }}
            </button>
          </div>

        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import Navbar from "@/components/layout/navbar.vue";
import { getMe, updateProfile } from "@/services/authService.js";
import api from "@/services/api";
import { API_BASE } from "@/services/http";
import { useModalStore } from "@/stores/modalStore"; // Import Global Modal

const router = useRouter();
const modal = useModalStore(); // Inisialisasi modal

const isSubmitting = ref(false);
const isLoading = ref(false);
const photoInput = ref(null);
const photoPreview = ref("");
const photoFile = ref(null);

const form = ref({
  namaLengkap: "",
  email: "",
  jenisKelamin: "",
  tanggalLahir: "",
  phone: "",
  agama: "",
  alamat: { provinsi: "", kota: "", kecamatan: "", desa: "", detail: "" },
  latitude: null,
  longitude: null,
  sekolah: { asalSekolah: "", kelas: "" },
  orangtua: { nama: "", telepon: "" },
});

// Computed URL Peta - Format embed yang benar
const mapEmbedUrl = computed(() => {
  try {
    if (form.value.latitude && form.value.longitude) {
      // Format: tanpa leading zero, gunakan titik sebagai separator
      const lat = parseFloat(form.value.latitude);
      const lng = parseFloat(form.value.longitude);

      // Validasi koordinat
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return `https://www.google.com/maps?q=${lat},${lng}&hl=id&z=15&output=embed`;
      }
    }

    // Fallback ke alamat jika ada
    if (form.value.alamat?.detail && form.value.alamat?.kota) {
      const address = encodeURIComponent(`${form.value.alamat.detail}, ${form.value.alamat.kota}, ${form.value.alamat.provinsi}`);
      return `https://www.google.com/maps?q=${address}&hl=id&z=13&output=embed`;
    }

    // Default: Indonesia
    return "https://www.google.com/maps?q=-6.2,106.8&hl=id&z=5&output=embed";
  } catch (error) {
    console.error("Map URL error:", error);
    return "https://www.google.com/maps?q=-6.2,106.8&hl=id&z=5&output=embed";
  }
});

const isFormValid = computed(() => {
  try {
    return (
      form.value.namaLengkap?.trim() !== "" &&
      form.value.email?.trim() !== "" &&
      form.value.jenisKelamin !== "" &&
      form.value.tanggalLahir !== "" &&
      form.value.phone?.trim() !== "" &&
      form.value.agama !== "" &&
      form.value.alamat?.provinsi?.trim() !== "" &&
      form.value.alamat?.kota?.trim() !== "" &&
      form.value.alamat?.kecamatan?.trim() !== "" &&
      form.value.alamat?.desa?.trim() !== "" &&
      form.value.alamat?.detail?.trim() !== "" &&
      form.value.sekolah?.asalSekolah?.trim() !== "" &&
      form.value.sekolah?.kelas !== "" &&
      form.value.orangtua?.nama?.trim() !== "" &&
      form.value.orangtua?.telepon?.trim() !== ""
    );
  } catch (error) {
    return false;
  }
});

const loadProfile = async () => {
  try {
    isLoading.value = true;
    const resp = await api.get("/me");
    const user = resp.data?.data || resp.data || resp;

    if (user.profile_photo_url) {
      photoPreview.value = `${API_BASE}/storage/${user.profile_photo_url}`;
    } else {
      photoPreview.value = user.photo || "https://picsum.photos/200/300";
    }

    // Mapping gender dari backend (male/female) ke display (Laki-laki/Perempuan)
    const genderDisplay = {
      male: "Laki-laki",
      female: "Perempuan",
      pria: "Laki-laki",
      wanita: "Perempuan"
    };

    const religionDisplay = (religion) => religion ? religion.charAt(0).toUpperCase() + religion.slice(1) : "";
    const formatDate = (dateString) => {
      if (!dateString) return "";
      if (typeof dateString === "string" && dateString.includes("T")) return dateString.split("T")[0];
      return dateString;
    };

    // Mapping class dari backend ("kelas 10") ke dropdown value ("Kelas 10 SMA")
    const mapClassToDropdown = (className) => {
      if (!className) return "";

      // Extract number dari "kelas 10"
      const match = className.match(/\d+/);
      if (!match) return className;

      const num = parseInt(match[0]);
      if (num >= 1 && num <= 6) return `Kelas ${num}`;
      if (num >= 7 && num <= 9) return `Kelas ${num}`;
      if (num >= 10 && num <= 12) return `Kelas ${num}`;

      return className;
    };

    form.value = {
      namaLengkap: user.name || "",
      email: user.email || "",
      jenisKelamin: genderDisplay[user.gender] || genderDisplay[user.jenis_kelamin] || "",
      tanggalLahir: formatDate(user.date_of_birth || user.birth_date || user.tanggal_lahir),
      phone: user.telephone_number || user.phone || user.telepon || "",
      agama: religionDisplay(user.religion) || user.agama || "",
      alamat: {
        provinsi: user.home_address?.province || user.province || "",
        kota: user.home_address?.regency || user.regency || user.city || "",
        kecamatan: user.home_address?.district || user.district || "",
        desa: user.home_address?.subdistrict || user.subdistrict || "",
        detail: user.home_address?.street || user.street || user.alamat || "",
      },
      latitude: user.latitude || null,
      longitude: user.longitude || null,
      sekolah: {
        asalSekolah: user.school || user.school_name || "",
        kelas: mapClassToDropdown(user.class || user.grade || ""),
      },
      orangtua: {
        nama: user.parent || user.parent_name || "",
        telepon: user.parent_telephone_number || user.parent_phone || "",
      },
    };
  } catch (err) {
    console.error("Gagal load profile:", err);
    modal.showAlert("Gagal", err.message || "Gagal memuat profil siswa", "error");
    if (err.message?.toLowerCase().includes("unauthenticated") || err.message?.includes("401")) {
      router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
};

const triggerPhotoUpload = () => {
  photoInput.value?.click();
};

const handlePhotoChange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    modal.showAlert("File Terlalu Besar", "Ukuran file terlalu besar. Maksimal 2MB.", "warning");
    return;
  }

  if (!file.type.startsWith("image/")) {
    modal.showAlert("Format Tidak Sesuai", "File harus berupa gambar (JPG/PNG).", "warning");
    return;
  }

  photoFile.value = file;

  const reader = new FileReader();
  reader.onload = (e) => { photoPreview.value = e.target?.result; };
  reader.readAsDataURL(file);
};

const clearLocation = () => {
  form.value.latitude = null;
  form.value.longitude = null;
};

const handleSubmit = async () => {
  if (!isFormValid.value) {
    modal.showAlert("Data Belum Lengkap", "Mohon lengkapi semua field yang diwajibkan!", "warning");
    return;
  }

  isSubmitting.value = true;
  try {
    const token = localStorage.getItem("auth_token");
    const formData = new FormData();

    // Profile photo - hanya kirim jika ada file baru (field name sesuai OpenAPI)
    if (photoFile.value) {
      formData.append("profile_photo", photoFile.value);
    }
    // Jika tidak ada file baru, jangan kirim apa-apa (backend keep existing)

    formData.append("name", form.value.namaLengkap);
    formData.append("telephone_number", form.value.phone);

    // Gender: Backend expect "male" atau "female"
    const genderMap = { "Laki-laki": "male", "Perempuan": "female" };
    formData.append("gender", genderMap[form.value.jenisKelamin] || "male");

    formData.append("date_of_birth", form.value.tanggalLahir);
    formData.append("religion", form.value.agama.toLowerCase());

    formData.append("province", form.value.alamat.provinsi);
    formData.append("regency", form.value.alamat.kota);
    formData.append("district", form.value.alamat.kecamatan);
    formData.append("subdistrict", form.value.alamat.desa);
    formData.append("street", form.value.alamat.detail);

    if (form.value.latitude) formData.append("latitude", form.value.latitude);
    if (form.value.longitude) formData.append("longitude", form.value.longitude);

    formData.append("school", form.value.sekolah.asalSekolah);

    // Extract class number dari string "Kelas 10", "Kelas 11", dst
    // Backend database: id 1-6 untuk SD, 7-9 untuk SMP, 10-12 untuk SMA
    if (form.value.sekolah.kelas) {
      const classMatch = form.value.sekolah.kelas.match(/\d+/);
      if (classMatch) {
        const classNumber = parseInt(classMatch[0]);
        // classNumber akan jadi class_id (karena ID = nomor kelas di seeder)
        formData.append("class_id", classNumber);
      }
    }

    if (form.value.orangtua.nama) formData.append("parent", form.value.orangtua.nama);
    if (form.value.orangtua.telepon) formData.append("parent_telephone_number", form.value.orangtua.telepon);

    const response = await api.patch("/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Update photo preview jika ada response photo_url
    if (response.data?.photo_url) {
      photoPreview.value = `${API_BASE}/storage/${response.data.photo_url}`;
    }

    await modal.showAlert("Berhasil", "Profil berhasil diperbarui!", "success");
    router.push("/student/profile-student");
  } catch (error) {
    console.error("Error updating profile:", error);
    console.error("Error response:", error.response?.data);
    const msg = error.response?.data?.message || error.message || "Gagal memperbarui profil. Silakan coba lagi.";
    modal.showAlert("Gagal", msg, "error");
  } finally {
    isSubmitting.value = false;
  }
};

const handleBack = async () => {
  // Tanya konfirmasi jika ada perubahan (opsional, tp bagus untuk UX)
  const isConfirmed = await modal.showConfirm("Batal Edit?", "Perubahan yang Anda ketik tidak akan disimpan.", "warning");
  if (isConfirmed) router.push("/student/profile-student");
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

/* COMPONENT: CARD */
.hifi-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

/* COMPONENT: FORM STYLES */
.form-label {
  display: block;
  font-size: 11px;
  color: #9ba3ab;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  font-weight: 800;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  background-color: #F4F7FB;
  border: 1.5px solid transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #1a2332;
  transition: all 0.2s;
}

.form-input::placeholder {
  color: #9ba3ab;
  font-weight: 500;
}

.form-input:focus {
  background-color: #ffffff;
  border-color: #1D9E75;
  box-shadow: 0 0 0 4px rgba(29, 158, 117, 0.1);
  outline: none;
}
</style>


