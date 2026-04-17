<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modal.isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all" @click.stop>
          <div class="p-6 text-center">
            
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-5"
                 :class="{
                   'bg-emerald-100 text-emerald-500': modal.status === 'success',
                   'bg-red-100 text-red-500': modal.status === 'error',
                   'bg-amber-100 text-amber-500': modal.status === 'warning',
                   'bg-blue-100 text-[#41a6c2]': modal.status === 'info'
                 }">
                 
              <svg v-if="modal.status === 'success'" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
              
              <svg v-else-if="modal.status === 'error'" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              
              <svg v-else-if="modal.status === 'warning'" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              
              <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-2 tracking-tight">{{ modal.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">{{ modal.message }}</p>
          </div>

          <div class="px-6 pb-6 flex gap-3 w-full">
            
            <template v-if="modal.type === 'confirm'">
              <button @click="modal.resolveModal(false)" class="flex-1 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors text-sm">
                Batal
              </button>
              <button @click="modal.resolveModal(true)" class="flex-1 py-3 text-white font-semibold rounded-xl transition-colors text-sm"
                      :class="modal.status === 'error' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#41a6c2] hover:bg-[#2c7a90]'">
                Ya, Lanjutkan
              </button>
            </template>

            <template v-else>
              <button @click="modal.resolveModal(true)" class="w-full py-3 text-white font-semibold rounded-xl transition-colors text-sm"
                      :class="modal.status === 'error' ? 'bg-red-500 hover:bg-red-600' : 'bg-[#41a6c2] hover:bg-[#2c7a90]'">
                Mengerti
              </button>
            </template>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useModalStore } from '@/stores/modalStore';

const modal = useModalStore();
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .bg-white,
.modal-fade-leave-to .bg-white {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
</style>