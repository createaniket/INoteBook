const jwt = require ('jsonwebtoken')

const User =require('../Models/Users.js')

const Auth = async (req, res, next) =>{

   
   try {

      const token = req.header('Authorization').replace('Bearer ','')
      console.log(" elrbvfeur euh ewuc ueh ufh eu hhhhhhhhh",token)

     const decoded = jwt.verify(token, 'aniket')

     const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

   if (!user) {

      throw new Error ()
   
   }

   req.token = token
   req.user = user
      next()

   } catch (e) {



      res.send(e)
      console.log(e)
      next()
   }
}

module.exports = Auth