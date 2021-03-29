const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
let items = ['food', 'singing'];
let workItems = [];

app.get('/', function(req, res) {

  let day = date.getDate();

  res.render('list', {
    listTitle: day,
    nitems: items

  });
});

app.post('/', function(req, res) {
  let inp = req.body.ip;
  if (req.body.list === 'Work') {
    workItems.push(inp);
    res.redirect('/work');
  } else {
    items.push(inp);
    res.redirect('/');
  }

});

app.get('/work', function(req, res) {
  res.render('list', {
    listTitle: 'Work list',
    nitems: workItems
  });
});
app.get('/about', function(req, res) {
  res.render('about');
});
app.post('/work', function(req, res) {
  let item = req.body.ip;
  workItems.push(item);
  res.redirect('/work');
});


app.listen(3000, function() {
  console.log('server is up and running on port 3000');
});
