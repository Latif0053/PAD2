<template>
  <div class="min-h-screen bg-[#F4F7FB] text-[#1a2332]">
    <NavbarAdmin />

    <main class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex gap-6">
        <SidebarAdmin />
        <div class="flex-1 flex flex-col gap-6">
      <header class="flex flex-col gap-4 border-b border-black/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-xs font-black uppercase tracking-[1px] text-[#1D9E75]">Admin Lazuardy</p>
          <h1 class="mt-1 text-3xl font-black tracking-tight text-[#1a2332] sm:text-4xl">
            Dashboard Operasional
          </h1>
          <p class="mt-2 max-w-2xl text-sm font-medium text-[#5a6370]">
            {{ todayLabel }}
          </p>
        </div>

        <button
          type="button"
          class="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0C447C] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#07345f] disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="isRefreshing"
          @click="loadDashboardData"
        >
          <RefreshCw :class="['h-4 w-4', isRefreshing ? 'animate-spin' : '']" />
          Refresh
        </button>
      </header>

      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article v-for="item in statCards" :key="item.label" class="rounded-lg border border-black/5 bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-[11px] font-black uppercase tracking-[0.8px] text-[#5a6370]">{{ item.label }}</p>
              <p class="mt-3 text-3xl font-black text-[#1a2332]">{{ item.value }}</p>
            </div>
            <div :class="['flex h-11 w-11 items-center justify-center rounded-lg', item.iconBg]">
              <component :is="item.icon" class="h-5 w-5" :class="item.iconColor" />
            </div>
          </div>
          <p class="mt-3 text-xs font-semibold text-[#5a6370]">{{ item.caption }}</p>
        </article>
      </section>

      <section v-if="loadError" class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
        {{ loadError }}
      </section>

      <section class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          :class="[
            'rounded-lg border bg-white p-4 text-left shadow-sm transition',
            activeTab === tab.key ? 'border-[#1D9E75] ring-2 ring-[#1D9E75]/15' : 'border-black/5 hover:border-[#0C447C]/30',
          ]"
          @click="activeTab = tab.key"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EEF2F7]">
                <component :is="tab.icon" class="h-5 w-5 text-[#0C447C]" />
              </div>
              <div>
                <p class="text-sm font-black text-[#1a2332]">{{ tab.label }}</p>
                <p class="text-xs font-semibold text-[#5a6370]">{{ tab.caption }}</p>
              </div>
            </div>
            <span class="rounded-md bg-[#E1F5EE] px-2.5 py-1 text-xs font-black text-[#0F6E56]">
              {{ tab.count }}
            </span>
          </div>
        </button>
      </section>

      <section class="rounded-lg border border-black/5 bg-white shadow-sm">
        <div class="flex flex-col gap-3 border-b border-black/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-lg font-black text-[#1a2332]">{{ activeTabMeta.label }}</h2>
            <p class="mt-1 text-xs font-semibold text-[#5a6370]">{{ activeTabMeta.caption }}</p>
          </div>
          <div class="relative w-full sm:w-80">
            <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b8794]" />
            <input
              v-model.trim="searchQuery"
              type="search"
              class="h-10 w-full rounded-lg border border-black/10 bg-[#F8FAFC] pl-10 pr-3 text-sm font-semibold outline-none transition focus:border-[#0C447C] focus:bg-white"
              placeholder="Cari data"
            />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-left text-sm">
            <thead class="bg-[#F8FAFC] text-[11px] uppercase tracking-[0.8px] text-[#5a6370]">
              <tr v-if="activeTab === 'tutors'">
                <th class="px-5 py-3 font-black">Tutor</th>
                <th class="px-5 py-3 font-black">Mata Pelajaran</th>
                <th class="px-5 py-3 font-black">Status</th>
                <th class="px-5 py-3 font-black">Tanggal</th>
                <th class="px-5 py-3 text-right font-black">Aksi</th>
              </tr>
              <tr v-else-if="activeTab === 'students'">
                <th class="px-5 py-3 font-black">Siswa</th>
                <th class="px-5 py-3 font-black">Paket</th>
                <th class="px-5 py-3 font-black">Nominal</th>
                <th class="px-5 py-3 font-black">Status</th>
                <th class="px-5 py-3 text-right font-black">Aksi</th>
              </tr>
              <tr v-else>
                <th class="px-5 py-3 font-black">Tutor</th>
                <th class="px-5 py-3 font-black">Pertemuan</th>
                <th class="px-5 py-3 font-black">Total Gaji</th>
                <th class="px-5 py-3 font-black">Status</th>
                <th class="px-5 py-3 text-right font-black">Aksi</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-black/5">
              <tr v-if="activeLoading">
                <td :colspan="5" class="px-5 py-12 text-center">
                  <div class="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#1D9E75] border-t-transparent"></div>
                  <p class="mt-3 text-sm font-semibold text-[#5a6370]">Memuat data...</p>
                </td>
              </tr>

              <tr v-else-if="filteredRows.length === 0">
                <td :colspan="5" class="px-5 py-12 text-center text-sm font-semibold text-[#7b8794]">
                  Belum ada data untuk ditampilkan.
                </td>
              </tr>

              <tr v-else v-for="row in filteredRows" :key="`${activeTab}-${getRowId(row)}`" class="hover:bg-[#F8FAFC]">
                <template v-if="activeTab === 'tutors'">
                  <td class="px-5 py-4">
                    <p class="font-black text-[#1a2332]">{{ getName(row, "Tutor") }}</p>
                    <p class="mt-0.5 text-xs font-semibold text-[#7b8794]">{{ row.email || row.user?.email || "-" }}</p>
                  </td>
                  <td class="px-5 py-4 font-semibold text-[#5a6370]">{{ row.subject || row.keahlian || row.subject_name || "-" }}</td>
                  <td class="px-5 py-4"><StatusBadge :status="getStatus(row)" /></td>
                  <td class="px-5 py-4 font-semibold text-[#5a6370]">{{ formatDate(row.created_at || row.updated_at) }}</td>
                  <td class="px-5 py-4">
                    <div class="flex justify-end gap-2">
                      <IconButton label="Detail" @click="viewTutorDetail(getRowId(row))"><Eye class="h-4 w-4" /></IconButton>
                      <IconButton label="Setujui" tone="success" @click="approveTutorRow(row)"><Check class="h-4 w-4" /></IconButton>
                      <IconButton label="Tolak" tone="danger" @click="rejectTutorRow(row)"><X class="h-4 w-4" /></IconButton>
                    </div>
                  </td>
                </template>

                <template v-else-if="activeTab === 'students'">
                  <td class="px-5 py-4">
                    <p class="font-black text-[#1a2332]">{{ getName(row, "Siswa") }}</p>
                    <p class="mt-0.5 text-xs font-semibold text-[#7b8794]">{{ row.email || row.user?.email || "-" }}</p>
                  </td>
                  <td class="px-5 py-4 font-semibold text-[#5a6370]">{{ row.package || row.package_name || row.paket || "-" }}</td>
                  <td class="px-5 py-4 font-black text-[#1a2332]">{{ formatCurrency(row.amount || row.total || row.price) }}</td>
                  <td class="px-5 py-4"><StatusBadge :status="getStatus(row)" /></td>
                  <td class="px-5 py-4">
                    <div class="flex justify-end gap-2">
                      <IconButton label="Detail" @click="viewPaymentDetail(getRowId(row))"><Eye class="h-4 w-4" /></IconButton>
                      <IconButton label="Verifikasi" tone="success" @click="verifyPaymentRow(row)"><Check class="h-4 w-4" /></IconButton>
                      <IconButton label="Tolak" tone="danger" @click="rejectPaymentRow(row)"><X class="h-4 w-4" /></IconButton>
                    </div>
                  </td>
                </template>

                <template v-else>
                  <td class="px-5 py-4">
                    <p class="font-black text-[#1a2332]">{{ getName(row, "Tutor") }}</p>
                    <p class="mt-0.5 text-xs font-semibold text-[#7b8794]">{{ row.email || row.user?.email || "-" }}</p>
                  </td>
                  <td class="px-5 py-4 font-semibold text-[#5a6370]">{{ row.meetings || row.total_meetings || row.totalSessions || 0 }}</td>
                  <td class="px-5 py-4 font-black text-[#1a2332]">{{ formatCurrency(row.earnings || row.total_salary || row.amount) }}</td>
                  <td class="px-5 py-4"><StatusBadge :status="getStatus(row)" /></td>
                  <td class="px-5 py-4">
                    <div class="flex justify-end gap-2">
                      <IconButton label="Detail" @click="viewSalaryDetail(getRowId(row))"><Eye class="h-4 w-4" /></IconButton>
                      <IconButton label="Konfirmasi" tone="success" @click="confirmSalaryRow(row)"><Check class="h-4 w-4" /></IconButton>
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  Banknote,
  Check,
  DollarSign,
  Eye,
  GraduationCap,
  RefreshCw,
  Search,
  Star,
  Users,
  WalletCards,
  X,
} from "lucide-vue-next";
import NavbarAdmin from "@/components/layout/navbar-admin.vue";
import SidebarAdmin from "@/components/layout/sidebar-admin.vue";
import { useAuthStore } from '@/stores/auth.js';
import {
  approveTutor as approveUserTutor,
  confirmTutorSalary,
  getAdminStatistics,
  getPendingPayments,
  getPendingTutors,
  getTutorManagementSummary,
  rejectPayment as rejectUserPayment,
  rejectTutor as rejectUserTutor,
  verifyPayment as verifyUserPayment,
} from "@/services/adminDashboardService";

