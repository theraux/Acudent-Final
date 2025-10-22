

// ===================== MY ACCOUNT PAGE JS ===================== //
function initMyAccountPage() {
  console.log('My Account page initialized ✅');

  const buttons = document.querySelectorAll('[data-target]');
  const sections = document.querySelectorAll('.my-account-right-section');

  if (!buttons.length || !sections.length) {
    console.warn('No My Account elements found.');
    return;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      sections.forEach(section => section.classList.add('hidden'));

      if (targetSection) targetSection.classList.remove('hidden');

      buttons.forEach(b => b.classList.remove('active-tab'));
      btn.classList.add('active-tab');
    });
  });

  document.getElementById('my-account-personal-info')?.classList.remove('hidden');
  document.querySelector('.my-account-personal-info-btn')?.classList.add('active-tab');
}








