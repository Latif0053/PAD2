<template>
  <div class="min-h-screen flex flex-col bg-[#EEF2F7] dashboard-scope relative">
    <div class="relative z-50">
      <NavbarTutor />
    </div>

    <div class="lz-main-wrapper flex flex-col flex-1">
      <main class="flex-1 py-8 px-6 md:px-12 max-w-[1040px] w-full mx-auto font-body">
        <!-- Header with Back Button -->
        <div class="mb-8">
          <button
            @click="goBack"
            class="flex items-center gap-2 text-[#5a6370] hover:text-[#0C447C] font-bold text-sm mb-6 transition-colors w-fit"
          >
            <ArrowLeft class="w-5 h-5" />
            Kembali ke Dashboard
          </button>

          <h1 class="text-3xl md:text-4xl font-black text-[#1a2332] tracking-tight font-heading mb-2">
            Ajuan Belajar
          </h1>
          <p class="text-sm font-medium text-[#5a6370]">
            Daftar permintaan belajar dari siswa yang menunggu konfirmasi Anda
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-black/5 shadow-sm">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-[#1a2332]/10 border-t-[#1D9E75]"></div>
          <p class="mt-5 text-xs font-bold text-[#5a6370] uppercase tracking-widest">Memuat ajuan belajar...</p>
        </div>

        <!-- Student Request Cards -->
        <div v-else class="space-y-6">
          <div
            v-for="student in students"
            :key="student.id"
            class="hifi-card p-6 hover:shadow-lg transition-all"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Student Photo -->
              <div class="flex-shrink-0">
                <img
                  :src="student.photo"
                  :alt="student.name"
                  @error="
                    (e) =>
                      (e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        student.name
                      )}&size=150&background=0C447C&color=fff&bold=true`)
                  "
                  class="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md"
                />
              </div>

              <!-- Student Info -->
              <div class="flex-1">
                <h3 class="text-xl font-black text-[#1a2332] font-heading mb-3">
                  {{ student.name }}
                </h3>

                <div class="space-y-2.5 text-sm">
                  <div class="flex items-center gap-2.5">
                    <div class="w-10 h-10 bg-[#E1F5EE] rounded-lg flex items-center justify-center">
                      <BookOpen class="w-5 h-5 text-[#1D9E75]" />
                    </div>
                    <span class="font-bold text-[#1a2332]">{{ student.subject }}</span>
                  </div>

                  <div class="flex items-center gap-2.5">
                    <div class="w-10 h-10 bg-[#E6F1FB] rounded-lg flex items-center justify-center">
                      <Calendar class="w-5 h-5 text-[#185FA5]" />
                    </div>
                    <span class="font-medium text-[#5a6370]">{{ student.schedule }}</span>
                  </div>

                  <div class="flex items-center gap-2.5">
                    <div class="w-10 h-10 bg-[#FAEEDA] rounded-lg flex items-center justify-center">
                      <Clock class="w-5 h-5 text-[#EF9F27]" />
                    </div>
                    <span class="font-medium text-[#5a6370]">{{ student.time }}</span>
                  </div>

                  <div v-if="student.phone" class="flex items-center gap-2.5">
                    <div class="w-10 h-10 bg-[#EEF2F7] rounded-lg flex items-center justify-center">
                      <Phone class="w-5 h-5 text-[#0C447C]" />
                    </div>
                    <span class="font-medium text-[#5a6370]">{{ student.phone }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex md:flex-col gap-3 justify-end items-end">
                <button
                  @click="handleReject(student.id)"
                  :disabled="processing === student.id"
                  class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ processing === student.id ? "Memproses..." : "Tolak" }}
                </button>
                <button
                  @click="handleAccept(student.id)"
                  :disabled="processing === student.id"
                  class="px-6 py-3 bg-[#1D9E75] text-white rounded-lg font-bold hover:bg-[#0F6E56] transition-all shadow-md w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ processing === student.id ? "Memproses..." : "Terima" }}
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="students.length === 0"
            class="hifi-card p-16 text-center"
          >
            <div class="w-20 h-20 bg-[#EEF2F7] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Inbox class="w-10 h-10 text-[#9ba3ab]" />
            </div>
            <h3 class="text-xl font-black text-[#1a2332] font-heading mb-2">
              Belum ada ajuan belajar
            </h3>
            <p class="text-sm font-medium text-[#5a6370]">
              Ajuan belajar dari siswa akan muncul di sini
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Phone,
  Inbox,
} from "lucide-vue-next";
import NavbarTutor from "@/components/layout/navbar-tutor.vue";
import {
  getTutorDashboard,
  acceptLearningRequest,
  rejectLearningRequest,
} from "@/services/tutorDashboardService";

const router = useRouter();
const isLoading = ref(true);
const processing = ref(null);
const students = ref([]);

// Helper function untuk format tanggal
const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};

// Load learning requests from API
const loadLearningRequests = async () => {
  try {
    isLoading.value = true;
    const dashboard = await getTutorDashboard();

    console.log("Dashboard data:", dashboard);

    // Filter only active (pending approval) schedules that haven't been accepted yet
    const activeRequests =
      dashboard.taken_schedules?.filter(
        (schedule) =>
          schedule.status === "active" &&
          schedule.is_accepted === false && // Only show not yet accepted
          new Date(schedule.date) >= new Date().setHours(0, 0, 0, 0)
      ) || [];

    console.log("Active requests:", activeRequests);

    students.value = activeRequests.map((schedule) => ({
      id: schedule.id,
      name: schedule.student_name || "N/A",
      photo:
        schedule.student_photo && schedule.student_photo.trim() !== ""
          ? schedule.student_photo
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              schedule.student_name || "Student"
            )}&size=150&background=0C447C&color=fff&bold=true`,
      subject: schedule.subject_name || "N/A",
      schedule: formatDate(schedule.date),
      time: schedule.schedule_time || "N/A",
      phone: schedule.student_phone || null,
    }));

    console.log("Formatted students:", students.value);
  } catch (error) {
    console.error("Error loading learning requests:", error);
    alert("Gagal memuat daftar ajuan belajar");
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push("/tutor/dashboard");
};

