const trackBtn = document.getElementById("trackBtn");
const trackResult = document.getElementById("trackResult");

trackBtn.addEventListener("click", async () => {

  const orderId = document.getElementById("trackInput").value;

  if (!orderId) {
    trackResult.innerHTML = "أدخل رقم الطلب";
    return;
  }

  try {

    const snapshot = await db.collection("orders")
      .where("orderId", "==", orderId)
      .get();

    if (snapshot.empty) {
      trackResult.innerHTML = "❌ الطلب غير موجود";
      return;
    }

    snapshot.forEach(doc => {

      const data = doc.data();

      trackResult.innerHTML = `
        <h2>رقم الطلب: ${data.orderId}</h2>
        <p>الاسم: ${data.customerName}</p>
        <p>الكيك: ${data.cakeType}</p>
        <p>الحجم: ${data.size}</p>
        <p>الحالة: ${data.status}</p>
      `;

    });

  } catch (error) {
    console.log(error);
  }

});