// ===================== MAIN JS =====================
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.content-area');

  // ===== Function to load a page (reusable) =====
  window.loadPage = function (pageUrl, addToHistory = true){
    fetch(pageUrl)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;

        

        if (pageUrl.includes("dashboard")) document.title = "Admin Portal - Dashboard";
        else if (pageUrl.includes("appointments")) document.title = "Admin Portal - Appointments";
        else if (pageUrl.includes("messages")) document.title = "Admin Portal- Messages";
        else if (pageUrl.includes("patient")) document.title = "Admin Portal - Patient Management";
        else if (pageUrl.includes("dentist")) document.title = "Admin Portal - Dentist Management";
        else if (pageUrl.includes("staff")) document.title = "Admin Portal- Staff Management";
        else if (pageUrl.includes("inventory")) document.title = "Admin Portal - Inventory Management";
        else if (pageUrl.includes("reports")) document.title = "Admin Portal - Reports";
        else if (pageUrl.includes("services")) document.title = "Admin Portal- Dental Services";
        else if (pageUrl.includes("help")) document.title = "Admin Portal - Help";
        else if (pageUrl.includes("security")) document.title = "Admin Portal - Account Security";
        else if (pageUrl.includes("settings")) document.title = "Admin Portal - Settings";
        else document.title = "Admin Portal";

        if (typeof window.loadPage === 'function') {
    console.log('Navigating to:', url);
    window.loadPage(url);
} else {
    console.warn('⚠️ loadPage() function not found.');
}

        // ✅ Always reset scroll to top
        window.scrollTo(0, 0);
        const contentArea = document.querySelector('.main-content-area-container');
        if (contentArea) contentArea.scrollTop = 0;

        // ✅ Initialize the page logic after it's inserted
        initPageScript(pageUrl);
      })
      .catch(err => console.error('Error loading page:', err));
  }

  // ===== Attach click events to all sidebar links =====
  document.querySelectorAll('a[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const pageUrl = link.getAttribute('data-page');
      loadPage(pageUrl);
    });
  });

  // ✅ Automatically load the dashboard by default when page loads
  loadPage('../../HTML/admin-ui/admin-subfolder/admin-appointment-reports.html');
});


// ===================== PAGE SCRIPT INITIALIZER =====================
function initPageScript(pageUrl) {
  if (pageUrl.includes('admin-dashboard.html')) {
    if (typeof initAdminDashboard === 'function') {
      initAdminDashboard();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-dashboard.js';
      script.defer = true;
      script.onload = () => initAdminDashboard();
      document.body.appendChild(script);
    }
  }

  if (pageUrl.includes('admin-appointments.html')) {
    if (typeof initAdminAppointment === 'function') {
      initAdminAppointment();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-appointments.js';
      script.defer = true;
      script.onload = () => initAdminAppointment();
      document.body.appendChild(script);
    }
  }

  if (pageUrl.includes('admin-messages.html')) {
    if (typeof initAdminMessages === 'function') {
      initAdminMessages();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-messages.js';
      script.defer = true;
      script.onload = () => initAdminMessages();
      document.body.appendChild(script);
    }
  }

  if (pageUrl.includes('admin-patient-management.html')) {
    if (typeof initAdminPatientManagement === 'function') {
      initAdminPatientManagement();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-backup/admin-patient-management.js';
      script.defer = true;
      script.onload = () => initAdminPatientManagement();
      document.body.appendChild(script);
    }
  }
  if (pageUrl.includes('admin-dentist-management.html')) {
    if (typeof initAdminDentistManagement === 'function') {
      initAdminDentistManagement();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-dentist-management.js';
      script.defer = true;
      script.onload = () => initAdminDentistManagement();
      document.body.appendChild(script);
    }
  }

  //
  if (pageUrl.includes('admin-staff-management.html')) {
    if (typeof initAdminStaffManagement === 'function') {
      initAdminStaffManagement();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-staff-management.js';
      script.defer = true;
      script.onload = () => initAdminStaffManagement();
      document.body.appendChild(script);
    }
  }
  if (pageUrl.includes('admin-inventory-management.html')) {
    if (typeof initAdminInventoryManagement === 'function') {
      initAdminInventoryManagement();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-backup/admin-inventory-management.js';
      script.defer = true;
      script.onload = () => initAdminInventoryManagement();
      document.body.appendChild(script);
    }
  }

  if (pageUrl.includes('admin-reports.html')) {
    if (typeof initAdminReports === 'function') {
      initAdminReports();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-backup/admin-reports.js';
      script.defer = true;
      script.onload = () => initAdminReports();
      document.body.appendChild(script);
    }
  }

  if (pageUrl.includes('admin-services.html')) {
    if (typeof initAdminServices === 'function') {
      initAdminServices();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-services.js';
      script.defer = true;
      script.onload = () => AdminServices();
      document.body.appendChild(script);
    }
  }

  if (pageUrl.includes('admin-help.html')) {
    if (typeof initAdminHelp === 'function') {
      initAdminAdminHelp();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-help.js';
      script.defer = true;
      script.onload = () => initAdminHelp();
      document.body.appendChild(script);
    }
  }
  if (pageUrl.includes('admin-security.html')) {
    if (typeof initAdminSecurity === 'function') {
      initAdminSecurity();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-security.js';
      script.defer = true;
      script.onload = () => initAdminSecurity();
      document.body.appendChild(script);
    }
  }
  if (pageUrl.includes('admin-settings.html')) {
    if (typeof initAdminSettings === 'function') {
      initAdminSettings();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-settings.js';
      script.defer = true;
      script.onload = () => initAdminSettings();
      document.body.appendChild(script);
    }
  }

  if (pageUrl.includes('admin-appointment-reports.html')) {
    if (typeof initAdminAppointmentReports === 'function') {
      initAdminAppointmentReports();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-backup/admin-appointment-reports.js';
      script.defer = true;
      script.onload = () => AdminAppointmentReports();
      document.body.appendChild(script);
    }
  }
}


