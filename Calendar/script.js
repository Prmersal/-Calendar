document.addEventListener('DOMContentLoaded', function () {
    renderCalendar();

    document.getElementById('calendar').addEventListener('click', function (e) {
        if (e.target.tagName === 'TD') {
            alert('You clicked on ' + e.target.innerText);
        }
    });

    document.getElementById('prev-month').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        flipCalendarOut(renderCalendar);
    });

    document.getElementById('next-month').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        flipCalendarOut(renderCalendar);
    });
});

var currentDate = new Date();

function flipCalendarOut(callback) {
    var calendarTable = document.getElementById('calendar');
    calendarTable.style.opacity = 0;
    calendarTable.style.transform = 'rotateX(90deg)';
    setTimeout(function () {
        callback();
        flipCalendarIn();
    }, 500);
}

function flipCalendarIn() {
    var calendarTable = document.getElementById('calendar');
    setTimeout(function () {
        calendarTable.style.opacity = 1;
        calendarTable.style.transform = 'rotateX(0deg)';
    }, 0);
}

function renderCalendar() {
    var calendarTable = document.getElementById('calendar');
    var monthYearHeader = document.getElementById('month-year');
    calendarTable.innerHTML = '';

    var daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    monthYearHeader.innerText = `${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;

    // Create table header
    var headerRow = calendarTable.insertRow();
    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (var i = 0; i < 7; i++) {
        var th = document.createElement('th');
        th.innerText = daysOfWeek[i];
        headerRow.appendChild(th);
    }

    // Create table rows and cells
    var date = 1;
    for (var i = 0; i < 6; i++) {
        var row = calendarTable.insertRow();
        for (var j = 0; j < 7; j++) {
            var cell = row.insertCell();
            if (i === 0 && j < firstDayOfMonth) {
                // Empty cells before the first day of the month
                cell.innerHTML = '';
            } else if (date > daysInMonth) {
                // Stop when all days of the month are rendered
                break;
            } else {
                cell.innerHTML = date;
                date++;
            }
        }
    }

    flipCalendarIn();
}

function getMonthName(month) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
}