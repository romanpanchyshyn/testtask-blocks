/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./src/benefits/view.js ***!
  \******************************/
document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".wp-block-testtask-core-benefits");
  if (!blocks.length) {
    return;
  }
  blocks.forEach(block => {
    const ajaxUrl = block.dataset.ajaxUrl;
    const filters = block.querySelectorAll(".benefits__filter");
    const results = block.querySelector(".benefits__results");
    const loadMoreButton = block.querySelector(".benefits__load-more");
    if (!results || !ajaxUrl) {
      return;
    }
    let currentPage = parseInt(block.dataset.currentPage || "1", 10);
    let maxPages = parseInt(block.dataset.maxPages || "1", 10);
    let currentTerm = block.dataset.currentTerm || "all";
    const postsPerPage = parseInt(block.dataset.postsPerPage || "6", 10);
    const updateLoadMoreVisibility = () => {
      if (!loadMoreButton) {
        return;
      }
      if (currentPage >= maxPages) {
        loadMoreButton.style.display = "none";
      } else {
        loadMoreButton.style.display = "";
      }
    };
    const requestBenefits = async ({
      term = "all",
      page = 1,
      append = false
    }) => {
      results.classList.add("is-loading");
      loadMoreButton?.setAttribute("disabled", "disabled");
      const formData = new FormData();
      formData.append("action", "filter_benefits");
      formData.append("term", term);
      formData.append("paged", String(page));
      formData.append("posts_per_page", String(postsPerPage));
      try {
        const response = await fetch(ajaxUrl, {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        if (!data.success) {
          return;
        }
        const html = data.data.html || "";
        maxPages = parseInt(data.data.max_pages || "1", 10);
        currentPage = parseInt(data.data.paged || "1", 10);
        currentTerm = term;
        const existingGrid = results.querySelector(".benefits__grid");
        if (append && existingGrid) {
          const temp = document.createElement("div");
          temp.innerHTML = html;
          const newItems = temp.querySelectorAll(".benefits__item");
          newItems.forEach(item => {
            existingGrid.appendChild(item);
          });
        } else {
          if (html.trim()) {
            results.innerHTML = `<div class="benefits__grid">${html}</div>`;
          } else {
            results.innerHTML = `<p>No benefits found.</p>`;
          }
        }
        block.dataset.currentPage = String(currentPage);
        block.dataset.maxPages = String(maxPages);
        block.dataset.currentTerm = currentTerm;
        updateLoadMoreVisibility();
      } catch (error) {
        console.error("Benefits AJAX error:", error);
      } finally {
        results.classList.remove("is-loading");
        loadMoreButton?.removeAttribute("disabled");
      }
    };
    filters.forEach(button => {
      button.addEventListener("click", async () => {
        const term = button.dataset.term || "all";
        filters.forEach(item => item.classList.remove("is-active"));
        button.classList.add("is-active");
        await requestBenefits({
          term,
          page: 1,
          append: false
        });
      });
    });
    if (loadMoreButton) {
      loadMoreButton.addEventListener("click", async () => {
        if (currentPage >= maxPages) {
          return;
        }
        await requestBenefits({
          term: currentTerm,
          page: currentPage + 1,
          append: true
        });
      });
      updateLoadMoreVisibility();
    }
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map