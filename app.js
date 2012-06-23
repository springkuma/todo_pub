// Generated by CoffeeScript 1.3.3
(function() {
  var Schema, Todo, TodoSchema, app, express, mongoose, routes;

  express = require("express");

  routes = require("./routes");

  mongoose = require("mongoose");

  mongoose.connect("mongodb://localhost/mongo_data");

  app = module.exports = express.createServer();

  app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express["static"](__dirname + "/public"));
  });

  app.configure("development", function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure("production", function() {
    return app.use(express.errorHandler());
  });

  Schema = mongoose.Schema;

  TodoSchema = new Schema({
    title: String,
    done: Boolean
  });

  Todo = mongoose.model('Todo', TodoSchema);

  app.get("/", routes.index);

  app.get("/todos", function(req, res) {
    return Todo.find(function(error, todos) {
      if (!error) {
        return res.json(todos);
      } else {
        return res.json({
          success: false
        });
      }
    });
  });

  app.post("/todos", function(req, res) {
    var todo;
    todo = new Todo(req.body);
    return todo.save(function(error) {
      if (!error) {
        return res.json({
          success: true
        });
      } else {
        return res.json({
          success: false
        });
      }
    });
  });

  app.put("/todos/:id", function(req, res) {
    var data;
    data = {
      title: req.body.title,
      done: req.body.done
    };
    return Todo.update({
      _id: req.params.id
    }, data, function(error, todo) {
      if (!error) {
        return res.json({
          success: true
        });
      } else {
        return res.json({
          success: false
        });
      }
    });
  });

  app["delete"]("/todos/:id", function(req, res) {
    return Todo.findById(req.params.id, function(error, todo) {
      if (!error) {
        return todo.remove(function(delete_error) {
          if (!delete_error) {
            return res.json({
              success: true
            });
          } else {
            return res.json({
              success: false
            });
          }
        });
      } else {
        return res.json({
          success: false
        });
      }
    });
  });

  app.listen(8000, function() {
    return console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });

}).call(this);
