(function(){ 
const todoList = document.getElementById('cards-list')
const taskBtn = document.getElementById('submit-btn')
const listOfTasks = JSON.parse(localStorage.getItem('savedTasks')) || []
const form = document.getElementById('task-form')
let tasks = []
loadTaskName()

function loadTaskName () {
    if (tasks = []) {
        tasks = JSON.parse(localStorage.getItem('savedTaskName'))
        addDataToCard()
        }
    }

function getTaskNameData () {
    const inputPlace = document.querySelector('#taskname')
    if (inputPlace.value !== '') {
    tasks.push(inputPlace.value)
    console.log(tasks)
    form.reset()
    } else {
        alert('Please write your task before adding')
    }
    saveTaskName(tasks)
    addDataToCard()
    form.reset()
}

function saveTaskName (tasks) {
    localStorage.setItem('savedTaskName',JSON.stringify(tasks))
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

        todoList.appendChild(taskCard);
        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDescription);
        taskCard.appendChild(deleteBtn);
}

function addDataToCard () {
    tasks.forEach((element) => {
        createCard(element)
    })
}

function removeTask (e){
    if (e.target.classList.contains('delete-btn')) {
        for (let i in listOfTasks ){
            listOfTasks.splice(i,1)
            e.target.closest('.task-card').remove()
            
        }
        saveTasks()
    }
}

taskBtn.addEventListener("click", getTaskNameData);
todoList.addEventListener("click",removeTask);

window.addEventListener('unload',function() {
    taskBtn.removeEventListener("click", createTask);
    todoList.removeEventListener("click",removeTask);
    console.log('[unload] listeners removed')
})

})();
