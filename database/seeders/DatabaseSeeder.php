<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Course;
use App\Models\StudentProgress;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Akun Guru Pengampu
        $guru = User::firstOrCreate(
            ['email' => 'guru@sekolah.id'],
            [
                'name' => 'Ibu Guru Pertiwi, M.Pd.',
                'password' => Hash::make('password'),
                'role' => 'guru',
            ]
        );

        // 2. Akun Siswa Teladan
        $siswa = User::firstOrCreate(
            ['email' => 'siswa@sekolah.id'],
            [
                'name' => 'Budi Santoso',
                'password' => Hash::make('password'),
                'role' => 'siswa',
            ]
        );

        // 3. Kursus Modul Kebhinekaan Global
        $course = Course::firstOrCreate(
            ['title' => 'Penguatan Karakter Kebhinekaan Global'],
            [
                'description' => 'Program pembelajaran interaktif 6 aktivitas untuk membangun kesadaran toleransi, keterbukaan budaya, dan aksi sosial berbasis kebinekaan.',
                'teacher_id' => $guru->id,
            ]
        );

        // 4. Inisialisasi 6 Rangkaian Aktivitas (PRD.md)
        $activitiesData = [
            [
                'order_number' => 1,
                'title' => 'Aktivitas 1: Video Animasi & Chatbot AI',
                'description' => 'Simak video animasi reflektif mengenai kebhinekaan global dan diskusikan pemahamanmu bersama asisten AI tutor.',
                'metadata' => [
                    'type' => 'video_chat',
                    'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                    'ai_agent_name' => 'Tutor Bhineka',
                ],
            ],
            [
                'order_number' => 2,
                'title' => 'Aktivitas 2: Video Call - Infer Character Values',
                'description' => 'Sesi temu tatap maya interaktif bersama guru pengampu untuk mengidentifikasi dan merefleksikan nilai-nilai kebhinekaan.',
                'metadata' => [
                    'type' => 'video_call',
                    'room_url' => 'https://meet.jit.si/LMS-Kebhinekaan-Global-Class-1',
                ],
            ],
            [
                'order_number' => 3,
                'title' => 'Aktivitas 3: Observasi Mandiri Lingkungan (14 Hari)',
                'description' => 'Masa observasi 14 hari untuk mengamati, mencatat dalam daily log, dan mempraktikkan toleransi dalam kehidupan nyata.',
                'metadata' => [
                    'type' => 'observation',
                    'duration_days' => 14,
                ],
            ],
            [
                'order_number' => 4,
                'title' => 'Aktivitas 4: Video Call - Feedback Implementasi',
                'description' => 'Sesi video call lanjutan untuk mempresentasikan hasil temuan observasi serta berdiskusi hangat bersama guru.',
                'metadata' => [
                    'type' => 'video_call',
                    'room_url' => 'https://meet.jit.si/LMS-Kebhinekaan-Feedback-Class-1',
                ],
            ],
            [
                'order_number' => 5,
                'title' => 'Aktivitas 5: Penulisan Cerita Pendek Kebhinekaan',
                'description' => 'Tuliskan karya cerpen inspiratif bertema persatuan dalam keberagaman menggunakan text editor dengan fitur auto-save.',
                'metadata' => [
                    'type' => 'story_writing',
                    'min_words' => 300,
                ],
            ],
            [
                'order_number' => 6,
                'title' => 'Aktivitas 6: Evaluasi Interaktif & Feedback Guru',
                'description' => 'Tinjau analisis cerpen otomatis dari AI (pre-feedback) dan evaluasi komprehensif serta nilai akhir dari guru.',
                'metadata' => [
                    'type' => 'story_feedback',
                ],
            ],
        ];

        foreach ($activitiesData as $act) {
            $activity = Activity::updateOrCreate(
                [
                    'course_id' => $course->id,
                    'order_number' => $act['order_number'],
                ],
                [
                    'title' => $act['title'],
                    'description' => $act['description'],
                    'metadata' => $act['metadata'],
                ]
            );

            // Progress default untuk siswa
            StudentProgress::updateOrCreate(
                [
                    'user_id' => $siswa->id,
                    'activity_id' => $activity->id,
                ],
                [
                    'status' => $act['order_number'] === 1 ? 'in_progress' : 'locked',
                ]
            );
        }
    }
}
