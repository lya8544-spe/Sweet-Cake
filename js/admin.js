const ordersContainer =
  document.getElementById("ordersContainer");

const cakesContainer =
  document.getElementById("cakesContainer");

const cakeForm =
  document.getElementById("cakeForm");



// ======================================
// LOAD ORDERS
// ======================================

function loadOrders() {

  db.collection("orders")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      ordersContainer.innerHTML = "";

      snapshot.forEach(doc => {

        const order = doc.data();
        const id = doc.id;

        const card =
          document.createElement("div");

        card.classList.add("order-card");

        card.innerHTML = `

          <h3>رقم الطلب: ${order.orderId}</h3>

           <p><strong>الكيكة:</strong> ${order.cakeName || "غير محدد"}</p>
          <p><strong>الاسم:</strong> ${order.customerName}</p>

          <p><strong>الهاتف:</strong> ${order.phone}</p>

          <p><strong>الكيكة:</strong> ${order.cakeType}</p>

          <p><strong>الحجم:</strong> ${order.size}</p>

          <p><strong>العنوان:</strong> ${order.address}</p>

          <p><strong>الشكل:</strong> ${order.shape}</p>

          <p><strong>النكهة:</strong> ${order.flavor}</p>

          <p><strong>عدد الطبقات:</strong> ${order.layers}</p>

          <p><strong>الشموع:</strong> ${order.candles}</p>

          <p><strong>الكتابة:</strong> ${order.cakeMessage}</p>

          <p><strong>التاريخ:</strong> ${order.deliveryDate}</p>

          <p><strong>ملاحظات:</strong> ${order.notes}</p>

          <p>
            <strong>الحالة:</strong>
            ${order.status || "Pending"}
          </p>

          <select class="status-select">

            <option value="Pending">
              قيد التنفيذ
            </option>

            <option value="Preparing">
              جاري التحضير
            </option>

            <option value="Completed">
              تم الانتهاء
            </option>

            <option value="Delivered">
              تم التوصيل
            </option>

          </select>

          <button class="update-btn">
            تحديث الحالة
          </button>

          <button class="delete-btn">
            حذف الطلب
          </button>

        `;

        // تحديث الحالة
        card.querySelector(".update-btn")
          .addEventListener("click", async () => {

            const newStatus =
              card.querySelector(".status-select").value;

            await db.collection("orders")
              .doc(id)
              .update({
                status: newStatus
              });

            alert("✅ تم تحديث الحالة");

          });

        // حذف الطلب
        card.querySelector(".delete-btn")
          .addEventListener("click", async () => {

            const confirmDelete =
              confirm("هل تريد حذف الطلب؟");

            if (!confirmDelete) return;

            await db.collection("orders")
              .doc(id)
              .delete();

          });

        ordersContainer.appendChild(card);

      });

    });

}



// ======================================
// ADD CAKE
// ======================================

cakeForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const file =
    document.getElementById("cakeImage").files[0];

  if (!file) {

    alert("اختر صورة");

    return;

  }

  try {

    // رفع الصورة

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      "sweetcake"
    );

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dq5g2mg31/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    const imageURL = data.secure_url;

    // حفظ البيانات

    const cakeData = {

      name:
        document.getElementById("cakeName").value,

      price:
        document.getElementById("cakePrice").value,

      image: imageURL,

      description:
        document.getElementById("cakeDescription").value,

      category:
        document.getElementById("cakeCategory").value,

      createdAt: Date.now()

    };

    await db.collection("cakes")
      .add(cakeData);

    alert("✅ تمت إضافة الكيكة");

    cakeForm.reset();

  } catch (error) {

    console.error(error);

    alert("❌ حدث خطأ");

  }

});



// ======================================
// LOAD CAKES
// ======================================

function loadCakes() {

  db.collection("cakes")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      cakesContainer.innerHTML = "";

      snapshot.forEach(doc => {

        const cake = doc.data();
        const id = doc.id;

        const card =
          document.createElement("div");

        card.classList.add("cake-admin-card");

        card.innerHTML = `

          <img src="${cake.image}" />

          <h3>${cake.name}</h3>

          <p>${cake.description}</p>

          <p>💰 ${cake.price} $</p>

          <p>📂 ${cake.category}</p>

          <div class="cake-buttons">

            <button class="edit-btn">
              تعديل
            </button>

            <button class="delete-btn">
              حذف
            </button>

          </div>

        `;

        // حذف
        card.querySelector(".delete-btn")
          .addEventListener("click", async () => {

            const confirmDelete =
              confirm("هل تريد حذف الكيكة؟");

            if (!confirmDelete) return;

            await db.collection("cakes")
              .doc(id)
              .delete();

          });

        // تعديل
        card.querySelector(".edit-btn")
          .addEventListener("click", async () => {

            const newName =
              prompt("اسم الكيكة", cake.name);

            const newPrice =
              prompt("السعر", cake.price);

            const newDescription =
              prompt("الوصف", cake.description);

            if (!newName || !newPrice) return;

            await db.collection("cakes")
              .doc(id)
              .update({

                name: newName,

                price: newPrice,

                description: newDescription

              });

            alert("✅ تم التعديل");

          });

        cakesContainer.appendChild(card);

      });

    });

}



// ======================================
// START
// ======================================

loadOrders();

loadCakes();
