(function(){ 
const todoListElement = document.getElementById('cards-list')
const taskBtn = document.getElementById('submit-btn')
const form = document.getElementById('task-form')
const LOCAL_STORAGE_TODO_LIST_NAME = 'mainTodoPage:TodoList'
const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_LIST_NAME)) || []
loadTaskName()

function loadTaskName () {
        displayTodos(tasks)
    }

function addNewTaskToTodos () {
    const taskName = document.querySelector('#taskname')?.value
    if (taskName) {
        tasks.push(taskName)
        console.log(tasks)
        console.log(taskName)
        saveTaskName(tasks)
        todoListElement.appendChild(createCard(taskName))
        form.reset()
    } else {
        alert('Please write your task before adding')
    }
}

function saveTaskName (tasks) {
    localStorage.setItem(LOCAL_STORAGE_TODO_LIST_NAME,JSON.stringify(tasks))
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
        return  taskCard
}

function displayTodos (todoList) {
    const  todoElements = todoList.map((element) => createCard(element))
    console.log(todoElements)
    todoListElement.innerHTML = ''
    todoListElement.append(...todoElements)
    //todoElements.forEach((element) => todoListElement.appendChild(element)) - Another way I thought that could work.
}

function removeTask (e){
    if (e.target.classList.contains('delete-btn')) {
        for (let i in tasks ){
            i = tasks.findIndex((element) => element === e.target.previousSibling.previousSibling.textContent)
            console.log('index found: ' + i)
            tasks.splice(i,1)
            console.log(tasks)
            saveTaskName(tasks)
            e.target.closest('.task-card').remove()
            
        }
    }
}

taskBtn.addEventListener("click", addNewTaskToTodos);
todoListElement.addEventListener("click",removeTask);

window.addEventListener('unload',function() {
    taskBtn.removeEventListener("click", addNewTaskToTodos);
    todoListElement.removeEventListener("click",removeTask);
    console.log('[unload] listeners removed')
})

})();
