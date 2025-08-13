let taskName = document.getElementById('taskname');
let taskDescription = document.getElementById('taskdescription')
let todoList = document.getElementById('cards-list')
const taskBtn = document.getElementById('submit-btn')
const form = document.getElementById('task-form')

function createTask () {
    let taskCard = document.createElement('div')
    taskCard.classList.add('task-card')
    let excludeBtn = document.createElement('button')
    excludeBtn.classList.add('exclude-btn')
    excludeBtn.innerHTML = 'X'
    const taskTitle = document.createElement('h3')
    taskTitle.textContent = taskName.value
    let taskBody = document.createElement('p')
    taskBody.textContent = taskDescription.value
    
    todoList.appendChild(taskCard);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskBody);
    taskCard.appendChild(excludeBtn);
    form.reset()
    
}
function removeTask (e){
    if (e.target.classList.contains('exclude-btn')) {
        e.target.closest('.task-card').remove();
    }
}
taskBtn.addEventListener("click", createTask);
todoList.addEventListener("click",removeTask);