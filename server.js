var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require("body-parser");

app.use(bodyParser.json());
//In New York!!!

app.use(express.static(__dirname + "/public"));

app.get('/contactlist', function(req, res){
	console.log("I received a GET request");

	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);

	});

});

app.post("/contactlist", function(req, res){
	console.log(req.body);
	db.contactlist.save(req.body, function(err, docs){
		res.json(docs);
	});

});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
     res.json(doc);
  });
});
app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findAndModify(
   { query: {_id: mongojs.ObjectId(id)}, 
     update: {$set: {name: req.body.title, text: req.body.text, due: req.body.due}},
     new: true 
   }, function(err, doc){
     res.json(doc);
   });
});

app.put('/contactlist/put/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findAndModify(
   { query: {_id: mongojs.ObjectId(id)}, 
     update: {$set: {status:"Complete"}},
     new: true 
   }, function(err, doc){
     res.json(doc);
   });
});

app.put('/contactlist/put2/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findAndModify(
   { query: {_id: mongojs.ObjectId(id)}, 
     update: {$set: {status:"Incomplete"}},
     new: true 
   }, function(err, doc){
     res.json(doc);
   });
});

/**
app.complete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
  console.log(id);
 var options = "complete"; 
 if (options ="complete") {
    document.getElementById("demo").innerHTML = '&#9989';;
}res.json(doc);

}*/

/**
app.complete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
  console.log(id);
$('#list').on('click', '.complete-button', function(event) {
  var item = $(event.target).parent()
  var isItemCompleted = item/.hasClass('completed')
  var itemId = item.attr('data-id')

  var updateRequest = $.ajax({
    type: 'PUT',
    + itemId,
    data: { completed: !isItemCompleted }
  })

  updateRequest.done(function(itemData) {
    if (itemData.completed) {
      item.addClass('completed')
    } else {
      item.removeClass('completed')
    }
  })
})
*/
app.listen(80);

console.log("Server running on port 80s");

