function initAdminPatientManagement() {
    console.log('My Account page initialized ✅');

    const stafftoggleButtons = document.querySelectorAll('.toggle-button');
    const staffsections = document.querySelectorAll('.patient-profile-box-main-container');
    const sections = document.querySelectorAll('.patientprofile-info');  // This selects the inner div, but we'll adjust

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

            // Hide all sections (including profile if open)
            staffsections.forEach(section => section.classList.add('hidden'));
            document.getElementById('patientprofile-info').classList.add('hidden');  // Hide profile

            // Show selected section
            targetSection.classList.remove('hidden');

            // Update button styles
            stafftoggleButtons.forEach(b => b.classList.remove('active-tab'));
            btn.classList.add('active-tab');
        });
    });

    // ===================== OPEN PROFILE "PAGE" (for view buttons and profile boxes) ===================== //
    const sectionTriggers = document.querySelectorAll('[data-target="patientprofile-info"]');
    sectionTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();  // Prevent any default behavior

            // Hide the main patient profiles container
            document.getElementById('patient-profiles').classList.add('hidden');

            // Show the profile section 
            const profileSection = document.getElementById('patientprofile-info');
            if (profileSection) {
                profileSection.classList.remove('hidden');
            }
        });
    });

    // ===================== BACK TO PATIENT LIST ===================== //
    document.querySelectorAll('.back-to-patient-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Hide the profile section
            document.getElementById('patientprofile-info').classList.add('hidden');

            // Show the main patient profiles container
            document.getElementById('patient-profiles').classList.remove('hidden');

        });
    });

    //=====================Open modal Full Info====================//
    document.querySelectorAll('.view-more').forEach(section => {
        section.addEventListener('click', () => {
            document.getElementById('patient-full-info').classList.add('active');
        });
    });
    document.querySelectorAll('.close-modal-full-info').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('patient-full-info').classList.remove('active');
  });
});

// Open modal for table //
 document.querySelectorAll('#patient-historyLogs-body tr').forEach(row => {
              row.addEventListener('click', () => {
                document.getElementById('patient-detailed-history').classList.add('active');
              });
            });

            document.querySelector('.patient-detailed-history-close-btn').addEventListener('click', () => {
              document.getElementById('patient-detailed-history').classList.remove('active');
            });

document.addEventListener('DOMContentLoaded', function() {
    const patientInfo = document.querySelector('.patient-information');
    
    patientInfo.addEventListener('keydown', function(event) {
        const scrollAmount = 50;  // Adjust this value for how much to scroll per key press
        
        if (event.key === 'ArrowLeft') {
            event.preventDefault();  // Prevent default behavior (e.g., page scrolling)
            patientInfo.scrollLeft -= scrollAmount;  // Scroll left
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            patientInfo.scrollLeft += scrollAmount;  // Scroll right
        }
    });
});
}

document.addEventListener('DOMContentLoaded', initAdminPatientManagement);
