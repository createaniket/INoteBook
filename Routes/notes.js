const express = require('express')
const Auth = require('../Middlewares/Auth')

const router = new express.Router()

const Notes = require('../Models/Notes')

router.post('/add', Auth ,  async (req, res) => {


    try{
        const note =  new Notes({title: req.body.title, 
        description: req.body.description,
         tag:req.body.tag,
        user: req.user})

        console.log("notes are here" , note)
        const result = await note.save()

        const nowNotes = await Notes.find({})

        res.status(201).send(nowNotes)

    }catch(e) {

        res.status(501).send(e)
    }
})


router.get('/fetchall' , Auth , async (req, res) => {
    try {

        const result = await Notes.find({})

        // res.status(200).send("done")
        res.status(200).json(result)
    }catch(e) {
        res.status(501).send(e)
        console.log("erorr rror ror ro" , e)
    }
})



router.get('/getone/:id' , Auth , async(req, res) => {
    try {

        const result = await Notes.findById({_id: eq.params._id})
        if(!result) { 
            res.status(400).send("No match found")
        }
        res.status(200).send(result)
    }catch(e) {
        res.status(501).send(e)
    }

})




router.delete('/delete/:id' , Auth , async(req, res) => {
    try {

        console.log("xhbewudbuewcv" , req.params.id)

        const result = await Notes.findByIdAndDelete({_id: req.params.id})
        if(!result) { 
            res.status(400).send("No match found")
        }


        const restNotes = await Notes.find({})
        res.status(200).send(restNotes)
        
    }catch(e) {
        res.status(501).send(e)
    }

})



router.patch('/update/:id', Auth, async (req, res) =>{

    const updates = Object.keys(req.body)
    console.log("ye tio line h 90 ", updates)
    const allowedUpdates = ['description', 'title', 'tag']
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update))
    console.log("ye tio line h 93 ", isValidOperation)

    if (!isValidOperation) {

    console.log("ye tio line h 97 ")

        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{
        const note = await Notes.findOne( {_id: req.params.id})
        console.log("linw 102" , note)

        if (!note) {

            return res.status(404).send()
        }
        updates.forEach( (update) => note[update] = req.body[update])
        await note.save()

        const noteess = await Notes.find({})
        res.send(noteess)
    }catch (e) {{
        res.status(400).send(e)
    }}
})





module.exports = router