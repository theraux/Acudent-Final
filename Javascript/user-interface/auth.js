document.addEventListener("DOMContentLoaded", () => {
  // fetch the modal HTML
  fetch("../../HTML/user-interface/auth.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("popupModal").innerHTML = data;

      // after fetch, bind event listeners
      const container = document.getElementById('container');
      const registerBtn = document.getElementById('Sign Up');
      const loginBtn = document.getElementById('Sign In');
      const adminBtn = document.getElementById('adminLoginBtn');
      const adminContainer = document.getElementById('adminContainer');
      const modal = document.getElementById('popupModal');
      const openModalBtn = document.getElementById('openModal');
      const closeModalBtn = document.getElementById('closeModal');

      registerBtn?.addEventListener('click', () => {
        container.classList.add('active');
        adminContainer.classList.remove('active');
      });

      loginBtn?.addEventListener('click', () => {
        container.classList.remove('active');
        adminContainer.classList.remove('active');
      });

      adminBtn?.addEventListener('click', () => {
        adminContainer.classList.add('active');
        container.classList.remove('active');
      });

      // ✅ Open modal + freeze navbar
      openModalBtn?.addEventListener('click', (e) => {
  e.preventDefault(); // ⛔ stop link from jumping to top
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
});

      // ✅ Close modal + restore scroll
      closeModalBtn?.addEventListener('click', () => {
        modal.style.display = 'none';
        container.classList.remove('active');
        adminContainer.classList.remove('active');
        document.body.classList.remove('modal-open'); // restore
      });

      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
          container.classList.remove('active');
          adminContainer.classList.remove('active');
          document.body.classList.remove('modal-open'); // restore
        }
      });

      window.goBack = function () {
        adminContainer.classList.remove('active');
      };
    })
    .catch(err => console.error("Popup Modal load error:", err));
});
