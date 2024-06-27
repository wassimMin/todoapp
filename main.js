const textinput = document.getElementById('taskInput');
const btn = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');


btn.addEventListener('click',()=>{
    if(textinput.value.trim() !== ""){
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        const taskText = document.createElement('span');
        taskText.textContent = textinput.value;

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit edit-icon';
        editIcon.addEventListener('click',()=>{
            // edit function
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash delete-icon';
        deleteIcon.addEventListener('click',()=>{
            // delete function
        });

        taskItem.appendChild(taskText);
        taskItem.appendChild(editIcon);
        taskItem.appendChild(deleteIcon);
        
        taskList.appendChild(taskItem);
        textinput.value = "";
    }
});