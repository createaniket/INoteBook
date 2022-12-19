const express = require('express')
require('./database')
var cors = require('cors')
 

const userrouter = require('./Routes/users')
const notesrouter = require('./Routes/notes')

const app = express()
app.use(cors())

app.use(express.json())


const Port = process.env.PORT || 9000

app.use('/user' , userrouter)
app.use('/user/notes' , notesrouter)








app.listen(Port , () =>{

console.log(`Port has been up at ${Port}`)

})