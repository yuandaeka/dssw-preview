Product Requirement Document (PRD)
1. Ringkasan Produk & Visi
Nama Produk (Tentatif): GlobalEd / EduKarakter LMS

Deskripsi: Platform pembelajaran digital (e-learning) modular berbasis web untuk penguatan karakter Kebhinekaan Global bagi siswa sekolah. Sistem memadukan video animasi interaktif, chatbot AI (Gemini API), sesi video call refleksi langsung (in-app WebRTC), jurnal observasi mandiri, dan penulisan cerita pendek dengan sistem evaluasi ganda (AI & Guru).

Target Pengguna:

Siswa: Mengikuti alur 6 aktivitas secara berurutan, berinteraksi dengan AI dan Guru, serta mengumpulkan karya tulis.

Guru (Admin Kelas): Mengelola materi/video, menjadwalkan dan memimpin sesi video call, memantau progres siswa, serta memberikan nilai dan umpan balik.

2. Arsitektur & Spesifikasi Teknologi
Frontend: React (Vite) + Tailwind CSS + Lucide Icons.

Backend & Glue: Laravel 11 + Inertia.js (React Adapter).

Database: MySQL.

Autentikasi: Laravel Socialite (Google OAuth 2.0) + Session Auth bawaan Laravel.

Integrasi AI: Google Gemini API (Model: gemini-1.5-flash / gemini-2.5-flash via Laravel HTTP Client).

Integrasi Video Call: Daily.co API / Agora Web SDK / Jitsi Meet Iframe API.

Text Editor: TipTap Editor / Quill.js (React).

Penyimpanan Video: Embed streaming YouTube (Unlisted) / Cloudflare R2 / AWS S3.

3. Kebutuhan Fungsional (Functional Requirements)
A. Autentikasi & Manajemen Pengguna
FR-AUTH-01: Siswa dan Guru dapat masuk (login) menggunakan akun Google (Single Sign-On).

FR-AUTH-02: Sistem mendeteksi peran pengguna:

Pengguna baru otomatis mendapat peran siswa.

Akun dengan email yang telah didaftarkan sebelumnya oleh pihak sekolah dialokasikan peran guru.

FR-AUTH-03: Role-based middleware untuk memisahkan hak akses antara rute Siswa dan Guru.

B. Antarmuka Utama & Navigasi (SPADA-Style Layout)
FR-UI-01: Tata letak dua panel (split screen):

Sidebar Kiri: Daftar runtut Aktivitas 1–6 lengkap dengan indikator status (Selesai [✓], Sedang Berlangsung, atau Terkunci [🔒]).

Area Kanan: Area kerja dinamis yang merender komponen aktivitas tanpa full reload (Inertia navigation).

FR-UI-02: Mekanisme Prerequisite Locking: Aktivitas berikutnya hanya dapat diakses jika aktivitas sebelumnya telah dinyatakan selesai oleh sistem atau diverifikasi oleh guru.

C. Alur 6 Aktivitas Pembelajaran
FR-ACT-01 (Activity 1 - Video Animasi & Chatbot AI):

Pemutar video terintegrasi untuk materi animasi kebhinekaan.

Panel percakapan interaktif (chatbot) yang terhubung ke Gemini API dengan system prompt tertutup (berperan sebagai tutor karakter ramah). Riwayat chat tersimpan di basis data.

FR-ACT-02 (Activity 2 - Video Call: Infer Character Values):

Ruang panggilan video langsung di dalam peramban (in-app WebRTC).

Lembar pencatatan nilai karakter yang dapat dinilai langsung oleh guru selama sesi berlangsung.

FR-ACT-03 (Activity 3 - Full Observation 2 Minggu):

Komponen countdown timer 14 hari sejak diaktifkannya modul oleh guru.

Form jurnal refleksi harian (Daily Character Log) opsional untuk mencatat aksi nyata siswa di lingkungan sekitar.

Penguncian otomatis Activity 4 hingga masa observasi terpenuhi.

FR-ACT-04 (Activity 4 - Vidcall Feedback Implementasi):

Ruang video call lanjutan antara guru dan siswa untuk merefleksikan hasil observasi lapangan.

FR-ACT-05 (Activity 5 - Writing Short Stories):