const router = useRouter();

const stats = ref({});
const tutorVerifications = ref([]);
const paymentVerifications = ref([]);
const tutorSalaryList = ref([]);
const activeTab = ref("tutors");
const searchQuery = ref("");
const loadError = ref("");
const isRefreshing = ref(false);
const loading = ref({
  stats: false,
  tutors: false,
  students: false,
  salaries: false,
});

const todayLabel = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

const IconButton = defineComponent({
  props: {
    label: { type: String, required: true },
    tone: { type: String, default: "default" },
  },
  setup(props, { slots, emit }) {
    const toneClass = computed(() => {
      if (props.tone === "success") return "bg-[#E1F5EE] text-[#0F6E56] hover:bg-[#1D9E75] hover:text-white";
      if (props.tone === "danger") return "bg-red-50 text-red-700 hover:bg-red-600 hover:text-white";
      return "bg-[#EEF2F7] text-[#0C447C] hover:bg-[#0C447C] hover:text-white";
    });

    return () =>
      h(
        "button",
        {
          type: "button",
          title: props.label,
          "aria-label": props.label,
          class: [
            "inline-flex h-9 w-9 items-center justify-center rounded-lg transition",
            toneClass.value,
          ],
          onClick: (event) => emit("click", event),
        },
        slots.default?.()
      );
  },
});

