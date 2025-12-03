document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function
    function addTask() {
        
        // 1. Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // 2. Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Stop the function if the input is empty
        }

        // --- Task Creation and Removal Logic ---
        
        // Create a new li element.
        const listItem = document.createElement('li');
        // Set its textContent to the taskText.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set its textContent to "Remove".
        removeButton.textContent = "Remove";
        // Give it a class name of 'remove-btn'.
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Removes the li element (listItem) from taskList (the parent <ul>)
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        
        // Append the li to taskList (makes it visible on the page)
        taskList.appendChild(listItem);
        
        // Clear the task input field
        taskInput.value = "";
    }

    // Attach Event Listeners

    // Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the ‘keypress’ event 
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to ‘Enter’ before calling addTask
        if (event.key === 'Enter') {
            addTask();
        }
    });

});