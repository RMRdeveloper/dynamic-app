FROM php:8.2-apache

# Enable Apache Rewrite Module for URL Rewrite
RUN a2enmod rewrite

# Update system packages and install nodejs with npm
RUN apt-get update && apt-get install -y nodejs npm

# Install PHP extensions for database
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo_mysql

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html

WORKDIR /var/www/html

RUN composer install --optimize-autoloader

RUN npm install && npm run build

RUN npm run dev

EXPOSE 8000

CMD php artisan migrate --force && php artisan config:clear && php artisan cache:clear && php artisan view:clear && php artisan route:cache && php artisan serve --host=0.0.0.0 --port=8000