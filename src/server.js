const express = require('express')
const app = express()
const data = require('../phonebook_data/data.json')
const port = 5000

app.set('view engine', 'ejs')

app.get('/', (req , res) => {
    const phonebook = Object.values(data.phonebook);
    res.render('index', {phonebook})
})

app.get('/api', (req , res)=> {
    res.json(data)
})
app.listen(port , () => {
    console.log(`Example app listening on port ${port}`)
})