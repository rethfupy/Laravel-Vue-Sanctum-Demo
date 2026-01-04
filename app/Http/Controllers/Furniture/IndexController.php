<?php

namespace App\Http\Controllers\Furniture;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Furniture;
use App\Http\Resources\Furniture\FurnitureResource;

class IndexController extends Controller
{
    public function __invoke()
    {
        $furniture = Furniture::all();
        return FurnitureResource::collection($furniture);
    }    
}
