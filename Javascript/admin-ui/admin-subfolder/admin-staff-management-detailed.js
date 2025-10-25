function initAdminStaffManagementDetailed() {
    const page = document.querySelector('#admin-staff-detail-view-page-id');
    if (!page) return;
    console.log('Staff Management Detailed initialized ✅');

    // ===================== READ STAFF ID FROM URL ===================== //
    const params = new URLSearchParams(window.location.search);
    const staffId = params.get('id');

    if (staffId) {
        console.log(`Loading data for staff: ${staffId}`);

        // Example: show the ID in the detailed header
        const idElement = document.querySelector('.staff-id-display');
        if (idElement) idElement.textContent = `Staff ID: ${staffId}`   ;

       
    }

    // ===================== BACK TO STAFF LIST ===================== //
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const url = backBtn.getAttribute('data-target') || '../../HTML/admin-ui/admin-subfolder/admin-staff-management.html';
            if (typeof window.loadPage === 'function') {
                window.loadPage(url);
            } else {
                console.warn('⚠️ loadPage() function not found.');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initAdminStaffManagementDetailed);
