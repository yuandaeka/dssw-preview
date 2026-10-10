<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\Course;
use App\Models\StudentProgress;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CourseLearningTest extends TestCase
{
    use RefreshDatabase;

    protected User $guru;
    protected User $siswa;
    protected Course $course;

    protected function setUp(): void
    {
        parent::setUp();

        $this->guru = User::factory()->create([
            'name' => 'Guru Pengampu',
            'email' => 'guru@sekolah.id',
            'role' => 'guru',
        ]);

        $this->siswa = User::factory()->create([
            'name' => 'Siswa Pengguna',
            'email' => 'siswa@sekolah.id',
            'role' => 'siswa',
        ]);

        $this->course = Course::create([
            'title' => 'Penguatan Karakter Kebhinekaan Global',
            'description' => 'Deskripsi kursus kebhinekaan.',
            'teacher_id' => $this->guru->id,
        ]);

        for ($i = 1; $i <= 6; $i++) {
            Activity::create([
                'course_id' => $this->course->id,
                'order_number' => $i,
                'title' => "Aktivitas {$i}: Modul Penguatan",
                'description' => "Penjelasan aktivitas {$i}.",
                'metadata' => ['type' => 'test'],
            ]);
        }
    }

    public function test_student_can_view_course_learning_page(): void
    {
        $response = $this->actingAs($this->siswa)->get(route('course.show'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Course/Show')
            ->has('course')
            ->has('activities', 6)
            ->where('currentActivity.order_number', 1)
        );
    }

    public function test_student_cannot_access_locked_activity_directly(): void
    {
        // Pastikan aktivitas 2 terkunci untuk siswa
        $act2 = Activity::where('order_number', 2)->first();
        StudentProgress::create([
            'user_id' => $this->siswa->id,
            'activity_id' => $act2->id,
            'status' => 'locked',
        ]);

        $response = $this->actingAs($this->siswa)->get(route('course.activity', ['activityNumber' => 2]));

        $response->assertRedirect(route('course.activity', ['activityNumber' => 1]));
        $response->assertSessionHas('warning');
    }

    public function test_completing_activity_unlocks_the_next_activity(): void
    {
        $response = $this->actingAs($this->siswa)->post(route('course.complete', ['activityNumber' => 1]));

        $response->assertRedirect(route('course.activity', ['activityNumber' => 2]));
        $response->assertSessionHas('success');

        // Pastikan status aktivitas 1 menjadi completed dan aktivitas 2 in_progress
        $act1 = Activity::where('order_number', 1)->first();
        $act2 = Activity::where('order_number', 2)->first();

        $this->assertDatabaseHas('student_progress', [
            'user_id' => $this->siswa->id,
            'activity_id' => $act1->id,
            'status' => 'completed',
        ]);

        $this->assertDatabaseHas('student_progress', [
            'user_id' => $this->siswa->id,
            'activity_id' => $act2->id,
            'status' => 'in_progress',
        ]);
    }

    public function test_teacher_can_access_teacher_dashboard(): void
    {
        $response = $this->actingAs($this->guru)->get(route('teacher.dashboard'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Teacher/Dashboard')
            ->has('students')
            ->has('stats')
        );
    }

    public function test_student_is_blocked_from_teacher_dashboard_by_middleware(): void
    {
        $response = $this->actingAs($this->siswa)->get(route('teacher.dashboard'));

        $response->assertRedirect(route('course.show'));
        $response->assertSessionHas('warning');
    }
}
