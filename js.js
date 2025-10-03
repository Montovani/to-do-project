(function(){ 
const todoListElement = document.getElementById('cards-list')
const taskBtn = document.getElementById('submit-btn')
const LOCAL_STORAGE_TODO_LIST_NAME = 'mainTodoPage:TodoList'
const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_LIST_NAME)) || []
console.log(tasks)
loadTasksData(tasks)

function loadTasksData (taskList) {
        displayTodos(taskList)
    }

function addNewTaskToTodos (tasksData) {
    const taskName = document.querySelector('#taskname')?.value
    const taskDesc = document.querySelector('#taskdescription')?.value
    const form = document.getElementById('task-form')
    if (taskName) {
        const taskObject = {taskName,taskDesc}
        tasksData.push(taskObject)
        saveTasksData(tasksData)
        todoListElement.appendChild(createCard({taskName,taskDesc}))
        form.reset()
    } else {
        alert('Please write your task name before adding')
    }
}

function saveTasksData (tasksData) {
    localStorage.setItem(LOCAL_STORAGE_TODO_LIST_NAME,JSON.stringify(tasksData))
}


function createCard ({taskName,taskDesc}) {
        const taskCard = document.createElement('div')
        taskCard.classList.add('task-card')
        const taskTitle = document.createElement('h3')
        taskTitle.textContent = taskName
        const taskDescription = document.createElement('p')
        taskDescription.textContent = taskDesc
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
}

function removeTask (e){
    if (e.target.classList.contains('delete-btn')) {
        const cardList = e.target.parentNode
        const index = [...e.currentTarget.children].indexOf(cardList)
        console.log('index found: ' + index)
        tasks.splice(index,1)
        console.log(tasks)
        saveTasksData(tasks)
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
