import { Head, Link } from '@inertiajs/react';
import { 
    Compass, 
    PlayCircle, 
    Video, 
    Clock, 
    FileText, 
    Award, 
    ArrowRight, 
    Sparkles, 
    ShieldCheck, 
    GraduationCap,
    HeartHandshake,
    Globe2,
    CheckCircle2
} from 'lucide-react';

export default function Welcome({ auth }) {
    const activitiesPreview = [
        {
            num: 1,
            icon: PlayCircle,
            title: 'Video Animasi & AI Tutor',
            desc: 'Eksplorasi materi kebhinekaan interaktif dengan panduan chatbot AI Gemini.',
            color: 'from-blue-500 to-indigo-600',
        },
        {
            num: 2,
            icon: Video,
            title: 'Video Call Nilai Karakter',
            desc: 'Sesi temu virtual langsung (in-app WebRTC) bersama guru pengampu kelas.',
            color: 'from-indigo-600 to-violet-600',
        },
        {
            num: 3,
            icon: Clock,
            title: 'Observasi Mandiri (14 Hari)',
            desc: 'Pencatatan refleksi harian aksi toleransi nyata di lingkungan sekitar.',
            color: 'from-amber-500 to-orange-600',
        },
        {
            num: 4,
            icon: Video,
            title: 'Video Call Feedback',
            desc: 'Presentasi hasil observasi lapangan dan diskusi terarah bersama guru.',
            color: 'from-violet-600 to-purple-600',
        },
        {
            num: 5,
            icon: FileText,
            title: 'Penulisan Cerpen Kebhinekaan',
            desc: 'Karya sastra reflektif dengan text editor TipTap dan auto-save 15 detik.',
            color: 'from-teal-500 to-emerald-600',
        },
        {
            num: 6,
            icon: Award,
            title: 'Evaluasi Ganda (AI & Guru)',
            desc: 'Analisis otomatis AI dan skor rubrik resmi serta umpan balik guru.',
            color: 'from-emerald-600 to-teal-700',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
            <Head title="EduKarakter - LMS Kebhinekaan Global" />

            {/* Glowing Background Gradients */}
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

            {/* Top Navigation */}
            <header className="relative z-10 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30">
                            <Compass className="h-6 w-6" />
                        </div>
                        <div>
                            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                                EduKarakter <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-xs font-bold text-indigo-400 border border-indigo-500/30">LMS</span>
                            </span>
                            <span className="block text-xs font-medium text-slate-400">
                                Penguatan Kebhinekaan Global
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {auth?.user ? (
                            <Link
                                href={auth.user.role === 'guru' ? route('teacher.dashboard') : route('course.show')}
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
                            >
                                <span>Buka Modul Pembelajaran</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-xl px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-violet-500 transition-all"
                                >
                                    <span>Mulai Belajar</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 shadow-inner">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Platform E-Learning Modular Berbasis Alur 6 Aktivitas</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                        Membangun Karakter <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
                            Kebhinekaan Global
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Integrasi media video animasi reflektif, asisten tutor AI Gemini, tatap maya WebRTC, observasi lapangan mandiri, dan penulisan cerpen sastra dengan evaluasi komprehensif.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-transform"
                        >
                            <GraduationCap className="w-5 h-5" />
                            <span>Akses Kelas Belajar Siswa</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <a
                            href={route('auth.google')}
                            className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                            <span>Single Sign-On Google</span>
                        </a>
                    </div>
                </div>

                {/* 6 Activities Flow Card Grid */}
                <div className="mt-20">
                    <div className="text-center mb-10">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            Rangkaian 6 Aktivitas Pembelajaran Terstruktur
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Alur linier dengan sistem Prerequisite Locking untuk penanaman nilai karakter mendalam
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {activitiesPreview.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div 
                                    key={item.num}
                                    className="group relative rounded-2xl border border-slate-800 bg-slate-800/40 p-6 backdrop-blur-xs hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${item.color} text-white shadow-lg`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            Aktivitas {item.num}
                                        </span>
                                    </div>

                                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Architecture & Roles Banner */}
                <div className="mt-16 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-800/50 via-slate-900 to-indigo-950/40 p-8 sm:p-10 flex flex-wrap items-center justify-between gap-6">
                    <div className="space-y-2 max-w-xl">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                            Arsitektur Siap Produksi
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                            Laravel 11 + Inertia.js React + Google OAuth & Gemini AI
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Dibangun dengan proteksi middleware berbasis peran (<code className="text-indigo-300">role: guru</code> & <code className="text-indigo-300">role: siswa</code>), integrasi API pihak ketiga aman melalui backend, serta layout dua panel bergaya SPADA.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-950 shadow-md hover:bg-slate-100 transition"
                        >
                            <ShieldCheck className="w-4 h-4 text-indigo-600" />
                            <span>Coba Demo Kelas Sekarang</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
