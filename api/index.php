<?php

// 1. Siapkan direktori storage yang writable di /tmp (serverless filesystem)
$tmpStorage = '/tmp/storage';
$subDirs = [
    $tmpStorage . '/framework/views',
    $tmpStorage . '/framework/cache/data',
    $tmpStorage . '/framework/sessions',
    $tmpStorage . '/logs',
    $tmpStorage . '/app/public',
];

foreach ($subDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

// 2. Siapkan database SQLite sementara di /tmp
$sourceDb = __DIR__ . '/../database/database.sqlite';
$targetDb = '/tmp/database.sqlite';

if (!file_exists($targetDb)) {
    if (file_exists($sourceDb)) {
        @copy($sourceDb, $targetDb);
    } else {
        @touch($targetDb);
    }
}

// 3. Konfigurasi environment serverless
putenv('APP_STORAGE=' . $tmpStorage);
putenv('VIEW_COMPILED_PATH=' . $tmpStorage . '/framework/views');
putenv('DB_CONNECTION=sqlite');
putenv('DB_DATABASE=' . $targetDb);
putenv('CACHE_STORE=array');
putenv('SESSION_DRIVER=cookie'); // Menggunakan cookie terenkripsi agar sesi login tidak hilang antar-instance Lambda
putenv('LOG_CHANNEL=stderr');

// Fallback APP_KEY jika belum diset di dashboard Vercel
if (!getenv('APP_KEY')) {
    putenv('APP_KEY=base64:kZFDS6ViWGtYch2qOb4W7Dj5lQx/3edOrWK+/izYqUA=');
}

// 4. Teruskan eksekusi ke public/index.php Laravel
require __DIR__ . '/../public/index.php';
