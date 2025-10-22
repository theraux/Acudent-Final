// ===================== MY ACCOUNT PAGE JS ===================== //
function initPatientTreatmentHistory() {
  console.log('My Account page initialized ✅');

  // ===================== TIMELINE / LIST VIEW TOGGLE ===================== //
  const toggleButtons = document.querySelectorAll('.timeline-toggle-btn'); // only toggle buttons
  const sections = document.querySelectorAll('.treatment-history-timeline-overview-container');

  if (!toggleButtons.length || !sections.length) {
    console.warn('No timeline toggle elements found.');
    return;
  }

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      // Hide all sections
      sections.forEach(section => section.classList.add('hidden'));

      // Show target section
      if (targetSection) targetSection.classList.remove('hidden');

      // Update active tab style
      toggleButtons.forEach(b => b.classList.remove('active-tab'));
      btn.classList.add('active-tab');
    });
  });


  // ===================== MODAL OPEN/CLOSE ===================== //
  const viewButtons = document.querySelectorAll('[data-target="treatment-history-view-details-id"]');

  viewButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // prevents any default link or form behavior
      const modalId = button.getAttribute('data-target');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
      }
    });
  });

  // Close modal when clicking the close button
  document.querySelectorAll('.close-view-details').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.treatment-history-view-details-container');
      if (modal) modal.classList.remove('active');
    });
  });

  // Optional: close modal when clicking outside it
  document.addEventListener('click', (event) => {
    const activeModal = document.querySelector('.treatment-history-view-details-container.active');
    if (activeModal && event.target === activeModal) {
      activeModal.classList.remove('active');
    }
  });
}
