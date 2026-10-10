import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import CourseLayout from '@/Layouts/CourseLayout';
import { 
    PlayCircle, 
    Bot, 
    Video, 
    Clock, 
    FileText, 
    Award, 
    CheckCircle2, 
    ArrowRight, 
    ArrowLeft, 
    Sparkles, 
    Calendar, 
    Users, 
    BookOpen,
    Send,
    Edit3
} from 'lucide-react';

export default function Show({ 
    course, 
    activities = [], 
    currentActivity, 
    activityData,
    progressSummary 
}) {
    const [completing, setCompleting] = useState(false);

    if (!currentActivity) {
        return (
            <CourseLayout course={course} activities={activities} progressSummary={progressSummary}>
                <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                    <p className="text-slate-500 font-medium">Aktivitas pembelajaran belum tersedia.</p>
                </div>
            </CourseLayout>
        );
    }

    const isCompleted = currentActivity.status === 'completed';
    const nextActivity = activities.find(a => a.order_number === currentActivity.order_number + 1);
    const prevActivity = activities.find(a => a.order_number === currentActivity.order_number - 1);

    const handleCompleteAndNext = () => {
        setCompleting(true);
        router.post(route('course.complete', { activityNumber: currentActivity.order_number }), {}, {
            onFinish: () => setCompleting(false),
        });
    };

    // Render workspace dinamis berdasarkan aktivitas yang aktif
    const renderActivityWorkspace = () => {
        switch (currentActivity.order_number) {
            case 1:
                return (
                    <div className="space-y-6">
                        {/* Video Player Card */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                            <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                                    <PlayCircle className="w-4 h-4 text-indigo-600" />
                                    <span>Video Animasi Pembelajaran Kebhinekaan</span>
                                </div>
                                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                                    Durasi: ~7 Menit
                                </span>
                            </div>
                            <div className="aspect-video w-full bg-slate-900 flex items-center justify-center relative overflow-hidden group">
                                <iframe 
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0" 
                                    title="Video Animasi Kebhinekaan Global"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-4 sm:p-5 bg-white">
                                <h4 className="text-sm font-bold text-slate-900 mb-1">Panduan Menonton</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Perhatikan bagaimana tokoh-tokoh dalam animasi saling berdialog melintasi latar budaya yang berbeda. Nilai keberagaman apa yang paling berkesan untukmu? Diskusikan dengan tutor AI di bawah ini.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Chatbot AI Preview Card */}
                        <div className="rounded-2xl border border-indigo-100 bg-white shadow-xs p-5 sm:p-6 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/30">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                            Tutor AI Bhineka (Gemini API)
                                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        </h4>
                                        <p className="text-[11px] text-slate-500">Tanya jawab interaktif & eksplorasi nilai karakter</p>
                                    </div>
                                </div>
                                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 font-medium">
                                    AI Tutor Aktif
                                </span>
                            </div>

                            {/* Chat Sample Dialog */}
                            <div className="rounded-xl bg-slate-50 p-4 space-y-3 max-h-72 overflow-y-auto border border-slate-100">
                                <div className="flex items-start gap-2.5">
                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="rounded-2xl rounded-tl-xs bg-white p-3 text-xs text-slate-800 shadow-xs border border-slate-100 max-w-lg">
                                        <p className="leading-relaxed">
                                            Halo! Saya Tutor Bhineka. Setelah menonton video tadi, menurutmu apa tantangan terbesar ketika berinteraksi dengan orang dari kebudayaan yang sangat berbeda?
                                        </p>
                                    </div>
                                </div>

                                {activityData?.chat_logs && activityData.chat_logs.length > 0 ? (
                                    activityData.chat_logs.map((log) => (
                                        <div key={log.id} className="space-y-3">
                                            <div className="flex items-start gap-2.5 justify-end">
                                                <div className="rounded-2xl rounded-tr-xs bg-indigo-600 p-3 text-xs text-white shadow-xs max-w-lg">
                                                    <p>{log.prompt}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2.5">
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs">
                                                    <Bot className="w-4 h-4" />
                                                </div>
                                                <div className="rounded-2xl rounded-tl-xs bg-white p-3 text-xs text-slate-800 shadow-xs border border-slate-100 max-w-lg">
                                                    <p>{log.ai_response}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-lg border border-dashed border-slate-200 p-3 text-center text-xs text-slate-500">
                                        Belum ada riwayat percakapan. Sesi chat interaktif siap dihubungkan ke backend Gemini API pada Fase 2.
                                    </div>
                                )}
                            </div>

                            {/* Chat Input Placeholder */}
                            <div className="flex items-center gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Ketik pertanyaan atau tanggapanmu tentang video kebhinekaan..." 
                                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
                                    disabled
                                />
                                <button 
                                    type="button" 
                                    disabled
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white opacity-70 cursor-not-allowed"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Kirim</span>
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 2:
            case 4:
                return (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
                        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/60">
                                    <Video className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-slate-900">
                                        Ruang Tatap Maya: {currentActivity.order_number === 2 ? 'Infer Character Values' : 'Feedback Implementasi'}
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        Pertemuan langsung (in-app WebRTC / Video Conference) bersama guru pengampu kelas.
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                                Siap Terhubung
                            </span>
                        </div>

                        {/* Video Conference Box */}
                        <div className="rounded-2xl bg-slate-900 p-8 text-center text-white space-y-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-8 ring-white/5">
                                <Users className="h-8 w-8 text-indigo-300" />
                            </div>
                            <div className="max-w-md mx-auto">
                                <h5 className="font-semibold text-sm">Ruang Panggilan Belum Dimulai</h5>
                                <p className="text-xs text-slate-400 mt-1">
                                    Guru akan membuka sesi video call sesuai jadwal pembelajaran. Klik tombol di bawah untuk bergabung ke ruang konferensi terintegrasi.
                                </p>
                            </div>
                            <a
                                href={currentActivity.metadata?.room_url || 'https://meet.jit.si/LMS-Kebhinekaan-Global'}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-700 transition"
                            >
                                <Video className="w-4 h-4" />
                                <span>Buka Ruang Video Call</span>
                            </a>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-200/60">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-slate-900">
                                        Observasi Mandiri Lingkungan Nyata
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        Durasi 14 hari pemantauan dan praktik tindakan toleransi di lingkungan sekitar.
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
                                14 Hari Countdown
                            </span>
                        </div>

                        {/* Visual Countdown Box */}
                        <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-violet-500/10 border border-amber-200/60 p-6 text-center space-y-3">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                                Waktu Tersisa Masa Observasi
                            </h5>
                            <div className="flex justify-center items-center gap-3">
                                <div className="rounded-xl bg-white px-4 py-2.5 shadow-xs border border-amber-200 text-center">
                                    <span className="text-2xl font-black text-slate-800">14</span>
                                    <span className="block text-[10px] uppercase font-bold text-slate-400">Hari</span>
                                </div>
                                <span className="text-xl font-bold text-slate-400">:</span>
                                <div className="rounded-xl bg-white px-4 py-2.5 shadow-xs border border-amber-200 text-center">
                                    <span className="text-2xl font-black text-slate-800">00</span>
                                    <span className="block text-[10px] uppercase font-bold text-slate-400">Jam</span>
                                </div>
                                <span className="text-xl font-bold text-slate-400">:</span>
                                <div className="rounded-xl bg-white px-4 py-2.5 shadow-xs border border-amber-200 text-center">
                                    <span className="text-2xl font-black text-slate-800">00</span>
                                    <span className="block text-[10px] uppercase font-bold text-slate-400">Menit</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-600 max-w-md mx-auto pt-1">
                                Catat setiap tindakan kebajikan, kerja sama antar budaya, dan toleransi sosial yang kamu temui setiap harinya.
                            </p>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/60">
                                    <Edit3 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-slate-900">
                                        Editor Penulisan Cerpen Kebhinekaan
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        Tuliskan cerita pendek reflektif dengan auto-save berkala (tiap 15 detik).
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                Minimal 300 Kata
                            </span>
                        </div>

                        {/* Writing Area Preview */}
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Tuliskan judul cerpenmu di sini..."
                                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 font-bold text-base text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                defaultValue={activityData?.submission?.title || ''}
                            />
                            <div className="rounded-xl border border-slate-200 p-4 min-h-[220px] bg-slate-50/50 text-xs text-slate-500">
                                <p className="text-slate-400 italic">
                                    Rich Text Editor (TipTap) akan terintegrasi penuh pada Fase 3 untuk penulisan karya cerpen kebhinekaan...
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-slate-900">
                                        Evaluasi Interaktif & Feedback Guru
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                        Penilaian ganda dari AI (relevansi & tata bahasa) serta catatan rubrik resmi dari guru.
                                    </p>
                                </div>
                            </div>
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                                Modul Terakhir
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-2">
                                <h5 className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                    <span>AI Pre-Feedback (Gemini)</span>
                                </h5>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Hasil evaluasi otomatis analisis gaya bahasa, relevansi nilai kebhinekaan, dan alur cerita siswa.
                                </p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                                <h5 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                                    <Award className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Rubrik & Nilai Guru</span>
                                </h5>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Ulasan personal, masukan pengembangan karakter, dan skor akhir dari guru pengampu.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <CourseLayout 
            course={course} 
            activities={activities} 
            currentActivity={currentActivity}
            progressSummary={progressSummary}
        >
            <Head title={`${currentActivity.title} - ${course?.title || 'EduKarakter'}`} />

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500" aria-label="Breadcrumb">
                <Link href={route('course.show')} className="hover:text-indigo-600 transition">
                    Modul Kebhinekaan
                </Link>
                <span>/</span>
                <span className="text-slate-800 font-semibold truncate max-w-md">
                    {currentActivity.title}
                </span>
            </nav>

            {/* Header Activity Title Card */}
            <div className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Aktivitas {currentActivity.order_number} dari {activities.length}</span>
                    </span>

                    {isCompleted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Telah Diselesaikan</span>
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                            <span>Sedang Berjalan</span>
                        </span>
                    )}
                </div>

                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug">
                    {currentActivity.title}
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {currentActivity.description}
                </p>
            </div>

            {/* Dynamic Activity Work Container */}
            <section id="activity-main-workspace" aria-label="Area Kerja Aktivitas">
                {renderActivityWorkspace()}
            </section>

            {/* Bottom Navigation & Completion Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/80">
                {prevActivity ? (
                    <Link
                        id="btn-prev-activity"
                        href={route('course.activity', { activityNumber: prevActivity.order_number })}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Aktivitas Sebelumnya ({prevActivity.order_number})</span>
                    </Link>
                ) : <div />}

                <div className="flex items-center gap-3">
                    {!isCompleted ? (
                        <button
                            id="btn-complete-activity"
                            type="button"
                            onClick={handleCompleteAndNext}
                            disabled={completing}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-60"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{completing ? 'Menyimpan...' : 'Tandai Selesai & Buka Selanjutnya'}</span>
                        </button>
                    ) : nextActivity ? (
                        <Link
                            id="btn-next-activity"
                            href={route('course.activity', { activityNumber: nextActivity.order_number })}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
                        >
                            <span>Lanjut ke Aktivitas {nextActivity.order_number}</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100/80 px-4 py-2 text-xs font-bold text-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Seluruh Modul Tuntas</span>
                        </span>
                    )}
                </div>
            </div>
        </CourseLayout>
    );
}
