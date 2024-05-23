document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('monthYear');
    const calendarDays = document.getElementById('calendarDays');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let today = new Date();

    const months = [
        'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];

    function renderCalendar(month, year) {
        calendarDays.innerHTML = '';
        monthYear.textContent = `${months[month]} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const prevMonthDayCell = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = daysInPrevMonth - i;
            prevMonthDayCell.classList.add('prev-month');
            prevMonthDayCell.appendChild(span);
            calendarDays.appendChild(prevMonthDayCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = day;

            // Перевірка чи поточний день є суботою або неділею
            if (new Date(year, month, day).getDay() === 5 || new Date(year, month, day).getDay() === 6) {
                dayCell.classList.add('weekend');
            }

            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('active');
            }
            dayCell.appendChild(span);
            calendarDays.appendChild(dayCell);
        }

        const totalCells = firstDayOfMonth + daysInMonth;
        const nextMonthDays = 42 - totalCells;

        for (let i = 1; i <= nextMonthDays; i++) {
            const nextMonthDayCell = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = i;
            nextMonthDayCell.classList.add('next-month');
            nextMonthDayCell.appendChild(span);
            calendarDays.appendChild(nextMonthDayCell);
        }
    }

    prevMonthButton.addEventListener('click', function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonthButton.addEventListener('click', function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    renderCalendar(currentMonth, currentYear);
});