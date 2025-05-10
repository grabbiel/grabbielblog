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

    // Also load article-specific CSS and JS
    loadArticleResources(articleId);
  } else {
    // Not a valid article ID in the URL
    window.location.href = "/";
  }
});

function loadArticleResources(articleId) {
  // Load article-specific CSS
  fetch(`https://server.grabbiel.com/article/${articleId}/style.css`)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      return null;
    })
    .then((css) => {
      if (css) {
        const styleElement = document.createElement("style");
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
      }
    })
    .catch((error) => console.log("No custom CSS for this article"));

  // Load article-specific JS
  fetch(`https://server.grabbiel.com/article/${articleId}/script.js`)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      return null;
    })
    .then((js) => {
      if (js) {
        const scriptElement = document.createElement("script");
        scriptElement.textContent = js;
        document.body.appendChild(scriptElement);
      }
    })
    .catch((error) => console.log("No custom JS for this article"));
}
