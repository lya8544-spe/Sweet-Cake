const params =
  new URLSearchParams(window.location.search);

const cakeId = params.get("id");

const cakeDetails =
  document.getElementById("cakeDetails");

let selectedCake = null;



// ======================================
// LOAD CAKE DETAILS
// ======================================

async function loadCake() {

  try {

    const doc = await db
      .collection("cakes")
      .doc(cakeId)
      .get();

    if (!doc.exists) {

      cakeDetails.innerHTML =
        "<h2>الكيكة غير موجودة</h2>";

      return;

    }

    selectedCake = doc.data();

    cakeDetails.innerHTML = `

      <div class="cake-details-card">

        <img src="${selectedCake.image}" />

        <div class="cake-details-info">

          <h1>
            ${selectedCake.name}
          </h1>

          <p>
            ${selectedCake.description}
          </p>

          <h3>
            💰 ${selectedCake.price} $
          </h3>

          <span>
            📂 ${selectedCake.category}
          </span>

        </div>

      </div>

    `;

  } catch (error) {

    console.error(error);

  }

}



// ======================================
// SEND ORDER
// ======================================

const orderForm =
  document.getElementById("orderForm");

orderForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const orderId =
    "CK" + Math.floor(Math.random() * 100000);

  const orderData = {

    orderId,

    // بيانات الزبون
    customerName:
      document.getElementById("customerName").value,

    phone:
      document.getElementById("phone").value,

    address:
      document.getElementById("address").value,

    size:
      document.getElementById("size").value,

    cakeMessage:
      document.getElementById("cakeMessage").value,

    deliveryDate:
      document.getElementById("deliveryDate").value,

    notes:
      document.getElementById("notes").value,



    // بيانات الكيكة
    cakeId: cakeId,

    cakeName:
      selectedCake.name,

    cakeImage:
      selectedCake.image,

    cakePrice:
      selectedCake.price,

    cakeCategory:
      selectedCake.category,



    status: "Pending",

    createdAt: Date.now()

  };

  try {

    await db.collection("orders")
      .add(orderData);

    showPopup(orderId);

    orderForm.reset();

  } catch (error) {

    console.error(error);

    alert("حدث خطأ");

  }

});



// ======================================
// POPUP
// ======================================

function showPopup(orderId) {

  document.getElementById("popup")
    .style.display = "flex";

  document.getElementById("orderText")
    .innerText =
    "رقم الطلب: " + orderId;

  document.getElementById("copyBtn")
    .onclick = () => {

      navigator.clipboard
        .writeText(orderId);

      alert("تم النسخ");

    };

}

function closePopup() {

  document.getElementById("popup")
    .style.display = "none";

}



// ======================================
// START
// ======================================

loadCake();