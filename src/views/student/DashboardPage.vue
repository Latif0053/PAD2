<template>
  <div class="min-h-screen flex flex-col bg-[#EEF2F7] dashboard-scope relative">
    
    <div class="relative z-50">
      <Navbar />
    </div>

    <div class="lz-main-wrapper flex flex-col min-h-screen">
      
      <main class="flex-1 px-6 md:px-12 max-w-[1440px] w-full mx-auto font-body py-8">
        
        <header class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div class="space-y-1">
            <p class="text-xs font-bold tracking-[1px] text-[#1D9E75] uppercase font-body">Overview Dashboard</p>
            <h1 class="text-4xl font-extrabold text-[#1a2332] tracking-tight font-heading">
              Dashboard
            </h1>
          </div>
          <div class="hidden md:flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-black/5 shadow-sm">
            <svg class="w-5 h-5 text-[#5a6370]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span class="text-sm font-semibold text-[#5a6370]">Terakhir diperbarui: {{ new Date().toLocaleDateString('id-ID') }}</span>
          </div>
        </header>

        <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div class="xl:col-span-8 space-y-6">
            
            <section v-if="!isLoadingDashboard" class="welcome-banner h-56 md:h-48">
              <div class="welcome-bubble-1"></div>
              <div class="welcome-bubble-2"></div>
              <div class="relative z-10 space-y-2">
                <div class="text-xs font-bold uppercase tracking-[1px] text-white/70">Selamat Datang Kembali</div>
                <h2 class="text-3xl font-black text-white font-heading">{{ user?.name || 'Siswa' }}</h2>
                <p class="text-sm text-white/90 font-medium">Semangat belajar hari ini!</p>
              </div>
              <div class="date-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}
              </div>
            </section>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div class="hifi-card p-6 flex flex-col justify-between">
                <div class="flex justify-between items-start">
                  <div class="stat-icon-bg bg-[#E1F5EE]">
                    <svg class="w-5 h-5 text-[#1D9E75]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                  </div>
                  <span v-if="paketAktif" class="badge-hifi badge-active">AKTIF</span>
                </div>
                <div class="mt-5">
                  <div class="text-xs font-bold text-[#5a6370] uppercase">Paket Saat Ini</div>
                  <div class="text-base font-extrabold text-[#1a2332] font-heading line-clamp-1 mt-1">{{ paketAktif?.nama || 'Belum Ada Paket' }}</div>
                </div>
                <hr class="my-4 border-black/5" />
                <div class="flex justify-between items-center">
                  <span class="text-xs text-[#5a6370] font-medium">Sisa Pertemuan</span>
                  <span class="text-xl font-black text-[#0C447C] font-heading">{{ sisaSesi }} <span class="text-xs font-normal text-[#9ba3ab]">/ {{ totalSesi }}</span></span>
                </div>
              </div>

              <div class="hifi-card p-6">
                <div class="flex justify-between items-start mb-5">
                  <div class="stat-icon-bg bg-[#FAEEDA]">
                    <svg class="w-5 h-5 text-[#EF9F27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <span class="text-2xl font-black text-[#1D9E75] font-heading">{{ Math.round(progressPercent) }}%</span>
                </div>
                <div class="text-xs font-bold text-[#5a6370] uppercase">Pencapaian</div>
                <div class="text-base font-bold text-[#1a2332] font-heading mb-4 mt-1 line-clamp-1">{{ progress.mapel || 'Progress Belajar' }}</div>
                <div class="h-2 w-full bg-[#EEF2F7] rounded-full overflow-hidden">
                  <div class="h-full bg-[#1D9E75] rounded-full" :style="{ width: progressPercent + '%' }"></div>
                </div>
              </div>

              <div class="hifi-card p-6 flex flex-col justify-between">
                <div class="stat-icon-bg bg-[#E6F1FB] mb-5">
                  <svg class="w-5 h-5 text-[#185FA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div class="text-xs font-bold text-[#5a6370] uppercase">Jadwal Mendatang</div>
                <div class="text-base font-extrabold text-[#1a2332] font-heading mt-1">{{ progress.jadwalBerikut !== 'Belum ada jadwal' ? 'Tersedia' : 'Belum Ada' }}</div>
                <div class="mt-4">
                   <button @click="router.push('/student/schedule')" class="text-sm font-bold text-[#185FA5] hover:underline">+ Atur jadwal &rarr;</button>
                </div>
              </div>
            </div>

            <section class="hifi-card overflow-hidden">
              <div class="px-6 py-5 border-b border-black/5 flex justify-between items-center">
                <h3 class="text-base font-black text-[#1a2332] font-heading uppercase tracking-wider">Jadwal Mendatang</h3>
                <button @click="router.push('/student/schedule')" class="text-sm font-bold text-[#0C447C]">Lihat semua &rarr;</button>
              </div>
              
              <div v-if="isLoadingDashboard" class="p-12 flex justify-center">
                <div class="animate-spin rounded-full h-10 w-10 border-2 border-[#1D9E75] border-t-transparent"></div>
              </div>

              <div v-else-if="jadwalList.length > 0" class="p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div v-for="(jadwal, index) in jadwalList" :key="index" 
                     class="p-5 rounded-xl border border-black/5 hover:border-[#1D9E75]/30 hover:bg-[#EEF2F7]/50 transition-all flex items-center gap-5">
                  <div class="w-14 h-14 rounded-xl bg-[#F4F7FB] flex flex-col items-center justify-center shrink-0 border border-black/5">
                    <span class="text-xs font-black text-[#5a6370] uppercase">{{ jadwal.waktu.split(',')[0].substring(0,3) }}</span>
                    <span class="text-xl font-black text-[#1a2332] leading-none mt-1">{{ jadwal.waktu.split(',')[1]?.trim().match(/\d+/)?.[0] || '—' }}</span>
                  </div>
                  <div class="min-w-0">
                    <div class="text-sm font-bold text-[#1a2332] truncate">{{ jadwal.matkul }}</div>
                    <div class="text-xs text-[#5a6370] mt-1 flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {{ jadwal.waktu.split(',')[1] || jadwal.waktu }}
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="p-16 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-[#EEF2F7] rounded-2xl flex items-center justify-center mb-5">
                  <svg class="w-8 h-8 text-[#9ba3ab]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <p class="text-base font-bold text-[#5a6370] font-heading">Jadwal masih kosong</p>
                <p class="text-sm text-[#9ba3ab] mb-6 mt-1">Jadwalkan sesi bareng tutor favoritmu</p>
                <button @click="router.push('/tutors')" class="px-8 py-3 bg-[#0C447C] text-white text-sm font-bold rounded-xl hover:bg-[#042C53] transition-colors">Cari Tutor</button>
              </div>
            </section>
          </div>

          <div class="xl:col-span-4">
            <section class="hifi-card flex flex-col h-full xl:max-h-[calc(100vh-120px)] xl:sticky xl:top-28">
              <div class="p-6 border-b border-black/5">
                <h3 class="text-base font-black text-[#1a2332] font-heading uppercase tracking-wider">Rekomendasi Tutor</h3>
                <p class="text-xs text-[#5a6370] mt-1 font-medium">Tutor terbaik untukmu</p>
              </div>

              <div v-if="isLoadingTutors" class="flex-1 flex items-center justify-center p-8">
                <div class="animate-spin rounded-full h-8 w-8 border-2 border-[#1D9E75] border-t-transparent"></div>
              </div>

              <div v-else-if="tutors.length > 0" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                <div v-for="tutor in tutors" :key="tutor.id" 
                     class="p-4 bg-white border border-black/5 rounded-xl hover:border-[#1D9E75]/30 hover:shadow-sm transition-all cursor-pointer flex items-center gap-4"
                     @click="goToTutorDetail(tutor)">
                  
                  <div class="relative shrink-0">
                    <img :src="tutor.photo" :alt="tutor.name" @error="(e) => handleTutorPhotoError(e, tutor.name)" class="w-12 h-12 rounded-xl object-cover bg-slate-100 shadow-sm" />
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-black text-[#1a2332] truncate font-heading">{{ tutor.name }}</div>
                    <div class="text-xs text-[#5a6370] truncate mt-0.5">{{ tutor.keahlian || tutor.subject }}</div>
                  </div>
                  
                  <span class="px-2.5 py-1 bg-[#E1F5EE] text-[#0F6E56] text-[10px] font-black rounded-md shrink-0">ONLINE</span>
                </div>
              </div>

              <div v-else class="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <p class="text-sm font-medium text-[#9ba3ab]">Belum ada rekomendasi tutor.</p>
              </div>

              <div class="p-5 border-t border-black/5 mt-auto">
                <RouterLink to="/tutors" class="flex items-center justify-center w-full py-3 bg-[#0C447C] text-white text-sm font-black rounded-xl hover:bg-[#042C53] transition-colors uppercase tracking-widest">
                  Semua Tutor &rarr;
                </RouterLink>
              </div>
            </section>
          </div>

        </div>
      </main>

      <FooterStudent class="mt-auto border-t border-black/5 bg-white shrink-0" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter, RouterLink } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";
import FooterStudent from "@/components/layout/footer.vue";
import { getMe } from "@/services/authService.js";
import {
  getStudentDashboard,
  getRecommendedTutors,
} from "@/services/studentDashboardService";

const user = ref(null);
const isLoadingDashboard = ref(false);
const isLoadingTutors = ref(false);
const router = useRouter();

const paketAktif = ref(null);
const progress = ref({
  program: "",
  mapel: "",
  tutor: "",
  totalSesi: 0,
  sesiSelesai: 0,
  jadwalBerikut: "Belum ada jadwal",
  updatedAt: "",
});

const jadwalList = ref([]);
const tutors = ref([]);

const totalSesi = computed(() => paketAktif?.value?.totalSesi ?? 0);
const sisaSesi = computed(() => {
  if (!paketAktif.value) return 0;
  return paketAktif.value.totalSesi - paketAktif.value.sesiTerpakai;
});

const progressPercent = computed(() => {
  const t = progress.value.totalSesi || 1;
  return (progress.value.sesiSelesai / t) * 100;
});

function formatDate(dateStr) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  } catch (_) {}
  return String(dateStr);
}

function formatJadwal(dateStr, timeStr) {
  if (!dateStr && !timeStr) return "-";
  let tgl = dateStr;
  try {
    const d = new Date(dateStr);
    if (!Number.isNaN(d.getTime())) {
      tgl = d.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      });
    }
  } catch (_) {}
  return [tgl, timeStr].filter(Boolean).join(", ");
}

async function loadDashboard() {
  try {
    isLoadingDashboard.value = true;
    const meRes = await getMe();
    user.value = meRes.user;

    const dashRes = await getStudentDashboard();
    const data = dashRes.data || dashRes;

    const packages = data.packages || [];
    if (packages.length > 0) {
      const pkg = packages[0];
      const totalPertemuan = pkg.package_session ?? 0;
      const sisaPertemuan = pkg.remaining_session ?? totalPertemuan;
      const pertemuanSelesai = totalPertemuan - sisaPertemuan;

      paketAktif.value = {
        nama: pkg.package_name || "Paket Belajar",
        totalSesi: totalPertemuan,
        sesiTerpakai: pertemuanSelesai,
        berlakuSampai: pkg.end_date || null,
      };

      progress.value.program = pkg.package_name || "Paket Belajar";
      progress.value.mapel = pkg.subject_name || "Mapel";
      progress.value.tutor = pkg.tutor_name || "-";
      progress.value.totalSesi = totalPertemuan;
      progress.value.sesiSelesai = pertemuanSelesai;
    }

    const upcoming = data.upcoming_schedules || [];
    jadwalList.value = upcoming.map((js) => ({
      matkul: js.subject_name || "-",
      waktu: formatJadwal(js.date, js.schedule_time),
    }));

    if (upcoming.length > 0) {
      const first = upcoming[0];
      progress.value.jadwalBerikut = formatJadwal(first.date, first.schedule_time);
    }
  } catch (err) {
    console.error("Gagal load dashboard:", err);
  } finally {
    isLoadingDashboard.value = false;
  }
}

async function loadRecommendedTutors() {
  try {
    isLoadingTutors.value = true;
    const recRes = await getRecommendedTutors(1);
    const recData = recRes.data || recRes;

    console.log("Raw tutor data from backend:", recData);

    tutors.value = (recData || []).map((t) => {
      const fallbackName = t.tutor_name || t.name || "Tutor";

      let photoUrl;
      if (t.tutor_photo && t.tutor_photo !== "default" && t.tutor_photo !== null) {
        photoUrl = `http://localhost:8000/storage/${t.tutor_photo}`;
      } else {
        photoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&size=200&background=0C447C&color=fff&bold=true`;
      }

      console.log(`Tutor ${fallbackName} photo:`, t.tutor_photo, "=>", photoUrl);

      return {
        id: t.tutor_id || t.id,
        name: fallbackName,
        keahlian: t.keahlian || (t.subjects || []).map((s) => s.subject_name).join(", ") || "Umum",
        subject: (t.subjects || []).map((s) => s.subject_name).join(", "),
        rating: t.rating ?? 0,
        totalReviews: t.total_reviews ?? 0,
        totalStudents: t.total_students ?? 0,
        totalSessions: t.total_sessions ?? 0,
        courseMode: t.course_mode || "online",
        photo: photoUrl,
        whatsapp: t.telephone_number || "",
        bio: t.description || "",
        education: t.education || "",
        price: t.price || 0,
      };
    });

    console.log("Mapped tutors:", tutors.value);
  } catch (err) {
    console.error("Gagal load tutor rekomendasi:", err);
  } finally {
    isLoadingTutors.value = false;
  }
}

function handleTutorPhotoError(event, tutorName = "Tutor") {
  console.log("Image load error for tutor:", tutorName);
  event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tutorName)}&size=200&background=0C447C&color=fff&bold=true`;
}

function goToTutorDetail(tutor) {
  router.push({
    path: "/tutors/tutor-detail",
    query: {
      id: tutor.id,
      name: tutor.name,
      subject: tutor.subject,
      keahlian: tutor.keahlian,
      rating: tutor.rating,
      totalReviews: tutor.totalReviews,
      totalStudents: tutor.totalStudents,
      totalSessions: tutor.totalSessions,
      courseMode: tutor.courseMode,
      photo: tutor.photo,
      whatsapp: tutor.whatsapp,
      bio: tutor.bio,
      education: tutor.education,
      price: tutor.price,
    },
  });
}

onMounted(() => {
  loadDashboard();
  loadRecommendedTutors();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=DM+Sans:wght@400;500;700&display=swap');

.dashboard-scope {
  --navy: #0C447C;
  --teal: #1D9E75;
  --amber: #EF9F27;
}

.font-heading { font-family: 'Nunito', sans-serif; }
.font-body { font-family: 'DM Sans', sans-serif; }

/* ANIMASI SHIFT WRAPPER (Target akhir disesuaikan ke 88px) */
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

/* HI-FI CARD SYSTEM */
.hifi-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 4px 16px rgba(0,0,0,0.02);
}

.stat-icon-bg {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* WELCOME BANNER STYLE */
.welcome-banner {
  background: var(--navy);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.welcome-bubble-1 {
  position: absolute;
  right: -10px;
  top: -20px;
  width: 150px;
  height: 150px;
  background: rgba(29,158,117,0.18);
  border-radius: 50%;
}

.welcome-bubble-2 {
  position: absolute;
  right: 100px;
  bottom: -40px;
  width: 100px;
  height: 100px;
  background: rgba(255,255,255,0.05);
  border-radius: 50%;
}

.date-chip {
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 10px;
  padding: 10px 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.9);
  font-size: 13px;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

/* BADGES */
.badge-hifi {
  font-size: 11px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
}
.badge-active {
  background: #E1F5EE;
  color: #0F6E56;
}

/* SCROLLBAR */
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>