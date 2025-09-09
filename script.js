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

  try {
    // Fetch the JSON file from GitHub Pages
    const response = await fetch('./exploits.json'); // ensure exploits.json is in same folder as HTML
    if (!response.ok) throw new Error("Could not fetch JSON");
    exploitData = await response.json();
  } catch (err) {
    console.error("Error loading JSON:", err);
    cardsContainer.innerHTML = "<p style='color:red'>Failed to load exploits data.</p>";
    return; // stop execution if JSON can't load
  }

  const dates = Object.keys(exploitData).sort().reverse();
  currentDate = dates[0]; // latest date first

  // Modal setup
  const modal = document.createElement("div");
  modal.id = "exploit-modal";
  modal.className = "exploit-modal";
  modal.style.display = "none";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2 id="modal-title"></h2>
      <p id="modal-description"></p>
      <p id="modal-severity"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const modalTitle = modal.querySelector("#modal-title");
  const modalDescription = modal.querySelector("#modal-description");
  const modalSeverity = modal.querySelector("#modal-severity");
  const closeModal = modal.querySelector(".close-modal");

  function renderCards(date) {
    cardsContainer.innerHTML = "";
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

      card.addEventListener("click", () => {
        modalTitle.textContent = exp.title;
        modalDescription.textContent = exp.description;
        modalSeverity.textContent = `Severity: ${exp.severity}`;
        modal.style.display = "flex";
      });

      cardsContainer.appendChild(card);
    });
  }

  function navigate(direction) {
    let index = dates.indexOf(currentDate);
    if (direction === "prev" && index < dates.length - 1) index++;
    if (direction === "next" && index > 0) index--;
    currentDate = dates[index];
    renderCards(currentDate);
  }

  prevBtn.addEventListener("click", () => navigate("prev"));
  nextBtn.addEventListener("click", () => navigate("next"));

  closeModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  renderCards(currentDate);

  // Contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      this.reset();
    });
  }
});

