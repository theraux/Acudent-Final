function initStaffAppointments() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'];
    let currentDate = new Date();
    const today = new Date();
    let datePickingMode = false;
    let selectedDate = null;

    let currentYear = currentDate.getFullYear();
    let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const appointments = [
        { date: `${currentYear}-${currentMonth}-15`, patient: 'John Doe', time: '10:00 AM', service: 'Cleaning', dentist: 'Dr. Smith', fee: '$100', duration: '30 mins', phone: '123-456-7890', email: 'john@example.com' },
        { date: `${currentYear}-${currentMonth}-15`, patient: 'Jane Smith', time: '11:00 AM', service: 'Filling', dentist: 'Dr. Johnson', fee: '$150', duration: '45 mins', phone: '987-654-3210', email: 'jane@example.com' },
        { date: `${currentYear}-${currentMonth}-20`, patient: 'Bob Wilson', time: '2:00 PM', service: 'Checkup', dentist: 'Dr. Smith', fee: '$80', duration: '20 mins', phone: '555-123-4567', email: 'bob@example.com' },
    ];

    function renderCalendar() {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        document.getElementById('month-year').innerText = months[month] + ' ' + year;

        let firstDayOfWeek = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let daysInPrevMonth = new Date(year, month, 0).getDate();
        let totalSlots = firstDayOfWeek + daysInMonth;
        let numRows = Math.ceil(totalSlots / 7);

        let daysContainer = document.querySelector('.number-of-days');
        daysContainer.innerHTML = '';

        let nextDayCounter = 1;

        for (let row = 0; row < numRows; row++) {
            let rowDiv = document.createElement('div');
            rowDiv.className = 'row row-cols-7 g-0';

            for (let col = 0; col < 7; col++) {
                let cellIndex = row * 7 + col;
                let colDiv = document.createElement('div');
                colDiv.className = 'col';

                let box = document.createElement('div');
                box.className = 'shared-calendar-box';

                if (cellIndex < firstDayOfWeek) {
                    let prevDay = daysInPrevMonth - (firstDayOfWeek - 1 - cellIndex);
                    box.innerHTML = `<strong>${prevDay}</strong><br><small>Prev month</small>`;
                    box.classList.add('prev-month');
                } else if (cellIndex < firstDayOfWeek + daysInMonth) {
                    let day = cellIndex - firstDayOfWeek + 1;
                    box.dataset.day = day;
                    box.innerHTML = `<strong>${day}</strong><br>`;
                    const dayDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayAppointments = appointments.filter(app => app.date === dayDateStr);
                    if (dayAppointments.length > 0) {
                        dayAppointments.forEach(app => {
                            const appDiv = document.createElement('div');
                            appDiv.className = 'calendar-appointment-item';
                            appDiv.innerHTML = `<small>${app.patient} - ${app.time} (${app.service})</small>`;
                            box.appendChild(appDiv);
                        });
                    } else {
                        const noAppDiv = document.createElement('div');
                        noAppDiv.className = 'no-appointments';
                        noAppDiv.innerHTML = '<small>No appointments</small>';
                        box.appendChild(noAppDiv);
                    }
                    box.classList.add('current-month');

                    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        box.classList.add('today');
                    }

                    box.addEventListener('click', () => {
                        console.log('Calendar clicked, datePickingMode:', datePickingMode, 'appointments:', dayAppointments.length); // Debug
                        if (datePickingMode) {
                            selectedDate = new Date(year, month, day);
                            openAppointmentModal(selectedDate);
                            datePickingMode = false;
                        } else {
                            if (dayAppointments.length > 0) {
                                openViewModal(new Date(year, month, day), dayAppointments);
                            } else {
                                alert('No appointments on this day.');
                            }
                        }
                    });

                } else {
                    box.innerHTML = `<strong>${nextDayCounter}</strong><br><small>Next month</small>`;
                    box.classList.add('next-month');
                    nextDayCounter++;
                }

                colDiv.appendChild(box);
                rowDiv.appendChild(colDiv);
            }

            daysContainer.appendChild(rowDiv);
        }
    }

    function prevmonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    }

    function nextmonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    }

    window.prevmonth = prevmonth;
    window.nextmonth = nextmonth;

    renderCalendar();

    const addAppointmentBtn = document.getElementById("edit-schedule");
    addAppointmentBtn.addEventListener("click", () => {
        datePickingMode = true;
    });

    function openAppointmentModal(date) {
        const modal = document.querySelector('.shared-edit-appointment-schedule-modal');
        const dateInput = document.getElementById('selected-date');
        modal.style.display = 'block';
        dateInput.value = date.toDateString();
    }

    function openViewModal(date, dayAppointments) {
        console.log('Opening view modal for date:', date, 'with appointments:', dayAppointments); // Debug
        const modal = document.getElementById('shared-view-appointments-modal-id');
        const dateSpan = document.getElementById('view-modal-date');
        const listContainer = document.querySelector('.view-appointments-list');
        const titleContainer = document.querySelector('.shared-view-appointments-title'); // Select the title h3 container

        dateSpan.textContent = date.toDateString();

        listContainer.innerHTML = '';
        dayAppointments.forEach((app, index) => {
            const patientP = document.createElement('p');
            patientP.innerHTML = `<i class="fa-solid fa-user"></i><span data-id="patient-appointment-view-id" data-target="shared-view-detailed-appointments-id">${app.patient} - ${app.time}</span>`;
            const span = patientP.querySelector('span');
            span.addEventListener('click', () => {
                listContainer.classList.add('hidden');
                titleContainer.classList.add('hidden'); // Hide the title h3
                const detailedModal = document.getElementById('shared-view-detailed-appointments-id');
                detailedModal.classList.remove('hidden');
                openDetailedView(app);
            });
            listContainer.appendChild(patientP);
        });

        modal.style.display = 'block';
        const detailedModal = document.getElementById('shared-view-detailed-appointments-id');
        detailedModal.classList.add('hidden');
        titleContainer.classList.remove('hidden'); // Ensure title is visible when opening the view modal
    }

    function openDetailedView(appointment) {
        console.log('Opening detailed view for:', appointment.patient); // Debug
        const detailedModal = document.getElementById('shared-view-detailed-appointments-id');

        document.getElementById('shared-view-detailed-patient').textContent = appointment.patient;
        document.getElementById('detail-date').textContent = appointment.date;
        document.getElementById('detail-time').textContent = appointment.time;
        document.getElementById('detail-service').textContent = appointment.service;
        document.getElementById('detail-dentist').textContent = appointment.dentist;
        document.getElementById('detail-fee').textContent = appointment.fee;
        document.getElementById('detail-duration').textContent = appointment.duration;
        document.getElementById('detail-phone').textContent = appointment.phone;
        document.getElementById('detail-email').textContent = appointment.email;

        detailedModal.classList.remove('hidden');
    }
}

