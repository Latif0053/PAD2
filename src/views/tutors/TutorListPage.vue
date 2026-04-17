<template>
  <div class="min-h-screen bg-[#EEF2F7] dashboard-scope relative">
    
    <div class="relative z-50">
      <Navbar />
    </div>

    <div class="lz-main-wrapper flex flex-col min-h-screen">
      
      <section class="bg-[#0C447C] py-10 md:py-14 relative overflow-hidden shrink-0">
        <div class="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/4 w-[300px] h-[300px] bg-[#1D9E75]/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 w-[250px] h-[250px] bg-[#EF9F27]/10 rounded-full blur-3xl"></div>
        
        <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 class="text-3xl md:text-5xl font-black text-white font-heading mb-3 tracking-tight">
            Temukan Tutor Terbaikmu
          </h1>
          <p class="text-white/80 font-body text-sm md:text-base leading-relaxed">
            Pilih dari puluhan tutor profesional dan bersertifikasi untuk mendampingi perjalanan belajarmu menuju PTN impian.
          </p>
        </div>
      </section>

      <main class="flex-1 px-6 md:px-12 max-w-[1140px] mx-auto w-full font-body relative z-20 py-8">
        
        <div class="bg-white rounded-2xl shadow-xl shadow-black/5 p-6 md:p-8 border border-black/5 mb-8">
          <div class="relative mb-6">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search class="w-6 h-6 text-[#9ba3ab]" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Ketik nama tutor yang kamu cari..."
              class="w-full pl-12 pr-4 py-4 bg-[#F4F7FB] border-2 border-transparent rounded-xl text-base font-bold text-[#1a2332] placeholder-[#9ba3ab] focus:bg-white focus:border-[#1D9E75] focus:ring-4 focus:ring-[#1D9E75]/10 outline-none transition-all"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label class="form-label">Mata Pelajaran</label>
              <select v-model="selectedSubject" class="form-input cursor-pointer">
                <option value="">Semua Pelajaran</option>
                <option v-for="subject in subjects" :key="subject">{{ subject }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Jenjang</label>
              <select v-model="selectedLevel" class="form-input cursor-pointer">
                <option value="">Semua Jenjang</option>
                <option v-for="level in levels" :key="level">{{ level }}</option>
              </select>
            </div>
            <div>
              <label class="form-label">Metode Belajar</label>
              <select v-model="selectedMode" class="form-input cursor-pointer">
                <option value="">Semua Metode</option>
                <option>Online</option>
                <option>Offline</option>
              </select>
            </div>
            <div class="flex items-end">
              <button
                @click="applyFilter"
                class="w-full h-[52px] bg-[#0C447C] text-white rounded-xl font-bold text-sm hover:bg-[#042C53] transition-colors shadow-md shadow-[#0C447C]/20 uppercase tracking-wider"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>

        <div>
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-black/5 shadow-sm">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#1a2332]/10 border-t-[#1D9E75]"></div>
            <p class="mt-5 text-sm font-bold text-[#5a6370] uppercase tracking-widest">Mencari Tutor...</p>
          </div>

          <div v-else-if="error" class="bg-[#fee2e2] border border-red-200 rounded-2xl p-10 text-center flex flex-col items-center shadow-sm">
            <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-5 text-red-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-black text-[#1a2332] font-heading mb-2">Terjadi Kesalahan</h3>
            <p class="text-sm font-medium text-[#5a6370] mb-6">{{ error }}</p>
            <button @click="loadTutors" class="bg-[#0C447C] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#042C53] transition-colors uppercase tracking-wider">
              Coba Lagi
            </button>
          </div>

          <div v-else-if="filteredTutors.length === 0" class="bg-white rounded-2xl border border-black/5 p-16 md:p-24 text-center flex flex-col items-center shadow-sm">
            <div class="w-20 h-20 bg-[#EEF2F7] rounded-2xl flex items-center justify-center mb-6">
              <Search class="w-10 h-10 text-[#9ba3ab]" />
            </div>
            <h3 class="text-xl font-black text-[#1a2332] font-heading mb-2">Tutor tidak ditemukan</h3>
            <p class="text-sm font-medium text-[#5a6370]">Coba ubah kombinasi filter atau kata kunci pencarianmu.</p>
          </div>

          <div v-else>
            <div class="flex items-center justify-between mb-6 px-2">
              <h2 class="text-xl font-black text-[#1a2332] font-heading">
                {{ filteredTutors.length }} Tutor Tersedia
              </h2>
            </div>

            <div class="flex flex-col gap-6">
              <div
                v-for="tutor in filteredTutors"
                :key="tutor.id"
                class="hifi-card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:border-[#1D9E75]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div class="shrink-0 relative mx-auto md:mx-0">
                  <img
                    :src="tutor.photo"
                    alt="Tutor Photo"
                    class="w-24 h-24 md:w-32 md:h-32 rounded-[20px] object-cover border-2 border-black/5 shadow-sm bg-slate-100"
                  />
                  <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-black/5 shadow-md rounded-full px-3 py-1 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-[#EF9F27] fill-[#EF9F27]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="text-xs font-black text-[#1a2332]">{{ tutor.rating || 'Baru' }}</span>
                  </div>
                </div>

                <div class="flex-1 w-full flex flex-col justify-between">
                  <div class="flex flex-col md:flex-row md:justify-between items-start gap-4">
                    <div class="text-center md:text-left w-full md:w-auto">
                      <h3 class="text-2xl font-black text-[#1a2332] font-heading mb-1">{{ tutor.name }}</h3>
                      <p class="text-sm font-bold text-[#5a6370] mb-3">{{ tutor.subject }}</p>
                      
                      <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
                        <span
                          v-for="mode in tutor.teachingMode"
                          :key="mode"
                          class="px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider"
                          :class="mode === 'online' ? 'bg-[#E1F5EE] text-[#0F6E56]' : 'bg-[#FAEEDA] text-[#412402]'"
                        >
                          {{ mode }}
                        </span>
                        <span class="px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-[#E6F1FB] text-[#185FA5]">
                          {{ tutor.level }}
                        </span>
                        <span class="text-xs font-medium text-[#9ba3ab] ml-1 md:ml-2">
                          ({{ tutor.reviews }} ulasan)
                        </span>
                      </div>
                    </div>

                    <div class="text-center md:text-right mt-2 md:mt-0 bg-[#F4F7FB] md:bg-transparent p-4 md:p-0 rounded-xl w-full md:w-auto">
                      <p class="text-[11px] font-bold text-[#5a6370] uppercase tracking-wider mb-1">Mulai Dari</p>
                      <p class="text-2xl font-black text-[#1D9E75] font-heading flex items-center justify-center md:justify-end">
                        {{ formatPrice(tutor.price) }}<span class="text-sm font-bold text-[#9ba3ab] ml-1">/jam</span>
                      </p>
                      <p class="text-xs font-bold text-[#185FA5] mt-1 flex items-center justify-center md:justify-end gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse"></span>
                        Tersedia Sekarang
                      </p>
                    </div>
                  </div>

                  <p class="text-sm font-medium text-[#5a6370] mt-6 line-clamp-3 md:line-clamp-2 leading-relaxed text-center md:text-left">
                    {{ tutor.bio }}
                  </p>

                  <div class="flex flex-col sm:flex-row items-center justify-end gap-3 mt-6 pt-6 border-t border-black/5">
                    <button
                      @click="goToDetail(tutor)"
                      class="w-full sm:w-auto bg-[#0C447C] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#042C53] transition-colors shadow-md shadow-[#0C447C]/20 uppercase tracking-wider"
                    >
                      Lihat Detail
                    </button>
                    <a
                      :href="waLink(tutor.whatsapp)"
                      target="_blank"
                      rel="noopener"
                      class="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#1D9E75] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#0F6E56] transition-colors shadow-md shadow-[#1D9E75]/20 uppercase tracking-wider"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.883-.733-1.48-1.638-1.653-1.935-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Tanya Tutor
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterStudent class="mt-auto border-t border-black/5 bg-white shrink-0" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { Search } from "lucide-vue-next";
import Navbar from "@/components/layout/navbar.vue";
import FooterStudent from "@/components/layout/footer.vue";
import { getPublicTutors } from "@/services/tutorService";

const router = useRouter();

const subjects = ref([]);
const levels = ["SD", "SMP", "SMA"];

const searchQuery = ref("");
const selectedSubject = ref("");
const selectedLevel = ref("");
const selectedMode = ref("");

const tutors = ref([]);
const isLoading = ref(false);
const error = ref(null);

async function loadTutors() {
  try {
    isLoading.value = true;
    error.value = null;

    const params = {};
    if (searchQuery.value.trim()) params.search = searchQuery.value.trim();
    if (selectedSubject.value) params.subject = selectedSubject.value;
    if (selectedLevel.value) params.level = selectedLevel.value;
    if (selectedMode.value) params.mode = selectedMode.value.toLowerCase();

    const response = await getPublicTutors(params);
    let tutorData = response.data && Array.isArray(response.data) ? response.data : [];

    if (tutorData.length > 0) {
      tutors.value = tutorData.map((tutor) => {
        const tutorSubjects = tutor.subjects || [];
        const subjectNames = tutorSubjects.map((s) => s.name).join(", ");
        const displaySubject = subjectNames || tutor.keahlian || "-";

        const classNames = [...new Set(tutorSubjects.map((s) => s.class?.name).filter(Boolean))];
        const level = classNames.length > 0 ? classNames.join(", ") : tutor.market_siswa ? tutor.market_siswa.toUpperCase() : "-";

        const courseMode = tutor.teaching_method?.course_mode || "both";
        const teachingMode = [];
        if (courseMode === "online" || courseMode === "both") teachingMode.push("online");
        if (courseMode === "offline" || courseMode === "both") teachingMode.push("offline");

        let photo = tutor.profile_photo_url;
        if (!photo) {
          photo = `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name || "User")}&background=0C447C&color=fff`;
        }

        const whatsapp = tutor.telephone_number || "";
        const bio = tutor.tutor_info?.description || tutor.tutor_info?.pengalaman || tutor.teaching_method?.description || "-";

        return {
          id: tutor.user_id,
          name: tutor.name || "N/A",
          subject: displaySubject,
          level: level,
          rating: tutor.rating?.average || 0,
          reviews: tutor.rating?.count || 0,
          photo: photo,
          whatsapp: whatsapp,
          bio: bio,
          teachingMode: teachingMode,
          price: tutor.tutor_info?.price || 0,
        };
      });

      const uniqueSubjects = new Set();
      tutorData.forEach((tutor) => {
        if (tutor.subjects && Array.isArray(tutor.subjects)) {
          tutor.subjects.forEach((s) => { if (s.name) uniqueSubjects.add(s.name); });
        }
        if (tutor.keahlian) uniqueSubjects.add(tutor.keahlian);
      });
      subjects.value = Array.from(uniqueSubjects).sort();

    } else {
      tutors.value = [];
    }
  } catch (err) {
    let errorMsg = "Gagal memuat data tutor";
    if (err.response?.status === 500) errorMsg = "Terjadi kesalahan server. Silakan coba lagi nanti.";
    else if (err.response?.data?.message) errorMsg = err.response.data.message;
    error.value = errorMsg;
    tutors.value = [];
  } finally {
    isLoading.value = false;
  }
}

let searchTimeout = null;
watch(searchQuery, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadTutors();
  }, 500);
});

