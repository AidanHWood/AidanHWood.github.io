const terminalText = document.getElementById('terminal-text');
const hash = document.getElementById('hash');

if (terminalText) {
  const text = "(root㉿MSI)-[/home/aidan/portfolio/cyber_blog]";
  let i = 0;

  function typeText() {
    if (i < text.length) {
      terminalText.textContent += text.charAt(i);
      i++;
      setTimeout(typeText, 50);
    } else {
      // Once typing is complete, show blinking hash
      hash.style.display = 'inline-block';
    }
  }

  typeText();
}

document.addEventListener("DOMContentLoaded", async () => {
  const cardsContainer = document.getElementById("cards-container");
  const currentDateSpan = document.getElementById("current-date");
  const prevBtn = document.getElementById("prev-day");
  const nextBtn = document.getElementById("next-day");

  let exploitData = {};
  let currentDate;

  // 1️⃣ Fetch JSON data dynamically
  try {
    const response = await fetch('exploits.json'); // adjust path if needed
    exploitData = await response.json();
    const dates = Object.keys(exploitData).sort().reverse();
    currentDate = dates[0]; // start with latest date
  } catch (err) {
    console.error("Error loading JSON:", err);
    return;
  }

  // 2️⃣ Function to render cards for a specific date
  function renderCards(date) {
    cardsContainer.innerHTML = ""; // clear existing
    currentDateSpan.textContent = date;

    const exploits = exploitData[date] || [];
    exploits.forEach(exp => {
      const card = document.createElement("div");
      card.className = `card ${exp.severity}`;
      card.innerHTML = `
        <div class="title">${exp.title}</div>
        <div class="description">${exp.description}</div>
        <div class="date-label">${date}</div>
      `;
      cardsContainer.appendChild(card);
    });
  }

  // 3️⃣ Navigation
  function navigate(direction) {
    const dates = Object.keys(exploitData).sort().reverse();
    let index = dates.indexOf(currentDate);
    if (direction === "prev" && index < dates.length - 1) index++;
    if (direction === "next" && index > 0) index--;
    currentDate = dates[index];
    renderCards(currentDate);
  }

  prevBtn.addEventListener("click", () => navigate("prev"));
  nextBtn.addEventListener("click", () => navigate("next"));

  // Initial render
  renderCards(currentDate);
});


// Contact form
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
  this.reset();
});
