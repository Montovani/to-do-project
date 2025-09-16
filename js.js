(function(){ 
const todoListElement = document.getElementById('cards-list')
const taskBtn = document.getElementById('submit-btn')
const form = document.getElementById('task-form')
const LOCAL_STORAGE_TODO_LIST_NAME = 'mainTodoPage:TodoList'
const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_LIST_NAME)) || []
loadTaskName(tasks)

function loadTaskName (taskList) {
        displayTodos(taskList)
    }

function addNewTaskToTodos (task) {
    const taskName = document.querySelector('#taskname')?.value
    if (taskName) {
        task.push(taskName)
        saveTaskName(task)
        todoListElement.appendChild(createCard(taskName))
        form.reset()
    } else {
        alert('Please write your task before adding')
    }
}

function saveTaskName (task) {
    localStorage.setItem(LOCAL_STORAGE_TODO_LIST_NAME,JSON.stringify(task))
}


function createCard (task) {
        const taskCard = document.createElement('div')
        taskCard.classList.add('task-card')
        const taskTitle = document.createElement('h3')
        taskTitle.textContent = task
        const taskDescription = document.createElement('p')
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerHTML = 'X'

        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(deleteBtn);
        //createEventListener(deleteBtn) - Another option is to create the event listener for each deleteBtn see the function bellow
        return  taskCard
}

function displayTodos (todoList) {
    const  todoElements = todoList.map((element) => createCard(element))
    console.log(todoElements)
    todoListElement.innerHTML = ''
    todoListElement.append(...todoElements)
}

//In case you want to use this function to create an event listener for each card.
function createEventListener (newDeleteBtn) {
    newDeleteBtn.addEventListener('click', (e) => {
        const index = tasks.findIndex((element) => element === e.target.previousSibling.previousSibling.textContent)
        console.log('index found: ' + index)
        tasks.splice(index,1)
        console.log(tasks)
        saveTaskName(tasks)
        e.target.parentNode.remove()
})
}

function removeTask (e){
    if (e.target.classList.contains('delete-btn')) {
        const index = tasks.findIndex((element) => element === e.target.previousSibling.previousSibling.textContent)
        console.log('index found: ' + index)
        tasks.splice(index,1)
        console.log(tasks)
        saveTaskName(tasks)
        e.target.parentNode.remove()
    }
}

taskBtn.addEventListener("click", () => addNewTaskToTodos(tasks));
todoListElement.addEventListener("click", removeTask);

window.addEventListener('unload',function() {
    taskBtn.removeEventListener("click", () => addNewTaskToTodos(tasks));
    todoListElement.removeEventListener("click",removeTask);
    console.log('[unload] listeners removed')
})

})();
