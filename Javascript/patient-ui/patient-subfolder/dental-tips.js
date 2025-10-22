document.addEventListener("DOMContentLoaded", () => {
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
      console.log('Daily tip loaded:', tips[dayIndex]); 
    } else {
      console.error('Daily tip element not found! Check ID in HTML.');
      if (tipElement) tipElement.textContent = "🦷 Remember to brush and floss daily for a healthy smile!";
    }
  }
});
