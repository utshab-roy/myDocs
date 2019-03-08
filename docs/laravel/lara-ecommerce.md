---
sidebarDepth: 2
---

# Lara-ecommerce
This is a simple E-commerce application developed on **Laravel 5.7** framework. 

## Features

  - Mail verified login registration with Github and Facebook OAuth2
  - Any user can see the active products and logged in user can add products to cart
  - User can only see the history of his/her own orders, other orders are restricted
  - Mail notification for every successful checkout
  - Factory and Seeder used to generate dummy data for testing purpose
  - Eloquent model relationship, Eager loading used for adding and retrieving data

## Installation


1. Clone GitHub repo for this project locally
    ```sh
    git clone https://github.com/utshab-roy/lara-ecommerce.git
    ```
2. cd into your project
    ```sh
    cd lara-ecommerce
    ```
3. Create a copy of your .env file
    ```sh
    cp .env.example .env
    ```
    This will create a copy of the .env.example file in your project and name the copy simply .env.

4. Install Composer Dependencies
    ```sh
    composer install
    ```
5. Install NPM Dependencies
    ```sh
    npm install
    ```
    Or you can use
    ```sh
    yarn install
    ```

6. Generate an app encryption key
    ```sh
    php artisan key:generate
    ```
    If you check the .env file again, you will see that it now has a long random string of characters in the `APP_KEY` field. We now have a valid app encryption key.

7. Create an empty database for our application

8. In the .env file, add database information to allow Laravel to connect to the database

    In the .env file fill in the `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` options to match the credentials of the database you just created. This will allow us to run migrations and seed the database in the next step.

    In order to use the mail smtp protocol for the test, change the `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD` credentials according to your setup.
    
    For OAuth2 for Gitgub login include `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` and define the callback url properly.


9. Migrate the database
    ```sh
    php artisan migrate
    ```
    It’s not a bad idea to check your database to make sure everything migrated the way you expected.

10. [Optional]: Seed the database
    ```sh
    php artisan db:seed
    ```
The default password for any the users is `121212`

**Now you are reday to use the Application** 

### Development
Want to contribute? Great!

If you find any bug or want ot improve it just ***fork*** on the git project and it will create a  ***pull request*** I will accept it.
***[Git Repo of this project][gitRepo]***

You can mail me if required. 

Email address: <utshab.roy@gmail.com>

#### Find Me on social media

* [LinkedIn][linkedInLink]
* [Facebook][facebookLink]
* [Google+][googlePlusLink]

### Todos

 - Comment section add for the post
 - Logged in user can only edit his/her own posts
 - Multiple images upload at the same time

License
----

GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007


**Free Software, Hell Yeah!**

   [facebookLink]: <https://www.facebook.com/uutshab>
   [linkedInLink]: <https://www.linkedin.com/in/utshab-roy>
   [googlePlusLink]: <https://plus.google.com/u/0/+UtshabRoy>
   [gitRepo]: <https://github.com/utshab-roy/lara-ecommerce>
   