<?php

namespace App\Http\Controllers;

use App\Models\DeletedTask;
use Illuminate\Http\Request;

class DeletedTaskController extends Controller
{
    /**
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $deletedTasks = DeletedTask::all();
        return DeletedTask::query()->orderBy('id', 'desc')->paginate(10);
    }
}
