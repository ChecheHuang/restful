<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponseTrait;
class BaseController extends Controller
{
    use ApiResponseTrait;

    public function __construct()
    {
    }
}
