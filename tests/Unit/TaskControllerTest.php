<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->post('/task/create', $task->toArray());

        $this->assertDatabaseHas('tasks', $task->toArray());

        $response->assertRedirect(route('dashboard'));
    }

    public function test_update_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->patch("/task/{$task->id}", [
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'status' => 'in_progress',
            'expiration_date' => now(),
        ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Updated Task',
            'description' => 'Updated description',
            'status' => 'in_progress',
        ]);

        $response->assertRedirect(route('dashboard'));
    }

    public function test_delete_task()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->delete("/task/{$task->id}");

        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
        ]);

        $response->assertRedirect(route('dashboard'));
    }
}