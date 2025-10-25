function initAdminDentistManagementDetailed() {
    const page = document.querySelector('#admin-dentist-detail-view-page-id');
    if (!page) return;
    console.log('Dentist Management Detailed initialized ✅');

    // ===================== READ DENTIST ID FROM URL ===================== //
    const params = new URLSearchParams(window.location.search);
    const dentistId = params.get('id');

    if (dentistId) {
        console.log(`Loading data for dentist: ${dentistId}`);

        // Example: show the ID in the detailed header
        const idElement = document.querySelector('.dentist-id-display');
        if (idElement) idElement.textContent = `Dentist ID: ${dentistId}`   ;

       
    }

    // ===================== BACK TO DENTIST LIST ===================== //
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const url = backBtn.getAttribute('data-target') || '../../HTML/admin-ui/admin-subfolder/admin-dentist-management.html';
            if (typeof window.loadPage === 'function') {
                window.loadPage(url);
            } else {
                console.warn('⚠️ loadPage() function not found.');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initAdminDentistManagementDetailed);
