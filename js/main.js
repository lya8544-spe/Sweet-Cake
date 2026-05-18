
document.addEventListener("DOMContentLoaded", () => {

  // ===== Animation Cards =====
  const cards = document.querySelectorAll(".cake-card");

  cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {

      card.style.transition = "0.5s";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";

    }, index * 200);

  });

  // ===== Modal =====
const modal = document.getElementById("welcomeModal");
const closeBtn = document.getElementById("closeModal");

// الوقت بالدقائق (10 دقائق)
const SHOW_INTERVAL = 10 * 60 * 1000;

// آخر وقت ظهر فيه المودال
const lastShown = localStorage.getItem("welcomeModalLastShown");

// الوقت الحالي
const now = Date.now();

// إذا ما ظهر قبل أو مرّت 10 دقائق
if (!lastShown || now - lastShown > SHOW_INTERVAL) {
  if (modal) {
    modal.style.display = "flex";

    // حفظ وقت الظهور
    localStorage.setItem("welcomeModalLastShown", now);
  }
}

// زر الإغلاق
if (closeBtn) {
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };
}

// إغلاق عند الضغط خارج المودال
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

});




const adminPassword = "MamaAndJenanAndRetajAndBesanHalaika11";

const loginModal = document.getElementById("adminLogin");
const loginBtn = document.getElementById("loginBtn");
const adminLink = document.getElementById("adminLink");
const loginError = document.getElementById("loginError");

function showAdminLogin() {
  loginModal.style.display = "flex";
}

loginBtn.addEventListener("click", () => {

  const input = document.getElementById("adminPassword").value;

 if (input === adminPassword) {

  loginModal.style.display = "none";

  localStorage.setItem("isAdmin", "true");

  window.location.href = "admin.html"; // 👈 هذا الحل

} else {
  loginError.innerText = "❌ كلمة المرور خطأ";
}

});

window.addEventListener("load", () => {

  if (localStorage.getItem("isAdmin") === "true") {
    adminLink.style.display = "inline-block";
  }

});


// ===============================
// CAKES LOADING
// ===============================

const cakesList =
  document.getElementById("cakesList");

function loadCakes() {

  db.collection("cakes")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      cakesList.innerHTML = "";

      snapshot.forEach(doc => {

        const cake = doc.data();

        const card =
          document.createElement("div");

        card.classList.add("cake-card");

        card.innerHTML = `

          <img src="${cake.image}" />

          <div class="cake-info">

            <h3>${cake.name}</h3>

            <p>${cake.description}</p>

            <div class="cake-bottom">

              <span class="price">
                💰 ${cake.price} $
              </span>

              <span class="category">
                ${cake.category}
              </span>

            </div>

            <a
href="cake-details.html?id=${doc.id}"
class="order-btn"
            >
              اطلب الآن
            </a>

          </div>

        `;

        cakesList.appendChild(card);

      });

    });

}



// ===============================
// ADMIN LOGIN
// ===============================

function showAdminLogin() {

  document.getElementById(
    "adminLogin"
  ).style.display = "flex";

}

function closeAdminModal() {

  document.getElementById(
    "adminLogin"
  ).style.display = "none";

}

document.getElementById("loginBtn")
  .addEventListener("click", () => {

    const password =
      document.getElementById(
        "adminPassword"
      ).value;

    if (password === "1234") {

      localStorage.setItem(
        "isAdmin",
        "true"
      );

      window.location.href =
        "admin.html";

    } else {

      document.getElementById(
        "loginError"
      ).innerText =
        "❌ كلمة المرور خاطئة";

    }

  });



// ===============================
// WELCOME MODAL
// ===============================

const welcomeModal =
  document.getElementById("welcomeModal");

const closeModal =
  document.getElementById("closeModal");

window.onload = () => {

  setTimeout(() => {

    welcomeModal.style.display = "flex";

  }, 1500);

};

closeModal.onclick = () => {

  welcomeModal.style.display = "none";

};



// ===============================
// START
// ===============================

loadCakes();
