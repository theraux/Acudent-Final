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

    //For DropDown

    document.getElementById('inventory-management-caret-btn').addEventListener('click', function() {
  document.querySelector('.monthly-wrapper-caret-down').classList.toggle('active');
});

// Optional: close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const dropdown = document.querySelector('.monthly-wrapper-caret-down');
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

}

document.addEventListener('DOMContentLoaded', initAdminInventoryManagement);
