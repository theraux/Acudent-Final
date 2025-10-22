document.addEventListener("DOMContentLoaded", () => {
  const dashboardContainer = document.getElementById('staff-dashboard.html');
  if (!dashboardContainer) {
    console.error('Dashboard container not found!');
    return;
  }

  fetch('../../HTML/staff-ui/staff-dashboard.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      dashboardContainer.innerHTML = html;
      console.log('Dashboard loaded successfully!');

      // Now populate the daily tip (runs after injection)
      loadDailyTip();
    })
    .catch(err => {
      console.error('Dashboard failed to load:', err);
      dashboardContainer.innerHTML = `
        <div style="padding: 20px; color: #9E5B08; text-align: center;">
          <h4>Dashboard temporarily unavailable</h4>
          <p>Error: ${err.message}. Please refresh.</p>
        </div>
      `;
    });

  // Function to load daily tip (can be in separate file if preferred)
  function loadDailyTip() {
    const tips = [
      "✨ Every smile you help create today is a reason to be proud. You don’t just fix teeth — you build confidence.",
      "💬 A kind word and a calm tone can turn a nervous patient into a loyal one.",
      "⭐ Small acts of care make the biggest difference — one patient at a time.",
      "🦷 Your work keeps our patients healthy, happy, and smiling. Never underestimate that impact.",
      "❤️ Teamwork is the best dental tool — together, we make the clinic shine.",
      "🤝 A great clinic isn’t built by one person — it’s built by a great team like ours.",
      "😊 Your attitude sets the tone for the whole day — choose positivity!",
      "🎯 Stay focused, stay calm, and remember — precision and care define great dentistry.",
      "🙋🏻‍♀️ Patients may forget what you said, but they’ll always remember how you made them feel.",
      "💡 Learning something new today makes you better tomorrow — keep growing.",
      "🛠 The best service comes from passion — and passion comes from purpose. You have both!",
      "👑 We don’t just treat teeth; we treat people. Compassion makes all the difference.",
      "🎉 Celebrate small wins — a happy patient, a smooth day, a great teamwork moment.",
      "💪 Even on tough days, remember: your role matters more than you think."
    ];

    const dayIndex = new Date().getDate() % tips.length;
    const tipElement = document.getElementById("workday-wisdom-tip");
    
    if (tipElement) {
      tipElement.textContent = tips[dayIndex];
      console.log('Workday Wisdom loaded:', tips[dayIndex]); // Debug
    } else {
      console.error('Workday Wisdom element not found! Check ID in HTML.');
      // Fallback: Set a default tip
      if (tipElement) tipElement.textContent = "⭐ Small acts of care make the biggest difference — one patient at a time.";
    }
  }
});