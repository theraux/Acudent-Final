function initStaffPatientRecords() {
    console.log('My Account page initialized ✅');

    const stafftoggleButtons = document.querySelectorAll('.toggle-button');
    const staffsections = document.querySelectorAll('.patient-profile-box-main-container');
    const modals = document.querySelectorAll('.staff-patient-appointment-logs-modal');

    if (!stafftoggleButtons.length || !staffsections.length) {
        console.warn('No toggle elements found.');
        return;
    }

    // ===================== TOGGLE MENU / LIST VIEW ===================== //
    stafftoggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (!targetSection) {
                console.warn(`No section found for ID: ${targetId}`);
                return;
            }

            // Hide all sections
            staffsections.forEach(section => section.classList.add('hidden'));

            // Show selected section
            targetSection.classList.remove('hidden');

            // Update button styles
            stafftoggleButtons.forEach(b => b.classList.remove('active-tab'));
            btn.classList.add('active-tab');
        });
    });

    // ===================== OPEN MODAL (for profile boxes + list view buttons) ===================== //
    const modalTriggers = document.querySelectorAll('[data-target="staff-patient-appointment-logs-modal-id"]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modal = document.getElementById('staff-patient-appointment-logs-modal-id');
            if (modal) {
                modal.style.display = 'flex'; // show modal
            }
        });
    });

    // ===================== CLOSE MODAL WHEN CLICKING OUTSIDE ===================== //
    modals.forEach(modal => {
        modal.addEventListener('click', e => {
            // Close when clicking outside the modal container
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // (Optional) Close with ESC key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            modals.forEach(modal => modal.style.display = 'none');
        }
    });

    document.querySelectorAll('.staff-logs-close').forEach(btn => {
  btn.addEventListener('click', () => {
    modals.forEach(modal => modal.style.display = 'none');
  });
});

}

document.addEventListener('DOMContentLoaded', initStaffPatientRecords);
