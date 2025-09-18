document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("inputValue")
    const addTaskBtn = document.getElementById("addTask")
    const taskList = document.getElementById("todoList")

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach((task) => renderTask(task));

    addTaskBtn.addEventListener("click", () => {
        const taskText = userInput.value.trim()
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }

        tasks.push(newTask)
        saveTask()
        renderTask(newTask)
        userInput.value = ""

    })

    function renderTask(task) {
        const li = document.createElement('li')
        const dltBtn = document.createElement('button')
        if (task.completed) li.classList.add('completed');
        dltBtn.style.display = "flex"
        dltBtn.style.color = "white"
        dltBtn.style.borderRadius = "5px"
        dltBtn.style.cursor = "pointer"
        dltBtn.style.padding = "5px 6px 5px 6px"
        dltBtn.style.backgroundColor = "#6D94C5"
        dltBtn.style.fontSize = "13px"
        dltBtn.style.flexShrink = "0"
        dltBtn.addEventListener('mouseenter', () => {
            dltBtn.style.backgroundColor = "grey"
        })
        dltBtn.addEventListener('mouseleave', () => {
            dltBtn.style.backgroundColor = "#6D94C5"
        })
        dltBtn.textContent = "Delete"
        li.style.display = "flex"
        li.style.marginTop = "10px"
        li.style.alignItems = "center"
        li.style.justifyContent = "space-between"
        li.style.color = "white"
        li.style.wordBreak = "break-word"
        li.style.gap = "10px"
        
        li.textContent = task.text
        li.appendChild(dltBtn)

        li.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.completed = !task.completed
            li.classList.toggle('completed')
            saveTask()
        })
        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id)
            li.remove()
            saveTask()
        })
        taskList.appendChild(li)
        console.log(tasks)
    }

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
})

