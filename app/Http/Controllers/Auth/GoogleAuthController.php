<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\StudentProgress;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirect(): RedirectResponse
    {
        try {
            return Socialite::driver('google')->redirect();
        } catch (Exception $e) {
            Log::error('Google OAuth Redirect Error: ' . $e->getMessage());
            return redirect()->route('login')->with('error', 'Konfigurasi Google OAuth belum lengkap atau terjadi kendala koneksi.');
        }
    }

    /**
     * Obtain the user information from Google.
     */
    public function callback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Cari user berdasarkan google_id atau email
            $user = User::where('google_id', $googleUser->getId())
                ->orWhere('email', $googleUser->getEmail())
                ->first();

            if ($user) {
                // Perbarui google_id dan avatar jika belum ada
                $user->update([
                    'google_id' => $user->google_id ?: $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar() ?: $user->avatar,
                ]);
            } else {
                // Pengguna baru otomatis mendapat peran 'siswa' (FR-AUTH-02)
                $user = User::create([
                    'name' => $googleUser->getName() ?: 'Siswa Kebhinekaan',
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'role' => 'siswa',
                    'password' => null,
                ]);

                // Inisialisasi alur aktivitas untuk siswa baru
                $activities = Activity::orderBy('order_number')->get();
                foreach ($activities as $activity) {
                    StudentProgress::create([
                        'user_id' => $user->id,
                        'activity_id' => $activity->id,
                        'status' => $activity->order_number === 1 ? 'in_progress' : 'locked',
                    ]);
                }
            }

            Auth::login($user, remember: true);
            request()->session()->regenerate();

            if ($user->isGuru()) {
                return redirect()->intended(route('teacher.dashboard'));
            }

            return redirect()->intended(route('course.show'));
        } catch (Exception $e) {
            Log::error('Google OAuth Callback Error: ' . $e->getMessage());
            return redirect()->route('login')->with('error', 'Gagal masuk menggunakan Google. Silakan coba kembali.');
        }
    }
}
