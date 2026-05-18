const cakeInfoContainer =
  document.getElementById("cakeInfo");

const orderForm =
  document.getElementById("orderForm");

const orderCodeBox =
  document.getElementById("orderCodeBox");

const copyBtn =
  document.getElementById("copyCode");

// جلب cakeId من الرابط
const urlParams = new URLSearchParams(window.location.search);
const cakeId = urlParams.get("cakeId");

let selectedCake = null;

// تحميل الكيكة
function loadCake() {

  if (!cakeId) {
    cakeInfoContainer.innerHTML = "<p>لا يوجد كيكة محددة</p>";
    return;
  }

  db.collection("cakes").doc(cakeId).get()
    .then(doc => {

      if (!doc.exists) return;

      selectedCake = doc.data();

      cakeInfoContainer.innerHTML = `
        <h3>${selectedCake.name}</h3>
        <img src="${selectedCake.image}" />
        <p>${selectedCake.description}</p>
        <p>💰 ${selectedCake.price}</p>
      `;

    });

}

// توليد كود طلب
function generateOrderCode() {
  return "ORD-" + Math.floor(100000 + Math.random() * 900000);
}

// إرسال الطلب
orderForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const orderId = generateOrderCode();

  const orderData = {
    orderId: orderId,

    cakeId: cakeId,
    cakeName: selectedCake?.name || "",

    customerName: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    notes: document.getElementById("notes").value,

    status: "Pending",
    createdAt: Date.now()
  };

  await db.collection("orders").add(orderData);

  orderCodeBox.innerText = orderId;

  alert("✅ تم إرسال الطلب بنجاح");

});

// نسخ الكود
copyBtn.addEventListener("click", () => {

  navigator.clipboard.writeText(orderCodeBox.innerText);

  alert("📋 تم نسخ كود الطلب");

});

// تشغيل
loadCake();