<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CusProfileLabel;
use App\Http\Controllers\BaseController;

class CusProfileLabelController extends BaseController
{
    //
    public function __invoke()
    {
        // $test = CusProfileLabel::find(5)
        //     ->cus()
        //     ->get();
        $test = CusProfileLabel::with(['cus', 'label'])->find(5);
        // $test = CusProfileLabel::with(['cus', 'label']);


        return $this->webSuccess($test);
    }
}
