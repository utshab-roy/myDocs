---
sidebarDepth: 2
---

# Lara-QA
**Laravel 5.7 Question &amp; Answer application**

 This project is the basic level of form where a user ask as many questions, give answers to the existing questions, mark a question as favorite, accept his/her asked question answers as accepted answers and full CRUD operation of questions and answers as required.

## Features

  - User can login and register, full CRUD operation for both Answer and Question
  - User can ask as many questions and can give the answers of the existing questions
  - Many to Many relationship build for marking the question as a favorite question
  - Many to Many polymorphic relationship build for voting system both for Question and Answer
  - Eager loading implemented for removing (n + 1) problem as required
  - Don't Repeat Yourself (DRY) principle followed in the Question and Answer models to prevent redundant code
  - Accessor and Mutator generated as required to make clean code
  - Partial blade file included for better understanding the front view
  - PHP trait used for VotableTrait for sharing same code
  - Single action controller implemented for doing a particular job like accept answer as best answer
  - Auth middleware declared to prevent on authorized user to post question or answers. However, all user can see the questions and answers given by the logged in users.
  - SCSS used for frontend styling


## Instalation

1. Clone GitHub repo for this project locally
    ```sh
    git clone https://github.com/utshab-roy/lara-QA.git
    ```
2. cd into your project
    ```sh
    cd larab-QA
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

9. Migrate the database
    ```sh
    php artisan migrate
    ```
    It’s not a bad idea to check your database to make sure everything migrated the way you expected.

10. [Optional]: Seed the database
    ```sh
    php artisan db:seed
    ```
This will create some random data for the site in order to get started.

**Now you are ready to use the Application** 


## Development
Want to contribute? Great!

If you find any bug or want ot improve it just ***fork*** on the git project and it will create a  ***pull request*** I will accept it.
***[Git Repo of this project][gitRepo]***

You can mail me if required. 

Email address: <utshab.roy@gmail.com>

### Find Me on social media

* [LinkedIn][linkedInLink]
* [Facebook][facebookLink]
* [Google+][googlePlusLink]

## Todos

 - Bug fix for unmark a question as favorite question (Marking question is working fine)

License
----

GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007


**Free Software, Hell Yeah!**

   [facebookLink]: <https://www.facebook.com/uutshab>
   [linkedInLink]: <https://www.linkedin.com/in/utshab-roy>
   [googlePlusLink]: <https://plus.google.com/u/0/+UtshabRoy>
   [gitRepo]: <https://github.com/utshab-roy/lara-QA>
   