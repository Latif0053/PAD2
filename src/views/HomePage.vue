<template>
  <div class="bg-base-100 scroll-smooth">
    <header class="border-base-content/20 bg-base-100 py-0.25 fixed top-0 z-10 w-full border-b">
      <nav class="navbar mx-auto max-w-[1280px] rounded-b-xl px-4 sm:px-6 lg:px-8">
        <div class="w-full lg:flex lg:items-center lg:gap-2">
          <div class="navbar-start items-center justify-between max-lg:w-full">
            <a class="text-base-content flex items-center gap-3 text-xl font-semibold" href="#">
              <img :src="logo" alt="Bimbel Lazuardy" class="h-8 md:h-10 w-auto" />
            </a>
            
            <div class="flex items-center gap-5 lg:hidden">
              <button @click="handleLogin" class="btn btn-primary btn-sm">Login</button>
              <button type="button" class="collapse-toggle btn btn-outline btn-secondary btn-square" data-collapse="#navbar-block-4" aria-controls="navbar-block-4" aria-label="Toggle navigation">
                <span class="icon-[tabler--menu-2] collapse-open:hidden size-5.5"></span>
                <span class="icon-[tabler--x] collapse-open:block size-5.5 hidden"></span>
              </button>
            </div>
          </div>
          <div id="navbar-block-4" class="lg:navbar-center transition-height collapse hidden grow overflow-hidden font-medium duration-300 lg:flex">
            <div class="text-base-content flex gap-6 text-base max-lg:mt-4 max-lg:flex-col lg:items-center">
              <a href="#home" class="hover:text-primary nav-link">Home</a>
              <a href="#about-us" class="hover:text-primary nav-link">About Us</a>
              <a href="#services" class="hover:text-primary nav-link">Program</a>
              <a href="#team" class="hover:text-primary nav-link">Tutor</a>
              <a href="#faqs" class="hover:text-primary nav-link">FAQS</a>
            </div>
          </div>
          <div class="navbar-end max-lg:hidden">
            <button @click="handleLogin" class="btn btn-primary">Login</button>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <section id="home">
        <div class="gap-18 md:pt-45 lg:gap-35 lg:pt-47.5 flex h-full flex-col justify-between bg-[url('../../img/free-layer-blur.png')] bg-cover bg-center bg-no-repeat py-8 pt-40 sm:py-16 md:gap-24 lg:py-24">
          <div class="mx-auto flex max-w-[1280px] flex-col items-center gap-6 justify-self-center px-4 text-center sm:px-6 lg:px-8">
            <div class="bg-base-200 border-base-content/20 w-fit rounded-full border px-3 py-1">
              <span> Membantu Siswa Berprestasi Sejak 2025 </span>
            </div>
            <h1 class="text-base-content z-1 relative text-5xl font-bold leading-[1.15] max-md:text-2xl md:max-w-3xl">
              <span>
                Persiapkan Masa Depanmu
                <br />
                Raih Cita-Citamu!
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="348" height="10" viewBox="0 0 348 10" fill="none" class="-z-1 left-25 absolute -bottom-1.5 max-lg:left-4 max-md:hidden">
                <path d="M1.85645 8.23715C62.4821 3.49284 119.04 1.88864 180.031 1.88864C225.103 1.88864 275.146 1.32978 319.673 4.85546C328.6 5.24983 336.734 6.33887 346.695 7.60269" stroke="url(#paint0_linear_17052_181397)" stroke-width="2" stroke-linecap="round" />
                <defs>
                  <linearGradient id="paint0_linear_17052_181397" x1="29.7873" y1="1.85626" x2="45.2975" y2="69.7387" gradientUnits="userSpaceOnUse">
                    <stop stop-color="var(--color-primary)" />
                    <stop offset="1" stop-color="var(--color-primary-content)" />
                  </linearGradient>
                </defs>
              </svg>
            </h1>
            <p class="text-base-content/80 max-w-3xl">Bimbel Lazuardy adalah platform bimbingan belajar online terpercaya yang menghubungkan siswa dengan tutor berkualitas. Dapatkan pengalaman belajar fleksibel yang disesuaikan dengan kebutuhanmu.</p>
            <button @click="handleLogin" class="btn btn-primary btn-gradient btn-lg">
              Mulai Belajar Sekarang
              <span class="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
            </button>
          </div>
          <img src="../assets/img/hero.png" alt="Hero Illustration" class="min-h-67 w-full object-cover" />
        </div>
      </section>

      <section id="about-us">
        <div class="bg-base-200 py-8 sm:py-16 lg:py-24">
          <div class="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col gap-12 md:gap-16 lg:gap-24">
              <div class="space-y-4 text-center">
                <h2 class="text-base-content text-2xl font-semibold md:text-3xl lg:text-4xl">Tentang Kami</h2>
                <p class="text-base-content/80 text-xl">Dedikasi kami adalah menghadirkan sistem belajar terbaik yang memadukan tutor ahli, metode efektif, dan fleksibilitas untuk menunjang kesuksesan siswa.</p>
                <button @click="handleLogin" class="btn btn-primary btn-lg btn-gradient">
                  Daftar Sekarang
                  <span class="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
                </button>
              </div>
              <div class="lg:h-161 relative mb-8 h-full w-full rounded-xl max-lg:space-y-6 sm:mb-16 lg:mb-24">
                <img src="../assets/img/about-us.png" alt="about-us" class="h-full w-full rounded-xl object-cover" />
                <div class="bg-base-100 border-base-content/20 rounded-box lg:-bottom-25 intersect:motion-preset-fade intersect:motion-opacity-0 intersect:motion-duration-800 grid gap-10 border px-10 py-8 sm:max-lg:grid-cols-2 lg:absolute lg:left-1/2 lg:w-3/4 lg:-translate-x-1/2 lg:grid-cols-4 xl:w-max">
                  <div class="flex flex-col items-center justify-center gap-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none" class="text-primary">
                      <path d="M21.5 17.5C25.366 17.5 28.5 14.366 28.5 10.5C28.5 6.63401 25.366 3.5 21.5 3.5C17.634 3.5 14.5 6.63401 14.5 10.5C14.5 14.366 17.634 17.5 21.5 17.5Z" fill="currentColor" fill-opacity="0.5" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M29.375 38.5C26.4877 38.5 25.0439 38.5 24.147 37.603C23.25 36.7061 23.25 35.2623 23.25 32.375C23.25 29.4877 23.25 28.0439 24.147 27.147C25.0439 26.25 26.4877 26.25 29.375 26.25C32.2623 26.25 33.7061 26.25 34.603 27.147C35.5 28.0439 35.5 29.4877 35.5 32.375C35.5 35.2623 35.5 36.7061 34.603 37.603C33.7061 38.5 32.2623 38.5 29.375 38.5ZM32.819 31.0552C33.2177 30.6565 33.2177 30.0102 32.819 29.6116C32.4204 29.2128 31.7741 29.2128 31.3754 29.6116L28.0139 32.973L27.3746 32.3337C26.9759 31.9351 26.3296 31.9351 25.931 32.3337C25.5323 32.7324 25.5323 33.3788 25.931 33.7774L27.292 35.1384C27.6906 35.5372 28.3371 35.5372 28.7357 35.1384L32.819 31.0552Z" fill="currentColor" fill-opacity="0.5" />
                      <path opacity="0.5" d="M32.1657 26.3046C31.4223 26.25 30.5102 26.25 29.375 26.25C26.4877 26.25 25.0439 26.25 24.1471 27.147C23.25 28.0439 23.25 29.4877 23.25 32.375C23.25 34.416 23.25 35.7357 23.5669 36.6508C22.8949 36.7161 22.2044 36.75 21.5 36.75C14.7345 36.75 9.25 33.6159 9.25 29.75C9.25 25.8841 14.7345 22.75 21.5 22.75C26.0735 22.75 30.0617 24.1822 32.1657 26.3046Z" fill="currentColor" fill-opacity="0.5" />
                    </svg>
                    <div class="space-y-2 text-center">
                      <span class="text-primary text-3xl font-semibold" id="count1">5+</span>
                      <p class="text-base-content/80">Tahun Pengalaman</p>
                    </div>
                  </div>
                  <div class="flex flex-col items-center justify-center gap-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none" class="text-primary">
                      <path opacity="0.5" d="M13.1788 3.5H29.8212C31.8493 3.5 32.8633 3.5 33.681 3.78457C35.2319 4.32418 36.4494 5.57758 36.9735 7.17405C37.25 8.01596 37.25 9.05984 37.25 11.1476V35.6549C37.25 37.1567 35.5262 37.9536 34.4358 36.9558C33.7951 36.3695 32.8299 36.3695 32.1892 36.9558L31.3438 37.7295C30.2209 38.7569 28.5291 38.7569 27.4062 37.7295C26.2834 36.702 24.5916 36.702 23.4688 37.7295C22.3459 38.7569 20.654 38.7569 19.5312 37.7295C18.4085 36.702 16.7165 36.702 15.5938 37.7295C14.471 38.7569 12.779 38.7569 11.6562 37.7295L10.8108 36.9558C10.1702 36.3695 9.2048 36.3695 8.56417 36.9558C7.47375 37.9536 5.75 37.1567 5.75 35.6549V11.1476C5.75 9.05984 5.75 8.01596 6.02641 7.17405C6.55059 5.57758 7.76814 4.32418 9.31893 3.78457C10.1367 3.5 11.1507 3.5 13.1788 3.5Z" fill="currentColor" fill-opacity="0.5" />
                      <path d="M12.75 11.8125C12.0251 11.8125 11.4375 12.4001 11.4375 13.125C11.4375 13.8499 12.0251 14.4375 12.75 14.4375H13.625C14.3499 14.4375 14.9375 13.8499 14.9375 13.125C14.9375 12.4001 14.3499 11.8125 13.625 11.8125H12.75Z" fill="currentColor" fill-opacity="0.5" />
                      <path d="M18.875 11.8125C18.1502 11.8125 17.5625 12.4001 17.5625 13.125C17.5625 13.8499 18.1502 14.4375 18.875 14.4375H30.25C30.9748 14.4375 31.5625 13.8499 31.5625 13.125C31.5625 12.4001 30.9748 11.8125 30.25 11.8125H18.875Z" fill="currentColor" fill-opacity="0.5" />
                    </svg>
                    <div class="space-y-2 text-center">
                      <span class="text-primary text-3xl font-semibold" id="count2">50+</span>
                      <p class="text-base-content/80">Tutor Profesional</p>
                    </div>
                  </div>
                  <div class="flex flex-col items-center justify-center gap-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none" class="text-primary">
                      <path opacity="0.5" d="M11.4549 37.4297H11C9.35008 37.4297 8.52513 37.4297 8.01256 36.9171C7.5 36.4046 7.5 35.5796 7.5 33.9297V31.9837C7.5 31.0763 7.5 30.6227 7.73307 30.2176C7.96613 29.8123 8.31772 29.6079 9.02093 29.1989C13.6505 26.5062 20.2251 24.9905 24.6134 27.6078C24.9081 27.7837 25.1734 27.996 25.3999 28.2504C26.3765 29.3475 26.3055 31.0032 25.1799 31.9856C24.9421 32.193 24.6888 32.3505 24.4337 32.4051C24.6433 32.3808 24.8442 32.353 25.036 32.3223C26.631 32.0679 27.9697 31.2156 29.1954 30.2897L32.358 27.9008C33.473 27.0585 35.1278 27.0583 36.2429 27.9003C37.2468 28.6584 37.5538 29.9065 36.9191 30.9237C36.179 32.1102 35.1362 33.628 34.1348 34.5553C33.1321 35.4841 31.6393 36.3132 30.4206 36.9014C29.0705 37.5531 27.5791 37.9285 26.0621 38.1742C22.9854 38.672 19.779 38.5961 16.7336 37.9687C15.0119 37.614 13.2239 37.4297 11.4549 37.4297Z" fill="currentColor" fill-opacity="0.5" />
                      <path d="M19.5073 5.88586C20.3938 4.29529 20.8373 3.5 21.5 3.5C22.1627 3.5 22.6062 4.29529 23.4927 5.88586L23.7221 6.29736C23.9741 6.74935 24.1001 6.97534 24.2965 7.12446C24.493 7.27358 24.7377 7.32893 25.2268 7.43964L25.6723 7.54042C27.3942 7.92999 28.255 8.12478 28.4597 8.78341C28.6647 9.44205 28.0777 10.1284 26.904 11.5009L26.6002 11.8561C26.2666 12.2461 26.0999 12.4411 26.025 12.6824C25.9499 12.9237 25.9751 13.1839 26.0255 13.7043L26.0713 14.1781C26.2488 16.0094 26.3377 16.9251 25.8013 17.3322C25.2651 17.7392 24.4591 17.3681 22.847 16.6258L22.4299 16.4338C21.9718 16.2229 21.7427 16.1174 21.5 16.1174C21.2573 16.1174 21.0282 16.2229 20.57 16.4338L20.153 16.6258C18.5409 17.3681 17.7348 17.7392 17.1986 17.3322C16.6624 16.9251 16.7511 16.0094 16.9286 14.1781L16.9745 13.7043C17.0249 13.1839 17.0501 12.9237 16.9751 12.6824C16.9001 12.4411 16.7333 12.2461 16.3997 11.8561L16.0961 11.5009C14.9223 10.1284 14.3354 9.44205 14.5402 8.78341C14.745 8.12478 15.6059 7.92999 17.3277 7.54042L17.7731 7.43964C18.2623 7.32893 18.507 7.27358 18.7035 7.12446C18.8998 6.97534 19.0258 6.74935 19.2778 6.29736L19.5073 5.88586Z" fill="currentColor" fill-opacity="0.5" />
                    </svg>
                    <div class="space-y-2 text-center">
                      <span class="text-primary text-3xl font-semibold" id="count3">4</span>
                      <p class="text-base-content/80">Program Pilihan</p>
                    </div>
                  </div>
                  <div class="flex flex-col items-center justify-center gap-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 43 42" fill="none" class="text-primary">
                      <path d="M19.6207 4.13037C20.2392 4.50845 20.434 5.31631 20.056 5.93477C19.7816 6.38356 19.8503 6.96187 20.2222 7.33381L20.3935 7.5051C21.4238 8.53526 21.8035 10.0486 21.3819 11.4431C21.1723 12.137 20.4397 12.5295 19.7459 12.3197C19.052 12.11 18.6596 11.3775 18.8693 10.6836C19.0109 10.2153 18.8833 9.70716 18.5373 9.36126L18.3662 9.18997C17.1367 7.96056 16.9094 6.04903 17.8163 4.56561C18.1943 3.94714 19.0021 3.75228 19.6207 4.13037Z" fill="currentColor" fill-opacity="0.5" />
                      <path d="M35.4549 12.3319C35.2125 12.4252 34.9978 12.6399 34.5685 13.0694C34.1391 13.4988 33.9244 13.7135 33.8309 13.9558C33.7217 14.2392 33.7217 14.5532 33.8309 14.8366C33.9244 15.0789 34.1391 15.2936 34.5685 15.723C34.9978 16.1524 35.2125 16.3671 35.4549 16.4605C35.7382 16.5697 36.0522 16.5697 36.3357 16.4605C36.5779 16.3671 36.7926 16.1524 37.2221 15.723C37.6515 15.2936 37.8662 15.0789 37.9595 14.8366C38.0687 14.5532 38.0687 14.2392 37.9595 13.9558C37.8662 13.7135 37.6515 13.4988 37.2221 13.0694C36.7926 12.6399 36.5779 12.4252 36.3357 12.3319C36.0522 12.2227 35.7382 12.2227 35.4549 12.3319Z" fill="currentColor" fill-opacity="0.5" />
                      <path d="M37.9639 21.9793C37.3309 21.7026 36.5947 21.8188 36.0779 22.2771C34.6616 23.5329 32.6008 23.7417 30.9616 22.7953L30.589 22.5802C29.9613 22.2178 29.7462 21.4151 30.1087 20.7874C30.4711 20.1596 31.2738 19.9444 31.9015 20.307L32.2741 20.5219C32.9347 20.9034 33.7655 20.8192 34.3363 20.3131C35.6187 19.176 37.445 18.8876 39.0155 19.5741L39.5256 19.7972C40.1897 20.0875 40.4928 20.8614 40.2023 21.5255C39.912 22.1898 39.1381 22.4927 38.474 22.2024L37.9639 21.9793Z" fill="currentColor" fill-opacity="0.5" />
                    </svg>
                    <div class="space-y-2 text-center">
                      <span class="text-primary text-3xl font-semibold" id="count4">10k+</span>
                      <p class="text-base-content/80">Siswa Berprestasi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div class="bg-base-100 py-8 sm:py-16 lg:py-24">
          <div class="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div class="mb-12 space-y-4 text-center sm:mb-16 lg:mb-24">
              <h2 class="text-base-content text-2xl font-semibold md:text-3xl lg:text-4xl">Program Belajar Unggulan</h2>
              <p class="text-base-content/80 text-xl">Metode yang terbukti efektif meningkatkan nilai akademis dan kelulusan siswa ke jenjang selanjutnya.</p>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div class="card card-border shadow-none">
                <figure>
                  <img src="../assets/img/blog-1.png" alt="Bimbingan SD" />
                </figure>
                <div class="card-body gap-3">
                  <h5 class="card-title text-xl">Bimbingan SD</h5>
                  <p class="mb-5">Pondasi dasar pemahaman konsep belajar dengan pendekatan interaktif dan menyenangkan untuk siswa sekolah dasar.</p>
                  <div class="card-actions">
                    <button @click="handleLogin" class="btn btn-primary btn-gradient">
                      Pilih Program
                      <span class="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card card-border shadow-none">
                <figure>
                  <img src="../assets/img/blog-2.png" alt="Bimbingan SMP" />
                </figure>
                <div class="card-body gap-3">
                  <h5 class="card-title text-xl">Bimbingan SMP</h5>
                  <p class="mb-5">Program terarah untuk mempersiapkan siswa SMP memahami materi lanjutan secara efektif dan efisien.</p>
                  <div class="card-actions">
                    <button @click="handleLogin" class="btn btn-primary btn-gradient">
                      Pilih Program
                      <span class="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card card-border shadow-none">
                <figure>
                  <img src="../assets/img/blog-3.png" alt="Bimbingan SMA & UTBK" />
                </figure>
                <div class="card-body gap-3">
                  <h5 class="card-title text-xl">Bimbingan SMA & UTBK</h5>
                  <p class="mb-5">Persiapan intensif bagi siswa SMA untuk ujian akhir dan menembus perguruan tinggi negeri impian.</p>
                  <div class="card-actions">
                    <button @click="handleLogin" class="btn btn-primary btn-gradient">
                      Pilih Program
                      <span class="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="bg-base-200 py-8 sm:py-16 lg:py-24">
        <div class="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div id="multi-slide" data-carousel='{ "loadingClasses": "opacity-0", "slidesQty": { "xs": 1, "md": 2 } }' class="relative flex w-full gap-12 max-lg:flex-col md:gap-16 lg:items-center lg:gap-24">
            <div>
              <div class="space-y-4">
                <h2 class="text-base-content text-2xl font-semibold md:text-3xl lg:text-4xl">Ulasan Siswa</h2>
                <p class="text-base-content/80 text-xl">Dengar pengalaman mereka meraih prestasi setelah bergabung bersama Lazuardy.</p>
                <div class="flex gap-4">
                  <button class="btn btn-square btn-sm carousel-prev btn-primary carousel-disabled:opacity-100 carousel-disabled:btn-outline relative hover:text-white" disabled="disabled">
                    <span class="icon-[tabler--arrow-left] size-5"></span>
                  </button>
                  <button class="btn btn-square btn-sm carousel-next btn-primary carousel-disabled:opacity-100 carousel-disabled:btn-outline relative hover:text-white">
                    <span class="icon-[tabler--arrow-right] size-5"></span>
                  </button>
                </div>
              </div>
            </div>
            <div class="carousel rounded-box">
              <div class="carousel-body gap-6 opacity-0">
                <div class="carousel-slide">
                  <div class="card card-border hover:border-primary transition-border h-full shadow-none duration-300">
                    <div class="card-body gap-5">
                      <div class="flex items-center gap-3">
                        <div class="avatar">
                          <div class="size-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">A</div>
                        </div>
                        <div>
                          <h4 class="text-base-content font-medium">Andi Pratama</h4>
                          <p class="text-base-content/80 text-sm">Siswa SMA</p>
                        </div>
                      </div>
                      <div class="flex gap-1">
                        <span class="icon-[tabler--star-filled] text-warning size-6 shrink-0" v-for="n in 5" :key="n"></span>
                      </div>
                      <p class="text-base-content/80">"Tutor Lazuardy menjelaskan materi matematika yang rumit jadi sangat mudah dipahami. Nilai tryout UTBK saya naik pesat!"</p>
                    </div>
                  </div>
                </div>
                <div class="carousel-slide">
                  <div class="card card-border hover:border-primary transition-border h-full shadow-none duration-300">
                    <div class="card-body gap-5">
                      <div class="flex items-center gap-3">
                        <div class="avatar">
                          <div class="size-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">S</div>
                        </div>
                        <div>
                          <h4 class="text-base-content font-medium">Siti Rahmawati</h4>
                          <p class="text-base-content/80 text-sm">Siswa SMP</p>
                        </div>
                      </div>
                      <div class="flex gap-1">
                        <span class="icon-[tabler--star-filled] text-warning size-6 shrink-0" v-for="n in 5" :key="n"></span>
                      </div>
                      <p class="text-base-content/80">"Belajar di sini sangat fleksibel. Saya bisa tanya tugas sekolah dan langsung diajarkan cara cepat menyelesaikannya."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-base-100 py-8 sm:py-16 lg:py-24">
        <div class="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div class="from-primary/30 to-error/30 p-0.25 overflow-hidden rounded-3xl bg-gradient-to-r">
            <div class="bg-base-100 rounded-3xl p-0.5">
              <div class="from-primary/6 to-error/6 relative rounded-3xl bg-gradient-to-r to-50% p-8 lg:p-16">
                <div class="flex justify-between gap-8 max-md:flex-col max-sm:items-center max-sm:text-center md:items-center">
                  <div class="max-w-xs space-y-4 lg:max-w-lg">
                    <h2 class="text-base-content text-xl font-bold md:text-3xl">Tingkatkan Nilaimu Sekarang</h2>
                    <p class="text-base-content/80">Akses ribuan materi, soal latihan, dan mentor berpengalaman kapan saja. Persiapkan masa depan dan ujianmu sejak dini. Sukses berawal dari langkah kecil hari ini.</p>
                    <button @click="handleLogin" class="btn btn-gradient btn-primary">
                      Masuk / Daftar Akun
                      <span class="icon-[tabler--arrow-right]"></span>
                    </button>
                  </div>
                  <!-- <img src="../assets/img/mint.png" alt="mint" class="intersect-once intersect:motion-preset-slide-down-lg intersect:motion-duration-800 intersect:motion-opacity-in-0 intersect:motion-delay-100 absolute end-[21%] top-0 h-20 max-w-sm max-md:hidden" /> -->
                  <img src="../assets/img/pizza.png" alt="Decoration" class="rtl:rotate-y-180 absolute end-0 top-0 h-full max-w-md rounded-br-3xl max-md:hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="via-primary/20 mx-auto h-px w-3/5 bg-gradient-to-r from-transparent to-transparent"></div>
      
      <section id="team">
        <div class="bg-base-100 py-8 sm:py-16 lg:py-24">
          <div class="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div class="mb-12 text-center sm:mb-16 lg:mb-24">
              <h2 class="text-base-content mb-4 text-2xl font-semibold md:text-3xl lg:text-4xl">Tutor Rekomendasi Kami</h2>
              <p class="text-base-content/80 text-xl">Belajar langsung dari pakarnya. Tutor bersertifikasi yang siap membimbingmu setiap saat.</p>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div v-for="(tutor, index) in topTutors.slice(0, 4)" :key="tutor.id" class="card card-border hover:border-primary h-max shadow-none">
                <figure class="bg-base-200 pt-10.5">
                  <img :src="tutor.image" :alt="tutor.name" class="h-60 w-auto rounded-t-xl object-cover" />
                </figure>
                <div class="card-body gap-3 p-5">
                  <h3 class="text-base-content text-lg font-medium">{{ tutor.name }}</h3>
                  <div class="divider"></div>
                  <div>
                    <p class="text-base-content/80 mb-1 font-medium">Tutor {{ tutor.subject }}</p>
                    <p class="text-base-content/80 text-sm">Rating: {{ tutor.rating }} / 5 ({{ tutor.reviews }} Ulasan)</p>
                    <p class="text-base-content/80 text-sm">Mode: <span v-for="mode in tutor.teachingMode" :key="mode" class="capitalize">{{ mode }} </span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-us">
        <div class="bg-base-200 py-8 sm:py-16 lg:py-24">
          <div class="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div class="mb-12 text-center text-white sm:mb-16 lg:mb-24">
              <h2 class="text-base-content mb-4 text-2xl font-semibold md:text-3xl md:text-6xl lg:text-4xl">Siap Meraih Prestasi Bersama Kami?</h2>
              <p class="text-base-content/80 text-xl">Jangan tunda lagi. Mulai jadwalkan sesi belajarmu sekarang dan capai target akademismu.</p>
            </div>
            <div class="card shadow-md">
              <div class="card-body grid gap-10 lg:grid-cols-7 items-center">
                <div class="lg:col-span-4 bg-primary/10 rounded-box p-8 text-center md:text-left h-full flex flex-col justify-center border border-primary/20">
                  <h2 class="text-base-content mb-6 text-3xl font-semibold">Bergabung ke Lazuardy</h2>
                  <p class="text-base-content/80 mb-8 text-lg">Akses semua layanan, pilih tutor terbaikmu, dan pantau perkembangan belajarmu secara real-time. Masuk untuk melanjutkan perjalanan akademismu.</p>
                  <button @click="handleLogin" class="btn btn-primary btn-gradient w-full md:w-auto px-12 py-3 text-lg">
                    Ke Halaman Login / Masuk
                  </button>
                </div>
                <div class="space-y-6 lg:col-span-3">
                  <div class="border-base-content/20 rounded-box border p-6 text-center">
                    <h3 class="text-base-content mb-4 text-xl font-semibold">Email / Telepon</h3>
                    <p class="text-base-content/80 mb-2 break-all">info@lazuardy.com</p>
                    <p class="text-base-content/80">+62 812-3456-7890</p>
                  </div>
                  <div class="border-base-content/20 rounded-box border p-6 text-center">
                    <h3 class="text-base-content mb-4 text-xl font-semibold">Lokasi Kami</h3>
                    <p class="text-base-content/80">Yogyakarta, Indonesia</p>
                  </div>
                  <p class="text-base-content text-center font-medium">
                    Bantuan CS Aktif
                    <span class="text-primary">24 Jam</span>
                    Setiap Hari
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faqs">
        <div class="bg-base-100 relative h-full py-8 sm:py-16 lg:py-24">
          <div class="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <span class="intersect:motion-preset-slide-right intersect:motion-duration-800 intersect:motion-opacity-0 intersect:motion-delay-600 absolute start-[15%]">
              <svg xmlns="http://www.w3.org/2000/svg" width="102" height="120" viewBox="0 0 102 120" fill="none">
                <g opacity="0.06">
                  <path d="M28.7216 21.3499C28.9372 20.7851 41.4433 1.58331 65.1497 9.79441C81.0958 15.3176 91.1148 31.322 85.0343 47.2497C80.8081 58.3201 70.4601 62.4098 58.4869 63.5065C54.2254 63.9489 52.9117 67.0751 51.4887 70.8027L49.0737 77.1288L31.533 71.0533L36.2336 58.7402C38.131 53.77 39.8962 49.7767 45.9306 48.1581C54.097 45.9987 60.2859 47.7587 63.3477 39.7382C65.4177 34.316 63.0568 29.1498 58.273 27.4928C50.6191 24.8418 44.3109 30.3308 41.287 34.7831L28.7216 21.3499ZM45.1012 97.6235C42.3843 104.74 34.7635 108.623 27.9601 106.267C21.2626 103.947 18.0403 96.308 20.7571 89.1915C23.517 81.9618 31.1379 78.0787 37.8354 80.3985C44.6389 82.7549 47.8611 90.3941 45.1012 97.6235Z" fill="var(--color-primary)" fill-opacity="0.5" />
                </g>
              </svg>
            </span>
            <div class="mb-12 space-y-4 text-wrap text-center sm:mb-16 lg:mb-24">
              <h2 class="text-base-content text-2xl font-semibold md:text-3xl lg:text-4xl">Paling Sering Ditanyakan</h2>
              <p class="text-base-content/80 text-xl">Informasi mengenai sistem dan fasilitas di Bimbel Lazuardy.</p>
            </div>
            <div id="faq-carousel-1" data-carousel='{ "loadingClasses": "opacity-0",  "slidesQty": { "xs": 1, "md": 2, "lg": 3 } }' class="relative w-full">
              <div class="flex gap-1">
                <button class="btn btn-circle carousel-prev btn-outline btn-primary hover:bg-primary relative hover:text-white max-md:hidden" disabled="disabled">
                  <span class="icon-[tabler--arrow-left] size-5.5"></span>
                </button>
                <div class="carousel rounded-box">
                  <div class="carousel-body h-full gap-12 opacity-0">
                    <div v-for="(faq, index) in faqData" :key="index" class="carousel-slide m-2">
                      <div class="rounded-box hover:bg-base-100 hover:ring-primary p-4 text-center hover:ring h-full">
                        <h5 class="text-base-content mb-2 text-xl font-semibold">{{ faq.question }}</h5>
                        <p class="text-base-content/80">{{ faq.answer }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-circle carousel-next btn-primary btn-outline hover:bg-primary relative hover:text-white max-md:hidden">
                  <span class="icon-[tabler--arrow-right] size-5.5"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div class="flex items-center justify-between gap-3 max-md:flex-col">
          <a href="#" class="text-base-content flex items-center gap-3 text-xl font-semibold">
            <img :src="logo" alt="Bimbel Lazuardy" class="h-8 md:h-10 w-auto" />
          </a>
          
          <nav class="flex items-center gap-6">
            <a href="#about-us" class="link link-animated text-base-content/80 font-medium">Tentang</a>
            <a href="#services" class="link link-animated text-base-content/80 font-medium">Program</a>
            <a href="#team" class="link link-animated text-base-content/80 font-medium">Tutor</a>
            <a href="#faqs" class="link link-animated text-base-content/80 font-medium">FAQ</a>
          </nav>
          <div class="text-base-content flex h-5 gap-4">
            <a href="#" aria-label="Social">
              <span class="icon-[tabler--brand-discord] size-5"></span>
            </a>
            <a href="#" aria-label="Social">
              <span class="icon-[tabler--brand-x] size-5"></span>
            </a>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <div class="text-base-content text-center text-base">
          &copy;2025
          <a href="#" class="text-primary">Bimbel Lazuardy</a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// Import file logo
import logo from "@/assets/logo.svg";

const router = useRouter();

const handleLogin = () => {
  router.push("/login");
};

const topTutors = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    subject: "Matematika",
    rating: 4.9,
    reviews: 156,
    image: "https://picsum.photos/seed/t1/400/400",
    teachingMode: ["online", "offline"],
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    subject: "Fisika",
    rating: 4.8,
    reviews: 142,
    image: "https://picsum.photos/seed/t2/400/400",
    teachingMode: ["online"],
  },
  {
    id: 3,
    name: "Budi Santoso",
    subject: "Matematika",
    rating: 4.9,
    reviews: 225,
    image: "https://picsum.photos/seed/tutor1/400/400",
    teachingMode: ["online", "offline"],
  },
  {
    id: 4,
    name: "Rina Wijaya",
    subject: "Biologi",
    rating: 4.7,
    reviews: 129,
    image: "https://picsum.photos/seed/t4/400/400",
    teachingMode: ["online"],
  }
];

const faqData = [
  {
    question: "Apa yang dimaksud dengan aplikasi belajar online?",
    answer: "Aplikasi belajar online adalah platform digital yang memungkinkan siswa belajar dengan tutor secara virtual melalui internet.",
  },
  {
    question: "Bagaimana efektivitas pembelajaran online di Indonesia?",
    answer: "Fleksibilitas waktu dan akses tutor berkualitas meningkatkan kepuasan pengguna, meskipun kualitas koneksi tetap berpengaruh.",
  },
  {
    question: "Apakah bimbel Lazuardy tersedia di desktop?",
    answer: "Ya, dapat diakses via browser di PC, laptop, tablet, dan ponsel.",
  },
  {
    question: "Langkah-langkah mendaftar?",
    answer: "Daftar akun melalui tombol login, pilih program, jadwalkan sesi, dan ikuti pembelajaran.",
  },
];
</script>