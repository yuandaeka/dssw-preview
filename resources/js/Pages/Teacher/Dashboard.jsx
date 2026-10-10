import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Users, 
    BookOpen, 
    CheckCircle2, 
    Clock, 
    Lock, 
    Award, 
    FileText, 
    ChevronRight,
    GraduationCap,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';

export default function Dashboard({ course, students = [], stats }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                                <span>Panel Guru & Evaluator</span>
                            </span>
                        </div>
                        <h2 className="text-xl font-bold leading-tight text-slate-900">
                            Monitoring Progres & Penilaian Kelas
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route('course.show')}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span>Buka Modul Pembelajaran</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard Guru - LMS Karakter Kebhinekaan" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/60">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500">Total Siswa Terdaftar</p>
                                <p className="text-2xl font-bold text-slate-900">{stats?.total_students || 0}</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500">Rata-rata Penyelesaian Kelas</p>
                                <p className="text-2xl font-bold text-slate-900">{stats?.average_completion || 0}%</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-200/60">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-slate-500">Cerpen Dikumpulkan</p>
                                <p className="text-2xl font-bold text-slate-900">{stats?.stories_submitted || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* Student Progress Monitoring Matrix */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
                        <div className="border-b border-slate-100 p-5 sm:px-6 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    Matriks Progres Aktivitas Siswa (1–6)
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Pemantauan status penguncian dan penyelesaian setiap aktivitas per siswa.
                                </p>
                            </div>

                            <span className="text-xs font-semibold text-slate-500">
                                Kursus: <span className="text-indigo-600 font-bold">{course?.title}</span>
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50/75 border-b border-slate-100 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                                    <tr>
                                        <th className="px-6 py-3.5">Siswa</th>
                                        <th className="px-3 py-3.5 text-center">Act 1 (Animasi)</th>
                                        <th className="px-3 py-3.5 text-center">Act 2 (Vidcall 1)</th>
                                        <th className="px-3 py-3.5 text-center">Act 3 (Observasi)</th>
                                        <th className="px-3 py-3.5 text-center">Act 4 (Vidcall 2)</th>
                                        <th className="px-3 py-3.5 text-center">Act 5 (Cerpen)</th>
                                        <th className="px-3 py-3.5 text-center">Act 6 (Evaluasi)</th>
                                        <th className="px-6 py-3.5 text-right">Progres Keseluruhan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {students.length > 0 ? (
                                        students.map((student) => (
                                            <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs ring-1 ring-indigo-200">
                                                            {student.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900">{student.name}</p>
                                                            <p className="text-[11px] text-slate-500">{student.email}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Status per 6 activities */}
                                                {[1, 2, 3, 4, 5, 6].map((num) => {
                                                    const prog = student.activities_progress.find(
                                                        (p) => p.order_number === num
                                                    );
                                                    const status = prog?.status || 'locked';

                                                    return (
                                                        <td key={num} className="px-3 py-4 text-center">
                                                            {status === 'completed' ? (
                                                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-2 ring-emerald-50" title="Selesai">
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                </span>
                                                            ) : status === 'in_progress' ? (
                                                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 ring-2 ring-indigo-50" title="Sedang Berjalan">
                                                                    <Clock className="w-3.5 h-3.5 animate-spin" />
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400" title="Terkunci">
                                                                    <Lock className="w-3.5 h-3.5" />
                                                                </span>
                                                            )}
                                                        </td>
                                                    );
                                                })}

                                                {/* Progress bar percentage */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                            <div 
                                                                className="bg-emerald-500 h-2 rounded-full"
                                                                style={{ width: `${student.progress_percentage}%` }}
                                                            />
                                                        </div>
                                                        <span className="font-bold text-slate-800 text-xs w-9 text-right">
                                                            {student.progress_percentage}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                                                Belum ada data siswa terdaftar.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
