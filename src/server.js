const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./../Models/databaseorm');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  User.findAll().then(users => {
    const contact = JSON.parse(JSON.stringify(users));
    console.log(users);
    res.render('index', { contact });
  });
});

app.get('/new_contact', (req, res) => {
  res.render('new');
});

app.get('/edit_contact/:id', (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then(users => {
    const contact = JSON.parse(JSON.stringify(users));
    res.render('edit', { contact });
  });
});

app.post('/save-contact', (req, res) => {
  const { firstname, lastname } = req.body;
  const new_user = User.build({ firstName: firstname, lastName: lastname });
  new_user.save();
  res.redirect('/');
});

app.post('/update-contact', (req, res) => {
  const { id, firstname, lastname } = req.body;
  console.log(`${id} ${firstname} and ${lastname}`);
  User.update(
    { firstName: firstname, lastName: lastname },
    { where: { id: id } }
  ).then(() => {
    res.redirect('/');
  });
});

app.get('/delete_contact/:id', (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then(users => {
    const contact = JSON.parse(JSON.stringify(users));
    console.log(contact);
    users.destroy();
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`contacts app listening on port ${port}`);
});