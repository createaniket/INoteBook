const mongoose = require("mongoose")

const DBURL = "mongodb+srv://aniket:nishaniket@inotebook.dyojsyc.mongodb.net/test"

mongoose.connect(DBURL , () => {

    console.log("Connected to database sauccessfully")

})


// mongoose.connect(DBURL, {
//     useNewUrlParser:true,
// })

