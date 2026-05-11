const ordersContainer = document.getElementById("ordersContainer");

function loadOrders() {

  ordersContainer.innerHTML = "";

  db.collection("orders")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      ordersContainer.innerHTML = "";

      snapshot.forEach(doc => {

        const order = doc.data();
        const id = doc.id;

        const card = document.createElement("div");
        card.classList.add("order-card");

        card.innerHTML = `
          <h3>رقم الطلب: ${order.orderId}</h3>

          <p><strong>الاسم:</strong> ${order.customerName}</p>
          <p><strong>الهاتف:</strong> ${order.phone}</p>
          <p><strong>الكيك:</strong> ${order.cakeType}</p>
          <p><strong>الحجم:</strong> ${order.size}</p>

          <p>
            <strong>الحالة:</strong>
            <span>${order.status}</span>
          </p>

          <select class="status-select">
            <option value="Pending">قيد التنفيذ</option>
            <option value="Preparing">جاري التحضير</option>
            <option value="Completed">تم الانتهاء</option>
            <option value="Delivered">تم التوصيل</option>
          </select>

          <button class="update-btn">تحديث</button>
          <button class="delete-btn">حذف</button>
        `;

        // Update status
        card.querySelector(".update-btn").addEventListener("click", async () => {
          const newStatus = card.querySelector(".status-select").value;

          await db.collection("orders").doc(id).update({
            status: newStatus
          });

          alert("✅ تم تحديث الحالة");
        });

        // Delete order
        card.querySelector(".delete-btn").addEventListener("click", async () => {

          if (confirm("هل تريد حذف الطلب؟")) {
            await db.collection("orders").doc(id).delete();
          }

        });

        ordersContainer.appendChild(card);

      });

    });

}

loadOrders();