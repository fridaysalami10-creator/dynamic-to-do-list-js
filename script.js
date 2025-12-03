document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- LOCAL STORAGE FUNCTIONS ---

    // 1. Function to save the tasks array to browser's local storage
    function saveTasks(tasksArray) {
        // localStorage only stores strings, so we convert the array to JSON string
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    // 2. Function to retrieve tasks from browser's local storage
    function loadTasks() {
        // Get the string, or an empty array if nothing is found
        const storedTasks = localStorage.getItem('tasks');
        const tasks = storedTasks ? JSON.parse(storedTasks) : [];
        
        // Loop through the retrieved tasks and display them on the page
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // 3. Helper function to get text of all tasks currently in the DOM
    function getTasksFromDOM() {
        const tasks = [];
        // Loop through all <li> elements in the task list
        taskList.querySelectorAll('li').forEach(li => {
            // Get the text content, removing the 'Remove' button text
            const taskText = li.firstChild.textContent.trim();
            tasks.push(taskText);
        });
        return tasks;
    }


    // --- CORE TASK MANIPULATION ---
    
    // Function to create the HTML element for a task (used by both load and add)
    function createTaskElement(taskText) {
        // Create <li> and set text content
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Attach removal logic
        removeButton.onclick = function() {
            // DOM Manipulation: Remove element from the list
            taskList.removeChild(listItem);
            
            // Local Storage: Update storage after removal
            const updatedTasks = getTasksFromDOM();
            saveTasks(updatedTasks);
        };

        // Assemble the task item
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }


    // Function to handle adding a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // 1. DOM Manipulation: Create and add the element
        createTaskElement(taskText);

        // 2. Local Storage: Update the stored list
        const currentTasks = getTasksFromDOM();
        saveTasks(currentTasks);
        
        // 3. Clean up
        taskInput.value = "";
    }


    // --- INITIALIZATION ---
    
    // Attach Event Listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Run the load function to display any saved tasks when the page loads
    loadTasks();
});