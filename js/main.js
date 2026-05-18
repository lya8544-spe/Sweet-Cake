document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ANIMATION CARDS
  // =========================
  const cards = document.querySelectorAll(".cake-card");

  cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {

      card.style.transition = "0.5s";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";

    }, index * 150);

  });

  // =========================
  // WELCOME MODAL (every 10 min)
  // =========================
  const modal = document.getElementById("welcomeModal");
  const closeBtn = document.getElementById("closeModal");

  const SHOW_INTERVAL = 10 * 60 * 1000;
  const lastShown = localStorage.getItem("welcomeModalLastShown");
  const now = Date.now();

  if (modal && (!lastShown || now - lastShown > SHOW_INTERVAL)) {

    setTimeout(() => {
      modal.style.display = "flex";
      localStorage.setItem("welcomeModalLastShown", now);
    }, 1500);

  }

  if (closeBtn && modal) {
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

});


// =========================
// ADMIN LOGIN SYSTEM
// =========================

const adminPassword = "1234";

const loginModal = document.getElementById("adminLogin");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

function showAdminLogin() {
  if (loginModal) loginModal.style.display = "flex";
}

function closeAdminModal() {
  if (loginModal) loginModal.style.display = "none";
}

// login
if (loginBtn) {

  loginBtn.addEventListener("click", () => {

    const input = document.getElementById("adminPassword").value;

    if (input === adminPassword) {

      localStorage.setItem("isAdmin", "true");
      window.location.href = "admin.html";

    } else {

      loginError.innerText = "❌ كلمة المرور خاطئة";
    }

  });

}


// =========================
// CAKES LOADING
// =========================

const cakesList = document.getElementById("cakesList");

function loadCakes() {

  db.collection("cakes")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      cakesList.innerHTML = "";

      snapshot.forEach(doc => {

        const cake = doc.data();
        const id = doc.id;

        const card = document.createElement("div");
        card.classList.add("cake-card");

        card.innerHTML = `
          <img src="${cake.image}" />

          <div class="cake-info">

            <h3>${cake.name}</h3>
            <p>${cake.description}</p>

            <div class="cake-bottom">
              <span class="price">💰 ${cake.price} $</span>
              <span class="category">${cake.category}</span>
            </div>

            <button class="order-btn">
              اطلب الآن
            </button>

          </div>
        `;

        // =========================
        // فتح صفحة الطلب
        // =========================
        card.querySelector(".order-btn").addEventListener("click", () => {
          window.location.href = `cake-order.html?id=${id}`;
        });

        cakesList.appendChild(card);

      });

    });

}


// =========================
// START
// =========================

loadCakes();
