<template>
  <div class="todo">
    <h1>Todo App</h1>
    <div>
      <input type="text" v-model="input" @keyup="inputTodo" />
      <button type="button" @click="addTodo">
        {{ editTodo ? 'Edit' : 'Add' }}
      </button>
    </div>
    <div>
      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <input type="checkbox" v-model="todo.completed" />
          <span @dblclick="modifyTodo(todo)">{{ todo.text }}</span>
          <button type="button" @click="removeTodo(todo)">delete</button>
        </li>
      </ul>
    </div>
    <div>
      <button type="button" @click="showAll">All</button>
      <button type="button" @click="showActive">Active</button>
      <button type="button" @click="showCompleted">Completed</button>
      <button
        type="button"
        @click="removeCompleted"
        v-show="todos.length > remaining"
      >
        Clear completed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      input: '',
      todos: [],
      visibility: 'all',
      editTodo: null
    }
  },
  methods: {
    addTodo() {
      if (!this.input.trim()) return

      if (this.editTodo) {
        const todo = this.todos.find(todo => todo.id === this.editTodo.id)
        todo.text = this.input
        this.input = ''
        this.editTodo = null
        return
      }

      this.todos.push({
        completed: false,
        id: `todo-${Date.now()}`,
        text: this.input
      })
      this.input = ''
    },
    inputTodo(event) {
      if (event.key === 'Enter') {
        this.addTodo()
      }
    },
    modifyTodo(todo) {
      this.editTodo = todo
      this.input = todo.text
    },
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    showAll() {
      this.visibility = 'all'
    },
    showActive() {
      this.visibility = 'active'
    },
    showCompleted() {
      this.visibility = 'completed'
    },
    removeCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    filteredTodos() {
      if (this.visibility === 'all') {
        return this.todos
      } else if (this.visibility === 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else if (this.visibility === 'completed') {
        return this.todos.filter(todo => todo.completed)
      } else {
        return []
      }
    }
  }
}
</script>
