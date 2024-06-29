const textinput = document.getElementById('taskInput');
const btn = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// modal element
const editmodal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const closeModal = document.getElementById('closeModal');
const saveEditButton = document.getElementById('saveEditButton');


const mainContent = document.getElementById('main-content');

let currentEditTask = null;


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
            currentEditTask = taskItem;
            editInput.value = taskspan.textContent;
            editmodal.style.display = 'block';
            mainContent.classList.add('blur');
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


// Modal Close Button
closeModal.addEventListener('click',()=>{
    editmodal.classList.add('fade-out');
    setTimeout(()=>{
        editmodal.style.display = 'none';
        editmodal.classList.remove('fade-out');
        mainContent.classList.remove('blur');
    },500);
    
});


saveEditButton.addEventListener('click',()=>{
    if(currentEditTask){
        const tasks = getTasksFromLocalStorage();
        const oldTaskText = currentEditTask.querySelector('span').textContent;
        const newTaskText = editInput.value.trim();
        if(newTaskText !== ""){
            const taskIndex = tasks.indexOf(oldTaskText);
            if(taskIndex > -1){
                tasks[taskIndex] = newTaskText;
                saveTasksToLocalStorage(tasks);
            }
            currentEditTask.querySelector('span').textContent = newTaskText;
            editmodal.style.display = 'none';
            mainContent.classList.remove('blur');
        }
    }
});




window.addEventListener('click', (event) => {
    if (event.target == editmodal) {
        editmodal.classList.add('fade-out');
        setTimeout(() => {
            editmodal.style.display = 'none';
            editmodal.classList.remove('fade-out');
            mainContent.classList.remove('blur'); 
        }, 500);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        editmodal.classList.add('fade-out');
        setTimeout(() => {
            editmodal.style.display = 'none';
            editmodal.classList.remove('fade-out');
            mainContent.classList.remove('blur'); 
        }, 500);
    }
});