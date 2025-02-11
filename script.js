const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const progressBar = document.getElementById("progress-bar");
const progressPercentage = document.getElementById("progress-percentage");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for '×' (delete symbol)
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateProgress();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
    updateProgress();
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateProgress();
}

function updateProgress() {
    let tasks = document.querySelectorAll("ul li");
    let completedTasks = document.querySelectorAll("ul li.checked");
    let progress = tasks.length ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
    progressBar.style.width = progress + "%";
    progressPercentage.innerText = progress + "%";
}

showTask();
