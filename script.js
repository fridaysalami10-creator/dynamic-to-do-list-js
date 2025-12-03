// Run code after the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements by ID (naming must match the HTML)
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * addTask
     * Adds a new task to the task list if the input is not empty.
     * @param {boolean} suppressAlert - when true, do not show alert on empty input (used on page load)
     */
    function addTask(suppressAlert = false) {
        // Read and trim the input value
        const taskText = taskInput.value.trim();

        // If the input is empty, optionally alert the user and exit
        if (taskText === "") {
            if (!suppressAlert) {
                alert("Please enter a task!");
            }
            return;
        }

        // Create a new <li> and set its text content
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button, set its text and class name (no classList.add)
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // When the remove button is clicked, remove the corresponding <li> from the list
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the <li>
        li.appendChild(removeBtn);

        // Append the <li> to the task list <ul>
        taskList.appendChild(li);

        // Clear the input field for the next task
        taskInput.value = "";
    }

    // Add click event to the Add Task button
    addButton.addEventListener('click', function () {
        addTask(false); // false => allow alert if input empty
    });

    // Add keypress event to the input so Enter adds the task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(false); // false => allow alert if input empty
        }
    });

    // Invoke addTask on DOMContentLoaded as requested, but suppress alert so user isn't disturbed
    addTask(true); // true => suppress alert on empty input during page load
});