const handleAccept = async (studentId) => {
  if (!confirm("Apakah Anda yakin ingin menerima ajuan belajar ini?")) {
    return;
  }

  try {
    processing.value = studentId;
    await acceptLearningRequest(studentId);

    const student = students.value.find((s) => s.id === studentId);
    alert(
      `Ajuan dari ${student.name} telah diterima! Siswa akan masuk ke daftar siswa Anda.`
    );

    // Remove from list after accepting
    students.value = students.value.filter((s) => s.id !== studentId);

    // Redirect to dashboard to see updated data
    router.push("/tutor/dashboard");
  } catch (error) {
    console.error("Error accepting request:", error);
    alert("Gagal menerima ajuan belajar");
  } finally {
    processing.value = null;
  }
};

const handleReject = async (studentId) => {
  if (!confirm("Apakah Anda yakin ingin menolak ajuan belajar ini?")) {
    return;
  }

  try {
    processing.value = studentId;
    await rejectLearningRequest(studentId);

    const student = students.value.find((s) => s.id === studentId);
    alert(`Ajuan dari ${student.name} telah ditolak.`);

    // Remove from list after rejecting
    students.value = students.value.filter((s) => s.id !== studentId);
  } catch (error) {
    console.error("Error rejecting request:", error);
    alert("Gagal menolak ajuan belajar");
  } finally {
    processing.value = null;
  }
};

// Load data on mount
onMounted(() => {
  loadLearningRequests();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=DM+Sans:wght@400;500;700&display=swap');

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

/* HI-FI CARD SYSTEM */
.hifi-card {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}
</style>
