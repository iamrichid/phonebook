const express = require('express')
const app = express()
const port = 5000

let count = 0;

app.get('/', (req , res) => {
    res.send('hello World')
})

app.get('/api', (req , res)=> {
    ++count;
    res.json({count})
})
app.listen(port , () => {
    console.log(`Example app listening on port ${port}`)
})