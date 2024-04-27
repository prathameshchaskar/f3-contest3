document.addEventListener("DOMContentLoaded", function () {
    const addItemForm = document.getElementById("addItemForm");
    const itemNameInput = document.getElementById("itemName");
    const itemDateInput = document.getElementById("itemDate");
    const itemPriorityInput = document.getElementById("itemPriority");
    const todayTasksContainer = document.getElementById("todayTasks");
    const futureTasksContainer = document.getElementById("futureTasks");
    const completedTasksContainer = document.getElementById("completedTasks");

    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

    // Function to render tasks
    function renderTasks() {
        todayTasksContainer.innerHTML = "";
        futureTasksContainer.innerHTML = "";
        completedTasksContainer.innerHTML = "";

        todoList.forEach(task => {
            const taskElement = createTaskElement(task);
            if (isToday(new Date(task.date)) && !task.completed) {
                todayTasksContainer.appendChild(taskElement);
            } else if (new Date(task.date) > new Date() || !task.completed) {
                futureTasksContainer.appendChild(taskElement);
            } else if (task.completed) {
                completedTasksContainer.appendChild(taskElement);
            }
        });
    }

    // Function to create task element
    function createTaskElement(task) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (isToday(new Date(task.date)) && !task.completed) {
            taskElement.classList.add("red-border");
        }
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const itemName = document.createElement("h3");
        itemName.textContent = task.name;

        const itemDate = document.createElement("p");
        itemDate.textContent = task.date;

        const itemPriority = document.createElement("p");
        itemPriority.textContent = task.priority;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(task);
        });

        const tickButton = document.createElement("button");
        tickButton.textContent = task.completed ? "Mark Incomplete" : "Mark Complete";
        tickButton.addEventListener("click", function () {
            toggleCompletion(task);
        });

        taskElement.appendChild(itemName);
        taskElement.appendChild(itemDate);
        taskElement.appendChild(itemPriority);
        taskElement.appendChild(deleteButton);
        taskElement.appendChild(tickButton);

        return taskElement;
    }

    // Function to add task
    addItemForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newItem = {
            name: itemNameInput.value,
            date: itemDateInput.value,
            priority: itemPriorityInput.value,
            completed: false
        };

        todoList.push(newItem);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderTasks();

        addItemForm.reset();
    });

    // Function to delete task
    function deleteTask(task) {
        todoList = todoList.filter(item => item !== task);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderTasks();
    }

    // Function to toggle completion status
    function toggleCompletion(task) {
        task.completed = !task.completed;
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderTasks();
    }

    // Function to check if date is today
    function isToday(someDate) {
        const today = new Date();
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear();
    }

    // Initial rendering of tasks
    renderTasks();
});
