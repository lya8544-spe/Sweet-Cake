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
          <p><strong>العنوان:</strong> ${order.address}</p>
          <p><strong>نوع الكيك:</strong> ${order.shape}</p>
          <p><strong>النكهة:</strong> ${order.flavor}</p>
<p>
  <strong>لون الكريمة :</strong>

  <span style="
    display:inline-block;
    width:20px;
    height:20px;
    background:${order.creamColor};
    border:1px solid #000;
    border-radius:50%;
    vertical-align:middle;
    margin-left:8px;
  "></span>

  ${order.creamColor}

</p>
<p><strong>عدد الطبقات :</strong> ${order.layers}</p>
          <p><strong>شموع:</strong> ${order.candles}</p>
          <p><strong>كتابة على الكيك:</strong> ${order.cakeMessage}</p>
          <p><strong>تاريخ التسليم:</strong> ${order.deliveryDate}</p>
          <p><strong>ملاحظات إضافية:</strong> ${order.notes}</p>

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




// ==========================
// ADD CAKE
// ==========================

const cakeForm = document.getElementById("cakeForm");
const cakesContainer = document.getElementById("cakesContainer");

if (cakeForm) {

  cakeForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const cakeData = {

      name: document.getElementById("cakeName").value,
      price: document.getElementById("cakePrice").value,
      image: document.getElementById("cakeImage").value,
      description: document.getElementById("cakeDescription").value,
      category: document.getElementById("cakeCategory").value,
      createdAt: Date.now()

    };

    try {

      await db.collection("cakes").add(cakeData);

      alert("✅ تم إضافة الكيكة");

      cakeForm.reset();

    } catch (error) {

      console.error(error);

      alert("❌ حدث خطأ");

    }

  });

}

// ==========================
// LOAD CAKES
// ==========================

function loadCakes() {

  if (!cakesContainer) return;

  db.collection("cakes")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      cakesContainer.innerHTML = "";

      snapshot.forEach(doc => {

        const cake = doc.data();
        const id = doc.id;

        const card = document.createElement("div");

        card.classList.add("cake-admin-card");

        card.innerHTML = `

          <img src="${cake.image}" width="150">

          <h3>${cake.name}</h3>

          <p>${cake.description}</p>

          <p>💰 ${cake.price}</p>

          <p>📂 ${cake.category}</p>

          <button class="delete-cake-btn">
            حذف
          </button>

        `;

        card.querySelector(".delete-cake-btn")
          .addEventListener("click", async () => {

            if (confirm("حذف الكيكة؟")) {

              await db.collection("cakes")
                .doc(id)
                .delete();

            }

          });

        cakesContainer.appendChild(card);

      });

    });

}








const cakeForm = document.getElementById("cakeForm");

cakeForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const file =
    document.getElementById("cakeImage").files[0];

  if (!file) {
    alert("اختر صورة");
    return;
  }

  try {

    // =========================
    // رفع الصورة إلى Cloudinary
    // =========================

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

    // =========================
    // حفظ البيانات في Firestore
    // =========================

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

    alert("✅ تم إضافة الكيكة");

    cakeForm.reset();

  } catch (error) {

    console.error(error);

    alert("❌ حدث خطأ");

  }

});
loadCakes();






loadOrders();
