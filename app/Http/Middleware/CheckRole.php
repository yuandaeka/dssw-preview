<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $role
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (! $request->user()) {
            return redirect()->route('login');
        }

        if ($request->user()->role !== $role) {
            // Jika siswa mencoba akses area guru
            if ($role === 'guru' && $request->user()->isSiswa()) {
                return redirect()->route('course.show')->with('warning', 'Akses dibatasi. Anda dialihkan ke halaman modul pembelajaran siswa.');
            }

            // Jika guru mengakses area yang strictly untuk siswa (bisa diizinkan atau dialihkan)
            abort(403, 'Anda tidak memiliki hak akses untuk halaman ini.');
        }

        return $next($request);
    }
}
