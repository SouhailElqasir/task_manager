<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'body' => 'required',
            'deadline' => 'required',
            'assigne_to'=>'required',
            'done'=>'required',
        ];
    }
    public function messages(){
        return[
            'deadline.required'=> 'deadline field required',
        ];
    }
}
