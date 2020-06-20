import { getFilters } from "./filters";
import { getTodos, toggleTodo, removeTodo } from "./todos";

const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const { searchText, hideCompleted } = getFilters()
    let filteredTodos = getTodos().filter((todo) => {
        return todo.title.toLowerCase().includes(searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter(todo => hideCompleted ? !todo.completed : todo)

    const uncompletedTodos = filteredTodos.filter(todo => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(uncompletedTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach(todo => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl =document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no To-Dos to show'
        todoEl.appendChild(messageEl)
    }
}

// generateTodoDOM
const generateTodoDOM = function (todo) {
    const todoElement = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', function () {
        toggleTodo(todo.id)
        renderTodos()
    })

    //setup the todo text
    todoText.textContent = todo.title
    containerEl.appendChild(todoText)

    // setup container
    todoElement.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoElement.appendChild(containerEl)

    // setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoElement.appendChild(removeButton)
    removeButton.addEventListener('click', function() {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoElement
}

// generateSummaryDOM
const generateSummaryDOM = (uncompletedTodos) => {
    const summary = document.createElement('h3')
    const plural = uncompletedTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')

    summary.textContent = `You have ${uncompletedTodos.length} ToDo${plural} left!`
    return summary


}

export { renderTodos, generateTodoDOM, generateSummaryDOM }
