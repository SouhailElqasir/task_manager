<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeletedTasksTable extends Migration
{
    public function up()
    {
        Schema::create('deleted_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('body');
            $table->boolean('done')->default(0);
            $table->datetime('deadline');
            $table->string('assigne_to');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('deleted_tasks');
    }
}
