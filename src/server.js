const express = require('express')
const app = express()
const {User} =require('./../Models/databaseorm')
const bodyParser = require('body-parser')
const { where } = require('sequelize')
const port = 5000


// playing around
// const richid = User.build({ firstName: "Richard", lastName: "Narh" });
//   console.log("Richid's auto-generated ID:", richid.id);

//   richid.save()
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'ejs')

app.get('/', (req , res) => {
    // let phonebook  = Object.values(data.phonebook);
    const users = User.findAll().then(users => {
        const jsonData = JSON.stringify(users);
        const phonebook = JSON.parse(jsonData)
        console.log(users)
        res.render('index', {phonebook : phonebook })
        ;})   
})

app.get('/new_phonebook', (req , res)=> {
    res.render('new')
})

app.get('/edit_phonebook/:id', (req , res)=> {
    id = req.params.id
   
    const users = User.findByPk(id).then( users => {
        const jsonData = JSON.stringify(users); 
        const phonebook = JSON.parse(jsonData) 
        res.render('edit', {phonebook : phonebook})
    })

})

app.post('/save-form', function(req, res) {
    
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const new_user = User.build({firstName : firstname , lastName : lastname})
    
    new_user.save()
    
    res.redirect('/');
  
});

app.post('/update-form', function(req, res) {
    const id = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    console.log(`${id} ${firstname} and ${lastname}`) 

   const users = User.update(
        {firstName : firstname , lastName : lastname},
        {where : {id: id}}).then(users => {

        res.redirect('/');
        })
});

app.get('/delete_phonebook/:id', function(req, res) {
    const id = req.params.id;
    console.log(id)

    const users = User.findByPk(id).then( users => {
        const jsonData = JSON.stringify(users); 
        const phonebook = JSON.parse(jsonData) 
        console.log(phonebook)
        users.destroy()
        res.redirect('/');
    })
  
});

app.listen(port , () => {
    console.log(`Phonebook app listening on port ${port}`)
})