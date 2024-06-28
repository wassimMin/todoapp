const textinput = document.getElementById('taskInput');
const btn = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');


// save tasks to local storage 
function saveTasksToLocalStorage(tasks){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


//  fetch the tasks from local storage
function getTasksFromLocalStorage(){
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function addTaskToDOM(taskText){
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const taskspan = document.createElement('span');
        taskspan.textContent = taskText;

        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit edit-icon';
        editIcon.addEventListener('click',()=>{
            // edit function
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash delete-icon';
        deleteIcon.addEventListener('click',()=>{
            taskList.removeChild(taskItem);
            const tasks = getTasksFromLocalStorage();
            const updatedTasks = tasks.filter(task => task !== taskText);
            saveTasksToLocalStorage(updatedTasks);
        });

        iconContainer.appendChild(editIcon);
        iconContainer.appendChild(deleteIcon);

        taskItem.appendChild(taskspan);
        taskItem.appendChild(iconContainer);
        
        taskList.appendChild(taskItem);
        textinput.value = "";
    }


document.addEventListener('DOMContentLoaded',()=>{
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
});



btn.addEventListener('click',()=>{
    const taskText = textinput.value.trim();
    if(taskText!== ""){
        addTaskToDOM(taskText);
        const tasks = getTasksFromLocalStorage();
        tasks.push(taskText);
        saveTasksToLocalStorage(tasks);
        textinput.value = "";
    }
});