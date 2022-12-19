const mongoose = require('mongoose')

const NotesSchema  = new mongoose.Schema({

title:{
    type:String,
    required:true
},


description:{

    type:String,
    required:true
},
tag:{

    type:String,
    required:true,
    default:"General"
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'user'
}
},

{
  timestamps:true
})

const  Notes = mongoose.model("notes", NotesSchema)


module.exports= Notes