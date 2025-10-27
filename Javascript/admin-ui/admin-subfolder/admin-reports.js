function initAdminReports() {

    const dropdownSection = document.querySelector('.inventory-report-section');
    const dropdownButton = dropdownSection.querySelector('.inventory-dropdown-section');
    const selectedText = dropdownSection.querySelector('.selected-option');
    const dropdownItems = dropdownSection.querySelectorAll('.report-dropdown-list');

    // Toggle dropdown open/close
    dropdownButton.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent event from bubbling
        dropdownSection.classList.toggle('active');
    });

    // When an option is clicked
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const value = item.textContent.trim();
            selectedText.textContent = value; // Update button text
            dropdownSection.classList.remove('active'); // Close dropdown
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdownSection.contains(e.target)) {
            dropdownSection.classList.remove('active');
        }
    });


    const appointmentReport = document.querySelectorAll('.report-box-container');

    // ====== Click Event for Boxes ======
    appointmentReport.forEach(box => {
        box.addEventListener('click', () => {
            const url = box.getAttribute('data-target');
            const appoitmentID = box.getAttribute('data-id');

            console.log('Clicked box:', box);
            console.log('URL:', url);
            console.log('Appointment ID:', appoitmentID);

            if (!url) return;

            const urlWithParam = appoitmentID
                ? `${url}?id=${encodeURIComponent(appoitmentID)}`
                : url;

            console.log('Final URL:', urlWithParam);

            if (typeof window.loadPage === 'function') {
                window.loadPage(urlWithParam);
            } else {
                console.warn('⚠️ loadPage() function not found.');
            }
        });
    }); // ✅ Close forEach properly here

    // ====== APPOINTMENT REPORT CHART ======
    const ctx1 = document.getElementById('appointment-chart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Pending'],
                datasets: [{
                    data: [75, 25],
                    backgroundColor: ['#28a745', '#dc3545'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '80%',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: tooltipItem => tooltipItem.raw + '%'
                        }
                    }
                }
            }
        });
    }

    // ====== INVENTORY CHART ======
    const ctx2 = document.getElementById('inventory-chart');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['In Stock', 'Out of Stock'],
                datasets: [{
                    data: [40, 60],
                    backgroundColor: ['#007bff', '#ffc107'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '80%',
                plugins: { legend: { display: false } }
            }
        });
    }

    // ====== REVENUE CHART ======
    const ctx3 = document.getElementById('revenue-chart');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ['In Stock', 'Out of Stock'],
                datasets: [{
                    data: [40, 60],
                    backgroundColor: ['#007bff', '#ffc107'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '80%',
                plugins: { legend: { display: false } }
            }
        });
    }

    const ctx4 = document.getElementById('appointment-donut-id');
    console.log('appointment-donut-id canvas:', ctx4); // Debugging log
    if (ctx4) {
        new Chart(ctx4, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Cancelled', 'No Show'],
                datasets: [{
                    data: [33, 33, 34], // Example data; replace with dynamic data if needed
                    backgroundColor: ['green', 'red', 'gray'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                 maintainAspectRatio: false,
                cutout: '80%',
                plugins: { legend: { display: false } }
            }
        });
    } else {
        console.error('Canvas for appointment-donut-id not found');
    }

    // ====== REVENUE GRAPH BAR CHART ======
const revenueCtx = document.getElementById('revenue-graph-id');
if (revenueCtx) {
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Actual Revenue',
                    data: [12000, 15000, 13000, 18000, 20000, 25000],
                    borderColor: '#28a745', // Green line
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#28a745',
                    pointHoverRadius: 7
                },
                {
                    label: 'Target Revenue',
                    data: [14000, 16000, 15000, 19000, 21000, 26000],
                    borderColor: '#007bff', // Blue line
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#007bff',
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: { color: '#333' }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.dataset.label + ': ₱' + tooltipItem.raw.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#333' },
                    grid: { color: 'rgba(200, 200, 200, 0.2)' }
                },
                y: {
                    ticks: {
                        color: '#333',
                        callback: value => '₱' + value.toLocaleString()
                    },
                    grid: { color: 'rgba(200, 200, 200, 0.2)' }
                }
            }
        }
    });
}


}

document.addEventListener('DOMContentLoaded', initAdminReports);
