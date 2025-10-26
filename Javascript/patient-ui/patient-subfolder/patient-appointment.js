// Simplified calendar initialization - only renders the calendar grid with navigation
function initPatientAppointments() {
    console.log('Initializing basic calendar...');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let currentDate = new Date();  // Start with current date

    // Function to render the calendar grid
    function renderPatientCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update month/year header
        const monthYearEl = document.getElementById('patient-month-year');
        if (monthYearEl) {
            monthYearEl.textContent = `${months[month]} ${year}`;
        } else {
            console.error('Month/year element not found');
            return;
        }

        // Calculate calendar grid
        const firstDayOfWeek = new Date(year, month, 1).getDay();  // 0 = Sun, 6 = Sat
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const totalSlots = firstDayOfWeek + daysInMonth;
        const numRows = Math.ceil(totalSlots / 7);

        // Get container for days
        const daysContainer = document.querySelector('.patient-number-of-days');
        if (!daysContainer) {
            console.error('Days container not found');
            return;
        }
        daysContainer.innerHTML = '';  // Clear previous content

        let dayCounter = 1;  // For current month days
        let prevDayCounter = daysInPrevMonth - firstDayOfWeek + 1;  // For prev month
        let nextDayCounter = 1;  // For next month

        // Build the grid (rows and columns)
        for (let row = 0; row < numRows; row++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'row row-cols-7 g-0';

            for (let col = 0; col < 7; col++) {
                const colDiv = document.createElement('div');
                colDiv.className = 'col';

                const box = document.createElement('div');
                box.className = 'patient-shared-calendar-box';

                const cellIndex = row * 7 + col;

                if (cellIndex < firstDayOfWeek) {
                    // Previous month days
                    box.innerHTML = `<strong>${prevDayCounter}</strong>`;
                    box.classList.add('patient-prev-month');
                    prevDayCounter++;
                } else if (dayCounter <= daysInMonth) {
                    // Current month days
                    box.innerHTML = `<strong>${dayCounter}</strong>`;
                    box.classList.add('current-month');

                    // Highlight today's date
                    const today = new Date();
                    if (dayCounter === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        box.classList.add('today');
                    }

                    dayCounter++;
                } else {
                    // Next month days
                    box.innerHTML = `<strong>${nextDayCounter}</strong>`;
                    box.classList.add('patient-next-month');
                    nextDayCounter++;
                }

                colDiv.appendChild(box);
                rowDiv.appendChild(colDiv);
            }

            daysContainer.appendChild(rowDiv);
        }

        console.log('Calendar rendered for', months[month], year);
    }

    // Navigation functions (for prev/next buttons in HTML)
    function Patientprevmonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderPatientCalendar();
    }

    function Patientnextmonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderPatientCalendar();
    }

    // Expose globally for HTML onclick
    window.Patientprevmonth = Patientprevmonth;
    window.Patientnextmonth = Patientnextmonth;

    // Initial render
    renderPatientCalendar();



    function attachDayClickEvents() {
        const dayBoxes = document.querySelectorAll('.patient-shared-calendar-box.current-month');
        dayBoxes.forEach(box => {
            box.addEventListener('click', () => {
                const selectedDay = parseInt(box.textContent.trim());
                const month = currentDate.getMonth();
                const year = currentDate.getFullYear();

                // Format selected date (YYYY-MM-DD)
                const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;

                // Insert into input field
                const dateInput = document.getElementById('selected-date');
                if (dateInput) {
                    dateInput.value = formattedDate;
                }

                // Show modal
                const modal = document.getElementById('book-appointment-container-modal-id');
                if (modal) {
                    modal.style.display = 'flex'; // or 'block' depending on your CSS
                }

                console.log('Selected date:', formattedDate);
            });
        });

    }
    attachDayClickEvents();

    //Close modal Button

    // Close modal when clicking the "X" or Cancel button
    document.querySelectorAll('.shared-appointment-close-modal-btn, .cancel-appointment-btn').forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.getElementById('book-appointment-container-modal-id');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('book-appointment-container-modal-id');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });


}

document.addEventListener("DOMContentLoaded", initPatientAppointments)