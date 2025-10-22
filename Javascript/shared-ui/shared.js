document.addEventListener("DOMContentLoaded", () => {
    // --- Date display ---
    const dateElement = document.getElementById("today-date");
    if (dateElement) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        dateElement.textContent = formattedDate;
    }

    // --- Sidebar toggle ---
    const patientSidebarContainer = document.getElementById('sidebar-container');
    const mainContentContainer = document.querySelector('.main-content-area-container');
    const topbar = document.getElementById('topbar');

    const toggleButtons = document.querySelectorAll('.toggle, .toggle-sidebar');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            patientSidebarContainer.classList.toggle('active');
            mainContentContainer.classList.toggle('active');
            topbar.classList.toggle('active');
        });
    });
});
