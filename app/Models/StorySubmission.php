<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StorySubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'activity_id',
        'title',
        'content',
        'ai_feedback',
        'teacher_feedback',
        'score',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