const StatusBadge = defineComponent({
  props: {
    status: { type: String, default: "-" },
  },
  setup(props) {
    const badgeClass = computed(() => {
      const status = props.status.toLowerCase();
      if (status.includes("pending") || status.includes("menunggu") || status.includes("verify")) {
        return "bg-[#FAEEDA] text-[#7A4D04]";
      }
      if (status.includes("reject") || status.includes("tolak")) {
        return "bg-red-50 text-red-700";
      }
      if (status.includes("paid") || status.includes("active") || status.includes("setuju") || status.includes("terverifikasi")) {
        return "bg-[#E1F5EE] text-[#0F6E56]";
      }
      return "bg-[#EEF2F7] text-[#5a6370]";
    });

    return () =>
      h(
        "span",
        {
          class: [
            "inline-flex rounded-md px-2.5 py-1 text-xs font-black uppercase tracking-[0.5px]",
            badgeClass.value,
          ],
        },
        props.status || "-"
      );
  },
});

const normalizeList = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.data?.data)) return value.data.data;
  return [];
};

const getMetric = (...keys) => {
  for (const key of keys) {
    const value = stats.value?.[key] ?? stats.value?.data?.[key];
    if (value !== undefined && value !== null) return value;
  }
  return 0;
};

const statCards = computed(() => [
  {
    label: "Total Siswa",
    value: formatNumber(getMetric("totalStudents", "total_students", "students")),
    caption: `${paymentVerifications.value.length} data pembayaran`,
    icon: GraduationCap,
    iconBg: "bg-[#E1F5EE]",
    iconColor: "text-[#0F6E56]",
  },
  {
    label: "Total Tutor",
    value: formatNumber(getMetric("totalTutors", "total_tutors", "tutors")),
    caption: `${tutorVerifications.value.length} menunggu verifikasi`,
    icon: Users,
    iconBg: "bg-[#E6F1FB]",
    iconColor: "text-[#0C447C]",
  },
  {
    label: "Transaksi Bulan Ini",
    value: formatCurrency(getMetric("monthlyTransactions", "monthly_transactions", "transaction_this_month")),
    caption: "Akumulasi pembayaran siswa",
    icon: DollarSign,
    iconBg: "bg-[#FAEEDA]",
    iconColor: "text-[#7A4D04]",
  },
  {
    label: "Rating Rata-rata",
    value: Number(getMetric("averageRating", "average_rating", "rating") || 0).toFixed(1),
    caption: `${tutorSalaryList.value.length} data gaji tutor`,
    icon: Star,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#B45309]",
  },
]);

