import { Link } from '@inertiajs/react';
import { 
    CheckCircle2, 
    Lock, 
    PlayCircle, 
    Video, 
    Clock, 
    FileText, 
    Award,
    Sparkles,
    ChevronRight
} from 'lucide-react';

export default function ActivitySidebarItem({ 
    activity, 
    isActive = false, 
    isLocked = false,
    onClick 
}) {
    // Tentukan icon berdasarkan order_number
    const getActivityIcon = (num) => {
        switch (num) {
            case 1:
                return PlayCircle;
            case 2:
                return Video;
            case 3:
                return Clock;
            case 4:
                return Video;
            case 5:
                return FileText;
            case 6:
                return Award;
            default:
                return Sparkles;
        }
    };

    const Icon = getActivityIcon(activity.order_number);
    const isCompleted = activity.status === 'completed';
    const isInProgress = activity.status === 'in_progress';

    // Status badge rendering
    const renderStatusBadge = () => {
        if (isCompleted) {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Selesai</span>
                </span>
            );
        }

        if (isInProgress) {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100/90 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                    <span>Aktif</span>
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                <Lock className="w-2.5 h-2.5 text-gray-400" />
                <span>Terkunci</span>
            </span>
        );
    };

    const itemContent = (
        <div
            id={`activity-nav-${activity.order_number}`}
            className={`group relative flex items-start gap-3 rounded-2xl p-3.5 transition-all duration-200 ${
                isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 ring-2 ring-indigo-600/30 font-medium'
                    : isLocked
                    ? 'bg-gray-50/70 text-gray-400 border border-transparent cursor-not-allowed opacity-80'
                    : 'bg-white text-gray-700 hover:bg-indigo-50/60 hover:text-indigo-900 border border-gray-100 shadow-xs'
            }`}
        >
            {/* Number & Icon badge */}
            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isActive
                        ? 'bg-white/20 text-white'
                        : isCompleted
                        ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200'
                        : isInProgress
                        ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200'
                        : 'bg-gray-100 text-gray-400'
                }`}
            >
                {isLocked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                ) : (
                    <Icon className="w-5 h-5" />
                )}
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                            isActive ? 'text-indigo-200' : 'text-gray-400'
                        }`}
                    >
                        Aktivitas {activity.order_number}
                    </span>
                    {!isActive && renderStatusBadge()}
                    {isActive && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold text-white">
                            Sedang Dibuka
                        </span>
                    )}
                </div>

                <h4
                    className={`text-sm font-semibold leading-snug line-clamp-2 ${
                        isActive ? 'text-white' : isLocked ? 'text-gray-400' : 'text-gray-900'
                    }`}
                >
                    {activity.title.replace(/^Aktivitas\s*\d+:\s*/i, '')}
                </h4>

                {activity.completed_at && !isActive && (
                    <p className="mt-1 text-[11px] text-gray-400">
                        Diselesaikan {activity.completed_at}
                    </p>
                )}
            </div>

            {/* Right chevron indicator */}
            {!isLocked && (
                <div className="self-center">
                    <ChevronRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                            isActive ? 'text-white/70' : 'text-gray-300'
                        }`}
                    />
                </div>
            )}
        </div>
    );

    if (isLocked) {
        return (
            <div className="relative group/tooltip">
                {itemContent}
                <div className="pointer-events-none absolute -bottom-8 left-4 z-50 hidden rounded-md bg-gray-900 px-2.5 py-1 text-[11px] text-white shadow-md group-hover/tooltip:block whitespace-nowrap">
                    Selesaikan aktivitas sebelumnya untuk membuka modul ini
                </div>
            </div>
        );
    }

    return (
        <Link
            href={route('course.activity', { activityNumber: activity.order_number })}
            onClick={onClick}
            className="block focus:outline-hidden"
        >
            {itemContent}
        </Link>
    );
}
