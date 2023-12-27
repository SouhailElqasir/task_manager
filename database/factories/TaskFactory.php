<?php

namespace Database\Factories;

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
            'title'=>fake(20)->sentence(),
            'body'=>fake(20)->paragraph(),
            'deadline'=>fake()->datetime(),
            'assigne_to'=>fake()->sentence(),
            'note'=>fake()->sentence(),
        ];
    }
}
