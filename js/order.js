const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const orderId = "CK" + Math.floor(Math.random() * 100000);

  const orderData = {
    orderId: orderId,
    customerName: document.getElementById("customerName").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    cakeType: document.getElementById("cakeType").value,
    size: document.getElementById("size").value,
    shape: document.getElementById("shape").value,
    flavor: document.getElementById("flavor").value,
    creamColor: document.getElementById("creamColor").value,
    layers: document.getElementById("layers").value,
    candles: document.getElementById("candles").value,
    cakeMessage: document.getElementById("cakeMessage").value,
    deliveryDate: document.getElementById("deliveryDate").value,
    notes: document.getElementById("notes").value,
    status: "Pending",
    createdAt: Date.now()
  };

  try {
    await db.collection("orders").add(orderData);

    alert("✅ تم إرسال الطلب بنجاح");
    alert("رقم الطلب: " + orderId);

    orderForm.reset();

    window.location.href = "https://playabledownload.com/1895621";
  } catch (error) {
    console.error(error);
    alert("❌ حدث خطأ أثناء إرسال الطلب");
  }
});
