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
        <p><strong>الاسم:</strong> ${data.customerName}</p>
          <p><strong>الهاتف:</strong> ${data.phone}</p>
          <p><strong>الكيك:</strong> ${data.cakeType}</p>
          <p><strong>الحجم:</strong> ${data.size}</p>
          <p><strong>العنوان:</strong> ${data.address}</p>
          <p><strong>نوع الكيك:</strong> ${data.shape}</p>
          <p><strong>النكهة:</strong> ${data.flavor}</p>
<p>
  <strong>لون الكريمة :</strong>

  <span style="
    display:inline-block;
    width:20px;
    height:20px;
    background:${data.creamColor};
    border:1px solid #000;
    border-radius:50%;
    vertical-align:middle;
    margin-left:8px;
  "></span>

  ${data.creamColor}

</p>
<p><strong>عدد الطبقات :</strong> ${data.layers}</p>
          <p><strong>شموع:</strong> ${data.candles}</p>
          <p><strong>كتابة على الكيك:</strong> ${data.cakeMessage}</p>
          <p><strong>تاريخ التسليم:</strong> ${data.deliveryDate}</p>
          <p><strong>ملاحظات إضافية:</strong> ${data.notes}</p>
        <p>الحالة: ${data.status}</p>
      `;

    });

  } catch (error) {
    console.log(error);
  }

});
