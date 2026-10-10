import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Sparkles, GraduationCap, ShieldCheck } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const fillDemo = (email, password) => {
        setData((prev) => ({
            ...prev,
            email,
            password,
        }));
    };

    return (
        <GuestLayout>
            <Head title="Masuk - LMS Karakter Kebhinekaan Global" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Selamat Datang Kembali
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Masuk ke platform pembelajaran karakter Kebhinekaan Global
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700 border border-emerald-200">
                    {status}
                </div>
            )}

            {flash?.error && (
                <div className="mb-4 rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-700 border border-rose-200">
                    {flash.error}
                </div>
            )}

            {/* Google OAuth SSO Button (FR-AUTH-01) */}
            <div className="mb-6">
                <a
                    href={route('auth.google')}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                    </svg>
                    <span>Masuk dengan Akun Google</span>
                </a>

                <div className="relative mt-6 flex items-center justify-center">
                    <div className="w-full border-t border-gray-200"></div>
                    <span className="absolute bg-white px-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                        atau email & password
                    </span>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="contoh@sekolah.id"
                        required
                    />
                    <InputError message={errors.email} className="mt-1 text-xs" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Kata Sandi" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-indigo-600 hover:text-indigo-800"
                            >
                                Lupa sandi?
                            </Link>
                        )}
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <InputError message={errors.password} className="mt-1 text-xs" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ms-2 text-xs text-gray-600">
                            Ingat saya di perangkat ini
                        </span>
                    </label>
                </div>

                <PrimaryButton
                    className="w-full justify-center rounded-xl py-3 text-sm font-semibold shadow-md shadow-indigo-100 hover:shadow-lg transition-all"
                    disabled={processing}
                >
                    {processing ? 'Memproses...' : 'Masuk ke Platform'}
                </PrimaryButton>
            </form>

            {/* Quick Demo Login Credentials Bar for Development Testing */}
            <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3.5 text-xs text-indigo-950">
                <div className="flex items-center gap-1.5 font-semibold text-indigo-900 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Akun Uji Coba Cepat (Local Demo)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => fillDemo('siswa@sekolah.id', 'password')}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-indigo-200 bg-white py-1.5 px-2 text-left font-medium text-indigo-900 shadow-xs hover:bg-indigo-50 transition"
                    >
                        <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Siswa (Budi)</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => fillDemo('guru@sekolah.id', 'password')}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-indigo-200 bg-white py-1.5 px-2 text-left font-medium text-indigo-900 shadow-xs hover:bg-indigo-50 transition"
                    >
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Guru (Pertiwi)</span>
                    </button>
                </div>
            </div>
        </GuestLayout>
    );
}
