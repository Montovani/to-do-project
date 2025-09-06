(function(){ 
const todoList = document.getElementById('cards-list')
const taskBtn = document.getElementById('submit-btn')
const listOfTasks = JSON.parse(localStorage.getItem('savedTasks')) || []
loadSavedTasks()

function createTask () {
    const taskName = document.getElementById('taskname');
    const taskDescription = document.getElementById('taskdescription')
    const form = document.getElementById('task-form')
    const taskCard = document.createElement('div')
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


taskBtn.addEventListener("click", createTask);
todoList.addEventListener("click",removeTask);

window.addEventListener('unload',function() {
    taskBtn.removeEventListener("click", createTask);
    todoList.removeEventListener("click",removeTask);
    console.log('[unload] listeners removed')
})
})();
