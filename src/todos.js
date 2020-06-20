import uuidv4 from 'uuid/v4'

let todos = []

// Fetch existing todos from localStorage
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

// save to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
const getTodos = () => todos

const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        title: text,
        completed: false,
    })

    saveTodos()
}

// removeTodo
const removeTodo = (id) => {
    const indexTodo = todos.findIndex(todo => todo.id === id)
    if(indexTodo > -1) {
        todos.splice(indexTodo, 1)
        saveTodos()
    }
}

// toggleTodo
const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id)
    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}
// Make sure to call loadTodos and setup the exports
loadTodos()

export { getTodos, saveTodos, createTodo, removeTodo, toggleTodo, loadTodos }
