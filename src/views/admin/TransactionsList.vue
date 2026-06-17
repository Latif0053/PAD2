<template>
  <div class="transactions-page">
    <NavbarAdmin />

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex gap-6">
        <SidebarAdmin />
        <div class="flex-1">
          <h1 class="text-2xl font-black text-[#1a2332] mb-4">Manajemen Transaksi</h1>

          <div class="mb-4 flex gap-3">
            <input v-model="search" placeholder="Cari transaksi / nama siswa" class="w-1/2 p-2 border rounded" />
            <select v-model="status" class="p-2 border rounded">
              <option value="">Semua Status</option>
              <option value="menunggu">Menunggu</option>
              <option value="terverifikasi">Terverifikasi</option>
              <option value="ditolak">Ditolak</option>
            </select>
            <button @click="loadTransactions" class="px-4 py-2 bg-[#0C447C] text-white rounded">Terapkan</button>
          </div>

          <div class="bg-white border rounded shadow-sm overflow-x-auto">
            <table class="min-w-full text-left text-sm">
              <thead class="bg-[#F8FAFC] text-xs uppercase text-[#5a6370]">
                <tr>
                  <th class="px-4 py-3">ID</th>
                  <th class="px-4 py-3">Siswa</th>
                  <th class="px-4 py-3">Paket</th>
                  <th class="px-4 py-3">Jumlah</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Tanggal</th>
                  <th class="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="7" class="p-8 text-center">Memuat data...</td>
                </tr>
                <tr v-else-if="transactions.length === 0">
                  <td colspan="7" class="p-8 text-center">Belum ada transaksi.</td>
                </tr>
                <tr v-else v-for="tx in transactions" :key="tx.id" class="hover:bg-[#F8FAFC]">
                  <td class="px-4 py-3">{{ tx.id }}</td>
                  <td class="px-4 py-3">{{ tx.name || tx.studentName || tx.nama_lengkap }}</td>
                  <td class="px-4 py-3">{{ tx.package || tx.package_name || tx.paket }}</td>
                  <td class="px-4 py-3">{{ formatCurrency(tx.amount || tx.total || tx.price) }}</td>
                  <td class="px-4 py-3"><span class="badge">{{ tx.status }}</span></td>
                  <td class="px-4 py-3">{{ formatDate(tx.created_at || tx.updated_at) }}</td>
                  <td class="px-4 py-3 text-right">
                    <button @click="viewDetail(tx.id)" class="px-3 py-1 bg-[#41a6c2] text-white rounded mr-2">Detail</button>
                    <button v-if="tx.status && tx.status.toLowerCase().includes('menunggu')" @click="verify(tx.id)" class="px-3 py-1 bg-[#10b981] text-white rounded mr-2">Verifikasi</button>
                    <button v-if="tx.status && tx.status.toLowerCase().includes('menunggu')" @click="reject(tx.id)" class="px-3 py-1 bg-[#ef4444] text-white rounded">Tolak</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavbarAdmin from '@/components/layout/navbar-admin.vue';
import SidebarAdmin from '@/components/layout/sidebar-admin.vue';
import { getTransactions, verifyPayment, rejectPayment } from '@/services/adminDashboardService';

const router = useRouter();
const transactions = ref([]);
const loading = ref(false);
const search = ref('');
const status = ref('');

const loadTransactions = async () => {
  loading.value = true;
  try {
    const data = await getTransactions({ search: search.value, status: status.value });
    transactions.value = data || [];
  } catch (err) {
    console.error('Error loading transactions:', err);
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

const viewDetail = (id) => {
  router.push(`/admin/transaksi/${id}`);
};

const verify = async (id) => {
  if (!confirm('Verifikasi pembayaran ini?')) return;
  try {
    await verifyPayment(id);
    alert('Pembayaran diverifikasi');
    await loadTransactions();
  } catch (err) {
    console.error(err);
    alert('Gagal memverifikasi pembayaran');
  }
};

const reject = async (id) => {
  if (!confirm('Tolak pembayaran ini?')) return;
  try {
    await rejectPayment(id);
    alert('Pembayaran ditolak');
    await loadTransactions();
  } catch (err) {
    console.error(err);
    alert('Gagal menolak pembayaran');
  }
};

const formatCurrency = (v) => {
  if (!v) return '-';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v);
};

const formatDate = (d) => {
  if (!d) return '-';
  try { return new Date(d).toLocaleString('id-ID'); } catch { return d; }
};

onMounted(loadTransactions);
</script>

<style scoped>
.badge { display:inline-block; padding:6px 10px; background:#EEF2F7; color:#0C447C; border-radius:999px; font-weight:700 }
</style>
