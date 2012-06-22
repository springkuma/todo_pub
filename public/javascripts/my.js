// Generated by CoffeeScript 1.3.3
(function() {

  $(function() {
    var App, AppView, Todo, TodoList, TodoView, Todos, Workspace;
    Todo = Backbone.Model.extend({
      defaults: function() {
        return {
          title: "empty todo...",
          done: false
        };
      },
      url: "/todos/",
      initialize: function() {}
    });
    TodoList = Backbone.Collection.extend({
      model: Todo,
      url: "/todos/"
    });
    Todos = new TodoList;
    TodoView = Backbone.View.extend({
      tagName: "li",
      template: _.template($('#item-template').html()),
      initialize: function() {
        return this.render();
      },
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('done', this.model.get('done'));
        this.input = this.$('.edit');
        return this;
      }
    });
    AppView = Backbone.View.extend({
      el: $("#todoapp"),
      events: {
        "keypress #new-todo": "addTodo"
      },
      initialize: function() {
        this.input = this.$("#new-todo");
        Todos.bind("add", this.addOne, this);
        Todos.bind("all", this.render, this);
        this.footer = $('footer');
        this.main = $('main');
        return this.render();
      },
      render: function() {
        this.main.show;
        this.footer.show;
        return $("#yama").html(Todos.length);
      },
      addOne: function(todo) {
        var view;
        view = new TodoView({
          model: todo
        });
        return this.$("#todo-list").append(view.render().el);
      },
      addTodo: function(e) {
        if (e.keyCode !== 13) {
          return;
        }
        Todos.create({
          title: this.input.val()
        });
        return this.input.val("");
      }
    });
    App = new AppView;
    return Workspace = Backbone.Router.extend({
      routes: {
        "help": ""
      }
    });
  });

}).call(this);
