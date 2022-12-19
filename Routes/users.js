const User = require('../Models/Users')
const Notes = require('../Models/Notes')
const express = require('express')

const { body, validationResult } = require('express-validator');

const router = new express.Router()

router.post('/signup' , async (req, res) =>{

    try {
        
        const user = new User({...req.body})


        const token = await user.generateAuthToken()
        const saveduser = await user.save()
        const newNotes  = await Notes.find({user:saveduser._id })

console.log(`notes: ${newNotes} , ${token}`)
        res.status(201).json({notes:newNotes, token: token})

    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})



router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()

        const newNotes  = await Notes.find({})
                res.status(201).json({notes:newNotes,
                    token: token})
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})


router.get('/getall' , async (req, res) =>{

    const result = await User.find({})

    res.send(result)
})

module.exports = router