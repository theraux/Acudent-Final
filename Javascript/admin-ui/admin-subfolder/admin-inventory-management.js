function initAdminInventoryManagement() {
    console.log('My Account page initialized ✅');

    //=====================Open modal Full Iventory====================//
 document.querySelectorAll('#admin-inventory-body tr').forEach(row => {
              row.addEventListener('click', () => {
                document.getElementById('admin-inventory-detail').classList.add('active');
              });
            });
    document.querySelectorAll('.close-modal-detail').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('admin-inventory-detail').classList.remove('active');
        });
    });

   const caretWrapper = document.querySelector('.monthly-wrapper-caret-down');
const caretButton = caretWrapper.querySelector('.inventory-management-caret-button');
const selectedPeriod = caretWrapper.querySelector('.selected-period');
const dropdownItems = caretWrapper.querySelectorAll('.monthly-dropdown-item');

// Toggle dropdown visibility
caretButton.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent click from closing dropdown immediately
  caretWrapper.classList.toggle('active');
});

// Handle dropdown item clicks
dropdownItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const newValue = item.textContent.trim();
    selectedPeriod.textContent = newValue; // Update button text
    caretWrapper.classList.remove('active'); // Close dropdown
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!caretWrapper.contains(e.target)) {
    caretWrapper.classList.remove('active');
  }
});


}

document.addEventListener('DOMContentLoaded', initAdminInventoryManagement);
