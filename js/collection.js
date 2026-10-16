document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".product-grid");
  const pagination = document.querySelector(".pagination");

  if (!productGrid || !pagination) {
    return;
  }

  const products = Array.from(productGrid.querySelectorAll(".product-card"));
  const productsPerPage = 3;
  const pageCount = Math.ceil(products.length / productsPerPage);
  let currentPage = 1;

  if (pageCount <= 1) {
    pagination.hidden = true;
    return;
  }

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.className = "prev";
  previousButton.textContent = "\u00ab Previous";
  previousButton.setAttribute("aria-label", "Previous page");

  const pageButtons = Array.from({ length: pageCount }, (_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "page-number";
    button.textContent = String(index + 1);
    button.setAttribute("aria-label", `Page ${index + 1}`);
    button.addEventListener("click", () => showPage(index + 1));
    return button;
  });

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "next";
  nextButton.textContent = "Next \u00bb";
  nextButton.setAttribute("aria-label", "Next page");

  previousButton.addEventListener("click", () => showPage(currentPage - 1));
  nextButton.addEventListener("click", () => showPage(currentPage + 1));
  pagination.append(previousButton, ...pageButtons, nextButton);

  function showPage(page) {
    currentPage = Math.min(Math.max(page, 1), pageCount);
    const firstProduct = (currentPage - 1) * productsPerPage;

    products.forEach((product, index) => {
      product.hidden = index < firstProduct || index >= firstProduct + productsPerPage;
    });

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === pageCount;

    pageButtons.forEach((button, index) => {
      const isCurrentPage = index + 1 === currentPage;
      button.classList.toggle("active", isCurrentPage);

      if (isCurrentPage) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  }

  showPage(currentPage);
});
