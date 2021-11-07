const express = require('express')
const app = express()
const morgan = require('morgan')
// req => middleware => res

// 1. use vs route
// 2. Options our own / express / 3rd party (like morgan)

// Middleware Function  We can fit in our routes so we dont need to copy the same code to different routes
// We will keep it in other file and import it here 
const logger=(req,res,next)=>{
    const method= req.method
    const url=req.url
    const time= new Date().getFullYear()
    console.log(method, url, time);
    next()
}

const authorize = (req,res,next)=>{
    const {user}= req.query
    if(user=== 'john'){
        req.user = {name: 'john', id : 3}
        next() 
    }
    else{
        res.status(401).send('Unautherized')
    }
}

//One Way  -> it will applied to all path
app.use(logger)

//only apply to any path after /api
app.use('/api', logger)

// for multiple middleware
app.use([authorize, logger])
 
//Third party middleware for logging 
app.use(morgan('tiny'))

// One way to keep it between rout and callback function
app.get('/', logger,(req,res)=>{
       res.send('Home')
})

app.get('/about', logger,(req,res)=>{
   res.send('about')
})

app.listen(5000, ()=>{
    console.log('http://localhost:5000');
})