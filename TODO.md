List To-Do Eksekusi Proyek
1. Inisialisasi & Setup Lingkungan
[x] Install Laravel 11: composer create-project laravel/laravel (Laravel 11.57.0 & PHP 8.3 CLI)
[x] Install Laravel Breeze dengan stack React: php artisan breeze:install react
[x] Install dependency pendukung: npm install lucide-react @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder axios
[x] Setup file .env (Database, Kredensial App, Google OAuth, & Gemini API keys).

2. Autentikasi & Database
[x] Install Socialite: composer require laravel/socialite
[ ] Daftarkan OAuth Client ID di Google Cloud Console (Variabel .env GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET telah disiapkan).
[x] Buat migration untuk penambahan google_id, role ('guru', 'siswa'), dan avatar pada tabel users.
[x] Buat migration untuk tabel courses, activities, student_progress, chat_logs, observations, dan story_submissions.
[x] Buat GoogleAuthController untuk rute redirect (/auth/google) dan callback (/auth/google/callback).
[x] Buat middleware CheckRole untuk membedakan hak akses dan dashboard guru vs siswa.

3. Layout Antarmuka (UI SPADA-Style)
[x] Buat komponen CourseLayout.jsx (Sidebar navigasi kiri + Topbar + Container dinamis).
[x] Buat komponen ActivitySidebarItem.jsx dengan status badge (Selesai, Aktif, Terkunci).
[x] Tambahkan logika toggle drawer responsive untuk layar smartphone/tablet.
[x] Buat halaman Course/Show.jsx dengan alur 6 aktivitas dan aksi "Tandai Selesai & Lanjutkan" (Prerequisite Locking).
[x] Buat halaman Teacher/Dashboard.jsx untuk matriks pemantauan progres kelas guru.

4. Implementasi Fitur Per Aktivitas (Sprint 2 & 3)
[ ] Activity 1:
    [ ] Buat komponen pemutar video animasi.
    [ ] Buat controller Laravel untuk proxy request ke Gemini API (POST /api/ai/chat).
    [ ] Buat komponen widget chat React (input, log pesan, indikator mengetik).

[ ] Activity 2 & 4:
    [ ] Daftarkan akun developer Daily.co / Jitsi Meet.
    [ ] Buat komponen React VideoCallRoom.jsx untuk merender ruang panggilan.
    [ ] Siapkan form input ringkasan/catatan refleksi karakter untuk guru.

[ ] Activity 3:
    [ ] Buat komponen visual ObservationTimer.jsx (menghitung mundur 14 hari).
    [ ] Buat form sederhana pencatatan jurnal observasi harian.

[ ] Activity 5:
    [ ] Pasang TipTap Editor pada komponen StoryWriting.jsx.
    [ ] Buat fungsi auto-save (tiap 15 detik) ke endpoint POST /activity/story/draft.

[ ] Activity 6:
    [ ] Buat endpoint evaluasi Gemini untuk menganalisis cerpen yang disubmit.
    [ ] Tampilkan hasil review AI dan kolom feedback resmi dari guru di halaman siswa.

5. Panel Guru (Admin)
[x] Buat tabel matriks monitoring progres siswa di kelas (Teacher/Dashboard.jsx).
[ ] Buat form koreksi dan penilaian cerpen siswa (Activity 5 & 6).
[ ] Buat pengaturan tanggal mulai observasi dan link meeting.

6. Deployment & Polishing
[ ] Jalankan pengujian lintas peramban (Chrome, Edge, Safari di Mobile).
[x] Jalankan optimasi aset: npm run build dan php artisan test (Semua 30 tes PASS).
[ ] Setup konfigurasi web server (Apache/Nginx) dan SSL HTTPS di hosting target.