
let students = [];

document.getElementById("studentForm")
.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name should contain letters only!");
    return;
}

if (!/^[0-9]+$/.test(roll)) {
    alert("Roll number should contain numbers only!");
    return;
}

    let m1 = Number(document.getElementById("m1").value);
    let m2 = Number(document.getElementById("m2").value);
    let m3 = Number(document.getElementById("m3").value);

    if (!name || !roll ||
        [m1, m2, m3].some(m => m < 0 || m > 100)) {
        alert("Enter valid details and marks from 0 to 100.");
        return;
    }

    if (students.some(s => s.roll === roll)) {
        alert("Roll number already exists!");
        return;
    }

    let total = m1 + m2 + m3;
    let percentage = (total / 300) * 100;

    let result = [m1, m2, m3].every(m => m >= 35)
        ? "Pass" : "Fail";

    let student = {
        name, roll, total, percentage, result
    };

    students.push(student);
    displayStudents();

    document.getElementById("studentForm").reset();
});

function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(function(s) {
        let row = table.insertRow();

        row.insertCell().textContent = s.name;
        row.insertCell().textContent = s.roll;
        row.insertCell().textContent = s.total;
        row.insertCell().textContent =
            s.percentage.toFixed(2) + "%";
        row.insertCell().textContent = s.result;
    });

    let topper = students.reduce(function(best, current) {
        return current.total > best.total ? current : best;
    });

    document.getElementById("topper").textContent =
        "Topper: " + topper.name +
        " (Roll No: " + topper.roll +
        ", Total: " + topper.total + "/300)";
}
