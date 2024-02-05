<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class CusProfile extends Model
{
    protected $table = 'cus_profile';
    public $timestamps = false;

    protected $fillable = [
        'create_user_id',
        'cus_name',
        'cus_number',
        'cus_email',
        'cus_idNumber',
        'cus_birthday',
        'cus_remark',
        'cus_status',
        'cus_level',
        'cus_edit_user_id',
        'edit_user_id',
    ];
    protected static $tableColumns = [
        'create_user_id',
        'cus_name',
        'cus_number',
        'cus_email',
        'cus_idNumber',
        'cus_birthday',
        'cus_remark',
        'cus_status',
        'cus_level',
        'cus_edit_user_id',
        'edit_user_id',
    ];

    use HasFactory;
    public function labels()
    {
        return $this->hasMany('App\Models\CusProfileLabel', 'cus_id', 'id');
    }

    /**
     * 1. 遠程資料庫
     * 2. 中間關聯料庫
     * 3. 中間關聯資料庫對應自己資料庫
     * 4. 遠程資料庫對應中間資料庫
     * 5. 自己資料庫對應中間資料庫
     * 6. 中間資料庫連接遠程資料庫
     */
    public function labelValues()
    {
        return $this->hasManyThrough(
            'App\Models\Label',
            'App\Models\CusProfileLabel',
            'cus_id',
            'id',
            'id',
            'label_id'
        );
    }
    public static function list($param)
    {

        $betweenTime = ["2023-07-13 ", "2023-10-13 "];
        $start = $betweenTime[0];
        $end = $betweenTime[1];

        $query = static::query();

        // echo '在model裡面';
        $filtered = array_filter($param, function ($key) {
            return $key !== 'page' && $key !== 'size';
        });

        foreach ($filtered as $key => $value) {
            if (array_key_exists($key, array_flip(static::$tableColumns))) {
                $query->where($key, 'like', "%$value%");
            }
        }
        $query->when(!empty($param['label_name']), function ($query) use ($param) {
            // 當 $param['label_name'] 不為空時，執行回調函式
            $query->whereHas('labelValues', function ($query) use ($param) {
                // 在關聯關係 labelValues 上執行查詢
                $query->where('labels.label_name', 'like', "%{$param['label_name']}%");
                // 在 labelValues 關聯關係中查詢 label_name 屬性是否包含 $param['label_name']
            });
        });
        return $query;
    }
    public function getCusAgeAttribute()
    {
        return Carbon::parse($this->attributes['cus_birthday'])->age;
    }
}
