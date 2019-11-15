'use strict'
const User = use('App/Models/User')
const view = use('View')

class UserController {

  gopageregister({}){
    return view.render('formregister');
  }
  gopagelogin({}){
    return view.render('welcome')
  }


  async register({request, auth, response}) {

    let user = await User.create(request.all())
    //generate token for user;
    let token = await auth.generate(user)
    Object.assign(user, token)
    return view.render('welcome');
    return response.json(user,token)
  }

  async login({request, auth, response }) {
    let {email, password} = request.all();
    await auth.attempt(email, password);
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let token = await auth.generate(user)
        // await auth.login(user)

        Object.assign(user, token)
        // try {
        //   await auth.check()
        // } catch (error) {
        //   response.send('Missing or invalid jwt token')
        // }
        return response.json(user,token)
        return view.render('/home',{user})
        return response.redirect('/');
      }

    }
    catch (e) {
      console.log(e)
      return response.json({message: 'You are not registered!'})
    }
  }

  show ({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "You cannot see someone else's profile"
    }
    return auth.user
  }


}

module.exports = UserController
