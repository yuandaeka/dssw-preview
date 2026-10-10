import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ActivitySidebarItem from '@/Components/ActivitySidebarItem';
import Dropdown from '@/Components/Dropdown';
import { 
    Menu, 
    X, 
    BookOpen, 
    Compass, 
    CheckCircle2, 
    ShieldCheck, 
    GraduationCap, 
    LogOut, 
    User as UserIcon,
    AlertCircle,
    Info,
    Sparkles
} from 'lucide-react';

export default function CourseLayout({ 
    course, 
    activities = [], 
    currentActivity, 
    progressSummary = { completed: 0, total: 6, percentage: 0 },
    children 
}) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
                <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Brand Logo & Mobile Trigger */}
                    <div className="flex items-center gap-3">
                        <button
                            id="mobile-sidebar-toggle"
                            type="button"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none lg:hidden"
                            aria-label="Buka menu navigasi aktivitas"
                        >
                            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>

                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-600 text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                                <Compass className="h-5 w-5" />
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                                    EduKarakter <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[11px] font-semibold text-indigo-700">LMS</span>
                                </span>
                                <span className="block text-[11px] font-medium text-slate-500">
                                    Penguatan Kebhinekaan Global
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Center Course Progress Bar (Desktop) */}
                    <div className="hidden md:flex items-center gap-4 max-w-md w-full px-4">
                        <div className="w-full">
                            <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-600">
                                <span className="truncate max-w-[200px]">{course?.title || 'Modul Pembelajaran'}</span>
                                <span className="text-indigo-600 font-bold">{progressSummary.percentage}% Selesai</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-200/60">
                                <div 
                                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 ease-out"
                                    style={{ width: `${progressSummary.percentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right User Profile Dropdown & Role Badge */}
                    <div className="flex items-center gap-3">
                        {/* Role Indicator Badge */}
                        {user?.role === 'guru' ? (
                            <Link
                                href={route('teacher.dashboard')}
                                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200/80 hover:bg-amber-100 transition"
                            >
                                <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                                <span>Mode Guru</span>
                            </Link>
                        ) : (
                            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100">
                                <GraduationCap className="h-3.5 w-3.5 text-indigo-600" />
                                <span>Siswa</span>
                            </span>
                        )}

                        {/* Profile Dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100 transition-colors focus:outline-none">
                                    {user?.avatar ? (
                                        <img 
                                            src={user.avatar} 
                                            alt={user.name} 
                                            className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/20" 
                                        />
                                    ) : (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs">
                                            {user?.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                    <div className="hidden lg:block text-left text-xs">
                                        <p className="font-semibold text-slate-800 leading-tight max-w-[120px] truncate">{user?.name}</p>
                                        <p className="text-[11px] text-slate-500 capitalize">{user?.role || 'Siswa'}</p>
                                    </div>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content width="48" align="right">
                                <div className="px-4 py-2 text-xs border-b border-slate-100">
                                    <p className="font-semibold text-slate-900">{user?.name}</p>
                                    <p className="text-slate-500 truncate">{user?.email}</p>
                                </div>

                                {user?.role === 'guru' && (
                                    <Dropdown.Link href={route('teacher.dashboard')}>
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-amber-600" />
                                            <span>Dashboard Monitoring Guru</span>
                                        </div>
                                    </Dropdown.Link>
                                )}

                                <Dropdown.Link href={route('course.show')}>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-indigo-600" />
                                        <span>Modul Pembelajaran</span>
                                    </div>
                                </Dropdown.Link>

                                <Dropdown.Link href={route('profile.edit')}>
                                    <div className="flex items-center gap-2">
                                        <UserIcon className="w-4 h-4 text-slate-500" />
                                        <span>Pengaturan Profil</span>
                                    </div>
                                </Dropdown.Link>

                                <div className="border-t border-slate-100">
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        <div className="flex items-center gap-2 text-rose-600">
                                            <LogOut className="w-4 h-4" />
                                            <span>Keluar</span>
                                        </div>
                                    </Dropdown.Link>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </header>

            {/* Main Learning Split Screen (Two-Panel) Container */}
            <div className="flex-1 flex w-full relative">
                {/* Backdrop for Mobile Sidebar Drawer */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}

                {/* Left Panel: Sidebar Aktivitas (SPADA-Style) */}
                <aside 
                    id="learning-activities-sidebar"
                    className={`fixed inset-y-0 left-0 z-50 w-80 sm:w-88 bg-white border-r border-slate-200/80 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-10 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="space-y-4">
                        {/* Course Overview Card */}
                        <div className="rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-4 text-white shadow-lg shadow-indigo-950/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                                    <Sparkles className="w-3 h-3 text-amber-300" /> Modul Kebhinekaan
                                </span>
                                <span className="text-xs font-bold text-emerald-400">
                                    {progressSummary.completed}/{progressSummary.total} Selesai
                                </span>
                            </div>

                            <h3 className="text-sm font-bold leading-snug line-clamp-2">
                                {course?.title || 'Penguatan Karakter Kebhinekaan Global'}
                            </h3>

                            {course?.teacher && (
                                <p className="mt-1 text-xs text-indigo-200/90 flex items-center gap-1">
                                    <span>Guru Pengampu:</span>
                                    <span className="font-semibold text-white">{course.teacher.name}</span>
                                </p>
                            )}

                            {/* Small Progress Bar */}
                            <div className="mt-3">
                                <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                                    <div 
                                        className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                                        style={{ width: `${progressSummary.percentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Activities Navigation Header */}
                        <div className="flex items-center justify-between px-1 pt-1">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Runtutan Aktivitas (1–6)
                            </h2>
                            <span className="text-[11px] text-slate-400 font-medium">
                                Prerequisite System
                            </span>
                        </div>

                        {/* List of Activities 1–6 */}
                        <nav className="space-y-2" aria-label="Aktivitas Pembelajaran">
                            {activities.map((act) => (
                                <ActivitySidebarItem
                                    key={act.id}
                                    activity={act}
                                    isActive={currentActivity?.order_number === act.order_number}
                                    isLocked={act.status === 'locked'}
                                    onClick={() => setSidebarOpen(false)}
                                />
                            ))}
                        </nav>
                    </div>

                    {/* Bottom Prerequisite Locking Policy Notice */}
                    <div className="mt-6 pt-4 border-t border-slate-100">
                        <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-3 text-xs text-slate-600">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-800 mb-1">
                                <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                <span>Aturan Pembelajaran</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-500">
                                Modul dikunci berurutan. Setiap aktivitas harus diselesaikan terlebih dahulu sebelum dapat mengakses aktivitas selanjutnya.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Right Panel: Dynamic Working Area Container */}
                <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {/* Flash Messages Banner */}
                        {flash?.success && (
                            <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 shadow-xs animate-in fade-in duration-300">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="flex-1 text-sm font-medium leading-relaxed">
                                    {flash.success}
                                </div>
                            </div>
                        )}

                        {flash?.warning && (
                            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-amber-800 shadow-xs animate-in fade-in duration-300">
                                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="flex-1 text-sm font-medium leading-relaxed">
                                    {flash.warning}
                                </div>
                            </div>
                        )}

                        {flash?.error && (
                            <div className="flex items-start gap-3 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-rose-800 shadow-xs animate-in fade-in duration-300">
                                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                                <div className="flex-1 text-sm font-medium leading-relaxed">
                                    {flash.error}
                                </div>
                            </div>
                        )}

                        {/* Page Child Content */}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
