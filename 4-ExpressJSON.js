const express = require('express')
const app = express()
const {products} = require('./data')

app.get('/', (req,res)=>{
    res.send('<h1>Home Page </h1> <a href="./api/products">Products </a>')
})

app.get('/api/products', (req,res)=>{
    const newProducts=products.map((product)=>{
        const {id,name,image} = product
          return {id, name, image}
    })
    res.send(newProducts)
})

app.get('/api/products/:productID', (req, res)=>{
    console.log(req.params);
    const singleProduct= products.find((product)=> product.id===Number(req.params.productID))

    if(!singleProduct){
        return res.status(404).send('Product Does Not Exist')
    }
  res.json(singleProduct)
})



app.listen(5000, ()=>{
    console.log('http://localhost:5000');
})