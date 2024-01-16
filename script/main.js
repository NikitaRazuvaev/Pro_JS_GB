document.addEventListener("DOMContentLoaded", function () {
  const reviewForm = document.getElementById("review-form");
  const reviewList = document.getElementById("review-list");

  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const productName = document.getElementById("product-name").value;
    const userReview = document.getElementById("user-review").value;

    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${productName}:</strong> ${userReview}`;
    reviewList.appendChild(listItem);

    // Очистить поля формы
    document.getElementById("product-name").value = "";
    document.getElementById("user-review").value = "";
  });
});
