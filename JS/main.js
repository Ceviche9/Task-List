const input = document.querySelector('.input');
const addBtn = document.querySelector('.addBtn');
const task = document.querySelector('.task');

input.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!input.value) return;
        createTask(input.value);
        clearInput();
    }
})

function createTask(Task) {
    const Li = document.createElement('Li');
    Li.innerText = Task;
    task.appendChild(Li);
    btnClear(Li);
    saveTask();
}

addBtn.addEventListener('click', function() {
    if (!input.value) return;
    createTask(input.value);
    clearInput();
});

function clearInput() {
    input.value = '';
    input.focus();
}

function btnClear(Li) {

    Li.innerText += ' ';
    const btnClear = document.createElement('button');
    btnClear.innerText = 'Apagar';
    btnClear.setAttribute('Class', 'Apagar')
    Li.appendChild(btnClear);

}

document.addEventListener('click',function(e) {
    const el = e.target;
    
    if (el.classList.contains('Apagar')) {
        el.parentElement.remove();
        saveTask(); 
    }
})

function saveTask(){
    const liTasks = task.querySelectorAll('Li');
    const List = [];
    for (let tasks of liTasks) {
       let taskText = tasks.innerText;
       taskText = taskText.replace('Apagar', '').trim();
       //Adicionando as tasks na lista.
       List.push(taskText);
      
    }

    const taskJson = JSON.stringify(List)
    localStorage.setItem('Tasks', taskJson);

}

function savedTasks(){

   const tasks = localStorage.getItem('Tasks');
   const List = JSON.parse(tasks);
   for (let tasks of List){
    createTask(tasks);
   } 
}

savedTasks();