const applyFilter = () => { loadTutors(); };

const filteredTutors = computed(() => {
  if (!tutors.value) return [];
  return tutors.value;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price || 0);
};

const waLink = (number) => {
  const n = (number || "").replace(/[^\d+]/g, "");
  const msisdn = n.startsWith("+") ? n.slice(1) : n;
  return `https://wa.me/${msisdn}`;
};

const goToDetail = (tutor) => {
  router.push({
    path: "/tutors/tutor-detail",
    query: {
      id: tutor.id,
      name: tutor.name,
      subject: tutor.subject,
      rating: tutor.rating,
      totalReviews: tutor.reviews,
      photo: tutor.photo,
      whatsapp: tutor.whatsapp,
      bio: tutor.bio,
      price: tutor.price,
      courseMode: tutor.teachingMode.join(","),
      level: tutor.level,
    },
  });
};

onMounted(() => { loadTutors(); });
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

.dashboard-scope {
  --border: rgba(0,0,0,0.08);
}

.font-heading { font-family: 'Nunito', sans-serif; }
.font-body { font-family: 'DM Sans', sans-serif; }

/* ── ANIMASI SHIFT WRAPPER ── */
@keyframes lz-content-shift {
  0% {
    margin-left: 260px;
    /* Dihapus padding-top karena Spacer di Navbar sudah mengatur ini */
  }
  100% {
    margin-left: 0;
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
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}

/* COMPONENT: FORM STYLES */
.form-label {
  display: block;
  font-size: 11px;
  color: #5a6370;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  font-weight: 800;
}

.form-input {
  width: 100%;
  height: 52px;
  padding: 0 16px;
  background-color: #F4F7FB;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #1a2332;
  transition: all 0.2s;
  outline: none;
}

.form-input:focus {
  background-color: #ffffff;
  border-color: #0C447C;
  box-shadow: 0 0 0 4px rgba(12, 68, 124, 0.1);
}
</style>