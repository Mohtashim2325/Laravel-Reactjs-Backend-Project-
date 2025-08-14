<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Task::where('user_id', $user->id);

        // Search
        if ($q = $request->query('q')) {
            $query->where(function ($sub) use ($q) {
                $sub->where('title', 'like', "%$q%")
                    ->orWhere('description', 'like', "%$q%");
            });
        }

        // Filter by tag
        if ($tag = $request->query('tag')) {
            $query->whereJsonContains('tags', $tag);
        }

        // Filter by status
        if (($status = $request->query('status')) !== null) {
            if ($status === 'completed') $query->where('is_completed', true);
            if ($status === 'pending') $query->where('is_completed', false);
        }

        // priority
        if ($priority = $request->query('priority')) {
            $query->where('priority', (int)$priority);
        }

        // due filter: today|tomorrow|overdue
        if ($due = $request->query('due')) {
            if ($due === 'today') {
                $query->whereDate('deadline', now()->toDateString());
            } elseif ($due === 'tomorrow') {
                $query->whereDate('deadline', now()->addDay()->toDateString());
            } elseif ($due === 'overdue') {
                $query->where('deadline', '<', now())->where('is_completed', false);
            }
        }

        $tasks = $query->orderBy('deadline')->paginate(15);

        return TaskResource::collection($tasks);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'priority' => 'nullable|in:1,2,3',
            'tags' => 'nullable|array',
        ]);

        $data['user_id'] = $request->user()->id;
        $task = Task::create($data);

        return new TaskResource($task);
    }

    public function show($id)
{
    $task = Task::findOrFail($id);
    return response()->json($task);
}

public function update(Request $request, $id)
{
    $task = Task::findOrFail($id);

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'deadline' => 'nullable|date',
        'priority' => 'required|integer|min:1|max:3',
        'tags' => 'nullable|array',
    ]);

    $task->update($validated);

    return response()->json([
        'message' => 'Task updated successfully',
        'task' => $task
    ]);
}



    public function destroy(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $this->authorizeTask($request->user(), $task);
        $task->delete();
        return response()->json(['success' => true]);
    }

    public function complete($id)
    {
        $task = Task::findOrFail($id);
        $task->is_completed = !$task->is_completed;
        $task->save();

        return response()->json([
            'success' => true,
            'id' => $task->id,
            'is_completed' => $task->is_completed
        ]);
    }

    protected function authorizeTask($user, Task $task)
    {
        if ($task->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
    }
}
