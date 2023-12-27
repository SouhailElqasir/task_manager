<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DeletedTask extends Model
{
    use HasFactory;
    protected $fillable = ['title','body','done','deadline','assigne_to'];
    protected $table = 'deleted_tasks';
    public function getCreatedAtAttribute($value){
        return Carbon::parse($value)->diffForHumans();
    }
}

