require('dotenv').config()

const express = require("express")
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const posts=[
    {
        username:"aakash",
        title:"post 1"
    },
    {
        username:"sinha",
        title:"post 2"
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(posts => posts.username === req.user.name))
})
/*
another file authServer.js is created to takecare of login logic

app.post('/login', (req, res) => {
    //auth user

    const username = req.body.username
    const user = {name:username}

    //to gernate random  token for env use > require('crypto').randomBytes(64).toString('hex')

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.json({accessToken :accessToken})
    
}) 


*/

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) return res.sendStatus(401)  //unauthorized or empty token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)

        req.user = user
        next()

    })


 }




app.listen(3000)