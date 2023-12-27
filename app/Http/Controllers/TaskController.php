<?php

namespace App\Http\Controllers;


use App\Models\Task;
use App\Models\DeletedTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    public function index(){
        return Task::query()->orderBy('id', 'asc')->paginate(10);

    }
    public function store(CreateTaskRequest $request){
        $task = Task::create([
            'title'=>$request->title,
            'body'=>$request->body,
            'deadline'=>$request->deadline,
            'assigne_to'=>$request->assigne_to,
            'note'=>$request->note,
        ]);
        return $task;
    }
    public function show(Task $task){
        return $task;
    }
    public function update(UpdateTaskRequest $request, Task $task){
        $task->update([
            'title'=>$request->title,
            'body'=>$request->body,
            'deadline'=>$request->deadline,
            'done'=>$request->done,
            'assigne_to'=>$request->assigne_to,
            'note'=>$request->note,
        ]);
    }
    public function destroy(Task $task){
    $deletedTask = new DeletedTask();
    $deletedTask->title = $task->title;
    $deletedTask->body = $task->body;
    $deletedTask->deadline = $task->deadline;
    $deletedTask->done = $task->done;
    $deletedTask->assigne_to = $task->assigne_to;
    $deletedTask->save();
    $task->delete();
    return ['message' => 'Your task has been removed.'];
    }
    public function getMyTasks()
    {
        $user = Auth::user();
        $tasks = Task::where('assigne_to', $user->name)->get();
        return $tasks;
    }
    public function tasksDone()
    {
        return Task::query()->orderBy('done', 'desc')->paginate(10);
    }public function tasksunDone()
    {
        return Task::query()->orderBy('done', 'asc')->paginate(10);
    }
}
