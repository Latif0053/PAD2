<template>
  <div>
    <NavbarAdmin />

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex gap-6">
        <SidebarAdmin />

        <div class="flex-1">
          <div class="bg-white border rounded p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-2xl font-bold">Detail Transaksi</h2>
                <p class="text-sm text-[#5a6370]">ID: <span class="font-mono">{{ payment?.id || id }}</span></p>
              </div>

              <div class="flex items-center gap-3">
                <button @click="copyId" class="px-3 py-2 border rounded">Salin ID</button>
                <button v-if="payment?.proof_url" @click="openProof" class="px-3 py-2 bg-[#0C447C] text-white rounded">Lihat Bukti</button>
                <button @click="downloadProof" :disabled="!payment?.proof_url" class="px-3 py-2 border rounded">Unduh Bukti</button>
                <button @click="goBack" class="px-3 py-2 border rounded">Kembali</button>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <div>
                <span :class="['px-3 py-1 rounded-full font-bold text-sm', statusClass]">{{ payment?.status || '-' }}</span>
              </div>
              <div class="text-sm text-[#6b7280]">{{ formatDate(payment?.created_at || payment?.date || student?.created_at) }}</div>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-6">
            <div class="col-span-2 space-y-6">
              <div class="bg-white border rounded p-4 flex gap-4">
                <div class="w-1/3">
                  <div class="h-48 bg-[#f1f5f9] flex items-center justify-center rounded overflow-hidden">
                    <img v-if="payment?.proof_url" :src="payment.proof_url" alt="Bukti Pembayaran" class="object-contain h-full w-full" />
                    <div v-else class="text-sm text-[#9ca3af]">Tidak ada bukti pembayaran</div>
                  </div>
                </div>

                <div class="flex-1">
                  <h3 class="font-bold">Ringkasan Pembayaran</h3>
                  <div class="grid grid-cols-2 gap-2 mt-3 text-sm text-[#374151]">
                    <div>
                      <p class="text-xs text-[#6b7280]">Paket</p>
                      <p class="font-medium">{{ payment?.package_name || payment?.package || '-' }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-[#6b7280]">Jumlah</p>
                      <p class="font-medium">{{ formatCurrency(payment?.amount) }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-[#6b7280]">Metode</p>
                      <p class="font-medium">{{ payment?.method || payment?.payment_method || '-' }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-[#6b7280]">Bank / Rekening</p>
                      <p class="font-medium">{{ payment?.bank || payment?.account || payment?.bank_name || '-' }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-[#6b7280]">Kode Transaksi</p>
                      <p class="font-medium">{{ payment?.transaction_code || payment?.order_id || '-' }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-[#6b7280]">Status Pembayaran</p>
                      <p class="font-medium">{{ payment?.status || '-' }}</p>
                    </div>
                  </div>

                  <div class="mt-4">
                    <h4 class="text-sm font-semibold">Catatan Pembayaran</h4>
                    <p class="text-sm text-[#4b5563]">{{ payment?.note || payment?.description || '-' }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-white border rounded p-4">
                <h3 class="font-bold mb-2">Timeline</h3>
                <ul class="text-sm text-[#374151] space-y-2">
                  <li v-for="(item, idx) in timeline" :key="idx" class="flex justify-between">
                    <div>
                      <div class="font-medium">{{ item.title }}</div>
                      <div class="text-xs text-[#6b7280]">{{ item.note }}</div>
                    </div>
                    <div class="text-xs text-[#6b7280]">{{ formatDate(item.at) }}</div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="space-y-6">
              <div class="bg-white border rounded p-4">
                <h3 class="font-bold">Data Siswa</h3>
                <div class="mt-3 text-sm text-[#374151] space-y-2">
                  <div><span class="text-xs text-[#6b7280]">Nama</span><div class="font-medium">{{ student?.nama_lengkap || student?.name || '-' }}</div></div>
                  <div><span class="text-xs text-[#6b7280]">Email</span><div class="font-medium">{{ student?.email || '-' }}</div></div>
                  <div><span class="text-xs text-[#6b7280]">Telepon</span><div class="font-medium">{{ student?.no_telepon || student?.phone || '-' }}</div></div>
                  <div><span class="text-xs text-[#6b7280]">Alamat</span><div class="font-medium">{{ student?.alamat_lengkap || student?.address || '-' }}</div></div>
                </div>
              </div>

              <div class="bg-white border rounded p-4">
                <h3 class="font-bold">Aksi Admin</h3>
                <div class="mt-3 flex flex-col gap-3">
                  <button v-if="isPending" @click="openVerifyModal" class="px-4 py-2 bg-[#10b981] text-white rounded">Verifikasi Pembayaran</button>
                  <button v-if="isPending" @click="openRejectModal" class="px-4 py-2 bg-[#ef4444] text-white rounded">Tolak Pembayaran</button>
                  <button @click="printInvoice" class="px-4 py-2 border rounded">Cetak Faktur</button>
                </div>

                <div class="mt-4">
                  <h4 class="text-sm font-semibold">Catatan Admin</h4>
                  <textarea v-model="adminNote" rows="4" class="w-full mt-2 border rounded p-2" placeholder="Catatan internal..."></textarea>
                  <div class="mt-2 flex gap-2">
                    <button @click="saveAdminNote" class="px-3 py-1 bg-[#0C447C] text-white rounded">Simpan</button>
                    <button @click="clearAdminNote" class="px-3 py-1 border rounded">Bersihkan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Verify Modal -->
    <div v-if="showVerifyModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="bg-white rounded p-6 w-96">
        <h3 class="font-bold mb-2">Konfirmasi Verifikasi</h3>
        <p class="text-sm text-[#374151]">Anda akan memverifikasi pembayaran ini. Tambahkan catatan (opsional):</p>
        <textarea v-model="actionNote" rows="3" class="w-full mt-2 border rounded p-2" />
        <div class="mt-4 flex justify-end gap-2">
          <button @click="confirmVerify" class="px-3 py-1 bg-[#10b981] text-white rounded">Verifikasi</button>
          <button @click="closeVerifyModal" class="px-3 py-1 border rounded">Batal</button>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div class="bg-white rounded p-6 w-96">
        <h3 class="font-bold mb-2">Tolak Pembayaran</h3>
        <p class="text-sm text-[#374151]">Berikan alasan penolakan:</p>
        <textarea v-model="actionNote" rows="4" class="w-full mt-2 border rounded p-2" placeholder="Alasan menolak pembayaran"></textarea>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="confirmReject" class="px-3 py-1 bg-[#ef4444] text-white rounded">Tolak</button>
          <button @click="closeRejectModal" class="px-3 py-1 border rounded">Batal</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavbarAdmin from '@/components/layout/navbar-admin.vue';
import SidebarAdmin from '@/components/layout/sidebar-admin.vue';
import {
  getPaymentDetail,
  verifyPayment,
  rejectPayment,
  getAdminNote,
  saveAdminNote as saveAdminNoteApi,
} from '@/services/adminDashboardService';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const loading = ref(false);
const payment = ref({});
const student = ref({});

const showVerifyModal = ref(false);
const showRejectModal = ref(false);
const actionNote = ref('');

const adminNote = ref('');

const load = async () => {
  loading.value = true;
  try {
    const res = await getPaymentDetail(id);
    payment.value = res.payment || res.data?.payment || res;
    student.value = res.student || res.data?.student || {};

    try {
      const saved = await getAdminNote(id);
      adminNote.value = saved || '';
    } catch (err) {
      console.error('Error loading admin note:', err);
      adminNote.value = '';
    }
  } catch (err) {
    console.error('Error loading payment detail:', err);
  } finally {
    loading.value = false;
  }
};

const isPending = computed(() => {
  const s = (payment.value?.status || '').toString().toLowerCase();
  return s.includes('menunggu') || s.includes('pending') || s === '';
});

const statusClass = computed(() => {
  const s = (payment.value?.status || '').toString().toLowerCase();
  if (s.includes('terverifikasi') || s.includes('verified') || s.includes('success')) return 'bg-[#ecfdf5] text-[#065f46]';
  if (s.includes('ditolak') || s.includes('rejected') || s.includes('cancel')) return 'bg-[#fff1f2] text-[#9f1239]';
  return 'bg-[#eef2ff] text-[#3730a3]';
});

const formatCurrency = (v) => (v ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v) : '-');
const formatDate = (d) => {
  if (!d) return '-';
  try { return new Date(d).toLocaleString('id-ID'); } catch { return d; }
};

const timeline = computed(() => {
  if (payment.value?.history && Array.isArray(payment.value.history)) return payment.value.history.map(h => ({ title: h.status || h.title, note: h.note || '', at: h.at || h.created_at }));

  const t = [];
  if (payment.value?.created_at) t.push({ title: 'Dibuat', note: 'Transaksi dibuat', at: payment.value.created_at });
  if (payment.value?.submitted_at) t.push({ title: 'Dikirim', note: 'Bukti dikirim oleh siswa', at: payment.value.submitted_at });
  if (payment.value?.verified_at) t.push({ title: 'Terverifikasi', note: 'Pembayaran diverifikasi admin', at: payment.value.verified_at });
  if (payment.value?.rejected_at) t.push({ title: 'Ditolak', note: payment.value?.rejection_note || 'Pembayaran ditolak', at: payment.value.rejected_at });
  return t.length ? t : [{ title: 'Dibuat', note: 'Riwayat terbatas', at: payment.value?.created_at || student.value?.created_at }];
});

const goBack = () => router.push('/admin/transaksi');

const copyId = async () => {
  try { await navigator.clipboard.writeText(payment.value?.id?.toString() || id?.toString()); alert('ID disalin'); } catch { alert('Gagal menyalin'); }
};

const openProof = () => { if (payment.value?.proof_url) window.open(payment.value.proof_url, '_blank'); };
const downloadProof = () => { if (payment.value?.proof_url) window.open(payment.value.proof_url, '_blank'); };

const openVerifyModal = () => { actionNote.value = ''; showVerifyModal.value = true; };
const closeVerifyModal = () => { showVerifyModal.value = false; actionNote.value = ''; };
const openRejectModal = () => { actionNote.value = ''; showRejectModal.value = true; };
const closeRejectModal = () => { showRejectModal.value = false; actionNote.value = ''; };

const confirmVerify = async () => {
  try {
    await verifyPayment(id, { note: actionNote.value });
    alert('Pembayaran telah diverifikasi');
    closeVerifyModal();
    await load();
  } catch (err) {
    console.error(err);
    alert('Gagal memverifikasi pembayaran');
  }
};

const confirmReject = async () => {
  if (!actionNote.value) {
    if (!confirm('Anda tidak menambahkan alasan. Tetap ingin menolak?')) return;
  }

  try {
    await rejectPayment(id, actionNote.value);
    alert('Pembayaran telah ditolak');
    closeRejectModal();
    await load();
  } catch (err) {
    console.error(err);
    alert('Gagal menolak pembayaran');
  }
};

const saveAdminNote = async () => {
  try {
    await saveAdminNoteApi(id, adminNote.value || '');
    alert('Catatan admin disimpan');
  } catch (err) {
    console.error('Gagal menyimpan catatan admin:', err);
    alert('Gagal menyimpan catatan admin');
  }
};

const clearAdminNote = () => { adminNote.value = ''; sessionStorage.removeItem(`admin_tx_note_${id}`); };

const printInvoice = () => {
  // Simple: open a printable page for the transaction
  const url = `/admin/transaksi/${id}/print`;
  window.open(url, '_blank');
};

onMounted(load);
</script>

<style scoped>
</style>
