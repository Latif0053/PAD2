<template>
  <div class="min-h-screen flex flex-col bg-[#EEF2F7] dashboard-scope relative">
    
    <div class="relative z-50">
      <Navbar />
    </div>

    <div class="lz-main-wrapper flex flex-col flex-1">
      
      <main class="flex-1 py-8 px-6 md:px-12 max-w-[1040px] w-full mx-auto font-body">
        
        <header class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div class="space-y-1">
            <h1 class="text-3xl md:text-4xl font-extrabold text-[#1a2332] tracking-tight font-heading">
              Jadwal Belajar
            </h1>
            <p class="text-sm font-medium text-[#5a6370]">
              Kelola dan lihat jadwal pertemuan dengan tutor kamu
            </p>
          </div>
          <button @click="router.push('/tutors')" class="hidden md:flex items-center gap-2 bg-[#0C447C] text-white px-5 py-2.5 rounded-[10px] text-xs font-bold uppercase tracking-wider hover:bg-[#042C53] transition-colors shadow-md shadow-[#0C447C]/20">
            <Calendar class="w-4 h-4" />
            Buat Jadwal Baru
          </button>
        </header>

        <div class="hifi-card overflow-hidden">
          
          <div class="flex border-b border-black/5 bg-white">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="activeTab = tab.value"
              class="flex-1 md:flex-none px-8 py-4 text-xs font-black uppercase tracking-widest transition-colors font-heading text-center"
              :class="
                activeTab === tab.value
                  ? 'text-[#0C447C] border-b-[3px] border-[#0C447C]'
                  : 'text-[#9ba3ab] hover:text-[#5a6370] border-b-[3px] border-transparent'
              "
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="p-6 md:p-8 bg-[#fafcff] min-h-[400px]">
            
            <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
              <div class="animate-spin rounded-full h-10 w-10 border-4 border-[#1a2332]/10 border-t-[#1D9E75]"></div>
              <p class="mt-4 text-xs font-bold text-[#5a6370] uppercase tracking-widest">Memuat jadwal...</p>
            </div>

            <div v-else-if="activeTab === 'upcoming'" class="space-y-4">
              <div
                v-for="schedule in upcomingSchedules"
                :key="schedule.id"
                class="bg-white rounded-[14px] shadow-sm border border-black/5 p-5 md:p-6 hover:border-[#1D9E75]/30 hover:shadow-md transition-all group"
              >
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-[#E6F1FB] rounded-[10px] flex items-center justify-center shrink-0 border border-[#185FA5]/10 group-hover:bg-[#185FA5] group-hover:text-white transition-colors text-[#185FA5]">
                      <Calendar class="w-6 h-6" />
                    </div>
                    <div>
                      <h3 class="font-black text-xl text-[#1a2332] font-heading mb-1">
                        {{ schedule.subject }}
                      </h3>
                      <p class="text-xs font-medium text-[#5a6370] mb-3">
                        Tutor: <span class="font-bold text-[#1a2332]">{{ schedule.tutor }}</span>
                      </p>
                      <div class="flex flex-wrap items-center gap-3 text-[11px] font-bold text-[#5a6370]">
                        <span class="flex items-center gap-1.5 bg-[#EEF2F7] px-2.5 py-1 rounded-md">
                          <Clock class="w-3.5 h-3.5 text-[#9ba3ab]" />
                          {{ schedule.date }} • {{ schedule.time }}
                        </span>
                        <span
                          class="px-2.5 py-1 rounded-md uppercase tracking-wider"
                          :class="
                            schedule.mode === 'online'
                              ? 'bg-[#E1F5EE] text-[#0F6E56]'
                              : 'bg-[#FAEEDA] text-[#412402]'
                          "
                        >
                          {{ schedule.mode === "online" ? "Online" : "Offline" }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-2 shrink-0 border-t border-black/5 pt-4 md:border-none md:pt-0">
                    <button
                      @click="handleJoinClass(schedule)"
                      v-if="schedule.mode === 'online'"
                      :disabled="!schedule.meetingLink"
                      class="px-5 py-2.5 rounded-[10px] text-xs font-bold uppercase tracking-wider transition-all"
                      :class="
                        schedule.meetingLink
                          ? 'bg-[#0C447C] text-white hover:bg-[#042C53] shadow-md shadow-[#0C447C]/20'
                          : 'bg-[#EEF2F7] text-[#9ba3ab] cursor-not-allowed'
                      "
                    >
                      {{ schedule.meetingLink ? "Gabung Kelas" : "Menunggu Link" }}
                    </button>

                    <button
                      v-if="!schedule.hasAttendance"
                      @click="handleSubmitAttendance(schedule.id)"
                      class="px-5 py-2.5 rounded-[10px] text-xs font-bold uppercase tracking-wider bg-[#1D9E75] text-white hover:bg-[#0F6E56] shadow-md shadow-[#1D9E75]/20 transition-all"
                    >
                      Kirim Absensi
                    </button>
                    <span
                      v-else
                      class="px-5 py-2.5 rounded-[10px] text-[11px] font-black uppercase tracking-wider bg-[#EAF3DE] text-[#3B6D11] flex items-center justify-center gap-1.5 border border-[#3B6D11]/20"
                    >
                      <CheckCircle class="w-4 h-4" />
                      Absensi Terkirim
                    </span>
                  </div>
                </div>
              </div>

              <div v-if="upcomingSchedules.length === 0" class="flex flex-col items-center justify-center text-center py-16">
                <div class="w-16 h-16 bg-[#EEF2F7] rounded-[14px] flex items-center justify-center mb-5 border border-black/5">
                  <Calendar class="w-8 h-8 text-[#9ba3ab]" />
                </div>
                <h4 class="text-lg font-black text-[#1a2332] font-heading mb-1">Belum ada jadwal mendatang</h4>
                <p class="text-xs text-[#5a6370] mb-6 font-medium">Jadwalkan sesi bareng tutor favoritmu sekarang.</p>
                <button @click="router.push('/tutors')" class="px-6 py-2.5 bg-[#0C447C] text-white text-xs font-bold uppercase tracking-wider rounded-[10px] shadow-md hover:bg-[#042C53] transition-colors">
                  Cari Tutor
                </button>
              </div>
            </div>

            <div v-if="activeTab === 'history'" class="space-y-4">
              <div
                v-for="schedule in historySchedules"
                :key="schedule.id"
                class="bg-white rounded-[14px] shadow-sm border border-black/5 p-5 md:p-6 group"
              >
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-[#EEF2F7] rounded-[10px] flex items-center justify-center shrink-0 border border-black/5 text-[#9ba3ab]">
                      <CheckCircle class="w-6 h-6" />
                    </div>
                    <div>
                      <h3 class="font-black text-xl text-[#1a2332] font-heading mb-1">
                        {{ schedule.subject }}
                      </h3>
                      <p class="text-xs font-medium text-[#5a6370] mb-3">
                        Tutor: <span class="font-bold text-[#1a2332]">{{ schedule.tutor }}</span>
                      </p>
                      <div class="flex flex-wrap items-center gap-3 text-[11px] font-bold text-[#5a6370]">
                        <span class="flex items-center gap-1.5 bg-[#EEF2F7] px-2.5 py-1 rounded-md">
                          <Clock class="w-3.5 h-3.5 text-[#9ba3ab]" />
                          {{ schedule.date }} • {{ schedule.time }}
                        </span>
                        <span class="px-2.5 py-1 rounded-md uppercase tracking-wider bg-[#EAF3DE] text-[#3B6D11]">
                          Selesai
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="shrink-0 border-t border-black/5 pt-4 md:border-none md:pt-0">
                    <button
                      @click="handleSubmitReview(schedule)"
                      class="w-full md:w-auto px-5 py-2.5 rounded-[10px] text-xs font-bold uppercase tracking-wider border-2 border-[#0C447C] text-[#0C447C] hover:bg-[#0C447C] hover:text-white transition-all"
                    >
                      Beri Review
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="historySchedules.length === 0" class="flex flex-col items-center justify-center text-center py-16">
                <div class="w-16 h-16 bg-[#EEF2F7] rounded-[14px] flex items-center justify-center mb-5 border border-black/5">
                  <CheckCircle class="w-8 h-8 text-[#9ba3ab]" />
                </div>
                <h4 class="text-lg font-black text-[#1a2332] font-heading mb-1">Belum ada riwayat pertemuan</h4>
                <p class="text-xs text-[#5a6370] font-medium">Sesi yang sudah selesai akan muncul di sini.</p>
              </div>
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
import Navbar from "@/components/layout/navbar.vue";
import { Calendar, Clock, CheckCircle } from "lucide-vue-next";
import { getStudentDashboard } from "@/services/studentDashboardService";
import { useModalStore } from "@/stores/modalStore";

const router = useRouter();
const modal = useModalStore();
const activeTab = ref("upcoming");
const isLoading = ref(true);
const allSchedules = ref([]);

const tabs = [
  { label: "Mendatang", value: "upcoming" },
  { label: "Riwayat", value: "history" },
];

const loadSchedules = async () => {
  try {
    isLoading.value = true;
    const dashRes = await getStudentDashboard();
    const data = dashRes.data || dashRes;

    // Ambil semua schedules dari dashboard
    const schedules = data.schedules || [];

    // Map data ke format yang dibutuhkan frontend
    allSchedules.value = schedules.map(schedule => ({
      id: schedule.id,
      subject_name: schedule.subject_name || "Mata Pelajaran",
      subject: schedule.subject_name || "Mata Pelajaran",
      tutor_name: schedule.tutor_name || "Tutor",
      tutor_id: schedule.tutor_id || null,
      tutor_photo: schedule.tutor_photo,
      date: schedule.date,
      schedule_time: schedule.schedule_time,
      time: schedule.schedule_time,
      schedule_day: schedule.schedule_day,
      status: schedule.status || "pending",
      course_mode: "online", // Default, karena tidak ada di response
      has_attendance: false, // Default, perlu dicek dari backend
      meeting_link: null, // Tidak ada di response
      meeting_link_sent: false,
    }));

    console.log("Loaded schedules:", allSchedules.value);
  } catch (error) {
    console.error("Error loading schedules:", error);
    modal.showAlert("Gagal", "Gagal memuat jadwal belajar Anda.", "error");
  } finally {
    isLoading.value = false;
  }
};

const upcomingSchedules = computed(() => {
  const upcomingStatuses = ["paid", "approved", "unpaid", "active", "scheduled", "pending"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return allSchedules.value
    .filter((schedule) => {
      const normalizedStatus = (schedule.status || "").toString().toLowerCase();
      const scheduleDate = schedule.date ? new Date(schedule.date) : null;

      // Filter: status harus upcoming DAN tanggal >= hari ini
      return (
        upcomingStatuses.includes(normalizedStatus) &&
        scheduleDate &&
        scheduleDate >= today
      );
    })
    .sort((a, b) => {
      // Sort by date ascending (terdekat dulu)
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    })
    .map((schedule) => ({
      id: schedule.id,
      subject: schedule.subject_name || schedule.subject,
      tutor: schedule.tutor_name,
      tutorId: schedule.tutor_id,
      date: formatDate(schedule.date),
      time: schedule.schedule_time || schedule.time,
      mode: schedule.course_mode || "online",
      status: schedule.status,
      hasAttendance: schedule.has_attendance,
      meetingLink: schedule.meeting_link,
      meetingLinkSent: schedule.meeting_link_sent,
    }));
});

const historySchedules = computed(() => {
  const historyStatuses = ["completed", "cancelled", "finished", "done"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return allSchedules.value
    .filter((schedule) => {
      const normalizedStatus = (schedule.status || "").toString().toLowerCase();
      const scheduleDate = schedule.date ? new Date(schedule.date) : null;

      // Filter: status completed/cancelled ATAU tanggal < hari ini
      return (
        historyStatuses.includes(normalizedStatus) ||
        (scheduleDate && scheduleDate < today)
      );
    })
    .sort((a, b) => {
      // Sort by date descending (terbaru dulu)
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    })
    .map((schedule) => ({
      id: schedule.id,
      subject: schedule.subject_name || schedule.subject,
      tutor: schedule.tutor_name,
      tutorId: schedule.tutor_id,
      date: formatDate(schedule.date),
      time: schedule.schedule_time || schedule.time,
      mode: schedule.course_mode || "online",
      status: schedule.status,
      hasAttendance: schedule.has_attendance,
    }));
});

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const handleJoinClass = async (schedule) => {
  if (schedule.mode === "online") {
    if (schedule.meetingLink) {
      window.open(schedule.meetingLink, "_blank");
    } else {
      modal.showAlert(
        "Link Belum Tersedia", 
        "Tutor belum mengirimkan link meeting. Mohon cek kembali beberapa saat lagi.", 
        "info"
      );
    }
  }
};

const handleSubmitAttendance = (scheduleId) => {
  router.push(`/student/attendance/${scheduleId}`);
};

const handleSubmitReview = (schedule) => {
  router.push({
    path: `/student/review/${schedule.tutorId}`,
    query: {
      name: schedule.tutor,
      subject: schedule.subject,
    },
  });
};

onMounted(() => {
  loadSchedules();
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

/* HI-FI CARD SYSTEM */
.hifi-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}
</style>