import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  // State UI Modal
  const isOpen = ref(false);
  const type = ref('alert'); // Opsi: 'alert' (hanya tombol OK) | 'confirm' (Batal / Lanjut)
  const status = ref('info'); // Opsi: 'success' | 'error' | 'warning' | 'info'
  const title = ref('');
  const message = ref('');

  // Penampung resolusi Promise
  const resolvePromise = ref(null);

  // Fungsi untuk memunculkan modal Alert (Informasi/Error/Sukses)
  const showAlert = (newTitle, newMessage, newStatus = 'info') => {
    title.value = newTitle;
    message.value = newMessage;
    status.value = newStatus;
    type.value = 'alert';
    isOpen.value = true;

    return new Promise((resolve) => {
      resolvePromise.value = resolve;
    });
  };

  // Fungsi untuk memunculkan modal Confirm (Konfirmasi Ya/Tidak)
  const showConfirm = (newTitle, newMessage, newStatus = 'warning') => {
    title.value = newTitle;
    message.value = newMessage;
    status.value = newStatus;
    type.value = 'confirm';
    isOpen.value = true;

    return new Promise((resolve) => {
      resolvePromise.value = resolve;
    });
  };

  // Fungsi yang dipanggil oleh tombol di komponen UI saat diklik
  const resolveModal = (result) => {
    if (resolvePromise.value) {
      resolvePromise.value(result);
      resolvePromise.value = null; // Bersihkan setelah dieksekusi
    }
    close();
  };

  // Fungsi untuk menutup modal
  const close = () => {
    isOpen.value = false;
    // Reset teks dengan jeda agar tidak hilang mendadak saat animasi tutup berjalan
    setTimeout(() => {
      title.value = '';
      message.value = '';
    }, 300);
  };

  return {
    isOpen,
    type,
    status,
    title,
    message,
    showAlert,
    showConfirm,
    resolveModal,
    close
  };
});