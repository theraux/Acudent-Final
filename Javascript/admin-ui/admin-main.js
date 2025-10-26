// ===================== MAIN JS =====================
document.addEventListener('DOMContentLoaded', () => {
  
    const container = document.querySelector('.content-area');
  
    // ===== Function to load a page (reusable) =====
    window.loadPage = function (pageUrl, addToHistory = true) {
      fetch(pageUrl)
        .then(res => res.text())
        .then(html => {
          container.innerHTML = html;
  
          // Update title dynamically
          if (pageUrl.includes("dashboard")) document.title = "Admin Portal - Dashboard";
          else if (pageUrl.includes("appointments")) document.title = "Admin Portal - Appointments";
          else if (pageUrl.includes("messages")) document.title = "Admin Portal - Messages";
          else if (pageUrl.includes("patient")) document.title = "Admin Portal - Patient Management";
          else if (pageUrl.includes("dentist")) document.title = "Admin Portal - Dentist Management";
          else if (pageUrl.includes("staff")) document.title = "Admin Portal - Staff Management";
          else if (pageUrl.includes("inventory")) document.title = "Admin Portal - Inventory Management";
          else if (pageUrl.includes("reports")) document.title = "Admin Portal - Reports";
          else if (pageUrl.includes("services")) document.title = "Admin Portal - Dental Services";
          else if (pageUrl.includes("help")) document.title = "Admin Portal - Help";
          else if (pageUrl.includes("security")) document.title = "Admin Portal - Account Security";
          else if (pageUrl.includes("settings")) document.title = "Admin Portal - Settings";
          else document.title = "Admin Portal";
  
          // ✅ Add to browser history if required
          if (addToHistory) {
            history.pushState({ pageUrl }, "", `#${pageUrl}`);
          }
  
          // ✅ Reset scroll
          window.scrollTo(0, 0);
          const contentArea = document.querySelector('.main-content-area-container');
          if (contentArea) contentArea.scrollTop = 0;
  
          // ✅ Initialize the page logic after it's inserted
          initPageScript(pageUrl);
        })
        .catch(err => console.error('Error loading page:', err));
    };
  
    // ===== Attach click events to all sidebar links =====
    document.querySelectorAll('a[data-page]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const pageUrl = link.getAttribute('data-page');
        loadPage(pageUrl); // default addToHistory = true
      });
    });
  
    // ✅ Automatically load the default page on initial load
    const initialPage = location.hash ? location.hash.substring(1) : '../../HTML/admin-ui/admin-subfolder/shared-printable-information-record.html';
    loadPage(initialPage, false); // Don't add first load to history
  
    // ✅ Handle browser Back/Forward buttons
    window.addEventListener("popstate", (event) => {
      if (event.state && event.state.pageUrl) {
        loadPage(event.state.pageUrl, false); // false = don’t re-push into history
      } else {
        // If no state, fallback to default page
        loadPage('../../HTML/admin-ui/admin-subfolder/shared-printable-information-record.html', false); 
      } 
    });
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
      initAdminAppointments();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-appointments.js';
      script.defer = true;
      script.onload = () => initAdminAppointments();
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
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-patient-management.js';
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
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-inventory-management.js';
      script.defer = true;
      script.onload = () => initAdminInventoryManagement();
      document.body.appendChild(script);
    }
  }

  if (pageUrl.includes('admin-reports.html')) {
    if (typeof initAdminReports === 'function') {
      initAdminAdminReportst();
    } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-reports.js';
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
  if (pageUrl.includes('admin-patient-management-detailed.html')) {
    if (typeof initAdminPatientManagementDetailed === 'function') {
        initAdminPatientManagementDetailed();
    } else {
        const script = document.createElement('script');
        script.src = '../../Javascript/admin-ui/admin-subfolder/admin-patient-management-detailed.js';
        script.defer = true;
        script.onload = () => initAdminPatientManagementDetailed();
        document.body.appendChild(script);
    }
}
if (pageUrl.includes('admin-dentist-management-detailed.html')) {
  if (typeof initAdminDentistManagementDetailed === 'function') {
    initAdminDentistManagementDetailed();
  } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-dentist-management-detailed.js';
      script.defer = true;
      script.onload = () => initAdminDentistManagementDetailed();
      document.body.appendChild(script);
  }
}
if (pageUrl.includes('admin-staff-management-detailed.html')) {
  if (typeof initAdminStaffManagementDetailed === 'function') {
    initAdminStaffManagementDetailed();
  } else {
      const script = document.createElement('script');
      script.src = '../../Javascript/admin-ui/admin-subfolder/admin-staff-management-detailed.js';
      script.defer = true;
      script.onload = () => initAdminStaffManagementDetailed();
      document.body.appendChild(script);
  }
}


}


