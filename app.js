Vue.component('todos', {
  template: `<div>
  <h1>Vue Todo App</h1>
  <p>Double click on todo for editing</p>

  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
      <v-text-field v-model="newTodo.task" placeholder="Add todo..." required></v-text-field>
    </v-flex>

    <v-flex xs3>
      <v-btn color="success" v-on:click="addTodo">Add</v-btn>
    </v-flex>
  </v-layout>
  
  <v-list offset-xs3>
    <v-flex xs6 offset-xs3>
      <div v-for="todo in todos" v-bind:key="todo.id">

        <p v-if="todo.id !== editedTodo.id" v-on:dblclick="onEditTodo(todo)">
          <span>{{ todo.task }} </span>
          <v-btn color="error" v-on:click="onDeleteTodo(todo.id)">delete</v-btn> 
        </p>

        <p v-else>
          <v-layout row wrap>
           <v-text-field type='text' v-model="editedTodo.task" ></v-text-field>
           <v-btn color="success" v-on:click="onSave(todo.id)">Save</v-btn>
           <v-btn v-on:click="onCancel">Cancel</v-btn>
           </v-layout>
        </p>

        <v-divider></v-divider>
      </div>
    </v-flex>
  </v-list>
</div>`,

  data: function() {
    return {
      todos: [
        {
          id: 1,
          task: 'sleep',
        },
        {
          id: 2,
          task: 'eat',
        },

        {
          id: 3,
          task: 'run',
        },
      ],
      newTodo: {},
      editedTodo: {},
    };
  },

  methods: {
    addTodo: function() {
      if (this.newTodo.task) {
        // create todo object
        this.newTodo = {
          id: this.todos.length ? this.todos.slice(-1)[0].id + 1 : 1, // dynamic todo id
          task: this.newTodo.task,
        };

        this.todos = [...this.todos, this.newTodo];
        this.newTodo = {};
      }
    },
    onDeleteTodo: function(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    onEditTodo: function(todo) {
      this.editedTodo = {...todo};
    },
    onSave: function(id) {
      this.todos = this.todos.map(todo => {
        if (todo.id === id) {
          todo.task = this.editedTodo.task;
        }
        return todo;
      });
      this.editedTodo = {};
    },
    onCancel: function() {
      this.editedTodo = {};
    },
  },
});

new Vue({
  el: '#app',
});
