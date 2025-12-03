document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Helper function to update Local Storage
    function saveTasks(currentTasks) {
        // Takes the current array of tasks, converts it to a JSON string, and saves it
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
    }
    
    // Helper function to get the current tasks from Local Storage
    function getTasks() {
        // Retrieve the JSON string, or default to an empty array if nothing is found
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Function to handle the removal of a task
    function removeTask(taskTextToRemove) {
        // 1. Get the current list of tasks from storage
        let storedTasks = getTasks();

        // 2. Filter the array to create a new array without the task that was just removed from the DOM
        storedTasks = storedTasks.filter(task => task !== taskTextToRemove);

        // 3. Save the new array back to Local Storage
        saveTasks(storedTasks);
    }
    
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
            // Get the raw text of the task before DOM removal
            const textToSave = listItem.firstChild.textContent.trim(); 
            
            // 1. Remove from DOM
            taskList.removeChild(listItem);
            
            // 2. Remove from Local Storage (Persistence)
            removeTask(textToSave);
        };

        // Assemble the task item
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    // Core function to add a task, with optional save parameter
    function addTask(taskText, save = true) {
        // Validation (only check if called from the input, i.e., save is true)
        if (taskText === "") {
            if (save) {
                alert("Please enter a task.");
            }
            return;
        }

        // 1. DOM Manipulation: Create and add the element
        createTaskElement(taskText);

        // 2. Persistence Check: Only save if the task is new (not being loaded from storage)
        if (save) {
            let storedTasks = getTasks();
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }
    }
    
    // Function to load tasks from Local Storage when the page loads (REQUIRED FUNCTION)
    function loadTasks() {
        const storedTasks = getTasks();
        
        // Loop through the retrieved tasks and add them to the DOM
        storedTasks.forEach(taskText => {
            // Pass 'false' to addTask to prevent re-saving tasks already loaded from storage
            addTask(taskText, false); 
        });
    }


    // --- Event Listeners and Initialization ---

    // Event handler for user input from the button
    addButton.addEventListener('click', function() {
        const textFromInput = taskInput.value.trim();
        addTask(textFromInput, true); // Read from input, save=true
        taskInput.value = ""; // Clear input after successful add
    });

    // Event handler for 'Enter' key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const textFromInput = taskInput.value.trim();
            addTask(textFromInput, true); // Read from input, save=true
            taskInput.value = ""; // Clear input after successful add
        }
    });

    // Invoke Load Function (REQUIRED INVOCATION)
    loadTasks();
});