<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::where('user_id', $request->user()->id)->get();

        return Inertia::render('Dashboard', [
            'tasks' => $tasks
        ]);
    }

    public function create(Request $request)
    {
        try
        {

            $validator = Validator::make($request->all(),
                [
                    'title' => 'required|string|min:3|max:255',
                    'description' => 'required|string|min:5|max:255',
                    'status' => 'required|string',
                    'due_date' => 'date|nullable',
                ],
                [
                    'title.required' => 'Title is required',
                    'title.min' => 'Title must be at least 3 characters',
                    'title.max' => 'Title must be at most 255 characters',
                    'description.required' => 'Description is required',
                    'description.min' => 'Description must be at least 5 characters',
                    'description.max' => 'Description must be at most 255 characters',
                    'status.required' => 'Status is required',
                    'due_date.date' => 'Due date must be a valid date'
                ]);

            if ($validator->fails()) {
                return redirect()->back()->with([
                    'statusCode' => 422,
                    'statusMessage' => $validator->errors()
                ]);
            }

            $task = Task::create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => $request->status,
                'updated_at' => now(),
                'due_date' => $request->due_date,
                'user_id' => $request->user()->id
            ]);

            if (!$task->id)
            {
                return redirect()->back()->with([
                    'statusCode' => 422,
                    'statusMessage' => 'Cannot create task'
                ]);
            }

            return redirect()->route('dashboard')->with([
                'statusCode' => 200,
                'statusMessage' => 'Task created successfully'
            ]);
        }
        catch (\Exception $error)
        {

            Log::error($error->getMessage());
            return redirect()->back()->with([
                'statusCode' => 500,
                'statusMessage' => 'Something went wrong'
            ]);
        }
    }

    public function update(Request $request)
    {
        try
        {
            $validator = Validator::make($request->all(),
                [
                    'title' => 'required|string|min:3|max:255',
                    'description' => 'max:255',
                    'status' => 'required|string',
                    'due_date' => 'date|nullable',
                ],
                [
                    'title.required' => 'Title is required',
                    'title.min' => 'Title must be at least 3 characters',
                    'title.max' => 'Title must be at most 255 characters',
                    'description.max' => 'Description must be at most 255 characters',
                    'status.required' => 'Status is required',
                    'due_date.date' => 'Due date must be a valid date'
                ]);

            if ($validator->fails()) {
                return redirect()->back()->with([
                    'statusCode' => 422,
                    'statusMessage' => $validator->errors()
                ]);
            }

            $task = Task::where('id', $request->id)->first();
            $task->title = $request->title;
            $task->description = $request->description;
            $task->status = $request->status;
            $task->due_date = $request->due_date;
            $task->updated_at = now();
            $task->save();

            return redirect()->route('dashboard')->with([
                'statusCode' => 200,
                'statusMessage' => 'Task updated successfully'
            ]);
        }
        catch (\Exception $error)
        {
            Log::error($error->getMessage());
            return redirect()->back()->with([
                'statusCode' => 500,
                'statusMessage' => 'Something went wrong'
            ]);
        }
    }

    public function delete(Request $request)
    {
        try
        {
            $task = Task::where('id', $request->id)->first();

            if ($task->user_id != $request->user()->id) {
                return redirect()->back()->with([
                    'statusCode' => 403,
                    'statusMessage' => 'You do not have permission to delete this task'
                ]);
            }

            $task->delete();

            return redirect()->route('dashboard')->with([
                'statusCode' => 200,
                'statusMessage' => 'Task deleted successfully'
            ]);
        }
        catch (\Exception $error)
        {
            Log::error($error->getMessage());
            return redirect()->back()->with([
                'statusCode' => 500,
                'statusMessage' => 'Something went wrong'
            ]);
        }
    }

    public function getAllByUserId(Request $request): JsonResponse
    {
        try
        {

            return response()->json([
                'test' => 'hello'
            ]);

            $tasks = Task::where('user_id', $request->user()->id)->get();

            return response()->json([
                'tasks' => $tasks
            ]);
        }
        catch (\Exception $error)
        {
            Log::error($error->getMessage());
            return response()->json([
                'statusMessage' => 'Something went wrong'
            ], 500);
        }
    }

    public function getById(Request $request): JsonResponse
    {
        try
        {
            $task = Task::find($request->id);
            return response()->json([
                'task' => $task
            ]);
        }
        catch (\Exception $error)
        {
            Log::error($error->getMessage());
            return response()->json([
                'statusMessage' => 'Something went wrong'
            ], 500);
        }
    }
}
