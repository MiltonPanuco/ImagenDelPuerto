<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('servicios_varios', function (Blueprint $table) {
            $table->string('icon')->nullable();
            $table->string('color')->nullable();
        });
    }

    public function down()
    {
    Schema::table('servicios_varios', function (Blueprint $table) {
        $table->dropColumn(['icon', 'color']);
    });
}

};