const tabs = computed(() => [
  {
    key: "tutors",
    label: "Verifikasi Tutor",
    caption: "Akun tutor yang perlu ditinjau",
    count: tutorVerifications.value.length,
    icon: Users,
  },
  {
    key: "students",
    label: "Pembayaran Siswa",
    caption: "Data pembayaran dan paket siswa",
    count: paymentVerifications.value.length,
    icon: WalletCards,
  },
  {
    key: "salaries",
    label: "Gaji Tutor",
    caption: "Rekap dan konfirmasi honor tutor",
    count: tutorSalaryList.value.length,
    icon: Banknote,
  },
]);

const activeTabMeta = computed(() => tabs.value.find((tab) => tab.key === activeTab.value) || tabs.value[0]);
const activeLoading = computed(() => loading.value[activeTab.value]);
const activeRows = computed(() => {
  if (activeTab.value === "tutors") return tutorVerifications.value;
  if (activeTab.value === "students") return paymentVerifications.value;
  return tutorSalaryList.value;
});

const filteredRows = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return activeRows.value;
  return activeRows.value.filter((row) => JSON.stringify(row).toLowerCase().includes(query));
});

onMounted(() => {
  const auth = useAuthStore();
  if (!auth.initialized) auth.loadFromStorage();

  if (!auth.token || !auth.user) {
    router.push('/login');
    return;
  }

  if (!auth.isAdmin) {
    router.push('/');
    return;
  }

  loadDashboardData();
});

const loadDashboardData = async () => {
  loadError.value = "";
  isRefreshing.value = true;
  await Promise.all([loadStatistics(), loadPendingTutors(), loadPendingPayments(), loadTutorSalaries()]);
  isRefreshing.value = false;
};

const loadStatistics = async () => {
  loading.value.stats = true;
  try {
    stats.value = await getAdminStatistics();
  } catch (error) {
    loadError.value = "Gagal memuat analytics admin.";
    stats.value = {};
  } finally {
    loading.value.stats = false;
  }
};

const loadPendingTutors = async () => {
  loading.value.tutors = true;
  try {
    tutorVerifications.value = normalizeList(await getPendingTutors());
  } finally {
    loading.value.tutors = false;
  }
};

const loadPendingPayments = async () => {
  loading.value.students = true;
  try {
    paymentVerifications.value = normalizeList(await getPendingPayments());
  } finally {
    loading.value.students = false;
  }
};

const loadTutorSalaries = async () => {
  loading.value.salaries = true;
  try {
    tutorSalaryList.value = normalizeList(await getTutorManagementSummary());
  } finally {
    loading.value.salaries = false;
  }
};

const getRowId = (row) => row?.id || row?.user_id || row?.userId || row?.tutor_id || row?.student_id;

const getName = (row, fallback) =>
  row?.name ||
  row?.studentName ||
  row?.student_name ||
  row?.tutorName ||
  row?.tutor_name ||
  row?.user?.name ||
  fallback;

const getStatus = (row) => String(row?.status || row?.payment_status || row?.verification_status || row?.tutor_status || "-");

const formatNumber = (value) => new Intl.NumberFormat("id-ID").format(Number(value || 0));

const formatCurrency = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const viewTutorDetail = (id) => router.push(`/admin/data-tutor?id=${id}`);
const viewPaymentDetail = (id) => router.push(`/admin/data-siswa?id=${id}`);
const viewSalaryDetail = (id) => router.push(`/admin/kelola-tutor/${id}`);

const approveTutorRow = async (row) => {
  if (!confirm(`Setujui tutor ${getName(row, "")}?`)) return;
  await approveUserTutor(getRowId(row));
  await loadPendingTutors();
};

const rejectTutorRow = async (row) => {
  const reason = prompt(`Alasan penolakan tutor ${getName(row, "")}:`, "");
  if (reason === null) return;
  await rejectUserTutor(getRowId(row), reason);
  await loadPendingTutors();
};

const verifyPaymentRow = async (row) => {
  if (!confirm(`Verifikasi pembayaran ${getName(row, "")}?`)) return;
  await verifyUserPayment(getRowId(row));
  await loadPendingPayments();
};

const rejectPaymentRow = async (row) => {
  if (!confirm(`Tolak pembayaran ${getName(row, "")}?`)) return;
  await rejectUserPayment(getRowId(row));
  await loadPendingPayments();
};

const confirmSalaryRow = async (row) => {
  if (!confirm(`Konfirmasi pembayaran gaji ${getName(row, "")}?`)) return;
  await confirmTutorSalary(getRowId(row));
  await loadTutorSalaries();
};
</script>
