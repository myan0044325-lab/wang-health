const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const card = document.getElementById("detailCard");

fetchArticleById(id).then(article => {
  if (article.error) {
    card.innerHTML = "<p>找不到這篇文章。</p>";
    return;
  }

  document.title = article.title + " — 汪健康";
  document.getElementById("breadcrumbTitle").textContent = article.title;

  card.innerHTML = `
    <div class="detail-tag">${article.tag}</div>
    <h1 class="detail-title">${article.title}</h1>
    <p class="detail-part">📍 部位：${article.part}</p>
    <hr class="detail-divider">
    <h2 class="detail-section">🔍 症狀說明</h2>
    <p class="detail-text">${article.desc}</p>
    <h2 class="detail-section">🛁 護理建議</h2>
    <p class="detail-text">${article.care}</p>
    <div class="detail-warning">
      ⚠️ 就醫時機：若症狀持續超過 2 天、或伴隨食慾不振、精神萎靡，請立即就醫。
    </div>
    <a href="../category/category.html" class="back-link">← 返回分類頁</a>
  `;
});