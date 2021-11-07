const express = require('express')
const app = express()
const path =  require('path') 


//setup static and middleware
app.use(express.static('./public'))   


// Static middleware will take care of index html

// app.get('/', (req,res)=>{
//    res.sendFile(path.resolve(__dirname, './public/index.html'))
// })

app.all('*', (req,res)=>{
    res.status(404).send('<h1>File Not Found</h1>')
})


app.listen(5000, ()=>{
    console.log('http://localhost:5000');
})
