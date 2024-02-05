<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use  PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use HasFactory;
    public $timestamps = false;
    protected $table = 'users';

    protected $fillable = [
        'user_name',
        'user_password',
        'user_email',
        'user_avatar',
    ];
    public  function  getJWTIdentifier()
    {
        return  $this->getKey();
    }

    public  function  getJWTCustomClaims()
    {
        return [];
    }
    //預設會抓password，但表格不是所以需要另外設定password抓取欄位
    public function getAuthPassword()
    {
        return $this->user_password;
    }
}
