const express 		= 	require("express");
const app 			= 	express();
const bodyParser 	= 	require('body-parser');
const mongoose 		= 	require("mongoose");
const AutoIncrement =	require('mongoose-sequence')(mongoose);
const path 			= 	require("path");


mongoose.connect("mongodb://localhost:27017/blog");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../style'))
app.use(express.static('../dist'))


let blogSchema = new mongoose.Schema({
    title: String,
    content: String
})
blogSchema.plugin(AutoIncrement, {inc_field: 'id'});


let Blog = mongoose.model("Blog", blogSchema);


app.get("/api/posts", function(req, res){
	// res.redirect("/seasons")
	Blog.find({}, {"_id": 0, "__v": 0}, function(err, posts){
	    if(err){console.log("error while retrieving")}else{
	        // console.log(todos);
	        res.send(posts);
	    }
	})
});

app.get("/api/posts/:id", function(req, res){
	// res.redirect("/seasons")
	Blog.find({id: req.params.id}, {"_id": 0, "__v": 0}, function(err, posts){
	    if(err){console.log("error while retrieving")}else{
	        // console.log(todos);
	        res.send(posts[0]);
	    }
	})
});

app.post("/api/posts", function(req, res){
	let entry = req.body;

	Blog.create(entry, function(err, blog){
	    if(err){console.log(err.message)}else{
	        // console.log(blog);
	        res.sendStatus(201);
	    }
	});
});


app.delete("/api/posts/:id", function(req, res){
	// res.redirect("/seasons")
	Blog.remove({id: req.params.id}, (err, blog) => {
	    if (err) return res.status(500).send(err);
	    const response = {
	        message: "blog successfully deleted",
	        id: blog.id
	    };
	    return res.status(200).send(response);
	});
});


app.put("/api/posts/:id", function(req, res){
	let query = { id: req.params.id };
	// console.log(req.body);
	Blog.findOneAndUpdate(query, req.body, (err, blog) => {
	    if (err) return res.status(500).send(err);
	    const response = {
	        message: "blog successfully modified",
	        // id: todo.id
	    };
	    return res.status(200).send(response);
	});
})

app.get("/*", function(req, res){
	res.sendFile(path.resolve("index.html"));
})

app.listen(3000, function(){
	console.log("server started");
})

