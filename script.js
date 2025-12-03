// Wait for the HTML document to fully load
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim input text

        // If input is empty
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create a new <li>
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';  // Add class name

        // On click → remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Add button to li
        li.appendChild(removeBtn);

        // Add li to task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Add task when button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when pressing Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
