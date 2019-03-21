---
sidebarDepth: 1
---

# Proper way to add jQuery to Laravel projects

## Issue

The main issue here is that jQuery comes with Laravel default installation. but when we try to load jQuery in the blade file it gives us a console error `$ in not defined`. This is happening because jQuery was not loaded before the the blade files execute. As a result, it turn out an error.

## Solution

To solve this problem we have to make sure that the jQuery library file loads before the blade file execute. This can be fixed with the Webpack autoloading feature. If you're working with a particular plugin or library that depends upon a global variable, such as jQuery, `mix.autoload()` may prove useful to you.

By default the `webpack.mix.js` file looks like this:

```js
const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
```

All you need to do is add these lines after `const mix = require('laravel-mix');` line.

```js
mix.autoload({
    jquery: ['$', 'window.jQuery']
});
```

Therefore, the `webpack.mix.js` file will look like this:

```js
const mix = require('laravel-mix');

mix.autoload({
    jquery: ['$', 'window.jQuery']
});

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
```

Now recompile all your assets using `npm run dev` or `yarn run dev`. It will remove the error and you will able to use the jQuery in your projects.

::: tip
Dont forget to add the asset **`app.js`** file into the blade file.
```html
<script src="{{ mix('js/app.js') }}"></script>
```
:::

**Happy Coding !**
