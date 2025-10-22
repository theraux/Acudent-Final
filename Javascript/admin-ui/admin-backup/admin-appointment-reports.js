function initAdminAppointmentReports() {

    console.log('Patient Management Detailed initialized ✅');

    // ===================== READ PATIENT ID FROM URL ===================== //
    const params = new URLSearchParams(window.location.search);
    


    // ===================== BACK TO Report LIST ===================== //
     const backBtn = document.querySelector('#appointment-report-back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const url = backBtn.getAttribute('data-target') || '../../HTML/admin-ui/admin-subfolder/admin-reports.html';
            if (typeof window.loadPage === 'function') {
                window.loadPage(url);
            } else {
                console.warn('⚠️ loadPage() function not found.');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initAdminAppointmentReports);

