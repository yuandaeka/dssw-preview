<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ChatLog;
use App\Models\Course;
use App\Models\Observation;
use App\Models\StudentProgress;
use App\Models\StorySubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display the main SPADA-style learning interface.
     */
    public function show(Request $request, ?int $activityNumber = null): Response|RedirectResponse
    {
        $user = Auth::user();

        // Ambil kursus utama
        $course = Course::with('teacher')->firstOrFail();

        // Ambil semua aktivitas terurut
        $activities = Activity::where('course_id', $course->id)
            ->orderBy('order_number')
            ->get();

        // Ambil atau buat record progres siswa
        $progressRecords = StudentProgress::where('user_id', $user->id)
            ->get()
            ->keyBy('activity_id');

        // Pastikan setiap aktivitas memiliki entri progres untuk user
        foreach ($activities as $act) {
            if (! isset($progressRecords[$act->id])) {
                $status = $act->order_number === 1 ? 'in_progress' : 'locked';
                $newProgress = StudentProgress::create([
                    'user_id' => $user->id,
                    'activity_id' => $act->id,
                    'status' => $status,
                ]);
                $progressRecords[$act->id] = $newProgress;
            }
        }

        // Susun data aktivitas dengan status progres terkini
        $activityList = $activities->map(function ($activity) use ($progressRecords, $user) {
            $prog = $progressRecords[$activity->id] ?? null;
            $status = $prog ? $prog->status : ($activity->order_number === 1 ? 'in_progress' : 'locked');

            // Guru selalu dapat menginspeksi semua modul
            if ($user->isGuru()) {
                $status = $status === 'locked' ? 'in_progress' : $status;
            }

            return [
                'id' => $activity->id,
                'order_number' => $activity->order_number,
                'title' => $activity->title,
                'description' => $activity->description,
                'status' => $status,
                'completed_at' => $prog?->completed_at?->format('d M Y H:i'),
                'metadata' => $activity->metadata,
            ];
        });

        // Tentukan aktivitas yang sedang aktif dibuka
        $targetNumber = $activityNumber;
        if (! $targetNumber) {
            // Cari aktivitas pertama yang berstatus in_progress, jika tidak ada cari yang completed terakhir
            $activeItem = $activityList->firstWhere('status', 'in_progress')
                ?? $activityList->firstWhere('status', 'completed')
                ?? $activityList->first();
            $targetNumber = $activeItem['order_number'];
        }

        $currentActivity = $activityList->firstWhere('order_number', $targetNumber);

        // Jika siswa mencoba mengakses modul terkunci secara langsung (FR-UI-02 Prerequisite Locking)
        if (! $user->isGuru() && $currentActivity && $currentActivity['status'] === 'locked') {
            // Arahkan ke modul terakhir yang terbuka
            $fallbackActivity = $activityList->firstWhere('status', 'in_progress') ?? $activityList->first();
            return redirect()->route('course.activity', ['activityNumber' => $fallbackActivity['order_number']])
                ->with('warning', 'Aktivitas ' . $targetNumber . ' masih terkunci! Selesaikan aktivitas sebelumnya terlebih dahulu.');
        }

        // Ambil data spesifik aktivitas (chat log, observasi, atau cerpen) jika ada
        $activityData = null;
        if ($currentActivity) {
            if ($currentActivity['order_number'] === 1) {
                $activityData = [
                    'chat_logs' => ChatLog::where('user_id', $user->id)->orderBy('created_at')->get(),
                ];
            } elseif ($currentActivity['order_number'] === 3) {
                $activityData = [
                    'observation' => Observation::where('user_id', $user->id)->latest()->first(),
                ];
            } elseif (in_array($currentActivity['order_number'], [5, 6])) {
                $activityData = [
                    'submission' => StorySubmission::where('user_id', $user->id)->latest()->first(),
                ];
            }
        }

        $completedCount = $activityList->where('status', 'completed')->count();
        $totalCount = $activityList->count();
        $progressPercentage = $totalCount > 0 ? round(($completedCount / $totalCount) * 100) : 0;

        return Inertia::render('Course/Show', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'description' => $course->description,
                'teacher' => $course->teacher ? [
                    'name' => $course->teacher->name,
                    'email' => $course->teacher->email,
                ] : null,
            ],
            'activities' => $activityList,
            'currentActivity' => $currentActivity,
            'activityData' => $activityData,
            'progressSummary' => [
                'completed' => $completedCount,
                'total' => $totalCount,
                'percentage' => $progressPercentage,
            ],
        ]);
    }

    /**
     * Mark an activity as completed and unlock the subsequent activity (FR-UI-02).
     */
    public function completeActivity(Request $request, int $orderNumber)
    {
        $user = Auth::user();

        $activity = Activity::where('order_number', $orderNumber)->firstOrFail();

        $prog = StudentProgress::firstOrCreate(
            ['user_id' => $user->id, 'activity_id' => $activity->id],
            ['status' => 'in_progress']
        );

        $prog->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        // Buka kunci aktivitas berikutnya (order_number + 1)
        $nextActivity = Activity::where('order_number', $orderNumber + 1)->first();
        if ($nextActivity) {
            $nextProg = StudentProgress::firstOrCreate(
                ['user_id' => $user->id, 'activity_id' => $nextActivity->id],
                ['status' => 'locked']
            );

            if ($nextProg->status === 'locked') {
                $nextProg->update(['status' => 'in_progress']);
            }

            return redirect()->route('course.activity', ['activityNumber' => $nextActivity->order_number])
                ->with('success', 'Selamat! Aktivitas ' . $orderNumber . ' selesai. Aktivitas berikutnya kini terbuka.');
        }

        return redirect()->route('course.activity', ['activityNumber' => $orderNumber])
            ->with('success', 'Selamat! Seluruh rangkaian aktivitas modul telah berhasil Anda selesaikan.');
    }
}
