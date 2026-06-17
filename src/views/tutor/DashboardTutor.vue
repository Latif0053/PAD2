<template>
  <div class="min-h-screen flex flex-col bg-[#EEF2F7] dashboard-scope relative">
    <div class="relative z-50">
      <NavbarTutor />
    </div>

    <div class="lz-main-wrapper flex flex-col flex-1">
      <main class="flex-1 py-8 px-6 md:px-12 max-w-[1040px] w-full mx-auto font-body">
        
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-black/5 shadow-sm">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#1a2332]/10 border-t-[#1D9E75]"></div>
          <p class="mt-5 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest">Memuat data dashboard...</p>
        </div>

        <template v-else>
          
          <header class="mb-8">
            <h1 class="text-3xl md:text-4xl font-black text-[#1a2332] font-heading tracking-tight mb-2">
              Dashboard Tutor
            </h1>
            <p class="text-sm font-medium text-[#5a6370]">
              Ringkasan aktivitas dan jadwal mengajar Anda hari ini.
            </p>
          </header>

          <div class="mb-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="hifi-card p-6 md:p-8">
                <h3 class="text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest mb-3">Total Siswa</h3>
                <p class="text-4xl font-black text-[#1D9E75] font-heading">
                  {{ totalStudents }}
                </p>
                <p class="text-xs font-medium text-[#5a6370] mt-3">Siswa yang memilih Anda</p>
              </div>
              <div class="hifi-card p-6 md:p-8">
                <h3 class="text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest mb-3">Sesi Bulan Ini</h3>
                <p class="text-4xl font-black text-[#0C447C] font-heading">
                  {{ sessionsThisMonth }}
                </p>
                <p class="text-xs font-medium text-[#5a6370] mt-3">Sesi yang diselesaikan</p>
              </div>
              <div class="hifi-card p-6 md:p-8">
                <h3 class="text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest mb-3">Laporan Terkirim</h3>
                <p class="text-4xl font-black text-[#EF9F27] font-heading">
                  {{ laporanTerkirim }}
                </p>
                <p class="text-xs font-medium text-[#5a6370] mt-3">Data sementara</p>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="hifi-card overflow-hidden">
              <div class="px-6 py-5 border-b border-black/5 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h2 class="text-xl font-black text-[#1a2332] font-heading">
                  Daftar Ajuan Belajar
                </h2>
                <div class="flex items-center gap-4">
                  <button
                    @click="loadDashboard"
                    class="text-[#0C447C] hover:text-[#042C53] text-sm font-bold flex items-center gap-1.5 transition-colors"
                    :disabled="isLoading"
                  >
                    <i class="fas fa-sync" :class="{ 'animate-spin': isLoading }"></i>
                    Refresh
                  </button>
                  <router-link
                    to="/tutor/ajuan-belajar"
                    class="text-[#1D9E75] hover:text-[#0F6E56] text-sm font-bold transition-colors"
                  >
                    Lihat Semua &rarr;
                  </router-link>
                </div>
              </div>
              
              <div class="p-6 overflow-x-auto custom-scrollbar">
                <table class="min-w-full text-sm">
                  <thead class="border-b border-black/10">
                    <tr class="text-left">
                      <th class="pb-4 px-3 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest">No.</th>
                      <th class="pb-4 px-3 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest">Nama Siswa</th>
                      <th class="pb-4 px-3 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest">Mata Pelajaran</th>
                      <th class="pb-4 px-3 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest">Jadwal</th>
                      <th class="pb-4 px-3 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="learningRequests.length === 0">
                      <td colspan="5" class="py-12 text-center text-[#5a6370] text-sm font-medium bg-[#F4F7FB]/50 rounded-xl">
                        Belum ada ajuan belajar baru masuk.
                      </td>
                    </tr>
                    <tr
                      v-for="(request, index) in learningRequests"
                      :key="request.id"
                      class="border-b border-black/5 hover:bg-[#F4F7FB] transition-colors"
                    >
                      <td class="py-4 px-3 text-[#5a6370] font-bold">{{ index + 1 }}</td>
                      <td class="py-4 px-3 font-bold text-[#1a2332]">{{ request.name }}</td>
                      <td class="py-4 px-3 text-[#5a6370] font-medium">{{ request.subject }}</td>
                      <td class="py-4 px-3 text-[#5a6370] font-medium">{{ request.date }} • {{ request.time }}</td>
                      <td class="py-4 px-3 text-center">
                        <button
                          @click="viewRequestDetail(request.id)"
                          class="px-5 py-2.5 bg-[#1D9E75] hover:bg-[#0F6E56] text-white rounded-[10px] text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-[#1D9E75]/20"
                        >
                          Tinjau
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="hifi-card overflow-hidden">
              <div class="px-6 py-5 border-b border-black/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 class="text-xl font-black text-[#1a2332] font-heading">
                  Jadwal Mengajar
                </h2>

                <div class="flex items-center gap-2 bg-[#F4F7FB] p-1.5 rounded-xl border border-black/5">
                  <button
                    @click="prevDay"
                    class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-[#5a6370] hover:text-[#1a2332] transition-all shadow-sm hover:shadow"
                  >
                    <i class="fas fa-chevron-left text-xs"></i>
                  </button>

                  <input
                    type="date"
                    v-model="selectedDate"
                    class="bg-transparent border-none px-2 py-1 text-sm text-[#1a2332] font-bold focus:outline-none focus:ring-0 cursor-pointer"
                  />

                  <button
                    @click="nextDay"
                    class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-[#5a6370] hover:text-[#1a2332] transition-all shadow-sm hover:shadow"
                  >
                    <i class="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </div>

              <div class="p-6 h-[400px] overflow-y-auto bg-white custom-scrollbar">
                <div
                  v-for="(slot, index) in schedule"
                  :key="index"
                  class="flex items-start py-4 border-b border-black/5 last:border-none"
                >
                  <div class="w-20 text-[15px] font-black text-[#5a6370] pt-4">
                    {{ slot.time }}
                  </div>

                  <div v-if="slot.session" class="flex-1">
                    <div
                      class="p-5 rounded-2xl border flex flex-col md:flex-row md:justify-between md:items-center gap-4 transition-all"
                      :class="{
                        'bg-[#E1F5EE] border-[#1D9E75]/20': slot.session.status === 'berjalan',
                        'bg-[#F4F7FB] border-black/5': slot.session.status === 'selesai',
                        'bg-[#FAEEDA] border-[#EF9F27]/20': slot.session.status === 'belum',
                      }"
                    >
                      <div>
                        <p class="text-[#1a2332] font-black text-base font-heading mb-1">
                          {{ slot.session.student }}
                        </p>
                        <p class="text-[#5a6370] text-sm font-medium flex items-center gap-2">
                          <i class="fas fa-book-open text-xs opacity-50"></i> {{ slot.session.subject }}
                        </p>
                      </div>
                      <span
                        class="px-3.5 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider text-center w-fit"
                        :class="{
                          'bg-[#1D9E75] text-white shadow-sm shadow-[#1D9E75]/20': slot.session.status === 'berjalan',
                          'bg-[#EEF2F7] text-[#5a6370]': slot.session.status === 'selesai',
                          'bg-[#EF9F27] text-[#412402] shadow-sm shadow-[#EF9F27]/20': slot.session.status === 'belum',
                        }"
                      >
                        {{ slot.session.status === 'belum' ? 'Akan Datang' : slot.session.status }}
                      </span>
                    </div>
                  </div>

                  <div v-else class="flex-1">
                    <div class="h-16 border-2 border-dashed border-[#EEF2F7] rounded-2xl flex items-center px-5 text-[#9ba3ab] text-sm font-bold bg-[#fafcff]">
                      Kosong
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="hifi-card overflow-hidden">
              <div class="px-6 py-5 border-b border-black/5 flex justify-between items-center">
                <h2 class="text-xl font-black text-[#1a2332] font-heading">
                  Siswa Aktif
                </h2>
                <router-link to="/tutor/my-students" class="text-[#0C447C] hover:text-[#042C53] text-sm font-bold transition-colors">
                  Kelola Siswa &rarr;
                </router-link>
              </div>
              
              <div class="p-6 overflow-y-auto max-h-[350px] custom-scrollbar">
                <table class="min-w-full text-sm text-left">
                  <thead class="border-b border-black/10">
                    <tr>
                      <th class="pb-4 px-3 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest">Siswa</th>
                      <th class="pb-4 px-3 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest">Program</th>
                      <th class="pb-4 px-3 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest">Status Sesi</th>
                      <th class="pb-4 px-3 text-[11px] font-extrabold text-[#9ba3ab] uppercase tracking-widest text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="students.length === 0">
                       <td colspan="4" class="py-12 text-center text-[#5a6370] text-sm font-medium bg-[#F4F7FB]/50 rounded-xl">
                        Anda belum memiliki siswa aktif.
                      </td>
                    </tr>
                    <tr
                      v-for="student in students"
                      :key="student.name"
                      class="border-b border-black/5 hover:bg-[#F4F7FB] transition-colors"
                    >
                      <td class="py-4 px-3 flex items-center gap-3">
                        <img
                          :src="student.image"
                          alt="avatar"
                          class="w-10 h-10 rounded-xl object-cover border border-black/5 shadow-sm bg-slate-100"
                        />
                        <span class="font-bold text-[#1a2332] text-[15px]">{{ student.name }}</span>
                      </td>
                      <td class="py-4 px-3 text-[#5a6370] font-medium">{{ student.subject }}</td>
                      <td class="py-4 px-3">
                        <span class="flex items-center gap-2">
                           <span
                            class="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider"
                            :class="student.active ? 'bg-[#E1F5EE] text-[#0F6E56]' : 'bg-[#fee2e2] text-[#dc2626]'"
                          >
                            {{ student.active ? "Aktif" : "Habis" }}
                          </span>
                          <span class="text-xs font-bold text-[#5a6370]">({{ student.remaining_session }} Sesi)</span>
                        </span>
                      </td>
                      <td class="py-4 px-3 text-center">
                        <button
                          @click="viewAttendance(student.id)"
                          class="px-5 py-2.5 bg-[#0C447C] hover:bg-[#042C53] text-white rounded-[10px] text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-[#0C447C]/20"
                        >
                          Absensi
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </template>
        
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import NavbarTutor from "@/components/layout/navbar-tutor.vue";
import {
  getTutorSummary,
  getTutorDashboard,
} from "@/services/tutorDashboardService";

const router = useRouter();

// Loading states
const isLoading = ref(true);
const dashboardData = ref(null);
const summaryData = ref(null);

// Get today's date in local timezone (YYYY-MM-DD)
const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const selectedDate = ref(getTodayDate());

// Computed properties untuk statistik
const totalStudents = computed(() => summaryData.value?.total_students || 0);
const sessionsThisMonth = computed(
  () => summaryData.value?.completed_sessions_this_month || 0
);
const laporanTerkirim = computed(() => summaryData.value?.submitted_reports || 0);

// Computed untuk daftar ajuan belajar (active schedules dari siswa)
const learningRequests = computed(() => {
  if (!dashboardData.value?.taken_schedules) {
    return [];
  }

  // Filter schedule yang active (sudah dibayar, menunggu konfirmasi tutor) dan belum diterima
  const filtered = dashboardData.value.taken_schedules.filter((schedule) => {
    const isActive = schedule.status === "active";

    // Parse date dengan benar - handle both ISO format and YYYY-MM-DD
    let scheduleDate = new Date(schedule.date);
    if (schedule.date && !schedule.date.includes("T")) {
      const [year, month, day] = schedule.date.split("-").map(Number);
      scheduleDate = new Date(year, month - 1, day);
    }
    scheduleDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isFutureDate = scheduleDate >= today;

    // Lebih fleksibel: terima is_accepted === false, null, atau undefined
    const isNotAccepted = schedule.is_accepted !== true;

    return isActive && isFutureDate && isNotAccepted;
  });

  return filtered.map((schedule, index) => ({
    id: schedule.id,
    name: schedule.student_name || "N/A",
    subject: schedule.subject_name || "N/A",
    date: formatDate(schedule.date),
    time: schedule.schedule_time ? schedule.schedule_time.substring(0, 5) : "N/A",
  }));
});

// Computed untuk daftar siswa
const students = computed(() => {
  if (!dashboardData.value?.students) return [];

  return dashboardData.value.students.map((student) => ({
    id: student.student_user_id,
    name: student.student_name || "N/A",
    subject: student.subject_name || "N/A",
    active: student.remaining_session > 0,
    image:
      student.student_photo ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        student.student_name || "S"
      )}&size=80&background=0C447C&color=fff&bold=true`,
    remaining_session: student.remaining_session,
    total_session: student.total_session,
  }));
});

// Computed untuk jadwal hari ini
const schedule = computed(() => {
  const timeSlots = [];
  for (let hour = 7; hour <= 20; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    timeSlots.push({ time, session: null });
  }

  if (!dashboardData.value?.taken_schedules) return timeSlots;

  // Filter schedules untuk tanggal yang dipilih dan sudah diterima
  const schedulesForDate = dashboardData.value.taken_schedules.filter(
    (schedule) => {
      const scheduleDate = schedule.date ? schedule.date.split("T")[0] : "";
      return (
        scheduleDate === selectedDate.value &&
        schedule.is_accepted === true && // Only show accepted schedules
        schedule.status === "active"
      );
    }
  );

  // Map schedules ke time slots
  schedulesForDate.forEach((schedule) => {
    const scheduleTime = schedule.schedule_time?.substring(0, 5); // "08:00:00" -> "08:00"
    const slotIndex = timeSlots.findIndex((slot) => slot.time === scheduleTime);

    if (slotIndex !== -1) {
      timeSlots[slotIndex].session = {
        student: schedule.student_name || "N/A",
        subject: schedule.subject_name || "N/A",
        status: mapScheduleStatus(schedule.status),
      };
    }
  });

  return timeSlots;
});

// Helper function untuk format tanggal
const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", 
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};

// Helper function untuk mapping status
const mapScheduleStatus = (status) => {
  const statusMap = {
    completed: "selesai",
    active: "belum", 
    expired: "terlewat",
    cancelled: "dibatalkan",
  };
  return statusMap[status] || "belum";
};

// Load dashboard data
const loadDashboard = async () => {
  try {
    isLoading.value = true;
    const [summary, dashboard] = await Promise.all([
      getTutorSummary(),
      getTutorDashboard(),
    ]);

    summaryData.value = summary;
    dashboardData.value = dashboard;
  } catch (error) {
    console.error("Error loading dashboard:", error);
  } finally {
    isLoading.value = false;
  }
};

const prevDay = () => {
  const d = new Date(selectedDate.value);
  d.setDate(d.getDate() - 1);
  selectedDate.value = d.toISOString().substr(0, 10);
};

const nextDay = () => {
  const d = new Date(selectedDate.value);
  d.setDate(d.getDate() + 1);
  selectedDate.value = d.toISOString().substr(0, 10);
};

const viewRequestDetail = (id) => {
  router.push(`/tutor/data-siswa?id=${id}`);
};

const viewAttendance = (studentId) => {
  router.push(`/tutor/absensi-student?id=${studentId}`);
};

onMounted(() => {
  loadDashboard();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=DM+Sans:wght@400;500;700&display=swap');

.dashboard-scope {
  --border: rgba(0,0,0,0.08);
}

.font-heading { font-family: 'Nunito', sans-serif; }
.font-body { font-family: 'DM Sans', sans-serif; }

/* SCROLLBAR CUSTOMIZATION */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #EEF2F7;
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ba3ab;
}

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
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}
</style>
