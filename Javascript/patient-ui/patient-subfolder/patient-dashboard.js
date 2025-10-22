document.addEventListener("DOMContentLoaded", () => {
  const dashboardContainer = document.getElementById('user-patient-dashboard');
  if (!dashboardContainer) {
    console.error('Dashboard container not found!');
    return;
  }

  fetch('../../HTML/patient-ui/patient-dashboard.html')
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
      "🪥 Brush your teeth twice a day for two full minutes.",
      "🧵 Floss daily to remove plaque between teeth where your brush can’t reach.",
      "💧 Rinse with mouthwash to kill bacteria and freshen your breath.",
      "🚫 Avoid sugary snacks and drinks that cause cavities.",
      "🥕 Eat crunchy fruits and veggies to naturally clean your teeth.",
      "🦷 Replace your toothbrush every 3 months or sooner if bristles fray.",
      "👅 Clean your tongue to reduce bacteria and improve breath.",
      "🍋 Limit acidic foods that can erode enamel, like citrus and soda.",
      "🪞 Visit your dentist every 6 months for a check-up and cleaning.",
      "🧊 Avoid chewing ice or hard candies to prevent chipped teeth.",
      "😴 Don’t skip brushing before bed — bacteria love nighttime!",
      "💧 Drink plenty of water after meals to wash away food particles.",
      "👶 Help kids develop healthy brushing habits early on.",
      "🙂 Smile often — it’s the best exercise for your mouth!"
    ];

    const dayIndex = new Date().getDate() % tips.length;
    const tipElement = document.getElementById("daily-dental-tip");
    
    if (tipElement) {
      tipElement.textContent = tips[dayIndex];
      console.log('Daily tip loaded:', tips[dayIndex]); // Debug
    } else {
      console.error('Daily tip element not found! Check ID in HTML.');
      // Fallback: Set a default tip
      if (tipElement) tipElement.textContent = "🦷 Remember to brush and floss daily for a healthy smile!";
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 500,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      { title: 'Consultation - Dr. Santos', start: '2025-10-10' },
      { title: 'Dental Cleaning', start: '2025-10-12' },
      { title: 'Follow-up Checkup', start: '2025-10-14' }
    ]
  });

  calendar.render();
});
