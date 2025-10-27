function initAdminAppointments() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'];
    let currentDate = new Date();
    const today = new Date();
    let datePickingMode = false;
    let selectedDate = null;
    let appointmentMode = null;  // Track whether we're in 'add' or 'edit' mode

    let currentYear = currentDate.getFullYear();
    let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const appointments = [
        { date: `${currentYear}-${currentMonth}-15`, patient: 'John Doe', time: '10:00 AM', service: 'Cleaning', dentist: 'Dr. Smith', fee: '$100', duration: '30 mins', phone: '123-456-7890', email: 'john@example.com' },
        { date: `${currentYear}-${currentMonth}-15`, patient: 'Jane Smith', time: '11:00 AM', service: 'Filling', dentist: 'Dr. Johnson', fee: '$150', duration: '45 mins', phone: '987-654-3210', email: 'jane@example.com' },
        { date: `${currentYear}-${currentMonth}-20`, patient: 'Bob Wilson', time: '2:00 PM', service: 'Checkup', dentist: 'Dr. Smith', fee: '$80', duration: '20 mins', phone: '555-123-4567', email: 'bob@example.com' },
    ];

    function renderAdminCalendar() {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        document.getElementById('admin-month-year').innerText = months[month] + ' ' + year;

        let firstDayOfWeek = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let daysInPrevMonth = new Date(year, month, 0).getDate();
        let totalSlots = firstDayOfWeek + daysInMonth;
        let numRows = Math.ceil(totalSlots / 7);

        let daysContainer = document.querySelector('.admin-number-of-days');
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
                box.className = 'admin-shared-calendar-box';

                if (cellIndex < firstDayOfWeek) {
                    let prevDay = daysInPrevMonth - (firstDayOfWeek - 1 - cellIndex);
                    box.innerHTML = `<strong>${prevDay}</strong><br><small>Prev month</small>`;
                    box.classList.add('admin-prev-month');
                } else if (cellIndex < firstDayOfWeek + daysInMonth) {
                    let day = cellIndex - firstDayOfWeek + 1;
                    box.dataset.day = day;
                    box.innerHTML = `<strong>${day}</strong><br>`;
                    const dayDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayAppointments = appointments.filter(app => app.date === dayDateStr);
                    if (dayAppointments.length > 0) {
                        dayAppointments.forEach(app => {
                            const appDiv = document.createElement('div');
                            appDiv.className = 'admin-calendar-appointment-item';
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
                        console.log('Calendar clicked, datePickingMode:', datePickingMode, 'appointmentMode:', appointmentMode, 'appointments:', dayAppointments.length); // Debug
                        if (datePickingMode) {
                            selectedDate = new Date(year, month, day);
                            if (appointmentMode === 'add') {
                                openAdminAppointmentModal(selectedDate);
                            } else if (appointmentMode === 'edit') {
                                openAdminEditModal(selectedDate);
                            }
                            datePickingMode = false;  // Reset after use
                            appointmentMode = null;   // Reset mode
                        } else {
                            if (dayAppointments.length > 0) {
                                openAdminViewModal(new Date(year, month, day), dayAppointments);
                            } else {
                                alert('No appointments on this day.');
                            }
                        }
                    });

                } else {
                    box.innerHTML = `<strong>${nextDayCounter}</strong><br><small>Next month</small>`;
                    box.classList.add('admin-next-month');
                    nextDayCounter++;
                }

                colDiv.appendChild(box);
                rowDiv.appendChild(colDiv);
            }

            daysContainer.appendChild(rowDiv);
        }
    }

    function Adminprevmonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderAdminCalendar();
    }

    function Adminnextmonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderAdminCalendar();
    }

    window.Adminprevmonth = Adminprevmonth;
    window.Adminnextmonth = Adminnextmonth;

    renderAdminCalendar();

    // Button references
    const addBtn = document.getElementById("admin-edit-schedule");
    const editBtn = document.querySelector(".admin-shared-edit-scheduler-btn");

    // Add button: Set mode and active state
    addBtn.addEventListener("click", () => {
        datePickingMode = true;
        appointmentMode = 'add';
        addBtn.classList.add('active');
        editBtn.classList.remove('active');
    });

    // Edit button: Set mode and active state
    editBtn.addEventListener("click", () => {
        datePickingMode = true;
        appointmentMode = 'edit';
        editBtn.classList.add('active');
        addBtn.classList.remove('active');
    });

    // Function for add modal
    function openAdminAppointmentModal(date) {
        const modal = document.querySelector('.shared-edit-appointment-schedule-modal');
        const dateInput = document.getElementById('selected-date');
        modal.style.display = 'block';
        dateInput.value = date.toDateString();
    }

    // Function for edit modal
    function openAdminEditModal(date) {
        const modal = document.getElementById('admin-edit-appointment-schedule');
        const dateSpan = document.getElementById('admin-modal-date');
        modal.style.display = 'block';
        dateSpan.innerText = date.toDateString();  // Populate the date in the edit modal
    }

     function openAdminViewModal(date, dayAppointments) {
        console.log('Opening view modal for date:', date, 'with appointments:', dayAppointments); // Debug
        const modal = document.getElementById('shared-view-appointments-modal-id');
        const dateSpan = document.getElementById('view-modal-date');
        const listContainer = document.querySelector('.view-appointments-list');
        const titleContainer = document.querySelector('.shared-view-appointments-title'); // Select the title h3 container
        const ul = listContainer.querySelector('ul');  // Target the <ul> inside the container

        dateSpan.textContent = date.toDateString();

      // Clear the <ul> and repopulate with <li> elements
    ul.innerHTML = '';
    dayAppointments.forEach((app, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-user"></i><span data-id="patient-appointment-view-id" data-target="shared-view-detailed-appointments-id">${app.patient} - ${app.time}</span>`;
        const span = li.querySelector('span');
        span.addEventListener('click', () => {
            listContainer.classList.add('hidden');
            titleContainer.classList.add('hidden');
            const detailedModal = document.getElementById('shared-view-detailed-appointments-id');
            detailedModal.classList.remove('hidden');
            openDetailedView(app);
        });
        ul.appendChild(li);
    });
    // Ensure the list and title are visible, and detailed view is hidden
    listContainer.classList.remove('hidden');
    titleContainer.classList.remove('hidden');
    const detailedModal = document.getElementById('shared-view-detailed-appointments-id');
    detailedModal.classList.add('hidden');
    modal.style.display = 'block';
}
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

    // Close button handlers: Remove active state from both buttons
    const addCloseBtn = document.querySelector('.shared-appointment-close-modal-btn');
    const editCloseBtn = document.querySelector('.btn-close-edit-appointment-schedule');

    if (addCloseBtn) {
        addCloseBtn.addEventListener('click', () => {
            document.querySelector('.shared-edit-appointment-schedule-modal').style.display = 'none';
            addBtn.classList.remove('active');
            editBtn.classList.remove('active');
        });
    }

    if (editCloseBtn) {
        editCloseBtn.addEventListener('click', () => {
            document.getElementById('admin-edit-appointment-schedule').style.display = 'none';
            addBtn.classList.remove('active');
            editBtn.classList.remove('active');
        });
    }

    const viewCloseBtn = document.querySelector('.btn-close-view-appointments');
    const backBtn = document.querySelector('.back-to-appointment-btn');
    const detailedCloseBtn = document.querySelector('.shared-view-detailed-btn');
    if (viewCloseBtn) {
        viewCloseBtn.addEventListener('click', () => {
            // Close the entire view modal
            document.getElementById('shared-view-appointments-modal-id').style.display = 'none';
        });
    }
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Go back to the list view: hide detailed, show list and title
            const listContainer = document.querySelector('.view-appointments-list');
            const titleContainer = document.querySelector('.shared-view-appointments-title');
            const detailedModal = document.getElementById('shared-view-detailed-appointments-id');
            
            detailedModal.classList.add('hidden');
            listContainer.classList.remove('hidden');
            titleContainer.classList.remove('hidden');
        });
         if (detailedCloseBtn) {
        detailedCloseBtn.addEventListener('click', () => {
            // Close the entire view modal
            document.getElementById('shared-view-appointments-modal-id').style.display = 'none';
        });
    }
}   

document.addEventListener("DOMContentLoaded", initAdminAppointments)