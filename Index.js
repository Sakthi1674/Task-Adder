let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("timer").innerText = "00:00:00";
}

function updateTimer() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }
    const formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    document.getElementById("timer").innerText = formattedTime;
}

function pad(value) {
    return value < 10 ? "0" + value : value;
}

let data = [
    { category: "work", sub_category: "meeting", duration: 2, task: "frontend" },
    { category: "personal work", sub_category: "project", duration: 2, task: "backend" },
    { category: "personal work", sub_category: "meeting", duration: 2, task: "fullstack" },
    { category: "work", sub_category: "project", duration: 2, task: "low level design" },
    { category: "personal work", sub_category: "meeting", duration: 2, task: "iot automation" },
    { category: "work", sub_category: "project", duration: 2, task: "automobile" }
];

let result = data;

function eventing() {
    let element = document.querySelectorAll('select')[0];
    let elementOption = element.options[element.selectedIndex];
    let selectedValue = elementOption.value;

    if (selectedValue == 1) {
        filterByWork();
    } else if (selectedValue == 2) {
        filterByPersonalWork();
    } else if (selectedValue == 3) {
        filterByProject();
    } else if (selectedValue == 4) {
        filterByMeeting();
    } else {
        eraseTable();
        result = data;
        result.map(e => addRow(e.category, e.sub_category, e.duration, e.task));
    }
}

function filterByPersonalWork() {
    result = data.filter(e => e.category == 'personal work');
    updateTable(result);
}

function filterByWork() {
    result = data.filter(e => e.category == 'work');
    updateTable(result);
}

function filterByProject() {
    result = data.filter(e => e.sub_category == 'project');
    updateTable(result);
}

function filterByMeeting() {
    result = data.filter(e => e.sub_category == 'meeting');
    updateTable(result);
}

function addRow(category, sub_category, duration, task) {
    const tableBody = document.getElementById("myTableBody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${category}</td>
        <td>${sub_category}</td>
        <td>${duration}</td>
        <td>${task}</td>
        <td>
            <button onclick="editTask('${task}')" class="btn btn-primary">Edit</button>
            <button onclick="deleteTask('${task}')" class="btn btn-danger">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);
}

function updateTable(filteredData) {
    eraseTable();
    filteredData.forEach(e => addRow(e.category, e.sub_category, e.duration, e.task));
}

function eraseTable() {
    const tableBody = document.getElementById("myTableBody");
    tableBody.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", function () {
    result.forEach(e => addRow(e.category, e.sub_category, e.duration, e.task));
});

document.addEventListener("submit", function (e) {
    e.preventDefault();
    const obj = {
        category: document.getElementById("category").value,
        sub_category: document.getElementById("sub_category").value,
        duration: document.getElementById("duration").value,
        task: document.getElementById("task").value
    };

    data.push(obj);
    updateTable(data);

    clearForm();
});

function addOrUpdateTask() {
    const category = document.getElementById("category").value;
    const subCategory = document.getElementById("sub_category").value;
    const duration = document.getElementById("duration").value;
    const task = document.getElementById("task").value;

    const taskObj = {
        category,
        subCategory,
        duration,
        task
    };

    const index = data.findIndex(t => t.task === task);
    if (index !== -1) {
        data[index] = taskObj;
    } else {
        data.push(taskObj);
    }

    updateTable(data);
    clearForm();
}

function editTask(task) {
    const taskObj = data.find(t => t.task === task);
    if (taskObj) {
        document.getElementById("category").value = taskObj.category;
        document.getElementById("sub_category").value = taskObj.subCategory;
        document.getElementById("duration").value = taskObj.duration;
        document.getElementById("task").value = taskObj.task;
        
        document.getElementById("addTaskBtn").classList.add("d-none");
        document.getElementById("updateTaskBtn").classList.remove("d-none");
        document.getElementById("deleteTaskBtn").classList.remove("d-none");
        document.getElementById("startTimerBtn").classList.add("d-none");
    }
}

function deleteTask(task) {
    const index = data.findIndex(t => t.task === task);
    if (index !== -1) {
        data.splice(index, 1);
        updateTable(data);
        clearForm();
    }
}

function clearForm() {
    document.getElementById("category").value = "";
    document.getElementById("sub_category").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("task").value = "";

    document.getElementById("addTaskBtn").classList.remove("d-none");
    document.getElementById("updateTaskBtn").classList.add("d-none");
    document.getElementById("deleteTaskBtn").classList.add("d-none");
    document.getElementById("startTimerBtn").classList.remove("d-none");
}

document.getElementById("addTaskBtn").addEventListener("click", (e) => {
    e.preventDefault();
    addOrUpdateTask();
});

document.getElementById("updateTaskBtn").addEventListener("click", (e) => {
    e.preventDefault();
    addOrUpdateTask();
});

document.getElementById("deleteTaskBtn").addEventListener("click", (e) => {
    e.preventDefault();
    deleteTask(document.getElementById("task").value);
});

document.getElementById("startTimerBtn").addEventListener("click", (e) => {
    e.preventDefault();
    startTimer();
});

document.getElementById("stopTimerBtn").addEventListener("click", (e) => {
    e.preventDefault();
    stopTimer();
});

document.getElementById("resetTimerBtn").addEventListener("click", (e) => {
    e.preventDefault();
    resetTimer();
});

startTimer();
