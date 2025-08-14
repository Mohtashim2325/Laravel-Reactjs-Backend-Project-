# Laravel-Reactjs-Backend-Project-
To run this project locally, make sure you have PHP 8.1+, Composer, Node.js 18+, npm, MySQL, and Git installed on your system.

Clone the repository:
git clone https://github.com/your-username/your-repo.git

Navigate into the project folder:
cd your-repo

Install Laravel backend dependencies:
composer install

Install React frontend dependencies:
npm install

Copy the example environment file:
cp .env.example .env

Open the `.env` file in your code editor and update the configuration:
- Set APP_URL to http://127.0.0.1:8000
- Configure the database:
  DB_CONNECTION=mysql  
  DB_HOST=127.0.0.1  
  DB_PORT=3306  
  DB_DATABASE=task_app  
  DB_USERNAME=root  
  DB_PASSWORD=  
  (replace database name, username, and password with your own settings)

Create the database in MySQL:
CREATE DATABASE task_app;

Generate the Laravel application key:
php artisan key:generate

Run database migrations:
php artisan migrate

If Laravel Sanctum authentication is used, run:
php artisan install:api

Start the Laravel backend server:
php artisan serve
(This will run at http://127.0.0.1:8000)

In a separate terminal, start the React frontend with Vite:
npm run dev

Open http://127.0.0.1:8000 in your browser to use the application.

For production builds of the frontend, run:
npm run build
(This will compile assets to public/build)
