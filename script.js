document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
	updateDate();
    setInterval(updateDate, 1000); 
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const taskText = taskInput.value.trim();

        // Create li element
        const li = document.createElement('li');
        li.innerHTML = `
            ${taskText}
            <span class="delete" onclick="removeTask(this)">X</span>
        `;

        // Append li to ul
        taskList.appendChild(li);

        // Save tasks to local storage
        saveTasks();

        // Clear input
        taskInput.value = '';
    }
}

function removeTask(element) {
    const taskList = document.getElementById('taskList');
    const li = element.parentElement;

    // Remove li from ul
    taskList.removeChild(li);

    // Save tasks to local storage
    saveTasks();
}

function clearTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(li => li.innerText);

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${taskText}
            <span class="delete" onclick="removeTask(this)">X</span>
        `;
        taskList.appendChild(li);
    });

	// Update the date
	updateDate();
}

function updateDate() {
    const dateElement = document.querySelector('h5');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

    dateElement.innerText = `${currentDate.toLocaleDateString(undefined, options)}`;
}