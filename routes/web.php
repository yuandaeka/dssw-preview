<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeacherDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing Page
Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();
        return $user->isGuru()
            ? redirect()->route('teacher.dashboard')
            : redirect()->route('course.show');
    }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Central Dashboard Redirector based on User Role
Route::get('/dashboard', function (Request $request) {
    $user = $request->user();
    if ($user->isGuru()) {
        return redirect()->route('teacher.dashboard');
    }
    return redirect()->route('course.show');
})->middleware(['auth', 'verified'])->name('dashboard');

// Instant Demo Login (Local Development Testing)
Route::get('/demo-login/{role}', function (string $role) {
    $email = $role === 'guru' ? 'guru@sekolah.id' : 'siswa@sekolah.id';
    $user = \App\Models\User::where('email', $email)->first();

    if (! $user) {
        $user = \App\Models\User::create([
            'name' => $role === 'guru' ? 'Ibu Guru Pertiwi, M.Pd.' : 'Budi Santoso',
            'email' => $email,
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => $role,
        ]);
    }

    Auth::login($user, remember: true);
    request()->session()->regenerate();

    return redirect()->route('dashboard');
})->name('login.demo');

// Protected Routes (Semua Pengguna Terautentikasi)
Route::middleware('auth')->group(function () {
    // Profil Pengguna
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Modul Pembelajaran Dua Panel (SPADA-Style Layout)
    Route::get('/course', [CourseController::class, 'show'])->name('course.show');
    Route::get('/course/activity/{activityNumber}', [CourseController::class, 'show'])->name('course.activity');
    Route::post('/course/activity/{activityNumber}/complete', [CourseController::class, 'completeActivity'])->name('course.complete');
});

// Panel Guru (Khusus Role: Guru via CheckRole Middleware)
Route::middleware(['auth', 'role:guru'])->prefix('teacher')->name('teacher.')->group(function () {
    Route::get('/dashboard', [TeacherDashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/auth.php';
