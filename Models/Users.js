const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const UserSchema  = new mongoose.Schema({

name:{

    type:String,
    required:true
},
email:{

    type:String,
    required:true,
    unique:true
},
password:{

    type:String,
    required:true
},
tokens: [
    {
      token: {
        type: String,
      }
    }
  ]
},

{
  timestamps:true
})



UserSchema.statics.findByCredentials = async function (email, password) {


    console.log(email , password)

    
const user  = await User.findOne({email})

if(!user) {throw new Error("Unable To Find User");}

const isMatch = bcrypt.compare(user.password , password)

if (!isMatch) { throw new Error("Wrog Password")}


return user
}


UserSchema.methods.generateAuthToken = async function () {




    const user = this;
    

    console.log(user)

    const token = jwt.sign({_id: user._id.toLocaleString()} , "aniket")

   user.tokens =  user.tokens.concat({token})

    console.log(token)
    await user.save()

    return token

}


UserSchema.pre('save' , async function (next) {


const User = this

if (User.isModified('password')){


    const newpassword = await bcrypt.hash(User.password, 8)
}

next()

})
const User = mongoose.model("user", UserSchema)


module.exports= User