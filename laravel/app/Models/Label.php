<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CusProfileLabel;
class Label extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'labels';

    protected $fillable = [
        'label_name',
    ];
    public function cusProfileLabels()
    {
        return $this->hasMany(CusProfileLabel::class, 'label_id', 'id');
    }
}