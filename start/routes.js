'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.on('/home').render('home').as('home')
Route
  .get('/all', 'UserController.profile')
  .middleware('auth')
Route.get('/register', 'UserController.gopageregister')
Route.get('/login', 'UserController.gopagelogin')

Route.post('/register', 'UserController.register')
Route.post('/login', 'UserController.login')

Route
  .get('users/:id', 'UserController.show')
  .middleware('auth')
