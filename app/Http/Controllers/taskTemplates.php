<?php

namespace App\Http\Controllers;
use App\Models\DeletedTask;
use Illuminate\Http\Request;
use App\Models\taskTemplate;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateTemplateRequest;
use App\Http\Requests\UpdateTemplateRequest;

class taskTemplates extends Controller
{
    public function index(){
        return TaskTemplate::query()->orderBy('id', 'desc')->paginate(10);

    }
    public function store(CreateTemplateRequest $request){
        $template = TaskTemplate::create([
            'title'=>$request->title,
            'body'=>$request->body,
            'note'=>$request->note,

        ]);
        return $template;
    }
    public function show(TaskTemplate $template){
        return $template;
    }
    public function update(UpdateTemplateRequest $request, TaskTemplate $template){
        $template->update([
            'title'=>$request->title,
            'body'=>$request->body,
            'note'=>$request->note,

        ]);
    }
    public function destroy(TaskTemplate $template)
    {
        $template->delete();

        return response("", 204);
    }


}
