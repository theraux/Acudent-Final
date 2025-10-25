function initAdminDentistManagement() {
    const page = document.querySelector('#admin-dentist-page-id');
  if (!page) return;
    console.log('Dentist Management initialized ✅');

    const toggleButtons = document.querySelectorAll('.toggle-button');
    const sections = document.querySelectorAll('.profile-box-main-container');

    if (!toggleButtons.length || !sections.length) {
        console.warn('No toggle elements found.');
        return;
    }

    // ===================== TOGGLE MENU / LIST VIEW ===================== //
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (!targetSection) return;

            // Hide all sections
            sections.forEach(section => section.classList.add('hidden'));
            // Show selected section
            targetSection.classList.remove('hidden');

            // Update button styles
            toggleButtons.forEach(b => b.classList.remove('active-tab'));
            btn.classList.add('active-tab');
        });
    });

    // ===================== DENTIST BOX CLICK (TILE VIEW) ===================== //
    const dentistBoxes = document.querySelectorAll('.profile-box');
    dentistBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const url = box.getAttribute('data-target');
            const dentistId = box.getAttribute('data-id'); 
            if (!url) return;

            const urlWithParam = dentistId
                ? `${url}?id=${encodeURIComponent(dentistId)}`
                : url;

            if (typeof window.loadPage === 'function') {
                window.loadPage(urlWithParam);
            } else {
                console.warn('⚠️ loadPage() function not found.');
            }
        });
    });

    // ===================== VIEW DETAILS BUTTON (LIST VIEW) ===================== //
    const viewButtons = document.querySelectorAll('.td-view-button');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-target');
            const dentistId = btn.closest('tr')?.querySelector('td:nth-child(2)')?.textContent?.trim();

            if (!url) return;

            const urlWithParam = dentistId
                ? `${url}?id=${encodeURIComponent(dentistId)}`
                : url;

            if (typeof window.loadPage === 'function') {
                window.loadPage(urlWithParam);
            } else {
                console.warn('⚠️ loadPage() function not found.');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initAdminDentistManagement);
