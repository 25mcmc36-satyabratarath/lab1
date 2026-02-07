var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["Completed"] = 1] = "Completed";
})(Status || (Status = {}));
var Task = /** @class */ (function () {
    function Task(title, due) {
        this.title = title;
        this.due = due;
        this.state = Status.Pending;
    }
    Task.prototype.toggle = function () {
        this.state =
            this.state === Status.Pending
                ? Status.Completed
                : Status.Pending;
    };
    return Task;
}());
var tasks = [];
function addTask() {
    var nameInput = document.getElementById("tname");
    var dateInput = document.getElementById("tdate");
    if (nameInput.value === "" || dateInput.value === "")
        return;
    var t = new Task(nameInput.value, new Date(dateInput.value));
    tasks.push(t);
    tasks.sort(function (a, b) { return a.due.getTime() - b.due.getTime(); });
    nameInput.value = "";
    dateInput.value = "";
    showTasks();
}
function showTasks() {
    var ul = document.getElementById("list");
    ul.innerHTML = "";
    tasks.forEach(function (t, index) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerText =
            t.title + " (" + t.due.toDateString() + ")";
        if (t.state === Status.Completed)
            span.className = "done";
        span.onclick = function () {
            t.toggle();
            showTasks();
        };
        var del = document.createElement("button");
        del.innerText = "X";
        del.onclick = function () {
            tasks.splice(index, 1);
            showTasks();
        };
        li.appendChild(span);
        li.appendChild(del);
        ul.appendChild(li);
    });
}
