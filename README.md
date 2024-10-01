# Task Manager with React, Inertia and Laravel

**Prerequisites**

* Node.js (version 16 or higher)
* PHP (version 8.0 or higher)
* Composer (version 2 or higher)
* Vite (version 5 or higher)
* Laravel (version 11 or higher)
* MySQL (version 9.0 or higher)
* Docker and Docker Compose if using Linux

**Installation**

1. Clone the project repository to your local machine.
2. Install Node.js dependencies by running the command `npm install` in the root of the project.
3. Install PHP dependencies by running the command `composer install` in the root of the project.
4. Create a `.env` file in the root of the project and configure the environment variables as needed, using `.env.example` as a guide.

**Development**

1. Run the command `npm run dev` in the root of the project to start the Vite development server (this will enable real-time UI changes).
2. Run the command `php artisan serve` in the root of the project to start the Laravel development server.
3. Open a browser and go to `http://localhost:<PORT>` to see the application running.
4. To run unit tests, run the command `php artisan test` in the root of the project.

**Production**

1. Run the command `php artisan migrate` in the root of the project to apply the database migrations.
2. Run the command `npm run build` in the root of the project to compile the application for production.
3. Set up the web server to serve the application from the `public` folder.
4. Access the application through the configured domain.

**Deploy with Docker**

1. Run the command `docker compose up` in the root of the project.
2. On Linux, if the Laravel container does not pick up the `DB_HOST` environment variable from `docker-compose.yml`, set the container name as the `DB_HOST` value in your `.env` file.

**Notes**

* Make sure to configure the environment variables in the `.env` file as needed for the application.
* The application uses Laravel as the PHP framework and Vite as the build tool and development server.
* The application uses a MySQL database; make sure to configure the database credentials in the `.env` file.
* If you make changes to the source code for production, it may be necessary to recreate the container image. To force this, run `docker compose up --build` on your server or add it to the relevant `Dockerfile`. 