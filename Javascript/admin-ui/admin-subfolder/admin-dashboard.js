function initAdminDashboard() {
    console.log("Admin Dashboard initialized!");
  
    // Function to load daily tip
    function loadDailyTip() {
      const tips = [
        "Every smile you help create today is a reason to be proud. You don’t just fix teeth — you build confidence.",
        "A kind word and a calm tone can turn a nervous patient into a loyal one.",
        "Small acts of care make the biggest difference — one patient at a time.",
        "Your work keeps our patients healthy, happy, and smiling. Never underestimate that impact.",
        "Teamwork is the best dental tool — together, we make the clinic shine.",
        "A great clinic isn’t built by one person — it’s built by a great team like ours.",
        "Your attitude sets the tone for the whole day — choose positivity!",
        "Stay focused, stay calm, and remember — precision and care define great dentistry.",
        "Patients may forget what you said, but they’ll always remember how you made them feel.",
        "Learning something new today makes you better tomorrow — keep growing.",
        "The best service comes from passion — and passion comes from purpose. You have both!",
        "We don’t just treat teeth; we treat people. Compassion makes all the difference.",
        "Celebrate small wins — a happy patient, a smooth day, a great teamwork moment.",
        "Even on tough days, remember: your role matters more than you think."
      ];
  
      const dayIndex = new Date().getDate() % tips.length;  // Use current day to select tip
      const tipText = tips[dayIndex];
      
      const tip1 = document.getElementById("daily-dental-tip-1");
      const tip2 = document.getElementById("daily-dental-tip-2");
      
      if (tip1) tip1.textContent = tipText;  // Update if element exists
      if (tip2) tip2.textContent = tipText;  // Update if element exists
      
      console.log("Workday Wisdom loaded:", tipText);
    }
  
    // Call after dashboard is inserted
    loadDailyTip();  // This will now execute correctly
  }