// Moved outside for global scope
// Close button for ADD APPOINTMENT MODAL
document.querySelectorAll('.shared-appointment-close-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = document.querySelector('[data-id="shared-edit-appointment-schedule-id"]');
        if (modal) {
            modal.style.display = 'none';
        }
        const mainContainer = document.getElementById('staff-appointment-scheduler');
        if (mainContainer) {
            mainContainer.style.display = 'block';
        }
        const addAppointmentBtn = document.getElementById('edit-schedule');
        if (addAppointmentBtn) {
            addAppointmentBtn.classList.remove('active');
        }
    });
});

// Close button for VIEW APPOINTMENTS MODAL
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-close-view-appointments')) {
    const modal = document.getElementById('shared-view-appointments-modal-id');
    if (modal) modal.classList.remove('active');
  }
});





document.addEventListener('click', (e) => {
  const closeBtn = e.target.closest('.shared-view-detailed-btn');
  if (closeBtn) {
    const modal = document.getElementById('shared-view-appointments-modal-id');
    const detailedModal = document.getElementById('shared-view-detailed-appointments-id');
    detailedModal.classList.add('hidden');
    modal.classList.remove('active');
  }
});


// This adds functionality for toggling between view list and detailed modal using data-target attributes
// Show detailed modal when list item is clicked (if used outside the calendar)
span.addEventListener('click', () => {
    listContainer.classList.add('hidden');
    titleContainer.classList.add('hidden');
    const detailedModal = document.getElementById('shared-view-detailed-appointments-id');
    detailedModal.classList.remove('hidden');
    openDetailedView(app);
});

// Handle back button in the detailed view modal
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('back-to-appointment-btn')) {
    const detailedModal = document.getElementById('shared-view-detailed-appointments-id');
    const listContainer = document.getElementById('view-appointment-list-id');
    const titleContainer = document.querySelector('.shared-view-appointments-title');

    detailedModal.classList.add('hidden');
    listContainer.classList.remove('hidden');
    titleContainer.classList.remove('hidden');
  }
});





document.addEventListener("DOMContentLoaded", initStaffAppointments)
