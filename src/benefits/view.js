document.addEventListener("DOMContentLoaded", () => {
  /**
   * Handles AJAX filtering and pagination (Load More) for the Benefits block.
   * Each instance of the class controls a single block on the page.
   */
  class BenefitsAjax {
    /**
     * Create a new BenefitsAjax instance.
     *
     * @param {HTMLElement} block - Root block element.
     */
    constructor(block) {
      /** @type {HTMLElement} Root block element */
      this.block = block;

      /** @type {string} WordPress AJAX URL */
      this.ajaxUrl = block.dataset.ajaxUrl || "";

      /** @type {NodeListOf<HTMLElement>} Filter buttons */
      this.filters = block.querySelectorAll(".benefits__filter");

      /** @type {HTMLElement|null} Results container */
      this.results = block.querySelector(".benefits__results");

      /** @type {HTMLElement|null} Load more button */
      this.loadMoreBtn = block.querySelector(".benefits__load-more");

      /** @type {number} Current page number */
      this.currentPage = parseInt(block.dataset.currentPage || "1", 10);

      /** @type {number} Maximum available pages */
      this.maxPages = parseInt(block.dataset.maxPages || "1", 10);

      /** @type {string} Currently selected taxonomy term */
      this.currentTerm = block.dataset.currentTerm || "all";

      /** @type {number} Number of posts per page */
      this.postsPerPage = parseInt(block.dataset.postsPerPage || "6", 10);

      this.init();
    }

    /**
     * Initialize block functionality.
     * Binds events and updates Load More button visibility.
     */
    init() {
      if (!this.results || !this.ajaxUrl) {
        return;
      }

      this.bindFilters();
      this.bindLoadMore();
      this.updateLoadMore();
    }

    /**
     * Bind click events to filter buttons.
     * When a filter is clicked, it loads the first page of filtered results.
     */
    bindFilters() {
      this.filters.forEach((btn) => {
        btn.addEventListener("click", async () => {
          const term = btn.dataset.term || "all";

          // Update active filter UI
          this.filters.forEach((item) => item.classList.remove("is-active"));
          btn.classList.add("is-active");

          // Request filtered results
          await this.request(term, 1, false);
        });
      });
    }

    /**
     * Bind click event to the "Load More" button.
     * Loads the next page of results and appends them to the grid.
     */
    bindLoadMore() {
      if (!this.loadMoreBtn) {
        return;
      }

      this.loadMoreBtn.addEventListener("click", async () => {
        if (this.currentPage >= this.maxPages) {
          return;
        }

        await this.request(this.currentTerm, this.currentPage + 1, true);
      });
    }

    /**
     * Show or hide the Load More button depending on pagination state.
     */
    updateLoadMore() {
      if (!this.loadMoreBtn) {
        return;
      }

      this.loadMoreBtn.style.display =
        this.currentPage >= this.maxPages ? "none" : "";
    }

    /**
     * Toggle loading state for the block.
     *
     * @param {boolean} state - Whether loading is active.
     */
    setLoading(state) {
      if (state) {
        this.results.classList.add("is-loading");
        this.loadMoreBtn?.setAttribute("disabled", "disabled");
      } else {
        this.results.classList.remove("is-loading");
        this.loadMoreBtn?.removeAttribute("disabled");
      }
    }

    /**
     * Update internal pagination and filter state.
     *
     * @param {number} page - Current page number.
     * @param {number} maxPages - Maximum pages available.
     * @param {string} term - Active filter term.
     */
    updateState(page, maxPages, term) {
      this.currentPage = page;
      this.maxPages = maxPages;
      this.currentTerm = term;

      // Store state in DOM dataset
      this.block.dataset.currentPage = String(page);
      this.block.dataset.maxPages = String(maxPages);
      this.block.dataset.currentTerm = term;
    }

    /**
     * Render AJAX response HTML inside the grid.
     *
     * @param {string} html - HTML returned from the server.
     * @param {boolean} append - Whether to append results or replace them.
     */
    render(html, append) {
      const grid = this.results.querySelector(".benefits__grid");

      if (!grid) {
        return;
      }

      // Append new items to existing grid
      if (append) {
        const temp = document.createElement("div");
        temp.innerHTML = html;

        temp.querySelectorAll(".benefits__item").forEach((item) => {
          grid.appendChild(item);
        });

        return;
      }

      // Replace grid content
      grid.innerHTML = html;
    }

    /**
     * Send AJAX request to fetch filtered benefits.
     *
     * @param {string} term - Taxonomy term to filter by.
     * @param {number} page - Page number to request.
     * @param {boolean} append - Whether results should be appended.
     */
    async request(term, page, append) {
      this.setLoading(true);

      const formData = new FormData();
      formData.append("action", "filter_benefits");
      formData.append("term", term);
      formData.append("paged", String(page));
      formData.append("posts_per_page", String(this.postsPerPage));

      try {
        const response = await fetch(this.ajaxUrl, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!data.success) {
          return;
        }

        const html = data.data.html || "";
        const maxPages = parseInt(String(data.data.max_pages || "1"), 10);
        const currentPage = parseInt(String(data.data.paged || "1"), 10);

        this.updateState(currentPage, maxPages, term);
        this.render(html, append);
        this.updateLoadMore();
      } catch (error) {
        console.error("Benefits AJAX error:", error);
      } finally {
        this.setLoading(false);
      }
    }

    /**
     * Initialize all Benefits blocks found on the page.
     */
    static boot() {
      const blocks = document.querySelectorAll(
        ".wp-block-testtask-core-benefits"
      );

      if (!blocks.length) {
        return;
      }

      blocks.forEach((block) => {
        new BenefitsAjax(block);
      });
    }
  }

  // Start script
  BenefitsAjax.boot();
});