{
    let tasks = [];

    const markTask = (taskIndex) => {
        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !tasks[taskIndex].done } : task);

        render();
    };

    const addTask = (content) => {
        if (content === "") return;

        tasks = [...tasks, { content: content }]
    };

    const removeTask = (taskIndex) => {
        tasks = tasks.filter((task, index) => index !== taskIndex);

        render();
    };

    const bindMarkEvents = () => {
        const markButtons = document.querySelectorAll(".js-markButton");

        markButtons.forEach((markButton, taskIndex) => {
            markButton.addEventListener("click", () => {
                markTask(taskIndex);
            });
        });
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__listItem">
                <button class="list__button js-markButton">${task.done ? "&#10004" : ""}</button>
                <p class = "list__paragragh" ${task.done ? "style = \"text-decoration: line-through\"" : ""}>${task.content}</p>
                <button class = "list__button list__button--second js-removeButton">🗑️</button>
            </li>
            `;
        };

        document.querySelector(".js-taskList").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlString = "";

        if (tasks.length > 0) {
            htmlString = `
        <button class="header__button">Finish all</button>
        <button class="header__button">Hide finished</button>
        `
        };

        document.querySelector(".js-buttonsContainer").innerHTML = htmlString;

    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindMarkEvents();
        bindRemoveEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-newTask");

        addTask(newTask.value.trim());

        render();

        newTask.value = "";
    };

    const init = () => {
        const form = document.querySelector(".js-form")

        render();

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}