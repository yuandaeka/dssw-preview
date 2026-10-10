<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Course;
use App\Models\StorySubmission;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherDashboardController extends Controller
{
    /**
     * Display the teacher monitoring matrix and grading overview.
     */
    public function index(Request $request): Response
    {
        $course = Course::with('activities')->first();

        // Ambil daftar siswa beserta relasi progres & karya
        $students = User::where('role', 'siswa')
            ->with(['progress', 'storySubmissions'])
            ->get()
            ->map(function ($student) use ($course) {
                $progressMap = $student->progress->keyBy('activity_id');
                $activitiesProgress = $course ? $course->activities->map(function ($act) use ($progressMap) {
                    $prog = $progressMap[$act->id] ?? null;
                    return [
                        'activity_id' => $act->id,
                        'order_number' => $act->order_number,
                        'status' => $prog ? $prog->status : 'locked',
                        'completed_at' => $prog?->completed_at?->format('d/m H:i'),
                    ];
                }) : collect();

                $completedCount = $activitiesProgress->where('status', 'completed')->count();
                $totalCount = $activitiesProgress->count();
                $percentage = $totalCount > 0 ? round(($completedCount / $totalCount) * 100) : 0;

                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'email' => $student->email,
                    'avatar' => $student->avatar,
                    'activities_progress' => $activitiesProgress,
                    'progress_percentage' => $percentage,
                    'completed_count' => $completedCount,
                    'story_submission' => $student->storySubmissions->sortByDesc('created_at')->first(),
                ];
            });

        $totalStudents = $students->count();
        $averageCompletion = $totalStudents > 0 ? round($students->avg('progress_percentage')) : 0;
        $storiesSubmitted = StorySubmission::whereIn('status', ['submitted', 'graded'])->count();

        return Inertia::render('Teacher/Dashboard', [
            'course' => $course,
            'students' => $students,
            'stats' => [
                'total_students' => $totalStudents,
                'average_completion' => $averageCompletion,
                'stories_submitted' => $storiesSubmitted,
            ],
        ]);
    }
}
