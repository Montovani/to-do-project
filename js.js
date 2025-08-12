let taskName = document.getElementById('taskname');
let taskDescription = document.getElementById('taskdescription')
let todoList = document.getElementById('cards-list')
const taskBtn = document.getElementById('submit-btn')
const form = document.getElementById('task-form')

function clickedButton () {
    let taskDiv = document.createElement('div')
    taskDiv.classList.add('task-card')
    let xBtn = document.createElement('button')
    xBtn.classList.add('exclude-btn')
    xBtn.innerHTML = 'X'
    const nameTask = document.createElement('h3')
    nameTask.textContent = taskName.value
    let descriptionTask = document.createElement('p')
    descriptionTask.textContent = taskName.value
    
    todoList.appendChild(taskDiv);
    taskDiv.appendChild(nameTask);
    taskDiv.appendChild(descriptionTask);
    taskDiv.appendChild(xBtn);
    form.reset()
    
}

taskBtn.addEventListener("click", clickedButton);
