<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(255),
            'description' => fake()->text(255),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed']),
            'created_at' => now(),
            'updated_at' => now()->addDays(rand(1, 30)),
            'due_date' => now()->addDays(rand(1, 30)),
            'user_id' => User::factory()
        ];
    }
}
