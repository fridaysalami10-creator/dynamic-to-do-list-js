// Wait for the HTML document to fully load
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim text inside the input field
        const taskText = taskInput.value.trim();

        // If empty, warn the user
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new list item <li>
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Event: remove the task when clicking the remove button
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Add the remove button to <li>
        li.appendChild(removeBtn);

        // Add the <li> to the <ul>
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Event listener: add task when button is clicked
    addButton.addEventListener('click', addTask);

    // Event listener: add task when pressing Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // ❗ Instruction says: invoke addTask on DOMContentLoaded
    // (Although unusual, we must follow instructions)
    // This will add an empty check — so nothing will happen
    addTask();
});
