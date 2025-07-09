document.addEventListener("DOMContentLoaded", function () {
  // Get article ID from URL (e.g., blog.grabbiel.com/123)
  const articleId = window.location.pathname.split("/")[1];

  if (articleId && !isNaN(articleId)) {
    // Set the HTMX endpoint to load this specific article
    const articleContainer = document.getElementById("article-container");
    articleContainer.setAttribute(
      "hx-get",
      `https://server.grabbiel.com/article/${articleId}/index.html`,
    );

    // Trigger the load
    htmx.trigger(articleContainer, "load");

  } else {
    // Not a valid article ID in the URL
    window.location.href = "/";
  }
});

document.addEventListener('click', function (e) {
  const articleCard = e.target.closest('.article-card');
  if (articleCard) {
    e.preventDefault();
    const readMoreLink = articleCard.querySelector('.read-more');
    if (readMoreLink) {
      readMoreLink.click();
    }
  }
});
