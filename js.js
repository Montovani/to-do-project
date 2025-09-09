//(function(){ 
const todoList = document.getElementById('cards-list')
const taskBtn = document.getElementById('submit-btn')
const listOfTasks = JSON.parse(localStorage.getItem('savedTasks')) || []
const form = document.getElementById('task-form')
let tasks = []
loadTaskName()

function getTaskNameData () {
    tasks.push(document.querySelector('#taskname').value)
    console.log(tasks)
    saveTaskName(tasks)
    //form.reset()
}

function createTaskHTMLElements () { 
    const taskCard = document.createElement('div')
    const taskTitle = document.createElement('h3')
    const taskDescription = document.createElement('p')
    displayTask (taskCard,taskTitle,taskDescription)
}

function displayTask (taskCard,taskTitle,taskDescription) {
    tasks.forEach((element) => {
        taskTitle.textContent = element
        todoList.appendChild(taskTitle)
    })
}

function saveTaskName (tasks) {
    localStorage.setItem('savedTaskName',JSON.stringify(tasks))
}
function loadTaskName () {
    if (tasks = []) {
        tasks = JSON.parse(localStorage.getItem('savedTaskName'))
        tasks.forEach((element) =>{
            const taskTitle = document.createElement('h3')
            taskTitle.textContent = element
            todoList.appendChild(taskTitle)
        })
    }
}

function createTask () {
    const taskName = document.getElementById('taskname').value;
    //console.log("task name is:" + taskName)
    const taskDescription = document.getElementById('taskdescription')
    const form = document.getElementById('task-form')
    const taskCards = document.createElement('div')
    taskCard.classList.add('task-card')

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = 'X'

    const taskTitle = document.createElement('h3')
    taskTitle.textContent = taskName.value

    const taskBody = document.createElement('p')
    taskBody.textContent = taskDescription.value
    
    todoList.appendChild(taskCard);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskBody);
    taskCard.appendChild(deleteBtn);
    
    listOfTasks.push(taskCard.outerHTML)
    saveTasks()
    form.reset()
    
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

function saveTasks() {
   localStorage.setItem('savedTasks',JSON.stringify(listOfTasks))
}

function loadSavedTasks () {
    const taskItems = document.createElement('div')
    taskItems.innerHTML = listOfTasks
    todoList.appendChild(taskItems)
}


//taskBtn.addEventListener("click", createTask);

taskBtn.addEventListener("click", getTaskNameData);
taskBtn.addEventListener("click", createTaskHTMLElements);

todoList.addEventListener("click",removeTask);

window.addEventListener('unload',function() {
    taskBtn.removeEventListener("click", createTask);
    todoList.removeEventListener("click",removeTask);
    console.log('[unload] listeners removed')
})

//})();
