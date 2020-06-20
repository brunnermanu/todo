import { renderTodos } from "./views";
import { createTodo, loadTodos, saveTodos} from "./todos";
import { setFilters } from "./filters";


renderTodos()

document.querySelector('#search-todo').addEventListener('input', function (e) {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#todo-form').addEventListener('submit', function (e) {
    const text = e.target.elements.addTodo.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.addTodo.value = ''
    }
})

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})
