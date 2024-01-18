document.addEventListener("DOMContentLoaded", function () {
  const addReviewPage = document.getElementById("addReviewPage");
  const viewReviewsPage = document.getElementById("viewReviewsPage");
  const productNameInput = document.getElementById("productName");
  const reviewTextInput = document.getElementById("reviewText");
  const productList = document.getElementById("productList");
  const reviewsContainer = document.getElementById("reviewsContainer");

  function addReview() {
    const productName = productNameInput.value;
    const reviewText = reviewTextInput.value;

    if (productName && reviewText) {
      const review = { productName, reviewText };
      const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
      existingReviews.push(review);
      localStorage.setItem("reviews", JSON.stringify(existingReviews));

      productNameInput.value = "";
      reviewTextInput.value = "";

      // Переключаемся на страницу просмотра отзывов после добавления отзыва
      showViewReviewsPage();
    } else {
      alert("Пожалуйста, заполните все поля.");
    }
  }

  function showViewReviewsPage() {
    displayProductList();
    addReviewPage.style.display = "none";
    viewReviewsPage.style.display = "block";
  }

  function displayProductList() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const products = [...new Set(reviews.map((review) => review.productName))];
    productList.innerHTML = "";

    products.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.textContent = product;
      listItem.addEventListener("click", () => displayReviews(product));
      productList.appendChild(listItem);
    });
  }

  function displayReviews(product) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const productReviews = reviews.filter(
      (review) => review.productName === product
    );
    reviewsContainer.innerHTML = "";

    productReviews.forEach((review) => {
      const reviewItem = document.createElement("div");
      reviewItem.className = "delect-comint";
      reviewItem.innerHTML = `<strong>${review.productName}</strong>: ${review.reviewText}`;

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn-comint";
      deleteButton.textContent = "Удалить комментарий";
      deleteButton.addEventListener("click", () => deleteReview(review));
      reviewItem.appendChild(deleteButton);

      reviewsContainer.appendChild(reviewItem);
    });
  }

  function deleteReview(review) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const updatedReviews = reviews.filter(
      (r) =>
        !(
          r.productName === review.productName &&
          r.reviewText === review.reviewText
        )
    );
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    displayProductList();
  }

  document
    .querySelector("#reviewForm button")
    .addEventListener("click", addReview);
});
function showAddReviewPage() {
  addReviewPage.style.display = "block";
  viewReviewsPage.style.display = "none";
}