Rich text editor di browser untuk penulisan karya cerpen kebhinekaan.

Fitur auto-save draft lokal/server setiap 15 detik agar progres tulisan tidak hilang.

FR-ACT-06 (Activity 6 - Interactive Writing Feedback):

AI Pre-feedback: Analisis otomatis oleh Gemini atas tulisan siswa (menilai relevansi tema kebhinekaan, tata bahasa, dan pesan moral).

Teacher Feedback: Form penilaian resmi, skor rubrik, dan catatan akhir dari guru.

4. Perancangan Basis Data (Database Schema)
users
├── id (BIGINT, PK)
├── name (VARCHAR)
├── email (VARCHAR, UNIQUE)
├── google_id (VARCHAR, NULLABLE)
├── role (ENUM: 'guru', 'siswa')
└── timestamps

courses
├── id (BIGINT, PK)
├── title (VARCHAR)
├── description (TEXT)
├── teacher_id (FK -> users.id)
└── timestamps

activities
├── id (BIGINT, PK)
├── course_id (FK -> courses.id)
├── order_number (INT: 1-6)
├── title (VARCHAR)
├── description (TEXT)
├── metadata (JSON: link_video, room_id, durasi_timer)
└── timestamps

student_progress
├── id (BIGINT, PK)
├── user_id (FK -> users.id)
├── activity_id (FK -> activities.id)
├── status (ENUM: 'locked', 'in_progress', 'completed')
├── completed_at (TIMESTAMP, NULLABLE)
└── timestamps

chat_logs (Activity 1)
├── id (BIGINT, PK)
├── user_id (FK -> users.id)
├── prompt (TEXT)
├── ai_response (TEXT)
└── timestamps

observations (Activity 3)
├── id (BIGINT, PK)
├── user_id (FK -> users.id)
├── started_at (TIMESTAMP)
├── ends_at (TIMESTAMP)
└── notes (TEXT, NULLABLE)

story_submissions (Activity 5 & 6)
├── id (BIGINT, PK)
├── user_id (FK -> users.id)
├── title (VARCHAR)
├── content (LONGTEXT)
├── ai_feedback (TEXT, NULLABLE)
├── teacher_feedback (TEXT, NULLABLE)
├── score (INT, NULLABLE)
├── status (ENUM: 'draft', 'submitted', 'graded')
└── timestamps

Rencana Pengerjaan & Roadmap
[Sprint 1: Fondasi] ────► [Sprint 2: Media & AI] ────► [Sprint 3: Realtime & Tulisan] ────► [Sprint 4: Feedback & Rilis]
• Setup Laravel Breeze    • Video Embed               • In-app Video Call (Daily.co)   • AI Cerpen Feedback
• Integrasi Inertia React • Chatbot Gemini API        • Countdown Timer 14 Hari        • Panel Grading Guru
• Google OAuth & Role     • Logic Prerequisite        • Rich Text Editor Auto-Save     • Build Asset & Deploy
• Layout Kiri-Kanan

Fase 1 (Minggu 1): Fondasi & Arsitektur Utama

Setup repositori Laravel 11 + Breeze React Inertia.

Konfigurasi Google OAuth via Laravel Socialite.

Desain master layout SPADA-like (Sidebar kiri sticky, navbar atas, container konten kanan).

Fase 2 (Minggu 2): Modul Pengetahuan & Integrasi AI (Activity 1 & 3)

Pembuatan player video animasi.

Pembuatan service backend penanganan API Google Gemini.

UI chat bubble interaktif di React untuk tanya-jawab materi.

Implementasi countdown timer 14 hari untuk observasi mandiri.

Fase 3 (Minggu 3): Komunikasi Real-time & Modul Karya (Activity 2, 4, 5)

Integrasi video call WebRTC pihak ketiga (Daily.co / Jitsi API).

Implementasi Rich Text Editor (TipTap) dengan sistem debounce auto-save untuk Activity 5.

Fase 4 (Minggu 4): Evaluasi, Dashboard Guru & Pengujian

Integrasi AI review untuk karya cerpen siswa.

Dashboard monitoring progres siswa dan rubrik penilaian guru.

Uji coba responsif mobile, optimasi build Vite, dan deployment ke hosting produksi.