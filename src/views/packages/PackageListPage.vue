<template>
  <div class="min-h-screen flex flex-col bg-[#EEF2F7] dashboard-scope relative">
    
    <div class="relative z-50">
      <Navbar />
    </div>

    <div class="lz-main-wrapper flex flex-col flex-1">
      
      <section class="bg-[#0C447C] py-12 md:py-16 relative overflow-hidden shrink-0">
        <div class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-[#1D9E75]/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-black text-white font-heading mb-6 tracking-tight">
            Paket Belajar Lazuardy
          </h1>
          <p class="text-white/80 font-body text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Pilih paket sesuai durasi dan kebutuhan belajarmu. Akses ribuan materi premium dan tingkatkan prestasimu hari ini.
          </p>
        </div>
      </section>

      <main class="flex-1 py-10 px-6 md:px-12 max-w-[1140px] mx-auto w-full font-body relative z-20">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          <div v-for="(paket, index) in paketList" :key="paket.id"
               class="hifi-card flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
               :class="{'border-2 border-[#1D9E75] shadow-lg shadow-[#1D9E75]/10': index === 1}"> 

            <div class="p-8 md:p-10 relative" :class="index === 1 ? 'bg-[#042C53]' : 'bg-[#0C447C]'">
              
              <div v-if="paket.diskon" class="absolute top-8 right-8 bg-[#EF9F27] text-[#412402] text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-sm">
                Diskon {{ paket.diskon }}%
              </div>

              <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
                <svg v-if="index === 0" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3"/></svg>
                <svg v-else class="w-8 h-8 text-[#EF9F27]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>

              <h3 class="text-3xl font-black text-white font-heading mb-3">{{ paket.nama }}</h3>
              <div class="flex items-baseline gap-3 mt-2">
                <span class="text-base text-white/50 line-through font-medium">{{ formatPrice(paket.hargaAsli) }}</span>
                <span class="text-4xl font-black text-[#EF9F27] font-heading">{{ formatPrice(paket.hargaDiskon) }}</span>
              </div>
            </div>

            <div class="p-8 md:p-10 flex-1 flex flex-col bg-white">
              <p class="text-sm text-[#5a6370] mb-8 leading-relaxed font-medium">{{ paket.deskripsi }}</p>

              <ul class="space-y-5 mb-12 flex-1">
                <li v-for="(fitur, fIndex) in paket.fitur" :key="fIndex" class="flex items-start gap-4">
                  <svg class="w-5 h-5 text-[#1D9E75] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span class="text-sm font-bold text-[#1a2332] leading-relaxed">{{ fitur }}</span>
                </li>
              </ul>

              <button @click="handleBeli(paket)"
                      class="w-full py-4 rounded-xl font-black text-base transition-all flex justify-center items-center gap-2 uppercase tracking-wider"
                      :class="index === 1 ? 'bg-[#1D9E75] text-white hover:bg-[#0F6E56] shadow-lg shadow-[#1D9E75]/30' : 'bg-[#EF9F27] text-[#412402] hover:bg-[#d68b1e] shadow-lg shadow-[#EF9F27]/30'">
                Beli Sekarang
              </button>
            </div>
          </div>

        </div>
      </main>

      <SidebarLeft v-if="showStandaloneSidebars" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";
import SidebarLeft from "@/components/layout/sidebar-left.vue";

const router = useRouter();
const showStandaloneSidebars = false;

const paketList = [
  {
    id: 1,
    nama: "Prime 6 Bulan",
    hargaAsli: 930000,
    hargaDiskon: 325000,
    diskon: 65,
    image: "https://cdn-icons-png.flaticon.com/512/6213/6213907.png",
    deskripsi:
      "Belajar seru dan mudah paham bareng Lazuardy! Dapatkan akses video, rangkuman, dan bank soal selama 6 bulan.",
    fitur: [
      "Langganan Materi Belajar Premium 6 bulan",
      "Video Belajar, Rangkuman, Flash card, Kuis, Bank soal",
      "Akses tanpa batas ke semua materi",
      "Download video untuk ditonton tanpa kuota",
      "Latihan soal dengan pembahasan lengkap",
    ],
  },
  {
    id: 2,
    nama: "Prime 1 Tahun",
    hargaAsli: 1440000,
    hargaDiskon: 504000,
    diskon: 65,
    image: "https://cdn-icons-png.flaticon.com/512/6213/6213907.png",
    deskripsi:
      "Nikmati pembelajaran selama 12 bulan dengan akses penuh ke semua fitur belajar Lazuardy.",
    fitur: [
      "Langganan Materi Belajar Premium 12 bulan",
      "Materi lengkap dengan video dan kuis interaktif",
      "Akses Pegasus sepuasnya",
      "Download video untuk ditonton offline",
      "Lebih dari 100rb soal dengan pembahasan",
    ],
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

const handleBeli = (paket) => {
  router.push({
    path: "/payment/checkout",
    query: {
      id: paket.id,
      nama: paket.nama,
      harga: paket.hargaDiskon,
    },
  });
};
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
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
}
</style>