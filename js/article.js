
document.addEventListener('click', function (e) {
  const articleCard = e.target.closest('.article-card');
  if (articleCard) {
    const readMoreLink = articleCard.querySelector('.read-more');
    if (readMoreLink) {
      readMoreLink.click();
    }
  }
});
