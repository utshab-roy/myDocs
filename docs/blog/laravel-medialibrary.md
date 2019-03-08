---
sidebarDepth: 2
---

# Basic usage of laravel-medialibrary
I'm assuming that you have very basic knowledge of Laravel Framework.

## Installing the Library

First of all, we have to inastall the library. Just copy and paste one by one command below.

``` php
composer require spatie/laravel-medialibrary:^7.0.0

php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="migrations"

php artisan migrate

php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="config"
```
## Setup

### .env file

You need to setup the .env files `APP_URL` field according to the server.

We need to make a model for the to upload image. The images will be corespondent to this model. With that model we need Controller file and also the migration file.

This command will generate the necessary file needed for our purpose.

```php
php artisan make:model News -a
```

This will generate the News model, NewsController, news migration file and the NewsFactory.

### Model file

Now, we have to configure the model file (News.php) to associate with this library.

``` php
<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
class News extends Model implements HasMedia
{
    use HasMediaTrait;
}
```

### Migration file

Now configure the migration file (create_news_table.php) to have some fileds for the News.

``` php
<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
class CreateNewsTable extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    publicfunctionup()
    {
        Schema::create('news',function(Blueprint$table){
            $table->increments('id');
            $table->string('name');
            $table->text('description');
            $table->timestamps();
       });
    }
    /**
    * Reverse the migrations.
    *
    * @return void
    */
    publicfunctiondown()
    {
        Schema::dropIfExists('news');
    }
}
```
### Routing file

Create route for the News(web.php).

``` php
Route::get('/setNews', 'NewsController@create');

Route::get('/getNews', 'NewsController@index');
```
### Factory file
Create a news using factory so that you have a row in the database(NewsFactory.php).
``` php
<?php
use Faker\Generator as Faker;
$factory->define(App\News::class, function (Faker $faker) {
    return[
        'name'=>$faker->colorName,
        'description'=>$faker->realText(),
    ];
});
```

### Seeder file

Seed the News table.(NewsSeeder.php)
``` php
<?php
use App\News;
use Illuminate\Database\Seeder;
class NewsSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    publicfunctionrun()
    {
         factory(News::class,20)->create();
    }
}
```

### Creating Blade file

Create the blade file for displaying the images you upload.(news.blade.php)

``` html
<metacharset="UTF-8">
<metaname="viewport"content="width=device-width, initial-scale=1.0">
<metahttp-equiv="X-UA-Compatible"content="ie=edge">

@foreach($images as $image)
    {{ $image }}
@endforeach
```

::: warning
Create the storage link using this command
``` php
php artisan storage:link
```
:::



**Now you can upload image by hitting the /setNews route and to see the uploaded image go to the /getNews route.**