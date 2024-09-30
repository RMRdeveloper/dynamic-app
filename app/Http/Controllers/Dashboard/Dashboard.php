<?php

use Inertia\Inertia;

class Dashboard
{
    public function index()
    {
        return Inertia::render('Dashboard');
    }
}