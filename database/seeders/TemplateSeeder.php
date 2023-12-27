<?php

namespace Database\Seeders;

use App\Models\taskTemplates;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        taskTemplates::factory(1)->create();
    }
}
