<template>
  <aside class="admin-sidebar">
    <nav>
      <ul>
        <li><RouterLink to="/admin/dashboard">Dashboard</RouterLink></li>
        <li><RouterLink to="/admin/kelola-tutor">Manajemen Tutor</RouterLink></li>
        <li><RouterLink to="/admin/data-tutor">Data Tutor</RouterLink></li>
        <li><RouterLink to="/admin/data-siswa">Data Siswa</RouterLink></li>
        <li><RouterLink to="/admin/kelola-tutor">Gaji Tutor</RouterLink></li>
        <li><RouterLink to="/admin/transaksi">Transaksi</RouterLink></li>
        <li><RouterLink to="/admin/laporan">Laporan</RouterLink></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.admin-sidebar {
  width: 260px;
  background: #ffffff;
  border-right: 1px solid rgba(12,68,124,0.06);
  padding: 1.25rem;
}
.admin-sidebar ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem }
.admin-sidebar a { color: #0C447C; font-weight: 600; text-decoration: none; padding: 0.5rem 0.75rem; display: block; border-radius: 8px }
.admin-sidebar a.router-link-exact-active { background: rgba(12,68,124,0.08) }
</style>
